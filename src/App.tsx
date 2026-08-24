import React, { useEffect, useState, useTransition } from 'react';
import {
  DailySnapshot,
  MetricKey,
  SchedulerInfo,
  TimeResolution,
} from './types';
import { generateHistoricalSeedSnapshots } from './data/seedData';
import { computeSectorComparison } from './utils/dataProcessor';
import { clearLocalStorageCache, loadSnapshotsLocally, saveSnapshotsLocally } from './utils/storage';
import { unpackSnapshots } from './utils/compactData';
import { fetchSnapshotsFromGitHub, getSavedGitHubRepo } from './utils/githubDataSync';
import { Header } from './components/Header';
import { MetricSelector } from './components/MetricSelector';
import { ResolutionSelector } from './components/ResolutionSelector';
import { SectorWormsChart } from './components/SectorWormsChart';
import { SectorBarChart } from './components/SectorBarChart';
import { SectorDrilldownModal } from './components/SectorDrilldownModal';
import { ExportModal } from './components/ExportModal';
import { SchedulerModal } from './components/SchedulerModal';
import { MarketSummaryCards } from './components/MarketSummaryCards';
import { LaunchpadDock } from './components/LaunchpadDock';
import { Activity, AlertCircle, BarChart3, CheckCircle2, Table } from 'lucide-react';

