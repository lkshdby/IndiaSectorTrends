/**
 * Local-only reconciliation of an authorized Screener.in CSV export.
 * Screener data is a user-accepted trusted source for this project, but
 * is never falsely described as a direct NSE observation. This module
 * reconciles evidence without automatically modifying production files.
 * The caller must have appropriate rights to use the export.
 */
import { BASIC_INDUSTRY_BY_NAME } from '../data/basicIndustryCatalog';
import { parseIndustryCsv } from './basicIndustryCsvReview';
import type { StockIndustryAuditRow } from './basicIndustryCoverage';

export type ScreenerReviewStatus =
  | 'already-verified-match'
  | 'conflicts-with-primary-source'
  | 'trusted-screener-match'
  | 'local-industry-code-pending'
  | 'unknown-industry-label'
  | 'missing-industry-field'
  | 'duplicate-export-conflict'
  | 'not-present-in-export';

export interface ScreenerReconciliationRow {
  ticker: string;
  companyName: string;
  primaryStatus: StockIndustryAuditRow['status'];
  verifiedIndustry: string | null;
  verifiedCode: string | null;
  screenerIndustry: string | null;
  suggestedCatalogCode: string | null;
  reviewStatus: ScreenerReviewStatus;
  primarySourceUrl: string | null;
}

export interface ScreenerReconciliationReport {
  rows: ScreenerReconciliationRow[];
  exportDataRows: number;
  exportUniqueTickers: number;
  duplicateExportSymbols: number;
  outsideTrackedUniverse: number;
  matchedTrackedSymbols: number;
  missingTrackedSymbols: number;
  statusCounts: Record<ScreenerReviewStatus, number>;
}

const allowedStatuses: ScreenerReviewStatus[] = [
  'already-verified-match', 'conflicts-with-primary-source',
  'trusted-screener-match', 'local-industry-code-pending',
  'unknown-industry-label', 'missing-industry-field',
  'duplicate-export-conflict', 'not-present-in-export',
];

function headerKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findHeader(headers: string[], candidates: string[]): number {
  return headers.findIndex(h => candidates.includes(h));
}

export function reviewScreenerIndustryExport(
  input: string, trackedRows: readonly StockIndustryAuditRow[],
): ScreenerReconciliationReport {
  const matrix = parseIndustryCsv(input);
  if (!matrix.length) throw new Error('Empty Screener export');
  const headers = matrix[0].map(headerKey);
  if (new Set(headers).size !== headers.length) throw new Error('Duplicate Screener export headers');
  const tickerAt = findHeader(headers, ['nsecode', 'nsesymbol', 'nseticker', 'symbol', 'ticker']);
  const industryAt = findHeader(headers, ['industry', 'basicindustry', 'basicindustryname', 'subindustry']);
  if (tickerAt < 0 || industryAt < 0) {
    throw new Error('Screener CSV needs an NSE Code (or NSE Symbol) column and an Industry column');
  }

  const incoming = new Map<string, string>();
  const contradictory = new Set<string>();
  let invalidOrMissingNseCodes = 0;
  let repeatCount = 0;
  for (let i = 1; i < matrix.length; i++) {
    const cells = matrix[i];
    if (cells.length !== headers.length) {
      throw new Error('Invalid Screener CSV width at row ' + (i + 1));
    }
    const ticker = cells[tickerAt].trim().toUpperCase().replace(/\.NS$/, '');
    if (!/^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(ticker)) {
      invalidOrMissingNseCodes++;
      continue;
    }
    const industry = cells[industryAt].trim();
    if (incoming.has(ticker)) {
      repeatCount++;
      if (incoming.get(ticker) !== industry) contradictory.add(ticker);
      continue;
    }
    incoming.set(ticker, industry);
  }

  const auditSymbols = new Set(trackedRows.map(row => row.ticker));
  const rows: ScreenerReconciliationRow[] = trackedRows.map(row => {
    const importIndustry = incoming.get(row.ticker);
    const known = importIndustry ? BASIC_INDUSTRY_BY_NAME.get(importIndustry) : null;
    let reviewStatus: ScreenerReviewStatus;
    if (contradictory.has(row.ticker)) {
      reviewStatus = 'duplicate-export-conflict';
    } else if (importIndustry === undefined) {
      reviewStatus = 'not-present-in-export';
    } else if (!importIndustry) {
      reviewStatus = 'missing-industry-field';
    } else if (row.status === 'source-verified' && row.industry !== importIndustry) {
      reviewStatus = 'conflicts-with-primary-source';
    } else if (row.status === 'source-verified') {
      reviewStatus = 'already-verified-match';
    } else if (!known) {
      reviewStatus = 'unknown-industry-label';
    } else if (!known.code) {
      reviewStatus = 'local-industry-code-pending';
    } else {
      reviewStatus = 'trusted-screener-match';
    }
    return {
      ticker: row.ticker,
      companyName: row.name,
      primaryStatus: row.status,
      verifiedIndustry: row.industry,
      verifiedCode: row.industryCode,
      screenerIndustry: importIndustry ?? null,
      suggestedCatalogCode: known?.code ?? null,
      reviewStatus,
      primarySourceUrl: row.sourceUrl,
    };
  });
  const statusCounts = Object.fromEntries(allowedStatuses.map(status => [
    status, rows.filter(row => row.reviewStatus === status).length,
  ])) as Record<ScreenerReviewStatus, number>;

  return {
    rows,
    exportDataRows: matrix.length - 1,
    exportUniqueTickers: incoming.size,
    duplicateExportSymbols: repeatCount,
    outsideTrackedUniverse: [...incoming.keys()].filter(t => !auditSymbols.has(t)).length,
    matchedTrackedSymbols: rows.filter(row => row.reviewStatus !== 'not-present-in-export').length,
    missingTrackedSymbols: statusCounts['not-present-in-export'],
    statusCounts,
  };
}

