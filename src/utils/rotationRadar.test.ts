import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CORE_SECTOR_INDICES, classifySectorMember, getCoreSectorIndices } from '../data/sectorUniverse';
import { COMMITTED_THEME_REVIEWS } from './themeCompositionReviews';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';
import { computeRotationRadar } from './rotationRadar';

const theme = CORE_SECTOR_INDICES.find(x => {
  const unique = new Set(x.stocks.map(s => s.ticker));
  return unique.size >= 5 && unique.size <= 7 && x.stocks.every(stock => classifySectorMember(x.id,stock).reviewStatus==='reviewed-theme-fit');
});
if (!theme) throw new Error('Fixture needs a curated core basket of 5–7 companies');

function syntheticMarket(): BrowserMarketSnapshot {
  const days: string[] = [];
  const date = new Date('2026-07-01T12:00:00.000Z');
  while (days.length < 66) {
    if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6) {
      days.push(date.toISOString().slice(0, 10));
    }
    date.setUTCDate(date.getUTCDate() + 1);
  }
  const prices: Record<string, unknown> = {};
  for (const stock of theme!.stocks) {
    let close = 100;
    const h = days.map((day, idx) => {
      // 5-session early rebound after prior 16-session selloff.
      if (idx >= 45 && idx < 61) close *= .995;
      if (idx >= 61) close *= 1.01;
      return {date: day, close: Number(close.toFixed(4))};
    });
    prices[stock.ticker] = {
      ticker: stock.ticker, symbol: stock.ticker+'.NS',
      price: h.at(-1)!.close, rawHistory: h,
      fetchedAt: '2026-10-02T10:00:00Z',
    };
  }
  const bHistory = days.map((day,i)=>({date:day,value:Number((100*Math.pow(1.001,i)).toFixed(4))}));
  const bench = (key:string)=>({
    key, symbol:key, name:key, category:key, price:bHistory.at(-1)!.value,
    change1D:0.1,change1W:0.5,change3M:6,
    history:bHistory, fetchedAt: '2026-10-02T10:00:00Z',
  });
  return {
    stocks: prices,
    fetchedAt:'2026-10-02T10:00:00Z',
    benchmarks: {
      nifty50:bench('nifty50'),
      nifty500:bench('nifty500'),
      niftyMidcap:bench('niftyMidcap'),
      niftySmallcap:bench('niftySmallcap'),
    },
    source:'GitHub',
  } as unknown as BrowserMarketSnapshot;
}