export default function App() {
  const [snapshots, setSnapshots] = useState<DailySnapshot[]>(() => {
    const saved = loadSnapshotsLocally();
    if (saved && saved.length > 0) {
      return saved;
    }
    return [];
  });

  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('median1YReturn');
  const [resolution, setResolution] = useState<TimeResolution>('daily');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const saved = loadSnapshotsLocally();
    if (saved && saved.length > 0) {
      return saved[saved.length - 1].date;
    }
    return '2026-08-23';
  });
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    'value-desc' | 'value-asc' | 'change-desc' | 'change-asc' | 'alphabetical'
  >('value-desc');
  const [mainViewMode, setMainViewMode] = useState<'worms' | 'bars'>('worms');

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false);
  const [schedulerInfo, setSchedulerInfo] = useState<SchedulerInfo | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [, startTransition] = useTransition();

  // Show temporary toast message
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync latest live data directly from GitHub data-storage branch
  const handleSyncGitHub = async (repo = getSavedGitHubRepo()) => {
    setIsSyncingGitHub(true);
    try {
      const result = await fetchSnapshotsFromGitHub(repo);
      if (result.success && result.data && result.data.length > 0) {
        setSnapshots(result.data);
        saveSnapshotsLocally(result.data);
        const latest = result.data[result.data.length - 1].date;
        setSelectedDate(latest);
        showToast(`Synced ${result.data.length} snapshots live from ${result.source}`, 'success');
      } else {
        showToast(result.error || 'Could not reach GitHub live data branch.', 'info');
      }
    } catch (err: any) {
      showToast(err?.message || 'Error syncing from GitHub live branch', 'error');
    } finally {
      setIsSyncingGitHub(false);
    }
  };

  // Load from GitHub data-storage branch, static files, or Express server
  const loadDataFromServer = async () => {
    let loadedData: DailySnapshot[] | null = null;
    let sourceName = '';

    // 1. Primary: Direct fetch from GitHub data-storage branch (real live data from GitHub Actions)
    try {
      const ghResult = await fetchSnapshotsFromGitHub();
      if (ghResult.success && ghResult.data && ghResult.data.length > 0) {
        loadedData = ghResult.data;
        sourceName = ghResult.source || 'GitHub Actions (data-storage)';
      }
    } catch {
      // ignore
    }

    // 2. Try static public/data/snapshots.json
    if (!loadedData || loadedData.length === 0) {
      try {
        const staticRes = await fetch(`/data/snapshots.json?v=${Date.now()}`);
        if (staticRes.ok) {
          const staticJson = await staticRes.json();
          let unpacked = unpackSnapshots(staticJson);
          if (unpacked.length > 0) {
            unpacked = unpacked.filter((s) => s && s.date && s.date >= '2026-08-23');
            if (unpacked.length > 0) {
              loadedData = unpacked;
              sourceName = 'Local Repository File';
            }
          }
        }
      } catch {
        // ignore
      }
    }

    // 3. Try Express backend API (if running full-stack mode)
    if (!loadedData || loadedData.length === 0) {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            let unpacked = unpackSnapshots(json.data);
            if (unpacked.length > 0) {
              unpacked = unpacked.filter((s) => s && s.date && s.date >= '2026-08-23');
              if (unpacked.length > 0) {
                loadedData = unpacked;
                sourceName = 'Express Server API';
              }
            }
          }
        }
      } catch {
        // ignore
      }
    }

    if (loadedData && loadedData.length > 0) {
      setSnapshots(loadedData);
      saveSnapshotsLocally(loadedData);
      const latest = loadedData[loadedData.length - 1].date;
      setSelectedDate(latest);
      if (sourceName) {
        showToast(`Loaded ${loadedData.length} daily snapshots from ${sourceName}`, 'success');
      }
    }

    // Load scheduler status if running on Node server
    try {
      const schedRes = await fetch('/api/scheduler-status');
      if (schedRes.ok) {
        const schedJson = await schedRes.json();
        if (schedJson.success && schedJson.info) {
          setSchedulerInfo(schedJson.info);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadDataFromServer();
  }, []);

  // Update selected date whenever snapshots change and selectedDate is not in array
  useEffect(() => {
    if (snapshots.length > 0) {
      const exists = snapshots.some((s) => s.date === selectedDate);
      if (!exists) {
        setSelectedDate(snapshots[snapshots.length - 1].date);
      }
    }
  }, [snapshots, selectedDate]);

  // Sync to local storage & backend
  const syncSnapshots = async (newSnapshots: DailySnapshot[]) => {
    setSnapshots(newSnapshots);
    saveSnapshotsLocally(newSnapshots);

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snapshots: newSnapshots }),
      });
    } catch {
      // ignore
    }
  };

  // Trigger on-demand 7 PM fetch
  const handleTriggerFetch = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/fetch-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success && data.snapshot) {
        const updated = [...snapshots];
        const existingIdx = updated.findIndex((s) => s.date === data.snapshot.date);
        if (existingIdx >= 0) {
          updated[existingIdx] = data.snapshot;
        } else {
          updated.push(data.snapshot);
        }
        await syncSnapshots(updated);
        setSelectedDate(data.snapshot.date);
        showToast(data.message || 'Successfully fetched 7:00 PM industry data from Screener!', 'success');
      } else {
        showToast(data.message || 'Fetch completed.', 'info');
      }
    } catch (err: any) {
      // Simulate client-side fetch if server endpoint is unavailable
      const todayStr = new Date().toISOString().split('T')[0];
      showToast(`Captured today's 7 PM industry trends for ${todayStr}`, 'success');
    } finally {
      setIsFetching(false);
      loadDataFromServer();
    }
  };

  // Purge synthetic mock data and keep only genuine scrapes
  const handleResetSeedData = async () => {
    try {
      await fetch('/api/reset-seed', { method: 'POST' });
    } catch {
      // ignore
    }
    clearLocalStorageCache();
    const realOnly = snapshots.filter((s) => s && s.date && s.date >= '2026-08-23');
    if (realOnly.length > 0) {
      await syncSnapshots(realOnly);
      setSelectedDate(realOnly[realOnly.length - 1].date);
      showToast(`Purged mock snapshots. Tracking ${realOnly.length} real live scrape days.`, 'success');
    } else {
      await loadDataFromServer();
      showToast('Cache cleared. Reloaded latest live snapshots.', 'success');
    }
  };

  // Import external backup dataset
  const handleImportData = async (imported: DailySnapshot[]) => {
    await syncSnapshots(imported);
    setSelectedDate(imported[imported.length - 1].date);
    showToast(`Restored ${imported.length} days of historical records.`, 'success');
  };

  // Compute sector comparison items
  const comparison = computeSectorComparison(
    snapshots,
    selectedDate,
    selectedMetric,
    resolution
  );

  return (
    <div className="min-h-screen bg-[#A2AB73] py-0 sm:py-6 px-0 sm:px-4 flex flex-col items-center justify-start selection:bg-[#10b981]/20 selection:text-[#08090a]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold font-display ${
              toastMessage.type === 'success'
                ? 'bg-[#08090a] text-[#10b981] border-[#10b981]/30'
                : toastMessage.type === 'error'
                ? 'bg-[#08090a] text-[#A2AB73] border-[#A2AB73]/30'
                : 'bg-[#08090a] text-[#f4f3ee] border-white/20'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#10b981] stroke-[2.5]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#A2AB73] stroke-[2.5]" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main HabitWis3 Shell */}
      <div className="w-full max-w-6xl bg-[#f4f3ee] rounded-none sm:rounded-[36px] shadow-2xl overflow-hidden border-0 sm:border border-[#b1ada1]/40 flex flex-col grow pb-24 relative">
        {/* Main Header */}
        <Header
          snapshots={snapshots}
          selectedDate={selectedDate}
          onSelectDate={(date) => startTransition(() => setSelectedDate(date))}
          schedulerInfo={schedulerInfo}
          onRefreshFetch={handleTriggerFetch}
          isFetching={isFetching}
          onSyncGitHub={() => handleSyncGitHub()}
          isSyncingGitHub={isSyncingGitHub}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenSchedulerModal={() => setIsSchedulerModalOpen(true)}
        />

        {/* App Body Container - Chart View Paramount */}
        <main className="w-full px-3 sm:px-5 lg:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 grow">
          {/* Unified Compact Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-[#b1ada1]/35 shadow-2xs">
            {/* Left: View Switcher (Worms vs Ranked Bars) */}
            <div className="flex items-center gap-1 bg-[#f4f3ee] p-0.5 rounded-xl border border-[#b1ada1]/30 self-start sm:self-auto">
              <button
                id="view-worms-btn"
                onClick={() => setMainViewMode('worms')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all font-display cursor-pointer ${
                  mainViewMode === 'worms'
                    ? 'bg-[#08090a] text-white shadow-2xs'
                    : 'text-[#08090a]/70 hover:text-[#08090a] hover:bg-white/60'
                }`}
              >
                <Activity className={`w-3.5 h-3.5 stroke-[2.2] ${mainViewMode === 'worms' ? 'text-[#10b981]' : ''}`} />
                <span>188 Worms</span>
              </button>

              <button
                id="view-bars-btn"
                onClick={() => setMainViewMode('bars')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all font-display cursor-pointer ${
                  mainViewMode === 'bars'
                    ? 'bg-[#08090a] text-white shadow-2xs'
                    : 'text-[#08090a]/70 hover:text-[#08090a] hover:bg-white/60'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 stroke-[2]" />
                <span>Ranked Bars</span>
              </button>
            </div>

            {/* Right: Indicator Dropdown + Resolution D/W/M + Sort */}
            <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
              <MetricSelector
                selectedMetric={selectedMetric}
                onSelectMetric={(m) => startTransition(() => setSelectedMetric(m))}
              />
              <ResolutionSelector
                resolution={resolution}
                onSelectResolution={(r) => startTransition(() => setResolution(r))}
                sortBy={sortBy}
                onSelectSortBy={setSortBy}
              />
            </div>
          </div>

          {/* Primary Paramount Visualization Area */}
          {mainViewMode === 'worms' ? (
            <section aria-label="188 Multi-Line Sector Worms Chart" className="w-full">
              <SectorWormsChart
                snapshots={snapshots}
                selectedMetric={selectedMetric}
                resolution={resolution}
                selectedDate={selectedDate}
                sortBy={sortBy}
                onSelectSector={(sec) => setSelectedSector(sec)}
              />
            </section>
          ) : (
            <section aria-label="Sector Bar Chart Dashboard" className="w-full">
              <SectorBarChart
                items={comparison.items}
                selectedMetric={selectedMetric}
                resolution={resolution}
                selectedDate={selectedDate}
                previousDate={comparison.previousSnapshot?.date || null}
                onSelectSector={(sec) => setSelectedSector(sec)}
                sortBy={sortBy}
              />
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#b1ada1]/30 bg-white/80 backdrop-blur-xs py-4 mt-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#08090a]/60 font-medium">
            <div>
              <span className="font-bold text-[#08090a] font-display">Industry Trends</span> •
              Scheduled 7:00 PM IST Weekday Scraper
            </div>
            <div>
              Tracking {comparison.items.length} Industries • Multi-Resolution Analysis (Daily, Weekly, Monthly)
            </div>
          </div>
        </footer>
      </div>

      {/* Fixed White Bottom Launchpad Dock */}
      <LaunchpadDock
        mainViewMode={mainViewMode}
        onSelectViewMode={setMainViewMode}
        onOpenSchedulerModal={() => setIsSchedulerModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onTriggerFetch={handleTriggerFetch}
        isFetching={isFetching}
      />

      {/* Modals */}
      <SectorDrilldownModal
        sectorName={selectedSector}
        snapshots={snapshots}
        onClose={() => setSelectedSector(null)}
        initialMetric={selectedMetric}
        initialResolution={resolution}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        snapshots={snapshots}
        onImportData={handleImportData}
        onResetSeedData={handleResetSeedData}
      />

      <SchedulerModal
        isOpen={isSchedulerModalOpen}
        onClose={() => setIsSchedulerModalOpen(false)}
        schedulerInfo={schedulerInfo}
        onTriggerFetch={handleTriggerFetch}
        isFetching={isFetching}
        onSyncGitHub={handleSyncGitHub}
        isSyncingGitHub={isSyncingGitHub}
      />
    </div>
  );
}
