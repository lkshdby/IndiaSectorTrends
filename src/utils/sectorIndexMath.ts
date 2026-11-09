import type { HistoricalPricePoint, StockConstituent, SectorIndexData } from '../types/indexTracker';

/** Legacy cached histories use "9 Nov"; new fetches use ISO dates.
 * Month/day matching is safe only for the current ~3-month chart window.
 * Do not reuse this key for multi-year backtesting.
 */
export function tradingDayKey(date: string): string | null {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (iso) return iso[2] + '-' + iso[3];
  const legacy = /^(\d{1,2})\s+([A-Za-z]{3})$/.exec(date);
  if (!legacy) return null;
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const monthIndex = months.indexOf(legacy[2].toLowerCase());
  if (monthIndex < 0 || +legacy[1] < 1 || +legacy[1] > 31) return null;
  return String(monthIndex + 1).padStart(2, '0') + '-' + legacy[1].padStart(2, '0');
}

export interface PriceHistorySource {
  history: { date: string; value: number }[];
}
export type PriceHistoryLookup = Record<string, PriceHistorySource | undefined>;
export interface AlignedBasketResult {
  history: HistoricalPricePoint[];
  includedTickers: string[];
  totalConstituents: number;
  dataCoveragePct: number;
}

/** Fixed-cohort, date-aligned base-100 basket for a display window.
 * No interpolation, no synthetic prices, and no index-position matching.
 * Each constituent is rebased on the SAME anchor date; we omit dates with
 * missing closes rather than silently change the composition of the basket.
 * Market-cap weights are fixed snapshots, not continuously rebalanced weights.
 */
export function buildAlignedBasketHistory(
  stocks: Pick<StockConstituent, 'ticker' | 'marketCapCr'>[],
  lookup: PriceHistoryLookup,
  weightingMode: 'equal' | 'mcap'
): AlignedBasketResult {
  const totalConstituents = stocks.length;
  const empty = { history: [], includedTickers: [], totalConstituents, dataCoveragePct: 0 };
  const observed = stocks.map(stock => {
    const source = lookup[stock.ticker] || lookup[stock.ticker.toUpperCase()];
    const byDay = new Map<string, number>();
    for (const point of source?.history || []) {
      const key = tradingDayKey(point.date);
      if (key && Number.isFinite(point.value) && point.value > 0) byDay.set(key, point.value);
    }
    return { stock, byDay, timeline: (source?.history || []).filter(p => tradingDayKey(p.date)) };
  }).filter(x => x.byDay.size >= 2);
  if (!observed.length) return empty;

  const reference = observed.reduce((a, b) => a.timeline.length >= b.timeline.length ? a : b);
  const minAtAnchor = Math.max(1, Math.ceil(observed.length * 0.75));
  const anchor = reference.timeline.find((point, i) =>
    i < reference.timeline.length - 1 &&
    observed.filter(item => item.byDay.has(tradingDayKey(point.date) || '')).length >= minAtAnchor
  );
  if (!anchor) return empty;
  const anchorKey = tradingDayKey(anchor.date)!;
  const cohort = observed.filter(item => item.byDay.has(anchorKey));
  const baseline = new Map(cohort.map(item => [item.stock.ticker, item.byDay.get(anchorKey)!]));
  const result: HistoricalPricePoint[] = [];

  const referenceStart = reference.timeline.findIndex(p => tradingDayKey(p.date) === anchorKey);
  for (const point of reference.timeline.slice(referenceStart)) {
    const key = tradingDayKey(point.date);
    if (!key || cohort.some(item => !item.byDay.has(key))) continue;
    let ewSum = 0, mcapSum = 0, mcapWeight = 0;
    for (const item of cohort) {
      const indexedValue = 100 * item.byDay.get(key)! / baseline.get(item.stock.ticker)!;
      ewSum += indexedValue;
      const w = Number.isFinite(item.stock.marketCapCr) && item.stock.marketCapCr > 0
        ? item.stock.marketCapCr : 0;
      mcapSum += indexedValue * w;
      mcapWeight += w;
    }
    const ew = ewSum / cohort.length;
    const mc = mcapWeight > 0 ? mcapSum / mcapWeight : ew;
    result.push({
      date: point.date,
      value: Number((weightingMode === 'mcap' ? mc : ew).toFixed(2)),
      equalWeightValue: Number(ew.toFixed(2)),
      mcapWeightValue: Number(mc.toFixed(2)),
      volume: 0, // Actual aggregate traded volume is not provided by these inputs.
    });
  }

  if (result.length < 2) return empty;
  return {
    history: result,
    includedTickers: cohort.map(item => item.stock.ticker),
    totalConstituents,
    dataCoveragePct: Math.round(100 * cohort.length / (totalConstituents || 1)),
  };
}

/** Heuristic price-based phase. This is not evidence of institutional flows. */
export function classifyPriceRotation(
  return1W: number, return3M: number,
  benchmark1W: number, benchmark3M: number, positiveBreadthPct: number
): SectorIndexData['rotationStatus'] {
  const shortRS = return1W - benchmark1W;
  const longRS = return3M - benchmark3M;
  if (longRS > 0 && shortRS > 0 && positiveBreadthPct >= 55) return 'Leading';
  if (longRS <= 0 && shortRS > 0 && positiveBreadthPct >= 50) return 'Improving';
  if (longRS > 0) return 'Weakening';
  return 'Lagging';
}
