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
    // An optional manual run is not a fourth automated schedule.
    assert.ok(workflow.includes('  workflow_dispatch:'));
    assert.ok(!workflow.includes('dry_run:'));
    assert.ok(!workflow.includes('if: github.event_name'));
  });

  it('keeps the browser read-only and requires no admin secrets for a manual GitHub run', () => {
    assert.ok(!app.includes('SYNC_ADMIN_KEY'));
    assert.ok(!app.includes('GITHUB_ACTIONS_TOKEN'));
    assert.ok(!app.includes("method: 'POST'"));
    assert.ok(!app.includes("fetch('/api/sync-universe'"));
    assert.ok(app.includes('fetchCommittedMarketSnapshot()'));
    const client = readFileSync('src/utils/marketSnapshotClient.ts', 'utf8');
    assert.ok(client.includes('raw.githubusercontent.com/lkshdby/IndiaSectorTrends/main'));
    assert.ok(client.includes('/api/stocks-snapshot'));
    assert.ok(client.includes('/api/benchmarks'));
  });

  it('keeps the git worktree clean before rebasing and publishing the snapshot', () => {
    assert.ok(workflow.includes('npm install --no-audit --no-fund --no-save --package-lock=false'));
    assert.ok(workflow.includes('git restore -- package-lock.json'));
    assert.ok(workflow.includes('git diff --quiet'));
    assert.ok(workflow.includes('git rebase origin/main'));
    assert.ok(workflow.includes('git push origin HEAD:main'));
  });

  it('keeps previous snapshot on a failed collection', () => {
    const script = readFileSync('scripts/refresh-market-snapshot.ts', 'utf8');
    assert.ok(script.includes('sessionRatio < 0.90'), 'quality is measured against latest observed market closes, not merely this run\'s HTTP downloads');
    assert.ok(script.includes('isNseWeekend(new Date())'), 'scheduled/manual weekend refresh must no-op without replacing verified Friday closes');
    assert.ok(script.includes('emptyCoreBaskets.length'));
    assert.ok(script.includes('invalidBenchmarks.length'));
    assert.ok(workflow.includes('git add src/data/verifiedLiveMarketData.json'));
    assert.ok(workflow.includes('git push origin HEAD:main'));
    assert.ok(workflow.includes('  workflow_dispatch:'));
  });
});
