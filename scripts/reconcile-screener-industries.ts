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
import { reviewScreenerIndustryExport, screenerReconciliationCsv, approvedScreenerEvidence } from '../src/utils/screenerIndustryReview';
import type { BrowserMarketSnapshot } from '../src/utils/marketSnapshotClient';

const args = process.argv.slice(2);
const inputArg = args.indexOf('--input');
const outputArg = args.indexOf('--out');
const evidenceArg = args.indexOf('--evidence-out');
const evidenceFile = evidenceArg < 0 ? '' : args[evidenceArg + 1] || '';
const confirmedRights = args.includes('--authorized-source');
const inputFile = inputArg < 0 ? '' : args[inputArg + 1] || '';
const outputFile = outputArg < 0 ? '' : args[outputArg + 1] || '';
if (!inputFile || (outputArg >= 0 && !outputFile) || (evidenceArg >= 0 && !evidenceFile)) {
  throw new Error('Usage: --input /secure/screener-export.csv [--out /tmp/full-industry-review.csv] [--evidence-out /secure/screenerIndustryEvidence.json --authorized-source]');
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
  trustedScreenerMatchesEligibleAfterReview: report.statusCounts['trusted-screener-match'],
  missingCheckedIndustryCodes: report.statusCounts['local-industry-code-pending'],
  unknownIndustryLabels: report.statusCounts['unknown-industry-label'],
  duplicateExportSymbols: report.duplicateExportSymbols,
  outsideTrackedUniverse: report.outsideTrackedUniverse,
  rowsWithInvalidOrMissingNseCode: report.exportDataRows - report.exportUniqueTickers - report.duplicateExportSymbols,
  nextStep: 'Screener accepted as project-trusted: review exceptions, then use --evidence-out with --authorized-source only if you may retain/publish derived mappings. NSE classifications keep precedence on conflicts.',
}, null, 2));

if (outputFile) {
  writeFileSync(resolve(outputFile), screenerReconciliationCsv(report), { flag: 'w', encoding: 'utf8' });
  console.log('Wrote local-only review report: ' + resolve(outputFile));
}


if (evidenceFile) {
  if (!confirmedRights) {
    throw new Error('Generating a retained Screener evidence dataset requires --authorized-source. Check source export rights and permissions.');
  }
  const asOf = new Date().toISOString().slice(0, 10);
  const approved = approvedScreenerEvidence(report, asOf);
  const payload = {
    source: 'Screener.in authorized export',
    reviewedOn: asOf,
    rows: approved,
    method: 'User-accepted trusted Screener classification; exact NSE symbol and checked category; any conflicting primary NSE record retained. Not NSE-verified.',
  };
  writeFileSync(resolve(evidenceFile), JSON.stringify(payload, null, 2) + '\n', { flag: 'w', encoding: 'utf8' });
  console.log('Saved ' + approved.length + ' trusted Screener candidates to ' + resolve(evidenceFile) +
    '; verify source rights before sharing or committing.');
}
