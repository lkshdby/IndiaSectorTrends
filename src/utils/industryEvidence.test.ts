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
    const y=validateIndustryResponse('TESTUNKNOWN',{
      info:{symbol:'TESTUNKNOWN'},industryInfo:{basicIndustry:'New Industry Not in our Catalog'},
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


describe('second source-reviewed NSE quote batch, 2026-11-10', () => {
  const expected: Record<string, string> = {
    'HDFCAMC': 'Asset Management Company',
    'ABSLAMC': 'Asset Management Company',
    'UTIAMC': 'Asset Management Company',
    'NAM-INDIA': 'Asset Management Company',
    'DEVYANI': 'Restaurants',
    'INDHOTEL': 'Hotels & Resorts',
    'CHALET': 'Hotels & Resorts',
    'LEMONTREE': 'Hotels & Resorts',
    'CIPLA': 'Pharmaceuticals',
    'LUPIN': 'Pharmaceuticals',
    'AUROPHARMA': 'Pharmaceuticals',
    'INDIANB': 'Public Sector Bank',
    'KARURVYSYA': 'Private Sector Bank',
    'BANKINDIA': 'Public Sector Bank',
    'INDUSINDBK': 'Private Sector Bank',
    'MAHABANK': 'Public Sector Bank',
    'KPITTECH': 'Computers - Software & Consulting',
    'BSOFT': 'Computers - Software & Consulting',
    'HAPPSTMNDS': 'Computers - Software & Consulting',
    'CYIENTDLM': 'Aerospace & Defense',
    'MPHASIS': 'Computers - Software & Consulting',
    'AMBUJACEM': 'Cement & Cement Products',
    'JKCEMENT': 'Cement & Cement Products',
    '360ONE': 'Stockbroking & Allied',
    'CRISIL': 'Other Financial Services',
    '5PAISA': 'Stockbroking & Allied',
    'ANANDRATHI': 'Financial Products Distributor',
    'ANGELONE': 'Stockbroking & Allied',
    'BSE': 'Exchange and Data Platform',
    'ABB': 'Heavy Electrical Equipment',
    'HAVELLS': 'Consumer Electronics',
    'APOLLOTYRE': 'Tyres & Rubber Products',
    'BHEL': 'Heavy Electrical Equipment',
    'CGPOWER': 'Heavy Electrical Equipment',
  };

  it('pins source-verified assignments, symbols and review dates', () => {
    assert.equal(Object.keys(expected).length, 34);
    assert.deepEqual(validateSourceVerifiedAssignments(), []);
    for (const [ticker, basicIndustry] of Object.entries(expected)) {
      const row = VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get(ticker);
      assert.ok(row, ticker + ': no company evidence');
      assert.equal(row.basicIndustry, basicIndustry, ticker);
      assert.equal(row.verifiedOn, '2026-11-10', ticker);
      assert.equal(new URL(row.sourceUrl).hostname, 'www.nseindia.com');
      assert.ok(row.sourceUrl.includes(ticker), ticker + ': NSE quote symbol missing');
    }
  });

  it('never converts editorial suggestions into classification status', () => {
    const audit = buildBasicIndustryAudit(null);
    const universe = new Map(audit.rows.map(row => [row.ticker, row]));
    for (const [ticker, industry] of Object.entries(expected)) {
      const row = universe.get(ticker);
      if (!row) continue; // Separately verified record outside the bundled themes.
      assert.equal(row.status, 'source-verified', ticker);
      assert.equal(row.industry, industry, ticker);
      assert.ok(row.industryCode, ticker);
      assert.equal(row.suggestedIndustry, null, ticker);
    }
  });
});


describe('third primary NSE quote evidence batch, 2026-11-10', () => {
  const pinned: Record<string, string> = {
    'HATSUN': 'Dairy Products',
    'PARAGMILK': 'Dairy Products',
    'KALYANKJIL': 'Gems, Jewellery And Watches',
    'SKYGOLD': 'Gems, Jewellery And Watches',
    'SENCO': 'Gems, Jewellery And Watches',
    'UNITDSPR': 'Breweries & Distilleries',
    'UBL': 'Breweries & Distilleries',
    'INDIGO': 'Airline',
    'TATAPOWER': 'Integrated Power Utilities',
    'JSWENERGY': 'Power Generation',
    'NHPC': 'Power Generation',
    'SJVN': 'Power Generation',
    'POLYCAB': 'Cables - Electricals',
    'RRKABEL': 'Cables - Electricals',
    'FINCABLES': 'Cables - Electricals',
    'GRSE': 'Aerospace & Defense',
    'TITAGARH': 'Railway Wagons',
    'NESTLEIND': 'Packaged Foods',
    'DABUR': 'Personal Care',
    'GODREJCP': 'Personal Care',
    'DRREDDY': 'Pharmaceuticals',
    'HDFCLIFE': 'Life Insurance',
    'ICICIGI': 'General Insurance',
    'BATAINDIA': 'Footwear',
    'METROBRAND': 'Footwear',
    'RBLBANK': 'Private Sector Bank',
    'MCX': 'Exchange and Data Platform',
    'UNIONBANK': 'Public Sector Bank',
  };
  it('checks precise symbol, checked industry code and NSE source for all new records', () => {
    assert.equal(Object.keys(pinned).length, 28);
    assert.deepEqual(validateSourceVerifiedAssignments(), []);
    for (const [ticker, industry] of Object.entries(pinned)) {
      const record=VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get(ticker);
      assert.ok(record, ticker + ' source missing');
      assert.equal(record.basicIndustry, industry, ticker);
      assert.equal(record.verifiedOn, '2026-11-10', ticker);
      const url=new URL(record.sourceUrl);
      assert.equal(url.hostname, 'www.nseindia.com', ticker);
      assert.ok(url.pathname.startsWith('/get-quote/equity/' + ticker + '/') ||
        (url.pathname==='/get-quotes/equity' && url.searchParams.get('symbol')===ticker), ticker);
      const audit=buildBasicIndustryAudit(null).rows.find(row=>row.ticker===ticker);
      if (audit) {
        assert.equal(audit.status, 'source-verified', ticker);
        assert.equal(audit.industry, industry, ticker);
        assert.ok(audit.industryCode, ticker);
        assert.equal(audit.suggestedIndustry, null, ticker);
      }
    }
  });
  it('does not include NSE label-only records when their taxonomy codes are not checked', () => {
    for (const ticker of ['DLF','GODREJPROP','ASTRAL','COCHINSHIP','IRFC']) {
      assert.equal(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.has(ticker),false,ticker);
    }
  });
  it('does not equate the stale JUPITERWAG ticker with NSE JWL without a corporate-action audit', () => {
    assert.equal(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.has('JUPITERWAG'),false);
  });
});
