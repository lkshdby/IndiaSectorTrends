/**
 * Evidence-based, polite one-time NSE public quote annotation.
 *
 * Run on GitHub Actions or locally from an internet-connected machine:
 *   npx tsx scripts/annotate-nse-industries.ts --max 12
 *   npx tsx scripts/annotate-nse-industries.ts --max 0
 *
 * No login/CAPTCHA circumvention, proxy rotation, or retries after persistent
 * access denials. Never fabricates classification from thematic membership.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { BASIC_INDUSTRY_BY_NAME } from '../src/data/basicIndustryCatalog';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS } from '../src/data/basicIndustryMappings';
import { THEMATIC_SECTOR_INDICES } from '../src/data/sectorUniverse';

export interface QuoteEvidenceRow {
  ticker: string;
  basicIndustry: string;
  industryCode: string | null;
  isin: string | null;
  observedAt: string;
  sourceUrl: string;
  status: 'nse-direct-code-confirmed' | 'nse-direct-code-pending' | 'conflicting-prior-classification';
  notes: string;
}
export interface EvidenceFile {
  collectedAt: string | null;
  source: string;
  rows: QuoteEvidenceRow[];
  method: string;
}

const OUTPUT = 'src/data/nseIndustryQuoteEvidence.json';
const URL = 'https://www.nseindia.com';
const parameters = process.argv.slice(2);
const maxAt = parameters.indexOf('--max');
const limit = maxAt >= 0 ? Number(parameters[maxAt+1]) : 15;
if (!Number.isInteger(limit) || limit < 0 || limit > 500) throw Error('Use --max 0..500; 0 means all');
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const browserHeaders = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-IN,en;q=0.8',
  'User-Agent': 'Mozilla/5.0 (compatible; SectorRotationResearch/1.0; +https://github.com/lkshdby/IndiaSectorTrends)',
};
function normalize(s: unknown) { return typeof s === 'string' ? s.trim().toUpperCase().replace(/\.NS$/, '') : ''; }
function loadFile(): EvidenceFile {
  try { return JSON.parse(readFileSync(OUTPUT,'utf8')) as EvidenceFile; }
  catch { return { collectedAt: null, source: 'NSE public equity quote endpoint', rows: [], method: 'Uncollected' }; }
}

/** Independently validate symbol identity and actual NSE-provided industry field. */
export function validateIndustryResponse(ticker: string, data: unknown, observedAt: string): QuoteEvidenceRow | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, any>;
  const info = record.info || record.metaData || record.metadata || {};
  const actual = normalize(info.symbol || record.symbol);
  const industry = record.industryInfo || record.secInfo || {};
  const basicIndustry = typeof industry.basicIndustry === 'string' ? industry.basicIndustry.trim() : '';
  if (!actual || actual !== normalize(ticker) || !basicIndustry) return null;
  if (basicIndustry.length > 150) return null;
  const isin = info.isin || info.isinCode || null;
  if (isin !== null && !/^IN[A-Z0-9]{10}$/.test(String(isin).toUpperCase())) return null;
  const category = BASIC_INDUSTRY_BY_NAME.get(basicIndustry);
  const existing = VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get(actual);
  const status: QuoteEvidenceRow['status'] =
    existing && existing.basicIndustry !== basicIndustry ? 'conflicting-prior-classification' :
    category?.code ? 'nse-direct-code-confirmed' : 'nse-direct-code-pending';
  return {
    ticker: actual,
    basicIndustry,
    industryCode: category?.code || null,
    isin: typeof isin === 'string' ? isin.toUpperCase() : null,
    observedAt,
    sourceUrl: `${URL}/api/quote-equity?symbol=${encodeURIComponent(actual)}`,
    status,
    notes: status === 'conflicting-prior-classification'
      ? `NSE quote differs from existing reviewed mapping: ${existing!.basicIndustry}; requires review`
      : status === 'nse-direct-code-pending'
        ? 'Industry string came directly from NSE, but its published classification code needs catalog verification'
        : 'NSE direct quote response matches ticker and published basic-industry code',
  };
}
function allSymbols(): string[] {
  const tickers = new Set<string>();
  for(const sector of THEMATIC_SECTOR_INDICES)
    for(const stock of sector.stocks) tickers.add(normalize(stock.ticker));
  try {
    const snapshot = JSON.parse(readFileSync('src/data/verifiedLiveMarketData.json','utf8'));
    for(const ticker of Object.keys(snapshot.stocks || {})) tickers.add(normalize(ticker));
  } catch { console.warn('No local saved snapshot; using thematic symbols only'); }
  const priority = ['BHARTIARTL','INFY','LICI','HINDUNILVR','LT','NTPC','M&M','ULTRACEMCO',
    'EICHERMOT','BOSCHLTD','OLAELEC','CAMS','AMBER','JBMA','KFINTECH','HBLENGINE','PGEL','GRAVITA'];
  const prioritization = new Map(priority.map((ticker,i) => [ticker,i]));
  return [...tickers].filter(Boolean).sort((a,b) => {
    const rankA=prioritization.get(a) ?? 1e6,rankB=prioritization.get(b) ?? 1e6;
    return rankA-rankB || a.localeCompare(b);
  });
}

