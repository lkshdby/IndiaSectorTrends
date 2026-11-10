import { BASIC_INDUSTRIES, type BasicIndustry } from '../data/basicIndustryCatalog';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, type BasicIndustryAssignment } from '../data/basicIndustryMappings';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import { buildAlignedBasketHistory, tradingDayKey } from './sectorIndexMath';
import { sanitizeSnapshot, type PriceHistoryRecord } from './priceQuality';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

export type IndustryConfidence = 'rankable' | 'limited-sample' | 'single-stock' | 'unmapped' | 'insufficient-data';

export interface BasicIndustryScore {
  industry: BasicIndustry;
  verifiedTickers: string[];
  pricedTickers: string[];
  pricedCount: number;
  mappedCount: number;
  coveragePct: number;
  historyDates: number;
  price1W: number | null;
  price1M: number | null;
  momentumAcceleration1W: number | null;
  mcap1M: number | null;
  nifty500Relative1M: number | null;
  advancing1W: number;
  breadth1W: number | null;
  concentrationPct: number | null;
  confidence: IndustryConfidence;
  provenance: { ticker: string; sourceUrl: string }[];
}
export interface IndustryDiscoverySummary {
  industryRows: BasicIndustryScore[];
  verifiedMappingCount: number;
  universeSize: number;
  unclassifiedTickers: number;
  eligibleCount: number;
  groupedIndustries: number;
  snapshotFetchedAt: string | null;
}

const marketCapByTicker = new Map<string, number>();
const trackedSymbols = new Set<string>();
for (const sector of THEMATIC_SECTOR_INDICES) {
  for (const stock of sector.stocks) {
    trackedSymbols.add(stock.ticker.toUpperCase());
    if (!marketCapByTicker.has(stock.ticker.toUpperCase())) {
      marketCapByTicker.set(stock.ticker.toUpperCase(), stock.marketCapCr || 0);
    }
  }
}

type Validated = NonNullable<ReturnType<typeof sanitizeSnapshot>[string]>;

function horizonReturn(history: { date: string; value: number }[], sessions: number): number | null {
  if (history.length < sessions + 1) return null;
  const current = history[history.length - 1]?.value;
  const base = history[history.length - 1 - sessions]?.value;
  return base > 0 && current > 0 && Number.isFinite(base) && Number.isFinite(current)
    ? Number(((current / base - 1) * 100).toFixed(2)) : null;
}

/**
 * Momentum acceleration = latest 5-session return minus the equivalent
 * 5-session pace of the PRECEDING 16 sessions (both measured from the same
 * aligned 21-session price history). Positive means returns have sped up.
 *
 * This is an arithmetic return-speed heuristic, not technical momentum
 * (12–1), earnings momentum, an alpha estimate, or proof of trend strength.
 * The return percentages describe price change, not expected future return.
 */
export function weeklyMomentumAcceleration(weekPct: number | null, monthPct: number | null): number | null {
  if (weekPct === null || monthPct === null ||
      !Number.isFinite(weekPct) || !Number.isFinite(monthPct) ||
      weekPct <= -100 || monthPct <= -100) return null;
  const prior16Gross = (1 + monthPct / 100) / (1 + weekPct / 100);
  if (!Number.isFinite(prior16Gross) || prior16Gross <= 0) return null;
  const prior5SessionPace = (Math.pow(prior16Gross, 5 / 16) - 1) * 100;
  return Number((weekPct - prior5SessionPace).toFixed(2));
}

/** Relative strength must compare the same *observed session dates*.
 * If a benchmark is missing the same endpoint dates, the result is unavailable.
 */
export function alignedRelativeReturn(
  cohort: { date: string; value: number }[],
  benchmark: { date: string; value: number }[],
  sessionSpan: number
): number | null {
  if (cohort.length < sessionSpan + 1 || benchmark.length < sessionSpan + 1) return null;
  const start = cohort[cohort.length - 1 - sessionSpan], end = cohort[cohort.length - 1];
  const startKey = tradingDayKey(start.date), endKey = tradingDayKey(end.date);
  if (!startKey || !endKey || startKey === endKey || start.value <= 0 || end.value <= 0) return null;
  const byDay = new Map(benchmark.map(point => [tradingDayKey(point.date), point.value]));
  const before = byDay.get(startKey), after = byDay.get(endKey);
  if (!before || !after || before <= 0 || after <= 0) return null;
  const priceReturn = 100 * (end.value / start.value - 1);
  const benchmarkReturn = 100 * (after / before - 1);
  return Number((priceReturn - benchmarkReturn).toFixed(2));
}

