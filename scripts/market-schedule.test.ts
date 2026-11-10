import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync('.github/workflows/market-snapshot-refresh.yml', 'utf8');
const app = readFileSync('src/App.tsx', 'utf8');

describe('zero-config automatic market collection policy', () => {
  it('has exactly the three originally requested IST slots every calendar day', () => {
    const crons = [...workflow.matchAll(/cron:\s*'([^']+)'/g)].map(x => x[1]);
    assert.deepEqual(crons, [
      '0 13 * * *',  // 18:30 IST daily
      '30 20 * * *', // 02:00 IST daily
      '30 22 * * *', // 04:00 IST daily
    ]);
    assert.ok(!workflow.includes('workflow_dispatch:'));
  });

  it('does not require an admin key or post a manual sync request', () => {
    assert.ok(!app.includes('SYNC_ADMIN_KEY'));
    assert.ok(!app.includes('GITHUB_ACTIONS_TOKEN'));
    assert.ok(!app.includes("method: 'POST'"));
    assert.ok(!app.includes("fetch('/api/sync-universe'"));
    assert.ok(app.includes("fetch(`/api/stocks-snapshot?reload="));
  });

  it('keeps previous snapshot on a failed collection', () => {
    const script = readFileSync('scripts/refresh-market-snapshot.ts', 'utf8');
    assert.ok(script.includes('ratio < 0.90'));
    assert.ok(script.includes('emptyCoreBaskets.length'));
    assert.ok(script.includes('invalidBenchmarks.length'));
    assert.ok(workflow.includes('git add src/data/verifiedLiveMarketData.json'));
  });
});
