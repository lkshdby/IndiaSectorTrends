/** Public GitHub snapshot committed by the durable scheduled refresh workflow. */
const SNAPSHOT_URL =
  'https://raw.githubusercontent.com/lkshdby/IndiaSectorTrends/main/src/data/verifiedLiveMarketData.json';

export async function loadCommittedMarketSnapshot(): Promise<any> {
  const response = await fetch(SNAPSHOT_URL, {
    cache: 'no-store',
    headers: { 'User-Agent': 'IndiaSectorTrends-Vercel' },
    signal: AbortSignal.timeout(18000),
  });
  if (!response.ok) throw new Error(`GitHub snapshot fetch: HTTP ${response.status}`);
  const body = await response.json();
  if (!body || typeof body !== 'object' || !body.stocks || !body.benchmarks) {
    throw new Error('Invalid committed market snapshot');
  }
  return body;
}
