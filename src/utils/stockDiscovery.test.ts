import {describe,it} from 'node:test';
import assert from 'node:assert/strict';
import {THEMATIC_SECTOR_INDICES} from '../data/sectorUniverse';
import type {BrowserMarketSnapshot} from './marketSnapshotClient';
import {buildThemeMembershipAudit,themeMembershipAuditCsv} from './themeMembershipAudit';
import {computeThemeStockLeadership,sortThemeStockLeaders} from './stockLeadership';
import {parseScreenerResearchPool,selectScreenerIndustryPeers} from './screenerResearchPool';

describe('one-pass 62-theme structural membership audit',()=>{
  const audit=buildThemeMembershipAudit();
  it('covers every theme and every editorial stock entry without price- or winner-based selection',()=>{
    assert.equal(audit.themeCount,62);
    assert.equal(audit.themeEntries,THEMATIC_SECTOR_INDICES.reduce((n,x)=>n+x.stocks.length,0));
    assert.equal(audit.uniqueTickers,new Set(THEMATIC_SECTOR_INDICES.flatMap(s=>s.stocks.map(t=>t.ticker))).size);
    assert.equal(audit.rows.length,audit.themeEntries);
    for(const theme of audit.themes){
      assert.equal(theme.core+theme.adjacent+theme.proxy+theme.excluded,theme.total,theme.themeId);
      assert.equal(theme.explicitlyReviewed+theme.provisional,theme.total,theme.themeId);
      assert.equal(theme.reviewState==='provisional',theme.provisional>0,theme.themeId);
    }
    assert.equal(audit.provisionalThemes,41);
    assert.equal(audit.provisionalCoreEntries,314);
    assert.equal(audit.narrowCoreThemes,9);
    assert.equal(audit.themeCount,audit.themes.length);
    const output=themeMembershipAuditCsv(audit);
    assert.equal(output.trim().split('\n').length,audit.themeEntries+1);
    assert.ok(output.includes('reviewStatus')||output.includes('membershipReview'));
  });
  it('does not pretend provisional members have evidenced business revenue exposures',()=>{
    const p=audit.rows.find(x=>x.membershipReview==='provisional')!;
    assert.ok(p.rationale.includes('Provisional'));
    assert.equal(audit.themes.find(x=>x.themeId===p.themeId)?.reviewState,'provisional');
    const narrow=audit.themes.find(x=>x.themeId==='quick-commerce-consumer-tech')!;
    assert.equal(narrow.core,2);
    assert.equal(narrow.lowSampleCore,true);
  });
});

function fixture():BrowserMarketSnapshot {
  const dates:string[]=[];
  const today=new Date('2026-08-03T12:00:00Z');
  while(dates.length<45) {
    if(today.getUTCDay()!==0&&today.getUTCDay()!==6)dates.push(today.toISOString().slice(0,10));
    today.setUTCDate(today.getUTCDate()+1);
  }
  const mk=(ticker:string,previous:number,recent:number)=>{
    let value=100;
    const rawHistory=dates.map((date,i)=>{
      if(i>0)value*=i<40?previous:recent;
      return {date,close:Number(value.toFixed(5))};
    });
    return {ticker,symbol:ticker+'.NS',rawHistory,price:rawHistory.at(-1)!.close};
  };
  const bench=dates.map((date,i)=>({date,value:Number((100*Math.pow(1.001,i)).toFixed(5))}));
  return {
    source:'GitHub',fetchedAt:'2026-10-02T12:00:00Z',
    stocks:{
      ETERNAL:mk('ETERNAL',0.996,1.014),
      SWIGGY:mk('SWIGGY',1.011,1.015),
      NYKAA:mk('NYKAA',0.999,1.019),
    },
    benchmarks:{
      nifty500:{history:bench},
      nifty50:{history:bench},
      niftyMidcap:{history:bench},
      niftySmallcap:{history:bench},
    }
  } as unknown as BrowserMarketSnapshot;
}

