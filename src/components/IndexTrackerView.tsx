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
  Star,
} from 'lucide-react';
import {
  SectorIndexData,
  StockConstituent,
  TimeframePeriod,
  CustomIndexItem,
  HistoricalPricePoint,
  BenchmarkItem,
} from '../types/indexTracker';
import { CORE_SECTOR_INDICES, THEMATIC_SECTOR_INDICES, getSectorOpportunityMembers } from '../data/sectorUniverse';
import { sanitizeSnapshot, observedHorizonReturn } from '../utils/priceQuality';
import {
  FALLBACK_BENCHMARKS,
  BENCHMARK_TOP_CONSTITUENTS,
  INITIAL_LIVE_STOCKS_DATA,
} from '../utils/benchmarkService';
import { CreateCustomIndexModal } from './CreateCustomIndexModal';
import { TrackedStocksPanel } from './TrackedStocksPanel';
import { addTrackedStock, normalizeTrackedTicker, readTrackedStocks, removeTrackedStock, writeTrackedStocks, type TrackedStock } from '../utils/trackedStocks';
import { SetAlertModal } from './SetAlertModal';
import { buildAlignedBasketHistory, classifyPriceRotation, tradingDayKey } from '../utils/sectorIndexMath';
import type { BrowserMarketSnapshot } from '../utils/marketSnapshotClient';

interface IndexTrackerViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  marketSnapshot: BrowserMarketSnapshot | null;
  themeChartRequest?: {themeId: string; sequence: number} | null;
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

