import type { BasicIndustryScore } from './basicIndustryAnalytics';

export type HeatmapSort = 'acceleration' | 'rs' | 'week' | 'month' | 'breadth' | 'name';
export type HeatmapFilter = 'all' | 'rankable' | 'accelerating';

export function industryHeatmapValue(industry: BasicIndustryScore, metric: HeatmapSort): number | null {
  if (metric === 'acceleration') return industry.momentumAcceleration1W;
  if (metric === 'rs') return industry.nifty500Relative1M;
  if (metric === 'week') return industry.price1W;
  if (metric === 'month' || metric === 'name') return industry.price1M;
  return industry.breadth1W;
}

export function sortIndustryHeatmap(
  rows: readonly BasicIndustryScore[],
  metric: HeatmapSort,
  filter: HeatmapFilter,
): BasicIndustryScore[] {
  return rows.filter(row => row.mappedCount > 0 &&
    (filter !== 'rankable' || row.confidence === 'rankable') &&
    (filter !== 'accelerating' || (row.momentumAcceleration1W !== null &&
      row.momentumAcceleration1W > 0 && row.confidence === 'rankable')))
    .sort((a, b) => {
      if (metric === 'name') return a.industry.name.localeCompare(b.industry.name);
      const x = industryHeatmapValue(a, metric);
      const y = industryHeatmapValue(b, metric);
      if (x === null) return y === null ? a.industry.name.localeCompare(b.industry.name) : 1;
      if (y === null) return -1;
      return y - x || a.industry.name.localeCompare(b.industry.name);
    });
}

/** Breadth is a percent of advancers, so center it at 50% for the colors. */
export function industryHeatmapColorSignal(row: BasicIndustryScore, metric: HeatmapSort): number | null {
  const n = industryHeatmapValue(row, metric);
  return n === null ? null : metric === 'breadth' ? n - 50 : n;
}
