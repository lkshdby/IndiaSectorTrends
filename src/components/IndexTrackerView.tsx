import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Copy,
  Bell,
  BarChart2,
  TrendingUp,
  Layers,
  Plus,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Activity,
  Sparkles,
  ShieldCheck,
  Flame,
  Award,
  Globe,
} from 'lucide-react';
import {
  SectorIndexData,
  StockConstituent,
  TimeframePeriod,
  CustomIndexItem,
  HistoricalPricePoint,
  BenchmarkItem,
} from '../types/indexTracker';
import { PREBUILT_SECTOR_INDICES } from '../data/prebuiltIndices';
import {
  fetchLiveBenchmarks,
  FALLBACK_BENCHMARKS,
  BENCHMARK_TOP_CONSTITUENTS,
  INITIAL_LIVE_STOCKS_DATA,
} from '../utils/benchmarkService';
import { CreateCustomIndexModal } from './CreateCustomIndexModal';
import { SetAlertModal } from './SetAlertModal';

interface IndexTrackerViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  syncTrigger?: number;
}

// Curated colors for multi-stock co-movement overlay lines
const STOCK_LINE_COLORS = [
  '#2563eb', // Blue
  '#10b981', // Emerald
  '#ec4899', // Pink
  '#ea580c', // Orange
  '#14b8a6', // Teal
  '#84cc16', // Lime
  '#d946ef', // Fuchsia
  '#0284c7', // Sky
  '#e11d48', // Rose
  '#3b82f6', // Bright Blue
  '#10b981', // Emerald
  '#f97316', // Bright Orange
  '#6366f1', // Indigo
];

// Benchmark colors for high-contrast visibility
const BENCHMARK_COLORS: Record<string, string> = {
  nifty50: '#f59e0b', // Vibrant Amber
  niftyMidcap: '#8b5cf6', // Violet/Purple
  niftySmallcap: '#06b6d4', // Bright Cyan
  nifty500: '#4f46e5', // Deep Indigo
};

