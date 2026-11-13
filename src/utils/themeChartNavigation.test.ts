import {describe,it} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CORE_SECTOR_INDICES,THEMATIC_SECTOR_INDICES} from '../data/sectorUniverse';

describe('Radar to same-theme investment chart navigation',()=>{
  it('all Radar theme ids resolve to a prebuilt Investment Themes chart',()=>{
    const targetIds=new Set(CORE_SECTOR_INDICES.map(x=>x.id));
    assert.equal(THEMATIC_SECTOR_INDICES.length,CORE_SECTOR_INDICES.length);
    for(const theme of THEMATIC_SECTOR_INDICES){
      assert.ok(targetIds.has(theme.id),theme.id+' lacks a matching chart');
    }
  });
  it('passes the active Radar theme, rather than opening the generic themes tab',()=>{
    const radar=readFileSync('src/components/RotationRadarView.tsx','utf8');
    const app=readFileSync('src/App.tsx','utf8');
    assert.ok(radar.includes('onOpenThemes(active.themeId)'));
    assert.ok(app.includes('onOpenThemes={openThemeChart}'));
    assert.ok(app.includes('themeChartRequest={themeChartRequest}'));
  });
  it('reselects prebuilt theme chart even from stock and custom-index views',()=>{
    const tracker=readFileSync('src/components/IndexTrackerView.tsx','utf8');
    assert.ok(tracker.includes("setActiveTab('prebuilt')"));
    assert.ok(tracker.includes('setSelectedSectorId(id)'));
    assert.ok(tracker.includes('setSelectedStockTicker(null)'));
    assert.ok(tracker.includes("setSelectedCategory('All')"));
    assert.ok(tracker.includes("setSearchQuery('')"));
    assert.ok(tracker.includes("setViewProofMode('overlay')"));
    assert.ok(tracker.includes('themeChartRef.current?.scrollIntoView'));
    assert.ok(tracker.includes('pendingChartScroll.current = themeChartRequest.sequence'));
  });
});
