import React from 'react';
import { Layers, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh?: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, isSyncing }) => {
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
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                NSE 500 / BSE 500 Universe
              </span>
            </div>
            <p className="text-xs text-[#08090a]/60 font-medium hidden sm:block">
              Institutional Cluster Breadth & Co-Movement Proof Across 46 Pre-Built Industry Baskets
            </p>
          </div>
        </div>

        {/* Right: Clean Status & Live Market Sync Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f3ee] border border-[#b1ada1]/30 rounded-xl text-xs font-semibold text-[#08090a]">
            <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>46 Clusters + 4 Benchmarks</span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isSyncing}
              title="Sync latest live market closes for Nifty 50, Midcap 100, Smallcap 100 & NSE 500"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#08090a] hover:bg-[#1f2429] active:scale-95 text-white rounded-xl text-xs font-bold font-display cursor-pointer transition-all shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#10b981] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Market Closes'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
