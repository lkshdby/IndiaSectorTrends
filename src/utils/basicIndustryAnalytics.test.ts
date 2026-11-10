import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  BASIC_INDUSTRIES, BASIC_INDUSTRY_BY_NAME,
  CANDIDATE_BASIC_INDUSTRY_NAMES, NSE_PUBLISHED_BASIC_INDUSTRY_COUNT,
} from '../data/basicIndustryCatalog';
import {
  VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, validateSourceVerifiedAssignments,
} from '../data/basicIndustryMappings';
import { alignedRelativeReturn, computeIndustryDiscovery, describeConfidence } from './basicIndustryAnalytics';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

function makeSyntheticSnapshot(): BrowserMarketSnapshot {
  const series: { date: string; close: number }[] = [];
  const bmHistory: { date: string; value: number }[] = [];
  for (let n = 0; n < 90 && series.length < 64; n++) {
    const day = new Date(Date.UTC(2026, 7, 3 + n));
    if (day.getUTCDay() === 0 || day.getUTCDay() === 6) continue;
    const date = day.toISOString().slice(0, 10);
    const i = series.length;
    series.push({ date, close: 100 + i * 0.4 });
    bmHistory.push({ date, value: 100 + i * 0.1 });
  }
  const stocks: Record<string, unknown> = {};
  for (const [ticker] of VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS) {
    stocks[ticker] = {
      ticker, symbol: ticker + '.NS', price: series[series.length - 1].close,
      change1D: 0, change1W: 0, change3M: 0, rawHistory: series,
      history: series.map(s => ({ date: s.date, value: s.close })),
    };
  }
  return {
    stocks: stocks as BrowserMarketSnapshot['stocks'],
    benchmarks: {
      nifty500: {
        key: 'nifty500', symbol: '^CRSLDX', name: 'NIFTY 500', category: 'Benchmark',
        price: bmHistory[bmHistory.length - 1].value, change1D: 0,
        change1W: 0, change3M: 0, history: bmHistory,
      },
    },
    source: 'GitHub',
    fetchedAt: '2026-11-10T10:33:36Z',
  };
}

describe('NSE basic-industry discovery: strict provenance and honest coverage', () => {
  it('preserves provided candidate labels without inventing the missing NSE codes', () => {
    assert.ok(CANDIDATE_BASIC_INDUSTRY_NAMES.length >= 170);
    assert.ok(CANDIDATE_BASIC_INDUSTRY_NAMES.length <= NSE_PUBLISHED_BASIC_INDUSTRY_COUNT);
    assert.equal(new Set(CANDIDATE_BASIC_INDUSTRY_NAMES).size, BASIC_INDUSTRIES.length);
    assert.equal(BASIC_INDUSTRY_BY_NAME.get('Hospital')?.code, 'IN060103001');
    assert.equal(BASIC_INDUSTRY_BY_NAME.get('Private Sector Bank')?.code, 'IN050102002');
    assert.equal(BASIC_INDUSTRY_BY_NAME.get('Computers - Software & Consulting')?.code, 'IN080101001');
    const pending = BASIC_INDUSTRIES.filter(row => !row.code);
    assert.ok(pending.length > 0, 'Unverified rows must remain transparently pending');
    for (const row of pending) {
      assert.equal(row.verification, 'candidate-label');
      assert.equal(row.macro, null);
    }
  });

  it('requires source-backed company membership, not a thematic guess', () => {
    assert.deepEqual(validateSourceVerifiedAssignments(), []);
    assert.equal(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get('TCS')?.basicIndustry, 'Computers - Software & Consulting');
    assert.equal(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get('HDFCBANK')?.basicIndustry, 'Private Sector Bank');
    assert.equal(VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS.get('ETERNAL'), undefined);
  });

  it('builds rankable multi-stock software group but warns on limited bank cohort', () => {
    const summary = computeIndustryDiscovery(makeSyntheticSnapshot());
    const software = summary.industryRows.find(x => x.industry.code === 'IN080101001')!;
    const banks = summary.industryRows.find(x => x.industry.code === 'IN050102002')!;
    assert.ok(software.pricedCount >= 5, `software stocks: ${software.pricedTickers.join(',')}`);
    assert.equal(software.confidence, 'rankable');
    assert.ok(software.price1M !== null && software.price1M > 0);
    assert.ok(software.nifty500Relative1M !== null && software.nifty500Relative1M > 0);
    assert.equal(software.breadth1W, 100);
    assert.ok(banks.pricedCount > 0 && banks.pricedCount <= 4);
    assert.equal(banks.confidence, 'limited-sample');
    assert.ok(summary.unclassifiedTickers > 300, 'do not imply universe-wide completeness');
    const unmapped = summary.industryRows.find(x => x.industry.name === 'Zinc')!;
    assert.equal(unmapped.confidence, 'unmapped');
    assert.equal(unmapped.price1M, null);
  });

  it('does not compare mismatched benchmark session dates', () => {
    const sector = [
      { date: '2026-10-30', value: 100 },
      { date: '2026-11-02', value: 103 },
      { date: '2026-11-03', value: 105 },
    ];
    const matching = [
      { date: '2026-10-30', value: 100 },
      { date: '2026-11-02', value: 101 },
      { date: '2026-11-03', value: 102 },
    ];
    assert.equal(alignedRelativeReturn(sector, matching, 2), 3);
    const mismatched = [
      { date: '2026-10-29', value: 100 },
      { date: '2026-11-02', value: 101 },
      { date: '2026-11-03', value: 102 },
    ];
    assert.equal(alignedRelativeReturn(sector, mismatched, 2), null);
  });

  it('does not fabricate rankings without a market-data snapshot', () => {
    const summary = computeIndustryDiscovery(null);
    assert.equal(summary.eligibleCount, 0);
    assert.equal(summary.snapshotFetchedAt, null);
    assert.ok(summary.industryRows.every(row => row.price1M === null));
    assert.equal(describeConfidence(1, 1, 100, 100), 'single-stock');
    assert.equal(describeConfidence(10, 8, 80, 75), 'limited-sample');
    assert.equal(describeConfidence(10, 9, 90, 30), 'rankable');
  });

  it('keeps all 62 thematic baskets intact and makes industry discovery a parallel workspace', () => {
    const app = readFileSync('src/App.tsx', 'utf8');
    assert.ok(app.includes('IndustryDiscoveryView'));
    assert.ok(app.includes('IndexTrackerView'));
    assert.ok(app.includes("workspace === 'themes'"));
    const sector = readFileSync('src/data/sectorUniverse.ts', 'utf8');
    assert.ok(sector.includes('THEMATIC_SECTOR_INDICES'));
    const scheduled = readFileSync('.github/workflows/market-snapshot-refresh.yml', 'utf8');
    assert.equal([...scheduled.matchAll(/cron:\s*'([^']+)'/g)].length, 3);
  });
});