function quoteCsv(value: unknown): string {
  let text = String(value ?? '');
  if (/^[=+@\t\r\n]/.test(text)) text = "'" + text;
  return /[",\r\n]/.test(text)
    ? '"' + text.replace(/"/g, '""') + '"'
    : text;
}

/** Write the full stock-universe audit to a LOCAL file only; never commit source data. */
export function screenerReconciliationCsv(report: ScreenerReconciliationReport): string {
  const keys = [
    'ticker', 'companyName', 'primaryStatus', 'verifiedIndustry', 'verifiedCode',
    'screenerIndustry', 'suggestedCatalogCode', 'reviewStatus', 'primarySourceUrl',
  ] as const;
  return [keys.join(','), ...report.rows.map(row =>
    keys.map(key => quoteCsv(row[key])).join(','),
  )].join('\r\n') + '\r\n';
}


export interface TrustedScreenerRecord {
  ticker: string;
  basicIndustry: string;
  industryCode: string;
  verifiedOn: string;
  sourceUrl: string;
}

/**
 * Only exact-symbol, code-checked, non-conflicting Screener matches can become
 * trusted project evidence. Evidence is marked Screener, never NSE.
 * Calling this function does not change repository files or production state.
 */
export function approvedScreenerEvidence(
  report: ScreenerReconciliationReport,
  verifiedOn: string,
): TrustedScreenerRecord[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(verifiedOn) ||
      !Number.isFinite(Date.parse(verifiedOn)) ||
      new Date(verifiedOn).getTime() > Date.now()) {
    throw new Error('Review date must be a valid nonfuture YYYY-MM-DD');
  }
  return report.rows.filter(r => r.reviewStatus === 'trusted-screener-match' &&
    r.screenerIndustry && r.suggestedCatalogCode).map(r => ({
    ticker: r.ticker,
    basicIndustry: r.screenerIndustry!,
    industryCode: r.suggestedCatalogCode!,
    verifiedOn,
    sourceUrl: `https://www.screener.in/market/${r.suggestedCatalogCode!.slice(0, 4)}/${r.suggestedCatalogCode!.slice(0, 6)}/${r.suggestedCatalogCode!.slice(0, 8)}/${r.suggestedCatalogCode}/`,
  }));
}
