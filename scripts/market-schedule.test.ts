import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync('.github/workflows/market-snapshot-refresh.yml', 'utf8');
const app = readFileSync('src/App.tsx', 'utf8');

describe('zero-config automatic market collection policy', () => {
  it('has exactly the three originally requested IST slots on Indian trading sessions', () => {
    const crons = [...workflow.matchAll(/cron:\s*'([^']+)'/g)].map(x => x[1]);
    assert.deepEqual(crons, [
      '0 13 * * 1-5',  // 18:30 IST Monday-Friday
      '30 20 * * 1-5', // 02:00 IST Tuesday-Saturday
      '30 22 * * 1-5', // 04:00 IST Tuesday-Saturday
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
