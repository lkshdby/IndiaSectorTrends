import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateAndRepairStock, sanitizeSnapshot, observedHorizonReturn } from './priceQuality';

describe('market-data sanity checks', () => {
  it('repairs DRONE-style provider quote/close discrepancies', () => {
    const result = validateAndRepairStock({
      ticker: 'DRONE', symbol: 'DRONE.NS', price: 347,
      change1D: 954.71, change1W: 989.48,
      rawHistory: [
        { date: '2026-11-03', close: 31.5 },
        { date: '2026-11-04', close: 31.75 },
        { date: '2026-11-05', close: 32.9 },
        { date: '2026-11-06', close: 32.8 },
      ],
    });
    assert.ok(result.record);
    assert.equal(result.record?.price, 32.8);
    assert.equal(result.record?.change1D, -0.3);
    assert.notEqual(result.record?.change1W, 989.48);
    assert.equal(result.record?.dataQuality, 'insufficient-history');
    assert.ok(result.warnings.some(x => x.includes('Provider quote')));
  });

  it('quarantines an unverified one-day >40% historical discontinuity', () => {
    const result = validateAndRepairStock({
      ticker: 'AAA', symbol: 'AAA.NS', price: 500,
      rawHistory: [
        { date: '2026-11-06', close: 50 }, { date: '2026-11-09', close: 500 },
      ],
    });
    assert.equal(result.record, null);
  });

  it('rejects LTIM cached as LTTS (different company)', () => {
    const result = validateAndRepairStock({
      ticker: 'LTIM', symbol: 'LTTS.NS', price: 4000,
      rawHistory: [
        { date: '2026-11-06', close: 3990 }, { date: '2026-11-09', close: 4000 },
      ],
    });
    assert.equal(result.record, null);
    assert.ok(result.warnings[0].includes('Symbol mismatch'));
  });

  it('does not invent a one-month return from a short history', () => {
    const x = validateAndRepairStock({
      ticker: 'NEWIPO', symbol: 'NEWIPO.NS', price: 102,
      rawHistory: [{ date: '2026-11-06', close: 100 }, { date: '2026-11-09', close: 102 }],
    });
    assert.equal(observedHorizonReturn(x.record, 21), undefined);
    assert.equal(x.record?.change3M, undefined);
  });

  it('preserves only coherent records when sanitizing a mixed snapshot', () => {
    const result = sanitizeSnapshot({
      LTIM: { ticker: 'LTIM', symbol: 'LTTS.NS', price: 42, rawHistory: [{ date: '2026-11-06', close: 40 }, { date: '2026-11-09', close: 42 }] },
      DRONE: { ticker: 'DRONE', symbol: 'DRONE.NS', price: 347, rawHistory: [{ date: '2026-11-06', close: 32.8 }, { date: '2026-11-09', close: 32.2 }] },
    });
    assert.ok(result.DRONE);
    assert.equal(result.DRONE.price, 32.2);
    assert.equal(result.LTIM, undefined);
  });
});
