import fs from 'node:fs';
import path from 'node:path';
import { runFullUniverseSync } from '../server/marketSync';
import { CORE_SECTOR_INDICES, THEMATIC_SECTOR_INDICES } from '../src/data/sectorUniverse';
import { validateAndRepairStock, type PriceHistoryRecord } from '../src/utils/priceQuality';
import { assessObservedSessionCoverage, hasObservedSession, isNseWeekend, latestObservedTradingDate } from '../src/utils/marketSessionFreshness';

/** GitHub Actions collects 3 times per IST calendar day. It never
 * overwrites the saved file if network/provider coverage is insufficient. */
async function main() {
  const filename = path.join(process.cwd(), 'src', 'data', 'verifiedLiveMarketData.json');
  // A Saturday 02:00/04:00 IST run is still Friday UTC. Test the NSE day,
  // not GitHub's runner date, before hitting Yahoo or rejecting old closes.
  if (isNseWeekend(new Date())) {
    const saved = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, 'utf8')) : null;
    console.info('[MARKET-CLOSED-WEEKEND] NSE/BSE regular trading closed in IST; ' +
      'skipping unnecessary Yahoo refresh and retaining last verified snapshot. ' +
      'Reference session: ' +
      (latestObservedTradingDate(saved?.benchmarks?.nifty500?.history) || 'unavailable'));
    return;
  }

  const startedAt = Date.now();
  const report = await runFullUniverseSync('Scheduled market collection (18:30 / 02:00 / 04:00 IST)');
  const snapshot = JSON.parse(fs.readFileSync(filename, 'utf8'));

  // Every thematic symbol is evaluated, including adjacent research stocks.
  // Duplicate appearances in separate baskets count just once.
  const expected = Array.from(new Set(
    THEMATIC_SECTOR_INDICES.flatMap(sector => sector.stocks.map(st => st.ticker))
  ));
  const fresh = expected.filter(ticker => {
    const stock = snapshot.stocks?.[ticker];
    return stock && Number.isFinite(Date.parse(stock.fetchedAt)) &&
      Date.parse(stock.fetchedAt) >= startedAt &&
      Boolean(validateAndRepairStock(stock).record);
  });
  const ratio = expected.length ? fresh.length / expected.length : 0;
  // The actual market-data quality gate uses observed trading sessions,
  // INCLUDING verified Friday closes retained from an earlier collection.
  // HTTP fetchedAt is only a diagnostic. It must not invalidate prices when
  // the exchange has been closed or Yahoo temporarily serves older bars.
  const referenceTradingDate = latestObservedTradingDate(snapshot.benchmarks?.nifty500?.history);
  const sessionCoverage = assessObservedSessionCoverage<PriceHistoryRecord>(
    expected, (snapshot.stocks || {}) as Record<string, PriceHistoryRecord>, referenceTradingDate,
    stock => Boolean(validateAndRepairStock(stock).record),
  );
  const currentSessionTickers = sessionCoverage.eligibleTickers;
  const sessionRatio = sessionCoverage.coverageRatio;
  const staleSessionTickers = sessionCoverage.missingTickers;

  const benchmarkNames = ['nifty50', 'niftyMidcap', 'niftySmallcap', 'nifty500'];
  const invalidBenchmarks = benchmarkNames.filter(key => {
    const benchmark = snapshot.benchmarks?.[key];
    return !benchmark || !Array.isArray(benchmark.history) ||
      benchmark.history.length < 40 ||
      !Number.isFinite(benchmark.history.at(-1)?.value) ||
      !hasObservedSession(benchmark.history, referenceTradingDate);
  });

  // Avoid falsely updating all index rankings when an entire core basket
  // has failed its Yahoo requests. Other basket shortages are reported.
  const verifiedCurrentTickers = new Set(currentSessionTickers);
  const coreCoverage = CORE_SECTOR_INDICES.map(sector => {
    const valid = sector.stocks.filter(stock => verifiedCurrentTickers.has(stock.ticker)).length;
    return { name: sector.name, fresh: valid, total: sector.stocks.length };
  });
  const emptyCoreBaskets = coreCoverage.filter(x => x.fresh === 0);

  console.info('Scheduled refresh quality report:', JSON.stringify({
    report, expectedStocks: expected.length, freshStocks: fresh.length,
    coveragePercent: Number((ratio * 100).toFixed(1)), // HTTP-download coverage, diagnostic only
    referenceTradingDate, currentSessionStocks: currentSessionTickers.length,
    currentSessionCoveragePercent: Number((sessionRatio * 100).toFixed(1)),
    staleSessionStocks: staleSessionTickers.length,
    staleSessionTickerExamples: staleSessionTickers.slice(0, 35).map(ticker => ({
      ticker, latest: latestObservedTradingDate(snapshot.stocks?.[ticker]?.rawHistory),
    })), invalidBenchmarks,
    emptyCoreBaskets, sampleCoreCoverage: coreCoverage.slice(0, 5),
  }));

  if (!report.success || sessionRatio < 0.90 || !referenceTradingDate || invalidBenchmarks.length ||
      emptyCoreBaskets.length || !Number.isFinite(Date.parse(snapshot.fetchedAt))) {
    throw new Error(
      'Collection did not meet quality thresholds (>=90% of thematic stocks ' +
      'with valid latest-session prices, every core basket represented, ' +
      'four matching-session benchmarks). ' +
      'No changes will be committed; the previous verified snapshot remains live.'
    );
  }

  // The scheduler's fetchedAt means collection time, not the last exchange
  // session. Explicitly distinguish collection from observed trading dates.
  snapshot.totalExpectedStocks = expected.length;
  snapshot.freshStocksCount = fresh.length;
  snapshot.freshCoveragePct = Number((ratio * 100).toFixed(1));
  snapshot.referenceTradingDate = referenceTradingDate;
  snapshot.currentSessionStocksCount = currentSessionTickers.length;
  snapshot.currentSessionCoveragePct = Number((sessionRatio * 100).toFixed(1));
  snapshot.staleSessionTickers = staleSessionTickers;
  if (sessionRatio < 0.75) {
    console.warn('[PARTIAL-MARKET-SESSION] Only ' + snapshot.currentSessionCoveragePct +
      '% of verified thematic stocks have closes through benchmark date ' +
      referenceTradingDate + '. This snapshot is retained with explicit partial-coverage metadata.');
  }
  snapshot.sessionCoverageMethod = 'Validated retained + downloaded daily closes, aligned to NIFTY 500 session';
  snapshot.collectionMethod = 'GitHub Actions scheduled pull — Yahoo daily closes';
  fs.writeFileSync(filename, JSON.stringify(snapshot) + '\n');
  console.info('Accepted market snapshot; all quality gates passed.');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