export function describeConfidence(mapped: number, priced: number, coverage: number, largestWeightPct: number | null): IndustryConfidence {
  if (mapped === 0) return 'unmapped';
  if (priced === 0 || coverage < 80) return 'insufficient-data';
  if (priced === 1 || mapped === 1) return 'single-stock';
  if (priced < 5 || (largestWeightPct !== null && largestWeightPct >= 65)) return 'limited-sample';
  return 'rankable';
}

/** Only explicit, source-checked NSE or user-imported, code-validated Screener mappings may contribute to indices.
 * A user's personal watchlist or thematic membership is NOT classification evidence.
 */
export function computeIndustryDiscovery(
  snapshot: BrowserMarketSnapshot | null,
  trustedMappings: ReadonlyMap<string, BasicIndustryAssignment> = VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS,
): IndustryDiscoverySummary {
  const rawPrices = snapshot ? sanitizeSnapshot(snapshot.stocks) : {};
  const stocks = rawPrices as Record<string, Validated>;
  const nifty500 = snapshot?.benchmarks?.nifty500;
  const benchmarkHistory = Array.isArray(nifty500?.history) ? nifty500.history : [];
  const grouped = new Map<string, { ticker: string; sourceUrl: string }[]>();
  for (const [ticker, mapping] of trustedMappings) {
    if (!trackedSymbols.has(ticker)) continue;
    const current = grouped.get(mapping.basicIndustry) || [];
    current.push({ ticker, sourceUrl: mapping.sourceUrl });
    grouped.set(mapping.basicIndustry, current);
  }

  const industryRows = BASIC_INDUSTRIES.map(industry => {
    const mapped = grouped.get(industry.name) || [];
    const validated = mapped.filter(({ ticker }) => {
      const quote = stocks[ticker];
      return !!quote?.rawHistory && quote.rawHistory.length >= 40 && quote.history.length >= 22;
    });
    const priced = validated.map(({ ticker }) => ticker);
    const weightedStocks = priced.map(ticker => ({ ticker, marketCapCr: marketCapByTicker.get(ticker) || 0 }));
    // The price sanitizer exposes optional histories in its public type; only
    // validated observations are allowed into the date-aligned index builder.
    const observedHistories = Object.fromEntries(validated.map(({ ticker }) => [
      ticker, { history: stocks[ticker].history || [] },
    ]));
    const aligned = buildAlignedBasketHistory(weightedStocks, observedHistories, 'equal');
    const alignedCohort = new Set(aligned.includedTickers);
    const effective = priced.filter(ticker => alignedCohort.has(ticker));
    const total = mapped.length;
    const coverage = total > 0 ? Math.round(100 * effective.length / total) : 0;
    const caps = effective.map(ticker => marketCapByTicker.get(ticker) || 0);
    const capSum = caps.reduce((acc, x) => acc + x, 0);
    const concentration = capSum > 0 ? Math.round(100 * Math.max(...caps) / capSum) : null;
    const oneW = horizonReturn(aligned.history, 5);
    const oneM = horizonReturn(aligned.history, 21);
    const acceleration = weeklyMomentumAcceleration(oneW, oneM);
    const weightedM = horizonReturn(aligned.history.map(point => ({
      date: point.date, value: point.mcapWeightValue || point.value,
    })), 21);
    const advancing1W = effective.reduce((acc, ticker) => acc + (stocks[ticker].change1W > 0 ? 1 : 0), 0);
    let confidence = describeConfidence(total, effective.length, coverage, concentration);
    if (confidence === 'rankable' && oneM === null) confidence = 'insufficient-data';
    return {
      industry,
      verifiedTickers: mapped.map(x => x.ticker),
      pricedTickers: effective,
      pricedCount: effective.length,
      mappedCount: total,
      coveragePct: coverage,
      historyDates: aligned.history.length,
      price1W: oneW,
      price1M: oneM,
      momentumAcceleration1W: acceleration,
      mcap1M: weightedM,
      nifty500Relative1M: alignedRelativeReturn(aligned.history, benchmarkHistory, 21),
      advancing1W,
      breadth1W: effective.length > 0 ? Math.round(100 * advancing1W / effective.length) : null,
      concentrationPct: concentration,
      confidence,
      provenance: mapped,
    } satisfies BasicIndustryScore;
  });

  const verifiedMapped = [...trustedMappings.keys()].filter(ticker => trackedSymbols.has(ticker));
  return {
    industryRows,
    verifiedMappingCount: verifiedMapped.length,
    universeSize: trackedSymbols.size,
    unclassifiedTickers: trackedSymbols.size - verifiedMapped.length,
    eligibleCount: industryRows.filter(row => row.confidence === 'rankable').length,
    groupedIndustries: industryRows.filter(row => row.mappedCount > 0).length,
    snapshotFetchedAt: snapshot?.fetchedAt || null,
  };
}
