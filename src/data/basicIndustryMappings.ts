import { BASIC_INDUSTRY_BY_NAME } from './basicIndustryCatalog';

/** Direct NSE equity quote pages explicitly displaying each symbol's Basic Industry.
 * These are sparse verified seed rows, NOT an inferred mapping for 453 symbols.
 * A change of ticker/ISIN or business activity requires re-verification.
 */
export interface BasicIndustryAssignment {
  ticker: string;
  basicIndustry: string;
  sourceUrl: string;
  verifiedOn: string;
}
const VERIFIED_NSE_QUOTE_MAPPINGS: BasicIndustryAssignment[] = [
  ['TCS', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/TCS/Tata-Consultancy-Services-Limited'],
  ['WIPRO', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/WIPRO/Wipro-Limited'],
  ['HCLTECH', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/HCLTECH/HCL-Technologies-Limited'],
  ['TECHM', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/TECHM/Tech-Mahindra'],
  ['TATAELXSI', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/TATAELXSI/Tata-Elxsi-Limited'],
  ['LTM', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quotes/equity?symbol=LTM'],
  ['COFORGE', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/COFORGE/Coforge-Limited'],
  ['PERSISTENT', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/PERSISTENT/Persistent-Systems-Limited'],
  ['HDFCBANK', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/HDFCBANK/HDFC-Bank-Limited'],
  ['ICICIBANK', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/ICICIBANK/ICICI-Bank-Limited'],
  ['AXISBANK', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/AXISBANK/Axis-Bank-Limited'],
  ['KOTAKBANK', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/KOTAKBANK/Kotak-Mahindra-Bank-Limited'],
  ['GPTHEALTH', 'Hospital', 'https://www.nseindia.com/get-quote/equity/GPTHEALTH/GPT-Healthcare-Limited'],
  ['HCG', 'Hospital', 'https://www.nseindia.com/get-quote/equity/HCG/Healthcare-Global-Enterprises-Limited'],
  ['MEDANTA', 'Hospital', 'https://www.nseindia.com/get-quote/equity/MEDANTA/Global-Health-Limited'],
  ['SUNPHARMA', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/SUNPHARMA/Sun-Pharmaceutical-Industries-Limited'],
  ['SPARC', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/SPARC/Sun-Pharma-Advanced-Research-Company-Limited'],
].map(([ticker, basicIndustry, sourceUrl]) => ({
  ticker, basicIndustry, sourceUrl, verifiedOn: '2026-11-10',
}));

export const VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS: ReadonlyMap<string, BasicIndustryAssignment> =
  new Map(VERIFIED_NSE_QUOTE_MAPPINGS.map(row => [row.ticker, row]));

export function validateSourceVerifiedAssignments(): string[] {
  const issues: string[] = [];
  for (const assignment of VERIFIED_NSE_QUOTE_MAPPINGS) {
    const industry = BASIC_INDUSTRY_BY_NAME.get(assignment.basicIndustry);
    if (!industry?.code) issues.push(`${assignment.ticker}: missing verified NSE basic-industry code`);
    if (!assignment.sourceUrl.startsWith('https://www.nseindia.com/get-quote/') &&
        !assignment.sourceUrl.startsWith('https://www.nseindia.com/get-quotes/')) {
      issues.push(`${assignment.ticker}: mapping lacks an NSE equity quote source`);
    }
  }
  return issues;
}

/** A user-created thematic basket never becomes an official industry mapping. */
export function findVerifiedIndustry(ticker: string) {
  return VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get(ticker.toUpperCase()) || null;
}
