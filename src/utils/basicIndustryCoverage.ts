import { BASIC_INDUSTRY_BY_NAME } from '../data/basicIndustryCatalog';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS } from '../data/basicIndustryMappings';
import { getEditorialHints } from './industryClassificationHints';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

export type MappingAuditStatus = 'source-verified' | 'missing-industry-code' | 'unmapped';

export interface StockIndustryAuditRow {
  ticker: string;
  name: string;
  marketCapCr: number | null;
  themeNames: string[];
  inSavedSnapshot: boolean;
  industry: string | null;
  industryCode: string | null;
  sourceUrl: string | null;
  sourceProvider: 'NSE' | 'Screener.in' | null;
  verifiedOn: string | null;
  status: MappingAuditStatus;
  /** A non-authoritative idea for HUMAN REVIEW; never used in industry returns. */
  suggestedIndustry: string | null;
  suggestedCode: string | null;
  suggestionStatus: 'editorial-suggestion' | 'ambiguous-themes' | 'no-specific-theme' | 'snapshot-only' | 'already-verified';
}
export interface ThemeIndustryCoverage {
  themeId: string;
  themeName: string;
  stockCount: number;
  sourceVerified: number;
  missing: number;
  coveragePct: number;
}
export interface IndustryMappingAudit {
  rows: StockIndustryAuditRow[];
  totalUniverse: number;
  coveredByVerifiedMapping: number;
  needingReview: number;
  missingHistory: number;
  mappedPct: number;
  industryCount: number;
  themeCoverage: ThemeIndustryCoverage[];
  snapshotFetchedAt: string | null;
}

function normalizedTicker(input: string): string {
  return input.trim().toUpperCase().replace(/\.NS$/, '');
}

/** Maps the UNION of saved price symbols and thematic symbols, not just
 * the 62 theme constituents. A source-verified mapping does not imply
 * the stock is available in the daily price feed, or the reverse.
 */
export function buildBasicIndustryAudit(snapshot: BrowserMarketSnapshot | null): IndustryMappingAudit {
  const themed = new Map<string, { name: string; themes: Set<string>; marketCapCr: number | null }>();
  for (const theme of THEMATIC_SECTOR_INDICES) {
    for (const stock of theme.stocks) {
      const ticker = normalizedTicker(stock.ticker);
      if (!ticker) continue;
      let company = themed.get(ticker);
      if (!company) {
        company = { name: stock.name || ticker, themes: new Set(), marketCapCr: null };
        themed.set(ticker, company);
      }
      company.themes.add(theme.name);
      if (stock.marketCapCr > 0 && (company.marketCapCr === null || stock.marketCapCr > company.marketCapCr)) {
        company.marketCapCr = stock.marketCapCr;
      }
    }
  }

  const editorialHints = getEditorialHints();
  const rawSnapshotSymbols = Object.keys(snapshot?.stocks || {});
  const savedTickers = new Set(rawSnapshotSymbols.map(normalizedTicker));
  const allTickers = new Set([...themed.keys(), ...savedTickers]);
  const rows = [...allTickers].map(ticker => {
    const company = themed.get(ticker);
    const assignment = VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get(ticker);
    const hint = editorialHints.get(ticker);
    const industry = assignment ? BASIC_INDUSTRY_BY_NAME.get(assignment.basicIndustry) : null;
    const status: MappingAuditStatus = assignment
      ? industry?.code ? 'source-verified' : 'missing-industry-code'
      : 'unmapped';
    return {
      ticker,
      name: company?.name || ticker,
      marketCapCr: company?.marketCapCr ?? null,
      themeNames: [...(company?.themes || [])].sort(),
      inSavedSnapshot: savedTickers.has(ticker),
      industry: assignment?.basicIndustry || null,
      industryCode: industry?.code || null,
      sourceUrl: assignment?.sourceUrl || null,
      sourceProvider: assignment ? assignment.sourceType === 'screener' ? 'Screener.in' : 'NSE' : null,
      verifiedOn: assignment?.verifiedOn || null,
      status,
      suggestedIndustry: !assignment ? hint?.suggestedIndustry || null : null,
      suggestedCode: !assignment ? hint?.suggestedCode || null : null,
      suggestionStatus: assignment ? 'already-verified' : hint?.status || 'snapshot-only',
    } satisfies StockIndustryAuditRow;
  }).sort((a, b) => {
    const priority = (row: StockIndustryAuditRow) => row.status === 'source-verified' ? 1 : 0;
    return priority(a) - priority(b) ||
      b.themeNames.length - a.themeNames.length ||
      (b.marketCapCr || 0) - (a.marketCapCr || 0) ||
      a.ticker.localeCompare(b.ticker);
  });

  const byTicker = new Map(rows.map(row => [row.ticker, row]));
  const themeCoverage = THEMATIC_SECTOR_INDICES.map(theme => {
    const symbols = new Set(theme.stocks.map(stock => normalizedTicker(stock.ticker)));
    const verifiedCount = [...symbols].filter(ticker => byTicker.get(ticker)?.status === 'source-verified').length;
    const n = symbols.size;
    return {
      themeId: theme.id,
      themeName: theme.name,
      stockCount: n,
      sourceVerified: verifiedCount,
      missing: n - verifiedCount,
      coveragePct: n ? Math.round(100 * verifiedCount / n) : 0,
    };
  }).sort((a, b) => a.coveragePct - b.coveragePct || b.stockCount - a.stockCount);

  const coveredByVerifiedMapping = rows.filter(row => row.status === 'source-verified').length;
  return {
    rows,
    totalUniverse: rows.length,
    coveredByVerifiedMapping,
    needingReview: rows.length - coveredByVerifiedMapping,
    missingHistory: snapshot ? rows.filter(row => !row.inSavedSnapshot).length : 0,
    mappedPct: rows.length ? Math.round(100 * coveredByVerifiedMapping / rows.length) : 0,
    industryCount: new Set(rows.filter(row => row.status === 'source-verified').map(row => row.industry)).size,
    themeCoverage,
    snapshotFetchedAt: snapshot?.fetchedAt || null,
  };
}

/** Escape CSV values before browser download / report artifact export. */
export function industryAuditCsv(rows: StockIndustryAuditRow[]): string {
  const fields = ['ticker', 'companyName', 'status', 'basicIndustry', 'basicIndustryCode',
    'themeCount', 'themes', 'inSavedSnapshot', 'referenceMarketCapCr', 'verifiedOn', 'sourceUrl', 'sourceProvider',
    'editorialSuggestedIndustry', 'editorialSuggestedCode', 'suggestionStatus'];
  const cell = (value: unknown) => {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const data = rows.map(row => [
    row.ticker, row.name, row.status, row.industry, row.industryCode,
    row.themeNames.length, row.themeNames.join('; '), row.inSavedSnapshot,
    row.marketCapCr, row.verifiedOn, row.sourceUrl, row.sourceProvider,
    row.suggestedIndustry, row.suggestedCode, row.suggestionStatus,
  ].map(cell).join(','));
  return [fields.join(','), ...data].join('\r\n') + '\r\n';
}
