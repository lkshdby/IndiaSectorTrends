import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { checkPrivateIndustryImport, joinPrivateIndustryAssignments, loadPrivateIndustryEvidence } from './privateIndustryEvidence';
import { buildBasicIndustryAudit } from './basicIndustryCoverage';
import { computeIndustryDiscovery } from './basicIndustryAnalytics';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS } from '../data/basicIndustryMappings';

const source = (code: string) => 'https://www.screener.in/market/' +
  [code.slice(0,4),code.slice(0,6),code.slice(0,8),code].join('/') + '/';

const evidence = {
  source: 'Screener.in authorized user export',
  reviewedOn: '2026-11-10',
  rows: [
    {ticker:'AAVAS',basicIndustry:'Housing Finance Company',industryCode:'IN050101002',sourceUrl:source('IN050101002'),verifiedOn:'2026-11-10'},
    {ticker:'BDL',basicIndustry:'Aerospace & Defense',industryCode:'IN070201001',sourceUrl:source('IN070201001'),verifiedOn:'2026-11-10'},
    {ticker:'CIPLA',basicIndustry:'Pharmaceuticals',industryCode:'IN060101001',sourceUrl:source('IN060101001'),verifiedOn:'2026-11-10'},
  ],
};

describe('private, browser-local Screener industry overlay', () => {
  it('accepts checked sources for thematic stocks but retains primary NSE precedence', () => {
    const report = checkPrivateIndustryImport(evidence);
    assert.deepEqual(report.issues, []);
    assert.equal(report.totalRows, 3);
    assert.equal(report.primarySourceDuplicates, 1);
    assert.equal(report.assignments.size, 2);
    assert.equal(report.assignments.get('AAVAS')?.sourceType, 'screener');
    assert.equal(report.assignments.get('BDL')?.basicIndustry, 'Aerospace & Defense');
    const joined=joinPrivateIndustryAssignments(report.assignments);
    assert.equal(joined.size,VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.size+2);
    assert.equal(joined.get('CIPLA')?.sourceUrl, VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get('CIPLA')?.sourceUrl);
  });

  it('updates industry coverage and ranking denominators without changing public mapping source', () => {
    const trusted=joinPrivateIndustryAssignments(checkPrivateIndustryImport(evidence).assignments);
    const before=buildBasicIndustryAudit(null);
    const after=buildBasicIndustryAudit(null,trusted);
    assert.equal(after.coveredByVerifiedMapping,before.coveredByVerifiedMapping+2);
    assert.equal(after.rows.find(x=>x.ticker==='AAVAS')?.sourceProvider,'Screener.in');
    assert.equal(after.rows.find(x=>x.ticker==='AAVAS')?.industryCode,'IN050101002');
    const ranking=computeIndustryDiscovery(null,trusted);
    assert.ok(ranking.industryRows.find(x=>x.industry.name==='Housing Finance Company')?.mappedCount);
    assert.equal(ranking.verifiedMappingCount,computeIndustryDiscovery(null).verifiedMappingCount+2);
    assert.equal(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.has('AAVAS'),false);
    assert.equal(loadPrivateIndustryEvidence(),null);
  });

  it('rejects mismatched industry codes, other tickers, tampered links, dates and duplicate symbols', () => {
    const changed=(row: Record<string,unknown>) => ({...evidence,rows:[{...evidence.rows[0],...row}]});
    assert.match(checkPrivateIndustryImport(changed({industryCode:'IN999999999'})).issues[0],/code\/name mismatch/);
    assert.match(checkPrivateIndustryImport(changed({ticker:'NOT-IN-THEMES'})).issues[0],/not in the thematic universe/);
    assert.match(checkPrivateIndustryImport(changed({sourceUrl:'https://example.com/fake'})).issues[0],/source URL mismatch/);
    assert.match(checkPrivateIndustryImport(changed({verifiedOn:'2099-01-01'})).issues[0],/date is invalid/);
    assert.match(checkPrivateIndustryImport({...evidence,rows:[evidence.rows[0],evidence.rows[0]]}).issues[0],/duplicate/);
    assert.throws(()=>checkPrivateIndustryImport({source:'Screener.in',rows:[]}),/1–1,000/);
  });
});
