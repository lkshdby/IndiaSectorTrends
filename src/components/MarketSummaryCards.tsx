import React from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  Percent,
  TrendingUp,
  BarChart2,
  PieChart,
  Layers,
} from 'lucide-react';
import { DailySnapshot } from '../types';
import { computeMarketOverview } from '../utils/dataProcessor';
import { formatIndianCurrency } from '../utils/metrics';

interface MarketSummaryCardsProps {
  currentSnapshot: DailySnapshot | null;
}

export const MarketSummaryCards: React.FC<MarketSummaryCardsProps> = ({
  currentSnapshot,
}) => {
  const overview = computeMarketOverview(currentSnapshot);

  // Calculate percentage gauges for visual progress indicators
  const peRatioGauge = Math.min(100, Math.max(10, (overview.averagePE / 45) * 100));
  const roceGauge = Math.min(100, Math.max(5, (overview.averageROCE / 30) * 100));
  const opmGauge = Math.min(100, Math.max(5, (overview.averageOPM / 30) * 100));
  const salesGauge = Math.min(100, Math.max(5, (overview.averageSalesGrowth / 25) * 100));

  // Circular ring calculation helper (radius = 16, circumference ≈ 100.5)
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const peStrokeDashoffset = circumference - (peRatioGauge / 100) * circumference;
  const roceStrokeDashoffset = circumference - (roceGauge / 100) * circumference;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Total Market Cap */}
      <div className="bg-white p-4 sm:p-4.5 rounded-[18px] border border-[#b1ada1]/30 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[#08090a]/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider font-display">
              Total Market Cap
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#c15f3c]/10 text-[#c15f3c] flex items-center justify-center">
              <Coins className="w-3.5 h-3.5 stroke-[2]" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#08090a] font-display tracking-tight">
            {formatIndianCurrency(overview.totalMarketCap)}
          </div>
        </div>

        {/* Dual Macro bar indicator */}
        <div className="mt-3.5 pt-3 border-t border-[#b1ada1]/20">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#08090a]/70 mb-1">
            <span>Market Breadth</span>
            <span className="font-mono text-[#08090a]">{overview.totalCompanies} Companies</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#f4f3ee] overflow-hidden p-0.5 flex gap-0.5">
            <div className="h-full rounded-full bg-gradient-to-r from-[#c15f3c] to-[#f59e0b]" style={{ width: '65%' }} />
            <div className="h-full rounded-full bg-[#10b981]" style={{ width: '35%' }} />
          </div>
        </div>
      </div>

      {/* 2. Weighted Average P/E with Circular SVG Progress Ring */}
      <div className="bg-white p-4 sm:p-4.5 rounded-[18px] border border-[#b1ada1]/30 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[#08090a]/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider font-display">
              Wtd. Market P/E
            </span>
            {/* SVG Circular Ring */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  stroke="#f4f3ee"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  stroke="#c15f3c"
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={peStrokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <Percent className="w-3 h-3 text-[#c15f3c] absolute stroke-[2.5]" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#08090a] font-display tracking-tight">
            {overview.averagePE.toFixed(1)}x
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#b1ada1]/20 flex items-center justify-between text-[11px]">
          <span className="text-[#08090a]/70 font-medium">Avg ROCE Ratio</span>
          <span className="font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-md">
            {overview.averageROCE.toFixed(1)}% ROCE
          </span>
        </div>
      </div>

      {/* 3. Top 1Y Outperformer */}
      <div className="bg-white p-4 sm:p-4.5 rounded-[18px] border border-[#b1ada1]/30 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[#08090a]/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider font-display">
              Top 1Y Outperformer
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 stroke-[2]" />
            </div>
          </div>
          <div className="text-sm sm:text-base font-extrabold text-[#08090a] font-display truncate">
            {overview.topGainerSector?.sector || '-'}
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#b1ada1]/20">
          <div className="inline-flex items-center gap-1 font-bold text-[#10b981] bg-[#10b981]/15 px-2.5 py-1 rounded-lg text-xs font-display">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            +{overview.topGainerSector?.median1YReturn}% 1Y Median Return
          </div>
        </div>
      </div>

      {/* 4. Operating Margins & Sales Growth with Circular SVG Ring */}
      <div className="bg-white p-4 sm:p-4.5 rounded-[18px] border border-[#b1ada1]/30 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[#08090a]/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider font-display">
              Operating Efficiency
            </span>
            {/* SVG Circular Ring for OPM */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  stroke="#f4f3ee"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={roceStrokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <Layers className="w-3 h-3 text-[#10b981] absolute stroke-[2.5]" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#08090a] font-display tracking-tight">
            {overview.averageOPM.toFixed(1)}% <span className="text-xs font-semibold text-[#08090a]/60">OPM</span>
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#b1ada1]/20 flex items-center justify-between text-[11px]">
          <span className="text-[#08090a]/70 font-medium">Wtd. Sales Growth</span>
          <span className="font-bold text-[#08090a] bg-[#f4f3ee] px-2 py-0.5 rounded-md border border-[#b1ada1]/30">
            +{overview.averageSalesGrowth.toFixed(1)}% YoY
          </span>
        </div>
      </div>
    </div>
  );
};

