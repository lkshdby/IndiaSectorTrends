/**
 * A successful download is not proof of an up-to-date exchange observation.
 * Dates are ISO YYYY-MM-DD trading-session keys, not request timestamps.
 */
export interface DatedObservation { date: string }

export function latestObservedTradingDate(
  history: readonly DatedObservation[] | null | undefined,
): string | null {
  if (!history) return null;
  let latest: string | null = null;
  for (const point of history) {
    if (point && /^\d{4}-\d{2}-\d{2}$/.test(point.date) &&
        (latest === null || point.date > latest)) {
      latest = point.date;
    }
  }
  return latest;
}

/** Prefer a mirror only if its last actually observed exchange day is newer. */
export function preferFresherChart<T extends { rawHistory: readonly DatedObservation[] }>(
  original: T, alternate: T,
): T {
  const a = latestObservedTradingDate(original.rawHistory);
  const b = latestObservedTradingDate(alternate.rawHistory);
  return b !== null && (a === null || b > a) ? alternate : original;
}

export function hasObservedSession(
  history: readonly DatedObservation[] | null | undefined,
  referenceDate: string | null,
): boolean {
  const observed = latestObservedTradingDate(history);
  return referenceDate !== null && observed !== null && observed >= referenceDate;
}

/**
 * NSE and BSE have no normal cash-equity session on Saturday or Sunday.
 * Evaluate in IST, not GitHub runner UTC (the 02:00/04:00 IST jobs execute
 * during the previous UTC calendar date).
 */
export function isNseWeekend(at: Date): boolean {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata', weekday: 'short',
  }).format(at);
  return weekday === 'Sat' || weekday === 'Sun';
}

/**
 * Separate successful HTTP pulls from verified exchange-session coverage.
 * Retained, validated bars from the last successful run are still valid market
 * data when Yahoo serves an older bar on a non-trading day.
 */
export function assessObservedSessionCoverage<T extends {
  rawHistory?: readonly DatedObservation[] | null
}>(
  tickers: readonly string[],
  stocks: Readonly<Record<string, T | undefined>>,
  referenceDate: string | null,
  isValid: (stock: T) => boolean,
): { eligibleTickers: string[]; missingTickers: string[]; coverageRatio: number } {
  const eligibleTickers: string[] = [];
  const missingTickers: string[] = [];
  for (const ticker of [...new Set(tickers)]) {
    const record = stocks[ticker];
    if (record && isValid(record) && hasObservedSession(record.rawHistory, referenceDate)) {
      eligibleTickers.push(ticker);
    } else {
      missingTickers.push(ticker);
    }
  }
  return {
    eligibleTickers,
    missingTickers,
    coverageRatio: eligibleTickers.length + missingTickers.length > 0
      ? eligibleTickers.length / (eligibleTickers.length + missingTickers.length) : 0,
  };
}
