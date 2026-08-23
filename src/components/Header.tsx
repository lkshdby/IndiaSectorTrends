import React from 'react';
import {
  Activity,
  Calendar,
  Clock,
  Download,
  GitBranch,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { DailySnapshot, SchedulerInfo } from '../types';

interface HeaderProps {
  snapshots: DailySnapshot[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  schedulerInfo: SchedulerInfo | null;
  onRefreshFetch: () => void;
  isFetching: boolean;
  onSyncGitHub: () => void;
  isSyncingGitHub: boolean;
  onOpenExportModal: () => void;
  onOpenSchedulerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  snapshots,
  selectedDate,
  onSelectDate,
  schedulerInfo,
  onRefreshFetch,
  isFetching,
  onSyncGitHub,
  isSyncingGitHub,
  onOpenExportModal,
  onOpenSchedulerModal,
}) => {
  return (
    <header className="border-b border-[#b1ada1]/30 bg-white/95 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title & Status */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-[14px] bg-[#A2AB73] flex items-center justify-center text-white shadow-sm ring-2 ring-[#A2AB73]/20 shrink-0">
            <Activity className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#08090a] font-display">
                Industry Trends
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Live Screener
              </span>
            </div>
            <p className="text-xs text-[#08090a]/70 font-medium mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-1 text-[#A2AB73] bg-[#A2AB73]/10 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                <Clock className="w-3 h-3 stroke-[2]" />
                7:00 PM IST Scraper
              </span>
              <span className="text-[#b1ada1]">•</span>
              <span className="inline-flex items-center gap-1 text-[#08090a]/70 font-mono text-[11px]">
                <GitBranch className="w-3 h-3 text-[#10b981] stroke-[2]" />
                data-storage
              </span>
              <span className="text-[#b1ada1]">•</span>
              <span className="font-semibold text-[#08090a]/80">
                {snapshots[snapshots.length - 1]?.sectors?.length || 188} Sectors Tracked
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls & Date Scrubber */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Date Picker Selector */}
          <div className="flex items-center bg-[#f4f3ee] border border-[#b1ada1]/40 rounded-xl px-3 py-2 text-xs text-[#08090a] shadow-xs min-h-[44px]">
            <Calendar className="w-4 h-4 text-[#08090a]/60 mr-2 shrink-0 stroke-[2]" />
            <span className="font-semibold text-[#08090a]/60 mr-1.5">Date:</span>
            <select
              value={selectedDate}
              onChange={(e) => onSelectDate(e.target.value)}
              className="bg-transparent text-[#08090a] font-bold focus:outline-none cursor-pointer pr-1 font-display"
            >
              {snapshots.slice().reverse().map((s, idx) => {
                const d = new Date(s.date);
                const formatted = d.toLocaleDateString('en-IN', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });
                return (
                  <option key={s.date} value={s.date}>
                    {idx === 0 ? '🟢 ' : ''}{formatted} ({s.date}){idx === 0 ? ' — LATEST LIVE' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Sync Live GitHub data-storage */}
          <button
            id="sync-github-live-button"
            onClick={onSyncGitHub}
            disabled={isSyncingGitHub}
            title="Fetch latest scraped snapshot directly from GitHub data-storage branch"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#A2AB73] hover:bg-[#8f9862] active:scale-98 rounded-xl transition-all shadow-sm min-h-[44px] cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 stroke-[2.2] ${isSyncingGitHub ? 'animate-spin' : ''}`} />
            <span>{isSyncingGitHub ? 'Syncing...' : 'Sync Live'}</span>
          </button>

          {/* 7 PM Cron Status Button */}
          <button
            id="scheduler-status-button"
            onClick={onOpenSchedulerModal}
            title="Inspect 7:00 PM Daily Auto-Fetch Scheduler & Repo Configuration"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#08090a] bg-white hover:bg-[#f4f3ee] border border-[#b1ada1]/40 rounded-xl transition-all shadow-xs min-h-[44px] cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#08090a]/70 stroke-[2]" />
            <span>7 PM Cron</span>
          </button>

          {/* Export & Backup */}
          <button
            id="export-modal-button"
            onClick={onOpenExportModal}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#08090a] hover:bg-[#1e2022] active:scale-98 rounded-xl transition-all shadow-xs min-h-[44px] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2]" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};


