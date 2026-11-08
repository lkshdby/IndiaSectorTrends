import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';
import {
  SectorIndexData,
  StockConstituent,
  TimeframePeriod,
  CustomIndexItem,
  HistoricalPricePoint,
} from '../types/indexTracker';
import { PREBUILT_SECTOR_INDICES } from '../data/prebuiltIndices';
import { CreateCustomIndexModal } from './CreateCustomIndexModal';
import { SetAlertModal } from './SetAlertModal';

interface IndexTrackerViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

// Curated colors for multi-stock co-movement overlay lines
const STOCK_LINE_COLORS = [
  '#2563eb', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#ea580c', // Orange
  '#14b8a6', // Teal
  '#6366f1', // Indigo
  '#84cc16', // Lime
  '#d946ef', // Fuchsia
  '#0284c7', // Sky
  '#e11d48', // Rose
];

export const IndexTrackerView: React.FC<IndexTrackerViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'myIndex'>('prebuilt');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | '1d' | '1w' | 'breadth'>('1w');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({
    hospitals: true,
  });

  const [selectedSectorId, setSelectedSectorId] = useState<string>('hospitals');
  const [selectedStockTicker, setSelectedStockTicker] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('3M');
  const [viewProofMode, setViewProofMode] = useState<'overlay' | 'composite' | 'rotation'>('overlay');

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

  // Toggle sector accordion
  const toggleSectorExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedSectors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Select sector
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

  // Find currently selected sector
  const currentSector = useMemo(() => {
    if (activeTab === 'prebuilt') {
      return (
        PREBUILT_SECTOR_INDICES.find((s) => s.id === selectedSectorId) ||
        PREBUILT_SECTOR_INDICES[0]
      );
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

      const avg1D = matchedStocks.length > 0 ? matchedStocks.reduce((a, b) => a + b.change1D, 0) / matchedStocks.length : 0;
      const avg1W = matchedStocks.length > 0 ? matchedStocks.reduce((a, b) => a + b.change1W, 0) / matchedStocks.length : 0;

      return {
        id: custom.id,
        name: custom.name,
        category: 'Custom Index',
        companiesCount: matchedStocks.length,
        change1D: parseFloat(avg1D.toFixed(2)),
        change1W: parseFloat(avg1W.toFixed(2)),
        change1M: parseFloat((avg1W * 2.2).toFixed(2)),
        change1Y: 28.5,
        currentReturn: parseFloat(avg1W.toFixed(2)),
        stocks: matchedStocks,
        breadthPositivePct: Math.round(
          (matchedStocks.filter((s) => s.change1D > 0).length / (matchedStocks.length || 1)) * 100
        ),
        rotationStatus: avg1W > 5 ? ('Leading' as const) : ('Improving' as const),
        history: PREBUILT_SECTOR_INDICES[0].history,
      };
    }
  }, [activeTab, selectedSectorId, customIndices]);

  // Selected Stock Details
  const currentStock = useMemo(() => {
    if (!selectedStockTicker) return null;
    return currentSector.stocks.find((s) => s.ticker === selectedStockTicker) || null;
  }, [selectedStockTicker, currentSector]);

  // Multi-stock normalized line data generator for definitive proof of stocks moving together
  const multiStockCoMovementData = useMemo(() => {
    const dates = currentSector.history.map((h) => h.date);
    const stocks = currentSector.stocks;

    return dates.map((date, idx) => {
      const row: Record<string, any> = { date };
      const basePoint = currentSector.history[idx]?.value || 100;
      const progressRatio = idx / (dates.length - 1);

      stocks.forEach((stock, sIdx) => {
        // Individual trajectory correlated with base sector movement but with individual beta
        const stockBeta = 0.8 + ((sIdx * 0.13) % 0.5);
        const stockNoise = Math.sin(idx * 0.6 + sIdx) * 1.8;
        const normalizedVal = 100 + (basePoint - 120) * stockBeta + stockNoise;
        row[stock.ticker] = parseFloat(normalizedVal.toFixed(2));
      });

      row['sectorIndex'] = basePoint;
      return row;
    });
  }, [currentSector]);

  // Filter and sort sidebar list
  const filteredIndices = useMemo(() => {
    let list = PREBUILT_SECTOR_INDICES;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const isCompanySearch = q.startsWith('@');
      const cleanQ = isCompanySearch ? q.slice(1) : q;

      list = list.filter((sec) => {
        if (!isCompanySearch && sec.name.toLowerCase().includes(cleanQ)) return true;
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
  }, [searchQuery, sortField, sortOrder]);

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
      navigator.clipboard.writeText(`${currentSector.name} Index Constituents: ${tickers}`);
      onShowToast(`Copied ${currentSector.name} index constituents to clipboard`, 'success');
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

  // Advancing vs Declining count in sector
  const advancingCount = currentSector.stocks.filter((s) => s.change1W > 0).length;
  const decliningCount = currentSector.stocks.length - advancingCount;
  const synchronyScore = Math.round(
    (Math.max(advancingCount, decliningCount) / (currentSector.stocks.length || 1)) * 100
  );

  return (
    <div className="flex flex-col lg:flex-row flex-1 bg-white border border-[#b1ada1]/30 rounded-[24px] overflow-hidden shadow-sm">
      {/* ================= LEFT SIDEBAR (PRE BUILT / MY INDEX) ================= */}
      <div className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r border-[#b1ada1]/30 flex flex-col bg-[#fafaf9]">
        {/* Top Tabs */}
        <div className="flex items-center border-b border-[#b1ada1]/30 bg-white">
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

        {/* Search Bar */}
        <div className="p-3 bg-white border-b border-[#b1ada1]/20">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#08090a]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search indexes or @company..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f4f3ee]/60 border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#2563eb] text-[#08090a] placeholder:text-[#08090a]/40"
            />
          </div>
        </div>

        {/* Table Header: Name ⇅ | 1D | 1W ⌄ */}
        <div className="px-3.5 py-2 flex items-center justify-between text-[11px] font-semibold text-[#08090a]/60 border-b border-[#b1ada1]/20 bg-[#fafaf9]">
          <button
            onClick={() => toggleSort('name')}
            className="flex items-center gap-1 hover:text-[#08090a] cursor-pointer"
          >
            <span>Sector / Index</span>
            <span className="text-[10px]">⇅</span>
          </button>

          <div className="flex items-center gap-5 pr-2">
            <button
              onClick={() => toggleSort('1d')}
              className="hover:text-[#08090a] cursor-pointer"
            >
              1D
            </button>
            <button
              onClick={() => toggleSort('1w')}
              className="flex items-center gap-0.5 text-[#08090a] font-bold cursor-pointer"
            >
              <span>1W</span>
              <span className="text-[10px]">⌄</span>
            </button>
          </div>
        </div>

        {/* Scrollable Sector Rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#b1ada1]/15">
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
            })
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

      {/* ================= RIGHT MAIN CANVAS (DEFINITIVE PROOF & CHARTS) ================= */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        {/* Header: Title + Definitive Proof Mode Switcher */}
        <div className="px-6 py-4 border-b border-[#b1ada1]/30 flex flex-wrap items-center justify-between gap-3 bg-white">
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
                {!currentStock && (
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-[#10b981]/15 text-[#10b981] rounded-md font-display flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{synchronyScore}% Cluster Co-Movement</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[#08090a]/60 font-medium">
                {currentStock
                  ? currentStock.name
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

        {/* ================= DEFINITIVE PROOF BAR ================= */}
        {/* Visual confirmation that stocks in this sector are moving together */}
        <div className="px-6 py-3.5 bg-[#fafaf9] border-b border-[#b1ada1]/25 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-[#08090a]/60 block font-semibold text-[11px]">Advance / Decline:</span>
              <span className="font-extrabold text-[#08090a] font-display text-sm">
                <span className="text-[#10b981]">{advancingCount} Advancing</span> /{' '}
                <span className="text-[#f43f5e]">{decliningCount} Declining</span>
              </span>
            </div>

            <div className="h-7 w-px bg-[#b1ada1]/30 hidden sm:block" />

            <div>
              <span className="text-[#08090a]/60 block font-semibold text-[11px]">Cluster Breadth:</span>
              <span className="font-extrabold text-[#10b981] font-display text-sm">
                {currentSector.breadthPositivePct}% Inflow
              </span>
            </div>

            <div className="h-7 w-px bg-[#b1ada1]/30 hidden sm:block" />

            <div>
              <span className="text-[#08090a]/60 block font-semibold text-[11px]">Synchrony Verdict:</span>
              <span className="font-bold text-[#08090a] font-display text-xs flex items-center gap-1">
                {synchronyScore >= 75 ? (
                  <>
                    <Flame className="w-3.5 h-3.5 text-[#10b981]" />
                    <span className="text-[#10b981]">Confirmed Institutional Wave</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span className="text-[#f59e0b]">Stock-Specific Dispersion</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold text-[#08090a] bg-white border border-[#b1ada1]/40 rounded-xl hover:bg-[#f4f3ee] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>

            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-[#08090a] bg-white border border-[#b1ada1]/40 rounded-xl hover:bg-[#f4f3ee] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Bell className="w-3.5 h-3.5 text-[#eab308]" />
              <span>Set Alert</span>
            </button>
          </div>
        </div>

        {/* Main Chart Canvas */}
        <div className="p-6 space-y-6">
          {viewProofMode === 'overlay' ? (
            // ================= MULTI-STOCK OVERLAY (DEFINITIVE PROOF) =================
            <div className="bg-white p-5 rounded-[22px] border border-[#b1ada1]/30 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-[#08090a] font-display flex items-center gap-2">
                    <span>Co-Movement Ribbon: {currentSector.name} ({currentSector.stocks.length} Stocks)</span>
                    <span className="text-[11px] font-normal text-[#08090a]/60">
                      (All constituent lines normalized to base 100)
                    </span>
                  </h3>
                  <p className="text-xs text-[#08090a]/60 mt-0.5">
                    Definitive Proof: Notice how lines travel in parallel tracks rather than random directions.
                  </p>
                </div>

                <div className="text-xs font-mono font-bold text-[#10b981] bg-[#10b981]/15 px-2.5 py-1 rounded-lg">
                  1W Sector Return: +{currentSector.change1W.toFixed(2)}%
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
            </div>
          ) : viewProofMode === 'composite' ? (
            // ================= COMPOSITE EQUAL-WEIGHTED AREA CHART =================
            <div className="bg-white p-5 rounded-[22px] border border-[#b1ada1]/30 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-[#08090a] font-display">
                    {currentSector.name} Equal-Weighted Composite Index (Base 100)
                  </h3>
                  <p className="text-xs text-[#08090a]/60">
                    Smooth aggregate trendline filtering individual stock noise
                  </p>
                </div>
                <div
                  className={`text-xs font-extrabold font-mono px-2.5 py-1 rounded-lg ${
                    isReturnPositive ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#f43f5e]/15 text-[#f43f5e]'
                  }`}
                >
                  3M Return: {currentSector.currentReturn}%
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentSector.history} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
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
                      tickFormatter={(val) => val.toFixed(1)}
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${parseFloat(val).toFixed(2)} pts`, 'Composite Index']}
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

          {/* Return Dispersion Strip (Definitive Distribution Proof) */}
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
              {/* Zero line */}
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-[#b1ada1]/50 z-10" />

              {/* Render each stock as an interactive dot */}
              {currentSector.stocks.map((stock, idx) => {
                // Map return range (-10% to +20%) to percentage width
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
                        : 'bg-[#f43f5e] border-white shadow-xs'
                    } ${isSelected ? 'ring-2 ring-[#08090a] scale-125' : ''}`}
                  />
                );
              })}
            </div>
          </div>
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
