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
  // NSE equity quote pages separately checked on 2026-11-10;
  // these are primary basic-industry labels, not inferred from our 62 themes.
  ['ITC', 'Diversified FMCG', 'https://www.nseindia.com/get-quote/equity/ITC/Itc'],
  ['TATASTEEL', 'Iron & Steel', 'https://www.nseindia.com/get-quote/equity/TATASTEEL/Tata-Steel-Limited'],
  ['JSWSTEEL', 'Iron & Steel', 'https://www.nseindia.com/get-quote/equity/JSWSTEEL/JSW-Steel-Limited'],
  ['RELIANCE', 'Refineries & Marketing', 'https://www.nseindia.com/get-quote/equity/RELIANCE/Reliance-Industries-Limited'],
  ['TATATECH', 'IT Enabled Services', 'https://www.nseindia.com/get-quote/equity/TATATECH/Tata-Technologies-Limited'],
  ['ASIANPAINT', 'Paints', 'https://www.nseindia.com/get-quote/equity/ASIANPAINT/Asian-Paints-Limited'],
  ['SBIN', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/SBIN/State-Bank-Of-India'],
  ['BANKBARODA', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/BANKBARODA/Bank-of-Baroda'],
  ['CANBK', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/CANBK/Canara-Bank'],
  ['PNB', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/PNB/Punjab-National-Bank'],
  ['MARUTI', 'Passenger Cars & Utility Vehicles', 'https://www.nseindia.com/get-quote/equity/MARUTI/Maruti-Suzuki-India-Limited'],
  ['BAJFINANCE', 'Non Banking Financial Company (NBFC)', 'https://www.nseindia.com/get-quote/equity/BAJFINANCE/Bajaj-Finance-Limited'],
  ['HINDALCO', 'Aluminium', 'https://www.nseindia.com/get-quote/equity/HINDALCO/Hindalco-Industries-Limited'],

].map(([ticker, basicIndustry, sourceUrl]) => ({
  ticker, basicIndustry, sourceUrl, verifiedOn: '2026-11-10',
}));

export const VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS: ReadonlyMap<string, BasicIndustryAssignment> =
  new Map(VERIFIED_NSE_QUOTE_MAPPINGS.map(row => [row.ticker, row]));

export function validateSourceVerifiedAssignments(): string[] {
  const issues: string[] = [];
  const tickers = new Set<string>();
  for (const assignment of VERIFIED_NSE_QUOTE_MAPPINGS) {
    if (tickers.has(assignment.ticker)) issues.push(`${assignment.ticker}: duplicate source record`);
    tickers.add(assignment.ticker);
    const industry = BASIC_INDUSTRY_BY_NAME.get(assignment.basicIndustry);
    if (!industry?.code) issues.push(`${assignment.ticker}: missing verified NSE basic-industry code`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(assignment.verifiedOn) ||
        !Number.isFinite(Date.parse(assignment.verifiedOn))) {
      issues.push(`${assignment.ticker}: missing valid review date`);
    }
    try {
      const source = new URL(assignment.sourceUrl);
      const path = source.pathname.toUpperCase();
      const ticker = assignment.ticker.toUpperCase();
      const isDirect = path.startsWith(`/GET-QUOTE/EQUITY/${ticker}/`);
      const isSearch = path === '/GET-QUOTES/EQUITY' && source.searchParams.get('symbol')?.toUpperCase() === ticker;
      if (source.protocol !== 'https:' || source.hostname !== 'www.nseindia.com' ||
          (!isDirect && !isSearch)) {
        issues.push(`${assignment.ticker}: source URL does not identify the same NSE equity symbol`);
      }
    } catch {
      issues.push(`${assignment.ticker}: invalid NSE source URL`);
    }
  }
  return issues;
}

/** A user-created thematic basket never becomes an official industry mapping. */
export function findVerifiedIndustry(ticker: string) {
  return VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get(ticker.toUpperCase()) || null;
}
