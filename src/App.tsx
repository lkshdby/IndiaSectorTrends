import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { IndexTrackerView } from './components/IndexTrackerView';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { fetchCommittedMarketSnapshot, type BrowserMarketSnapshot } from './utils/marketSnapshotClient';

export default function App() {
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const [isSyncing, setIsSyncing] = useState(false);
  const [marketSnapshot, setMarketSnapshot] = useState<BrowserMarketSnapshot | null>(null);
  const [snapshotLoadError, setSnapshotLoadError] = useState<string | null>(null);
  const loadSequence = useRef(0);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // A static Vite site should read a public, committed JSON snapshot directly,
  // not depend on Vercel functions that may be absent from the deployment.
  useEffect(() => {
    const sequence = ++loadSequence.current;
    fetchCommittedMarketSnapshot()
      .then(snapshot => {
        if (sequence !== loadSequence.current) return;
        setMarketSnapshot(snapshot);
        setSnapshotLoadError(null);
      })
      .catch(error => {
        if (sequence !== loadSequence.current) return;
        const message = error instanceof Error ? error.message : 'Unknown network error';
        console.warn('Latest committed market data unavailable; using bundled snapshot:', message);
        setSnapshotLoadError(message);
      });
    return () => { loadSequence.current++; };
  }, []);

  const formatCollectionTime = (timestamp: string) =>
    new Date(timestamp).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    }) + ' IST';

  const handleSyncMarketCloses = async () => {
    setIsSyncing(true);
    const sequence = ++loadSequence.current;
    try {
      const latest = await fetchCommittedMarketSnapshot();
      if (sequence !== loadSequence.current) return;
      const hadLatest = marketSnapshot?.fetchedAt === latest.fetchedAt;
      setMarketSnapshot(latest);
      setSnapshotLoadError(null);
      const time = formatCollectionTime(latest.fetchedAt);
      showToast(hadLatest
        ? `Already showing the latest saved prices (${time}, from ${latest.source}).`
        : `Loaded saved market data collected ${time} from ${latest.source}.`,
        hadLatest ? 'info' : 'success'
      );
    } catch (error) {
      if (sequence !== loadSequence.current) return;
      const message = error instanceof Error ? error.message : 'Unknown network error';
      setSnapshotLoadError(message);
      showToast(`Could not load saved market data: ${message}. Existing prices retained.`, 'error');
    } finally {
      if (sequence === loadSequence.current) setIsSyncing(false);
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
        <Header onRefresh={handleSyncMarketCloses} isSyncing={isSyncing} savedAt={marketSnapshot?.fetchedAt} snapshotSource={marketSnapshot?.source} loadError={!!snapshotLoadError} />

        {/* Master Sector Rotation & Co-Movement Engine */}
        <main className="w-full px-3 sm:px-5 lg:px-6 py-4 flex-1 flex flex-col min-h-0">
          <IndexTrackerView onShowToast={showToast} marketSnapshot={marketSnapshot} />
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
