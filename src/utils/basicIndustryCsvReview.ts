import { BASIC_INDUSTRY_BY_CODE, BASIC_INDUSTRY_BY_NAME } from '../data/basicIndustryCatalog';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS } from '../data/basicIndustryMappings';

export type ReviewStatus =
  | 'ready-for-human-review'
  | 'already-verified'
  | 'existing-mapping-conflict'
  | 'unverified-industry-code'
  | 'code-name-mismatch'
  | 'invalid-symbol'
  | 'invalid-isin'
  | 'unverified-source'
  | 'duplicate-conflict'
  | 'outside-current-universe';

export interface IndustryImportReviewRow {
  rowNumber: number;
  ticker: string;
  isin: string;
  basicIndustry: string;
  basicIndustryCode: string;
  sourceUrl: string;
  sourceDate: string;
  status: ReviewStatus;
  reason: string;
  existingIndustry: string;
}
export interface IndustryImportReview {
  rows: IndustryImportReviewRow[];
  statusCounts: Record<ReviewStatus, number>;
  ready: number;
  notReady: number;
  uniqueSymbols: number;
  duplicateSymbols: number;
}

const statuses: ReviewStatus[] = [
  'ready-for-human-review','already-verified','existing-mapping-conflict',
  'unverified-industry-code','code-name-mismatch','invalid-symbol',
  'invalid-isin','unverified-source','duplicate-conflict',
  'outside-current-universe',
];

export function parseIndustryCsv(input: string): string[][] {
  // RFC 4180 compatible quotes, escaped quotes, embedded commas and newlines.
  // No network access or browser capabilities are used.
  const lines: string[][] = [];
  let cells: string[] = [];
  let cell = '';
  let quote = false;
  const text = input.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (char === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else quote = false;
      } else cell += char;
      continue;
    }
    if (char === '"') {
      if (cell.length) throw new Error('Malformed CSV: quote inside unquoted field');
      quote = true;
    } else if (char === ',') {
      cells.push(cell); cell = '';
    } else if (char === '\r' || char === '\n') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      cells.push(cell); cell = '';
      if (cells.some(v => v.trim())) lines.push(cells);
      cells = [];
    } else cell += char;
  }
  if (quote) throw new Error('Malformed CSV: unclosed quoted field');
  cells.push(cell);
  if (cells.some(v => v.trim())) lines.push(cells);
  return lines;
}

function columnName(s: string): string {
  return s.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}
