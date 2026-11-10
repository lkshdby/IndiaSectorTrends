import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fetchCommittedMarketSnapshot } from './marketSnapshotClient';

const stocks = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [
  `STK${i}`, { ticker: `STK${i}`, symbol: `STK${i}.NS`, price: 100, change1D: 0,
    change1W: 0, change3M: 0,
    history: [{ date: '2026-11-09', value: 100 }],
    rawHistory: [{ date: '2026-11-09', close: 100 }] },
]));
const benchmarks = Object.fromEntries(
  ['nifty50', 'niftyMidcap', 'niftySmallcap', 'nifty500'].map(k =>
    [k, { name: k, symbol: k, price: 100, change1W: 1, history: [{ date: '2026-11-09', value: 100 }] }]
  )
);
const payload = { stocks, benchmarks, fetchedAt: '2026-11-10T10:33:36.456Z' };
const json = (data: unknown) => new Response(JSON.stringify(data), {
  status: 200, headers: { 'content-type': 'application/json' }
});

describe('static Vercel frontend committed market-data loading', () => {
  it('loads raw GitHub without requiring the Vercel API, then provides stocks and benchmarks', async () => {
    const original = globalThis.fetch;
    const urls: string[] = [];
    globalThis.fetch = (async input => {
      urls.push(String(input));
      return json(payload);
    }) as typeof fetch;
    try {
      const snapshot = await fetchCommittedMarketSnapshot();
      assert.equal(snapshot.source, 'GitHub');
      assert.equal(snapshot.fetchedAt, payload.fetchedAt);
      assert.equal(Object.keys(snapshot.stocks).length, 101);
      assert.equal(snapshot.benchmarks.nifty50.change1W, 1);
      assert.equal(snapshot.benchmarks.niftyMidcap.price, 0);
      assert.equal(urls.length, 1);
      assert.match(urls[0], /^https:\/\/raw\.githubusercontent\.com\/lkshdby\/IndiaSectorTrends\/main\/src\/data\/verifiedLiveMarketData\.json\?v=/);
    } finally { globalThis.fetch = original; }
  });

  it('falls back to Vercel API endpoints when direct GitHub access is unavailable', async () => {
    const original = globalThis.fetch;
    const urls: string[] = [];
    globalThis.fetch = (async input => {
      const url = String(input); urls.push(url);
      if (url.startsWith('https://raw.githubusercontent.com/')) throw new Error('Network blocked');
      if (url.startsWith('/api/stocks-snapshot')) return json({ success: true, stocks, fetchedAt: payload.fetchedAt });
      if (url.startsWith('/api/benchmarks')) return json({ success: true, benchmarks, fetchedAt: payload.fetchedAt });
      throw new Error('Unknown URL');
    }) as typeof fetch;
    try {
      const result = await fetchCommittedMarketSnapshot();
      assert.equal(result.source, 'Vercel fallback');
      assert.equal(urls.length, 3);
    } finally { globalThis.fetch = original; }
  });

  it('rejects an SPA HTML response and surfaces both failures instead of showing success', async () => {
    const original = globalThis.fetch;
    globalThis.fetch = (async input => {
      if (String(input).startsWith('https://raw.githubusercontent.com/'))
        return new Response('<html>not a snapshot</html>', { status: 200, headers: { 'content-type': 'text/html' } });
      return new Response('not found', { status: 404, headers: { 'content-type': 'text/html' } });
    }) as typeof fetch;
    try {
      await assert.rejects(fetchCommittedMarketSnapshot(), error => {
        assert.ok(error instanceof Error);
        assert.match(error.message, /GitHub snapshot:.*HTML.*Vercel fallback: HTTP 404/);
        return true;
      });
    } finally { globalThis.fetch = original; }
  });
});
