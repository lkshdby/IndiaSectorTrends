import type { IncomingMessage, ServerResponse } from 'node:http';
import { loadCommittedMarketSnapshot } from '../lib/githubMarketSnapshot';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
  }
  try {
    const data = await loadCommittedMarketSnapshot();
    return res.end(JSON.stringify({
      success: true,
      stocks: data.stocks,
      count: Object.keys(data.stocks).length,
      fetchedAt: data.fetchedAt || data.syncedAt || null,
      source: 'GitHub committed market snapshot',
    }));
  } catch (error) {
    console.warn('Committed stock snapshot unavailable', error);
    res.statusCode = 503;
    return res.end(JSON.stringify({ success: false, error: 'Saved market snapshot temporarily unavailable' }));
  }
}
