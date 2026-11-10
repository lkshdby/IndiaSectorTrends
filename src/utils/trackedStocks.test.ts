import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  normalizeTrackedTicker,
  parseTrackedStocks,
  addTrackedStock,
  removeTrackedStock,
  dataFeedRequestUrl,
} from './trackedStocks';

describe('personal tracked-stock watchlist', () => {
  it('normalizes valid NSE tickers and rejects invalid input', () => {
    assert.equal(normalizeTrackedTicker('  m&m.ns  '), 'M&M');
    assert.equal(normalizeTrackedTicker('kpITtech'), 'KPITTECH');
    assert.equal(normalizeTrackedTicker('GE-SHIPPING'), 'GE-SHIPPING');
    assert.equal(normalizeTrackedTicker('../abc'), null);
    assert.equal(normalizeTrackedTicker(''), null);
    assert.equal(normalizeTrackedTicker('A B'), null);
  });

  it('adds a ticker once and preserves the optional company and sector', () => {
    const list = addTrackedStock([], '  LT.NS ', 'Larsen & Toubro', 'capital-goods', '2026-11-10T10:00:00Z');
    assert.deepEqual(list, [{
      ticker: 'LT', name: 'Larsen & Toubro', sectorId: 'capital-goods',
      addedAt: '2026-11-10T10:00:00Z',
    }]);
    assert.strictEqual(addTrackedStock(list, 'lt', 'duplicate'), list);
    assert.equal(removeTrackedStock(list, 'LT').length, 0);
  });

  it('sanitizes stored data, handles duplicates and caps saved records', () => {
    const input = [
      { ticker: 'm&m.ns', name: 'Mahindra', sectorId: 'autos', addedAt: '2026-11-10T09:00:00Z' },
      { ticker: 'M&M', name: 'duplicate' },
      { ticker: '<script>', name: 'invalid' },
      null,
    ];
    assert.deepEqual(parseTrackedStocks(input), [{
      ticker: 'M&M', name: 'Mahindra', sectorId: 'autos', addedAt: '2026-11-10T09:00:00Z',
    }]);
    assert.equal(parseTrackedStocks('not an array').length, 0);
  });

  it('uses a review-request link rather than representing a new ticker as feed-backed', () => {
    const item = addTrackedStock([], 'NEWTICK', 'New Company')[0];
    const url = new URL(dataFeedRequestUrl(item));
    assert.equal(url.hostname, 'github.com');
    assert.equal(url.pathname, '/lkshdby/IndiaSectorTrends/issues/new');
    assert.match(url.searchParams.get('title') || '', /NEWTICK/);
  });

  it('places core analysis above advanced signal details and exposes the personal list', () => {
    const source = readFileSync('src/components/IndexTrackerView.tsx', 'utf8');
    assert.ok(source.includes('<TrackedStocksPanel'));
    assert.ok(source.includes('Track stock'));
    assert.ok(source.includes('Jump to selected sector analysis'));
    assert.ok(source.indexOf('Sector performance summary') < source.indexOf('Main Chart Canvas'));
    assert.ok(source.indexOf('Main Chart Canvas') < source.indexOf('Supporting evidence follows the principal chart'));
    assert.ok(source.includes('<details'));
  });
});
