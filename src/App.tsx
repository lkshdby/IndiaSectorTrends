import React, { useState } from 'react';
import { Header } from './components/Header';
import { IndexTrackerView } from './components/IndexTrackerView';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTrigger, setSyncTrigger] = useState(0);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSyncMarketCloses = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/sync-universe', { method: 'POST' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result.success || !result.updatedStocksCount) {
        throw new Error('No fresh stock histories could be retrieved');
      }
      const benchmarksResponse = await fetch('/api/benchmarks?force=true');
      const benchmarksResult = benchmarksResponse.ok ? await benchmarksResponse.json() : null;
      setSyncTrigger(previous => previous + 1);
      const requested = result.totalRequestedCount || result.updatedStocksCount;
      const coverage = `${result.updatedStocksCount}/${requested}`;
      const allBenchmarks = benchmarksResult?.success &&
        Object.keys(benchmarksResult.benchmarks || {}).length === 4;
      showToast(
        `Refreshed ${coverage} stock histories; benchmarks ${allBenchmarks ? 'available' : 'incomplete'}. ${result.updatedStocksCount < requested ? 'Some older quotes remain cached.' : ''}`,
        allBenchmarks && result.updatedStocksCount === requested ? 'success' : 'info'
      );
    } catch (error) {
      showToast(`Market refresh failed: ${error instanceof Error ? error.message : 'unknown error'}. Existing data retained.`, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edece6] flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4 text-[#08090a] font-sans selection:bg-[#2563eb]/20 selection:text-[#2563eb]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-none">
          <div
            className={`px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold font-display ${
              toastMessage.type === 'success'
                ? 'bg-[#08090a] text-white border border-[#10b981]/50'
                : toastMessage.type === 'error'
                ? 'bg-[#e11d48] text-white'
                : 'bg-[#08090a] text-white border border-[#b1ada1]/40'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#10b981] stroke-[2.5]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#f59e0b] stroke-[2.5]" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-7xl bg-[#f4f3ee] rounded-none sm:rounded-[36px] shadow-2xl overflow-hidden border-0 sm:border border-[#b1ada1]/40 flex flex-col grow pb-6 relative">
        {/* Main Header */}
        <Header onRefresh={handleSyncMarketCloses} isSyncing={isSyncing} />

        {/* Master Sector Rotation & Co-Movement Engine */}
        <main className="w-full px-3 sm:px-5 lg:px-6 py-4 flex-1 flex flex-col min-h-0">
          <IndexTrackerView onShowToast={showToast} syncTrigger={syncTrigger} />
        </main>

        {/* Sleek Footer */}
        <footer className="border-t border-[#b1ada1]/25 bg-white/70 backdrop-blur-xs py-3.5 mt-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#08090a]/60 font-medium">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#08090a] font-display">Sector Rotation Engine</span>
              <span>•</span>
              <span>62 Pre-Built Industry Clusters (456 Stocks) mapped to NSE 500, BSE 500 & New-Age IPOs</span>
            </div>
            <div className="text-[11px]">
              Multi-Stock Price Overlays & Cluster Breadth Tracking vs NIFTY 50, Midcap 100 & Smallcap 100
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
