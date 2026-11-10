import type { BenchmarkItem } from '../types/indexTracker';
import type { INITIAL_LIVE_STOCKS_DATA } from './benchmarkService';

/** Uses GitHub's public raw-file endpoint: no Vercel function, token, or auth. */
const RAW_SNAPSHOT_URL =
  'https://raw.githubusercontent.com/lkshdby/IndiaSectorTrends/main/src/data/verifiedLiveMarketData.json';

export type BrowserMarketSnapshot = {
  stocks: typeof INITIAL_LIVE_STOCKS_DATA;
  benchmarks: Record<string, BenchmarkItem>;
  fetchedAt: string;
  source: 'GitHub' | 'Vercel fallback';
};

function validateSnapshot(value: unknown, source: BrowserMarketSnapshot['source']): BrowserMarketSnapshot {
  if (!value || typeof value !== 'object') throw new Error('Response is not a market-data object');
  const obj = value as Record<string, unknown>;
  const stocks = obj.stocks;
  const benchmarks = obj.benchmarks;
  const fetchedAt = obj.fetchedAt || obj.syncedAt;
  if (!stocks || typeof stocks !== 'object' || Array.isArray(stocks) || Object.keys(stocks).length < 100) {
    throw new Error('Market snapshot is missing stock histories');
  }
  if (!benchmarks || typeof benchmarks !== 'object' || Array.isArray(benchmarks)) {
    throw new Error('Market snapshot is missing benchmarks');
  }
  const required = ['nifty50', 'niftyMidcap', 'niftySmallcap', 'nifty500'];
  if (!required.every(k => Object.hasOwn(benchmarks, k))) {
    throw new Error('Market snapshot does not contain all four benchmarks');
  }
  if (typeof fetchedAt !== 'string' || !Number.isFinite(Date.parse(fetchedAt))) {
    throw new Error('Market snapshot has no valid collection timestamp');
  }
  const adjustedBenchmarks = {
    ...(benchmarks as Record<string, BenchmarkItem>),
  };
  // Both are ETF proxies; an old index-level price must never display as an ETF quote.
  for (const [key, label] of [
    ['niftyMidcap', 'NIFTY Midcap 100 ETF proxy (MOM100)'],
    ['niftySmallcap', 'NIFTY Smallcap 100 ETF proxy (SML100CASE)'],
  ]) {
    adjustedBenchmarks[key] = { ...adjustedBenchmarks[key], name: label, price: 0 };
  }
  return {
    stocks: stocks as BrowserMarketSnapshot['stocks'],
    benchmarks: adjustedBenchmarks,
    fetchedAt,
    source,
  };
}

async function getJson(url: string, timeoutMs: number): Promise<unknown> {
  // Browser fetches (including iPad Safari) can load public GitHub raw JSON.
  // The timestamp bypasses cached snapshots; no Authorization header is sent.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const type = response.headers.get('content-type') || '';
    if (type.includes('text/html')) throw new Error('The server returned HTML instead of market JSON');
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * First read committed data directly from GitHub, avoiding Vercel API 404/405/503
 * failures. If the public raw endpoint is inaccessible, try the existing Vercel
 * APIs. All errors are surfaced so the UI never falsely claims a successful reload.
 */
export async function fetchCommittedMarketSnapshot(): Promise<BrowserMarketSnapshot> {
  const version = Date.now();
  let rawProblem = '';
  try {
    return validateSnapshot(
      await getJson(`${RAW_SNAPSHOT_URL}?v=${version}`, 30000),
      'GitHub'
    );
  } catch (error) {
    rawProblem = error instanceof Error ? error.message : 'network failure';
  }
  try {
    const [stockPayload, benchmarkPayload] = await Promise.all([
      getJson(`/api/stocks-snapshot?v=${version}`, 20000),
      getJson(`/api/benchmarks?v=${version}`, 20000),
    ]);
    const stocks = stockPayload as Record<string, unknown>;
    const benchmarks = benchmarkPayload as Record<string, unknown>;
    if (!stocks?.success || !benchmarks?.success) {
      throw new Error('Vercel did not return two successful JSON responses');
    }
    return validateSnapshot({
      stocks: stocks.stocks,
      benchmarks: benchmarks.benchmarks,
      fetchedAt: stocks.fetchedAt || benchmarks.fetchedAt,
    }, 'Vercel fallback');
  } catch (error) {
    const backupProblem = error instanceof Error ? error.message : 'network failure';
    throw new Error(`GitHub snapshot: ${rawProblem}; Vercel fallback: ${backupProblem}`);
  }
}
