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
    assert.ok(workflow.includes('workflow_dispatch:'), 'Manual dry-run trigger should be enabled');
    assert.ok(!workflow.includes('inputs:'), 'Manual test does not offer a publish option');
  });

  it('never publishes a snapshot from manually triggered runs', () => {
    assert.match(workflow, /- name: Commit validated snapshot \(scheduled runs only\)\s*if: \$\{\{ github\.event_name == 'schedule' \}\}/);
    assert.match(workflow, /MARKET_REFRESH_MODE: \$\{\{ github\.event_name == 'workflow_dispatch' && 'dry-run' \|\| 'scheduled' \}\}/);
    assert.ok(workflow.includes('if: ${{ github.event_name == \'workflow_dispatch\' }}'));
    const script = readFileSync('scripts/refresh-market-snapshot.ts', 'utf8');
    assert.ok(script.includes('GITHUB_STEP_SUMMARY'));
    assert.ok(script.includes('Manual dry-run quality check (never published)'));
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
    assert.ok(script.includes('ratio >= 0.90'));
    assert.ok(script.includes('emptyCoreBaskets.length === 0'));
    assert.ok(script.includes('invalidBenchmarks.length === 0'));
    assert.ok(workflow.includes('git add src/data/verifiedLiveMarketData.json'));
  });
});
