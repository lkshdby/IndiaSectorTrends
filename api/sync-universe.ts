import type { IncomingMessage, ServerResponse } from 'node:http';
import { timingSafeEqual } from 'node:crypto';

const REPO = 'lkshdby/IndiaSectorTrends';
const WORKFLOW = 'market-snapshot-refresh.yml';

function sameSecret(a: string, b: string): boolean {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length > 0 && x.length === y.length && timingSafeEqual(x, y);
}

function reply(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(JSON.stringify(body));
}

/**
 * Vercel serverless entrypoint: merely queues a durable GitHub Actions job.
 * Running 450+ Yahoo requests in a Vercel invocation would time out; the
 * workflow writes the refreshed snapshot to the repository instead.
 *
 * Required Vercel *server-side* env vars:
 * GITHUB_ACTIONS_TOKEN — fine-grained token restricted to this repo, Actions:write
 * SYNC_ADMIN_KEY — random secret the user enters when pressing Sync.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return reply(res, 405, { success: false, error: 'Use POST to queue the refresh workflow' });
  }

  const token = process.env.GITHUB_ACTIONS_TOKEN;
  const key = process.env.SYNC_ADMIN_KEY;
  if (!token || !key) {
    return reply(res, 503, {
      success: false,
      error: 'Manual sync is not configured: set GITHUB_ACTIONS_TOKEN and SYNC_ADMIN_KEY in Vercel environment settings',
    });
  }

  const supplied = req.headers['x-sync-key'];
  const received = typeof supplied === 'string' ? supplied : '';
  if (!sameSecret(received, key)) {
    return reply(res, 401, { success: false, error: 'Invalid sync admin key' });
  }

  try {
    const upstream = await fetch(
      `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
          'User-Agent': 'IndiaSectorTrends-Vercel',
        },
        body: JSON.stringify({ ref: 'main' }),
        signal: AbortSignal.timeout(15000),
      },
    );
    if (!upstream.ok) {
      console.error('GitHub workflow dispatch failed with status', upstream.status);
      return reply(res, 502, {
        success: false,
        error: `GitHub refused the refresh request (HTTP ${upstream.status}). Check workflow permissions and token.`,
      });
    }
    return reply(res, 202, {
      success: true,
      queued: true,
      message: 'Refresh queued in GitHub Actions; market data is not yet updated.',
      workflow: `https://github.com/${REPO}/actions/workflows/${WORKFLOW}`,
    });
  } catch (error) {
    console.error('GitHub workflow dispatch network failure', error);
    return reply(res, 502, { success: false, error: 'Could not contact GitHub to queue a refresh' });
  }
}
