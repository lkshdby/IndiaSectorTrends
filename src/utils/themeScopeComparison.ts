/**
 * Side-by-side observational scope comparison.
 * Broader ecosystem includes approved Adjacent / Proxy members but never
 * contributes to canonical Rotation Radar alerts or the prospective diary.
 */
import { THEMATIC_SECTOR_INDICES, classifySectorMember } from '../data/sectorUniverse';
import { COMMITTED_THEME_REVIEWS, type ThemeReviewBook } from './themeCompositionReviews';
import { sanitizeSnapshot } from './priceQuality';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

export interface ThemeScopeSeries {
  constituents: string[];
  total: number;
  valid: number;
  coveragePct: number;
  return5: number|null;
  return21: number|null;
  relative5: number|null;
  relative21: number|null;
  missing: string[];
}
export interface ThemeScopeComparison {
  asOf:string;
  purePlay:ThemeScopeSeries;
  ecosystem:ThemeScopeSeries;
}
const ret=(now:number,previous:number)=>100*(now/previous-1);
const round=(n:number)=>Number(n.toFixed(2));

export function compareThemeScope(
  snapshot:BrowserMarketSnapshot|null,
  themeId:string,
  reviews:ThemeReviewBook=COMMITTED_THEME_REVIEWS,
):ThemeScopeComparison|null {
  const theme=THEMATIC_SECTOR_INDICES.find(t=>t.id===themeId);
  const benchmark=snapshot?.benchmarks?.nifty500?.history;
  if(!theme||!snapshot||!benchmark||benchmark.length<22)return null;
  const points=new Map(benchmark.filter(x=>
    /^\d{4}-\d{2}-\d{2}$/.test(x.date)&&Number.isFinite(x.value)&&x.value>0
  ).map(x=>[x.date,x.value]));
  const dates=[...points.keys()].sort();
  if(dates.length<22)return null;
  const asOf=dates.at(-1)!,prev5=dates.at(-6)!,prev21=dates.at(-22)!;
  const b0=points.get(asOf),b5=points.get(prev5),b21=points.get(prev21);
  if(!b0||!b5||!b21)return null;
  const bRet5=ret(b0,b5),bRet21=ret(b0,b21);
  const stockPrices=sanitizeSnapshot(snapshot.stocks);
  const rows=theme.stocks.map(stock=>({
    ticker:stock.ticker.toUpperCase(),
    tier:classifySectorMember(theme.id,stock,reviews).tier,
  }));
  const build=(tickers:string[]):ThemeScopeSeries=>{
    const uniq=[...new Set(tickers)];
    const returns5:number[]=[],returns21:number[]=[],missing:string[]=[];
    for(const ticker of uniq){
      const stock=stockPrices[ticker];
      const history=new Map(stock?.rawHistory?.map(x=>[x.date,x.close])||[]);
      const now=history.get(asOf),before5=history.get(prev5),before21=history.get(prev21);
      if(!now||!before5||!before21||now<=0||before5<=0||before21<=0){
        missing.push(ticker);continue;
      }
      returns5.push(ret(now,before5));
      returns21.push(ret(now,before21));
    }
    const valid=returns5.length,total=uniq.length;
    const r5=valid?round(returns5.reduce((sum,n)=>sum+n,0)/valid):null;
    const r21=valid?round(returns21.reduce((sum,n)=>sum+n,0)/valid):null;
    return {
      constituents:uniq,total,valid,coveragePct:total?Math.round(100*valid/total):0,
      return5:r5,return21:r21,
      relative5:r5===null?null:round(r5-bRet5),
      relative21:r21===null?null:round(r21-bRet21),
      missing,
    };
  };
  return {
    asOf,
    purePlay:build(rows.filter(r=>r.tier==='core').map(r=>r.ticker)),
    ecosystem:build(rows.filter(r=>r.tier==='core'||r.tier==='adjacent'||r.tier==='proxy').map(r=>r.ticker)),
  };
}
