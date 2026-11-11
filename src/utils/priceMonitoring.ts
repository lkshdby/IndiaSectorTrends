/**
 * Intentionally PUBLIC ticker-only monitoring manifest.
 * All Screener-derived industry/company/market-cap/ISIN data stays local.
 * A monitored symbol is NOT a vetted theme member or an investment suggestion.
 */
export const MONITORING_MANIFEST_PATH = 'src/data/priceMonitoringSymbols.json';
export const MAX_MONITORED_TICKERS = 150;
export const MAX_APPROVAL_BATCH = 20;
export const APPROVAL_MARKER = '<!-- ist-monitor-request:v1 -->';
export const APPROVAL_START = 'APPROVED_NSE_TICKERS';
export const APPROVAL_END = 'END_APPROVED_NSE_TICKERS';
export const PUBLIC_MONITOR_URL =
  'https://raw.githubusercontent.com/lkshdby/IndiaSectorTrends/main/src/data/priceMonitoringSymbols.json';
export interface PriceMonitoringManifest {
  version:1;
  symbols:string[];
}
export const EMPTY_MONITORING:PriceMonitoringManifest = {version:1,symbols:[]};
export function normalizeMonitorSymbol(raw:string):string|null {
  const symbol=String(raw).trim().toUpperCase();
  // NSE quote tickers: no .NS/.BO extension, URLs, whitespace or shell chars.
  return /^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(symbol) && !/\.(NS|BO)$/.test(symbol) ? symbol:null;
}
export function parseMonitoringManifest(raw:unknown):PriceMonitoringManifest{
  if(!raw||typeof raw!=='object')throw new Error('Monitoring list is not an object');
  const data=raw as Record<string,unknown>;
  if(data.version!==1||!Array.isArray(data.symbols)||data.symbols.length>MAX_MONITORED_TICKERS){
    throw new Error('Invalid monitoring manifest version, symbols or size');
  }
  const symbols=data.symbols.map(x=>typeof x==='string'?normalizeMonitorSymbol(x):null);
  if(symbols.some(x=>!x)||new Set(symbols).size!==symbols.length){
    throw new Error('Duplicate or invalid NSE monitoring symbols');
  }
  return {version:1,symbols:symbols as string[]};
}
export function approveMonitoringSymbols(
  before:PriceMonitoringManifest, requested:readonly string[],
  existingThemes:ReadonlySet<string>=new Set(),
):{after:PriceMonitoringManifest,added:string[],skipped:string[]}{
  const known=parseMonitoringManifest(before);
  if(!requested.length||requested.length>MAX_APPROVAL_BATCH){
    throw new Error('Choose between 1 and '+MAX_APPROVAL_BATCH+' ticker symbols per approval');
  }
  const clean=requested.map(normalizeMonitorSymbol);
  if(clean.some(x=>!x)||new Set(clean).size!==clean.length){
    throw new Error('Invalid or repeated NSE ticker symbols in request');
  }
  const added:string[]=[];const skipped:string[]=[];
  const set=new Set(known.symbols);
  for(const ticker of clean as string[]){
    if(set.has(ticker)||existingThemes.has(ticker)){skipped.push(ticker);continue;}
    set.add(ticker);added.push(ticker);
  }
  if(set.size>MAX_MONITORED_TICKERS){
    throw new Error('Maximum monitoring limit '+MAX_MONITORED_TICKERS+' reached');
  }
  return {after:{version:1,symbols:[...set].sort()},added,skipped};
}
export function buildMonitoringIssueBody(selected:readonly string[]):string {
  const check=approveMonitoringSymbols(EMPTY_MONITORING,selected);
  if(check.skipped.length)throw new Error('Unexpected duplicate ticker');
  return [
    APPROVAL_MARKER,APPROVAL_START,
    ...check.added,
    APPROVAL_END,
    '',
    'I approve adding these NSE ticker symbols to PUBLIC daily price monitoring.',
    'No private Screener CSV, industry labels, company data or ISIN will be committed.',
    'These are watchlist tickers only, not approved theme core/adjacent memberships.',
    'GitHub Actions validates and commits the ticker-only monitoring list.',
  ].join('\n');
}
export function parseMonitoringIssueBody(body:string):string[]{
  if(!body.startsWith(APPROVAL_MARKER+'\n'))throw new Error('Unrecognized monitoring request marker');
  const lines=body.replace(/\r\n/g,'\n').split('\n');
  if(lines[1]!==APPROVAL_START)throw new Error('Missing approval list start');
  const end=lines.indexOf(APPROVAL_END,2);
  if(end<3)throw new Error('Missing approval list end');
  const symbols=lines.slice(2,end);
  approveMonitoringSymbols(EMPTY_MONITORING,symbols);
  if(!lines.slice(end+1).join('\n').includes('I approve adding these NSE ticker symbols')){
    throw new Error('Request lacks explicit price-monitoring approval');
  }
  return symbols.map(x=>normalizeMonitorSymbol(x)!);
}
export function buildMonitoringIssueUrl(selected:readonly string[]):string {
  const body=buildMonitoringIssueBody(selected);
  const title='[Monitor NSE] Approve '+selected.length+' ticker(s) for daily prices';
  return 'https://github.com/lkshdby/IndiaSectorTrends/issues/new?title='+
    encodeURIComponent(title)+'&body='+encodeURIComponent(body);
}
export async function fetchPriceMonitoringManifest():Promise<PriceMonitoringManifest>{
  const response=await fetch(PUBLIC_MONITOR_URL+'?v='+Date.now(),{cache:'no-store',credentials:'omit'});
  if(!response.ok)throw new Error('Monitoring list unavailable (HTTP '+response.status+')');
  return parseMonitoringManifest(await response.json());
}
