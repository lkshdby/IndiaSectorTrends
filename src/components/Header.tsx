import React from 'react';
import { Layers, RefreshCw } from 'lucide-react';
import { getUniverseDiagnostics } from '../data/sectorUniverse';

interface HeaderProps {
  onRefresh?: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, isSyncing }) => {
  const universe = getUniverseDiagnostics();
  return (
    <header className="border-b border-[#b1ada1]/30 bg-white/95 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Brand & Universe Indicator */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#2563eb] overflow-hidden border border-[#2563eb]/60 shadow-xs shrink-0 flex items-center justify-center text-white font-extrabold text-sm">
            SR
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-[#08090a] font-display">
                Sector Rotation Engine
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#08090a]/60 whitespace-nowrap">
                <span>·</span>
                <span>Custom NSE/BSE Thematic Watchlists</span>
              </span>
            </div>
            <p className="text-xs text-[#08090a]/60 font-medium hidden sm:block">
              Price-based rotation signals, core baskets and adjacent company opportunities
            </p>
          </div>
        </div>

        {/* Right: Clean Status & Live Market Sync Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f3ee] border border-[#b1ada1]/30 rounded-xl text-xs font-semibold text-[#08090a]">
            <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>{universe.basketCount} Clusters · {universe.coreUniqueSymbols} Core Tickers · 4 Benchmarks</span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isSyncing}
              title="Queues a protected GitHub Actions job to fetch the full universe. New prices become available after the job completes."
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#08090a] hover:bg-[#1f2429] active:scale-95 text-white rounded-xl text-xs font-bold font-display cursor-pointer transition-all shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#10b981] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Queuing...' : 'Request Market Refresh'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
