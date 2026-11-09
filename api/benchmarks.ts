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
    const bm = { ...data.benchmarks };
    if (bm.niftyMidcap) {
      bm.niftyMidcap = { ...bm.niftyMidcap, name: 'NIFTY Midcap 100 ETF proxy (MOM100)', price: 0 };
    }
    if (bm.niftySmallcap) {
      bm.niftySmallcap = { ...bm.niftySmallcap, name: 'NIFTY Smallcap 100 ETF proxy (SML100CASE)', price: 0 };
    }
    return res.end(JSON.stringify({ success: true, benchmarks: bm, fetchedAt: data.fetchedAt || data.syncedAt || null }));
  } catch (error) {
    console.warn('Committed benchmark snapshot unavailable', error);
    res.statusCode = 503;
    return res.end(JSON.stringify({ success: false, error: 'Saved benchmarks temporarily unavailable' }));
  }
}
