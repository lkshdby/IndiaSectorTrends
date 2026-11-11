/**
 * Browser-local Screener export research pool. Exports may contain thousands
 * of NSE symbols, but these are INDUSTRY PEERS only. Industry classification
 * alone is not thematic business-segment exposure. Never add them silently to
 * curated core indices or claim daily-return leaders without price histories.
 */
import { parseIndustryCsv } from './basicIndustryCsvReview';
import { BASIC_INDUSTRY_BY_NAME } from '../data/basicIndustryCatalog';
import { THEMATIC_SECTOR_BY_ID, classifySectorMember } from '../data/sectorUniverse';
import type { BasicIndustryAssignment } from '../data/basicIndustryMappings';

export const SCREENER_RESEARCH_KEY = 'india-sector-trends:screener-research-pool:v1';
export interface ScreenerResearchCompany {
  ticker:string;
  name:string;
  isin:string;
  industry:string;
  industryGroup:string;
  marketCapCr:number|null;
}
export interface ScreenerResearchPool {
  version:1;
  companies:ScreenerResearchCompany[];
  extractedAt:string;
  totalExportRows:number;
  unmatchedIndustryNames:number;
}
export interface IndustryPeerCandidate extends ScreenerResearchCompany {
  reason:string;
  evidence:'screener-industry-only';
}
function key(s:string):string{return s.trim().toLowerCase().replace(/[^a-z0-9]/g,'');}
function numberOrNull(s:string):number|null {
  const n=Number(s.replace(/,/g,'').trim());
  return s.trim()&&Number.isFinite(n)&&n>0?n:null;
}
export function parseScreenerResearchPool(input:string,asOf:string):ScreenerResearchPool {
  if(input.length>8_000_000)throw new Error('Screener CSV exceeds 8 MB');
  const rows=parseIndustryCsv(input);
  if(rows.length<2||rows.length>15000)throw new Error('Expected a Screener export with 2–15,000 rows');
  const headers=rows[0].map(key);
  const col=(keys:string[]):number=>headers.findIndex(h=>keys.includes(h));
  const t=col(['nsecode','nsesymbol']);
  const name=col(['name','companyname']);
  const isin=col(['isincode','isin']);
  const industry=col(['industry','basicindustry']);
  const group=col(['industrygroup']);
  const mcap=col(['marketcapitalization','marketcap']);
  if(t<0||name<0||industry<0)throw new Error('Screener CSV requires NSE Code, Name, and Industry columns');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(asOf)||!Number.isFinite(Date.parse(asOf))||Date.parse(asOf)>Date.now()){
    throw new Error('Import review date must be a valid nonfuture YYYY-MM-DD');
  }
  const seen=new Set<string>(),companies:ScreenerResearchCompany[]=[];
  let unmatchedIndustryNames=0;
  for(let i=1;i<rows.length;i++){
    const row=rows[i];if(row.length!==headers.length)throw new Error('Malformed CSV row '+(i+1));
    const ticker=row[t].trim().toUpperCase();
    if(!/^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(ticker)||seen.has(ticker))continue;
    seen.add(ticker);
    const ind=row[industry].replace(/\s+/g,' ').trim();
    if(!BASIC_INDUSTRY_BY_NAME.has(ind)){unmatchedIndustryNames++;continue;}
    const code=isin>=0?row[isin].trim().toUpperCase():'';
    const label=row[name].trim();
    if(!label||label.length>160)continue;
    companies.push({
      ticker,name:label,isin:/^IN[A-Z0-9]{10}$/.test(code)?code:'',
      industry:ind,industryGroup:group>=0?row[group].replace(/\s+/g,' ').trim():'',
      marketCapCr:mcap>=0?numberOrNull(row[mcap]):null,
    });
  }
  if(companies.length<1)throw new Error('No Screener NSE-coded companies with recognized industries');
  return {version:1,companies,totalExportRows:rows.length-1,extractedAt:asOf,unmatchedIndustryNames};
}
/**
 * Same-basic-industry candidate search. NO thematic fit claim. Sort by static
 * market cap to avoid using future winner returns for membership selection.
 */
export function selectScreenerIndustryPeers(
  pool:ScreenerResearchPool,
  themeId:string,
  classifications:ReadonlyMap<string,BasicIndustryAssignment>,
  minimumMarketCapCr=500,
):IndustryPeerCandidate[]{
  const theme=THEMATIC_SECTOR_BY_ID.get(themeId);
  if(!theme)return [];
  const included=new Set(theme.stocks.map(s=>s.ticker.toUpperCase()));
  const coreIndustries=new Set(theme.stocks.filter(s=>
    classifySectorMember(theme.id,s).tier==='core')
    .map(s=>classifications.get(s.ticker)?.basicIndustry).filter((x):x is string=>!!x));
  if(!coreIndustries.size)return [];
  return pool.companies.filter(company=>coreIndustries.has(company.industry) &&
    !included.has(company.ticker) &&
    company.marketCapCr!==null && company.marketCapCr>=minimumMarketCapCr)
    .map(company=>({...company,
      evidence:'screener-industry-only' as const,
      reason:'Shares the verified Basic Industry '+company.industry+
        ' with a core member; company-specific thematic exposure remains unverified',
    }))
    .sort((a,b)=>(b.marketCapCr||0)-(a.marketCapCr||0)||a.ticker.localeCompare(b.ticker));
}
export function loadScreenerResearchPool():ScreenerResearchPool|null {
  try {
    if(typeof window==='undefined')return null;
    const json=window.localStorage.getItem(SCREENER_RESEARCH_KEY);
    if(!json)return null;
    const data=JSON.parse(json) as ScreenerResearchPool;
    return data?.version===1&&Array.isArray(data.companies)&&data.companies.length<=15000?data:null;
  }catch{return null;}
}
export function saveScreenerResearchPool(pool:ScreenerResearchPool):void {
  if(typeof window==='undefined')throw new Error('Private pool only available in a browser');
  window.localStorage.setItem(SCREENER_RESEARCH_KEY,JSON.stringify(pool));
}
export function clearScreenerResearchPool():void {
  if(typeof window!=='undefined')window.localStorage.removeItem(SCREENER_RESEARCH_KEY);
}
