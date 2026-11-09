import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildAlignedBasketHistory, classifyPriceRotation, tradingDayKey } from './sectorIndexMath';

const basket = [
  { ticker: 'AAA', marketCapCr: 300 },
  { ticker: 'BBB', marketCapCr: 100 },
];

describe('tradingDayKey', () => {
  it('aligns ISO and legacy calendar-day labels', () => {
    assert.equal(tradingDayKey('2026-11-09'), tradingDayKey('9 Nov'));
    assert.equal(tradingDayKey('unknown'), null);
  });
});

describe('buildAlignedBasketHistory', () => {
  it('aligns by trading date and rebases both stocks on the common first date', () => {
    const result = buildAlignedBasketHistory(basket, {
      AAA: { history: [
        { date: '2026-11-05', value: 100 },
        { date: '2026-11-06', value: 110 },
        { date: '2026-11-09', value: 121 },
      ] },
      BBB: { history: [
        { date: '6 Nov', value: 100 },
        { date: '9 Nov', value: 90 },
      ] },
    }, 'equal');
    assert.deepEqual(result.includedTickers, ['AAA', 'BBB']);
    assert.equal(result.dataCoveragePct, 100);
    assert.equal(result.history.length, 2);
    assert.equal(result.history[0].equalWeightValue, 100);
    assert.equal(result.history[1].equalWeightValue, 100);
    assert.equal(result.history[1].mcapWeightValue, 105);
  });

  it('never fabricates prices across missing trading sessions', () => {
    const result = buildAlignedBasketHistory(basket, {
      AAA: { history: [
        { date: '5 Nov', value: 100 }, { date: '6 Nov', value: 101 },
        { date: '9 Nov', value: 102 }, { date: '10 Nov', value: 103 }
      ] },
      BBB: { history: [
        { date: '5 Nov', value: 100 }, { date: '6 Nov', value: 105 },
        { date: '10 Nov', value: 107 }
      ] },
    }, 'equal');
    assert.deepEqual(result.history.map(x => x.date), ['5 Nov','6 Nov','10 Nov']);
  });

  it('returns no historical chart when real histories are unavailable', () => {
    const result = buildAlignedBasketHistory(basket, {}, 'mcap');
    assert.deepEqual(result.history, []);
    assert.equal(result.dataCoveragePct, 0);
  });
});

describe('price-only rotation classification', () => {
  it('separates improving, leading, weakening, lagging', () => {
    assert.equal(classifyPriceRotation(3, 10, 1, 5, 70), 'Leading');
    assert.equal(classifyPriceRotation(4, -2, 1, 3, 60), 'Improving');
    assert.equal(classifyPriceRotation(-2, 8, 1, 2, 40), 'Weakening');
    assert.equal(classifyPriceRotation(-3, -5, 1, 2, 30), 'Lagging');
  });
});
