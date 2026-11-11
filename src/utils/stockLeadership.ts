/**
 * Dynamic Stock Leadership Radar. STRUCTURAL theme membership is frozen in
 * sectorUniverse.ts and never selected by momentum. Core, adjacent, proxy
 * positions remain visibly distinct; only observed matched daily closes
 * contribute. Not a buy/sell signal or trading-volume/fund-flow estimate.
 */
import { THEMATIC_SECTOR_BY_ID, classifySectorMember, type ExposureTier } from '../data/sectorUniverse';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, type BasicIndustryAssignment } from '../data/basicIndustryMappings';
import { sanitizeSnapshot } from './priceQuality';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

export type LeadershipState = 'Emerging' | 'Established' | 'Cooling' | 'Lagging' | 'Insufficient data';
export type LeaderSort = 'acceleration' | 'relative5' | 'relative21' | 'return5' | 'return21' | 'name';
export interface ThemeStockLeader {
  ticker:string;
  name:string;
  tier:ExposureTier;
  reviewStatus:'reviewed-theme-fit'|'provisional';
  industry:string | null;
  basicIndustrySource:'NSE'|'Screener.in'|null;
  marketCapCrSnapshot:number|null;
  return5:number|null;
  return21:number|null;
  relative5:number|null;
  relative21:number|null;
  acceleration:number|null;
  state:LeadershipState;
  priceDatesMatched:boolean;
}
export interface ThemeStockLeadership {
  themeId:string;
  themeName:string;
  sampledAt:string|null;
  benchmarkReady:boolean;
  total:number;
  valid:number;
  coreValid:number;
  adjacentValid:number;
  leaders:ThemeStockLeader[];
}
const round=(x:number)=>Number(x.toFixed(2));
const pct=(a:number,b:number)=>100*(a/b-1);
const iso=(d:string)=>/^\d{4}-\d{2}-\d{2}$/.test(d);
export function computeThemeStockLeadership(
  snapshot:BrowserMarketSnapshot|null,
  themeId:string,
  classification:ReadonlyMap<string,BasicIndustryAssignment>=VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS,
):ThemeStockLeadership {
  const theme=THEMATIC_SECTOR_BY_ID.get(themeId);
  const empty:ThemeStockLeadership={
    themeId,themeName:theme?.name||themeId,
    sampledAt:null,benchmarkReady:false,total:theme?.stocks.length||0,
    valid:0,coreValid:0,adjacentValid:0,leaders:[],
  };
  if(!theme)return empty;
  const benchmark=snapshot?.benchmarks?.nifty500?.history||[];
  const benchmarkByDate=new Map(benchmark.filter(x=>iso(x.date)&&x.value>0&&Number.isFinite(x.value)).map(x=>[x.date,x.value]));
  const dates=[...benchmarkByDate.keys()].sort();
  const enough=dates.length>=22;
  const last=dates[dates.length-1],w=dates[dates.length-6],m=dates[dates.length-22];
  const bn=enough?benchmarkByDate.get(last):undefined;
  const bw=enough?benchmarkByDate.get(w):undefined;
  const bm=enough?benchmarkByDate.get(m):undefined;
  const benchmarkReady=!!(bn&&bw&&bm);
  const b5=benchmarkReady?pct(bn!,bw!):0;
  const b21=benchmarkReady?pct(bn!,bm!):0;
  const bPrior5=benchmarkReady?100*(Math.pow(bw!/bm!,5/16)-1):0;
  const cleaned=snapshot?sanitizeSnapshot(snapshot.stocks):{};
  const all=theme.stocks.filter(stock=>classifySectorMember(theme.id,stock).tier!=='excluded')
    .map(stock=>{
      const assessment=classifySectorMember(theme.id,stock);
      const industry=classification.get(stock.ticker);
      const mapping=cleaned[stock.ticker];
      const prices=new Map((mapping?.rawHistory||[]).filter(x=>iso(x.date)&&x.close>0&&Number.isFinite(x.close)).map(x=>[x.date,x.close]));
      const p0=benchmarkReady?prices.get(last):undefined;
      const p5=benchmarkReady?prices.get(w):undefined;
      const p21=benchmarkReady?prices.get(m):undefined;
      const ready=!!(p0&&p5&&p21);
      const r5=ready?pct(p0!,p5!):null;
      const r21=ready?pct(p0!,p21!):null;
      const rs5=r5===null?null:r5-b5;
      const rs21=r21===null?null:r21-b21;
      const prior=ready?100*(Math.pow(p5!/p21!,5/16)-1):null;
      const accel=rs5===null||prior===null?null:rs5-(prior-bPrior5);
      let state:LeadershipState='Insufficient data';
      if(ready){
        if(rs21!<=0&&rs5!>0&&accel!>0)state='Emerging';
        else if(rs21!>0&&rs5!>0)state='Established';
        else if(rs21!>0&&(rs5!<=0||accel!<0))state='Cooling';
        else state='Lagging';
      }
      return {
        ticker:stock.ticker,name:stock.name,tier:assessment.tier,reviewStatus:assessment.reviewStatus,
        industry:industry?.basicIndustry||null,
        basicIndustrySource:industry?(industry.sourceType==='screener'?'Screener.in':'NSE'):null,
        marketCapCrSnapshot:Number.isFinite(stock.marketCapCr)&&stock.marketCapCr>0?stock.marketCapCr:null,
        return5:r5===null?null:round(r5),return21:r21===null?null:round(r21),
        relative5:rs5===null?null:round(rs5),relative21:rs21===null?null:round(rs21),
        acceleration:accel===null?null:round(accel),
        state,priceDatesMatched:ready,
      } as ThemeStockLeader;
    });
  return {
    ...empty, sampledAt:benchmarkReady?last:null,benchmarkReady,
    total:all.length,valid:all.filter(x=>x.priceDatesMatched).length,
    coreValid:all.filter(x=>x.priceDatesMatched&&x.tier==='core').length,
    adjacentValid:all.filter(x=>x.priceDatesMatched&&x.tier==='adjacent').length,
    leaders:all,
  };
}
export function sortThemeStockLeaders(rows:readonly ThemeStockLeader[],sort:LeaderSort):ThemeStockLeader[]{
  return [...rows].sort((a,b)=>{
    if(sort==='name')return a.name.localeCompare(b.name);
    const value=(r:ThemeStockLeader)=>sort==='acceleration'?r.acceleration:
      sort==='relative5'?r.relative5:sort==='relative21'?r.relative21:
      sort==='return5'?r.return5:r.return21;
    const x=value(a),y=value(b);
    if(x===null)return y===null?a.ticker.localeCompare(b.ticker):1;
    if(y===null)return -1;
    return y-x||a.ticker.localeCompare(b.ticker);
  });
}