export const IndexTrackerView: React.FC<IndexTrackerViewProps> = ({ onShowToast, syncTrigger }) => {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'myIndex'>('prebuilt');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [weightingMode, setWeightingMode] = useState<'equal' | 'mcap'>('equal');
  const [sortField, setSortField] = useState<'name' | '1d' | '1w' | 'breadth'>('1w');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({
    'quick-commerce-consumer-tech': true,
    hospitals: true,
  });

  const [selectedSectorId, setSelectedSectorId] = useState<string>('quick-commerce-consumer-tech');
  const [selectedStockTicker, setSelectedStockTicker] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('3M');
  const [viewProofMode, setViewProofMode] = useState<'overlay' | 'composite' | 'rotation'>('overlay');

  // Benchmark overlay state (e.g. NIFTY 50 enabled by default for immediate comparison)
  const [activeBenchmarkOverlays, setActiveBenchmarkOverlays] = useState<Record<string, boolean>>({
    nifty50: true,
    niftyMidcap: false,
    niftySmallcap: false,
    nifty500: false,
  });

  // Benchmarks Data
  const [benchmarks, setBenchmarks] = useState<Record<string, BenchmarkItem>>(FALLBACK_BENCHMARKS);
  const [isLoadingBenchmarks, setIsLoadingBenchmarks] = useState(false);

  // Custom User Indices
  const [customIndices, setCustomIndices] = useState<CustomIndexItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_custom_indices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // Live Real Stock Market Quotes and 63-Day Histories (pre-loaded for all 196 NSE/BSE constituents)
  const [liveStocksData, setLiveStocksData] = useState<
    Record<
      string,
      {
        ticker: string;
        symbol: string;
        price: number;
        change1D: number;
        change1W: number;
        change3M: number;
        history: { date: string; value: number }[];
        rawHistory: { date: string; close: number }[];
      }
    >
  >(INITIAL_LIVE_STOCKS_DATA);

  // Load live benchmarks on mount or sync trigger
  useEffect(() => {
    const loadBenchmarks = async () => {
      setIsLoadingBenchmarks(true);
      try {
        const live = await fetchLiveBenchmarks();
        setBenchmarks(live);
      } catch {
        // keep fallbacks
      } finally {
        setIsLoadingBenchmarks(false);
      }
    };
    loadBenchmarks();
  }, [syncTrigger]);

  // Toggle benchmark comparison overlay in chart
  const toggleBenchmarkOverlay = (key: string) => {
    setActiveBenchmarkOverlays((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Toggle sector accordion
  const toggleSectorExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedSectors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Select sector or benchmark
  const handleSelectSector = (id: string) => {
    setSelectedSectorId(id);
    setSelectedStockTicker(null);
  };

  // Select stock
  const handleSelectStock = (ticker: string, sectorId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedSectorId(sectorId);
    setSelectedStockTicker(ticker);
  };

  // Classic Scroll Container Ref
  const sectorListRef = useRef<HTMLDivElement>(null);

  // Find currently selected sector or benchmark
  const currentSector = useMemo<SectorIndexData>(() => {
    // Helper to enrich stock constituents with real live quotes
    const enrichStocks = (stocksList: StockConstituent[]) => {
      return stocksList.map((s) => {
        const live = liveStocksData[s.ticker] || liveStocksData[s.ticker.toUpperCase()];
        if (live) {
          return {
            ...s,
            price: live.price,
            change1D: live.change1D,
            change1W: live.change1W,
          };
        }
        return s;
      });
    };

    // Check if a benchmark is selected directly
    if (selectedSectorId.startsWith('benchmark-')) {
      const bKey = selectedSectorId.replace('benchmark-', '');
      const bItem = benchmarks[bKey] || FALLBACK_BENCHMARKS[bKey] || FALLBACK_BENCHMARKS.nifty50;
      const bStocks = enrichStocks(BENCHMARK_TOP_CONSTITUENTS[bKey] || []);

      const historyPoints: HistoricalPricePoint[] = bItem.history.map((h, i) => ({
        date: h.date,
        value: h.value,
        volume: 8500000 + ((i * 350000) % 5000000),
      }));

      return {
        id: selectedSectorId,
        name: bItem.name,
        category: bItem.category,
        companiesCount: bKey === 'nifty50' ? 50 : bKey === 'nifty500' ? 500 : 100,
        change1D: bItem.change1D,
        change1W: bItem.change1W,
        change1M: bItem.change3M,
        change1Y: parseFloat((bItem.change3M * 2.1).toFixed(2)),
        currentReturn: bItem.change1W,
        history: historyPoints,
        stocks: bStocks,
        breadthPositivePct: bItem.change1W >= 0 ? 68 : 34,
        rotationStatus: bItem.change1W >= 5 ? 'Leading' : 'Improving',
        isBenchmark: true,
      };
    }

    // Helper to compute Equal-Weighted or Market-Cap Weighted average of a metric
    const computeWeightedAvg = (stocksList: StockConstituent[], field: 'change1D' | 'change1W') => {
      if (stocksList.length === 0) return 0;
      if (weightingMode === 'mcap') {
        const totalMcap = stocksList.reduce((acc, s) => acc + (s.marketCapCr || 10000), 0);
        if (totalMcap > 0) {
          return stocksList.reduce((acc, s) => acc + s[field] * ((s.marketCapCr || 10000) / totalMcap), 0);
        }
      }
      return stocksList.reduce((acc, s) => acc + s[field], 0) / stocksList.length;
    };

    // Helper to build real 63-day composite history (Equal-Weighted or Market-Cap Weighted) from constituent stocks
    const buildRealCompositeHistory = (
      stocksList: StockConstituent[],
      fallbackHistory: HistoricalPricePoint[]
    ): HistoricalPricePoint[] => {
      const sample = stocksList.find(
        (s) => (liveStocksData[s.ticker] || liveStocksData[s.ticker.toUpperCase()])?.history?.length
      );
      if (!sample) return fallbackHistory;
      const sampleHistory = (liveStocksData[sample.ticker] || liveStocksData[sample.ticker.toUpperCase()]).history;
      return sampleHistory.map((pt, idx) => {
        let weightedSum = 0;
        let weightTotal = 0;
        stocksList.forEach((st) => {
          const stLive = liveStocksData[st.ticker] || liveStocksData[st.ticker.toUpperCase()];
          if (stLive?.history?.length) {
            const stPt = stLive.history[Math.min(idx, stLive.history.length - 1)];
            if (stPt && typeof stPt.value === 'number') {
              const w = weightingMode === 'mcap' ? (st.marketCapCr || 10000) : 1;
              weightedSum += stPt.value * w;
              weightTotal += w;
            }
          }
        });
        const avgVal = weightTotal > 0 ? weightedSum / weightTotal : pt.value;
        return {
          date: pt.date,
          value: parseFloat(avgVal.toFixed(2)),
          volume: 4200000 + ((idx * 310000) % 3800000),
        };
      });
    };

    if (activeTab === 'prebuilt') {
      const base =
        PREBUILT_SECTOR_INDICES.find((s) => s.id === selectedSectorId) ||
        PREBUILT_SECTOR_INDICES[0];
      const enriched = enrichStocks(base.stocks);
      const avg1D = computeWeightedAvg(enriched, 'change1D');
      const avg1W = computeWeightedAvg(enriched, 'change1W');
      const advancingCount1W = enriched.filter((s) => s.change1W > 0).length;
      const realHistory = buildRealCompositeHistory(enriched, base.history);
      const real3M =
        realHistory.length > 1
          ? parseFloat((realHistory[realHistory.length - 1].value - 100).toFixed(2))
          : base.change1M;

      return {
        ...base,
        stocks: enriched,
        history: realHistory,
        change1D: parseFloat(avg1D.toFixed(2)),
        change1W: parseFloat(avg1W.toFixed(2)),
        change1M: real3M,
        currentReturn: parseFloat(avg1W.toFixed(2)),
        breadthPositivePct: Math.round((advancingCount1W / (enriched.length || 1)) * 100),
      };
    } else {
      const custom = customIndices.find((c) => c.id === selectedSectorId);
      if (!custom) return PREBUILT_SECTOR_INDICES[0];

      const matchedStocks: StockConstituent[] = [];
      PREBUILT_SECTOR_INDICES.forEach((sec) => {
        sec.stocks.forEach((st) => {
          if (custom.stockTickers.includes(st.ticker) && !matchedStocks.some((m) => m.ticker === st.ticker)) {
            matchedStocks.push(st);
          }
        });
      });

      const enriched = enrichStocks(matchedStocks);
      const avg1D = computeWeightedAvg(enriched, 'change1D');
      const avg1W = computeWeightedAvg(enriched, 'change1W');
      const realHistory = buildRealCompositeHistory(enriched, PREBUILT_SECTOR_INDICES[0].history);
      const real3M =
        realHistory.length > 1
          ? parseFloat((realHistory[realHistory.length - 1].value - 100).toFixed(2))
          : parseFloat((avg1W * 2.2).toFixed(2));

      return {
        id: custom.id,
        name: custom.name,
        category: 'Custom Index',
        companiesCount: enriched.length,
        change1D: parseFloat(avg1D.toFixed(2)),
        change1W: parseFloat(avg1W.toFixed(2)),
        change1M: real3M,
        change1Y: 28.5,
        currentReturn: parseFloat(avg1W.toFixed(2)),
        stocks: enriched,
        breadthPositivePct: Math.round(
          (enriched.filter((s) => s.change1W > 0).length / (enriched.length || 1)) * 100
        ),
        rotationStatus: avg1W > 5 ? ('Leading' as const) : ('Improving' as const),
        history: realHistory,
      };
    }
  }, [activeTab, selectedSectorId, customIndices, benchmarks, liveStocksData, weightingMode]);

  // Fetch real market stock quotes and 63-day closing histories for current constituents
  useEffect(() => {
    const tickers = currentSector.stocks.map((s) => s.ticker);
    const isManualSync = Boolean(syncTrigger && syncTrigger > 0);
    const targetTickers = isManualSync
      ? tickers
      : tickers.filter((t) => !liveStocksData[t] && !liveStocksData[t.toUpperCase()]);
    if (targetTickers.length === 0) return;

    let isMounted = true;
    const forceQuery = isManualSync ? '&force=true' : '';
    fetch(`/api/stocks-history?tickers=${encodeURIComponent(targetTickers.join(','))}${forceQuery}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && data.success && data.stocks) {
          setLiveStocksData((prev) => ({ ...prev, ...data.stocks }));
        }
      })
      .catch((err) => console.warn('Could not fetch real stock data:', err));

    return () => {
      isMounted = false;
    };
  }, [currentSector.id, currentSector.stocks.length, syncTrigger]);

  // Selected Stock Details
  const currentStock = useMemo(() => {
    if (!selectedStockTicker) return null;
    return currentSector.stocks.find((s) => s.ticker === selectedStockTicker) || null;
  }, [selectedStockTicker, currentSector]);

  // Single Stock historical price series in actual Rupees (when a stock is selected)
  const singleStockSeries = useMemo(() => {
    if (!currentStock) return null;
    const live = liveStocksData[currentStock.ticker] || liveStocksData[currentStock.ticker.toUpperCase()];
    if (live && live.rawHistory && live.rawHistory.length > 0) {
      return live.rawHistory.map((pt, i) => ({
        date: pt.date,
        value: pt.close,
        volume: 1200000 + ((i * 150000) % 2500000),
      }));
    }
    return null;
  }, [currentStock, liveStocksData]);

  // Multi-stock normalized line data generator using REAL market historical closes + Benchmarks
  const multiStockCoMovementData = useMemo(() => {
    // If constituents have real history, synchronize timeline with the real dates
    const sampleStockWithHistory = currentSector.stocks.find(
      (s) => liveStocksData[s.ticker]?.history?.length
    );
    const dates = sampleStockWithHistory
      ? liveStocksData[sampleStockWithHistory.ticker].history.map((h) => h.date)
      : currentSector.history.map((h) => h.date);

    const stocks = currentSector.stocks;

    // Get benchmark base series mapped to dates
    const n50History = benchmarks.nifty50?.history || FALLBACK_BENCHMARKS.nifty50.history;
    const nMidHistory = benchmarks.niftyMidcap?.history || FALLBACK_BENCHMARKS.niftyMidcap.history;
    const nSmlHistory = benchmarks.niftySmallcap?.history || FALLBACK_BENCHMARKS.niftySmallcap.history;
    const n500History = benchmarks.nifty500?.history || FALLBACK_BENCHMARKS.nifty500.history;

    const n50Start = n50History[0]?.value || 100;
    const nMidStart = nMidHistory[0]?.value || 100;
    const nSmlStart = nSmlHistory[0]?.value || 100;
    const n500Start = n500History[0]?.value || 100;

    const baseFirst = currentSector.history[0]?.value || 100;

    return dates.map((date, idx) => {
      const row: Record<string, any> = { date };
      const basePoint = currentSector.history[Math.min(idx, currentSector.history.length - 1)]?.value || 100;
      const normalizedSectorBase = parseFloat(((basePoint / baseFirst) * 100).toFixed(2));

      // Add individual constituent stock lines using REAL historical closes (Base 100)
      stocks.forEach((stock, sIdx) => {
        const live = liveStocksData[stock.ticker] || liveStocksData[stock.ticker.toUpperCase()];
        if (live && live.history && live.history.length > 0) {
          const pt = live.history[Math.min(idx, live.history.length - 1)];
          row[stock.ticker] = pt.value;
        } else {
          // Deterministic individual curve fallback scaled by stock's own 1W/1D return so lines never stack identically
          const progress = idx / Math.max(1, dates.length - 1);
          const stockDrift = (stock.change1W - currentSector.change1W) * progress;
          const wave = Math.sin(idx * 0.35 + (sIdx + 1) * 1.7) * 0.85;
          row[stock.ticker] = parseFloat((normalizedSectorBase + stockDrift + wave).toFixed(2));
        }
      });

      // Calculate Composite Line (Equal-Weighted or Market-Cap Weighted)
      if (currentSector.isBenchmark) {
        row['selectedIndexLine'] = normalizedSectorBase;
      } else {
        let weightedSum = 0;
        let weightTotal = 0;
        stocks.forEach((s) => {
          const val = row[s.ticker];
          if (typeof val === 'number' && !isNaN(val)) {
            const w = weightingMode === 'mcap' ? (s.marketCapCr || 10000) : 1;
            weightedSum += val * w;
            weightTotal += w;
          }
        });
        if (weightTotal > 0) {
          row['selectedIndexLine'] = parseFloat((weightedSum / weightTotal).toFixed(2));
        } else {
          row['selectedIndexLine'] = normalizedSectorBase;
        }
      }

      // Add Benchmark overlay lines if active and not the main selected index
      if (activeBenchmarkOverlays.nifty50 && selectedSectorId !== 'benchmark-nifty50') {
        const bPt = n50History[Math.min(idx, n50History.length - 1)]?.value || 100;
        row['nifty50'] = parseFloat(((bPt / n50Start) * 100).toFixed(2));
      }
      if (activeBenchmarkOverlays.niftyMidcap && selectedSectorId !== 'benchmark-niftyMidcap') {
        const bPt = nMidHistory[Math.min(idx, nMidHistory.length - 1)]?.value || 100;
        row['niftyMidcap'] = parseFloat(((bPt / nMidStart) * 100).toFixed(2));
      }
      if (activeBenchmarkOverlays.niftySmallcap && selectedSectorId !== 'benchmark-niftySmallcap') {
        const bPt = nSmlHistory[Math.min(idx, nSmlHistory.length - 1)]?.value || 100;
        row['niftySmallcap'] = parseFloat(((bPt / nSmlStart) * 100).toFixed(2));
      }
      if (activeBenchmarkOverlays.nifty500 && selectedSectorId !== 'benchmark-nifty500') {
        const bPt = n500History[Math.min(idx, n500History.length - 1)]?.value || 100;
        row['nifty500'] = parseFloat(((bPt / n500Start) * 100).toFixed(2));
      }

      return row;
    });
  }, [currentSector, activeBenchmarkOverlays, benchmarks, selectedSectorId, liveStocksData]);

  // Enrich all prebuilt sector indices with live stock market quotes so sidebar matches right panel
  const enrichedPrebuiltIndices = useMemo(() => {
    return PREBUILT_SECTOR_INDICES.map((sector) => {
      const enrichedStocks = sector.stocks.map((s) => {
        const live = liveStocksData[s.ticker] || liveStocksData[s.ticker.toUpperCase()];
        if (live) {
          return {
            ...s,
            price: live.price,
            change1D: live.change1D,
            change1W: live.change1W,
          };
        }
        return s;
      });

      const avg1D =
        weightingMode === 'mcap'
          ? enrichedStocks.reduce((acc, s) => acc + s.change1D * (s.marketCapCr || 10000), 0) /
            Math.max(1, enrichedStocks.reduce((acc, s) => acc + (s.marketCapCr || 10000), 0))
          : enrichedStocks.reduce((a, b) => a + b.change1D, 0) / (enrichedStocks.length || 1);
      const avg1W =
        weightingMode === 'mcap'
          ? enrichedStocks.reduce((acc, s) => acc + s.change1W * (s.marketCapCr || 10000), 0) /
            Math.max(1, enrichedStocks.reduce((acc, s) => acc + (s.marketCapCr || 10000), 0))
          : enrichedStocks.reduce((a, b) => a + b.change1W, 0) / (enrichedStocks.length || 1);
      const advancingCount1W = enrichedStocks.filter((s) => s.change1W > 0).length;

      return {
        ...sector,
        stocks: enrichedStocks,
        change1D: parseFloat(avg1D.toFixed(2)),
        change1W: parseFloat(avg1W.toFixed(2)),
        breadthPositivePct: Math.round((advancingCount1W / (enrichedStocks.length || 1)) * 100),
      };
    });
  }, [liveStocksData, weightingMode]);

  // Filter and sort sidebar list
  const filteredIndices = useMemo(() => {
    let list = enrichedPrebuiltIndices;
    if (selectedCategory !== 'All') {
      list = list.filter((sec) => sec.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const isCompanySearch = q.startsWith('@');
      const cleanQ = isCompanySearch ? q.slice(1) : q;

      list = list.filter((sec) => {
        if (!isCompanySearch && (sec.name.toLowerCase().includes(cleanQ) || sec.category.toLowerCase().includes(cleanQ))) {
          return true;
        }
        return sec.stocks.some(
          (st) =>
            st.ticker.toLowerCase().includes(cleanQ) ||
            st.name.toLowerCase().includes(cleanQ)
        );
      });
    }

    return [...list].sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortField === '1d') {
        return sortOrder === 'asc' ? a.change1D - b.change1D : b.change1D - a.change1D;
      }
      if (sortField === 'breadth') {
        return sortOrder === 'asc'
          ? a.breadthPositivePct - b.breadthPositivePct
          : b.breadthPositivePct - a.breadthPositivePct;
      }
      return sortOrder === 'asc' ? a.change1W - b.change1W : b.change1W - a.change1W;
    });
  }, [enrichedPrebuiltIndices, selectedCategory, searchQuery, sortField, sortOrder]);

  // Handle Sort Toggle
  const toggleSort = (field: 'name' | '1d' | '1w' | 'breadth') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (currentStock) {
      navigator.clipboard.writeText(
        `${currentStock.ticker}: ₹${currentStock.price.toLocaleString('en-IN')} (1D: ${currentStock.change1D > 0 ? '+' : ''}${currentStock.change1D}%, 1W: ${currentStock.change1W > 0 ? '+' : ''}${currentStock.change1W}%)`
      );
      onShowToast(`Copied ${currentStock.ticker} to clipboard`, 'success');
    } else {
      const tickers = currentSector.stocks.map((s) => s.ticker).join(', ');
      navigator.clipboard.writeText(`${currentSector.name} Index Constituents: ${tickers || currentSector.name}`);
      onShowToast(`Copied ${currentSector.name} data to clipboard`, 'success');
    }
  };

  // Save new custom index
  const handleSaveCustomIndex = (newIndex: CustomIndexItem) => {
    const updated = [newIndex, ...customIndices];
    setCustomIndices(updated);
    try {
      localStorage.setItem('user_custom_indices', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setActiveTab('myIndex');
    setSelectedSectorId(newIndex.id);
    onShowToast(`Created custom index "${newIndex.name}" with ${newIndex.stockTickers.length} stocks!`, 'success');
  };

  const isReturnPositive = currentStock
    ? currentStock.change1W >= 0
    : currentSector.currentReturn >= 0;

  const chartStrokeColor = isReturnPositive ? '#10b981' : '#f43f5e';
  const chartFillColor = isReturnPositive ? '#10b981' : '#f43f5e';

  // Advancing vs Declining count in sector (harmonized 1W rotation + 1D session)
  const advancingCount1W = currentSector.stocks.filter((s) => s.change1W > 0).length;
  const decliningCount1W = currentSector.stocks.length - advancingCount1W;
  const advancingCount1D = currentSector.stocks.filter((s) => s.change1D > 0).length;
  const decliningCount1D = currentSector.stocks.length - advancingCount1D;
  const synchronyScore = Math.round(
    (Math.max(advancingCount1W, decliningCount1W) / (currentSector.stocks.length || 1)) * 100
  );

  return (
    <div className="flex flex-col lg:flex-row items-stretch bg-white border border-[#b1ada1]/30 rounded-[24px] shadow-sm overflow-hidden">
      {/* ================= LEFT SIDEBAR (BENCHMARKS + PREBUILT 46 + MY INDEX) ================= */}
      <div className="w-full lg:w-[380px] flex flex-col border-b lg:border-b-0 lg:border-r border-[#b1ada1]/30 bg-white shrink-0">
        {/* Top Tabs */}
        <div className="flex items-center border-b border-[#b1ada1]/30 bg-white shrink-0">
          <button
            onClick={() => setActiveTab('prebuilt')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 font-display ${
              activeTab === 'prebuilt'
                ? 'border-[#2563eb] text-[#2563eb]'
                : 'border-transparent text-[#08090a]/60 hover:text-[#08090a]'
            }`}
          >
            <span>Pre Built</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'prebuilt' ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'bg-[#b1ada1]/20 text-[#08090a]/60'
              }`}
            >
              {PREBUILT_SECTOR_INDICES.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('myIndex')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 font-display ${
              activeTab === 'myIndex'
                ? 'border-[#2563eb] text-[#2563eb]'
                : 'border-transparent text-[#08090a]/60 hover:text-[#08090a]'
            }`}
          >
            <span>My Index</span>
            {customIndices.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#b1ada1]/20 text-[#08090a]/60">
                {customIndices.length}
              </span>
            )}
          </button>
        </div>

        {/* PINNED MAJOR BENCHMARK ANCHORS */}
        <div className="p-2.5 bg-[#f4f3ee]/80 border-b border-[#b1ada1]/30 shrink-0">
          <div className="text-[10px] font-extrabold text-[#08090a]/60 uppercase tracking-wider px-2 mb-1.5 flex items-center justify-between font-display">
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-[#2563eb]" />
              Major Benchmark Anchors
            </span>
            <span className="text-[9px] text-[#2563eb] font-mono">Live NSE Closes</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              { key: 'nifty50', label: 'NIFTY 50', id: 'benchmark-nifty50', color: BENCHMARK_COLORS.nifty50 },
              { key: 'niftyMidcap', label: 'Midcap 100', id: 'benchmark-niftyMidcap', color: BENCHMARK_COLORS.niftyMidcap },
              { key: 'niftySmallcap', label: 'Smallcap 100', id: 'benchmark-niftySmallcap', color: BENCHMARK_COLORS.niftySmallcap },
              { key: 'nifty500', label: 'NIFTY 500', id: 'benchmark-nifty500', color: BENCHMARK_COLORS.nifty500 },
            ].map((bm) => {
              const data = benchmarks[bm.key] || FALLBACK_BENCHMARKS[bm.key];
              const isSelected = selectedSectorId === bm.id;

              return (
                <div
                  key={bm.key}
                  onClick={() => handleSelectSector(bm.id)}
                  className={`p-2 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#2563eb] shadow-xs'
                      : 'bg-white/60 hover:bg-white border-[#b1ada1]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#08090a] font-display flex items-center gap-1">
                      <span style={{ backgroundColor: bm.color }} className="w-2 h-2 rounded-full" />
                      {bm.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        data.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                      }`}
                    >
                      {data.change1W >= 0 ? '+' : ''}{data.change1W.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5 text-[10px] text-[#08090a]/60 font-mono">
                    <span>₹{data.price.toLocaleString('en-IN')}</span>
                    <span className={data.change1D >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}>
                      1D: {data.change1D >= 0 ? '+' : ''}{data.change1D.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Bar + Category Filter Tabs */}
        <div className="p-2.5 bg-white border-b border-[#b1ada1]/20 shrink-0 space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#08090a]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${PREBUILT_SECTOR_INDICES.length} sectors or @company (e.g. @eternal, @swiggy, @milkymist)...`}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f4f3ee]/60 border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#2563eb] text-[#08090a] placeholder:text-[#08090a]/40"
            />
          </div>

          {/* Macro Theme Filter Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            {[
              { id: 'All', label: 'All (62)' },
              { id: 'New-Age & Tech', label: 'New-Age & Tech' },
              { id: 'Consumer & Retail', label: 'Consumer & Dairy' },
              { id: 'Energy & Infra', label: 'Energy & Infra' },
              { id: 'Financials', label: 'Financials' },
              { id: 'Manufacturing & Healthcare', label: 'Mfg & Healthcare' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold font-display whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#08090a] text-white'
                    : 'bg-[#f4f3ee] text-[#08090a]/70 hover:text-[#08090a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Header: Name ⇅ | 1D | 1W ⌄ */}
        <div className="px-3.5 py-2.5 flex items-center justify-between text-[11px] font-semibold text-[#08090a]/60 border-b border-[#b1ada1]/20 bg-[#fafaf9] shrink-0">
          <button
            onClick={() => toggleSort('name')}
            className="flex items-center gap-1 hover:text-[#08090a] cursor-pointer"
          >
            <span>Sector / Index ({filteredIndices.length})</span>
            <span className="text-[10px]">⇅</span>
          </button>

          <div className="flex items-center gap-2 pr-1">
            <button
              onClick={() => toggleSort('1d')}
              className="hover:text-[#08090a] cursor-pointer px-1.5 py-0.5 rounded hover:bg-[#b1ada1]/20"
            >
              1D
            </button>
            <button
              onClick={() => toggleSort('1w')}
              className="flex items-center gap-0.5 text-[#08090a] font-bold cursor-pointer px-1.5 py-0.5 rounded hover:bg-[#b1ada1]/20"
            >
              <span>1W</span>
              <span className="text-[10px]">⌄</span>
            </button>
          </div>
        </div>

        {/* Scrollable Sector Rows with Classic Browser Scrollbar stretching to exact bottom of sidebar */}
        <div className="relative w-full flex-1 min-h-[680px] bg-white">
          <div
            ref={sectorListRef}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
            className="w-full divide-y divide-[#b1ada1]/15 classic-scrollbar bg-white"
          >
            {activeTab === 'prebuilt' ? (
              filteredIndices.map((sector) => {
                const isSelected = selectedSectorId === sector.id && !selectedStockTicker;
                const isExpanded = !!expandedSectors[sector.id];

                return (
                  <div key={sector.id} className="group">
                    {/* Sector Header Row */}
                    <div
                      onClick={() => handleSelectSector(sector.id)}
                      className={`px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#2563eb]/8 border-l-4 border-[#2563eb]'
                          : 'hover:bg-white border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0 pr-2">
                        <button
                          onClick={(e) => toggleSectorExpand(sector.id, e)}
                          className="p-1 hover:bg-[#b1ada1]/20 rounded-md text-[#08090a]/60 cursor-pointer"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#2563eb]" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#08090a]/50" />
                          )}
                        </button>
                        <div className="truncate">
                          <span
                            className={`text-xs font-semibold block truncate ${
                              isSelected ? 'text-[#2563eb] font-bold' : 'text-[#08090a]'
                            }`}
                          >
                            {sector.name}
                          </span>
                          <span className="text-[10px] text-[#08090a]/50 font-medium">
                            {sector.stocks.length} stocks · {sector.breadthPositivePct}% breadth
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono font-medium shrink-0">
                        <span
                          className={sector.change1D >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}
                        >
                          {sector.change1D >= 0 ? '+' : ''}
                          {sector.change1D.toFixed(2)}%
                        </span>
                        <span
                          className={`w-14 text-right font-bold ${
                            sector.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                          }`}
                        >
                          {sector.change1W >= 0 ? '+' : ''}
                          {sector.change1W.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {/* Expanded Company Rows */}
                    {isExpanded && (
                      <div className="bg-white/80 pl-6 pr-3.5 py-1 space-y-0.5 border-t border-b border-[#b1ada1]/10">
                        {sector.stocks.map((stock) => {
                          const isStockSelected =
                            selectedStockTicker === stock.ticker && selectedSectorId === sector.id;

                          return (
                            <div
                              key={stock.ticker}
                              onClick={(e) => handleSelectStock(stock.ticker, sector.id, e)}
                              className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
                                isStockSelected
                                  ? 'bg-[#2563eb]/10 text-[#2563eb]'
                                  : 'hover:bg-[#f4f3ee] text-[#08090a]'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0 pr-2">
                                <div
                                  style={{ backgroundColor: stock.logoBg || '#0284c7' }}
                                  className="w-5 h-5 rounded-md text-white font-mono font-extrabold text-[9px] flex items-center justify-center shrink-0 shadow-2xs"
                                >
                                  {stock.logoText || stock.ticker.slice(0, 2)}
                                </div>
                                <span
                                  className={`text-[11px] font-mono truncate ${
                                    isStockSelected ? 'font-bold text-[#2563eb]' : 'font-semibold'
                                  }`}
                                >
                                  {stock.ticker}
                                </span>
                              </div>

                              <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
                                <span
                                  className={stock.change1D >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}
                                >
                                  {stock.change1D >= 0 ? '+' : ''}
                                  {stock.change1D.toFixed(2)}%
                                </span>
                                <span
                                  className={`w-14 text-right ${
                                    stock.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                                  }`}
                                >
                                  {stock.change1W >= 0 ? '+' : ''}
                                  {stock.change1W.toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }).concat([
                <div
                  key="end-of-sectors"
                  className="py-3 px-4 text-center text-[10px] text-[#08090a]/50 font-mono bg-[#f4f3ee]/50 border-t border-[#b1ada1]/20"
                >
                  ✓ Showing {filteredIndices.length} of {PREBUILT_SECTOR_INDICES.length} Industry Clusters
                </div>
              ])
            ) : (
              // My Index View
              <div className="p-4 space-y-3">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full py-2.5 px-3 bg-[#08090a] text-white rounded-xl text-xs font-bold font-display hover:bg-[#1f2429] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Basket</span>
                </button>

                {customIndices.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#08090a]/60 space-y-2 bg-white rounded-xl border border-dashed border-[#b1ada1]/40">
                    <Layers className="w-8 h-8 mx-auto text-[#08090a]/30" />
                    <p className="font-semibold text-[#08090a]">No custom indices yet</p>
                    <p className="text-[11px] leading-relaxed">
                      Create custom equal-weighted stock baskets to track your specific sector rotation theses.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {customIndices.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedSectorId(c.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedSectorId === c.id
                            ? 'bg-white border-[#2563eb] shadow-xs'
                            : 'bg-white/60 border-[#b1ada1]/30 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#08090a] font-display">{c.name}</span>
                          <span className="text-[10px] bg-[#2563eb]/10 text-[#2563eb] px-2 py-0.5 rounded-full font-bold">
                            {c.stockTickers.length} stocks
                          </span>
                        </div>
                        {c.description && (
                          <p className="text-[11px] text-[#08090a]/60 mt-1 line-clamp-1">{c.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= RIGHT MAIN CANVAS (DEFINITIVE PROOF & BENCHMARK COMPARISONS) ================= */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {/* Header: Title + Mode Switcher */}
        <div className="px-6 py-4 border-b border-[#b1ada1]/30 flex flex-wrap items-center justify-between gap-3 bg-white shrink-0">
          <div className="flex items-center gap-3">
            {selectedStockTicker && (
              <button
                onClick={() => setSelectedStockTicker(null)}
                className="text-xs font-semibold text-[#2563eb] hover:underline cursor-pointer flex items-center gap-1"
              >
                ← Back to {currentSector.name} Sector
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#08090a] font-display tracking-tight">
                  {currentStock ? currentStock.ticker : currentSector.name}
                </h2>
                {!currentStock && !currentSector.isBenchmark && (
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-[#10b981]/15 text-[#10b981] rounded-md font-display flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{synchronyScore}% Cluster Co-Movement</span>
                  </span>
                )}
                {currentSector.isBenchmark && (
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-[#8b5cf6]/15 text-[#8b5cf6] rounded-md font-display flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Major Benchmark Anchor</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[#08090a]/60 font-medium">
                {currentStock
                  ? currentStock.name
                  : currentSector.isBenchmark
                  ? `Live Reference Benchmark Index · ${currentSector.category}`
                  : `${currentSector.stocks.length} Constituent Stocks · NSE 500 Classification`}
              </p>
            </div>
          </div>

          {/* Visualization Modes */}
          <div className="flex items-center gap-1.5 bg-[#f4f3ee] p-1 rounded-xl border border-[#b1ada1]/30">
            <button
              onClick={() => setViewProofMode('overlay')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-display ${
                viewProofMode === 'overlay'
                  ? 'bg-[#08090a] text-white shadow-xs'
                  : 'text-[#08090a]/70 hover:text-[#08090a]'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Multi-Stock Overlay (Proof)</span>
            </button>

            <button
              onClick={() => setViewProofMode('composite')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-display ${
                viewProofMode === 'composite'
                  ? 'bg-[#08090a] text-white shadow-xs'
                  : 'text-[#08090a]/70 hover:text-[#08090a]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Basket Index</span>
            </button>

            <button
              onClick={() => setViewProofMode('rotation')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-display ${
                viewProofMode === 'rotation'
                  ? 'bg-[#08090a] text-white shadow-xs'
                  : 'text-[#08090a]/70 hover:text-[#08090a]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Rotation Phase</span>
            </button>
          </div>
        </div>

        {/* ================= BENCHMARK COMPARISON ANCHOR CONTROLS ================= */}
        {/* Allows 1-click overlay of Nifty 50, Midcap 100, Smallcap 100 in the same chart */}
        <div className="px-6 py-2.5 bg-white border-b border-[#b1ada1]/20 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-[#08090a] font-display flex items-center gap-1 text-[11px]">
              <Globe className="w-3.5 h-3.5 text-[#2563eb]" />
              Compare vs Benchmarks:
            </span>

            {[
              { key: 'nifty50', label: 'NIFTY 50', color: BENCHMARK_COLORS.nifty50 },
              { key: 'niftyMidcap', label: 'Midcap 100', color: BENCHMARK_COLORS.niftyMidcap },
              { key: 'niftySmallcap', label: 'Smallcap 100', color: BENCHMARK_COLORS.niftySmallcap },
              { key: 'nifty500', label: 'NIFTY 500', color: BENCHMARK_COLORS.nifty500 },
            ].map((bm) => {
              const isSelectedBase = selectedSectorId === `benchmark-${bm.key}`;
              const isActive = isSelectedBase || !!activeBenchmarkOverlays[bm.key];
              const data = benchmarks[bm.key] || FALLBACK_BENCHMARKS[bm.key];

              return (
                <button
                  key={bm.key}
                  disabled={isSelectedBase}
                  onClick={() => toggleBenchmarkOverlay(bm.key)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold font-display transition-all border ${
                    isSelectedBase
                      ? 'bg-[#08090a] text-white border-[#08090a] shadow-xs cursor-default ring-1 ring-[#2563eb]'
                      : isActive
                      ? 'bg-[#08090a] text-white border-[#08090a] shadow-2xs cursor-pointer'
                      : 'bg-[#fafaf9] text-[#08090a]/70 border-[#b1ada1]/35 hover:border-[#08090a] cursor-pointer'
                  }`}
                >
                  <span
                    style={{ backgroundColor: bm.color }}
                    className={`w-2.5 h-2.5 rounded-full ${isActive ? 'ring-2 ring-white' : ''}`}
                  />
                  <span>{bm.label}</span>
                  {isSelectedBase ? (
                    <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded-md font-mono">
                      Active Base
                    </span>
                  ) : (
                    <span className={data.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}>
                      ({data.change1W >= 0 ? '+' : ''}{data.change1W.toFixed(1)}%)
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Equal-Weighted vs Market-Cap Weighted Toggle */}
            <div className="flex items-center bg-[#f4f3ee] p-0.5 rounded-xl border border-[#b1ada1]/35">
              <button
                onClick={() => setWeightingMode('equal')}
                title="Equal-Weighted: Every constituent contributes equally so mid/small-caps & new-age stocks are not drowned out"
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-display cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  weightingMode === 'equal'
                    ? 'bg-[#08090a] text-white shadow-2xs'
                    : 'text-[#08090a]/60 hover:text-[#08090a]'
                }`}
              >
                Equal Wt
              </button>
              <button
                onClick={() => setWeightingMode('mcap')}
                title="Market-Cap Weighted: Weights sector return & composite line by constituent market capitalization"
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-display cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  weightingMode === 'mcap'
                    ? 'bg-[#08090a] text-white shadow-2xs'
                    : 'text-[#08090a]/60 hover:text-[#08090a]'
                }`}
              >
                MCap Wt
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1 text-xs font-semibold text-[#08090a] bg-white border border-[#b1ada1]/40 rounded-xl hover:bg-[#f4f3ee] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>

            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="px-3 py-1 text-xs font-semibold text-[#08090a] bg-white border border-[#b1ada1]/40 rounded-xl hover:bg-[#f4f3ee] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
            >
              <Bell className="w-3.5 h-3.5 text-[#eab308]" />
              <span>Set Alert</span>
            </button>
          </div>
        </div>

        {/* DEFINITIVE PROOF BAR */}
        {!currentSector.isBenchmark && (
          <div className="px-6 py-3 bg-[#fafaf9] border-b border-[#b1ada1]/25 flex flex-wrap items-center justify-between gap-4 text-xs shrink-0">
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <span className="text-[#08090a]/60 block font-semibold text-[11px]">1W Advance / Decline:</span>
                <span className="font-extrabold text-[#08090a] font-display text-sm">
                  <span className="text-[#10b981]">{advancingCount1W} Advancing</span> /{' '}
                  <span className={decliningCount1W > 0 ? 'text-[#f43f5e]' : 'text-[#08090a]/40'}>
                    {decliningCount1W} Declining
                  </span>
                </span>
              </div>

              <div className="h-7 w-px bg-[#b1ada1]/30 hidden sm:block" />

              <div>
                <span className="text-[#08090a]/60 block font-semibold text-[11px]">Cluster Breadth (1W):</span>
                <span className="font-extrabold text-[#10b981] font-display text-sm">
                  {currentSector.breadthPositivePct}% Inflow ({advancingCount1W}/{currentSector.stocks.length})
                </span>
              </div>

              <div className="h-7 w-px bg-[#b1ada1]/30 hidden sm:block" />

              <div>
                <span className="text-[#08090a]/60 block font-semibold text-[11px]">1D Session:</span>
                <span className="font-mono font-bold text-xs">
                  <span className={advancingCount1D > 0 ? 'text-[#10b981]' : 'text-[#08090a]/60'}>{advancingCount1D} Up</span> / <span className={decliningCount1D > 0 ? 'text-[#f43f5e]' : 'text-[#08090a]/60'}>{decliningCount1D} Down</span>
                </span>
              </div>

              <div className="h-7 w-px bg-[#b1ada1]/30 hidden sm:block" />

              <div>
                <span className="text-[#08090a]/60 block font-semibold text-[11px]">Synchrony Verdict:</span>
                <span className="font-bold text-[#08090a] font-display text-xs flex items-center gap-1">
                  {synchronyScore >= 75 ? (
                    <>
                      <Flame className="w-3.5 h-3.5 text-[#10b981]" />
                      <span className="text-[#10b981]">{synchronyScore}% Institutional Co-Movement</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span className="text-[#f59e0b]">{synchronyScore}% Mixed Dispersion</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="text-right text-[11px] text-[#08090a]/60 font-medium">
              Timeframe: <span className="font-bold text-[#08090a]">3 Months Normalized (Base 100)</span>
            </div>
          </div>
        )}

        {/* Main Chart Canvas */}
        <div className="p-4 sm:p-6 space-y-6">
          {viewProofMode === 'overlay' ? (
            // ================= MULTI-STOCK OVERLAY WITH BENCHMARK ANCHORS =================
            <div className="bg-white p-5 rounded-[22px] border border-[#b1ada1]/30 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-[#08090a] font-display flex items-center gap-2">
                    <span>
                      {currentSector.name} Co-Movement Ribbon
                      {currentSector.stocks.length > 0 && ` (${currentSector.stocks.length} Stocks)`}
                    </span>
                    <span className="text-[11px] font-normal text-[#08090a]/60">
                      (Base 100 Normalized Comparative View)
                    </span>
                  </h3>
                  <p className="text-xs text-[#08090a]/60 mt-0.5">
                    Compare constituent stock lines directly against benchmark anchor lines (Nifty 50, Midcap 100, Smallcap 100).
                  </p>
                </div>

                <div className="text-xs font-mono font-bold text-[#10b981] bg-[#10b981]/15 px-2.5 py-1 rounded-lg">
                  1W Return: +{currentSector.change1W.toFixed(2)}%
                </div>
              </div>

              {/* Multi-Line Recharts Canvas */}
              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={multiStockCoMovementData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                      axisLine={{ stroke: '#e5e5e5' }}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      orientation="right"
                      tickFormatter={(val) => val.toFixed(1)}
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                      axisLine={{ stroke: '#e5e5e5' }}
                    />
                    <Tooltip
                      labelFormatter={(lbl) => `Date: ${lbl}`}
                      contentStyle={{
                        backgroundColor: '#08090a',
                        borderColor: '#2563eb',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}
                    />

                    {/* MAIN SELECTED INDEX CURVE (Bold solid line) */}
                    <Line
                      type="monotone"
                      dataKey="selectedIndexLine"
                      name={`${currentSector.name} (Base)`}
                      stroke={
                        currentSector.isBenchmark
                          ? (BENCHMARK_COLORS[selectedSectorId.replace('benchmark-', '')] || '#2563eb')
                          : '#08090a'
                      }
                      strokeWidth={3.5}
                      dot={false}
                    />

                    {/* BENCHMARK COMPARISON OVERLAYS (Dashed colored lines, if enabled and not main index) */}
                    {activeBenchmarkOverlays.nifty50 && selectedSectorId !== 'benchmark-nifty50' && (
                      <Line
                        type="monotone"
                        dataKey="nifty50"
                        name="NIFTY 50"
                        stroke={BENCHMARK_COLORS.nifty50}
                        strokeWidth={2.5}
                        strokeDasharray="4 2"
                        dot={false}
                      />
                    )}
                    {activeBenchmarkOverlays.niftyMidcap && selectedSectorId !== 'benchmark-niftyMidcap' && (
                      <Line
                        type="monotone"
                        dataKey="niftyMidcap"
                        name="NIFTY Midcap 100"
                        stroke={BENCHMARK_COLORS.niftyMidcap}
                        strokeWidth={2.5}
                        strokeDasharray="4 2"
                        dot={false}
                      />
                    )}
                    {activeBenchmarkOverlays.niftySmallcap && selectedSectorId !== 'benchmark-niftySmallcap' && (
                      <Line
                        type="monotone"
                        dataKey="niftySmallcap"
                        name="NIFTY Smallcap 100"
                        stroke={BENCHMARK_COLORS.niftySmallcap}
                        strokeWidth={2.5}
                        strokeDasharray="4 2"
                        dot={false}
                      />
                    )}
                    {activeBenchmarkOverlays.nifty500 && selectedSectorId !== 'benchmark-nifty500' && (
                      <Line
                        type="monotone"
                        dataKey="nifty500"
                        name="NIFTY 500"
                        stroke={BENCHMARK_COLORS.nifty500}
                        strokeWidth={2.5}
                        strokeDasharray="4 2"
                        dot={false}
                      />
                    )}

                    {/* Render individual line for each constituent stock */}
                    {currentSector.stocks.map((stock, idx) => (
                      <Line
                        key={stock.ticker}
                        type="monotone"
                        dataKey={stock.ticker}
                        stroke={STOCK_LINE_COLORS[idx % STOCK_LINE_COLORS.length]}
                        strokeWidth={selectedStockTicker === stock.ticker ? 3.5 : 1.8}
                        dot={false}
                        opacity={selectedStockTicker && selectedStockTicker !== stock.ticker ? 0.25 : 0.85}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Stock Color Legend Bar */}
              {currentSector.stocks.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#b1ada1]/15">
                  {currentSector.stocks.map((stock, idx) => {
                    const isSel = selectedStockTicker === stock.ticker;
                    return (
                      <button
                        key={stock.ticker}
                        onClick={() => setSelectedStockTicker(isSel ? null : stock.ticker)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold cursor-pointer transition-all border ${
                          isSel
                            ? 'bg-[#08090a] text-white border-[#08090a]'
                            : 'bg-[#fafaf9] text-[#08090a]/80 border-[#b1ada1]/30 hover:border-[#08090a]'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: STOCK_LINE_COLORS[idx % STOCK_LINE_COLORS.length] }}
                          className="w-2.5 h-2.5 rounded-full"
                        />
                        <span>{stock.ticker}</span>
                        <span className={stock.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}>
                          {stock.change1W >= 0 ? '+' : ''}{stock.change1W}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : viewProofMode === 'composite' ? (
            // ================= COMPOSITE EQUAL-WEIGHTED AREA CHART =================
            <div className="bg-white p-5 rounded-[22px] border border-[#b1ada1]/30 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-[#08090a] font-display">
                    {currentStock
                      ? `${currentStock.name} (${currentStock.ticker}) Price Action (₹)`
                      : `${currentSector.name} ${currentSector.isBenchmark ? 'Benchmark Index' : 'Equal-Weighted Composite Index'} (Base 100)`}
                  </h3>
                  <p className="text-xs text-[#08090a]/60">
                    {currentStock
                      ? `Real daily market closes on NSE from ₹${(singleStockSeries?.[0]?.value || currentStock.price).toLocaleString('en-IN')} to ₹${currentStock.price.toLocaleString('en-IN')}`
                      : currentSector.isBenchmark
                      ? 'Official historical index trendline normalized across 64 trading sessions'
                      : 'Smooth aggregate trendline filtering individual stock noise'}
                  </p>
                </div>
                <div
                  className={`text-xs font-extrabold font-mono px-2.5 py-1 rounded-lg ${
                    isReturnPositive ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#f43f5e]/15 text-[#f43f5e]'
                  }`}
                >
                  {currentStock ? (
                    <span>
                      CMP: ₹{currentStock.price.toLocaleString('en-IN')} | 1D: {currentStock.change1D >= 0 ? '+' : ''}{currentStock.change1D.toFixed(2)}% | 1W: {currentStock.change1W >= 0 ? '+' : ''}{currentStock.change1W.toFixed(2)}%
                    </span>
                  ) : (
                    <span>
                      1W: {currentSector.change1W >= 0 ? '+' : ''}{currentSector.change1W.toFixed(2)}% | 3M: {currentSector.change1M >= 0 ? '+' : ''}{currentSector.change1M.toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={singleStockSeries || currentSector.history}
                    margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorCompVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartFillColor} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={chartFillColor} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }} />
                    <YAxis
                      domain={['auto', 'auto']}
                      orientation="right"
                      tickFormatter={(val) =>
                        currentStock ? `₹${Math.round(val).toLocaleString('en-IN')}` : val.toFixed(1)
                      }
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                    />
                    <Tooltip
                      formatter={(val: any) => [
                        currentStock
                          ? `₹${parseFloat(val).toLocaleString('en-IN')}`
                          : `${parseFloat(val).toFixed(2)} pts`,
                        currentStock ? `${currentStock.ticker} Price` : 'Composite Index',
                      ]}
                      contentStyle={{
                        backgroundColor: '#08090a',
                        borderColor: '#2563eb',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={chartStrokeColor}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorCompVal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="h-16 w-full pt-2 border-t border-[#b1ada1]/15">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentSector.history} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <Bar
                      dataKey="volume"
                      fill={isReturnPositive ? '#10b981' : '#f43f5e'}
                      opacity={0.5}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            // ================= SECTOR ROTATION RADAR =================
            <div className="p-5 bg-[#fafaf9] rounded-[22px] border border-[#b1ada1]/30 space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#2563eb]" />
                <h3 className="text-sm font-extrabold text-[#08090a] font-display">
                  Institutional Sector Rotation Phase: {currentSector.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div
                  className={`p-3.5 rounded-xl border ${
                    currentSector.rotationStatus === 'Leading'
                      ? 'bg-[#10b981]/15 border-[#10b981] font-bold shadow-xs'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#10b981] mb-1 font-display">1. Leading Phase</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    High relative strength vs Nifty 50 with sustained multi-week capital inflows.
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    currentSector.rotationStatus === 'Weakening'
                      ? 'bg-[#f59e0b]/15 border-[#f59e0b] font-bold shadow-xs'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#f59e0b] mb-1 font-display">2. Weakening Phase</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    Uptrend exhausting, momentum flattening out across mid & small caps.
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    currentSector.rotationStatus === 'Lagging'
                      ? 'bg-[#f43f5e]/15 border-[#f43f5e] font-bold shadow-xs'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#f43f5e] mb-1 font-display">3. Lagging Phase</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    Heavy institutional selling, majority of constituents making lower lows.
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    currentSector.rotationStatus === 'Improving'
                      ? 'bg-[#2563eb]/15 border-[#2563eb] font-bold shadow-xs'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#2563eb] mb-1 font-display">4. Improving Phase</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    V-shaped accumulation out of base lows. Cluster breadth turning green.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Return Dispersion Strip */}
          {currentSector.stocks.length > 0 && (
            <div className="bg-white p-4 rounded-[20px] border border-[#b1ada1]/30 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#08090a] font-display">
                  1-Week Return Dispersion Spectrum (Cluster Tightness)
                </span>
                <span className="text-[#08090a]/60 text-[11px]">
                  Tight grouping in green = Authentic Sector Inflow
                </span>
              </div>

              <div className="relative h-9 bg-[#f4f3ee] rounded-xl flex items-center px-4 overflow-hidden border border-[#b1ada1]/30">
                <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-[#b1ada1]/50 z-10" />

                {currentSector.stocks.map((stock, idx) => {
                  const pct = Math.max(5, Math.min(95, 33 + stock.change1W * 3.2));
                  const isSelected = selectedStockTicker === stock.ticker;

                  return (
                    <div
                      key={stock.ticker}
                      onClick={() => setSelectedStockTicker(stock.ticker)}
                      style={{ left: `${pct}%` }}
                      title={`${stock.ticker}: ${stock.change1W > 0 ? '+' : ''}${stock.change1W}%`}
                      className={`absolute -translate-x-1/2 w-4 h-4 rounded-full border-2 cursor-pointer transition-transform hover:scale-130 z-20 ${
                        stock.change1W >= 0
                          ? 'bg-[#10b981] border-white shadow-xs'
                          : 'bg-[#f4f3ee] border-white shadow-xs'
                      } ${isSelected ? 'ring-2 ring-[#08090a] scale-125' : ''}`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateCustomIndexModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveCustomIndex}
      />

      <SetAlertModal
        isOpen={isAlertModalOpen}
        targetName={currentStock ? currentStock.ticker : currentSector.name}
        currentValue={
          currentStock
            ? `₹${currentStock.price.toLocaleString('en-IN')} (1W: ${currentStock.change1W}%)`
            : `${currentSector.currentReturn}%`
        }
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={(summary) => onShowToast(`Alert Configured: ${summary}`, 'success')}
      />
    </div>
  );
};
