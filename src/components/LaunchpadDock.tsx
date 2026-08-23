import React from 'react';
import { Activity, BarChart3, Clock, Database, RefreshCw, Zap } from 'lucide-react';

interface LaunchpadDockProps {
  mainViewMode: 'worms' | 'bars';
  onSelectViewMode: (mode: 'worms' | 'bars') => void;
  onOpenSchedulerModal: () => void;
  onOpenExportModal: () => void;
  onTriggerFetch: () => void;
  isFetching: boolean;
}

export const LaunchpadDock: React.FC<LaunchpadDockProps> = ({
  mainViewMode,
  onSelectViewMode,
  onOpenSchedulerModal,
  onOpenExportModal,
  onTriggerFetch,
  isFetching,
}) => {
  return (
    <nav
      aria-label="Bottom Quick Launchpad"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg bg-white/95 backdrop-blur-md border border-[#b1ada1]/40 rounded-[28px] p-2 shadow-xl flex items-center justify-around font-display"
    >
      {/* 188 Worms Tab */}
      <button
        onClick={() => onSelectViewMode('worms')}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-[20px] transition-all cursor-pointer ${
          mainViewMode === 'worms'
            ? 'bg-[#08090a] text-white shadow-xs scale-102'
            : 'text-[#08090a]/60 hover:text-[#08090a] hover:bg-[#f4f3ee]'
        }`}
      >
        <Activity className={`w-4 h-4 stroke-[2.2] ${mainViewMode === 'worms' ? 'text-[#10b981]' : ''}`} />
        <span className="text-[10px] font-extrabold tracking-tight mt-0.5 whitespace-nowrap">188 Worms</span>
      </button>

      {/* Ranked Bars Tab */}
      <button
        onClick={() => onSelectViewMode('bars')}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-[20px] transition-all cursor-pointer ${
          mainViewMode === 'bars'
            ? 'bg-[#08090a] text-white shadow-xs scale-102'
            : 'text-[#08090a]/60 hover:text-[#08090a] hover:bg-[#f4f3ee]'
        }`}
      >
        <BarChart3 className="w-4 h-4 stroke-[2.2]" />
        <span className="text-[10px] font-extrabold tracking-tight mt-0.5 whitespace-nowrap">Ranked Bars</span>
      </button>

      {/* Quick Live Fetch */}
      <button
        onClick={onTriggerFetch}
        disabled={isFetching}
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-[20px] transition-all cursor-pointer text-[#08090a]/70 hover:text-[#08090a] hover:bg-[#f4f3ee] disabled:opacity-50"
      >
        <Zap className={`w-4 h-4 text-[#f59e0b] stroke-[2.2] ${isFetching ? 'animate-spin' : ''}`} />
        <span className="text-[10px] font-extrabold tracking-tight mt-0.5 whitespace-nowrap">
          {isFetching ? 'Scraping...' : 'Live Fetch'}
        </span>
      </button>

      {/* Scheduler Modal Opener */}
      <button
        onClick={onOpenSchedulerModal}
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-[20px] transition-all cursor-pointer text-[#08090a]/70 hover:text-[#08090a] hover:bg-[#f4f3ee]"
      >
        <Clock className="w-4 h-4 stroke-[2.2]" />
        <span className="text-[10px] font-extrabold tracking-tight mt-0.5 whitespace-nowrap">7 PM Cron</span>
      </button>

      {/* Export / Backup Modal Opener */}
      <button
        onClick={onOpenExportModal}
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-[20px] transition-all cursor-pointer text-[#08090a]/70 hover:text-[#08090a] hover:bg-[#f4f3ee]"
      >
        <Database className="w-4 h-4 stroke-[2.2]" />
        <span className="text-[10px] font-extrabold tracking-tight mt-0.5 whitespace-nowrap">Export</span>
      </button>
    </nav>
  );
};
