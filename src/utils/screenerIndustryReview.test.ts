import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildBasicIndustryAudit } from './basicIndustryCoverage';
import { reviewScreenerIndustryExport, screenerReconciliationCsv, approvedScreenerEvidence } from './screenerIndustryReview';

describe('full-universe Screener reconciliation with separately attributed trusted source', () => {
  const audit = buildBasicIndustryAudit(null);

  it('covers all tracked symbols and checks exact NSE symbol, catalog code and existing primary mappings', () => {
    const csv = [
      'NSE Code,Industry,Market Cap',
      'BDL,Aerospace & Defense,48000',
      'DLF,"Residential, Commercial Projects",80000',
      'ASTRAL,Plastic Products - Industrial,90000',
      'CIPLA,Pharmaceuticals,200000',
      'ITC,Paints,300000',
      'BDL,Aerospace & Defense,48000',
      'NOTINBASKET,Pharmaceuticals,1000',
      'UNIONBANK,Public Sector Bank,50000',
    ].join('\r\n');
    const report=reviewScreenerIndustryExport(csv,audit.rows);
    const get=(ticker: string)=>report.rows.find(row=>row.ticker===ticker)!;
    assert.equal(report.rows.length,audit.totalUniverse);
    assert.equal(report.exportDataRows,8);
    assert.equal(report.duplicateExportSymbols,1);
    assert.equal(report.outsideTrackedUniverse,1);
    assert.equal(get('BDL').reviewStatus,'trusted-screener-match');
    assert.equal(get('BDL').primaryStatus,'unmapped');
    assert.equal(get('BDL').verifiedIndustry,null);
    assert.equal(get('DLF').reviewStatus,'local-industry-code-pending');
    assert.equal(get('ASTRAL').reviewStatus,'local-industry-code-pending');
    assert.equal(get('CIPLA').reviewStatus,'already-verified-match');
    assert.equal(get('ITC').reviewStatus,'conflicts-with-primary-source');
    assert.equal(get('ITC').verifiedIndustry,'Diversified FMCG');
    assert.equal(get('UNIONBANK').reviewStatus,'already-verified-match');
    assert.equal(get('JUPITERWAG').reviewStatus,'not-present-in-export');
    const rows=approvedScreenerEvidence(report,'2026-11-10');
    assert.equal(rows.length,1);
    assert.deepEqual(rows[0], {
      ticker:'BDL',basicIndustry:'Aerospace & Defense',industryCode:'IN070201001',
      verifiedOn:'2026-11-10',sourceUrl:'https://www.screener.in/market/IN07/IN0702/IN070201/IN070201001/',
    });
    const output=screenerReconciliationCsv(report);
    assert.ok(output.includes('screenerIndustry,screenerIndustryGroup,screenerIsin,suggestedCatalogCode,reviewStatus'));
    assert.ok(output.includes('conflicts-with-primary-source'));
  });

  it('blocks contradictory duplicate symbols and does not fabricate a missing industry code', () => {
    const csv=[
      'NSE Symbol,Basic Industry',
      'BDL,Aerospace & Defense',
      'BDL,Restaurants',
      'DLF,Nonstandard Category Unknown',
      'ASTRAL,',
    ].join('\n');
    const report=reviewScreenerIndustryExport(csv,audit.rows);
    const get=(ticker: string)=>report.rows.find(row=>row.ticker===ticker)!;
    assert.equal(get('BDL').reviewStatus,'duplicate-export-conflict');
    assert.equal(get('DLF').reviewStatus,'unknown-industry-label');
    assert.equal(get('ASTRAL').reviewStatus,'missing-industry-field');
    assert.equal(approvedScreenerEvidence(report,'2026-11-10').length,0);
  });

  it('requires actual NSE-code columns, disallows company-name guesses and future review dates', () => {
    assert.throws(() =>
      reviewScreenerIndustryExport('Name,Industry\nAerospace And Co,Aerospace & Defense',audit.rows),
      /needs an NSE Code/);
    assert.throws(() =>
      reviewScreenerIndustryExport('NSE Code,Industry\nBDL',audit.rows),
      /Invalid Screener CSV width/);
    const report=reviewScreenerIndustryExport('NSE Code,Industry\nBDL,Aerospace & Defense',audit.rows);
    assert.throws(()=>approvedScreenerEvidence(report,'2099-01-01'),/nonfuture/);
  });

  it('keeps editorial hypotheses out of rankings and includes source-provider information', () => {
    const analytics=readFileSync('src/utils/basicIndustryAnalytics.ts','utf8');
    const screener=readFileSync('src/utils/screenerIndustryReview.ts','utf8');
    const map=readFileSync('src/data/basicIndustryMappings.ts','utf8');
    const cli=readFileSync('scripts/reconcile-screener-industries.ts','utf8');
    assert.ok(!analytics.includes('getEditorialHints('));
    assert.ok(!analytics.includes('reviewScreenerIndustryExport'));
    assert.ok(analytics.includes('VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS'));
    assert.ok(map.includes('TRUSTED_SCREENER_INDUSTRY_ASSIGNMENTS'));
    assert.ok(screener.includes('trusted-screener-match'));
    assert.ok(cli.includes('--authorized-source'));
    assert.equal(buildBasicIndustryAudit(null).rows.find(row=>row.ticker==='BDL')?.status,'unmapped');
  });
});


describe('full Screener CSV schema with detailed Industry and broader Industry Group', () => {
  const audit = buildBasicIndustryAudit(null);

  it('accepts exported NSE Code, ISIN Code, Industry Group and Industry and normalizes spacing only', () => {
    const csv = [
      'Name,NSE Code,ISIN Code,Industry Group,Industry,Market Capitalization',
      'Tejas Networks,TEJASNET,INE010J01012,Telecom -  Equipment & Accessories,Telecom -  Equipment & Accessories,1000',
      'DLF,DLF,INE047A01021,Realty,"Residential, Commercial Projects",90000',
      'ASTRAL,ASTRAL,INE006I01046,Industrial Products,Plastic Products - Industrial,80000',
      'Cochin Shipyard,COCHINSHIP,INE704P01025,Industrial Manufacturing,Ship Building & Allied Services,50000',
    ].join('\n');
    const report = reviewScreenerIndustryExport(csv, audit.rows);
    for (const ticker of ['TEJASNET','DLF','ASTRAL','COCHINSHIP']) {
      const row = report.rows.find(x => x.ticker === ticker)!;
      assert.equal(row.reviewStatus, 'trusted-screener-match', ticker);
      assert.ok(row.suggestedCatalogCode, ticker);
      assert.ok(row.screenerIsin?.startsWith('IN'), ticker);
    }
    assert.equal(report.rows.find(x=>x.ticker==='TEJASNET')?.screenerIndustry, 'Telecom - Equipment & Accessories');
    assert.equal(report.rows.find(x=>x.ticker==='DLF')?.screenerIndustryGroup, 'Realty');
  });

  it('isolates conflicting Industry Group and never approves that secondary row', () => {
    const csv = [
      'NSE Code,Industry Group,Industry',
      'DLF,Pharmaceuticals,"Residential, Commercial Projects"',
    ].join('\n');
    const report = reviewScreenerIndustryExport(csv, audit.rows);
    assert.equal(report.rows.find(r => r.ticker==='DLF')?.reviewStatus, 'industry-group-mismatch');
    assert.deepEqual(approvedScreenerEvidence(report, '2026-11-10'), []);
  });
});