async function run() {
  const stored = loadFile();
  const rows = new Map(stored.rows.map(row => [row.ticker,row]));
  const pending = allSymbols().filter(ticker => !rows.has(ticker) && !VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.has(ticker));
  const batch = limit ? pending.slice(0,limit) : pending;
  console.log(JSON.stringify({universe:allSymbols().length,existingDirect:rows.size,alreadyReviewed:VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.size,plannedRequests:batch.length}));
  // A normal NSE landing page establishes public cookies if required. A
  // 403/429/503 response means STOP, not an invitation to bypass protection.
  let cookies = '';
  try {
    const landing = await fetch(`${URL}/get-quotes/equity?symbol=INFY`,{
      headers:browserHeaders,signal:AbortSignal.timeout(16000),
    });
    if (landing.status === 403 || landing.status === 429) {
      console.warn(`NSE denied public session HTTP ${landing.status}; stopping without bypass.`);
      return;
    }
    const raw = landing.headers.getSetCookie?.() || [];
    cookies = raw.map(x=>x.split(';')[0]).filter(Boolean).join('; ');
  } catch(error) {
    console.warn('Unable to establish normal NSE session:',String(error).slice(0,250));
    return;
  }
  let successes=0, failures=0, accessDenials=0;
  for (const ticker of batch) {
    await delay(2300);
    const url=`${URL}/api/quote-equity?symbol=${encodeURIComponent(ticker)}`;
    try {
      const response=await fetch(url,{
        headers:{...browserHeaders,'Referer':`${URL}/get-quotes/equity?symbol=${encodeURIComponent(ticker)}`,...(cookies?{'Cookie':cookies}:{})},
        signal:AbortSignal.timeout(15000),
      });
      if ([403,429,503].includes(response.status)) {
        accessDenials++;
        console.warn(`${ticker}: NSE access unavailable HTTP ${response.status}; will not bypass`);
        if(accessDenials >= 2) break;
        await delay(10000);
        continue;
      }
      accessDenials=0;
      if(!response.ok){failures++;console.warn(`${ticker}: HTTP ${response.status}`);continue;}
      const result=validateIndustryResponse(ticker,await response.json(),new Date().toISOString());
      if(result){rows.set(ticker,result);successes++;console.log(`${ticker}: ${result.basicIndustry} [${result.status}]`);}
      else {failures++; console.warn(`${ticker}: missing/mismatched NSE symbol or basic-industry response`);}
    } catch(err) {failures++;console.warn(`${ticker}: network or parse error ${String(err).slice(0,120)}`);}
  }
  if(successes) {
    const output: EvidenceFile={
      collectedAt:new Date().toISOString(),
      source:'NSE public company-specific quote JSON',
      rows:[...rows.values()].sort((a,b)=>a.ticker.localeCompare(b.ticker)),
      method:'Public NSE quote-equity endpoint; ticker and reported basicIndustry validated. No inferred mappings promoted. Access denials stop collection.',
    };
    writeFileSync(OUTPUT,JSON.stringify(output,null,2)+'\n');
  }
  console.log(JSON.stringify({successes,failures,accessDenials,totalDirectEvidence:rows.size,outputChanged:successes>0}));
}
if (process.argv[1]?.includes('annotate-nse-industries')) run().catch(error=>{console.error(error);process.exitCode=1;});
