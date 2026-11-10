/**
 * Local-only classification intake. This script NEVER downloads external data
 * or writes to the live industry-assignment source. It writes a review report.
 *
 * npx tsx scripts/review-basic-industry-import.ts --coverage
 * npx tsx scripts/review-basic-industry-import.ts --input /secure/nse-classifications.csv --out /tmp/review.csv
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { THEMATIC_SECTOR_INDICES } from '../src/data/sectorUniverse';
import { buildBasicIndustryAudit, industryAuditCsv } from '../src/utils/basicIndustryCoverage';
import { reviewIndustryCsv, reviewCsvReport } from '../src/utils/basicIndustryCsvReview';
import type { BrowserMarketSnapshot } from '../src/utils/marketSnapshotClient';

const args = process.argv.slice(2);
const inputAt = args.indexOf('--input'), outputAt = args.indexOf('--out');
const isCoverage = args.includes('--coverage');
const inputPath = inputAt >= 0 ? args[inputAt + 1] : '';
const outputPath = outputAt >= 0 ? args[outputAt + 1] : '';
if ((inputAt >= 0 && !inputPath) || (outputAt >= 0 && !outputPath)) {
  throw new Error('Usage: --coverage [--out /tmp/coverage.csv] OR --input /secure/file.csv [--out /tmp/review.csv]');
}
if ((isCoverage && inputPath) || (!isCoverage && !inputPath)) {
  throw new Error('Choose --coverage or --input /secure/file.csv, not both.');
}

let snapshot: BrowserMarketSnapshot | null = null;
try {
  snapshot = JSON.parse(readFileSync(resolve('src/data/verifiedLiveMarketData.json'), 'utf8')) as BrowserMarketSnapshot;
} catch {
  console.warn('Committed snapshot unavailable; auditing static thematic symbols only');
}
const audit = buildBasicIndustryAudit(snapshot);
console.log(JSON.stringify({
  mode: isCoverage ? 'current-mapping-coverage' : 'incoming-file-review',
  universe: audit.totalUniverse,
  verifiedMapped: audit.coveredByVerifiedMapping,
  needingReview: audit.needingReview,
  mappedPercent: audit.mappedPct,
  snapshotFetchedAt: audit.snapshotFetchedAt,
}, null, 2));

if (isCoverage) {
  if (outputPath) {
    writeFileSync(resolve(outputPath), industryAuditCsv(audit.rows), { encoding: 'utf8', flag: 'w' });
    console.log(`Exported full source-verified coverage audit to ${resolve(outputPath)}`);
  }
} else {
  const input = readFileSync(resolve(inputPath), 'utf8');
  const symbols = new Set(audit.rows.map(row => row.ticker));
  for (const theme of THEMATIC_SECTOR_INDICES) for (const stock of theme.stocks) symbols.add(stock.ticker.toUpperCase());
  const report = reviewIndustryCsv(input, symbols);
  console.log(JSON.stringify({
    incomingRows: report.rows.length,
    readyForHumanReview: report.ready,
    notReady: report.notReady,
    duplicates: report.duplicateSymbols,
    statuses: report.statusCounts,
  }, null, 2));
  if (outputPath) {
    writeFileSync(resolve(outputPath), reviewCsvReport(report), { encoding: 'utf8', flag: 'w' });
    console.log(`Saved staged review to ${resolve(outputPath)}; NO live classifications were modified.`);
  }
}
