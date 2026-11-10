import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { BasicIndustryScore } from './basicIndustryAnalytics';
import { weeklyMomentumAcceleration } from './basicIndustryAnalytics';
import {
  industryHeatmapValue, industryHeatmapColorSignal, sortIndustryHeatmap,
} from './industryHeatmap';

function row(name: string, acceleration: number | null, week: number | null,
  month: number | null, relative: number | null, breadth: number | null,
  confidence: BasicIndustryScore['confidence'] = 'rankable'): BasicIndustryScore {
  return {
    industry: { name }, momentumAcceleration1W: acceleration, price1W: week,
    price1M: month, nifty500Relative1M: relative, breadth1W: breadth,
    mappedCount: 6, pricedCount: 6, confidence,
  } as unknown as BasicIndustryScore;
}

describe('momentum-sorted basic-industry heatmap', () => {
  it('measures recent five-session speed against disjoint preceding sixteen sessions', () => {
    assert.equal(weeklyMomentumAcceleration(5, 5), 5);
    assert.equal(weeklyMomentumAcceleration(0, 0), 0);
    assert.ok(weeklyMomentumAcceleration(4, 8)! > 0);
    assert.ok(weeklyMomentumAcceleration(-2, 8)! < 0);
    assert.equal(weeklyMomentumAcceleration(null, 5), null);
    assert.equal(weeklyMomentumAcceleration(5, null), null);
    assert.equal(weeklyMomentumAcceleration(-100, 5), null);
    assert.equal(weeklyMomentumAcceleration(5, NaN), null);
  });

  it('sorts by acceleration rather than month return and always puts missing evidence last', () => {
    const a=row('Fast last week', 6, 6, 9, 2, 70);
    const b=row('Strong month slowing', -2, -2, 20, 10, 50);
    const c=row('No history', null, null, null, null, null, 'insufficient-data');
    const d=row('Quiet acceleration', 1, 2, 3, 1, 65);
    assert.deepEqual(sortIndustryHeatmap([c,b,d,a],'acceleration','all').map(x=>x.industry.name),
      ['Fast last week','Quiet acceleration','Strong month slowing','No history']);
    assert.deepEqual(sortIndustryHeatmap([c,b,d,a],'month','all').map(x=>x.industry.name),
      ['Strong month slowing','Fast last week','Quiet acceleration','No history']);
    assert.deepEqual(sortIndustryHeatmap([c,b,d,a],'rs','all').map(x=>x.industry.name),
      ['Strong month slowing','Fast last week','Quiet acceleration','No history']);
    assert.deepEqual(sortIndustryHeatmap([c,b,d,a],'breadth','all').map(x=>x.industry.name),
      ['Fast last week','Quiet acceleration','Strong month slowing','No history']);
  });

  it('uses 50% as neutral breadth, and can filter for accelerating sample-eligible industries', () => {
    const rising=row('Rising breadth', 2, 2, 5, 2, 70);
    const narrow=row('Narrow rally', 8, 8, 11, 9, 20, 'limited-sample');
    const falling=row('Deceleration', -3, -2, 1, -4, 30);
    assert.equal(industryHeatmapColorSignal(rising,'breadth'),20);
    assert.equal(industryHeatmapColorSignal(falling,'breadth'),-20);
    assert.equal(industryHeatmapValue(rising,'acceleration'),2);
    assert.deepEqual(sortIndustryHeatmap([narrow,falling,rising],'acceleration','accelerating')
      .map(x=>x.industry.name),['Rising breadth']);
    assert.deepEqual(sortIndustryHeatmap([narrow,falling,rising],'name','rankable')
      .map(x=>x.industry.name),['Deceleration','Rising breadth']);
  });
});
