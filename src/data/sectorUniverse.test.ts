import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CORE_SECTOR_INDICES, THEMATIC_SECTOR_INDICES, getSectorOpportunityMembers, getUniverseDiagnostics, classifySectorMember } from './sectorUniverse';

describe('core indices and adjacent opportunity universe', () => {
  it('preserves all 62 themes without duplicate core tickers inside a theme', () => {
    assert.equal(CORE_SECTOR_INDICES.length, 62);
    for (const sector of CORE_SECTOR_INDICES) {
      const tickers = sector.stocks.map(s => s.ticker);
      assert.ok(tickers.length >= 2, `${sector.id}: need at least two core stocks`);
      assert.equal(new Set(tickers).size, tickers.length, sector.id);
    }
  });
  it('excludes a bank from diagnostics and routes finance-service firms out of the AMC index', () => {
    const diagnostics = CORE_SECTOR_INDICES.find(x => x.id === 'diagnostics')!;
    assert.ok(!diagnostics.stocks.some(s => s.ticker === 'SURYODAY'));
    const amc = CORE_SECTOR_INDICES.find(x => x.id === 'amc-mutual-funds')!;
    assert.ok(!amc.stocks.some(s => s.ticker === 'CAMS' || s.ticker === 'KFINTECH'));
    assert.deepEqual(getSectorOpportunityMembers('amc-mutual-funds').map(x => x.stock.ticker), ['CAMS', 'KFINTECH']);
  });
  it('uses TMCV for commercial vehicles without reusing passenger-car prices', () => {
    const commercial = CORE_SECTOR_INDICES.find(x => x.id === 'commercial-vehicles')!;
    assert.ok(commercial.stocks.some(s => s.ticker === 'TMCV'));
    assert.ok(!commercial.stocks.some(s => s.ticker === 'TATAMOTORS'));
    assert.ok(CORE_SECTOR_INDICES.find(x => x.id === 'passenger-cars-ev')!.stocks.some(s => s.ticker === 'TATAMOTORS'));
  });
  it('does not let a thin-traded drone-services stock drive a general sector index', () => {
    assert.equal(getSectorOpportunityMembers('geospatial').find(x => x.stock.ticker === 'DRONE')?.tier, 'adjacent');
    assert.ok(!CORE_SECTOR_INDICES.find(x => x.id === 'geospatial')!.stocks.some(s => s.ticker === 'DRONE'));
  });
  it('preserves permanent owner approvals while retaining truly unreviewed baskets', () => {
    const cement = THEMATIC_SECTOR_INDICES.find(x => x.id === 'cement-products')!;
    assert.ok(cement.stocks.every(stock => classifySectorMember(cement.id,stock).reviewStatus === 'reviewed-theme-fit'),
      'GitHub approval #43 must permanently confirm Cement');
    const pending = THEMATIC_SECTOR_INDICES.find(theme =>
      theme.stocks.some(stock => classifySectorMember(theme.id,stock).reviewStatus === 'provisional'));
    assert.ok(pending, 'At least one theme must remain genuinely provisional');
    assert.ok(pending.stocks.some(stock => classifySectorMember(pending.id,stock).reviewStatus === 'provisional'));
    const totals = getUniverseDiagnostics();
    assert.equal(totals.basketCount, 62);
    assert.ok(totals.provisionalBaskets > 0);
    assert.ok(totals.coreUniqueSymbols > 0 && totals.thematicUniqueSymbols >= totals.coreUniqueSymbols);
  });
});
