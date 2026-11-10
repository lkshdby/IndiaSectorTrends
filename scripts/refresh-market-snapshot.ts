import fs from 'node:fs';
import path from 'node:path';
import { runFullUniverseSync } from '../server/marketSync';
import { CORE_SECTOR_INDICES, THEMATIC_SECTOR_INDICES } from '../src/data/sectorUniverse';
import { validateAndRepairStock } from '../src/utils/priceQuality';

/** GitHub Actions collects 3 times per IST calendar day. It never
 * overwrites the saved file if network/provider coverage is insufficient. */
async function main() {
  const startedAt = Date.now();
  const report = await runFullUniverseSync('Scheduled market collection (18:30 / 02:00 / 04:00 IST)');
  const filename = path.join(process.cwd(), 'src', 'data', 'verifiedLiveMarketData.json');
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
  const benchmarkNames = ['nifty50', 'niftyMidcap', 'niftySmallcap', 'nifty500'];
  const invalidBenchmarks = benchmarkNames.filter(key => {
    const benchmark = snapshot.benchmarks?.[key];
    return !benchmark || !Array.isArray(benchmark.history) ||
      benchmark.history.length < 40 ||
      !Number.isFinite(benchmark.history.at(-1)?.value) ||
      !Number.isFinite(Date.parse(benchmark.fetchedAt)) ||
      Date.parse(benchmark.fetchedAt) < startedAt;
  });

  // Avoid falsely updating all index rankings when an entire core basket
  // has failed its Yahoo requests. Other basket shortages are reported.
  const coreCoverage = CORE_SECTOR_INDICES.map(sector => {
    const valid = sector.stocks.filter(stock => fresh.includes(stock.ticker)).length;
    return { name: sector.name, fresh: valid, total: sector.stocks.length };
  });
  const emptyCoreBaskets = coreCoverage.filter(x => x.fresh === 0);

  console.info('Scheduled refresh quality report:', JSON.stringify({
    report, expectedStocks: expected.length, freshStocks: fresh.length,
    coveragePercent: Number((ratio * 100).toFixed(1)), invalidBenchmarks,
    emptyCoreBaskets, sampleCoreCoverage: coreCoverage.slice(0, 5),
  }));

  if (!report.success || ratio < 0.90 || invalidBenchmarks.length ||
      emptyCoreBaskets.length || !Number.isFinite(Date.parse(snapshot.fetchedAt))) {
    throw new Error(
      'Collection did not meet quality thresholds (>=90% freshly verified ' +
      'thematic tickers, every core basket represented, four usable benchmarks). ' +
      'No changes will be committed; the previous verified snapshot remains live.'
    );
  }

  // The scheduler's fetchedAt means collection time, not the last exchange
  // session. Explicitly distinguish collection from observed trading dates.
  snapshot.totalExpectedStocks = expected.length;
  snapshot.freshStocksCount = fresh.length;
  snapshot.freshCoveragePct = Number((ratio * 100).toFixed(1));
  snapshot.collectionMethod = 'GitHub Actions scheduled pull — Yahoo daily closes';
  fs.writeFileSync(filename, JSON.stringify(snapshot) + '\n');
  console.info('Accepted market snapshot; all quality gates passed.');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
