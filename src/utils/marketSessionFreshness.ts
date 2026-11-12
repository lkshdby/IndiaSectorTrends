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
