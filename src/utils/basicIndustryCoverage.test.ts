import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildBasicIndustryAudit, industryAuditCsv } from './basicIndustryCoverage';
import { reviewIndustryCsv, parseIndustryCsv, reviewCsvReport } from './basicIndustryCsvReview';
import { BASIC_INDUSTRY_BY_CODE, BASIC_INDUSTRY_BY_NAME } from '../data/basicIndustryCatalog';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, validateSourceVerifiedAssignments } from '../data/basicIndustryMappings';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

const COLUMNS = 'Symbol,ISIN,BasicIndustryCode,BasicIndustry,SourceUrl,SourceDate';
const origin = 'https://www.nseindia.com/get-quote/equity';
const csvRow = (
  ticker: string, isin: string, code: string, industry: string,
  source = `${origin}/${ticker}/Verified`, date = '2026-11-09'
) => [ticker,isin,code,industry,source,date].join(',');

describe('verified industry classification coverage and staged licensed CSV import', () => {
  it('preserves verified codes for audited finance, industrial, consumer and energy labels', () => {
    const checks: Array<[string,string]> = [
      ['Non Banking Financial Company (NBFC)','IN050101004'],
      ['Diversified FMCG','IN040107001'], ['Iron & Steel','IN010301004'],
      ['Refineries & Marketing','IN030103001'], ['Paints','IN020201015'],
      ['Auto Components & Equipments','IN020102001'], ['IT Enabled Services','IN080102001'],
    ];
    for (const [name,code] of checks) {
      assert.equal(BASIC_INDUSTRY_BY_NAME.get(name)?.code, code, name);
      assert.equal(BASIC_INDUSTRY_BY_CODE.get(code)?.name, name, code);
    }
    assert.equal(BASIC_INDUSTRY_BY_NAME.get('Zinc')?.code, 'IN010302003');
    assert.deepEqual(validateSourceVerifiedAssignments(), []);
    for (const ticker of ['ITC','TATASTEEL','JSWSTEEL','ASIANPAINT','SBIN','PNB','BANKBARODA','CANBK','MARUTI','BAJFINANCE','HINDALCO']) {
      assert.ok(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.has(ticker), `${ticker}: source-checked row absent`);
    }
  });

  it('reconciles unique thematic symbols and snapshot-only symbols WITHOUT inferring memberships', () => {
    const base = buildBasicIndustryAudit(null);
    assert.ok(base.totalUniverse >= 400);
    assert.ok(base.coveredByVerifiedMapping >= 25);
    assert.equal(base.totalUniverse, base.coveredByVerifiedMapping + base.needingReview);
    assert.equal(base.themeCoverage.length, 62);
    assert.equal(base.rows.find(x => x.ticker === 'ETERNAL')?.status, 'unmapped');
    const mock = {
      fetchedAt: '2026-11-10T10:00:00Z',
      source: 'GitHub',
      stocks: {
        RELIANCE: {}, XUNMAPPED: {}, TCS: {},
      },
      benchmarks: {},
    } as unknown as BrowserMarketSnapshot;
    const snap = buildBasicIndustryAudit(mock);
    assert.ok(snap.totalUniverse >= base.totalUniverse + 1);
    assert.equal(snap.rows.find(x => x.ticker === 'RELIANCE')?.status, 'source-verified');
    assert.equal(snap.rows.find(x => x.ticker === 'XUNMAPPED')?.status, 'unmapped');
    assert.equal(snap.rows.find(x => x.ticker === 'XUNMAPPED')?.inSavedSnapshot, true);
    assert.ok(snap.coveredByVerifiedMapping >= base.coveredByVerifiedMapping);
    const csv = industryAuditCsv(snap.rows);
    assert.ok(csv.includes('ticker,companyName,status,basicIndustry'));
    assert.ok(csv.includes('XUNMAPPED'));
    assert.ok(csv.includes('IN050102001'));
  });

  it('parses quoted CSV, CRLF and escaped double quotes without losing columns', () => {
    const matrix = parseIndustryCsv('\ufeffSymbol,Basic Industry,Note\r\nTCS,"Computers - Software & Consulting","Quoted ""text"", with comma"\r\n');
    assert.equal(matrix.length, 2);
    assert.equal(matrix[1][2], 'Quoted "text", with comma');
    assert.throws(() => parseIndustryCsv('x,"unclosed'), /unclosed/);
  });

  it('stages new mapped rows for human review; it never auto-approves them', () => {
    const valid = new Set(['ITC','UNMAPPED1','UNMAPPED2','WIPRO','TCS']);
    const data = [
      COLUMNS,
      csvRow('UNMAPPED1','INE123A01234','IN020201015','Paints'),
      csvRow('ITC','INE154A01025','IN040107001','Diversified FMCG'),
      csvRow('WIPRO','INE075A01022','IN080101001','Computers - Software & Consulting'),
      csvRow('UNMAPPED2','INE123A01234','IN999999999','Random Unknown'),
    ].join('\n');
    const report = reviewIndustryCsv(data, valid);
    assert.equal(report.rows.length, 4);
    assert.equal(report.rows[0].status, 'ready-for-human-review');
    assert.equal(report.rows[1].status, 'already-verified');
    assert.equal(report.rows[2].status, 'already-verified');
    assert.equal(report.rows[3].status, 'unverified-industry-code');
    assert.equal(report.ready, 1);
    const staged = reviewCsvReport(report);
    assert.ok(staged.includes('ready-for-human-review'));
    assert.ok(!staged.includes('approved-for-publication'));
  });

  it('rejects mismatched classifications, contradictory repeats, invalid ISIN and absent sources', () => {
    const symbols = new Set(['NEWCO','TCS']);
    const csv = [
      COLUMNS,
      csvRow('TCS','INE467B01029','IN020201015','Paints'),
      csvRow('NEWCO','INE555A01012','IN020201015','Non Banking Financial Company (NBFC)'),
      csvRow('BAD ISIN','wrong','IN020201015','Paints'),
      csvRow('NEWCO','INE555A01012','IN020201015','Paints'),
      csvRow('UNKNOWN','INE555A01012','IN020201015','Paints'),
      csvRow('BADSOURCE','INE555A01012','IN020201015','Paints','http://localhost/private'),
    ].join('\n');
    const report = reviewIndustryCsv(csv, symbols);
    assert.equal(report.rows[0].status, 'existing-mapping-conflict');
    assert.equal(report.rows[1].status, 'code-name-mismatch');
    assert.equal(report.rows[2].status, 'invalid-symbol');
    assert.equal(report.rows[3].status, 'duplicate-conflict');
    assert.equal(report.rows[4].status, 'outside-current-universe');
    assert.equal(report.rows[5].status, 'unverified-source');
  });

  it('requires provenance and never promotes CSV rows into the live source automatically', () => {
    assert.throws(() => reviewIndustryCsv('Symbol,ISIN\nABC,INE123A01234', new Set(['ABC'])), /Missing required CSV columns/);
    const cli = readFileSync('scripts/review-basic-industry-import.ts', 'utf8');
    assert.ok(cli.includes('reviewIndustryCsv('));
    assert.ok(!cli.includes('writeFileSync(resolve(\'src/data/basicIndustryMappings.ts\''));
    const view = readFileSync('src/components/IndustryDiscoveryView.tsx', 'utf8');
    assert.ok(view.includes('<IndustryCoveragePanel'));
  });
});
