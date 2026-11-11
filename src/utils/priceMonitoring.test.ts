import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  APPROVAL_MARKER, approveMonitoringSymbols, buildMonitoringIssueBody,
  buildMonitoringIssueUrl, EMPTY_MONITORING, MAX_APPROVAL_BATCH, MAX_MONITORED_TICKERS,
  parseMonitoringIssueBody, parseMonitoringManifest,
} from './priceMonitoring';
import { approveIssueRequest, type MonitoringIssueEvent } from '../../scripts/approve-monitoring-issue';
import { discoverCrossThemeIndustryPeers, type ScreenerResearchPool } from './screenerResearchPool';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import type { BasicIndustryAssignment } from '../data/basicIndustryMappings';

describe('ticker-only owner monitoring',()=>{
  it('serializes ONLY ticker symbols to prefilled GitHub issue, never proprietary company details',()=>{
    const selected=['NEWCO','ANOTHER&CO'];
    const body=buildMonitoringIssueBody(selected);
    assert.ok(body.startsWith(APPROVAL_MARKER));
    assert.deepEqual(parseMonitoringIssueBody(body),selected);
    assert.ok(!body.includes('Screener.in'));
    assert.ok(!body.includes('Industry Group'));
    const url=buildMonitoringIssueUrl(selected);
    assert.ok(url.startsWith('https://github.com/lkshdby/IndiaSectorTrends/issues/new?'));
    const params=new URL(url).searchParams;
    assert.equal(params.get('body'),body);
    assert.ok(params.get('title')!.startsWith('[Monitor NSE] Approve '));
    assert.throws(()=>parseMonitoringIssueBody('hello'),/marker/);
    assert.throws(()=>buildMonitoringIssueBody(['ABC;cat /etc/passwd']),/invalid/i);
  });

  it('limits approval batches and global set, skips already monitored or themed symbols without promotion',()=>{
    const first=approveMonitoringSymbols(EMPTY_MONITORING,['ABC','XYZ']);
    assert.deepEqual(first.after.symbols,['ABC','XYZ']);
    assert.deepEqual(first.added,['ABC','XYZ']);
    const second=approveMonitoringSymbols(first.after,['XYZ','BETA','ETERNAL'],new Set(['ETERNAL']));
    assert.deepEqual(second.added,['BETA']);
    assert.deepEqual(second.skipped,['XYZ','ETERNAL']);
    assert.deepEqual(second.after.symbols,['ABC','BETA','XYZ']);
    assert.throws(()=>approveMonitoringSymbols(EMPTY_MONITORING,Array.from({length:MAX_APPROVAL_BATCH+1},(_,i)=>'T'+i)),/between/);
    assert.throws(()=>approveMonitoringSymbols(EMPTY_MONITORING,['ABC','ABC']),/repeated/);
    assert.throws(()=>parseMonitoringManifest({version:1,symbols:['ABC','ABC']}),/Duplicate/);
    assert.throws(()=>parseMonitoringManifest({version:1,symbols:['ABC.NS']}),/invalid/);
    const full={version:1 as const,symbols:Array.from({length:MAX_MONITORED_TICKERS},(_,i)=>'T'+i)};
    assert.throws(()=>approveMonitoringSymbols(full,['ONE']),/Maximum/);
  });

  it('runs only on new GitHub owner-authored issues, with no code, labels or Screener rows in output',()=>{
    const event:MonitoringIssueEvent={
      action:'opened',sender:{login:'lkshdby'},
      repository:{full_name:'lkshdby/IndiaSectorTrends'},
      issue:{title:'[Monitor NSE] Approve 2 ticker(s) for daily prices',
        user:{login:'lkshdby'},author_association:'OWNER',state:'open',
        body:buildMonitoringIssueBody(['NEWCO','ANOTHERCO'])},
    };
    const approved=approveIssueRequest(event,EMPTY_MONITORING);
    assert.equal(approved.added.length,2);
    assert.deepEqual(approved.after.symbols,['ANOTHERCO','NEWCO']);
    assert.deepEqual(Object.keys(approved.after),['version','symbols']);
    assert.throws(()=>approveIssueRequest({...event,sender:{login:'external'}},EMPTY_MONITORING),/Only new/);
    assert.throws(()=>approveIssueRequest({...event,issue:{...event.issue!,author_association:'NONE'}},EMPTY_MONITORING),/Only new/);
    assert.throws(()=>approveIssueRequest({...event,action:'edited'},EMPTY_MONITORING),/Only new/);
  });
});

describe('full Screener private CSV to cross-theme research suggestions',()=>{
  it('suggests new industry peers globally but does not modify any of the curated theme members',()=>{
    const theme=THEMATIC_SECTOR_INDICES.find(x=>x.stocks.some(y=>y.ticker==='DIVISLAB'))!;
    const before=theme.stocks.map(x=>x.ticker);
    const classification=new Map<string,BasicIndustryAssignment>([
      ['DIVISLAB',{ticker:'DIVISLAB',basicIndustry:'Pharmaceuticals',sourceUrl:'https://www.nseindia.com/get-quotes/equity?symbol=DIVISLAB',verifiedOn:'2026-11-01'}],
    ]);
    const pool:ScreenerResearchPool={version:1,extractedAt:'2026-11-11',totalExportRows:3,unmatchedIndustryNames:0,
      companies:[
        {ticker:'NEWPHARMA',name:'Unverified Pharma',isin:'INE111A01011',
          industry:'Pharmaceuticals',industryGroup:'Pharmaceuticals',marketCapCr:2500},
        {ticker:'DIVISLAB',name:'Already thematic',isin:'INE111A01013',
          industry:'Pharmaceuticals',industryGroup:'Pharmaceuticals',marketCapCr:100000},
        {ticker:'TOOSMALL',name:'Too small',isin:'INE111A01012',
          industry:'Pharmaceuticals',industryGroup:'Pharmaceuticals',marketCapCr:120},
      ]};
    const candidates=discoverCrossThemeIndustryPeers(pool,classification,1000);
    assert.equal(candidates.length,1);
    assert.equal(candidates[0].ticker,'NEWPHARMA');
    assert.ok(candidates[0].associatedThemes.length>=1);
    assert.equal(candidates[0].evidence,'screener-industry-only');
    assert.deepEqual(theme.stocks.map(x=>x.ticker),before);
  });
});
