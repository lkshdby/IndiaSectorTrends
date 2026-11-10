import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateIndustryResponse } from '../../scripts/annotate-nse-industries';
import { getEditorialHints, DIRECT_THEME_CANDIDATES } from './industryClassificationHints';
import { buildBasicIndustryAudit } from './basicIndustryCoverage';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, validateSourceVerifiedAssignments } from '../data/basicIndustryMappings';

describe('source-audited automatic NSE industry annotation', () => {
  const seenAt = '2026-11-10T15:00:00.000Z';
  const direct = (ticker: string, basicIndustry: string, isin = 'INE040A01034') => ({
    info: { symbol: ticker, isin },
    industryInfo: { basicIndustry },
  });

  it('accepts an NSE quote only with exact ticker, category and verified code', () => {
    const row=validateIndustryResponse('INFY',direct('INFY','Computers - Software & Consulting'),seenAt)!;
    assert.ok(row);
    assert.equal(row.industryCode,'IN080101001');
    assert.equal(row.status,'nse-direct-code-confirmed');
    assert.equal(row.sourceUrl,'https://www.nseindia.com/api/quote-equity?symbol=INFY');
    assert.equal(validateIndustryResponse('INFY',direct('TCS','Computers - Software & Consulting'),seenAt),null);
    assert.equal(validateIndustryResponse('INFY',{ info: { symbol: 'INFY' }},seenAt),null);
    assert.equal(validateIndustryResponse('INFY',direct('INFY','Hospital','bad-isin'),seenAt),null);
  });

  it('keeps conflicts for review and never silently overwrites source-verified stocks', () => {
    const conflict=validateIndustryResponse('HDFCBANK',direct('HDFCBANK','Hospital'),seenAt)!;
    assert.equal(conflict.status,'conflicting-prior-classification');
    assert.equal(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get('HDFCBANK')?.basicIndustry,'Private Sector Bank');
  });

  it('accepts alternate NSE secInfo response while flagging missing industry codes', () => {
    const x=validateIndustryResponse('EICHERMOT',{
      metaData:{symbol:'EICHERMOT',isinCode:'INE066A01021'},
      secInfo:{basicIndustry:'2/3 Wheelers'},
    },seenAt)!;
    assert.equal(x.status,'nse-direct-code-confirmed');
    const y=validateIndustryResponse('EICHERMOT',{
      info:{symbol:'EICHERMOT'},industryInfo:{basicIndustry:'New Industry Not in our Catalog'},
    },seenAt)!;
    assert.equal(y.status,'nse-direct-code-pending');
    assert.equal(y.industryCode,null);
  });

  it('generates editorial hints without ever promoting those hints into industry rankings', () => {
    const hints = getEditorialHints();
    assert.ok(hints.size >= 400);
    const suggestion = hints.get('EICHERMOT');
    assert.ok(suggestion);
    assert.ok(Object.keys(DIRECT_THEME_CANDIDATES).length >= 20);
    assert.equal(suggestion?.status,'ambiguous-themes');
    assert.equal(suggestion?.suggestedIndustry,null);
    const audit = buildBasicIndustryAudit(null);
    assert.equal(audit.rows.length>=400,true);
    for (const row of audit.rows) {
      if (row.suggestedIndustry && !VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.has(row.ticker)) {
        assert.equal(row.status,'unmapped');
        assert.equal(row.industry,null);
      }
    }
  });

  it('keeps NSE evidence separate from untrusted theme suggestions', () => {
    assert.deepEqual(validateSourceVerifiedAssignments(), []);
    const src=readFileSync('src/utils/basicIndustryAnalytics.ts','utf8');
    assert.ok(src.includes('VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS'));
    assert.ok(!src.includes('getEditorialHints('));
    const pipeline=readFileSync('scripts/annotate-nse-industries.ts','utf8');
    assert.ok(pipeline.includes('accessDenials >= 2'));
    assert.ok(pipeline.includes('validateIndustryResponse'));
  });
});
