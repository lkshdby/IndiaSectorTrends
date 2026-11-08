import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Copy,
  Bell,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Layers,
  Plus,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Building,
  Activity,
  Sparkles,
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

export const IndexTrackerView: React.FC<IndexTrackerViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'myIndex'>('prebuilt');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | '1d' | '1w'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({
    hospitals: true, // expanded by default as in screenshot
  });

  const [selectedSectorId, setSelectedSectorId] = useState<string>('hospitals');
  const [selectedStockTicker, setSelectedStockTicker] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('3M');
  const [chartMode, setChartMode] = useState<'area' | 'rotation'>('area');

  // Custom User Indices from localStorage
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

  // Toggle sector accordion in sidebar
  const toggleSectorExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedSectors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Select a sector
  const handleSelectSector = (id: string) => {
    setSelectedSectorId(id);
    setSelectedStockTicker(null);
  };

  // Select a specific company
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
      // Find custom index
      const custom = customIndices.find((c) => c.id === selectedSectorId);
      if (!custom) return PREBUILT_SECTOR_INDICES[0];

      // Assemble custom stocks
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

  // Selected Stock Details (if single stock is selected)
  const currentStock = useMemo(() => {
    if (!selectedStockTicker) return null;
    return currentSector.stocks.find((s) => s.ticker === selectedStockTicker) || null;
  }, [selectedStockTicker, currentSector]);

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
      return sortOrder === 'asc' ? a.change1W - b.change1W : b.change1W - a.change1W;
    });
  }, [searchQuery, sortField, sortOrder]);

  // Handle Sort Toggle
  const toggleSort = (field: 'name' | '1d' | '1w') => {
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

  // Determine chart color based on performance (Soft Red / Crimson if negative matching screenshot, Emerald if positive)
  const isReturnPositive = currentStock
    ? currentStock.change1W >= 0
    : currentSector.currentReturn >= 0;

  const chartStrokeColor = isReturnPositive ? '#10b981' : '#f43f5e';
  const chartFillColor = isReturnPositive ? '#10b981' : '#f43f5e';

  // Slice history data based on timeframe
  const displayHistory = useMemo(() => {
    const raw = currentSector.history;
    if (timeframe === '3M') return raw;
    if (timeframe === '6M') return raw;
    if (timeframe === 'YTD') return raw.slice(Math.floor(raw.length * 0.4));
    return raw;
  }, [currentSector, timeframe]);

  const activeReturnLabel = currentStock
    ? `${currentStock.change1W >= 0 ? '+' : ''}${currentStock.change1W.toFixed(2)}%`
    : `${currentSector.currentReturn >= 0 ? '+' : ''}${currentSector.currentReturn.toFixed(2)}%`;

  return (
    <div className="flex flex-col lg:flex-row flex-1 bg-white border border-[#b1ada1]/30 rounded-[24px] overflow-hidden shadow-sm">
      {/* ================= LEFT SIDEBAR (PRE BUILT / MY INDEX) ================= */}
      <div className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r border-[#b1ada1]/30 flex flex-col bg-[#fafaf9]">
        {/* Top Tabs: Pre Built | My Index */}
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

        {/* Search Bar matching screenshot */}
        <div className="p-3 bg-white border-b border-[#b1ada1]/20">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#08090a]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search indexes or @company"
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
            <span>Name</span>
            <span className="text-[10px]">⇅</span>
          </button>

          <div className="flex items-center gap-6 pr-2">
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
                      <span
                        className={`text-xs font-semibold truncate ${
                          isSelected ? 'text-[#2563eb] font-bold' : 'text-[#08090a]'
                        }`}
                      >
                        {sector.name}
                      </span>
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

                  {/* Expanded Company Rows matching screenshot */}
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
                              {/* Brand / Stock Avatar */}
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
                <span>Create New Index</span>
              </button>

              {customIndices.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#08090a]/60 space-y-2 bg-white rounded-xl border border-dashed border-[#b1ada1]/40">
                  <Layers className="w-8 h-8 mx-auto text-[#08090a]/30" />
                  <p className="font-semibold text-[#08090a]">No custom indices yet</p>
                  <p className="text-[11px] leading-relaxed">
                    Create your own equal-weighted baskets to track specific stock themes (e.g. "Hospital Leaders" or "Solar Smallcaps").
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

      {/* ================= RIGHT MAIN CANVAS (INDEX / STOCK CHART) ================= */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        {/* Top Header: Title + Action Buttons */}
        <div className="px-6 py-4 border-b border-[#b1ada1]/30 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-3">
            {selectedStockTicker && (
              <button
                onClick={() => setSelectedStockTicker(null)}
                className="text-xs font-semibold text-[#2563eb] hover:underline cursor-pointer flex items-center gap-1"
              >
                ← Back to {currentSector.name}
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#08090a] font-display tracking-tight">
                  {currentStock ? currentStock.ticker : currentSector.name}
                </h2>
                {currentStock ? (
                  <span className="text-xs font-mono px-2 py-0.5 bg-[#f4f3ee] text-[#08090a]/80 rounded-md font-bold">
                    ₹{currentStock.price.toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-xs font-bold px-2 py-0.5 bg-[#10b981]/15 text-[#10b981] rounded-md font-display">
                    {currentSector.stocks.length} Companies Basket
                  </span>
                )}
              </div>
              <p className="text-xs text-[#08090a]/60 font-medium">
                {currentStock ? currentStock.name : `${currentSector.category} Sector Equal-Weighted Index`}
              </p>
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

            <button
              onClick={() => setChartMode((prev) => (prev === 'area' ? 'rotation' : 'area'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                chartMode === 'rotation'
                  ? 'bg-[#2563eb] text-white border-[#2563eb]'
                  : 'bg-white text-[#08090a] border-[#b1ada1]/40 hover:bg-[#f4f3ee]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{chartMode === 'area' ? 'Sector Rotation' : 'Price Chart'}</span>
            </button>
          </div>
        </div>

        {/* Timeframe & Returns Bar matching screenshot */}
        <div className="px-6 py-3 border-b border-[#b1ada1]/20 flex flex-wrap items-center justify-between gap-3 bg-[#fafaf9]">
          <div className="flex items-center gap-1">
            {(['3M', '6M', 'YTD', '1Y', '3Y', '5Y', 'Max'] as TimeframePeriod[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#2563eb]/15 text-[#2563eb]'
                    : 'text-[#08090a]/60 hover:text-[#08090a] hover:bg-[#b1ada1]/15'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#08090a]/60 font-semibold">Returns</span>
            <span
              className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded-md ${
                isReturnPositive ? 'text-[#10b981] bg-[#10b981]/15' : 'text-[#f43f5e] bg-[#f43f5e]/15'
              }`}
            >
              {activeReturnLabel}
            </span>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="p-6 space-y-6">
          {chartMode === 'area' ? (
            <div className="bg-white p-4 rounded-[20px] border border-[#b1ada1]/30 shadow-xs">
              {/* Normalized Area Chart */}
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={displayHistory} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIndexVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartFillColor} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={chartFillColor} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                      axisLine={{ stroke: '#e5e5e5' }}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      orientation="right"
                      tickFormatter={(val) => val.toFixed(2)}
                      tick={{ fontSize: 11, fill: '#08090a', opacity: 0.6 }}
                      axisLine={{ stroke: '#e5e5e5' }}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${parseFloat(val).toFixed(2)} pts`, 'Normalized Level']}
                      labelFormatter={(lbl) => `Date: ${lbl}`}
                      contentStyle={{
                        backgroundColor: '#08090a',
                        borderColor: '#2563eb',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={chartStrokeColor}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorIndexVal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Volume Bars at bottom matching screenshot */}
              <div className="h-16 w-full pt-2 border-t border-[#b1ada1]/15">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={displayHistory} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
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
            // Sector Rotation Radar Explanation Mode
            <div className="p-5 bg-[#fafaf9] rounded-[20px] border border-[#b1ada1]/30 space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#2563eb]" />
                <h3 className="text-sm font-extrabold text-[#08090a] font-display">
                  Sector Rotation Cycle Analysis: {currentSector.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div
                  className={`p-3 rounded-xl border ${
                    currentSector.rotationStatus === 'Leading'
                      ? 'bg-[#10b981]/15 border-[#10b981] font-bold'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#10b981] mb-1 font-display">1. Leading Quadrant</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    High relative strength vs Nifty 50 and rising momentum across large & midcaps.
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    currentSector.rotationStatus === 'Weakening'
                      ? 'bg-[#f59e0b]/15 border-[#f59e0b] font-bold'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#f59e0b] mb-1 font-display">2. Weakening Quadrant</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    Momentum starting to taper off after extended multi-month rally.
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    currentSector.rotationStatus === 'Lagging'
                      ? 'bg-[#f43f5e]/15 border-[#f43f5e] font-bold'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#f43f5e] mb-1 font-display">3. Lagging Quadrant</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    Outflows continuing, stocks trading below intermediate moving averages.
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    currentSector.rotationStatus === 'Improving'
                      ? 'bg-[#2563eb]/15 border-[#2563eb] font-bold'
                      : 'bg-white border-[#b1ada1]/30 opacity-70'
                  }`}
                >
                  <span className="block font-bold text-[#2563eb] mb-1 font-display">4. Improving Quadrant</span>
                  <p className="text-[11px] text-[#08090a]/70">
                    V-shaped bottoming out. Breadth turning positive while broad indices consolidate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Rotation & Breadth Insight Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
              <span className="text-[11px] text-[#08090a]/60 font-semibold block mb-0.5">
                Sector Breadth (1W Green Ratio)
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-extrabold text-[#08090a] font-display">
                  {currentSector.breadthPositivePct}%
                </span>
                <span className="text-xs text-[#08090a]/60">of stocks moving up together</span>
              </div>
              <div className="w-full bg-[#f4f3ee] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  style={{ width: `${currentSector.breadthPositivePct}%` }}
                  className="bg-[#10b981] h-full rounded-full"
                />
              </div>
            </div>

            <div className="p-4 bg-white rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
              <span className="text-[11px] text-[#08090a]/60 font-semibold block mb-0.5">
                Current Rotation Status
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] animate-ping" />
                <span className="text-lg font-extrabold text-[#2563eb] font-display">
                  {currentSector.rotationStatus} Phase
                </span>
              </div>
              <p className="text-[11px] text-[#08090a]/60 mt-1">
                {currentSector.rotationStatus === 'Improving'
                  ? 'Early institutional bottom-fishing & cluster expansion'
                  : currentSector.rotationStatus === 'Leading'
                  ? 'Strong momentum leadership across all constituents'
                  : 'Consolidation or profit-taking'}
              </p>
            </div>

            <div className="p-4 bg-white rounded-[18px] border border-[#b1ada1]/30 shadow-xs">
              <span className="text-[11px] text-[#08090a]/60 font-semibold block mb-0.5">
                Total Sector Market Cap
              </span>
              <div className="text-lg font-extrabold text-[#08090a] font-display mt-1">
                ₹
                {(
                  currentSector.stocks.reduce((acc, s) => acc + s.marketCapCr, 0) / 1000
                ).toFixed(1)}k Cr
              </div>
              <p className="text-[11px] text-[#08090a]/60 mt-1">
                Across {currentSector.stocks.length} tracked listed companies
              </p>
            </div>
          </div>

          {/* Constituent Companies Grid matching the selected Sector */}
          <div className="bg-white rounded-[20px] border border-[#b1ada1]/30 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-[#08090a] font-display">
                  {currentSector.name} Constituents ({currentSector.stocks.length} Stocks)
                </h3>
                <p className="text-xs text-[#08090a]/60">
                  Click any stock to zoom into its individual price and performance chart
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#b1ada1]/30 text-[#08090a]/60 font-semibold text-[11px]">
                    <th className="pb-2.5 pl-2">Ticker & Company</th>
                    <th className="pb-2.5 text-right">LTP (₹)</th>
                    <th className="pb-2.5 text-right">1D Return</th>
                    <th className="pb-2.5 text-right">1W Return</th>
                    <th className="pb-2.5 text-right">Market Cap</th>
                    <th className="pb-2.5 text-right">P/E</th>
                    <th className="pb-2.5 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#b1ada1]/15">
                  {currentSector.stocks.map((st) => (
                    <tr
                      key={st.ticker}
                      onClick={() => handleSelectStock(st.ticker, currentSector.id)}
                      className={`hover:bg-[#fafaf9] cursor-pointer transition-colors ${
                        selectedStockTicker === st.ticker ? 'bg-[#2563eb]/10' : ''
                      }`}
                    >
                      <td className="py-2.5 pl-2">
                        <div className="flex items-center gap-2">
                          <div
                            style={{ backgroundColor: st.logoBg || '#0284c7' }}
                            className="w-6 h-6 rounded-md text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0"
                          >
                            {st.logoText || st.ticker.slice(0, 2)}
                          </div>
                          <div>
                            <span className="font-mono font-bold text-[#08090a] block">
                              {st.ticker}
                            </span>
                            <span className="text-[11px] text-[#08090a]/60 line-clamp-1">
                              {st.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 text-right font-mono font-bold text-[#08090a]">
                        ₹{st.price.toLocaleString('en-IN')}
                      </td>

                      <td className="py-2.5 text-right font-mono font-bold">
                        <span
                          className={`inline-flex items-center gap-0.5 ${
                            st.change1D >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                          }`}
                        >
                          {st.change1D >= 0 ? '+' : ''}
                          {st.change1D.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-2.5 text-right font-mono font-bold">
                        <span
                          className={`inline-flex items-center gap-0.5 ${
                            st.change1W >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                          }`}
                        >
                          {st.change1W >= 0 ? '+' : ''}
                          {st.change1W.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-2.5 text-right font-mono text-[#08090a]/80">
                        ₹{(st.marketCapCr).toLocaleString('en-IN')} Cr
                      </td>

                      <td className="py-2.5 text-right font-mono text-[#08090a]/80">
                        {st.pe > 0 ? `${st.pe.toFixed(1)}x` : '—'}
                      </td>

                      <td className="py-2.5 text-right pr-2">
                        <button
                          onClick={(e) => handleSelectStock(st.ticker, currentSector.id, e)}
                          className="px-2.5 py-1 bg-[#f4f3ee] hover:bg-[#2563eb] hover:text-white text-[#08090a] text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Chart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
