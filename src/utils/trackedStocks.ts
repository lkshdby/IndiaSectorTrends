export const TRACKED_STOCKS_KEY = 'sector_rotation_personal_tracked_stocks_v1';

export interface TrackedStock {
  ticker: string;
  name: string;
  sectorId?: string;
  addedAt: string;
}

/** Accept an NSE symbol with or without the provider's .NS suffix. */
export function normalizeTrackedTicker(input: string): string | null {
  const candidate = String(input || '').trim().toUpperCase().replace(/\.NS$/, '');
  return /^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(candidate) ? candidate : null;
}

export function parseTrackedStocks(value: unknown): TrackedStock[] {
  if (!Array.isArray(value)) return [];
  const parsed: TrackedStock[] = [];
  const seen = new Set<string>();
  for (const raw of value.slice(0, 500)) {
    if (!raw || typeof raw !== 'object') continue;
    const obj = raw as Partial<TrackedStock>;
    const ticker = normalizeTrackedTicker(String(obj.ticker || ''));
    if (!ticker || seen.has(ticker)) continue;
    const addedAt = typeof obj.addedAt === 'string' && Number.isFinite(Date.parse(obj.addedAt))
      ? obj.addedAt : new Date(0).toISOString();
    parsed.push({
      ticker,
      name: typeof obj.name === 'string' ? obj.name.trim().slice(0, 120) || ticker : ticker,
      sectorId: typeof obj.sectorId === 'string' ? obj.sectorId.slice(0, 120) : undefined,
      addedAt,
    });
    seen.add(ticker);
    if (parsed.length >= 200) break;
  }
  return parsed;
}

export function readTrackedStocks(): TrackedStock[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const saved = localStorage.getItem(TRACKED_STOCKS_KEY);
    return saved ? parseTrackedStocks(JSON.parse(saved)) : [];
  } catch {
    return [];
  }
}

export function writeTrackedStocks(items: TrackedStock[]): boolean {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(TRACKED_STOCKS_KEY, JSON.stringify(parseTrackedStocks(items)));
    return true;
  } catch {
    return false;
  }
}

export function addTrackedStock(
  current: TrackedStock[],
  tickerInput: string,
  name: string,
  sectorId?: string,
  now = new Date().toISOString()
): TrackedStock[] {
  const ticker = normalizeTrackedTicker(tickerInput);
  if (!ticker) throw new Error('Use a valid NSE ticker (letters, numbers, &, -, or .)');
  if (current.some(item => item.ticker === ticker)) return current;
  if (current.length >= 200) throw new Error('Personal watchlist limit is 200 stocks');
  return [...current, {
    ticker,
    name: name.trim().slice(0, 120) || ticker,
    sectorId: sectorId || undefined,
    addedAt: now,
  }];
}

export function removeTrackedStock(current: TrackedStock[], ticker: string): TrackedStock[] {
  return current.filter(item => item.ticker !== ticker);
}

/**
 * A public GitHub issue is a REQUEST, not a mechanism that silently changes
 * curated basket membership or the scheduled quote universe.
 */
export function dataFeedRequestUrl(stock: TrackedStock): string {
  const title = `Add ${stock.ticker} to the tracked market-data universe`;
  const body = `Ticker: ${stock.ticker}\\nCompany: ${stock.name}\\nSuggested sector: ${stock.sectorId || 'Unspecified'}\\n\\nPlease verify the listing symbol, liquidity, and business theme before including it in the scheduled collection.\\n`;
  return `https://github.com/lkshdby/IndiaSectorTrends/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}