describe('Rotation Radar: cross-theme early transition and honest validation',()=>{
  it('does not produce signals without valid aligned market data',()=>{
    const result=computeRotationRadar(null);
    assert.equal(result.earlyTurns.length,0);
    assert.equal(result.asOf,null);
    assert.equal(result.forwardCheck.signalHitPct,null);
  });

  it('finds a disjoint-window early turn with broad stock participation and negative 21-day RS',()=>{
    const market=syntheticMarket();
    const result=computeRotationRadar(market);
    const pulse=result.allThemes.find(p=>p.themeId===theme!.id)!;
    assert.ok(pulse);
    assert.equal(pulse.phase,'Early turn');
    assert.ok(pulse.rs5>0);
    assert.ok(pulse.rs21<0);
    assert.ok(pulse.rsAcceleration>0);
    assert.equal(pulse.advancingPct5,100);
    assert.equal(pulse.advancingPctPrior16,0);
    assert.equal(pulse.coveragePct,100);
    assert.equal(pulse.validCount,new Set(theme!.stocks.map(x=>x.ticker)).size);
    assert.ok(result.earlyTurns.some(p=>p.themeId===theme!.id));
    assert.equal(result.asOf,market.benchmarks.nifty500.history.at(-1)!.date);
  });

  it('classifies every saved owner-approved theme as reviewed in the actual Radar',()=>{
    // The complete audit includes owner-approved Jewellery (GitHub #26).
    const fixture=syntheticMarket();
    const stocks={...fixture.stocks} as Record<string,unknown>;
    const seed=Object.values(fixture.stocks)[0] as Record<string,unknown>;
    const audited=COMMITTED_THEME_REVIEWS.reviews;
    assert.ok(audited.some(r=>r.githubIssue===26),'Expected issue #26 in bundled audit');
    for(const review of audited){
      const core=getCoreSectorIndices(COMMITTED_THEME_REVIEWS)
        .find(t=>t.id===review.themeId);
      assert.ok(core,'Missing approved theme '+review.themeId);
      for(const stock of core.stocks){
        stocks[stock.ticker]={...seed,ticker:stock.ticker,symbol:stock.ticker+'.NS'};
      }
    }
    const report=computeRotationRadar({...fixture,stocks} as BrowserMarketSnapshot);
    for(const review of audited){
      const row=report.allThemes.find(r=>r.themeId===review.themeId);
      assert.ok(row,'Missing approved Radar theme '+review.themeId);
      assert.equal(row.membershipReview,'explicit-editorial',review.themeId);
      assert.notEqual(row.phase,'Provisional composition',review.themeId);
    }
    const jewellery=report.allThemes.find(r=>r.themeId==='jewellery-luxury-watches');
    assert.equal(jewellery?.total,7);
    assert.equal(jewellery?.coveragePct,100);
  });

  it('does not mistake sector metadata for verified industry evidence',()=>{
    const market=syntheticMarket();
    const classifications=new Map([[
      theme!.stocks[0].ticker,
      {ticker:theme!.stocks[0].ticker,basicIndustry:'Aerospace & Defense',
        sourceUrl:'https://www.nseindia.com/get-quotes/equity?symbol='+theme!.stocks[0].ticker,
        verifiedOn:'2026-11-11' }
    ]]);
    const report=computeRotationRadar(market,classifications);
    const pulse=report.allThemes.find(p=>p.themeId===theme!.id)!;
    const classified=pulse.stockDrivers.find(s=>s.ticker===theme!.stocks[0].ticker);
    assert.equal(classified?.basicIndustry,'Aerospace & Defense');
    assert.ok(pulse.stockDrivers.some(s=>s.basicIndustry==='Unclassified'));
    assert.equal(pulse.industryDrivers.reduce((a,g)=>a+g.companies,0),pulse.validCount);
  });

  it('reports forward 5-session tests separately and never claims proof from short history',()=>{
    const market=syntheticMarket();
    const report=computeRotationRadar(market);
    assert.equal(report.forwardCheck.label,'exploratory-in-sample-membership');
    // This synthetic fixture is dated before the first owner approval in November.
    // Historical backtests must NOT backdate later editorial decisions.
    assert.equal(report.forwardCheck.sampleDates,0);
    assert.equal(report.forwardCheck.evaluatedThemes,0);
    assert.equal(report.forwardCheck.baselineHitPct,null);
    // A signal at the latest session has no observable future close yet,
    // so its outcome must NOT appear as a forward-validated event.
    assert.equal(report.forwardCheck.signalEvents,0);
  });

  it('exposes unreviewed theme memberships but bars them from early-turn or valid forward event samples',()=>{
    const provisional=CORE_SECTOR_INDICES.find(x=>x.stocks.length>=5 &&
      x.stocks.every(stock=>classifySectorMember(x.id,stock).reviewStatus==='provisional'))!;
    assert.ok(provisional);
    const source=syntheticMarket();
    const valid=Object.values(source.stocks)[0];
    const extra=Object.fromEntries(provisional.stocks.map(stock=>[stock.ticker,
      {...valid,ticker:stock.ticker,symbol:stock.ticker+'.NS'}]));
    const withProvisional={...source,stocks:{...source.stocks,...extra}} as BrowserMarketSnapshot;
    const report=computeRotationRadar(withProvisional);
    const row=report.allThemes.find(x=>x.themeId===provisional.id)!;
    assert.equal(row.membershipReview,'provisional');
    assert.equal(row.phase,'Provisional composition');
    assert.ok(report.provisionalThemes>=1);
    assert.ok(!report.earlyTurns.some(x=>x.themeId===provisional.id));
  });

  it('never converts a thin basket into a high-confidence signal',()=>{
    const market=syntheticMarket();
    const copy={
      ...market,
      stocks:Object.fromEntries(Object.entries(market.stocks).slice(0,2)),
    } as BrowserMarketSnapshot;
    const report=computeRotationRadar(copy);
    assert.equal(report.earlyTurns.length,0);
    assert.equal(report.evaluatedThemes,0);
    assert.ok(report.thinThemes>0);
  });
});
