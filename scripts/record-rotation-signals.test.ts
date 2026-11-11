import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CORE_SECTOR_INDICES } from '../src/data/sectorUniverse';
import type { BrowserMarketSnapshot } from '../src/utils/marketSnapshotClient';
import { summarizeRadarDiary, type RadarDiary } from '../src/utils/rotationDiary';
import { recordRadarDiary } from './record-rotation-signals';

const t=CORE_SECTOR_INDICES.find(x=>x.stocks.length>=5 && x.stocks.length<=7);
if (!t) throw new Error('Need synthetic theme fixture');
function snapshot(length:number):BrowserMarketSnapshot {
  const days:string[]=[];
  const date=new Date('2026-07-01T12:00:00Z');
  while(days.length<length) {
    if(date.getUTCDay()!==0&&date.getUTCDay()!==6) days.push(date.toISOString().slice(0,10));
    date.setUTCDate(date.getUTCDate()+1);
  }
  const stocks:Record<string,unknown>={};
  for(const st of t!.stocks) {
    let close=100;
    const hist=days.map((date,i)=>{
      if(i>=45&&i<61)close*=.995;
      if(i>=61)close*=1.01;
      return {date,close:Number(close.toFixed(4))};
    });
    stocks[st.ticker]={ticker:st.ticker,symbol:st.ticker+'.NS',price:hist.at(-1)!.close,
      rawHistory:hist,fetchedAt:'2026-10-01T18:30:00Z'};
  }
  const hist=days.map((date,i)=>({date,value:Number((100*Math.pow(1.001,i)).toFixed(4))}));
  return {
    stocks,benchmarks:{nifty500:{history:hist}},
    fetchedAt:'2026-10-01T18:30:00Z',source:'GitHub',
  } as unknown as BrowserMarketSnapshot;
}

describe('Daily point-in-time rotation research diary',()=>{
  const empty:RadarDiary={version:1,days:[]};

  it('freezes a signal at the first observed date but cannot produce a future result yet',()=>{
    const first=recordRadarDiary(empty,snapshot(66));
    assert.equal(first.days.length,1);
    assert.ok(first.days[0].themes.length>0);
    const theme=first.days[0].themes.find(x=>x.themeId===t!.id)!;
    assert.equal(theme.phase,'Early turn');
    assert.equal(theme.forwardExcess5,null);
    assert.equal(theme.members.length,t!.stocks.length);
    assert.equal(summarizeRadarDiary(first).earlyMatured,0);
  });

  it('keeps the same frozen signal on reruns and evaluates it only after 5 trading sessions',()=>{
    const initial=recordRadarDiary(empty,snapshot(66));
    const frozen=initial.days[0].themes.find(x=>x.themeId===t!.id)!;
    const duplicate=recordRadarDiary(initial,snapshot(66));
    assert.equal(duplicate.days.length,1);
    assert.equal(duplicate.days[0].firstRecordedAt,initial.days[0].firstRecordedAt);
    assert.equal(duplicate.days[0].themes.find(x=>x.themeId===t!.id)?.forwardExcess5,null);
    const matured=recordRadarDiary(duplicate,snapshot(71));
    assert.equal(matured.days.length,2);
    const old=matured.days[0].themes.find(x=>x.themeId===t!.id)!;
    assert.equal(old.phase,frozen.phase);
    assert.equal(old.rs5,frozen.rs5);
    assert.deepEqual(old.members,frozen.members);
    assert.ok(old.forwardExcess5!==null&&old.forwardExcess5>0);
    const stats=summarizeRadarDiary(matured);
    assert.ok(stats.earlyMatured>=1);
    assert.equal(stats.earlyHitRate,100);
    assert.ok(stats.earlyMeanExcess!>0);
    assert.ok(stats.totalMatured>=stats.earlyMatured);
  });

  it('does not pretend a non-matured signal is a measured 0% hit rate',()=>{
    const d=recordRadarDiary(empty,snapshot(66));
    const stats=summarizeRadarDiary(d);
    assert.equal(stats.earlyHitRate,null);
    assert.equal(stats.earlyMeanExcess,null);
  });
});
