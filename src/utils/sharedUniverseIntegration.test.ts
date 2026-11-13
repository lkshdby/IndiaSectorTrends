import {describe,it} from 'node:test';
import assert from 'node:assert/strict';
import {suggestSharedIndustryThemeCandidates} from './sharedIndustryThemeCandidates';
import {compareThemeScope} from './themeScopeComparison';
import {THEMATIC_SECTOR_INDICES,classifySectorMember} from '../data/sectorUniverse';
import type {BrowserMarketSnapshot} from './marketSnapshotClient';

describe('shared industry to curated theme candidates',()=>{
  it('reuses verified classification and shared prices but does not auto-enrol the symbol',()=>{
    const theme=THEMATIC_SECTOR_INDICES.find(t=>t.id==='data-centers-ai-cloud')!;
    const core=theme.stocks.find(s=>classifySectorMember(theme.id,s).tier==='core')!;
    const industry='Computers - Hardware & Equipment';
    const mapping=new Map([
      [core.ticker,{ticker:core.ticker,basicIndustry:industry,sourceUrl:'https://nseindia.com/test',verifiedOn:'2026-11-12',sourceType:'nse' as const}],
      ['NEWSYMBOL',{ticker:'NEWSYMBOL',basicIndustry:industry,sourceUrl:'https://nseindia.com/new',verifiedOn:'2026-11-12',sourceType:'nse' as const}],
      ['OTHER',{ticker:'OTHER',basicIndustry:'Private Sector Bank',sourceUrl:'https://nseindia.com/bank',verifiedOn:'2026-11-12',sourceType:'nse' as const}],
    ]);
    const snapshot={stocks:{NEWSYMBOL:{rawHistory:[{date:'2026-11-12',close:100}]}}} as unknown as BrowserMarketSnapshot;
    const candidates=suggestSharedIndustryThemeCandidates(theme.id,mapping,snapshot);
    assert.equal(candidates.length,1);
    assert.equal(candidates[0].ticker,'NEWSYMBOL');
    assert.equal(candidates[0].source,'verified-industry');
    assert.equal(candidates[0].suggestedTier,'adjacent');
    assert.equal(candidates[0].hasSavedPrices,true);
    assert.ok(!theme.stocks.some(s=>s.ticker==='NEWSYMBOL'),'Candidate must not mutate the approved basket');
  });
  it('does not suggest peers if core industry is unverified',()=>{
    const s=suggestSharedIndustryThemeCandidates('data-centers-ai-cloud',new Map(),null);
    assert.deepEqual(s,[]);
  });
  it('keeps browser-private Screener peers distinct from source-verified classifications',()=>{
    const theme=THEMATIC_SECTOR_INDICES.find(t=>t.id==='amc-mutual-funds')!;
    const core=theme.stocks.find(s=>classifySectorMember(theme.id,s).tier==='core')!;
    const mappings=new Map([[core.ticker,{
      ticker:core.ticker,basicIndustry:'Asset Management Company',
      verifiedOn:'2026-11-12',sourceUrl:'https://nseindia.com/amc',sourceType:'nse' as const
    }]]);
    const pool={version:1 as const,extractedAt:'2026-11-12',totalExportRows:1,
      unmatchedIndustryNames:0,companies:[{ticker:'FAKEAMC',name:'Sample AMC',
        isin:'',industry:'Asset Management Company',industryGroup:'Finance',marketCapCr:5000}]};
    const results=suggestSharedIndustryThemeCandidates(theme.id,mappings,null,pool);
    assert.equal(results[0].ticker,'FAKEAMC');
    assert.equal(results[0].source,'local-screener-peer');
    assert.equal(results[0].provenance,null);
    assert.equal(results[0].suggestedTier,'adjacent');
  });
});

describe('pure-play vs ecosystem research preview',()=>{
  it('never imports adjacent returns into the official core scope',()=>{
    const theme=THEMATIC_SECTOR_INDICES.find(t=>t.id==='data-centers-ai-cloud')!;
    const core=theme.stocks.filter(x=>classifySectorMember(theme.id,x).tier==='core');
    const adjacent=theme.stocks.filter(x=>['adjacent','proxy'].includes(classifySectorMember(theme.id,x).tier));
    assert.ok(adjacent.length>0);
    const days=Array.from({length:40},(_,n)=>'2026-10-'+String(n+1).padStart(2,'0'));
    // Synthetic dates are only keys in a fixture; both series share exact keys.
    const bench=days.map((date,n)=>({date,value:100+n/10}));
    const stocks=Object.fromEntries(theme.stocks.map(st=>[st.ticker,{
      ticker:st.ticker,symbol:st.ticker+'.NS',price:150,
      rawHistory:days.map((date,n)=>({date,close:100+n*(core.some(c=>c.ticker===st.ticker)?1:3)})),
      history:days.map((date,n)=>({date,value:100+n})),
    }]));
    const result=compareThemeScope({stocks,benchmarks:{nifty500:{history:bench}}} as unknown as BrowserMarketSnapshot,theme.id)!;
    assert.equal(result.purePlay.total,core.length);
    assert.equal(result.ecosystem.total,core.length+adjacent.length);
    assert.equal(result.purePlay.valid,core.length);
    assert.equal(result.ecosystem.valid,core.length+adjacent.length);
    assert.ok(result.ecosystem.return5!>result.purePlay.return5!);
    assert.equal(result.ecosystem.coveragePct,100);
  });
});
