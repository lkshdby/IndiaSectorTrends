import React from 'react';
import {
  Activity,
  Calendar,
  Clock,
  Download,
  RefreshCw,
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
  schedulerInfo: _schedulerInfo,
  onRefreshFetch: _onRefreshFetch,
  isFetching: _isFetching,
  onSyncGitHub,
  isSyncingGitHub,
  onOpenExportModal,
  onOpenSchedulerModal,
}) => {
  return (
    <header className="border-b border-[#b1ada1]/30 bg-white/95 backdrop-blur-md sticky top-0 z-30 px-3 sm:px-5 py-2.5">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Brand & Date Scrubber */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#A2AB73] flex items-center justify-center text-white shadow-xs shrink-0">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-[#08090a] font-display truncate">
              Industry Trends
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              188 Sectors
            </span>
          </div>

          {/* Date Picker Selector */}
          <div className="flex items-center bg-[#f4f3ee] border border-[#b1ada1]/40 rounded-lg px-2 py-1 text-xs text-[#08090a] shadow-2xs h-8 ml-1">
            <Calendar className="w-3.5 h-3.5 text-[#08090a]/60 mr-1.5 shrink-0 stroke-[2]" />
            <select
              value={selectedDate}
              onChange={(e) => onSelectDate(e.target.value)}
              className="bg-transparent text-[11px] sm:text-xs text-[#08090a] font-bold focus:outline-hidden cursor-pointer pr-1 font-display max-w-[130px] sm:max-w-[170px] truncate"
              title="Select Historical Snapshot Date"
            >
              {snapshots.slice().reverse().map((s, idx) => {
                const d = new Date(s.date);
                const formatted = d.toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                return (
                  <option key={s.date} value={s.date}>
                    {idx === 0 ? '🟢 ' : ''}{formatted} ({s.date}){idx === 0 ? ' (Latest)' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Right: Simple, crisp icon action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sync Live GitHub Icon */}
          <button
            id="sync-github-live-button"
            onClick={onSyncGitHub}
            disabled={isSyncingGitHub}
            title={isSyncingGitHub ? 'Syncing with live data...' : 'Sync Live GitHub Data'}
            aria-label="Sync Live Data"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white bg-[#A2AB73] hover:bg-[#8f9862] active:scale-95 rounded-lg sm:rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2] ${isSyncingGitHub ? 'animate-spin' : ''}`} />
          </button>

          {/* 7 PM Cron Status Icon */}
          <button
            id="scheduler-status-button"
            onClick={onOpenSchedulerModal}
            title="7:00 PM IST Daily Cron Scheduler & GitHub Repo Settings"
            aria-label="7:00 PM Daily Cron Scheduler"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#08090a] bg-white hover:bg-[#f4f3ee] border border-[#b1ada1]/40 active:scale-95 rounded-lg sm:rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#08090a]/80 stroke-[2]" />
          </button>

          {/* Export & Backup Icon */}
          <button
            id="export-modal-button"
            onClick={onOpenExportModal}
            title="Export CSV / JSON Backups"
            aria-label="Export Data and Backups"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white bg-[#08090a] hover:bg-[#1e2022] active:scale-95 rounded-lg sm:rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </header>
  );
};


