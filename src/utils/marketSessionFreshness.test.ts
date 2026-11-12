import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { hasObservedSession, latestObservedTradingDate, preferFresherChart } from './marketSessionFreshness';

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
