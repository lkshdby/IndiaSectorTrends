import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { monitorLeadership } from './monitoringLeadership';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

function fixture():BrowserMarketSnapshot{
  const dates:string[]=[];const now=new Date('2026-08-03T12:00:00Z');
  while(dates.length<45){
    if(now.getUTCDay()!==0&&now.getUTCDay()!==6)dates.push(now.toISOString().slice(0,10));
    now.setUTCDate(now.getUTCDate()+1);
  }
  let close=100;
  const history=dates.map((date,i)=>{
    if(i>0)close*=i<40?0.995:1.02;
    return {date,close:Number(close.toFixed(5))};
  });
  const bench=dates.map((date,i)=>({date,value:Number((100*Math.pow(1.001,i)).toFixed(5))}));
  return {
    source:'GitHub',fetchedAt:'2026-10-01T12:00:00Z',
    benchmarks:{nifty500:{history:bench}},
    stocks:{NEWCO:{ticker:'NEWCO',symbol:'NEWCO.NS',price:history.at(-1)!.close,
      fetchedAt:'2026-10-01T12:00:00Z',rawHistory:history}},
  } as unknown as BrowserMarketSnapshot;
}
describe('price-monitored industry peers research leaderboard',()=>{
  it('calculates early-turn RS on exact observed benchmark dates, with missing history not ranked',()=>{
    const r=monitorLeadership(fixture(),['NEWCO','MISSING']);
    assert.equal(r.length,2);
    assert.equal(r[0].ticker,'NEWCO');
    assert.equal(r[0].phase,'Emerging');
    assert.ok(r[0].rs5!>0);
    assert.ok(r[0].rs21!<0);
    assert.ok(r[0].acceleration!>0);
    assert.equal(r[1].phase,'Awaiting history');
    assert.equal(r[1].rs5,null);
  });
  it('rejects same-ticker quote identities that point to BSE rather than NSE',()=>{
    const source=fixture();
    (source.stocks.NEWCO as {symbol:string}).symbol='NEWCO.BO';
    const rows=monitorLeadership(source,['NEWCO']);
    assert.equal(rows[0].phase,'Awaiting history');
    assert.equal(rows[0].acceleration,null);
  });
  it('does not fabricate any performance if benchmark history is absent',()=>{
    const source=fixture();
    source.benchmarks.nifty500.history=[];
    const rows=monitorLeadership(source,['NEWCO']);
    assert.equal(rows[0].phase,'Awaiting history');
  });
});
