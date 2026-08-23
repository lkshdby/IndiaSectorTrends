import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Layers,
  TrendingUp,
  X,
} from 'lucide-react';
import { DailySnapshot, MetricKey, TimeResolution } from '../types';
import { METRIC_DEFINITIONS, METRIC_KEYS } from '../utils/metrics';
import { getSnapshotsByResolution } from '../utils/dataProcessor';

interface SectorDrilldownModalProps {
  sectorName: string | null;
  snapshots: DailySnapshot[];
  onClose: () => void;
  initialMetric: MetricKey;
  initialResolution: TimeResolution;
}

export const SectorDrilldownModal: React.FC<SectorDrilldownModalProps> = ({
  sectorName,
  snapshots,
  onClose,
  initialMetric,
  initialResolution,
}) => {
  const [activeMetric, setActiveMetric] = useState<MetricKey>(initialMetric);
  const [activeResolution, setActiveResolution] = useState<TimeResolution>(initialResolution);

  if (!sectorName) return null;

  const resolutionSnapshots = getSnapshotsByResolution(snapshots, activeResolution);
  const metricDef = METRIC_DEFINITIONS[activeMetric];

  // Build time-series data for this sector
  const chartData = resolutionSnapshots
    .map((snap) => {
      const s = snap.sectors.find((item) => item.sector === sectorName);
      if (!s) return null;
      return {
        date: snap.date,
        value: s[activeMetric] as number,
        noOfCompanies: s.noOfCompanies,
        pe: s.medianPE,
        marketCap: s.totalMarketCap,
        salesGrowth: s.wtdAvgSalesGrowth,
        opm: s.wtdAvgOPM,
        roce: s.wtdAvgROCE,
        return1Y: s.median1YReturn,
      };
    })
    .filter(Boolean) as {
    date: string;
    value: number;
    noOfCompanies: number;
    pe: number;
    marketCap: number;
    salesGrowth: number;
    opm: number;
    roce: number;
    return1Y: number;
  }[];

  const firstPoint = chartData[0];
  const latestPoint = chartData[chartData.length - 1];
  const totalChange = latestPoint && firstPoint ? latestPoint.value - firstPoint.value : 0;
  const totalPct = firstPoint && firstPoint.value !== 0 ? (totalChange / Math.abs(firstPoint.value)) * 100 : 0;
  const isPositive = totalChange >= 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-[#f4f3ee] rounded-[24px] shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-[#b1ada1]/40 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#b1ada1]/30 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#08090a] text-white">
                <Building2 className="w-4 h-4 stroke-[2]" />
              </span>
              <h3 className="text-lg font-extrabold text-[#08090a] font-display">{sectorName}</h3>
              <span className="text-xs bg-[#10b981]/15 text-[#10b981] px-2.5 py-0.5 rounded-full font-bold font-display">
                {latestPoint?.noOfCompanies || 0} Listed Companies
              </span>
            </div>
            <p className="text-xs text-[#08090a]/60 mt-1 font-medium">
              Historical performance evolution across {chartData.length} records ({firstPoint?.date} to {latestPoint?.date})
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#f4f3ee] hover:bg-[#b1ada1]/20 flex items-center justify-center text-[#08090a] transition-colors cursor-pointer border border-[#b1ada1]/30"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 bg-[#f4f3ee]">
          {/* Quick Metrics Bar for this Sector */}
          {latestPoint && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-[18px] border border-[#b1ada1]/30 text-xs shadow-xs">
              <div>
                <span className="text-[#08090a]/60 font-semibold">Current {metricDef.label}:</span>
                <div className="text-base font-extrabold text-[#08090a] mt-0.5 font-display">
                  {metricDef.format(latestPoint.value)}
                </div>
              </div>
              <div>
                <span className="text-[#08090a]/60 font-semibold">Net Period Shift:</span>
                <div
                  className={`text-base font-extrabold flex items-center gap-0.5 mt-0.5 font-display ${
                    isPositive ? 'text-[#10b981]' : 'text-[#A2AB73]'
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="w-4 h-4 stroke-[2.5]" /> : <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />}
                  {isPositive ? '+' : ''}
                  {totalPct.toFixed(1)}% ({metricDef.formatDelta(totalChange, totalPct)})
                </div>
              </div>
              <div>
                <span className="text-[#08090a]/60 font-semibold">Median P/E:</span>
                <div className="text-base font-extrabold text-[#08090a] mt-0.5 font-display">{latestPoint.pe}x</div>
              </div>
              <div>
                <span className="text-[#08090a]/60 font-semibold">1Y Return:</span>
                <div
                  className={`text-base font-extrabold mt-0.5 font-display ${
                    latestPoint.return1Y >= 0 ? 'text-[#10b981]' : 'text-[#A2AB73]'
                  }`}
                >
                  {latestPoint.return1Y >= 0 ? '+' : ''}
                  {latestPoint.return1Y}%
                </div>
              </div>
            </div>
          )}

          {/* Metric Selector Pills inside modal */}
          <div className="bg-white p-4 rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
            <div className="text-xs font-bold text-[#08090a] mb-2 uppercase tracking-wider font-display">
              Change Active Metric:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {METRIC_KEYS.map((key) => {
                const def = METRIC_DEFINITIONS[key];
                const isSel = activeMetric === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveMetric(key)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all font-display cursor-pointer ${
                      isSel
                        ? 'bg-[#08090a] text-white shadow-2xs'
                        : 'bg-[#f4f3ee] text-[#08090a]/70 hover:bg-[#b1ada1]/20 border border-[#b1ada1]/30'
                    }`}
                  >
                    {def.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resolution Selector inside modal */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
            <span className="text-xs font-bold text-[#08090a] font-display">Aggregation Level:</span>
            <div className="inline-flex p-0.5 bg-[#f4f3ee] border border-[#b1ada1]/30 rounded-xl gap-1">
              {(['daily', 'weekly', 'monthly'] as TimeResolution[]).map((res) => (
                <button
                  key={res}
                  onClick={() => setActiveResolution(res)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all font-display cursor-pointer ${
                    activeResolution === res
                      ? 'bg-[#08090a] text-white shadow-2xs'
                      : 'text-[#08090a]/60 hover:text-[#08090a]'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          {/* Main Area Chart */}
          <div className="bg-white p-4 rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
            <div
              className="w-full overflow-x-auto pb-2"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div style={{ minWidth: '480px', height: '288px' }} className="w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#b1ada1" strokeOpacity={0.25} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                      tickFormatter={(val) => {
                        if (activeResolution === 'monthly') return val.substring(0, 7);
                        return val.substring(5);
                      }}
                      axisLine={{ stroke: '#b1ada1', strokeOpacity: 0.3 }}
                    />
                    <YAxis
                      tickFormatter={(val) => metricDef.format(val)}
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                      domain={['auto', 'auto']}
                      axisLine={{ stroke: '#b1ada1', strokeOpacity: 0.3 }}
                    />
                    <Tooltip
                      formatter={(val: any) => [metricDef.format(val), metricDef.label]}
                      labelFormatter={(lbl) => `Date: ${lbl}`}
                      contentStyle={{
                        backgroundColor: '#08090a',
                        borderColor: '#b1ada1',
                        borderRadius: '14px',
                        color: '#f4f3ee',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorVal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#b1ada1]/30 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-[#08090a] bg-[#f4f3ee] border border-[#b1ada1]/40 rounded-xl hover:bg-[#b1ada1]/20 transition-colors font-display cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

