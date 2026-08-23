import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  GitBranch,
  Github,
  RefreshCw,
  ShieldCheck,
  Terminal,
  X,
  Zap,
} from 'lucide-react';
import { SchedulerInfo } from '../types';
import { getSavedGitHubRepo, setSavedGitHubRepo } from '../utils/githubDataSync';

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedulerInfo: SchedulerInfo | null;
  onTriggerFetch: () => void;
  isFetching: boolean;
  onSyncGitHub: (repoName: string) => Promise<void>;
  isSyncingGitHub: boolean;
}

export const SchedulerModal: React.FC<SchedulerModalProps> = ({
  isOpen,
  onClose,
  schedulerInfo,
  onTriggerFetch,
  isFetching,
  onSyncGitHub,
  isSyncingGitHub,
}) => {
  const [repoInput, setRepoInput] = useState(() => getSavedGitHubRepo());
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const nextRun = schedulerInfo?.nextRunTime ? new Date(schedulerInfo.nextRunTime) : null;
  const lastRun = schedulerInfo?.lastRunTime ? new Date(schedulerInfo.lastRunTime) : null;

  const handleSaveAndSync = async () => {
    setSavedGitHubRepo(repoInput);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    await onSyncGitHub(repoInput);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full flex flex-col border border-zinc-200 overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-700 text-white shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                7:00 PM Daily Auto-Fetch Scheduler
              </h3>
              <p className="text-xs text-zinc-500">
                Automated GitHub Actions + Dual-Branch Zero Conflict Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-200/80 hover:bg-zinc-300 flex items-center justify-center text-zinc-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs overflow-y-auto">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span className="font-bold text-emerald-950 text-sm">GitHub Action & Cron Active</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-semibold">
              30 13 * * 1-5 (7 PM IST)
            </span>
          </div>

          {/* GitHub Dual-Branch Isolation Card (Fixes AI Studio Sync) */}
          <div className="p-4 bg-zinc-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-zinc-300" />
                <span className="font-bold text-sm text-zinc-100">Live GitHub Cloud Sync</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-zinc-800 text-emerald-400 px-2 py-0.5 rounded border border-zinc-700">
                <GitBranch className="w-3 h-3" /> data-storage branch
              </span>
            </div>

            <p className="text-zinc-300 leading-relaxed text-[11px]">
              <strong>Zero-Conflict Architecture:</strong> GitHub Actions commits daily snapshots directly to an isolated <code className="text-emerald-400 font-mono">data-storage</code> branch. Your <code className="text-zinc-200 font-mono">main</code> branch stays 100% clean, completely eliminating AI Studio git errors and merge conflicts.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="owner/repository (e.g. lkshdby/IndiaSectorTrends)"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSaveAndSync}
                disabled={isSyncingGitHub}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? 'animate-spin' : ''}`} />
                <span>{isSyncingGitHub ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>
            {saveSuccess && (
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected and saved repository target!
              </div>
            )}
          </div>

          {/* Timing details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
              <span className="text-zinc-500 block mb-1">Execution Schedule:</span>
              <div className="font-bold text-zinc-900">
                Every Weekday (Mon-Fri) at 19:00 IST
              </div>
              <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Excludes Sat & Sun</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
              <span className="text-zinc-500 block mb-1">Next Scheduled Run:</span>
              <div className="font-bold text-emerald-800">
                {nextRun
                  ? nextRun.toLocaleString('en-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Mon-Fri @ 7:00 PM IST'}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Last Run: {lastRun ? lastRun.toLocaleTimeString('en-IN') : 'Active'}
              </div>
            </div>
          </div>

          {/* Manual Local Scrape Button */}
          <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-zinc-900 text-xs">Run Scraper Directly</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Scrapes live Screener.in right now inside container
              </div>
            </div>
            <button
              onClick={onTriggerFetch}
              disabled={isFetching}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-lg transition-colors shadow-2xs disabled:opacity-50"
            >
              <Zap className={`w-3.5 h-3.5 text-amber-400 ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? 'Fetching...' : 'Scrape Live'}</span>
            </button>
          </div>

          {/* Terminal Logs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-zinc-700 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                Execution Log:
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Live Engine</span>
            </div>
            <div className="bg-zinc-950 text-zinc-300 font-mono text-[11px] p-3 rounded-xl max-h-32 overflow-y-auto space-y-1 border border-zinc-800">
              {schedulerInfo?.log && schedulerInfo.log.length > 0 ? (
                schedulerInfo.log.map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    <span className="text-emerald-500">➜</span> {line}
                  </div>
                ))
              ) : (
                <div className="text-zinc-500 italic">Cron initialized and monitoring 19:00 IST weekday slots...</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
