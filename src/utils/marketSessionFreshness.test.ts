import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { assessObservedSessionCoverage, hasObservedSession, isNseWeekend, latestObservedTradingDate, preferFresherChart } from './marketSessionFreshness';

describe('market-session freshness (Yahoo may respond today with old bars)', () => {
  it('uses actual observed ISO session dates, not fetchedAt or array order', () => {
    assert.equal(latestObservedTradingDate([
      { date: '2026-11-09' }, { date: '2026-11-11' }, { date: '9 Nov' },
    ]), '2026-11-11');
    assert.equal(latestObservedTradingDate([]), null);
  });

  it('rejects the 9-Nov series for an 11-Nov benchmark despite a new network response', () => {
    const stale = [{ date: '2026-11-06' }, { date: '2026-11-09' }];
    assert.equal(hasObservedSession(stale, '2026-11-11'), false);
    assert.equal(hasObservedSession(stale, null), false);
    assert.equal(hasObservedSession([...stale, { date: '2026-11-11' }], '2026-11-11'), true);
  });

  it('selects the mirror when it repairs the missing market session, never when older', () => {
    const old = { source: 'query1', rawHistory: [{ date: '2026-11-09' }] };
    const repaired = { source: 'query2', rawHistory: [{ date: '2026-11-11' }] };
    assert.equal(preferFresherChart(old, repaired), repaired);
    assert.equal(preferFresherChart(repaired, old), repaired);
    assert.equal(preferFresherChart(old, { ...old, source: 'same-date' }), old);
  });
});

describe('NSE/BSE weekend closures and saved-trading-date validation', () => {
  it('uses IST, not the UTC date of GitHub Actions overnight slots', () => {
    assert.equal(isNseWeekend(new Date('2026-11-13T13:00:00Z')), false,
      'Friday 18:30 IST is a normal trading-day refresh');
    assert.equal(isNseWeekend(new Date('2026-11-13T20:30:00Z')), true,
      'Friday UTC 20:30 is Saturday 02:00 IST');
    assert.equal(isNseWeekend(new Date('2026-11-14T22:30:00Z')), true,
      'Saturday UTC 22:30 is Sunday 04:00 IST');
    assert.equal(isNseWeekend(new Date('2026-11-15T20:30:00Z')), false,
      'Sunday UTC 20:30 is Monday 02:00 IST, when Friday close is still valid');
  });

  it('counts verified Friday closes saved yesterday even when Yahoo returns Thursday on Saturday', () => {
    const expected = Array.from({length: 10}, (_, i) => 'STOCK'+i);
    const cachedFriday = {
      fetchedAt: '2026-11-13T14:00:00.000Z',
      rawHistory: [{date:'2026-11-12'}, {date:'2026-11-13'}],
      accepted: true,
    };
    const stocks = Object.fromEntries(expected.map(ticker => [ticker, cachedFriday]));
    // The old HTTP-only quality rule would have reported 0% for this collection.
    const newFetchStart = Date.parse('2026-11-14T02:35:00.000Z');
    assert.equal(expected.filter(t=>Date.parse(stocks[t].fetchedAt)>=newFetchStart).length,0);
    const coverage = assessObservedSessionCoverage(
      expected, stocks, '2026-11-13', stock=>stock.accepted,
    );
    assert.deepEqual(coverage.missingTickers,[]);
    assert.equal(coverage.eligibleTickers.length,10);
    assert.equal(coverage.coverageRatio,1);
  });

  it('does not treat actually missing or invalid latest-session data as valid', () => {
    const expected=['A','B','C','D'];
    const stocks={
      A:{rawHistory:[{date:'2026-11-13'}],accepted:true},
      B:{rawHistory:[{date:'2026-11-12'}],accepted:true},
      C:{rawHistory:[{date:'2026-11-13'}],accepted:false},
      D:{rawHistory:[{date:'2026-11-13'}],accepted:true},
    };
    const result=assessObservedSessionCoverage(expected,stocks,'2026-11-13',x=>x.accepted);
    assert.deepEqual(result.eligibleTickers,['A','D']);
    assert.deepEqual(result.missingTickers,['B','C']);
    assert.equal(result.coverageRatio,0.5);
  });
});
