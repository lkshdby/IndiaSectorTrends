import { BASIC_INDUSTRY_BY_NAME } from './basicIndustryCatalog';
import quoteEvidence from './nseIndustryQuoteEvidence.json';

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
  // Confirmed basic-industry fields on NSE's public company quote pages (reviewed 2026-11-10)
  ['EICHERMOT', '2/3 Wheelers', 'https://www.nseindia.com/get-quote/equity/EICHERMOT/Eicher-Motors-Limited'],
  ['BOSCHLTD', 'Auto Components & Equipments', 'https://www.nseindia.com/get-quote/equity/BOSCHLTD/Bosch-Limited'],
  ['HBLENGINE', 'Other Industrial Products', 'https://www.nseindia.com/get-quote/equity/HBLENGINE/HBL-Engineering-Limited'],
  ['AMBER', 'Household Appliances', 'https://www.nseindia.com/get-quote/equity/AMBER/Amber-Enterprises-India-Limited'],
  ['GRAVITA', 'Industrial Minerals', 'https://www.nseindia.com/get-quote/equity/GRAVITA/Gravita-India-Ltd'],
  ['BHARTIARTL', 'Telecom - Cellular & Fixed line services', 'https://www.nseindia.com/get-quote/equity/BHARTIARTL/Bharti-Airtel-Limited'],
  ['KFINTECH', 'Depositories, Clearing Houses and Other Intermediaries', 'https://www.nseindia.com/get-quote/equity/KFINTECH/Kfin-Technologies-Limited'],
  ['OLAELEC', '2/3 Wheelers', 'https://www.nseindia.com/get-quote/equity/OLAELEC/Ola-Electric-Mobility-Limited'],
  ['HINDUNILVR', 'Diversified FMCG', 'https://www.nseindia.com/get-quote/equity/HINDUNILVR/Hindustan-Unilever-Limited'],
  ['NTPC', 'Power Generation', 'https://www.nseindia.com/get-quote/equity/NTPC/NTPC-Limited'],
  ['M&M', 'Passenger Cars & Utility Vehicles', 'https://www.nseindia.com/get-quote/equity/M%26M/Mahindra-%26-Mahindra-Limited'],
  ['LICI', 'Life Insurance', 'https://www.nseindia.com/get-quote/equity/LICI/Lici-Ns'],
  ['LT', 'Civil Construction', 'https://www.nseindia.com/get-quote/equity/LT/Larsen-Toubro-Limited'],
  ['ULTRACEMCO', 'Cement & Cement Products', 'https://www.nseindia.com/get-quote/equity/ULTRACEMCO/UltraTech-Cement-Limited'],
  ['CAMS', 'Depositories, Clearing Houses and Other Intermediaries', 'https://www.nseindia.com/get-quote/equity/CAMS/Computer-Age-Management-Services-Limited'],
  ['TVSMOTOR', '2/3 Wheelers', 'https://www.nseindia.com/get-quote/equity/TVSMOTOR/TVS-Motor-Company-Ltd'],
  ['HEROMOTOCO', '2/3 Wheelers', 'https://www.nseindia.com/get-quote/equity/HEROMOTOCO/Hero-MotoCorp-Ltd'],
  ['FEDERALBNK', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/FEDERALBNK/The-Federal-Bank--Limited'],
  ['IDFCFIRSTB', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/IDFCFIRSTB/IDFC-First-Bank-Limited'],
  // Independently indexed NSE company-quote Basic Industry fields
  ['ETERNAL', 'E-Retail/ E-Commerce', 'https://www.nseindia.com/get-quote/equity/ETERNAL/ETERNAL-LIMITED'],
  ['SWIGGY', 'E-Retail/ E-Commerce', 'https://www.nseindia.com/get-quote/equity/SWIGGY/Swiggy-Limited'],
  ['TRENT', 'Speciality Retail', 'https://www.nseindia.com/get-quote/equity/TRENT/Trent-Limited'],
  ['KEI', 'Cables - Electricals', 'https://www.nseindia.com/get-quote/equity/KEI/KEI-Industries-Limited'],
  ['JUBLFOOD', 'Restaurants', 'https://www.nseindia.com/get-quote/equity/JUBLFOOD/Jubilant-Foodworks-Limited'],
  ['DIXON', 'Consumer Electronics', 'https://www.nseindia.com/get-quote/equity/DIXON/Dixon-Technologies-%28India%29-Limited'],
  ['TRIDENT', 'Other Textile Products', 'https://www.nseindia.com/get-quote/equity/TRIDENT/Trident-Limited'],
  ['BAJAJ-AUTO', '2/3 Wheelers', 'https://www.nseindia.com/get-quote/equity/BAJAJ-AUTO/Bajaj-Auto-Limited'],
  ['ADANIPORTS', 'Port & Port services', 'https://www.nseindia.com/get-quote/equity/ADANIPORTS/Adani-Ports-and-Special-Economic-Zone-Ld'],
  ['IRCTC', 'Tour, Travel Related Services', 'https://www.nseindia.com/get-quote/equity/IRCTC/Indian-Railway-Catering-And-Tourism-Corporation-Limited'],
  ['SIEMENS', 'Heavy Electrical Equipment', 'https://www.nseindia.com/get-quote/equity/SIEMENS/Siemens-Limited'],
  ['SUZLON', 'Heavy Electrical Equipment', 'https://www.nseindia.com/get-quote/equity/SUZLON/Suzlon-Energy-Limited'],
  ['POWERGRID', 'Power - Transmission', 'https://www.nseindia.com/get-quote/equity/POWERGRID/Power-Grid-Corporation-of-India-Limited'],
  ['HAL', 'Aerospace & Defense', 'https://www.nseindia.com/get-quote/equity/HAL/Hindustan-Aeronautics-Limited'],
  ['BEL', 'Aerospace & Defense', 'https://www.nseindia.com/get-quote/equity/BEL/Bharat-Electronics-Limited'],
  ['ZYDUSLIFE', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/ZYDUSLIFE/Zydus-Lifesciences-Limited'],
  ['DIVISLAB', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/DIVISLAB/Divi-S-Laboratories'],
  ['MARICO', 'Edible Oil', 'https://www.nseindia.com/get-quote/equity/MARICO/Marico-Limited'],
  ['DMART', 'Diversified Retail', 'https://www.nseindia.com/get-quote/equity/DMART/Avenue-Supermarts-Limited'],
  ['AARTIIND', 'Specialty Chemicals', 'https://www.nseindia.com/get-quote/equity/AARTIIND/Aarti-Industries-Limited'],
  ['TATACONSUM', 'Tea & Coffee', 'https://www.nseindia.com/get-quote/equity/TATACONSUM/TATA-CONSUMER-PRODUCTS-LIMITED'],
  ['PIDILITIND', 'Specialty Chemicals', 'https://www.nseindia.com/get-quote/equity/PIDILITIND/Pidilite-Industries-Limited'],
  ['ASHOKLEY', 'Commercial Vehicles', 'https://www.nseindia.com/get-quote/equity/ASHOKLEY/Ashok-Leyland-Limited'],
  ['HINDZINC', 'Zinc', 'https://www.nseindia.com/get-quote/equity/HINDZINC/Hindustan-Zinc-Limited'],
  ['BRITANNIA', 'Packaged Foods', 'https://www.nseindia.com/get-quote/equity/BRITANNIA/Britannia-Industries-Limited'],
  ['TITAN', 'Gems, Jewellery And Watches', 'https://www.nseindia.com/get-quote/equity/TITAN/Titan-Company-Limited'],
  ['SBILIFE', 'Life Insurance', 'https://www.nseindia.com/get-quote/equity/SBILIFE/SBI-Life-Insurance-Company-Limited'],
  // Individually source-checked NSE Basic Industry fields, reviewed 2026-11-10.
  // Per-symbol evidence: docs/NSE_INDUSTRY_SOURCE_AUDIT_BATCH_2.md
  ['HDFCAMC', 'Asset Management Company', 'https://www.nseindia.com/get-quote/equity/HDFCAMC/HDFC-Asset-Management-Company-Limited'],
  ['ABSLAMC', 'Asset Management Company', 'https://www.nseindia.com/get-quotes/equity?symbol=ABSLAMC'],
  ['UTIAMC', 'Asset Management Company', 'https://www.nseindia.com/get-quote/equity/UTIAMC/UTI-Asset-Management-Company-Limited'],
  ['NAM-INDIA', 'Asset Management Company', 'https://www.nseindia.com/get-quote/equity/NAM-INDIA/Nippon-Life-India-Asset-Management-Limited'],
  ['DEVYANI', 'Restaurants', 'https://www.nseindia.com/get-quote/equity/DEVYANI/Devyani-International-Limited?series=EQ'],
  ['INDHOTEL', 'Hotels & Resorts', 'https://www.nseindia.com/get-quote/equity/INDHOTEL/The-Indian-Hotels-Company-Limited'],
  ['CHALET', 'Hotels & Resorts', 'https://www.nseindia.com/get-quote/equity/CHALET/Chalet-Hotels-Limited'],
  ['LEMONTREE', 'Hotels & Resorts', 'https://www.nseindia.com/get-quote/equity/LEMONTREE/Lemon-Tree-Hotels-Limited'],
  ['CIPLA', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/CIPLA/Cipla-Limited'],
  ['LUPIN', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/LUPIN/Lupin-Limited'],
  ['AUROPHARMA', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/AUROPHARMA/Aurobindo-Pharma-Limited'],
  ['INDIANB', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/INDIANB/Indian-Bank'],
  ['KARURVYSYA', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/KARURVYSYA/Karur-Vysya-Bank-Limited'],
  ['BANKINDIA', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/BANKINDIA/Bank-of-India'],
  ['INDUSINDBK', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/INDUSINDBK/Indusind-Bank'],
  ['MAHABANK', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/MAHABANK/Bank-of-Maharashtra'],
  ['KPITTECH', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/KPITTECH/KPIT-Technologies-Limited'],
  ['BSOFT', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/BSOFT/Birlasoft-Ltd'],
  ['HAPPSTMNDS', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/HAPPSTMNDS/Happiest-Minds-Technologies-Limited'],
  ['CYIENTDLM', 'Aerospace & Defense', 'https://www.nseindia.com/get-quote/equity/CYIENTDLM/Cyient-DLM-Limited'],
  ['MPHASIS', 'Computers - Software & Consulting', 'https://www.nseindia.com/get-quote/equity/MPHASIS/Mphasis-Ns'],
  ['AMBUJACEM', 'Cement & Cement Products', 'https://www.nseindia.com/get-quote/equity/AMBUJACEM/Ambuja-Cements-Limited'],
  ['JKCEMENT', 'Cement & Cement Products', 'https://www.nseindia.com/get-quote/equity/JKCEMENT/JK-Cement-Limited'],
  ['360ONE', 'Stockbroking & Allied', 'https://www.nseindia.com/get-quote/equity/360ONE/360-ONE-WAM-LIMITED'],
  ['CRISIL', 'Other Financial Services', 'https://www.nseindia.com/get-quote/equity/CRISIL/CRISIL-Ltd'],
  ['5PAISA', 'Stockbroking & Allied', 'https://www.nseindia.com/get-quote/equity/5PAISA/5Paisa-Capital-Limited'],
  ['ANANDRATHI', 'Financial Products Distributor', 'https://www.nseindia.com/get-quote/equity/ANANDRATHI/Anand-Rathi-Wealth-Limited'],
  ['ANGELONE', 'Stockbroking & Allied', 'https://www.nseindia.com/get-quote/equity/ANGELONE/Angel-One-Ltd'],
  ['BSE', 'Exchange and Data Platform', 'https://www.nseindia.com/get-quote/equity/BSE/BSE-Limited'],
  ['ABB', 'Heavy Electrical Equipment', 'https://www.nseindia.com/get-quote/equity/ABB/ABB-India-Limited'],
  ['HAVELLS', 'Consumer Electronics', 'https://www.nseindia.com/get-quote/equity/HAVELLS/Havells-India-Limited'],
  ['APOLLOTYRE', 'Tyres & Rubber Products', 'https://www.nseindia.com/get-quote/equity/APOLLOTYRE/Apollo-Tyres-Limited'],
  ['BHEL', 'Heavy Electrical Equipment', 'https://www.nseindia.com/get-quote/equity/BHEL/Bharat-Heavy-Electricals-Limited'],
  ['CGPOWER', 'Heavy Electrical Equipment', 'https://www.nseindia.com/get-quote/equity/CGPOWER/CG-Power-and-Industrial-Solutions-Limited'],

  // 2026-11-10 independently web-checked NSE equity quote basic-industry rows, batch 3.
  // Exact source ledger and code-pending exclusions: docs/NSE_INDUSTRY_EVIDENCE_BATCH_3.md
  ['HATSUN', 'Dairy Products', 'https://www.nseindia.com/get-quote/equity/HATSUN/Hatsun-Agro-Product-Limited'],
  ['PARAGMILK', 'Dairy Products', 'https://www.nseindia.com/get-quote/equity/PARAGMILK/Paragmilk-Ns'],
  ['KALYANKJIL', 'Gems, Jewellery And Watches', 'https://www.nseindia.com/get-quote/equity/KALYANKJIL/Kalyan-Jewellers-India-Limited'],
  ['SKYGOLD', 'Gems, Jewellery And Watches', 'https://www.nseindia.com/get-quote/equity/SKYGOLD/SKY-GOLD-AND-DIAMONDS-LIMITED'],
  ['SENCO', 'Gems, Jewellery And Watches', 'https://www.nseindia.com/get-quote/equity/SENCO/Senco-Gold-Limited'],
  ['UNITDSPR', 'Breweries & Distilleries', 'https://www.nseindia.com/get-quote/equity/UNITDSPR/United-Spirits-Ltd'],
  ['UBL', 'Breweries & Distilleries', 'https://www.nseindia.com/get-quote/equity/UBL/United-Breweries-Limited'],
  ['INDIGO', 'Airline', 'https://www.nseindia.com/get-quote/equity/INDIGO/InterGlobe-Aviation-Limited'],
  ['TATAPOWER', 'Integrated Power Utilities', 'https://www.nseindia.com/get-quote/equity/TATAPOWER/Tata-Power-Company-Limited'],
  ['JSWENERGY', 'Power Generation', 'https://www.nseindia.com/get-quote/equity/JSWENERGY/JSW-Energy-Limited'],
  ['NHPC', 'Power Generation', 'https://www.nseindia.com/get-quote/equity/NHPC/NHPC-Limited'],
  ['SJVN', 'Power Generation', 'https://www.nseindia.com/get-quote/equity/SJVN/SJVN-Limited'],
  ['POLYCAB', 'Cables - Electricals', 'https://www.nseindia.com/get-quote/equity/POLYCAB/Polycab-Ns'],
  ['RRKABEL', 'Cables - Electricals', 'https://www.nseindia.com/get-quotes/equity?symbol=RRKABEL'],
  ['FINCABLES', 'Cables - Electricals', 'https://www.nseindia.com/get-quote/equity/FINCABLES/Finolex-Cables-Limited'],
  ['GRSE', 'Aerospace & Defense', 'https://www.nseindia.com/get-quotes/equity?symbol=GRSE'],
  ['TITAGARH', 'Railway Wagons', 'https://www.nseindia.com/get-quote/equity/TITAGARH/TITAGARH-RAIL-SYSTEMS-LIMITED'],
  ['NESTLEIND', 'Packaged Foods', 'https://www.nseindia.com/get-quote/equity/NESTLEIND/Nestle-India-Limited'],
  ['DABUR', 'Personal Care', 'https://www.nseindia.com/get-quote/equity/DABUR/Dabur-India-Limited'],
  ['GODREJCP', 'Personal Care', 'https://www.nseindia.com/get-quote/equity/GODREJCP/Godrej-Consumer-Products-Limited'],
  ['DRREDDY', 'Pharmaceuticals', 'https://www.nseindia.com/get-quote/equity/DRREDDY/Dr-Reddy%27s-Laboratories-Limited'],
  ['HDFCLIFE', 'Life Insurance', 'https://www.nseindia.com/get-quote/equity/HDFCLIFE/HDFC-Life-Insurance-Company-Limited'],
  ['ICICIGI', 'General Insurance', 'https://www.nseindia.com/get-quote/equity/ICICIGI/ICICI-Lombard-General-Insurance-Company-Limited'],
  ['BATAINDIA', 'Footwear', 'https://www.nseindia.com/get-quote/equity/BATAINDIA/Bata-India-Limited'],
  ['METROBRAND', 'Footwear', 'https://www.nseindia.com/get-quote/equity/METROBRAND/Metro-Brands-Limited'],
  ['RBLBANK', 'Private Sector Bank', 'https://www.nseindia.com/get-quote/equity/RBLBANK/RBL-Bank-Limited'],
  ['MCX', 'Exchange and Data Platform', 'https://www.nseindia.com/get-quote/equity/MCX/Multi-Commodity-Exchange-of-India-Limited'],
  ['UNIONBANK', 'Public Sector Bank', 'https://www.nseindia.com/get-quote/equity/UNIONBANK/Union-Bank-of-India'],


].map(([ticker, basicIndustry, sourceUrl]) => ({
  ticker, basicIndustry, sourceUrl, verifiedOn: '2026-11-10',
}));

/**
 * Accept NSE quote API observations only after exact symbol, name, date and
 * published industry code are validated. Existing reviewed entries win on
 * conflict and can never be silently overwritten by an automated crawl.
 */
function loadSourceValidatedQuoteAssignments(): BasicIndustryAssignment[] {
  const results: BasicIndustryAssignment[] = [];
  const seen = new Set(VERIFIED_NSE_QUOTE_MAPPINGS.map(x => x.ticker));
  const sourceRows = quoteEvidence.rows as Array<{
    ticker: string; basicIndustry: string; industryCode: string | null;
    observedAt: string; sourceUrl: string; status: string;
  }>;
  for (const row of sourceRows) {
    if (row.status !== 'nse-direct-code-confirmed' || seen.has(row.ticker)) continue;
    if (!/^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(row.ticker)) continue;
    const expectedCode = BASIC_INDUSTRY_BY_NAME.get(row.basicIndustry)?.code;
    if (!expectedCode || expectedCode !== row.industryCode) continue;
    if (row.sourceUrl !== `https://www.nseindia.com/api/quote-equity?symbol=${encodeURIComponent(row.ticker)}`) continue;
    if (!Number.isFinite(Date.parse(row.observedAt))) continue;
    seen.add(row.ticker);
    results.push({
      ticker: row.ticker,
      basicIndustry: row.basicIndustry,
      sourceUrl: row.sourceUrl,
      verifiedOn: row.observedAt.slice(0, 10),
    });
  }
  return results;
}

export const DIRECT_NSE_QUOTE_ASSIGNMENTS = loadSourceValidatedQuoteAssignments();
export const VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS: ReadonlyMap<string, BasicIndustryAssignment> =
  new Map([...VERIFIED_NSE_QUOTE_MAPPINGS, ...DIRECT_NSE_QUOTE_ASSIGNMENTS].map(row => [row.ticker, row]));

export function validateSourceVerifiedAssignments(): string[] {
  const issues: string[] = [];
  const tickers = new Set<string>();
  for (const assignment of [...VERIFIED_NSE_QUOTE_MAPPINGS, ...DIRECT_NSE_QUOTE_ASSIGNMENTS]) {
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
      const path = decodeURIComponent(source.pathname).toUpperCase();
      const ticker = assignment.ticker.toUpperCase();
      const isDirect = path.startsWith(`/GET-QUOTE/EQUITY/${ticker}/`);
      const isSearch = path === '/GET-QUOTES/EQUITY' && source.searchParams.get('symbol')?.toUpperCase() === ticker;
      const isApi = path === '/API/QUOTE-EQUITY' && source.searchParams.get('symbol')?.toUpperCase() === ticker;
      if (source.protocol !== 'https:' || source.hostname !== 'www.nseindia.com' ||
          (!isDirect && !isSearch && !isApi)) {
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
