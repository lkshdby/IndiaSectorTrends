import type { IncomingMessage, ServerResponse } from 'node:http';
import { loadCommittedMarketSnapshot } from '../lib/githubMarketSnapshot';

/**
 * Compatibility with IndexTrackerView's existing per-basket request.
 * Vercel serves the last committed snapshot. A "force=true" query cannot
 * perform market-provider refreshes in a short-lived Vercel function.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
  }
  const url = new URL(req.url || '/', 'https://local.invalid');
  const tickers = (url.searchParams.get('tickers') || '').split(',')
    .map(x => x.trim().toUpperCase()).filter(Boolean).slice(0, 500);
  if (!tickers.length) return res.end(JSON.stringify({ success: true, count: 0, stocks: {} }));
  try {
    const snap = await loadCommittedMarketSnapshot();
    const stocks: Record<string, unknown> = {};
    for (const ticker of new Set(tickers)) {
      if (Object.prototype.hasOwnProperty.call(snap.stocks, ticker)) stocks[ticker] = snap.stocks[ticker];
    }
    return res.end(JSON.stringify({
      success: true, count: Object.keys(stocks).length, stocks,
      cached: true, fetchedAt: snap.fetchedAt || snap.syncedAt || null,
    }));
  } catch (error) {
    console.warn('Saved per-stock history unavailable', error);
    res.statusCode = 503;
    return res.end(JSON.stringify({ success: false, error: 'Saved price histories unavailable' }));
  }
}