const headerAliases: Record<string, string[]> = {
  ticker: ['symbol','ticker','nsesymbol'],
  isin: ['isin','isinnumber','isinno'],
  basicIndustryCode: ['basicindustrycode','basicindcode','basicindustryid'],
  basicIndustry: ['basicindustry','basicindustryname'],
  sourceUrl: ['sourceurl','sourceuri','source','evidenceurl','url'],
  sourceDate: ['sourcedate','verifiedon','effectiveon','effectivedate','asofdate','reviewedon'],
};
function findColumn(headers: string[], name: keyof typeof headerAliases): number {
  return headers.findIndex(x => headerAliases[name].includes(x));
}
export function reviewIndustryCsv(source: string, validSymbols: ReadonlySet<string>): IndustryImportReview {
  const parsed = parseIndustryCsv(source);
  if (!parsed.length) throw new Error('No CSV records');
  const headers = parsed[0].map(columnName);
  if (new Set(headers).size !== headers.length) throw new Error('Duplicate CSV headers');
  const required = ['ticker','isin','basicIndustryCode','basicIndustry','sourceUrl','sourceDate'] as const;
  const indexes = Object.fromEntries(required.map(key => [key, findColumn(headers, key)])) as Record<typeof required[number], number>;
  const missing = required.filter(key => indexes[key] < 0);
  if (missing.length) throw new Error('Missing required CSV columns: ' + missing.join(', '));
  const symbolSeen = new Map<string, string>();
  const records: IndustryImportReviewRow[] = [];
  for (let i = 1; i < parsed.length; i++) {
    const row = parsed[i];
    if (row.length !== headers.length) throw new Error(`Row ${i+1} contains ${row.length} columns; expected ${headers.length}`);
    const get = (key: typeof required[number]): string => (row[indexes[key]] || '').trim();
    const ticker = get('ticker').toUpperCase().replace(/\.NS$/, '');
    const isin = get('isin').toUpperCase();
    const basicIndustryCode = get('basicIndustryCode').toUpperCase();
    const basicIndustry = get('basicIndustry');
    const sourceUrl = get('sourceUrl');
    const sourceDate = get('sourceDate');
    const existing = VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get(ticker);
    const codeRef = BASIC_INDUSTRY_BY_CODE.get(basicIndustryCode);
    const nameRef = BASIC_INDUSTRY_BY_NAME.get(basicIndustry);
    const signature = [isin,basicIndustryCode,basicIndustry].join('|');
    let status: ReviewStatus = 'ready-for-human-review', reason = 'Code and symbol pass automated checks; human source and license review still required';
    const matchIsin = /^IN[A-Z0-9]{10}$/.test(isin);
    const validSource = (() => {
      try {
        const url = new URL(sourceUrl);
        return url.protocol === 'https:' && !!url.hostname && !['localhost','127.0.0.1'].includes(url.hostname);
      } catch { return false; }
    })();
    if (!/^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(ticker)) {
      status = 'invalid-symbol'; reason = 'Invalid NSE ticker';
    } else if (symbolSeen.has(ticker) && symbolSeen.get(ticker) !== signature) {
      status = 'duplicate-conflict'; reason = 'Same ticker has contradictory ISIN or industry in CSV';
    } else if (!matchIsin) {
      status = 'invalid-isin'; reason = 'Missing or malformed NSE equity ISIN; verify ticker identity';
    } else if (!codeRef?.code) {
      status = 'unverified-industry-code'; reason = 'Industry code not yet independently checked against official NSE taxonomy';
    } else if (!nameRef || codeRef.name !== nameRef.name) {
      status = 'code-name-mismatch'; reason = 'Basic-industry name disagrees with supplied basic-industry code';
    } else if (!validSource || !/^\d{4}-\d{2}-\d{2}$/.test(sourceDate) ||
       !Number.isFinite(Date.parse(sourceDate)) || new Date(sourceDate).getTime() > Date.now()) {
      status = 'unverified-source'; reason = 'Valid HTTPS source and review date (YYYY-MM-DD, not future) required';
    } else if (existing && existing.basicIndustry !== basicIndustry) {
      status = 'existing-mapping-conflict'; reason = 'Proposed industry differs from the individually verified current mapping';
    } else if (!validSymbols.has(ticker)) {
      status = 'outside-current-universe'; reason = 'Symbol is not in the saved stock universe or current thematic baskets';
    } else if (existing) {
      status = 'already-verified'; reason = 'Already recorded with a primary source; verify date/ISIN before changes';
    }
    if (!symbolSeen.has(ticker)) symbolSeen.set(ticker, signature);
    records.push({
      rowNumber: i + 1, ticker, isin, basicIndustry, basicIndustryCode,
      sourceUrl, sourceDate, status, reason,
      existingIndustry: existing?.basicIndustry || '',
    });
  }
  const statusCounts = Object.fromEntries(statuses.map(status => [
    status, records.filter(row => row.status === status).length,
  ])) as Record<ReviewStatus, number>;
  const ready = statusCounts['ready-for-human-review'];
  return {
    rows: records,
    statusCounts, ready, notReady: records.length - ready,
    uniqueSymbols: symbolSeen.size,
    duplicateSymbols: records.length - symbolSeen.size,
  };
}

function csvCell(value: unknown): string {
  let text = String(value ?? '');
  // Prevent spreadsheet formula execution from untrusted symbols/descriptions.
  if (/^[=+@\t\r\n]/.test(text)) text = "'" + text;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function reviewCsvReport(report: IndustryImportReview): string {
  const headings = [
    'rowNumber','ticker','isin','basicIndustryCode','basicIndustry',
    'existingIndustry','sourceUrl','sourceDate','status','reason',
  ] as const;
  return [headings.join(','),...report.rows.map(row =>
    headings.map(key => csvCell(row[key])).join(','),
  )].join('\r\n')+'\r\n';
}
