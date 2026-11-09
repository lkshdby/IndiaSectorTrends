/**
 * Shared input validation for market snapshots. A quote without coherent daily
 * closes is not trusted merely because its provider returned HTTP 200.
 */
export interface DailyClose { date: string; close: number }
export interface PriceHistoryRecord {
  ticker?: string;
  symbol?: string;
  price?: number;
  change1D?: number;
  change1W?: number;
  change3M?: number;
  rawHistory?: DailyClose[];
  history?: { date: string; value: number }[];
  fetchedAt?: string;
  dataQuality?: 'ok' | 'repaired' | 'insufficient-history' | 'quarantined';
  qualityNotes?: string[];
  [key: string]: unknown;
}

export interface QualityResult { record: PriceHistoryRecord | null; warnings: string[] }

const round2 = (x: number) => Number(x.toFixed(2));
const pct = (now: number, past: number) => past > 0 ? 100 * (now / past - 1) : NaN;

export function isIsoTradingDay(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}
function isRecognizedDate(date: string): boolean {
  return isIsoTradingDay(date) || /^\d{1,2}\s+[A-Za-z]{3}$/.test(date);
}

/**
 * Ensures the displayed quote and returns agree with the same daily close
 * timeline. Does not fabricate earlier observations or carry forward gaps.
 * A 40%+ unexplained one-session move is quarantined pending a corporate-action
 * or exchange-price verification; it must not drive sector rankings.
 */
export function validateAndRepairStock(record: PriceHistoryRecord | null | undefined): QualityResult {
  if (!record || !Array.isArray(record.rawHistory)) return { record: null, warnings: ['Missing raw daily-close history'] };
  const raw = record.rawHistory.filter(p =>
    !!p && isRecognizedDate(p.date) && Number.isFinite(p.close) && p.close > 0
  );
  if (raw.length < 2) return { record: null, warnings: ['Insufficient valid daily closes'] };

  const notes: string[] = [];
  const latest = raw[raw.length - 1].close;
  const quoted = Number(record.price);
  if (!Number.isFinite(quoted) || quoted <= 0 || Math.abs(pct(quoted, latest)) > 5) {
    notes.push(`Provider quote ${quoted} disagreed with the last observed close ${latest}; close used`);
  }

  // A large raw discontinuity may be a split or provider data error. Without
  // adjusted-price confirmation, prefer absence over a fictitious return.
  const lastDayMove = pct(latest, raw[raw.length - 2].close);
  const suspectJump = raw.some((point, idx) =>
    idx > 0 && Math.abs(pct(point.close, raw[idx - 1].close)) > 40
  );
  if (suspectJump) {
    return { record: null, warnings: ['Unverified >40% one-session price discontinuity; check split / bonus / exchange data'] };
  }

  const oneWeekIndex = Math.max(0, raw.length - 6);
  const first = raw[0].close;
  const returns = {
    change1D: round2(lastDayMove),
    change1W: round2(pct(latest, raw[oneWeekIndex].close)),
    change3M: raw.length >= 40 ? round2(pct(latest, first)) : undefined,
  };

  // Stored normalizations are rebuilt from coherent prices. The source may be
  // pre-adjusted; full corporate-action-adjusted index construction is a
  // separate requirement and these are price-return, not total-return curves.
  const normalized = raw.map(p => ({
    date: p.date,
    value: round2(100 * p.close / first),
  }));

  const historyLimited = raw.length < 40;
  if (historyLimited) notes.push(`Only ${raw.length} observations; 3M return unavailable`);
  if (record.change1D !== undefined && Math.abs((record.change1D ?? 0) - returns.change1D) > 2) {
    notes.push('Cached one-day return replaced with daily-close-derived return');
  }
  return {
    record: {
      ...record,
      price: latest,
      rawHistory: raw,
      history: normalized,
      ...returns,
      dataQuality: historyLimited ? 'insufficient-history' : notes.length ? 'repaired' : 'ok',
      qualityNotes: notes,
    },
    warnings: notes,
  };
}

/** Returns undefined when there are not enough observed trading sessions. */
export function observedHorizonReturn(
  record: PriceHistoryRecord | null | undefined,
  lookbackSessions: number
): number | undefined {
  if (!record?.rawHistory || record.rawHistory.length < lookbackSessions + 1) return undefined;
  const h = record.rawHistory;
  return round2(pct(h[h.length - 1].close, h[h.length - 1 - lookbackSessions].close));
}

/** Validate all cached records before giving them to any basket calculation. */
export function sanitizeSnapshot<T extends Record<string, PriceHistoryRecord>>(raw: T): T {
  const clean: Record<string, PriceHistoryRecord> = {};
  for (const [ticker, value] of Object.entries(raw || {})) {
    const result = validateAndRepairStock(value);
    if (result.record) clean[ticker.toUpperCase()] = result.record;
  }
  return clean as T;
}
