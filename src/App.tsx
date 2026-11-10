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
    // This button only reloads the last saved snapshot. New market data is
    // collected automatically by the three scheduled GitHub Actions runs.
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/stocks-snapshot?reload=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result?.success || !result.stocks || !Object.keys(result.stocks).length) {
        throw new Error('The saved stock snapshot is unavailable');
      }
      const savedAt = typeof result.fetchedAt === 'string' ? Date.parse(result.fetchedAt) : NaN;
      const when = Number.isFinite(savedAt)
        ? new Date(savedAt).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short',
            hour: '2-digit', minute: '2-digit'
          }) + ' IST'
        : 'unknown time';
      setSyncTrigger(previous => previous + 1);
      showToast(`Reloading saved market snapshot (collected ${when}). New prices are collected automatically at 6:30 PM, 2 AM and 4 AM IST.`, 'info');
    } catch (error) {
      showToast(`Could not reload saved market data: ${error instanceof Error ? error.message : 'unknown error'}. Existing data retained.`, 'error');
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
              <span>62 custom sector baskets with explicit core and adjacent exposures</span>
            </div>
            <div className="text-[11px]">
              Price-based sector rotation and breadth vs NIFTY 50, NIFTY 500 and ETF proxies
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