export const IndexTrackerView: React.FC<IndexTrackerViewProps> = ({ onShowToast, marketSnapshot, themeChartRequest }) => {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'myIndex' | 'tracked'>('prebuilt');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [weightingMode, setWeightingMode] = useState<'equal' | 'mcap'>('equal');
  const [sortField, setSortField] = useState<'name' | '1d' | '1w' | '1m' | 'smid' | 'breadth'>('1w');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [signalHorizon, setSignalHorizon] = useState<'1W' | '1M' | '3M'>('1M');
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({
    'quick-commerce-consumer-tech': true,
    hospitals: true,
  });

  const [selectedSectorId, setSelectedSectorId] = useState<string>('quick-commerce-consumer-tech');
  const [selectedStockTicker, setSelectedStockTicker] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('3M');
  const [viewProofMode, setViewProofMode] = useState<'overlay' | 'composite' | 'rotation'>('overlay');
  const themeChartRef = useRef<HTMLDivElement>(null);
  const pendingChartScroll = useRef<number | null>(null);

  // The chart view stays mounted while its workspace is hidden. A Radar
  // navigation request must explicitly select the same theme and clear any
  // previous custom-index, stock, category, or search selection.
  useEffect(() => {
    if (!themeChartRequest) return;
    const id = themeChartRequest.themeId;
    if (!CORE_SECTOR_INDICES.some(theme => theme.id === id)) return;
    pendingChartScroll.current = themeChartRequest.sequence;
    setActiveTab('prebuilt');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSectorId(id);
    setSelectedStockTicker(null);
    setViewProofMode('overlay');
    setExpandedSectors(previous => ({...previous, [id]: true}));
  }, [themeChartRequest]);

  // Wait until React has selected the requested theme before scrolling to
  // its actual chart (particularly important on mobile below the sidebar).
  useEffect(() => {
    if (!themeChartRequest ||
        pendingChartScroll.current !== themeChartRequest.sequence ||
        selectedSectorId !== themeChartRequest.themeId ||
        activeTab !== 'prebuilt' || selectedStockTicker !== null) return;
    pendingChartScroll.current = null;
    const frame = window.requestAnimationFrame(() => {
      themeChartRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    return () => window.cancelAnimationFrame(frame);
  }, [themeChartRequest, selectedSectorId, activeTab, selectedStockTicker]);

  // Benchmark overlay state (e.g. NIFTY 50 enabled by default for immediate comparison)
  const [activeBenchmarkOverlays, setActiveBenchmarkOverlays] = useState<Record<string, boolean>>({
    nifty50: true,
    niftyMidcap: false,
    niftySmallcap: false,
    nifty500: false,
  });

  // Benchmarks Data
  const [benchmarks, setBenchmarks] = useState<Record<string, BenchmarkItem>>(FALLBACK_BENCHMARKS);

  const [trackedStocks, setTrackedStocks] = useState<TrackedStock[]>(readTrackedStocks);

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

  // Snapshot-backed stock quotes, validated before use
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
  >(sanitizeSnapshot(INITIAL_LIVE_STOCKS_DATA));

  // The parent loads one coherent snapshot (stocks AND benchmarks), directly
  // from the public committed GitHub JSON with a Vercel fallback. A successful
  // reload must update both sets together rather than only displaying a toast.
  useEffect(() => {
    if (!marketSnapshot) return;
    setLiveStocksData(sanitizeSnapshot(marketSnapshot.stocks));
    setBenchmarks({ ...FALLBACK_BENCHMARKS, ...marketSnapshot.benchmarks });
  }, [marketSnapshot]);

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

  const handleAddTrackedStock = (tickerInput: string, name: string, sectorId?: string) => {
    try {
      const canonical = normalizeTrackedTicker(tickerInput);
      if (!canonical) throw new Error('Use a valid NSE ticker such as KPITTECH, M&M or LT.NS');
      if (trackedStocks.some(x => x.ticker === canonical)) {
        onShowToast(`${canonical} is already in My Tracked Stocks`, 'info');
        return;
      }
      const updated = addTrackedStock(trackedStocks, canonical, name, sectorId);
      setTrackedStocks(updated);
      const saved = writeTrackedStocks(updated);
      onShowToast(saved
        ? `Added ${canonical} to your personal watchlist`
        : `Added ${canonical} for this session; browser storage is unavailable`,
        saved ? 'success' : 'info'
      );
    } catch (error) {
      onShowToast(error instanceof Error ? error.message : 'Invalid ticker', 'error');
    }
  };

  const handleRemoveTrackedStock = (ticker: string) => {
    const updated = removeTrackedStock(trackedStocks, ticker);
    setTrackedStocks(updated);
    if (!writeTrackedStocks(updated)) {
      onShowToast('Removed for this session; browser storage is unavailable', 'info');
    }
  };

  const openTrackedStock = (ticker: string) => {
    const parent = CORE_SECTOR_INDICES.find(sector =>
      sector.stocks.some(stock => stock.ticker === ticker)
    );
    if (!parent) {
      onShowToast('This ticker is tracked personally but has no core-sector detail page', 'info');
      return;
    }
    setActiveTab('prebuilt');
    handleSelectStock(ticker, parent.id);
  };

  // Classic Scroll Container Ref
  const sectorListRef = useRef<HTMLDivElement>(null);

  // Find currently selected sector or benchmark
  const currentSector = useMemo<SectorIndexData>(() => {
    // Helper to enrich stock constituents with real live quotes (1D, 1W, 21-day 1M, and 63-day 3M)
    const enrichStocks = (stocksList: StockConstituent[]) => {
      return stocksList.filter(s => {
        const live = liveStocksData[s.ticker] || liveStocksData[s.ticker.toUpperCase()];
        return !!live?.rawHistory && live.rawHistory.length >= 40;
      }).map((s) => {
        const live = liveStocksData[s.ticker] || liveStocksData[s.ticker.toUpperCase()];
        if (live) {
          let calc1M = observedHorizonReturn(live, 21) ?? 0;
          let calc3M = live.change3M ?? 0;
          if (live.rawHistory && live.rawHistory.length >= 2) {
            const latestClose = live.price || live.rawHistory[live.rawHistory.length - 1].close;
            const idx1M = Math.max(0, live.rawHistory.length - 22);
            const close1M = live.rawHistory[idx1M]?.close || latestClose;
            if (close1M > 0) {
              calc1M = parseFloat((((latestClose - close1M) / close1M) * 100).toFixed(2));
            }
            const firstClose = live.rawHistory[0]?.close || latestClose;
            if (firstClose > 0) {
              calc3M = parseFloat((((latestClose - firstClose) / firstClose) * 100).toFixed(2));
            }
          } else if (live.history && live.history.length >= 2) {
            const latestVal = live.history[live.history.length - 1].value;
            const idx1M = Math.max(0, live.history.length - 22);
            const val1M = live.history[idx1M]?.value || latestVal;
            if (val1M > 0) {
              calc1M = parseFloat((((latestVal - val1M) / val1M) * 100).toFixed(2));
            }
            const firstVal = live.history[0]?.value || 100;
            if (firstVal > 0) {
              calc3M = parseFloat((((latestVal - firstVal) / firstVal) * 100).toFixed(2));
            }
          }
          return {
            ...s,
            price: live.price,
            change1D: live.change1D,
            change1W: live.change1W,
            change1M: calc1M,
            change3M: calc3M,
          };
        }
        return {
          ...s,
          change1M: 0,
          change3M: 0,
        };
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
    const computeWeightedAvg = (
      stocksList: StockConstituent[],
      field: 'change1D' | 'change1W' | 'change1M' | 'change3M',
      mode: 'equal' | 'mcap' = weightingMode
    ) => {
      if (stocksList.length === 0) return 0;
      if (mode === 'mcap') {
        const totalMcap = stocksList.reduce((acc, s) => acc + (s.marketCapCr || 10000), 0);
        if (totalMcap > 0) {
          return stocksList.reduce(
            (acc, s) => acc + ((s[field] as number) || 0) * ((s.marketCapCr || 10000) / totalMcap),
            0
          );
        }
      }
      return stocksList.reduce((acc, s) => acc + ((s[field] as number) || 0), 0) / stocksList.length;
    };

    // A fixed cohort of constituents with real, date-aligned closes only.
    const buildRealCompositeHistory = (stocksList: StockConstituent[]): HistoricalPricePoint[] =>
      buildAlignedBasketHistory(stocksList, liveStocksData, weightingMode).history;

    if (activeTab === 'prebuilt' || activeTab === 'tracked') {
      const base =
        CORE_SECTOR_INDICES.find((s) => s.id === selectedSectorId) ||
        CORE_SECTOR_INDICES[0];
      const enriched = enrichStocks(base.stocks);
      const avg1D = computeWeightedAvg(enriched, 'change1D');
      const avg1W = computeWeightedAvg(enriched, 'change1W');
      const avg1M = computeWeightedAvg(enriched, 'change1M');
      const avg3M = computeWeightedAvg(enriched, 'change3M');

      const ew1W = computeWeightedAvg(enriched, 'change1W', 'equal');
      const mc1W = computeWeightedAvg(enriched, 'change1W', 'mcap');
      const ew1M = computeWeightedAvg(enriched, 'change1M', 'equal');
      const mc1M = computeWeightedAvg(enriched, 'change1M', 'mcap');
      const ew3M = computeWeightedAvg(enriched, 'change3M', 'equal');
      const mc3M = computeWeightedAvg(enriched, 'change3M', 'mcap');

      const advancingCount1W = enriched.filter((s) => s.change1W > 0).length;
      const realHistory = buildRealCompositeHistory(enriched);
      // Coverage is measured against the WHOLE curated core list, not only
      // the surviving priced subset. Missing tickers must reduce confidence.
      const aligned = buildAlignedBasketHistory(enriched, liveStocksData, weightingMode);
      const denominator = activeTab === 'prebuilt'
        ? (CORE_SECTOR_INDICES.find(x => x.id === selectedSectorId)?.stocks.length || 1)
        : (customIndices.find(x => x.id === selectedSectorId)?.stockTickers.length || 1);
      const basketCoverage = Math.round(aligned.dataCoveragePct * enriched.length / denominator);

      return {
        ...base,
        stocks: enriched,
        history: realHistory,
        dataCoveragePct: basketCoverage,
        change1D: parseFloat(avg1D.toFixed(2)),
        change1W: parseFloat(avg1W.toFixed(2)),
        change1M: parseFloat(avg1M.toFixed(2)),
        change3M: parseFloat(avg3M.toFixed(2)),
        equalWt1W: parseFloat(ew1W.toFixed(2)),
        mcapWt1W: parseFloat(mc1W.toFixed(2)),
        equalWt1M: parseFloat(ew1M.toFixed(2)),
        mcapWt1M: parseFloat(mc1M.toFixed(2)),
        equalWt3M: parseFloat(ew3M.toFixed(2)),
        mcapWt3M: parseFloat(mc3M.toFixed(2)),
        ewMcapSpread1W: parseFloat((ew1W - mc1W).toFixed(2)),
        ewMcapSpread1M: parseFloat((ew1M - mc1M).toFixed(2)),
        currentReturn: parseFloat(avg1W.toFixed(2)),
        rotationStatus: classifyPriceRotation(avg1W, avg3M, benchmarks.nifty500?.change1W ?? 0, benchmarks.nifty500?.change3M ?? 0, Math.round(100 * advancingCount1W / Math.max(enriched.length, 1))),
        breadthPositivePct: Math.round((advancingCount1W / (enriched.length || 1)) * 100),
      };
    } else {
      const custom = customIndices.find((c) => c.id === selectedSectorId);
      if (!custom) return CORE_SECTOR_INDICES[0];

      const matchedStocks: StockConstituent[] = [];
      // User-created indices may intentionally mix core and adjacent ideas.
      THEMATIC_SECTOR_INDICES.forEach((sec) => {
        sec.stocks.forEach((st) => {
          if (custom.stockTickers.includes(st.ticker) && !matchedStocks.some((m) => m.ticker === st.ticker)) {
            matchedStocks.push(st);
          }
        });
      });

      const enriched = enrichStocks(matchedStocks);
      const avg1D = computeWeightedAvg(enriched, 'change1D');
      const avg1W = computeWeightedAvg(enriched, 'change1W');
      const avg1M = computeWeightedAvg(enriched, 'change1M');
      const avg3M = computeWeightedAvg(enriched, 'change3M');
      const ew1W = computeWeightedAvg(enriched, 'change1W', 'equal');
      const mc1W = computeWeightedAvg(enriched, 'change1W', 'mcap');
      const ew1M = computeWeightedAvg(enriched, 'change1M', 'equal');
      const mc1M = computeWeightedAvg(enriched, 'change1M', 'mcap');
      const ew3M = computeWeightedAvg(enriched, 'change3M', 'equal');
      const mc3M = computeWeightedAvg(enriched, 'change3M', 'mcap');

      const realHistory = buildRealCompositeHistory(enriched);
      // Coverage is measured against the WHOLE curated core list, not only
      // the surviving priced subset. Missing tickers must reduce confidence.
      const aligned = buildAlignedBasketHistory(enriched, liveStocksData, weightingMode);
      const denominator = activeTab === 'prebuilt'
        ? (CORE_SECTOR_INDICES.find(x => x.id === selectedSectorId)?.stocks.length || 1)
        : (customIndices.find(x => x.id === selectedSectorId)?.stockTickers.length || 1);
      const basketCoverage = Math.round(aligned.dataCoveragePct * enriched.length / denominator);

      return {
        id: custom.id,
        name: custom.name,
        category: 'Custom Index',
        companiesCount: enriched.length,
        change1D: parseFloat(avg1D.toFixed(2)),
        change1W: parseFloat(avg1W.toFixed(2)),
        change1M: parseFloat(avg1M.toFixed(2)),
        change3M: parseFloat(avg3M.toFixed(2)),
        equalWt1W: parseFloat(ew1W.toFixed(2)),
        mcapWt1W: parseFloat(mc1W.toFixed(2)),
        equalWt1M: parseFloat(ew1M.toFixed(2)),
        mcapWt1M: parseFloat(mc1M.toFixed(2)),
        equalWt3M: parseFloat(ew3M.toFixed(2)),
        mcapWt3M: parseFloat(mc3M.toFixed(2)),
        ewMcapSpread1W: parseFloat((ew1W - mc1W).toFixed(2)),
        ewMcapSpread1M: parseFloat((ew1M - mc1M).toFixed(2)),
        change1Y: 28.5,
        currentReturn: parseFloat(avg1W.toFixed(2)),
        stocks: enriched,
        breadthPositivePct: Math.round(
          (enriched.filter((s) => s.change1W > 0).length / (enriched.length || 1)) * 100
        ),
        rotationStatus: classifyPriceRotation(avg1W, avg3M, benchmarks.nifty500?.change1W ?? 0, benchmarks.nifty500?.change3M ?? 0, Math.round(100 * enriched.filter(st => st.change1W > 0).length / Math.max(enriched.length, 1))),
        history: realHistory,
        dataCoveragePct: basketCoverage,
      };
    }
  }, [activeTab, selectedSectorId, customIndices, benchmarks, liveStocksData, weightingMode]);

  // Fetch real market stock quotes and 63-day closing histories for current constituents
  useEffect(() => {
    const tickers = currentSector.stocks.map((s) => s.ticker);
    // Scheduled collection handles network refreshes; this fallback only
    // fills missing ticker histories from the already saved snapshot.
    const targetTickers = tickers.filter(
      ticker => !liveStocksData[ticker] && !liveStocksData[ticker.toUpperCase()]
    );
    if (targetTickers.length === 0) return;

    let isMounted = true;
    fetch(`/api/stocks-history?tickers=${encodeURIComponent(targetTickers.join(','))}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && data.success && data.stocks) {
          setLiveStocksData((prev) => ({ ...prev, ...sanitizeSnapshot(data.stocks) }));
        }
      })
      .catch((err) => console.warn('Could not fetch real stock data:', err));

    return () => {
      isMounted = false;
    };
  }, [currentSector.id, currentSector.stocks.length]);

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

  // Join actual constituent and benchmark observations by trading date, never by array index.
  // Missing prices are represented as null instead of simulated chart movements.
  const multiStockCoMovementData = useMemo(() => {
    const benchmarkKeys = ['nifty50','niftyMidcap','niftySmallcap','nifty500'] as const;
    const benchmarkMaps = Object.fromEntries(benchmarkKeys.map(key => {
      const bm = benchmarks[key] || FALLBACK_BENCHMARKS[key];
      return [key, new Map((bm?.history || []).map(pt => [tradingDayKey(pt.date), pt.value]))];
    })) as Record<string, Map<string | null, number>>;
    const stockMaps = Object.fromEntries(currentSector.stocks.map(stock => {
      const live = liveStocksData[stock.ticker] || liveStocksData[stock.ticker.toUpperCase()];
      return [stock.ticker, new Map((live?.history || []).map(pt => [tradingDayKey(pt.date), pt.value]))];
    })) as Record<string, Map<string | null, number>>;
    const firstIndex = currentSector.history[0]?.value;
    const anchorDay = tradingDayKey(currentSector.history[0]?.date || '');
    return currentSector.history.map(pt => {
      const key = tradingDayKey(pt.date);
      const row: Record<string, any> = {
        date: pt.date,
        selectedIndexLine: firstIndex && pt.value ? Number((100 * pt.value / firstIndex).toFixed(2)) : null
      };
      for (const stock of currentSector.stocks) {
        const series = stockMaps[stock.ticker];
        const anchor = anchorDay ? series.get(anchorDay) : undefined;
        const value = key ? series.get(key) : undefined;
        row[stock.ticker] = anchor && value ? Number((100 * value / anchor).toFixed(2)) : null;
      }
      for (const name of benchmarkKeys) {
        if (!activeBenchmarkOverlays[name] || selectedSectorId === `benchmark-${name}`) continue;
        const hist = benchmarks[name]?.history || FALLBACK_BENCHMARKS[name]?.history || [];
        const first = anchorDay ? benchmarkMaps[name].get(anchorDay) : undefined;
        const value = key ? benchmarkMaps[name].get(key) : undefined;
        row[name] = first && value ? Number((100 * value / first).toFixed(2)) : null;
      }
      return row;
    });
  }, [currentSector, activeBenchmarkOverlays, benchmarks, selectedSectorId, liveStocksData]);

  // Enrich all prebuilt sector indices with live stock market quotes so sidebar matches right panel
  const enrichedPrebuiltIndices = useMemo(() => {
    return CORE_SECTOR_INDICES.map((sector) => {
      const enrichedStocks = sector.stocks.filter(s => {
        const live = liveStocksData[s.ticker] || liveStocksData[s.ticker.toUpperCase()];
        return !!live?.rawHistory && live.rawHistory.length >= 40;
      }).map((s) => {
        const live = liveStocksData[s.ticker] || liveStocksData[s.ticker.toUpperCase()];
        if (live) {
          let calc1M = observedHorizonReturn(live, 21) ?? 0;
          if (live.rawHistory && live.rawHistory.length >= 2) {
            const latestClose = live.price || live.rawHistory[live.rawHistory.length - 1].close;
            const idx1M = Math.max(0, live.rawHistory.length - 22);
            const close1M = live.rawHistory[idx1M]?.close || latestClose;
            if (close1M > 0) {
              calc1M = parseFloat((((latestClose - close1M) / close1M) * 100).toFixed(2));
            }
          } else if (live.history && live.history.length >= 2) {
            const latestVal = live.history[live.history.length - 1].value;
            const idx1M = Math.max(0, live.history.length - 22);
            const val1M = live.history[idx1M]?.value || latestVal;
            if (val1M > 0) {
              calc1M = parseFloat((((latestVal - val1M) / val1M) * 100).toFixed(2));
            }
          }
          return {
            ...s,
            price: live.price,
            change1D: live.change1D,
            change1W: live.change1W,
            change1M: calc1M,
            change3M: live.change3M ?? 0,
          };
        }
        return {
          ...s,
          change1M: 0,
        };
      });

      const totalMcap = Math.max(
        1,
        enrichedStocks.reduce((acc, s) => acc + (s.marketCapCr || 10000), 0)
      );

      const ew1D = enrichedStocks.reduce((a, b) => a + b.change1D, 0) / (enrichedStocks.length || 1);
      const mc1D = enrichedStocks.reduce((acc, s) => acc + s.change1D * (s.marketCapCr || 10000), 0) / totalMcap;

      const ew1W = enrichedStocks.reduce((a, b) => a + b.change1W, 0) / (enrichedStocks.length || 1);
      const mc1W = enrichedStocks.reduce((acc, s) => acc + s.change1W * (s.marketCapCr || 10000), 0) / totalMcap;

      const ew1M = enrichedStocks.reduce((a, b) => a + (b.change1M ?? 0), 0) / (enrichedStocks.length || 1);
      const mc1M =
        enrichedStocks.reduce((acc, s) => acc + (s.change1M ?? 0) * (s.marketCapCr || 10000), 0) / totalMcap;

      const ew3M = enrichedStocks.reduce((sum, st) => sum + (st.change3M ?? 0), 0) / (enrichedStocks.length || 1);
      const mc3M = enrichedStocks.reduce((sum, st) => sum + (st.change3M ?? 0) * (st.marketCapCr || 10000), 0) / totalMcap;
      const avg3M = weightingMode === 'mcap' ? mc3M : ew3M;
      const avg1D = weightingMode === 'mcap' ? mc1D : ew1D;
      const avg1W = weightingMode === 'mcap' ? mc1W : ew1W;
      const avg1M = weightingMode === 'mcap' ? mc1M : ew1M;
      const advancingCount1W = enrichedStocks.filter((s) => s.change1W > 0).length;

      return {
        ...sector,
        stocks: enrichedStocks,
        change1D: parseFloat(avg1D.toFixed(2)),
        change1W: parseFloat(avg1W.toFixed(2)),
        change1M: parseFloat(avg1M.toFixed(2)),
        change3M: parseFloat(avg3M.toFixed(2)),
        equalWt3M: parseFloat(ew3M.toFixed(2)),
        mcapWt3M: parseFloat(mc3M.toFixed(2)),
        rotationStatus: classifyPriceRotation(avg1W, avg3M, benchmarks.nifty500?.change1W ?? 0, benchmarks.nifty500?.change3M ?? 0, Math.round(100 * enrichedStocks.filter(st => st.change1W > 0).length / Math.max(1, enrichedStocks.length))),
        equalWt1W: parseFloat(ew1W.toFixed(2)),
        mcapWt1W: parseFloat(mc1W.toFixed(2)),
        equalWt1M: parseFloat(ew1M.toFixed(2)),
        mcapWt1M: parseFloat(mc1M.toFixed(2)),
        ewMcapSpread1W: parseFloat((ew1W - mc1W).toFixed(2)),
        ewMcapSpread1M: parseFloat((ew1M - mc1M).toFixed(2)),
        breadthPositivePct: Math.round((advancingCount1W / (enrichedStocks.length || 1)) * 100),
        dataCoveragePct: Math.round(100 * enrichedStocks.length / Math.max(1, sector.stocks.length)),
      };
    });
  }, [liveStocksData, weightingMode, benchmarks]);

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
      if (sortField === '1m') {
        return sortOrder === 'asc' ? a.change1M - b.change1M : b.change1M - a.change1M;
      }
      if (sortField === 'smid') {
        const spA = a.ewMcapSpread1M ?? 0;
        const spB = b.ewMcapSpread1M ?? 0;
        return sortOrder === 'asc' ? spA - spB : spB - spA;
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
  const toggleSort = (field: 'name' | '1d' | '1w' | '1m' | 'smid' | 'breadth') => {
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
  const thematicBeneficiaries = getSectorOpportunityMembers(selectedSectorId);
  const capSum = currentSector.stocks.reduce((n, st) => n + Math.max(0, st.marketCapCr || 0), 0);
  const topCapWeightPct = capSum > 0
    ? Math.round(100 * Math.max(0, ...currentSector.stocks.map(st => st.marketCapCr || 0)) / capSum)
    : 0;
  const synchronyScore = Math.round(
    (Math.max(advancingCount1W, decliningCount1W) / (currentSector.stocks.length || 1)) * 100
  );

  // ================= 4-SIGNAL INSTITUTIONAL ROTATION & SMID DIVERGENCE ENGINE =================
  const fourSignalDiagnostics = useMemo(() => {
    const stocks = currentSector.stocks;
    const n = stocks.length || 1;

    // Helper to extract benchmark 1W, 1M (21D), and 3M (63D) returns from its 63-day history
    const getBenchmarkReturns = (bKey: string) => {
      const bm = benchmarks[bKey] || FALLBACK_BENCHMARKS[bKey] || FALLBACK_BENCHMARKS.nifty500;
      const hist = bm.history || [];
      let ret1M = 0; // Unavailable when the benchmark history is too short.
      if (hist.length >= 2) {
        const latest = hist[hist.length - 1].value;
        const idx21 = Math.max(0, hist.length - 22);
        const val21 = hist[idx21]?.value || latest;
        if (val21 > 0) {
          ret1M = parseFloat((((latest - val21) / val21) * 100).toFixed(2));
        }
      }
      return {
        name: bm.name,
        change1W: bm.change1W,
        change1M: ret1M,
        change3M: bm.change3M,
      };
    };

    const nifty500Stats = getBenchmarkReturns('nifty500');

    // Determine Size-Matched Benchmark from median constituent market cap
    const sortedMcaps = [...stocks].map((s) => s.marketCapCr || 10000).sort((a, b) => a - b);
    const medianMcap = sortedMcaps[Math.floor(sortedMcaps.length / 2)] || 20000;
    const sizeBenchmarkKey =
      medianMcap >= 55000 ? 'nifty50' : medianMcap >= 18000 ? 'niftyMidcap' : 'niftySmallcap';
    const sizeBenchmarkStats = getBenchmarkReturns(sizeBenchmarkKey);

    // Get Stock return for selected signalHorizon ('1W' | '1M' | '3M')
    const getStockHorizonReturn = (s: StockConstituent) => {
      if (signalHorizon === '1W') return s.change1W;
      if (signalHorizon === '3M') return s.change3M ?? 0;
      return s.change1M ?? 0;
    };

    const n500HorizonReturn =
      signalHorizon === '1W'
        ? nifty500Stats.change1W
        : signalHorizon === '3M'
        ? nifty500Stats.change3M
        : nifty500Stats.change1M;

    const sizeBmHorizonReturn =
      signalHorizon === '1W'
        ? sizeBenchmarkStats.change1W
        : signalHorizon === '3M'
        ? sizeBenchmarkStats.change3M
        : sizeBenchmarkStats.change1M;

    // Equal-Weight vs MCap-Weight Returns for selected horizon
    const ewReturn =
      signalHorizon === '1W'
        ? (currentSector.equalWt1W ?? currentSector.change1W)
        : signalHorizon === '3M'
        ? (currentSector.equalWt3M ?? currentSector.change3M ?? currentSector.change1M)
        : (currentSector.equalWt1M ?? currentSector.change1M);

    const mcapReturn =
      signalHorizon === '1W'
        ? (currentSector.mcapWt1W ?? currentSector.change1W)
        : signalHorizon === '3M'
        ? (currentSector.mcapWt3M ?? currentSector.change3M ?? currentSector.change1M)
        : (currentSector.mcapWt1M ?? currentSector.change1M);

    const activeSectorReturn = weightingMode === 'mcap' ? mcapReturn : ewReturn;

    // SIGNAL 1: Relative Strength (vs Nifty 500 & Size-Matched Benchmark)
    const rsVsNifty500 = parseFloat((activeSectorReturn - n500HorizonReturn).toFixed(2));
    const rsVsSizeBm = parseFloat((activeSectorReturn - sizeBmHorizonReturn).toFixed(2));

    // SIGNAL 2: Dual Breadth (Absolute Rising % + Beating Nifty 500 %)
    const risingStocksCount = stocks.filter((s) => getStockHorizonReturn(s) > 0).length;
    const beatingN500Count = stocks.filter((s) => getStockHorizonReturn(s) > n500HorizonReturn).length;
    const risingBreadthPct = Math.round((risingStocksCount / n) * 100);
    const beatingN500BreadthPct = Math.round((beatingN500Count / n) * 100);

    // SIGNAL 3: Equal-Weight vs MCap-Weight Divergence + Outlier / Thin-Trade Filter
    const ewMcapSpread = parseFloat((ewReturn - mcapReturn).toFixed(2));
    const sortedReturns = [...stocks].map(getStockHorizonReturn).sort((a, b) => a - b);
    const medianReturn = parseFloat((sortedReturns[Math.floor(sortedReturns.length / 2)] || 0).toFixed(2));
    const meanMedianGap = parseFloat(Math.abs(ewReturn - medianReturn).toFixed(2));

    // Check top-1 stock contribution & thin-cap risk
    const sortedByRetDesc = [...stocks].sort((a, b) => getStockHorizonReturn(b) - getStockHorizonReturn(a));
    const topGainer = sortedByRetDesc[0];
    const topGainerRet = topGainer ? getStockHorizonReturn(topGainer) : 0;
    const sumPositiveReturns = stocks.reduce((acc, s) => acc + Math.max(0, getStockHorizonReturn(s)), 0);
    const top1ContributionShare =
      sumPositiveReturns > 0 ? Math.round((Math.max(0, topGainerRet) / sumPositiveReturns) * 100) : 0;

    // Check if smaller constituents (< median MCap) are broadly participating or if thin-cap/outlier skew dominates
    const smidStocks = stocks.filter((s) => (s.marketCapCr || 10000) <= medianMcap * 1.15);
    const smidAdvancingPct = Math.round(
      (smidStocks.filter((s) => getStockHorizonReturn(s) > 0).length / Math.max(1, smidStocks.length)) * 100
    );
    const hasThinCapOutlier =
      topGainer && (topGainer.marketCapCr < 3500 || top1ContributionShare >= 42 || meanMedianGap >= 3.8);

    let divergenceVerdict: {
      title: string;
      tone: 'emerald' | 'amber' | 'blue' | 'slate';
      explanation: string;
      cautionFlag: string | null;
    };

    if (ewMcapSpread >= 1.25) {
      if (hasThinCapOutlier || risingBreadthPct < 55) {
        divergenceVerdict = {
          title: 'SMID Spread Positive — Outlier / Thin-Trade Caution',
          tone: 'amber',
          explanation: `Equal-Weight (+${ewReturn.toFixed(1)}%) beats MCap-Weight (+${mcapReturn.toFixed(1)}%), but ${topGainer?.ticker || 'top outlier'} (${topGainerRet >= 0 ? '+' : ''}${topGainerRet.toFixed(1)}%, ₹${(topGainer?.marketCapCr || 0).toLocaleString('en-IN')} Cr MCap) accounts for ${top1ContributionShare}% of gains (Median: ${medianReturn >= 0 ? '+' : ''}${medianReturn.toFixed(1)}%).`,
          cautionFlag: `Verify liquidity & corporate actions in ${topGainer?.ticker} before treating as broad SMID breakout.`,
        };
      } else {
        divergenceVerdict = {
          title: 'Broad SMID Price Leadership (Check Liquidity)',
          tone: 'emerald',
          explanation: `Equal-Weight (${ewReturn >= 0 ? '+' : ''}${ewReturn.toFixed(1)}%) leads MCap-Weight (${mcapReturn >= 0 ? '+' : ''}${mcapReturn.toFixed(1)}%) by +${ewMcapSpread.toFixed(1)}% with ${smidAdvancingPct}% of SMIDs rising and Median Return at ${medianReturn >= 0 ? '+' : ''}${medianReturn.toFixed(1)}%.`,
          cautionFlag: null,
        };
      }
    } else if (ewMcapSpread <= -1.25) {
      divergenceVerdict = {
        title: 'Large-Cap Dominated (SMIDs Lagging)',
        tone: 'blue',
        explanation: `MCap-Weight (${mcapReturn >= 0 ? '+' : ''}${mcapReturn.toFixed(1)}%) leads Equal-Weight (${ewReturn >= 0 ? '+' : ''}${ewReturn.toFixed(1)}%) by +${Math.abs(ewMcapSpread).toFixed(1)}%. Index heavyweights are carrying the basket while smaller constituents lag.`,
        cautionFlag: 'Price strength is concentrated in larger constituents rather than smaller ones.',
      };
    } else {
      divergenceVerdict = {
        title: 'Balanced Size Participation (In-Line)',
        tone: 'slate',
        explanation: `Equal-Weight (${ewReturn >= 0 ? '+' : ''}${ewReturn.toFixed(1)}%) and MCap-Weight (${mcapReturn >= 0 ? '+' : ''}${mcapReturn.toFixed(1)}%) are moving in lockstep (Spread: ${ewMcapSpread >= 0 ? '+' : ''}${ewMcapSpread.toFixed(1)}%, Median: ${medianReturn >= 0 ? '+' : ''}${medianReturn.toFixed(1)}%).`,
        cautionFlag: null,
      };
    }

    // SIGNAL 4: Momentum Persistence across 1W, 1M, and 3M
    const r1W = weightingMode === 'mcap' ? (currentSector.mcapWt1W ?? currentSector.change1W) : (currentSector.equalWt1W ?? currentSector.change1W);
    const r1M = weightingMode === 'mcap' ? (currentSector.mcapWt1M ?? currentSector.change1M) : (currentSector.equalWt1M ?? currentSector.change1M);
    const r3M = weightingMode === 'mcap' ? (currentSector.mcapWt3M ?? currentSector.change3M ?? r1M) : (currentSector.equalWt3M ?? currentSector.change3M ?? r1M);

    const alpha1W = parseFloat((r1W - nifty500Stats.change1W).toFixed(2));
    const alpha1M = parseFloat((r1M - nifty500Stats.change1M).toFixed(2));
    const alpha3M = parseFloat((r3M - nifty500Stats.change3M).toFixed(2));

    const positiveHorizons = [r1W > 0, r1M > 0, r3M > 0].filter(Boolean).length;
    const outperformingHorizons = [alpha1W > 0, alpha1M > 0, alpha3M > 0].filter(Boolean).length;

    let persistenceRegime = {
      label: 'Mixed / Transitional',
      tone: 'slate' as 'emerald' | 'blue' | 'amber' | 'rose' | 'slate',
      summary: `${positiveHorizons}/3 horizons positive · ${outperformingHorizons}/3 beating Nifty 500`,
    };

    if (r1W > 0 && r1M > 0 && r3M > 0) {
      persistenceRegime = {
        label: '3/3 Horizon Persistence (Sustained Leaders)',
        tone: 'emerald',
        summary: `Consistent gains across 1W (+${r1W.toFixed(1)}%), 1M (+${r1M.toFixed(1)}%), and 3M (+${r3M.toFixed(1)}%)`,
      };
    } else if (r3M <= 0 && r1M > 0 && r1W > 0) {
      persistenceRegime = {
        label: 'Fresh Bullish Inflection (1M & 1W Reversal)',
        tone: 'blue',
        summary: `Turning up strongly on 1M (+${r1M.toFixed(1)}%) & 1W (+${r1W.toFixed(1)}%) out of 3M base (${r3M.toFixed(1)}%)`,
      };
    } else if (r3M > 0 && r1M > 0 && r1W <= 0) {
      persistenceRegime = {
        label: 'Short-Term Pullback in Uptrend',
        tone: 'amber',
        summary: `3M (+${r3M.toFixed(1)}%) & 1M (+${r1M.toFixed(1)}%) strong, digesting gains on 1W (${r1W.toFixed(1)}%)`,
      };
    } else if (r1W <= 0 && r1M <= 0) {
      persistenceRegime = {
        label: 'Multi-Horizon Lagging / Distribution',
        tone: 'rose',
        summary: `Persistent weakness across 1W (${r1W.toFixed(1)}%) and 1M (${r1M.toFixed(1)}%)`,
      };
    }

    return {
      nifty500Stats,
      sizeBenchmarkStats,
      medianMcap,
      ewReturn: parseFloat(ewReturn.toFixed(2)),
      mcapReturn: parseFloat(mcapReturn.toFixed(2)),
      activeSectorReturn: parseFloat(activeSectorReturn.toFixed(2)),
      rsVsNifty500,
      rsVsSizeBm,
      risingStocksCount,
      beatingN500Count,
      risingBreadthPct,
      beatingN500BreadthPct,
      ewMcapSpread,
      medianReturn,
      topGainer,
      topGainerRet: parseFloat(topGainerRet.toFixed(2)),
      top1ContributionShare,
      smidAdvancingPct,
      divergenceVerdict,
      r1W: parseFloat(r1W.toFixed(2)),
      r1M: parseFloat(r1M.toFixed(2)),
      r3M: parseFloat(r3M.toFixed(2)),
      alpha1W,
      alpha1M,
      alpha3M,
      persistenceRegime,
    };
  }, [currentSector, benchmarks, signalHorizon, weightingMode]);

  return (
    <div className="flex flex-col lg:flex-row items-stretch bg-white border border-[#b1ada1]/30 rounded-[24px] shadow-sm overflow-hidden">
      {/* ================= LEFT SIDEBAR (BENCHMARKS + PREBUILT 46 + MY INDEX) ================= */}
      <div className="w-full lg:w-[400px] xl:w-[430px] flex flex-col border-b lg:border-b-0 lg:border-r border-[#b1ada1]/30 bg-white shrink-0">
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
              {CORE_SECTOR_INDICES.length}
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
          <button
            onClick={() => setActiveTab('tracked')}
            aria-pressed={activeTab === 'tracked'}
            className={`flex-1 min-h-11 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'tracked' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-[#08090a]/60 hover:text-[#08090a]'}`}
          >
            <Star className="w-3.5 h-3.5" />
            Tracked <span className="text-[11px] opacity-70">({trackedStocks.length})</span>
          </button>
        </div>

        {activeTab === 'prebuilt' && (
          <>
        {/* PINNED MAJOR BENCHMARK ANCHORS */}
        <div className="p-2.5 bg-[#f4f3ee]/80 border-b border-[#b1ada1]/30 shrink-0">
          <div className="text-[10px] font-extrabold text-[#08090a]/60 uppercase tracking-wider px-2 mb-1.5 flex items-center justify-between font-display">
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-[#2563eb]" />
              Major Benchmark Anchors
            </span>
            <span className="text-[9px] text-[#2563eb] font-mono">Saved NSE closes</span>
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
                    <span>{data.price > 0 && Number.isFinite(data.price) ? `₹${data.price.toLocaleString('en-IN')}` : 'Quote unavailable'}</span>
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
              placeholder={`Search ${CORE_SECTOR_INDICES.length} sectors or @company (e.g. @eternal, @swiggy, @milkymist)...`}
              className="w-full pl-8 pr-3 py-2.5 text-sm bg-[#f4f3ee]/60 border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#2563eb] text-[#08090a] placeholder:text-[#08090a]/40"
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

        {/* Table Header: Name ⇅ | 1D | 1W | 1M | SMID */}
        <div className="px-3 py-2.5 flex items-center justify-between text-[11px] font-semibold text-[#08090a]/60 border-b border-[#b1ada1]/20 bg-[#fafaf9] shrink-0">
          <button
            onClick={() => toggleSort('name')}
            className={`flex items-center gap-1 hover:text-[#08090a] cursor-pointer ${
              sortField === 'name' ? 'text-[#08090a] font-bold' : ''
            }`}
          >
            <span>Sector ({filteredIndices.length})</span>
            <span className="text-[10px]">
              {sortField === 'name' ? (sortOrder === 'desc' ? '⌄' : '⌃') : '⇅'}
            </span>
          </button>

          <div className="flex items-center gap-1 pr-0.5 font-mono">
            <button
              onClick={() => toggleSort('smid')}
              title="Sort by 1M Equal-Weight minus MCap-Weight Divergence (SMID Leadership Spread)"
              className={`text-[10px] flex items-center justify-end gap-0.5 cursor-pointer px-1.5 py-0.5 rounded border transition-colors ${
                sortField === 'smid'
                  ? 'text-[#2563eb] font-extrabold bg-[#2563eb]/10 border-[#2563eb]/30'
                  : 'text-[#08090a]/65 border-[#b1ada1]/30 hover:text-[#08090a] bg-white'
              }`}
            >
              <span>EW-MCap</span>
              {sortField === 'smid' && <span className="text-[9px]">{sortOrder === 'desc' ? '⌄' : '⌃'}</span>}
            </button>
            <button
              onClick={() => toggleSort('1d')}
              title="Sort by 1-Day Session Return (Equal/MCap Avg of Constituents)"
              className={`w-11 text-right flex items-center justify-end gap-0.5 cursor-pointer px-1 py-0.5 rounded hover:bg-[#b1ada1]/20 ${
                sortField === '1d' ? 'text-[#2563eb] font-extrabold bg-[#2563eb]/8' : 'hover:text-[#08090a]'
              }`}
            >
              <span>1D</span>
              {sortField === '1d' && <span className="text-[9px]">{sortOrder === 'desc' ? '⌄' : '⌃'}</span>}
            </button>
            <button
              onClick={() => toggleSort('1w')}
              title="Sort by 1-Week (5 Trading Sessions) Rolling Return"
              className={`w-11 text-right flex items-center justify-end gap-0.5 cursor-pointer px-1 py-0.5 rounded hover:bg-[#b1ada1]/20 ${
                sortField === '1w' ? 'text-[#2563eb] font-extrabold bg-[#2563eb]/8' : 'hover:text-[#08090a]'
              }`}
            >
              <span>1W</span>
              {sortField === '1w' && <span className="text-[9px]">{sortOrder === 'desc' ? '⌄' : '⌃'}</span>}
            </button>
            <button
              onClick={() => toggleSort('1m')}
              title="Sort by 1-Month (21 Trading Sessions) Rolling Return"
              className={`w-12 text-right flex items-center justify-end gap-0.5 cursor-pointer px-1 py-0.5 rounded hover:bg-[#b1ada1]/20 ${
                sortField === '1m' ? 'text-[#2563eb] font-extrabold bg-[#2563eb]/8' : 'hover:text-[#08090a]'
              }`}
            >
              <span>1M</span>
              {sortField === '1m' && <span className="text-[9px]">{sortOrder === 'desc' ? '⌄' : '⌃'}</span>}
            </button>
          </div>
        </div>

          </>
        )}

        <a href="#sector-detail" className="lg:hidden flex items-center justify-center min-h-11 px-4 text-sm font-bold text-[#2563eb] border-b border-[#b1ada1]/30 bg-[#eff6ff]">
          Jump to selected sector analysis
        </a>

        {/* Scrollable Sector Rows with Classic Browser Scrollbar stretching to exact bottom of sidebar */}
        <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[680px] bg-white">
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
                const smidSpread = sector.ewMcapSpread1M ?? 0;

                return (
                  <div key={sector.id} className="group">
                    {/* Sector Header Row */}
                    <div
                      onClick={() => handleSelectSector(sector.id)}
                      className={`px-3 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#2563eb]/8 border-l-4 border-[#2563eb]'
                          : 'hover:bg-white border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-1 min-w-0 pr-1.5">
                        <button
                          onClick={(e) => toggleSectorExpand(sector.id, e)}
                          className="p-1 hover:bg-[#b1ada1]/20 rounded-md text-[#08090a]/60 cursor-pointer shrink-0"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#2563eb]" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#08090a]/50" />
                          )}
                        </button>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-[13px] font-semibold block line-clamp-2 leading-4 ${
                              isSelected ? 'text-[#2563eb] font-bold' : 'text-[#08090a]'
                            }`}
                          >
                            {sector.name}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#08090a]/50 font-medium">
                            <span>{sector.stocks.length} stks · {sector.breadthPositivePct}% brdth</span>
                            <span
                              className={`font-mono font-bold ${
                                smidSpread >= 1.25
                                  ? 'text-[#10b981]'
                                  : smidSpread <= -1.25
                                  ? 'text-[#2563eb]'
                                  : 'text-[#08090a]/45'
                              }`}
                              title="1M Equal-Weight minus MCap-Weight Spread"
                            >
                              · EW-MC:{smidSpread >= 0 ? '+' : ''}{smidSpread.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono shrink-0">
                        <span
                          className={`w-11 text-right ${
                            sortField === '1d' ? 'font-bold' : 'font-medium'
                          } ${sector.change1D >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}
                        >
                          {sector.change1D >= 0 ? '+' : ''}
                          {sector.change1D.toFixed(1)}%
                        </span>
                        <span
                          className={`w-11 text-right ${
                            sortField === '1w' ? 'font-bold' : 'font-medium'
                          } ${sector.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}
                        >
                          {sector.change1W >= 0 ? '+' : ''}
                          {sector.change1W.toFixed(1)}%
                        </span>
                        <span
                          className={`w-12 text-right ${
                            sortField === '1m' ? 'font-bold' : 'font-medium'
                          } ${sector.change1M >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}
                        >
                          {sector.change1M >= 0 ? '+' : ''}
                          {sector.change1M.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Expanded Company Rows */}
                    {isExpanded && (
                      <div className="bg-white/80 pl-5 pr-3 py-1 space-y-0.5 border-t border-b border-[#b1ada1]/10">
                        {[...sector.stocks]
                          .sort((a, b) => {
                            if (sortField === 'name') {
                              return sortOrder === 'asc'
                                ? a.ticker.localeCompare(b.ticker)
                                : b.ticker.localeCompare(a.ticker);
                            }
                            if (sortField === '1d') {
                              return sortOrder === 'asc' ? a.change1D - b.change1D : b.change1D - a.change1D;
                            }
                            if (sortField === '1m') {
                              return sortOrder === 'asc'
                                ? (a.change1M ?? 0) - (b.change1M ?? 0)
                                : (b.change1M ?? 0) - (a.change1M ?? 0);
                            }
                            return sortOrder === 'asc' ? a.change1W - b.change1W : b.change1W - a.change1W;
                          })
                          .map((stock) => {
                          const isStockSelected =
                            selectedStockTicker === stock.ticker && selectedSectorId === sector.id;
                          const st1M = stock.change1M ?? 0;

                          return (
                            <div
                              key={stock.ticker}
                              onClick={(e) => handleSelectStock(stock.ticker, sector.id, e)}
                              className={`flex items-center justify-between py-1.5 px-1.5 rounded-lg cursor-pointer transition-colors ${
                                isStockSelected
                                  ? 'bg-[#2563eb]/10 text-[#2563eb]'
                                  : 'hover:bg-[#f4f3ee] text-[#08090a]'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 min-w-0 pr-1.5">
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

                              <div className="flex items-center gap-1.5 text-[10px] font-mono shrink-0">
                                <span
                                  className={`w-12 text-right ${
                                    sortField === '1d' ? 'font-bold' : ''
                                  } ${stock.change1D >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}
                                >
                                  {stock.change1D >= 0 ? '+' : ''}
                                  {stock.change1D.toFixed(1)}%
                                </span>
                                <span
                                  className={`w-12 text-right ${
                                    sortField === '1w' ? 'font-bold' : ''
                                  } ${stock.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}
                                >
                                  {stock.change1W >= 0 ? '+' : ''}
                                  {stock.change1W.toFixed(1)}%
                                </span>
                                <span
                                  className={`w-13 text-right ${
                                    sortField === '1m' ? 'font-bold' : ''
                                  } ${st1M >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}
                                >
                                  {st1M >= 0 ? '+' : ''}
                                  {st1M.toFixed(1)}%
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
                  ✓ Showing {filteredIndices.length} of {CORE_SECTOR_INDICES.length} Industry Clusters
                </div>
              ])
            ) : activeTab === 'myIndex' ? (
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
            ) : (
              <TrackedStocksPanel
                items={trackedStocks}
                quotes={liveStocksData}
                onAdd={handleAddTrackedStock}
                onRemove={handleRemoveTrackedStock}
                onOpenStock={openTrackedStock}
              />
            )}
          </div>
        </div>
      </div>

      {/* ================= RIGHT MAIN CANVAS (DEFINITIVE PROOF & BENCHMARK COMPARISONS) ================= */}
      <div id="sector-detail" className="flex-1 flex flex-col bg-white min-w-0 scroll-mt-20">
        {/* Header: Title + Mode Switcher */}
        <div className="px-4 sm:px-6 py-4 border-b border-[#b1ada1]/30 flex flex-wrap items-center justify-between gap-3 bg-white shrink-0">
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
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#08090a] font-display tracking-tight break-words">
                  {currentStock ? currentStock.ticker : currentSector.name}
                </h2>
                {!currentStock && !currentSector.isBenchmark && (
                  <span title="Directional participation alone is not proof of institutional flows; sample size matters"
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg font-display inline-flex items-center gap-1.5 ${currentSector.stocks.length < 4 ? 'bg-[#fffbeb] text-[#92400e] border border-[#fbbf24]/40' : 'bg-[#eff6ff] text-[#1d4ed8]'}`}>
                    <Activity className="w-3.5 h-3.5" />
                    <span>{synchronyScore}% directional · {currentSector.stocks.length} stocks{currentSector.stocks.length < 4 ? ' · small sample' : ''}</span>
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
                  ? `Reference benchmark or ETF proxy · ${currentSector.category}`
                  : `${currentSector.stocks.length} priced core constituents · curated thematic basket`}
              </p>
            </div>
          </div>

          {/* Visualization Modes */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#f4f3ee] p-1 rounded-xl border border-[#b1ada1]/30">
            <button
              onClick={() => setViewProofMode('overlay')}
              className={`px-3 min-h-10 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-display ${
                viewProofMode === 'overlay'
                  ? 'bg-[#08090a] text-white shadow-xs'
                  : 'text-[#08090a]/70 hover:text-[#08090a]'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Stocks</span>
            </button>

            <button
              onClick={() => setViewProofMode('composite')}
              className={`px-3 min-h-10 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-display ${
                viewProofMode === 'composite'
                  ? 'bg-[#08090a] text-white shadow-xs'
                  : 'text-[#08090a]/70 hover:text-[#08090a]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>EW vs MCap</span>
            </button>

            <button
              onClick={() => setViewProofMode('rotation')}
              className={`px-3 min-h-10 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-display ${
                viewProofMode === 'rotation'
                  ? 'bg-[#08090a] text-white shadow-xs'
                  : 'text-[#08090a]/70 hover:text-[#08090a]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Rotation</span>
            </button>
          </div>
        </div>

        {/* ================= BENCHMARK COMPARISON ANCHOR CONTROLS ================= */}
        {/* Allows 1-click overlay of Nifty 50, Midcap 100, Smallcap 100 in the same chart */}
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-[#b1ada1]/20 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-[#08090a] font-display flex items-center gap-1 text-[11px]">
              <Globe className="w-3.5 h-3.5 text-[#2563eb]" />
              Compare vs Benchmarks:
            </span>

            {[
              { key: 'nifty50', label: 'NIFTY 50', color: BENCHMARK_COLORS.nifty50 },
              { key: 'niftyMidcap', label: 'Midcap ETF proxy', color: BENCHMARK_COLORS.niftyMidcap },
              { key: 'niftySmallcap', label: 'Smallcap ETF proxy', color: BENCHMARK_COLORS.niftySmallcap },
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
              onClick={() => {
                if (currentStock) handleAddTrackedStock(currentStock.ticker, currentStock.name, selectedSectorId);
                else setActiveTab('tracked');
              }}
              className="px-3 min-h-10 text-xs sm:text-sm font-bold text-[#08090a] bg-[#eff6ff] border border-[#93c5fd]/60 rounded-xl hover:bg-[#dbeafe] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              title={currentStock ? 'Save this stock to your private browser watchlist' : 'Open My Tracked Stocks and add a symbol'}
            >
              <Star className="w-4 h-4 text-[#2563eb]"/>
              <span>{currentStock ? 'Track stock' : 'Add stock'}</span>
            </button>
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

        {/* High-priority decision summary: chart immediately follows this. */}
        <section aria-label="Sector performance summary"
          className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 px-4 sm:px-6 pt-4 bg-white">
          <div className="p-3 rounded-xl border border-[#b1ada1]/25 bg-[#fafaf9]">
            <span className="block text-xs font-semibold text-[#08090a]/60">1-week performance</span>
            <span className={`block text-xl sm:text-2xl font-bold font-mono mt-1 ${currentSector.change1W >= 0 ? 'text-[#047857]' : 'text-[#be123c]'}`}>
              {currentSector.change1W > 0 ? '+' : ''}{currentSector.change1W.toFixed(2)}%
            </span>
          </div>
          <div className="p-3 rounded-xl border border-[#b1ada1]/25 bg-[#fafaf9]">
            <span className="block text-xs font-semibold text-[#08090a]/60">Rotation phase</span>
            <span className="block text-lg sm:text-xl font-bold mt-1">{currentSector.rotationStatus}</span>
            <span className="text-xs text-[#08090a]/55">Price-based heuristic</span>
          </div>
          <div className="p-3 rounded-xl border border-[#b1ada1]/25 bg-[#fafaf9]">
            <span className="block text-xs font-semibold text-[#08090a]/60">
              {currentSector.isBenchmark ? '3-month return' : `Relative strength vs NIFTY 500 · ${signalHorizon}`}
            </span>
            <span className={`block text-xl sm:text-2xl font-bold font-mono mt-1 ${(currentSector.isBenchmark ? currentSector.change3M ?? 0 : fourSignalDiagnostics.rsVsNifty500) >= 0 ? 'text-[#047857]' : 'text-[#be123c]'}`}>
              {(currentSector.isBenchmark ? (currentSector.change3M ?? 0) : fourSignalDiagnostics.rsVsNifty500) > 0 ? '+' : ''}
              {(currentSector.isBenchmark ? (currentSector.change3M ?? 0) : fourSignalDiagnostics.rsVsNifty500).toFixed(2)}%
            </span>
          </div>
          <div className="p-3 rounded-xl border border-[#b1ada1]/25 bg-[#fafaf9]">
            <span className="block text-xs font-semibold text-[#08090a]/60">
              {currentSector.isBenchmark ? 'Reference series' : 'Rising constituents · 1W'}
            </span>
            <span className="block text-xl sm:text-2xl font-bold font-mono mt-1">
              {currentSector.isBenchmark ? 'Index' : `${advancingCount1W} / ${currentSector.stocks.length}`}
            </span>
            {!currentSector.isBenchmark && <span className="text-xs text-[#08090a]/55">{synchronyScore}% directional agreement · sample size matters</span>}
          </div>
        </section>
        {!currentSector.isBenchmark && (
          <div className={`mx-4 sm:mx-6 mt-3 px-3 py-2.5 rounded-xl border text-xs sm:text-sm flex flex-wrap gap-x-3 gap-y-1 ${currentSector.stocks.length < 4 || (currentSector.dataCoveragePct ?? 0) < 80 || topCapWeightPct >= 65 ? 'bg-[#fffbeb] border-[#fbbf24]/40 text-[#92400e]' : 'bg-[#f8fafc] border-[#b1ada1]/25 text-[#08090a]/75'}`}>
            <span className="font-bold">{currentSector.stocks.length < 4 || (currentSector.dataCoveragePct ?? 0) < 80 || topCapWeightPct >= 65 ? 'Limited signal confidence' : 'Data coverage check'}</span>
            <span>{currentSector.stocks.length} priced core stocks</span>
            <span>{currentSector.dataCoveragePct ?? 0}% historical coverage</span>
            {topCapWeightPct >= 50 && <span>Largest company ~{topCapWeightPct}% of stored MCap</span>}
          </div>
        )}

        {/* Main Chart Canvas */}
        <div ref={themeChartRef} className="p-4 sm:p-6 space-y-6 scroll-mt-20">
          {viewProofMode === 'overlay' ? (
            // ================= MULTI-STOCK OVERLAY WITH BENCHMARK ANCHORS =================
            <div className="bg-white p-5 rounded-[22px] border border-[#b1ada1]/30 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-[#08090a] font-display flex items-center gap-2">
                    <span>
                      {currentSector.name} Stock & Benchmark Performance
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
                  1W: {currentSector.change1W >= 0 ? '+' : ''}{currentSector.change1W.toFixed(2)}% · 1M: {currentSector.change1M >= 0 ? '+' : ''}{currentSector.change1M.toFixed(2)}%
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
                      name={`${currentSector.name} (${weightingMode === 'mcap' ? 'MCap Wt' : 'Equal Wt'})`}
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
            // ================= COMPOSITE EQUAL-WEIGHTED VS MCAP-WEIGHTED AREA CHART =================
            <div className="bg-white p-5 rounded-[22px] border border-[#b1ada1]/30 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-extrabold text-[#08090a] font-display">
                    {currentStock
                      ? `${currentStock.name} (${currentStock.ticker}) Price Action (₹)`
                      : `${currentSector.name} — Equal-Weight vs. Market-Cap Weight Composite (Base 100)`}
                  </h3>
                  <p className="text-xs text-[#08090a]/60">
                    {currentStock
                      ? `Real daily market closes on NSE from ₹${(singleStockSeries?.[0]?.value || currentStock.price).toLocaleString('en-IN')} to ₹${currentStock.price.toLocaleString('en-IN')}`
                      : currentSector.isBenchmark
                      ? 'Official historical index trendline normalized across 63 trading sessions'
                      : 'Solid Line = Equal-Weighted Index (SMID participation) · Dashed Purple Line = Market-Cap Weighted Index (Large-cap leadership)'}
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
                      EW 3M: {(currentSector.equalWt3M ?? 0) >= 0 ? '+' : ''}{(currentSector.equalWt3M ?? 0).toFixed(1)}% | MCap 3M: {(currentSector.mcapWt3M ?? 0) >= 0 ? '+' : ''}{(currentSector.mcapWt3M ?? 0).toFixed(1)}%
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
                      contentStyle={{
                        backgroundColor: '#08090a',
                        borderColor: '#2563eb',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '12px',
                      }}
                    />
                    {currentStock || currentSector.isBenchmark ? (
                      <Area
                        type="monotone"
                        dataKey="value"
                        name={currentStock ? `${currentStock.ticker} Price (₹)` : 'Benchmark Index'}
                        stroke={chartStrokeColor}
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorCompVal)"
                      />
                    ) : (
                      <>
                        <Area
                          type="monotone"
                          dataKey="equalWeightValue"
                          name="Equal-Weight Index (SMIDs Equal)"
                          stroke="#10b981"
                          strokeWidth={2.8}
                          fillOpacity={1}
                          fill="url(#colorCompVal)"
                        />
                        <Area
                          type="monotone"
                          dataKey="mcapWeightValue"
                          name="MCap-Weight Index (Large Caps)"
                          stroke="#7c3aed"
                          strokeWidth={2.2}
                          strokeDasharray="5 3"
                          fillOpacity={0}
                        />
                      </>
                    )}
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
                  Price-Based Sector Rotation Phase: {currentSector.name}
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
                    High relative strength vs Nifty 50 with sustained multi-week price outperformance.
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
                    Price underperformance; verify trend and breadth before inferring selling.
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
                    Prices recovering from a weak base with improving breadth.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Supporting evidence follows the principal chart, collapsed by default. */}
          {!currentSector.isBenchmark && (
            <details className="group bg-[#fafaf9] border border-[#b1ada1]/30 rounded-[18px] overflow-hidden">
              <summary className="cursor-pointer select-none flex items-center justify-between gap-2 p-4 text-sm font-bold text-[#08090a] hover:bg-[#f4f3ee]">
                <span>Advanced analysis · Four rotation signals</span>
                <span className="text-[#08090a]/55 text-xs font-medium group-open:hidden">Expand</span>
                <span className="text-[#08090a]/55 text-xs font-medium hidden group-open:block">Collapse</span>
              </summary>
        {/* ================= 4-SIGNAL INSTITUTIONAL ROTATION & SMID DIVERGENCE DIAGNOSTIC PANEL ================= */}
        {!currentSector.isBenchmark && (
          <div className="px-6 py-4 bg-[#fafaf9] border-b border-[#b1ada1]/25 space-y-3 shrink-0">
            {/* Top Bar: Title + Horizon Selector (1W | 1M | 3M) */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#08090a] font-display uppercase tracking-wider">
                  4-Signal Price Rotation & SMID Divergence Engine
                </span>
                <span className="text-[11px] text-[#08090a]/55 font-mono">
                  · Median Constituent MCap: ₹{Math.round(fourSignalDiagnostics.medianMcap).toLocaleString('en-IN')} Cr
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#08090a]/60 font-semibold">Signal Horizon:</span>
                <div className="flex items-center bg-white p-0.5 rounded-lg border border-[#b1ada1]/35">
                  {(['1W', '1M', '3M'] as const).map((h) => (
                    <button
                      key={h}
                      onClick={() => setSignalHorizon(h)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                        signalHorizon === h
                          ? 'bg-[#08090a] text-white'
                          : 'text-[#08090a]/65 hover:text-[#08090a]'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4-Signal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {/* SIGNAL 1: Relative Strength */}
              <div className="bg-white p-3.5 rounded-xl border border-[#b1ada1]/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#08090a]/55 font-display">
                    <span>1. Relative Strength ({signalHorizon})</span>
                    <span
                      className={`font-mono font-bold ${
                        fourSignalDiagnostics.rsVsNifty500 >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                      }`}
                    >
                      {fourSignalDiagnostics.rsVsNifty500 >= 0 ? 'Outperforming' : 'Lagging'}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs text-[#08090a]/70 font-medium">vs NIFTY 500:</span>
                    <span
                      className={`text-sm font-mono font-extrabold ${
                        fourSignalDiagnostics.rsVsNifty500 >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                      }`}
                    >
                      {fourSignalDiagnostics.rsVsNifty500 >= 0 ? '+' : ''}
                      {fourSignalDiagnostics.rsVsNifty500.toFixed(2)}% Alpha
                    </span>
                  </div>

                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xs text-[#08090a]/70 font-medium">
                      vs {fourSignalDiagnostics.sizeBenchmarkStats.name.replace('NIFTY ', '')}:
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        fourSignalDiagnostics.rsVsSizeBm >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                      }`}
                    >
                      {fourSignalDiagnostics.rsVsSizeBm >= 0 ? '+' : ''}
                      {fourSignalDiagnostics.rsVsSizeBm.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#b1ada1]/15 text-[10px] text-[#08090a]/60 font-mono flex items-center justify-between">
                  <span>Sector ({weightingMode === 'mcap' ? 'MCap' : 'EW'}):</span>
                  <span className="font-bold text-[#08090a]">
                    {fourSignalDiagnostics.activeSectorReturn >= 0 ? '+' : ''}
                    {fourSignalDiagnostics.activeSectorReturn.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* SIGNAL 2: Dual Breadth */}
              <div className="bg-white p-3.5 rounded-xl border border-[#b1ada1]/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#08090a]/55 font-display">
                    <span>2. Constituent Breadth ({signalHorizon})</span>
                    <span className="font-mono font-bold text-[#08090a]">
                      {currentSector.stocks.length} Stocks
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs text-[#08090a]/70 font-medium">Absolute Rising (&gt;0%):</span>
                    <span
                      className={`text-sm font-mono font-extrabold ${
                        fourSignalDiagnostics.risingBreadthPct >= 60 ? 'text-[#10b981]' : 'text-[#f59e0b]'
                      }`}
                    >
                      {fourSignalDiagnostics.risingBreadthPct}% ({fourSignalDiagnostics.risingStocksCount}/{currentSector.stocks.length})
                    </span>
                  </div>

                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xs text-[#08090a]/70 font-medium">Beating NIFTY 500:</span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        fourSignalDiagnostics.beatingN500BreadthPct >= 55 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                      }`}
                    >
                      {fourSignalDiagnostics.beatingN500BreadthPct}% ({fourSignalDiagnostics.beatingN500Count}/{currentSector.stocks.length})
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#b1ada1]/15 text-[10px] text-[#08090a]/60 font-mono flex items-center justify-between">
                  <span>1D Session A/D:</span>
                  <span>
                    <strong className="text-[#10b981]">{advancingCount1D} Up</strong> /{' '}
                    <strong className="text-[#f43f5e]">{decliningCount1D} Down</strong>
                  </span>
                </div>
              </div>

              {/* SIGNAL 3: Equal-Weight vs MCap-Weight Divergence (SMID Leadership vs Outlier Check) */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                  fourSignalDiagnostics.divergenceVerdict.tone === 'emerald'
                    ? 'bg-[#10b981]/5 border-[#10b981]/40'
                    : fourSignalDiagnostics.divergenceVerdict.tone === 'amber'
                    ? 'bg-[#f59e0b]/5 border-[#f59e0b]/40'
                    : fourSignalDiagnostics.divergenceVerdict.tone === 'blue'
                    ? 'bg-[#2563eb]/5 border-[#2563eb]/35'
                    : 'bg-white border-[#b1ada1]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#08090a]/65 font-display">
                    <span>3. EW vs MCap Divergence ({signalHorizon})</span>
                    <span
                      className={`font-mono font-extrabold ${
                        fourSignalDiagnostics.ewMcapSpread >= 1.25
                          ? 'text-[#10b981]'
                          : fourSignalDiagnostics.ewMcapSpread <= -1.25
                          ? 'text-[#2563eb]'
                          : 'text-[#08090a]'
                      }`}
                    >
                      Spread: {fourSignalDiagnostics.ewMcapSpread >= 0 ? '+' : ''}
                      {fourSignalDiagnostics.ewMcapSpread.toFixed(1)}%
                    </span>
                  </div>

                  {/* Side-by-side Equal-Weight vs MCap-Weight Return Boxes */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-white/90 px-2.5 py-1.5 rounded-lg border border-[#b1ada1]/25">
                      <span className="text-[9px] font-bold uppercase text-[#08090a]/55 block">
                        Equal-Weight
                      </span>
                      <span
                        className={`text-sm font-mono font-extrabold ${
                          fourSignalDiagnostics.ewReturn >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                        }`}
                      >
                        {fourSignalDiagnostics.ewReturn >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.ewReturn.toFixed(1)}%
                      </span>
                      <span className="text-[9px] text-[#08090a]/50 block truncate">
                        SMIDs equal voice
                      </span>
                    </div>

                    <div className="bg-white/90 px-2.5 py-1.5 rounded-lg border border-[#b1ada1]/25">
                      <span className="text-[9px] font-bold uppercase text-[#08090a]/55 block">
                        MCap-Weight
                      </span>
                      <span
                        className={`text-sm font-mono font-extrabold ${
                          fourSignalDiagnostics.mcapReturn >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                        }`}
                      >
                        {fourSignalDiagnostics.mcapReturn >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.mcapReturn.toFixed(1)}%
                      </span>
                      <span className="text-[9px] text-[#08090a]/50 block truncate">
                        Large caps dominate
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-[#b1ada1]/20 text-[10px]">
                  <span
                    className={`font-bold block ${
                      fourSignalDiagnostics.divergenceVerdict.tone === 'emerald'
                        ? 'text-[#10b981]'
                        : fourSignalDiagnostics.divergenceVerdict.tone === 'amber'
                        ? 'text-[#d97706]'
                        : fourSignalDiagnostics.divergenceVerdict.tone === 'blue'
                        ? 'text-[#2563eb]'
                        : 'text-[#08090a]'
                    }`}
                  >
                    {fourSignalDiagnostics.divergenceVerdict.title}
                  </span>
                  <span className="text-[#08090a]/65 font-mono text-[9px] block mt-0.5">
                    Median: {fourSignalDiagnostics.medianReturn >= 0 ? '+' : ''}
                    {fourSignalDiagnostics.medianReturn.toFixed(1)}% · Top1 Share:{' '}
                    {fourSignalDiagnostics.top1ContributionShare}% ({fourSignalDiagnostics.topGainer?.ticker})
                  </span>
                </div>
              </div>

              {/* SIGNAL 4: Momentum Persistence (1W, 1M, 3M) */}
              <div className="bg-white p-3.5 rounded-xl border border-[#b1ada1]/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#08090a]/55 font-display">
                    <span>4. Momentum Persistence</span>
                    <span className="font-mono text-[10px] text-[#08090a]/60">1W → 1M → 3M</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mt-2 text-center font-mono">
                    <div className="bg-[#fafaf9] p-1.5 rounded-lg border border-[#b1ada1]/20">
                      <span className="text-[9px] text-[#08090a]/55 block">1W</span>
                      <span
                        className={`text-xs font-extrabold ${
                          fourSignalDiagnostics.r1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                        }`}
                      >
                        {fourSignalDiagnostics.r1W >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.r1W.toFixed(1)}%
                      </span>
                      <span className="text-[8px] text-[#08090a]/50 block">
                        α:{fourSignalDiagnostics.alpha1W >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.alpha1W.toFixed(1)}%
                      </span>
                    </div>

                    <div className="bg-[#fafaf9] p-1.5 rounded-lg border border-[#b1ada1]/20">
                      <span className="text-[9px] text-[#08090a]/55 block">1M</span>
                      <span
                        className={`text-xs font-extrabold ${
                          fourSignalDiagnostics.r1M >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                        }`}
                      >
                        {fourSignalDiagnostics.r1M >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.r1M.toFixed(1)}%
                      </span>
                      <span className="text-[8px] text-[#08090a]/50 block">
                        α:{fourSignalDiagnostics.alpha1M >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.alpha1M.toFixed(1)}%
                      </span>
                    </div>

                    <div className="bg-[#fafaf9] p-1.5 rounded-lg border border-[#b1ada1]/20">
                      <span className="text-[9px] text-[#08090a]/55 block">3M</span>
                      <span
                        className={`text-xs font-extrabold ${
                          fourSignalDiagnostics.r3M >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                        }`}
                      >
                        {fourSignalDiagnostics.r3M >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.r3M.toFixed(1)}%
                      </span>
                      <span className="text-[8px] text-[#08090a]/50 block">
                        α:{fourSignalDiagnostics.alpha3M >= 0 ? '+' : ''}
                        {fourSignalDiagnostics.alpha3M.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-[#b1ada1]/15 text-[10px]">
                  <span
                    className={`font-bold block ${
                      fourSignalDiagnostics.persistenceRegime.tone === 'emerald'
                        ? 'text-[#10b981]'
                        : fourSignalDiagnostics.persistenceRegime.tone === 'blue'
                        ? 'text-[#2563eb]'
                        : fourSignalDiagnostics.persistenceRegime.tone === 'amber'
                        ? 'text-[#d97706]'
                        : fourSignalDiagnostics.persistenceRegime.tone === 'rose'
                        ? 'text-[#f43f5e]'
                        : 'text-[#08090a]'
                    }`}
                  >
                    {fourSignalDiagnostics.persistenceRegime.label}
                  </span>
                  <span className="text-[9px] text-[#08090a]/60 block truncate">
                    {fourSignalDiagnostics.persistenceRegime.summary}
                  </span>
                </div>
              </div>
            </div>

            {/* Diagnostic Callout Banner Explaining EW vs MCap & Outlier/Liquidity Nuance */}
            <div className="px-3.5 py-2 rounded-xl bg-white border border-[#b1ada1]/30 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="text-[#08090a]/80">
                <strong className="text-[#08090a] font-display">SMID Divergence Diagnostic: </strong>
                {fourSignalDiagnostics.divergenceVerdict.explanation}
              </div>
              {fourSignalDiagnostics.divergenceVerdict.cautionFlag && (
                <span className="text-[10px] font-mono font-bold text-[#d97706] bg-[#f59e0b]/10 px-2 py-0.5 rounded border border-[#f59e0b]/30">
                  ⚠ {fourSignalDiagnostics.divergenceVerdict.cautionFlag}
                </span>
              )}
            </div>
          </div>
        )}


            </details>
          )}

        {!currentSector.isBenchmark && (
          <div className="px-5 py-2.5 border-b border-[#b1ada1]/20 bg-[#fffbeb] text-[11px] text-[#78350f]">
            Core data coverage: {currentSector.dataCoveragePct ?? 0}% · Basket size: {currentSector.stocks.length}
            {currentSector.stocks.length < 4 ? ' · Low-confidence breadth: fewer than 4 priced core stocks' : ''}
            {topCapWeightPct >= 50 ? ` · Concentration caution: largest company has approximately ${topCapWeightPct}% of stored market-cap weight` : ''}
            {' · '}Market-cap weights are static estimates, not free-float index weights.
          </div>
        )}


          {thematicBeneficiaries.length > 0 && (
            <details className="group border border-[#b1ada1]/30 rounded-[18px] overflow-hidden">
              <summary className="cursor-pointer select-none flex items-center justify-between gap-2 p-4 text-sm font-bold text-[#08090a] hover:bg-[#fafaf9]">
                <span>Related businesses · {thematicBeneficiaries.length} adjacent opportunities</span>
                <span className="text-xs font-medium text-[#08090a]/55">View list</span>
              </summary>
        {/* Adjacent thematic beneficiaries remain research candidates, not sector constituents. */}
        {thematicBeneficiaries.length > 0 && (
          <div className="px-5 py-3 bg-[#f1f5f9] border-b border-[#b1ada1]/20 text-[11px]">
            <div className="font-bold text-[#08090a] mb-1">
              Core rotation basket: {currentSector.stocks.length} priced stocks · Adjacent opportunities / proxies: {thematicBeneficiaries.length}
            </div>
            <div className="flex flex-wrap gap-2">
              {thematicBeneficiaries.map(member => (
                <span key={member.stock.ticker}
                  title={member.reason}
                  className="rounded-md px-2 py-1 border border-[#b1ada1]/30 bg-white text-[#08090a]/80">
                  {member.stock.ticker} · {member.tier === 'proxy' ? 'proxy' : 'adjacent'}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-[#08090a]/60 mt-1">
              These businesses are excluded from core sector returns. Theme classifications are editorial and require company-segment verification.
            </p>
          </div>
        )}


            </details>
          )}

          {/* Return Dispersion Strip */}
          {currentSector.stocks.length > 0 && (
            <div className="bg-white p-4 rounded-[20px] border border-[#b1ada1]/30 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#08090a] font-display">
                  1-Week Return Dispersion Spectrum (Cluster Tightness)
                </span>
                <span className="text-[#08090a]/60 text-[11px]">
                  Positive returns indicate participation, not verified capital inflows
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