describe('separate momentum leaders from curated thematic stock membership',()=>{
  it('classifies price acceleration from exact NIFTY 500 sessions without changing core/adjacent membership',()=>{
    const snapshot=fixture();
    const before=THEMATIC_SECTOR_INDICES.find(x=>x.id==='quick-commerce-consumer-tech')!.stocks.map(x=>x.ticker);
    const result=computeThemeStockLeadership(snapshot,'quick-commerce-consumer-tech');
    assert.equal(result.benchmarkReady,true);
    assert.equal(result.valid,3);
    const eternal=result.leaders.find(x=>x.ticker==='ETERNAL')!;
    const swiggy=result.leaders.find(x=>x.ticker==='SWIGGY')!;
    const nykaa=result.leaders.find(x=>x.ticker==='NYKAA')!;
    assert.equal(eternal.state,'Emerging');
    assert.equal(eternal.tier,'core');
    assert.equal(swiggy.state,'Established');
    assert.equal(swiggy.tier,'core');
    assert.equal(nykaa.tier,'adjacent');
    assert.equal(nykaa.state,'Emerging');
    assert.ok(eternal.acceleration!>0);
    assert.equal(result.coreValid,2);
    assert.equal(result.adjacentValid,1);
    assert.deepEqual(THEMATIC_SECTOR_INDICES.find(x=>x.id==='quick-commerce-consumer-tech')!.stocks.map(x=>x.ticker),before);
    assert.ok(result.leaders.some(x=>x.state==='Insufficient data'));
  });
  it('sorts unknown-price stocks last without confusing zero with missing values',()=>{
    const data=computeThemeStockLeadership(fixture(),'quick-commerce-consumer-tech');
    const a=sortThemeStockLeaders(data.leaders,'acceleration');
    assert.ok(a[0].acceleration!==null);
    assert.equal(a.at(-1)!.acceleration,null);
    const name=sortThemeStockLeaders(data.leaders,'name');
    assert.equal(name[0].name,[...data.leaders].map(x=>x.name).sort()[0]);
    assert.equal(computeThemeStockLeadership(null,'quick-commerce-consumer-tech').valid,0);
  });
});

describe('private full NSE basic-industry export discovery',()=>{
  const data=[
    'Name,NSE Code,ISIN Code,Industry Group,Industry,Market Capitalization',
    'New Pharma Candidate,NEXTPHARMA,INE000A01001,Pharmaceuticals,Pharmaceuticals,5230',
    'Low Cap Candidate,LOWCAP,INE000A01002,Pharmaceuticals,Pharmaceuticals,210',
    'Outside Industry,NOTINDUSTRY,INE000A01003,Industrials,Aerospace & Defense,9000',
    'Already Member,DIVISLAB,INE000A01004,Pharmaceuticals,Pharmaceuticals,87000',
    'Duplicate,NEXTPHARMA,INE000A01001,Pharmaceuticals,Pharmaceuticals,5230',
    'BSE-only symbol,,INE000A01005,Pharmaceuticals,Pharmaceuticals,4000',
  ].join('\n');
  it('safely parses full export, exact symbols, checked industry labels and duplicates',()=>{
    const pool=parseScreenerResearchPool(data,'2025-01-01');
    assert.equal(pool.totalExportRows,6);
    assert.equal(pool.companies.length,4);
    assert.ok(!pool.companies.some(x=>x.ticker===''));
    assert.equal(pool.companies.find(x=>x.ticker==='NEXTPHARMA')?.marketCapCr,5230);
    assert.throws(()=>parseScreenerResearchPool('Name,Industry\nNoSymbol,Pharmaceuticals','2025-01-01'),/NSE Code/);
  });
  it('presents new industry peers as suggestions but NEVER auto-includes them in theme indices or ranking',()=>{
    const pool=parseScreenerResearchPool(data,'2025-01-01');
    const classifications=new Map([
      ['DIVISLAB',{ticker:'DIVISLAB',basicIndustry:'Pharmaceuticals',sourceUrl:'https://www.nseindia.com/get-quotes/equity?symbol=DIVISLAB',verifiedOn:'2025-01-01'}],
    ]);
    const peers=selectScreenerIndustryPeers(pool,'pharma-api-cdmo',classifications,500);
    assert.equal(peers.length,1);
    assert.equal(peers[0].ticker,'NEXTPHARMA');
    assert.equal(peers[0].evidence,'screener-industry-only');
    assert.ok(peers[0].reason.includes('unverified'));
    assert.ok(!THEMATIC_SECTOR_INDICES.find(x=>x.id==='pharma-api-cdmo')!.stocks.some(x=>x.ticker==='NEXTPHARMA'));
    assert.deepEqual(selectScreenerIndustryPeers(pool,'nonexistent',classifications),[]);
  });
});
