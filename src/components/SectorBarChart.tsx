import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  ExternalLink,
  Search,
  Table as TableIcon,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react';
import { MetricKey, SectorComparisonItem, TimeResolution } from '../types';
import { METRIC_DEFINITIONS } from '../utils/metrics';

interface SectorBarChartProps {
  items: SectorComparisonItem[];
  selectedMetric: MetricKey;
  resolution: TimeResolution;
  selectedDate: string;
  previousDate: string | null;
  onSelectSector: (sectorName: string) => void;
  sortBy: 'value-desc' | 'value-asc' | 'change-desc' | 'change-asc' | 'alphabetical';
}

export const SectorBarChart: React.FC<SectorBarChartProps> = ({
  items,
  selectedMetric,
  resolution,
  selectedDate,
  previousDate,
  onSelectSector,
  sortBy,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState<'30' | '60' | '100' | 'all'>('all');
  const metricDef = METRIC_DEFINITIONS[selectedMetric];

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => item.sector.toLowerCase().includes(q));
  }, [items, searchQuery]);

  // Sort items according to user preference
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    return list.sort((a, b) => {
      if (sortBy === 'value-desc') return b.currentValue - a.currentValue;
      if (sortBy === 'value-asc') return a.currentValue - b.currentValue;
      if (sortBy === 'change-desc') return b.changePercent - a.changePercent;
      if (sortBy === 'change-asc') return a.changePercent - b.changePercent;
      if (sortBy === 'alphabetical') return a.sector.localeCompare(b.sector);
      return 0;
    });
  }, [filteredItems, sortBy]);

  // Display items based on slice limit
  const visibleItems = useMemo(() => {
    if (displayCount === 'all') return sortedItems;
    const limit = parseInt(displayCount, 10);
    return sortedItems.slice(0, limit);
  }, [sortedItems, displayCount]);

  // Calculate min, max, average across the full dataset
  const values = items.map((i) => i.currentValue);
  const avgValue = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  // Format resolution comparison label
  const resolutionLabels: Record<TimeResolution, string> = {
    daily: 'Day-on-Day (1 Day)',
    weekly: 'Week-on-Week (1 Wk)',
    monthly: 'Month-on-Month (1 Mo)',
  };

  // Recharts custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: SectorComparisonItem = payload[0].payload;
      const isPositiveChange = data.changeValue >= 0;

      return (
        <div className="bg-[#08090a] text-white p-4 rounded-[16px] shadow-xl border border-[#b1ada1]/30 text-xs min-w-[260px] z-50">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="font-extrabold text-sm text-[#f4f3ee] font-display">{data.sector}</span>
            <span className="text-[10px] text-[#f4f3ee]/60 font-mono font-bold">
              {data.allMetrics.noOfCompanies} companies
            </span>
          </div>

          <div className="space-y-1.5 mb-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[#f4f3ee]/70">{metricDef.label}:</span>
              <span className="font-extrabold text-[#f4f3ee] text-sm font-display">
                {metricDef.format(data.currentValue)}
              </span>
            </div>

            {data.previousValue !== null && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#f4f3ee]/70">Change ({resolutionLabels[resolution]}):</span>
                <span
                  className={`font-bold flex items-center gap-0.5 ${
                    isPositiveChange ? 'text-[#10b981]' : 'text-[#A2AB73]'
                  }`}
                >
                  {isPositiveChange ? (
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
                  )}
                  {metricDef.formatDelta(data.changeValue, data.changePercent)}
                </span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-[#f4f3ee]/80 font-medium">
            <div>
              <span className="text-[#f4f3ee]/50">P/E: </span>
              <span className="font-bold">{data.allMetrics.medianPE}x</span>
            </div>
            <div>
              <span className="text-[#f4f3ee]/50">1Y Return: </span>
              <span
                className={`font-bold ${
                  data.allMetrics.median1YReturn >= 0 ? 'text-[#10b981]' : 'text-[#A2AB73]'
                }`}
              >
                {data.allMetrics.median1YReturn >= 0 ? '+' : ''}
                {data.allMetrics.median1YReturn}%
              </span>
            </div>
            <div>
              <span className="text-[#f4f3ee]/50">ROCE: </span>
              <span className="font-bold">{data.allMetrics.wtdAvgROCE}%</span>
            </div>
            <div>
              <span className="text-[#f4f3ee]/50">OPM: </span>
              <span className="font-bold">{data.allMetrics.wtdAvgOPM}%</span>
            </div>
          </div>

          <div className="mt-2.5 text-[10px] text-[#f4f3ee]/60 text-center bg-white/5 py-1 rounded-lg">
            Click bar to open multi-year historical trend chart
          </div>
        </div>
      );
    }
    return null;
  };

  // Dynamic height for the horizontal bar chart
  const calculatedHeight = Math.max(500, visibleItems.length * 28 + 80);

  return (
    <div className="w-full bg-white border border-[#b1ada1]/30 rounded-[18px] shadow-xs overflow-hidden">
      {/* Chart Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#b1ada1]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 bg-[#f4f3ee]/60">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-extrabold text-[#08090a] font-display">
              Sector Comparison: {metricDef.label}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] font-bold font-display">
              {items.length} Industry Sectors
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-[#b1ada1]/30 text-[#08090a]/70 font-semibold">
              {resolutionLabels[resolution]}
            </span>
          </div>
          <p className="text-xs text-[#08090a]/60 mt-1 font-medium">
            X-Axis: <span className="font-bold text-[#08090a]">{metricDef.label} ({metricDef.unit || 'Count'})</span> • Y-Axis: <span className="font-bold text-[#08090a]">Industry / Sector</span> • Baseline:{' '}
            {previousDate ? previousDate : 'Initial'} → {selectedDate}
          </p>
        </div>

        {/* Controls: Search, Limit, View Mode */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#08090a]/40 stroke-[2]" />
            <input
              type="text"
              placeholder={`Search ${items.length} sectors...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-7 py-2 text-xs bg-white border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#A2AB73]/40 w-44 sm:w-56 font-medium text-[#08090a]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#08090a]/40 hover:text-[#08090a]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Display Limit Selector */}
          {viewMode === 'chart' && (
            <div className="flex items-center bg-white border border-[#b1ada1]/40 rounded-xl p-0.5 text-xs">
              {(['30', '60', '100', 'all'] as const).map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setDisplayCount(cnt)}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all font-display ${
                    displayCount === cnt
                      ? 'bg-[#08090a] text-white shadow-2xs'
                      : 'text-[#08090a]/60 hover:text-[#08090a]'
                  }`}
                >
                  {cnt === 'all' ? `All (${items.length})` : `Top ${cnt}`}
                </button>
              ))}
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center bg-white border border-[#b1ada1]/40 p-0.5 rounded-xl">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors font-display ${
                viewMode === 'chart'
                  ? 'bg-[#08090a] text-white shadow-2xs'
                  : 'text-[#08090a]/60 hover:text-[#08090a]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 stroke-[2]" />
              <span>Chart</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors font-display ${
                viewMode === 'table'
                  ? 'bg-[#08090a] text-white shadow-2xs'
                  : 'text-[#08090a]/60 hover:text-[#08090a]'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 stroke-[2]" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'chart' ? (
        <div className="p-4 sm:p-6">
          {/* Legend & Stats Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-3.5 bg-[#f4f3ee] rounded-[14px] border border-[#b1ada1]/30 text-xs">
            <div>
              <span className="text-[#08090a]/60 font-semibold">Top Industry:</span>
              <div className="font-extrabold text-[#08090a] truncate font-display">
                {sortedItems[0]?.sector || '-'} ({metricDef.format(sortedItems[0]?.currentValue || 0)})
              </div>
            </div>
            <div>
              <span className="text-[#08090a]/60 font-semibold">Lowest Industry:</span>
              <div className="font-extrabold text-[#08090a] truncate font-display">
                {sortedItems[sortedItems.length - 1]?.sector || '-'} (
                {metricDef.format(sortedItems[sortedItems.length - 1]?.currentValue || 0)})
              </div>
            </div>
            <div>
              <span className="text-[#08090a]/60 font-semibold">Industry Average:</span>
              <div className="font-extrabold text-[#08090a] font-display">{metricDef.format(avgValue)}</div>
            </div>
            <div>
              <span className="text-[#08090a]/60 font-semibold">Showing:</span>
              <div className="font-extrabold text-[#10b981] font-display">
                {visibleItems.length} of {items.length} Industries
              </div>
            </div>
          </div>

          {/* Mobile Swipe Hint for Bar Chart */}
          <div className="sm:hidden mb-3 px-3 py-2 bg-[#f4f3ee] border border-[#b1ada1]/30 rounded-xl flex items-center justify-between text-[11px] text-[#08090a]/70 font-semibold">
            <span className="flex items-center gap-1.5">
              <span>↔</span> Swipe horizontally to view full sector labels & bar values
            </span>
          </div>

          {/* Full Page Horizontal Bar Chart (Y = Sector, X = Value) */}
          <div
            className="w-full overflow-x-auto pb-3"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div style={{ height: calculatedHeight, minWidth: '620px' }} className="w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={visibleItems}
                  layout="vertical"
                  margin={{ top: 10, right: 90, left: 175, bottom: 25 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      onSelectSector(e.activePayload[0].payload.sector);
                    }
                  }}
                >
                  <XAxis
                    type="number"
                    tickFormatter={(v) => metricDef.format(v)}
                    tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                    axisLine={{ stroke: '#b1ada1', strokeOpacity: 0.4 }}
                    tickLine={{ stroke: '#b1ada1', strokeOpacity: 0.4 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="sector"
                    tick={{ fontSize: 11, fill: '#08090a', fontWeight: 600 }}
                    width={170}
                    axisLine={{ stroke: '#b1ada1', strokeOpacity: 0.4 }}
                    tickLine={false}
                    interval={0}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f3ee' }} />
                  <ReferenceLine
                    x={avgValue}
                    stroke="#A2AB73"
                    strokeDasharray="3 3"
                    label={{
                      value: `Avg: ${metricDef.format(avgValue)}`,
                      position: 'top',
                      fill: '#A2AB73',
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  />
                  <Bar
                    dataKey="currentValue"
                    radius={[0, 6, 6, 0]}
                    isAnimationActive={false}
                    className="cursor-pointer"
                  >
                    {visibleItems.map((entry, index) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            selectedMetric === 'median1YReturn' || selectedMetric === 'wtdAvgSalesGrowth'
                              ? entry.currentValue >= 0
                                ? '#10b981' // emerald
                                : '#A2AB73' // sage accent
                              : '#08090a' // deep charcoal
                          }
                          className="hover:opacity-85 transition-opacity"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive Sector Grid */}
          <div className="mt-8 border-t border-[#b1ada1]/30 pt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#08090a] uppercase tracking-wider font-display">
                All {sortedItems.length} Industries (Click to Drilldown)
              </span>
              <span className="text-[11px] text-[#08090a]/60 font-medium">
                Sorted by {sortBy.replace('-', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-96 overflow-y-auto pr-1">
              {sortedItems.map((item) => {
                const isPositive = item.changeValue >= 0;
                return (
                  <button
                    key={item.sector}
                    onClick={() => onSelectSector(item.sector)}
                    className="flex items-center justify-between p-3 rounded-[14px] border border-[#b1ada1]/30 hover:border-[#A2AB73] hover:bg-[#f4f3ee]/60 transition-all text-left group bg-white shadow-2xs cursor-pointer min-h-[56px]"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-extrabold text-[#08090a] group-hover:text-[#A2AB73] truncate font-display">
                        {item.sector}
                      </div>
                      <div className="text-[10px] text-[#08090a]/60 font-medium">
                        {item.allMetrics.noOfCompanies} cos • P/E: {item.allMetrics.medianPE}x
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-extrabold text-[#08090a] font-display">
                        {metricDef.format(item.currentValue)}
                      </div>
                      {item.previousValue !== null ? (
                        <div
                          className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${
                            isPositive ? 'text-[#10b981]' : 'text-[#A2AB73]'
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                          ) : (
                            <TrendingDown className="w-3 h-3 stroke-[2.5]" />
                          )}
                          {isPositive ? '+' : ''}
                          {item.changePercent.toFixed(1)}%
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#08090a]/40 font-medium">Baseline</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Screener.in /market/ Exact Data Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f4f3ee] border-b border-[#b1ada1]/30 text-[#08090a] font-extrabold font-display">
                <th className="py-3 px-3">S.No.</th>
                <th className="py-3 px-4">Industry Sector</th>
                <th className="py-3 px-3 text-right">No. of Companies</th>
                <th className="py-3 px-4 text-right">Total Market Cap</th>
                <th className="py-3 px-4 text-right">Median Market Cap</th>
                <th className="py-3 px-3 text-right">Median P/E</th>
                <th className="py-3 px-3 text-right">Wtd. Sales Growth</th>
                <th className="py-3 px-3 text-right">Wtd. OPM</th>
                <th className="py-3 px-3 text-right">Wtd. ROCE</th>
                <th className="py-3 px-3 text-right">Median 1Y Return</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#b1ada1]/20">
              {sortedItems.map((item, idx) => {
                const s = item.allMetrics;
                return (
                  <tr
                    key={item.sector}
                    className="hover:bg-[#f4f3ee]/50 transition-colors cursor-pointer"
                    onClick={() => onSelectSector(item.sector)}
                  >
                    <td className="py-3 px-3 font-mono text-[#08090a]/40 font-bold">{idx + 1}.</td>
                    <td className="py-3 px-4 font-extrabold text-[#08090a] font-display">{s.sector}</td>
                    <td className="py-3 px-3 text-right font-medium text-[#08090a]/70">{s.noOfCompanies}</td>
                    <td className="py-3 px-4 text-right font-bold text-[#08090a] font-display">
                      ₹{s.totalMarketCap.toLocaleString('en-IN')} Cr
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#08090a]/80">
                      ₹{s.medianMarketCap.toLocaleString('en-IN')} Cr
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#08090a]">{s.medianPE}x</td>
                    <td className="py-3 px-3 text-right font-medium text-[#08090a]/80">{s.wtdAvgSalesGrowth}%</td>
                    <td className="py-3 px-3 text-right font-medium text-[#08090a]/80">{s.wtdAvgOPM}%</td>
                    <td className="py-3 px-3 text-right font-medium text-[#08090a]/80">{s.wtdAvgROCE}%</td>
                    <td
                      className={`py-3 px-3 text-right font-bold font-display ${
                        s.median1YReturn >= 0 ? 'text-[#10b981]' : 'text-[#A2AB73]'
                      }`}
                    >
                      {s.median1YReturn >= 0 ? '+' : ''}
                      {s.median1YReturn}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#A2AB73] hover:text-[#8f9862] font-bold font-display">
                        Drilldown <ExternalLink className="w-3 h-3 stroke-[2]" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

