/** Dedicated stock-leadership research for user-approved NSE monitor symbols.
 * Monitoring is independent of curated index composition: no core promotion.
 */
import { validateAndRepairStock, type PriceHistoryRecord } from './priceQuality';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';
export type MonitorPhase='Emerging'|'Established'|'Cooling'|'Lagging'|'Awaiting history';
export interface MonitoredStockPulse{
  ticker:string;
  lastObserved:string|null;
  lastFetched:string|null;
  return5:number|null;
  rs5:number|null;
  rs21:number|null;
  acceleration:number|null;
  phase:MonitorPhase;
}
const iso=(x:string)=>/^\d{4}-\d{2}-\d{2}$/.test(x);
const ret=(x:number,y:number)=>100*(x/y-1);
const rounded=(x:number)=>Number(x.toFixed(2));
export function monitorLeadership(snapshot:BrowserMarketSnapshot|null,approved:readonly string[]):MonitoredStockPulse[]{
  const benchmark=new Map((snapshot?.benchmarks?.nifty500?.history||[])
    .filter(x=>iso(x.date)&&x.value>0&&Number.isFinite(x.value)).map(x=>[x.date,x.value]));
  const dates=[...benchmark.keys()].sort();
  const latest=dates.at(-1),w=dates.at(-6),m=dates.at(-22);
  const bNow=latest?benchmark.get(latest):undefined,b5=w?benchmark.get(w):undefined,b21=m?benchmark.get(m):undefined;
  const benchmarkReady=!!(bNow&&b5&&b21);
  const bR5=benchmarkReady?ret(bNow!,b5!):0;
  const bR21=benchmarkReady?ret(bNow!,b21!):0;
  const bPace=benchmarkReady?100*(Math.pow(b5!/b21!,5/16)-1):0;
  const results=approved.map(ticker=>{
    const source=snapshot?.stocks?.[ticker] as PriceHistoryRecord|undefined;
    const valid=source?.symbol===ticker+'.NS'?validateAndRepairStock(source).record:null;
    const prices=new Map((valid?.rawHistory||[]).filter(x=>iso(x.date)&&x.close>0&&Number.isFinite(x.close)).map(x=>[x.date,x.close]));
    const p0=latest?prices.get(latest):undefined,p5=w?prices.get(w):undefined,p21=m?prices.get(m):undefined;
    const ready=benchmarkReady&&!!(p0&&p5&&p21);
    if(!ready){
      return {ticker,lastObserved:null,lastFetched:valid?.fetchedAt||null,
        return5:null,rs5:null,rs21:null,acceleration:null,phase:'Awaiting history' as MonitorPhase};
    }
    const r5=ret(p0!,p5!),r21=ret(p0!,p21!);
    const rs5=r5-bR5,rs21=r21-bR21;
    const priorPace=100*(Math.pow(p5!/p21!,5/16)-1);
    const acceleration=rs5-(priorPace-bPace);
    const phase:MonitorPhase=rs21<=0&&rs5>0&&acceleration>0?'Emerging':
      rs21>0&&rs5>0?'Established':
      rs21>0&&(rs5<=0||acceleration<0)?'Cooling':'Lagging';
    return {
      ticker,lastObserved:latest!,lastFetched:valid?.fetchedAt||null,
      return5:rounded(r5),rs5:rounded(rs5),rs21:rounded(rs21),
      acceleration:rounded(acceleration),phase,
    };
  });
  return results.sort((a,b)=>a.acceleration===null?(b.acceleration===null?a.ticker.localeCompare(b.ticker):1):
    b.acceleration===null?-1:b.acceleration-a.acceleration||a.ticker.localeCompare(b.ticker));
}
