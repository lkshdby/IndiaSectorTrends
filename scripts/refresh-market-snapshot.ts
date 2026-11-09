import fs from 'node:fs';
import path from 'node:path';
import { runFullUniverseSync } from '../server/marketSync';

/**
 * Runs in GitHub Actions, not Vercel's short-lived API process.
 * A failed/partial refresh never gets committed by the Actions workflow.
 */
async function main() {
  const refreshed = await runFullUniverseSync('GitHub Actions exchange-session snapshot refresh');
  console.info('Refresh report:', JSON.stringify(refreshed));
  const requiredFresh = Math.max(100, Math.ceil(refreshed.totalRequestedCount * 0.5));
  if (!refreshed.success || refreshed.updatedStocksCount < requiredFresh) {
    throw new Error(`Only ${refreshed.updatedStocksCount}/${refreshed.totalRequestedCount} records refreshed; need at least ${requiredFresh}. No commit will occur.`);
  }

  const filename = path.join(process.cwd(), 'src', 'data', 'verifiedLiveMarketData.json');
  const snapshot = JSON.parse(fs.readFileSync(filename, 'utf8'));
  // Compact output: the source snapshot is large and is served to browser clients.
  fs.writeFileSync(filename, JSON.stringify(snapshot) + '\n');
  console.info('Validated stock snapshot written:', filename, 'symbols:', Object.keys(snapshot.stocks || {}).length);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
