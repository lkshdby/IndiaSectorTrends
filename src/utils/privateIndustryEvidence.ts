/**
 * Private, user-supplied Screener industry evidence. It is only read by the
 * browser on the current device and is never sent to a server or bundled into
 * the public source. Use a checked category code and an exact thematic ticker.
 */
import { BASIC_INDUSTRY_BY_NAME } from '../data/basicIndustryCatalog';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, type BasicIndustryAssignment } from '../data/basicIndustryMappings';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';

export const PRIVATE_SCREENER_STORAGE_KEY = 'india-sector-trends:private-screener:v1';

export type PrivateIndustryAssignments = ReadonlyMap<string, BasicIndustryAssignment>;
export interface PrivateIndustryImport {
  assignments: PrivateIndustryAssignments;
  totalRows: number;
  primarySourceDuplicates: number;
  issues: string[];
}
const thematicTickers = new Set(THEMATIC_SECTOR_INDICES.flatMap(
  theme => theme.stocks.map(stock => stock.ticker.toUpperCase()),
));

function screenerIndustryUrl(code: string): string {
  return 'https://www.screener.in/market/' +
    [code.slice(0, 4), code.slice(0, 6), code.slice(0, 8), code].join('/') + '/';
}

export function checkPrivateIndustryImport(input: unknown): PrivateIndustryImport {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Choose the private Screener evidence JSON, not a CSV.');
  }
  const file = input as Record<string, unknown>;
  if (!Array.isArray(file.rows) || file.rows.length > 1000 || file.rows.length === 0) {
    throw new Error('The evidence file must contain 1–1,000 classification rows.');
  }
  if (typeof file.source !== 'string' || !file.source.startsWith('Screener.in')) {
    throw new Error('Unrecognized source: use the private Screener evidence JSON.');
  }

  const assignments = new Map<string, BasicIndustryAssignment>();
  const issues: string[] = [];
  const encountered = new Set<string>();
  let primarySourceDuplicates = 0;

  for (const [i, value] of file.rows.entries()) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      issues.push('Row ' + (i + 1) + ': invalid record');
      continue;
    }
    const row = value as Record<string, unknown>;
    const ticker = row.ticker;
    const industry = row.basicIndustry;
    const code = row.industryCode;
    const reviewDate = row.verifiedOn;
    const sourceUrl = row.sourceUrl;
    if (typeof ticker !== 'string' || typeof industry !== 'string' || typeof code !== 'string' ||
        typeof reviewDate !== 'string' || typeof sourceUrl !== 'string') {
      issues.push('Row ' + (i + 1) + ': missing required field');
      continue;
    }
    if (!thematicTickers.has(ticker) || !/^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(ticker)) {
      issues.push(ticker + ': ticker not in the thematic universe');
      continue;
    }
    if (encountered.has(ticker)) {
      issues.push(ticker + ': duplicate evidence');
      continue;
    }
    encountered.add(ticker);

    const verifiedCode = BASIC_INDUSTRY_BY_NAME.get(industry)?.code;
    if (!verifiedCode || verifiedCode !== code) {
      issues.push(ticker + ': industry code/name mismatch');
      continue;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewDate) ||
        !Number.isFinite(Date.parse(reviewDate)) ||
        Date.parse(reviewDate) > Date.now()) {
      issues.push(ticker + ': review date is invalid or in the future');
      continue;
    }
    if (sourceUrl !== screenerIndustryUrl(code)) {
      issues.push(ticker + ': Screener industry-source URL mismatch');
      continue;
    }
    // Pre-existing NSE records always win. The file never overwrites the
    // checked NSE source map; this duplicate is not a failure.
    if (VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.has(ticker)) {
      primarySourceDuplicates++;
      continue;
    }
    assignments.set(ticker, {
      ticker,
      basicIndustry: industry,
      verifiedOn: reviewDate,
      sourceUrl,
      sourceType: 'screener',
    });
  }
  return { assignments, totalRows: file.rows.length, primarySourceDuplicates, issues };
}

export function joinPrivateIndustryAssignments(
  privateRecords: PrivateIndustryAssignments,
): PrivateIndustryAssignments {
  return new Map([...VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, ...privateRecords]);
}

export function loadPrivateIndustryEvidence(): PrivateIndustryImport | null {
  try {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(PRIVATE_SCREENER_STORAGE_KEY);
    if (!stored) return null;
    const checked = checkPrivateIndustryImport(JSON.parse(stored));
    return checked.issues.length ? null : checked;
  } catch {
    return null;
  }
}

export function savePrivateIndustryEvidence(value: unknown): PrivateIndustryImport {
  const checked = checkPrivateIndustryImport(value);
  if (checked.issues.length) {
    throw new Error('Evidence contains ' + checked.issues.length +
      ' invalid rows; no changes saved. First issue: ' + checked.issues[0]);
  }
  if (!checked.assignments.size) throw new Error('No new verified-code mappings to import.');
  if (typeof window === 'undefined') throw new Error('Private import is available only in a browser.');
  try {
    window.localStorage.setItem(PRIVATE_SCREENER_STORAGE_KEY, JSON.stringify(value));
  } catch {
    throw new Error('Could not save private classifications on this device (browser storage unavailable).');
  }
  return checked;
}

export function clearPrivateIndustryEvidence(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(PRIVATE_SCREENER_STORAGE_KEY);
  }
}
