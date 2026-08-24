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
      <div className="bg-[#f4f3ee] rounded-[24px] shadow-2xl max-w-xl w-full flex flex-col border border-[#b1ada1]/40 overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#b1ada1]/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#08090a] text-white shadow-xs">
              <Clock className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#08090a] font-display">
                Hourly Market Auto-Fetch Scheduler
              </h3>
              <p className="text-xs text-[#08090a]/60 font-medium">
                Hourly Intra-Day Updates (9:00 AM – 7:00 PM IST) + Dual-Branch Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#f4f3ee] hover:bg-[#b1ada1]/20 flex items-center justify-center text-[#08090a] transition-colors cursor-pointer border border-[#b1ada1]/30"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs overflow-y-auto bg-[#f4f3ee]">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-4 bg-[#10b981]/10 rounded-[18px] border border-[#10b981]/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
              <span className="font-extrabold text-[#08090a] text-sm font-display">GitHub Action & Cron Active</span>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 bg-[#10b981]/20 text-[#08090a] rounded-lg font-bold">
              30 3-13 * * 1-5 (9 AM - 7 PM IST Hourly)
            </span>
          </div>

          {/* GitHub Dual-Branch Isolation Card */}
          <div className="p-5 bg-[#08090a] text-white rounded-[18px] space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-[#f4f3ee]" />
                <span className="font-extrabold text-sm text-[#f4f3ee] font-display">Live GitHub Cloud Sync</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-[#f4f3ee]/10 text-[#10b981] px-2.5 py-0.5 rounded-lg border border-white/10 font-bold">
                <GitBranch className="w-3 h-3" /> data-storage branch
              </span>
            </div>

            <p className="text-white/70 leading-relaxed text-[11px] font-medium">
              <strong className="text-white">Zero-Conflict Architecture:</strong> GitHub Actions commits daily snapshots directly to an isolated <code className="text-[#10b981] font-mono">data-storage</code> branch. Your <code className="text-white font-mono">main</code> branch stays 100% clean, eliminating merge conflicts.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="owner/repository (e.g. lkshdby/IndiaSectorTrends)"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder:text-white/40 focus:outline-none focus:border-[#10b981]"
              />
              <button
                onClick={handleSaveAndSync}
                disabled={isSyncingGitHub}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#10b981] hover:bg-[#10b981]/90 text-white font-bold rounded-xl transition-all disabled:opacity-50 font-display cursor-pointer shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? 'animate-spin' : ''}`} />
                <span>{isSyncingGitHub ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>
            {saveSuccess && (
              <div className="text-[11px] text-[#10b981] flex items-center gap-1 font-bold font-display">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /> Connected and saved repository target!
              </div>
            )}
          </div>

          {/* Timing details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
              <span className="text-[#08090a]/60 font-semibold block mb-1">Execution Schedule:</span>
              <div className="font-extrabold text-[#08090a] font-display">
                Mon-Fri Hourly (9:00 AM – 7:00 PM IST)
              </div>
              <div className="text-[11px] text-[#08090a]/60 mt-1 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981] stroke-[2]" />
                <span>11 intra-day updates / day</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
              <span className="text-[#08090a]/60 font-semibold block mb-1">Next Scheduled Run:</span>
              <div className="font-extrabold text-[#10b981] font-display">
                {nextRun
                  ? nextRun.toLocaleString('en-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Mon-Fri Hourly @ :30 (IST)'}
              </div>
              <div className="text-[11px] text-[#08090a]/60 mt-1 font-medium">
                Last Run: {lastRun ? lastRun.toLocaleTimeString('en-IN') : 'Active'}
              </div>
            </div>
          </div>

          {/* Manual Local Scrape Button */}
          <div className="p-4 bg-white rounded-[18px] border border-[#b1ada1]/30 flex items-center justify-between shadow-xs">
            <div>
              <div className="font-extrabold text-[#08090a] text-xs font-display">Run Scraper Directly</div>
              <div className="text-[11px] text-[#08090a]/60 mt-0.5 font-medium">
                Scrapes live Screener.in right now inside container
              </div>
            </div>
            <button
              onClick={onTriggerFetch}
              disabled={isFetching}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#08090a] hover:bg-[#08090a]/90 text-white font-bold rounded-xl transition-all shadow-xs disabled:opacity-50 font-display cursor-pointer"
            >
              <Zap className={`w-3.5 h-3.5 text-[#f59e0b] ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? 'Fetching...' : 'Scrape Live'}</span>
            </button>
          </div>

          {/* Terminal Logs */}
          <div className="bg-white p-4 rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-[#08090a] flex items-center gap-1.5 font-display">
                <Terminal className="w-3.5 h-3.5 text-[#08090a]/60 stroke-[2]" />
                Execution Log:
              </span>
              <span className="text-[10px] text-[#08090a]/50 font-mono font-bold">Live Engine</span>
            </div>
            <div className="bg-[#08090a] text-[#f4f3ee]/80 font-mono text-[11px] p-3.5 rounded-xl max-h-32 overflow-y-auto space-y-1 border border-white/10">
              {schedulerInfo?.log && schedulerInfo.log.length > 0 ? (
                schedulerInfo.log.map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    <span className="text-[#10b981]">➜</span> {line}
                  </div>
                ))
              ) : (
                <div className="text-white/40 italic">Cron initialized and monitoring 19:00 IST weekday slots...</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#b1ada1]/30 flex justify-end">
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

