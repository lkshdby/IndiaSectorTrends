/**
 * Reconcile every tracked ticker in one pass with an authorized Screener CSV.
 *
 * npx tsx scripts/reconcile-screener-industries.ts --input /secure/screener-export.csv --out /tmp/full-industry-review.csv
 *
 * Intentionally local-only: does NOT scrape Screener, publish its licensed
 * export, change production mappings, or feed candidates into rankings.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildBasicIndustryAudit } from '../src/utils/basicIndustryCoverage';
import { reviewScreenerIndustryExport, screenerReconciliationCsv } from '../src/utils/screenerIndustryReview';
import type { BrowserMarketSnapshot } from '../src/utils/marketSnapshotClient';

const args = process.argv.slice(2);
const inputArg = args.indexOf('--input');
const outputArg = args.indexOf('--out');
const inputFile = inputArg < 0 ? '' : args[inputArg + 1] || '';
const outputFile = outputArg < 0 ? '' : args[outputArg + 1] || '';
if (!inputFile || (outputArg >= 0 && !outputFile)) {
  throw new Error('Usage: --input /secure/screener-export.csv [--out /tmp/full-industry-review.csv]');
}

let snapshot: BrowserMarketSnapshot | null = null;
try {
  snapshot = JSON.parse(readFileSync(resolve('src/data/verifiedLiveMarketData.json'), 'utf8')) as BrowserMarketSnapshot;
} catch {
  console.warn('Saved snapshot unavailable: reviewing the complete bundled thematic universe only');
}

const tracked = buildBasicIndustryAudit(snapshot);
const raw = readFileSync(resolve(inputFile), 'utf8');
const report = reviewScreenerIndustryExport(raw, tracked.rows);
console.log(JSON.stringify({
  trackedUniverse: tracked.totalUniverse,
  verifiedNseMappedBeforeImport: tracked.coveredByVerifiedMapping,
  screenerExportRows: report.exportDataRows,
  exportedNseSymbols: report.exportUniqueTickers,
  matchedTrackedSymbols: report.matchedTrackedSymbols,
  trackedSymbolsMissingFromExport: report.missingTrackedSymbols,
  sourceDisagreements: report.statusCounts['conflicts-with-primary-source'],
  potentialCandidatesRequiringPrimaryReview: report.statusCounts['candidate-needs-primary-source'],
  missingCheckedIndustryCodes: report.statusCounts['local-industry-code-pending'],
  unknownIndustryLabels: report.statusCounts['unknown-industry-label'],
  duplicateExportSymbols: report.duplicateExportSymbols,
  outsideTrackedUniverse: report.outsideTrackedUniverse,
  rowsWithInvalidOrMissingNseCode: report.exportDataRows - report.exportUniqueTickers - report.duplicateExportSymbols,
  nextStep: 'Review candidate/exception rows with primary sources; no Screener-only row is automatically verified or ranked.',
}, null, 2));

if (outputFile) {
  writeFileSync(resolve(outputFile), screenerReconciliationCsv(report), { flag: 'w', encoding: 'utf8' });
  console.log('Wrote local-only review report: ' + resolve(outputFile));
}
