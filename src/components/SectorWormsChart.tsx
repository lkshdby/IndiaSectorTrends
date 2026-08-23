import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Eye,
  Filter,
  Maximize2,
  Minimize2,
  Search,
  X,
} from 'lucide-react';
import { DailySnapshot, MetricKey, TimeResolution } from '../types';
import { METRIC_DEFINITIONS } from '../utils/metrics';
import { getSectorColor } from '../utils/colors';
import { getSnapshotsByResolution, getSnapshotsUpToDate } from '../utils/dataProcessor';

interface SectorWormsChartProps {
  snapshots: DailySnapshot[];
  selectedMetric: MetricKey;
  resolution: TimeResolution;
  selectedDate: string;
  onSelectSector: (sectorName: string) => void;
  sortBy?: 'value-desc' | 'value-asc' | 'change-desc' | 'change-asc' | 'alphabetical';
}

interface WormLineData {
  sector: string;
  color: string;
  points: { date: string; value: number }[];
  startValue: number;
  currentValue: number;
  changeValue: number;
  changePercent: number;
  companies: number;
  pe: number;
  roce: number;
}

export const SectorWormsChart: React.FC<SectorWormsChartProps> = ({
  snapshots,
  selectedMetric,
  resolution,
  selectedDate,
  onSelectSector,
  sortBy = 'value-desc',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);
  const [filterPreset, setFilterPreset] = useState<
    'all' | 'top10' | 'top25' | 'top50' | 'gainers' | 'decliners' | 'custom'
  >('all');
  const [pinnedSectors, setPinnedSectors] = useState<string[]>([]);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rangePreset, setRangePreset] = useState<'1m' | '3m' | '6m' | '1y'>('1y');
  const [showRightLabels, setShowRightLabels] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const metricDef = METRIC_DEFINITIONS[selectedMetric];

  // Measure container size dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter snapshots strictly up to selectedDate
  const snapshotsUpToDate = useMemo(() => {
    return getSnapshotsUpToDate(snapshots, selectedDate);
  }, [snapshots, selectedDate]);

  // Group by resolution (daily, weekly, monthly)
  const resolutionSnapshots = useMemo(() => {
    return getSnapshotsByResolution(snapshotsUpToDate, resolution);
  }, [snapshotsUpToDate, resolution]);

  // Filter snapshots by selected date range (1m, 3m, 6m, 1y)
  const filteredSnapshots = useMemo(() => {
    if (resolutionSnapshots.length === 0) return [];
    if (rangePreset === '1y') return resolutionSnapshots;

    const count = resolutionSnapshots.length;
    let sliceCount = count;
    if (rangePreset === '1m') sliceCount = Math.max(4, Math.floor(count * (1 / 12)));
    else if (rangePreset === '3m') sliceCount = Math.max(10, Math.floor(count * (3 / 12)));
    else if (rangePreset === '6m') sliceCount = Math.max(20, Math.floor(count * (6 / 12)));

    return resolutionSnapshots.slice(-sliceCount);
  }, [resolutionSnapshots, rangePreset]);

  // Extract all unique sector names
  const allSectorNames = useMemo(() => {
    const set = new Set<string>();
    snapshotsUpToDate.forEach((snap) => {
      snap.sectors.forEach((s) => set.add(s.sector));
    });
    return Array.from(set).sort();
  }, [snapshotsUpToDate]);

  // Build complete worm trajectories for each sector
  const allWormLines: WormLineData[] = useMemo(() => {
    if (filteredSnapshots.length === 0) return [];

    const latestSnap = filteredSnapshots[filteredSnapshots.length - 1];

    return allSectorNames
      .map((sectorName, idx) => {
        const color = getSectorColor(sectorName, idx);

        const points = filteredSnapshots.map((snap) => {
          const sec = snap.sectors.find((s) => s.sector === sectorName);
          const val = sec ? (sec[selectedMetric] as number) : 0;
          return {
            date: snap.date,
            value: val,
          };
        });

        const startValue = points[0]?.value || 0;
        const currentValue = points[points.length - 1]?.value || 0;
        const changeValue = currentValue - startValue;
        const changePercent =
          startValue !== 0 ? (changeValue / Math.abs(startValue)) * 100 : 0;

        const latestData = latestSnap.sectors.find((s) => s.sector === sectorName);

        return {
          sector: sectorName,
          color,
          points,
          startValue,
          currentValue,
          changeValue,
          changePercent,
          companies: latestData?.noOfCompanies || 0,
          pe: latestData?.medianPE || 0,
          roce: latestData?.wtdAvgROCE || 0,
        };
      })
      .filter((w) => w.points.length > 0);
  }, [allSectorNames, filteredSnapshots, selectedMetric]);

  // Sort worms by active sort order
  const sortedWorms = useMemo(() => {
    const list = [...allWormLines];
    return list.sort((a, b) => {
      if (sortBy === 'value-desc') return b.currentValue - a.currentValue;
      if (sortBy === 'value-asc') return a.currentValue - b.currentValue;
      if (sortBy === 'change-desc') return b.changePercent - a.changePercent;
      if (sortBy === 'change-asc') return a.changePercent - b.changePercent;
      if (sortBy === 'alphabetical') return a.sector.localeCompare(b.sector);
      return b.currentValue - a.currentValue;
    });
  }, [allWormLines, sortBy]);

  // Apply filters / presets
  const visibleWorms = useMemo(() => {
    let result = [...sortedWorms];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return result.filter((w) => w.sector.toLowerCase().includes(q));
    }

    if (filterPreset === 'custom') {
      if (pinnedSectors.length > 0) {
        return result.filter((w) => pinnedSectors.includes(w.sector));
      }
      return result;
    }

    if (filterPreset === 'top10') return result.slice(0, 10);
    if (filterPreset === 'top25') return result.slice(0, 25);
    if (filterPreset === 'top50') return result.slice(0, 50);
    if (filterPreset === 'gainers') {
      return [...result].sort((a, b) => b.changePercent - a.changePercent).slice(0, 15);
    }
    if (filterPreset === 'decliners') {
      return [...result].sort((a, b) => a.changePercent - b.changePercent).slice(0, 15);
    }

    return result;
  }, [sortedWorms, filterPreset, pinnedSectors, searchQuery]);

  // Compute SVG Plotting Bounds & Scales
  const plotDimensions = useMemo(() => {
    const isMobile = containerWidth < 640;
    const paddingLeft = isMobile ? 55 : 75;
    const paddingRight = showRightLabels ? (isMobile ? 140 : 210) : 30;
    const paddingTop = 30;
    const paddingBottom = 40;

    const chartHeight = isFullscreen ? 720 : 540;
    
    // On mobile, ensure sufficient width per date point so timeline does not cramp
    const minWidthForPoints = isMobile
      ? Math.max(720, filteredSnapshots.length * 28 + paddingLeft + paddingRight)
      : 500;
    const chartWidth = Math.max(minWidthForPoints, containerWidth);

    const innerWidth = chartWidth - paddingLeft - paddingRight;
    const innerHeight = chartHeight - paddingTop - paddingBottom;

    // Calculate Y Min / Max
    let minY = Infinity;
    let maxY = -Infinity;

    visibleWorms.forEach((worm) => {
      worm.points.forEach((p) => {
        if (p.value < minY) minY = p.value;
        if (p.value > maxY) maxY = p.value;
      });
    });

    if (minY === Infinity || maxY === -Infinity || minY === maxY) {
      minY = 0;
      maxY = 100;
    } else {
      const span = maxY - minY;
      minY = minY - span * 0.05;
      maxY = maxY + span * 0.08;
    }

    const xCount = filteredSnapshots.length;

    const getX = (pointIdx: number) => {
      if (xCount <= 1) return paddingLeft + innerWidth / 2;
      return paddingLeft + (pointIdx / (xCount - 1)) * innerWidth;
    };

    const getY = (val: number) => {
      return paddingTop + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;
    };

    return {
      chartWidth,
      chartHeight,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      innerWidth,
      innerHeight,
      minY,
      maxY,
      getX,
      getY,
      isMobile,
    };
  }, [containerWidth, showRightLabels, isFullscreen, visibleWorms, filteredSnapshots]);

  // Pre-generate SVG Paths for smooth performance
  const renderedPaths = useMemo(() => {
    const { getX, getY } = plotDimensions;

    return visibleWorms.map((worm) => {
      const coords = worm.points.map((p, idx) => ({
        x: getX(idx),
        y: getY(p.value),
        date: p.date,
        val: p.value,
      }));

      let d = '';
      if (coords.length > 0) {
        d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
        for (let i = 1; i < coords.length; i++) {
          d += ` L ${coords[i].x.toFixed(1)} ${coords[i].y.toFixed(1)}`;
        }
      }

      const lastCoord = coords[coords.length - 1] || { x: 0, y: 0 };

      return {
        sector: worm.sector,
        color: worm.color,
        d,
        coords,
        lastCoord,
        currentValue: worm.currentValue,
        changePercent: worm.changePercent,
        changeValue: worm.changeValue,
      };
    });
  }, [visibleWorms, plotDimensions]);

  // Active highlighted worm (if hovered)
  const activeWorm = useMemo(() => {
    if (!hoveredSector) return null;
    return allWormLines.find((w) => w.sector === hoveredSector) || null;
  }, [hoveredSector, allWormLines]);

  // Generate 5 Y-Axis tick values
  const yTicks = useMemo(() => {
    const { minY, maxY } = plotDimensions;
    const count = 5;
    const ticks: number[] = [];
    const step = (maxY - minY) / (count - 1);
    for (let i = 0; i < count; i++) {
      ticks.push(minY + step * i);
    }
    return ticks;
  }, [plotDimensions]);

  // Generate X-Axis date label ticks
  const xTicks = useMemo(() => {
    const count = filteredSnapshots.length;
    if (count <= 6) {
      return filteredSnapshots.map((s, idx) => ({ date: s.date, idx }));
    }
    const step = Math.floor(count / 5);
    const indices = [0];
    for (let i = step; i < count - 1; i += step) {
      indices.push(i);
    }
    indices.push(count - 1);
    return indices.map((idx) => ({ date: filteredSnapshots[idx].date, idx }));
  }, [filteredSnapshots]);

  return (
    <div
      ref={containerRef}
      className={`w-full bg-white border border-[#b1ada1]/30 rounded-[18px] shadow-xs overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl overflow-y-auto max-h-[96vh]' : ''
      }`}
    >
      {/* Top Header Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-[#b1ada1]/30 bg-[#f4f3ee]/60 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-extrabold font-display">
              <Activity className="w-3.5 h-3.5 stroke-[2.5]" /> Multi-Line Sector Worms ({allSectorNames.length})
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#08090a] font-display">
              {metricDef.label} Evolution Over Time
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-white border border-[#b1ada1]/30 text-[#08090a]/70 font-semibold font-display">
              {visibleWorms.length} of {allSectorNames.length} Visible
            </span>
          </div>
          <p className="text-xs text-[#08090a]/60 mt-1 font-medium">
            Timeline up to <span className="font-bold text-[#08090a]">{selectedDate}</span> ({filteredSnapshots.length} {resolution} trading days) • Indicator:{' '}
            <span className="font-bold text-[#08090a]">
              {metricDef.label} {metricDef.unit ? `(${metricDef.unit})` : ''}
            </span>{' '}
            • Hover any worm to inspect sector trajectory
          </p>
        </div>

        {/* View & Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Time Span Filter (1M, 3M, 6M, 1Y) */}
          <div className="flex items-center bg-white border border-[#b1ada1]/40 rounded-xl p-0.5 text-xs">
            {(['1m', '3m', '6m', '1y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRangePreset(r)}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase text-[11px] transition-all font-display ${
                  rangePreset === r
                    ? 'bg-[#08090a] text-white shadow-2xs'
                    : 'text-[#08090a]/60 hover:text-[#08090a]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Label Toggle */}
          <button
            onClick={() => setShowRightLabels(!showRightLabels)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all font-display cursor-pointer ${
              showRightLabels
                ? 'bg-[#10b981]/15 border-[#10b981]/40 text-[#10b981]'
                : 'bg-white border-[#b1ada1]/40 text-[#08090a]/70 hover:text-[#08090a]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 stroke-[2]" />
            <span className="hidden sm:inline">End Labels</span>
          </button>

          {/* Fullscreen button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-[#08090a]/70 hover:text-[#08090a] bg-white border border-[#b1ada1]/40 rounded-xl hover:bg-[#f4f3ee] cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 stroke-[2]" /> : <Maximize2 className="w-4 h-4 stroke-[2]" />}
          </button>
        </div>
      </div>

      {/* Preset Filter Chips & Search Bar */}
      <div className="px-4 sm:px-5 py-3 bg-[#f4f3ee]/30 border-b border-[#b1ada1]/30 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[#08090a]/50 font-bold mr-1 flex items-center gap-1 font-display">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { key: 'all', label: `All (${allSectorNames.length})` },
            { key: 'top10', label: 'Top 10' },
            { key: 'top25', label: 'Top 25' },
            { key: 'top50', label: 'Top 50' },
            { key: 'gainers', label: 'Top Gainers' },
            { key: 'decliners', label: 'Top Decliners' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setFilterPreset(item.key as any);
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs font-display cursor-pointer ${
                filterPreset === item.key && !searchQuery
                  ? 'bg-[#08090a] text-white shadow-2xs'
                  : 'bg-white border border-[#b1ada1]/30 text-[#08090a]/70 hover:border-[#08090a]'
              }`}
            >
              {item.label}
            </button>
          ))}

          {pinnedSectors.length > 0 && (
            <button
              onClick={() => setFilterPreset('custom')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs font-display cursor-pointer ${
                filterPreset === 'custom'
                  ? 'bg-[#10b981] text-white shadow-2xs'
                  : 'bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]'
              }`}
            >
              Pinned ({pinnedSectors.length})
            </button>
          )}

          {pinnedSectors.length > 0 && (
            <button
              onClick={() => {
                setPinnedSectors([]);
                setFilterPreset('all');
              }}
              className="text-[11px] text-[#c15f3c] hover:underline font-bold ml-1 cursor-pointer font-display"
            >
              Clear Pins
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#08090a]/40" />
          <input
            type="text"
            placeholder="Search & highlight industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-7 py-1.5 text-xs bg-white border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#c15f3c]/40 w-44 sm:w-56 font-medium text-[#08090a]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#08090a]/40 hover:text-[#08090a]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Chart Canvas with SVG */}
      <div className="relative p-2 sm:p-4 bg-white overflow-hidden select-none">
        {/* Hovered Sector Floating Spotlight Banner */}
        {activeWorm && (
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-[#08090a] text-white p-4 rounded-[16px] shadow-2xl border border-[#b1ada1]/30 animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-white/50"
                  style={{ backgroundColor: activeWorm.color }}
                />
                <span className="font-extrabold text-sm text-[#f4f3ee] font-display">{activeWorm.sector}</span>
              </div>
              <button
                onClick={() => onSelectSector(activeWorm.sector)}
                className="text-[11px] font-bold text-[#10b981] hover:text-emerald-300 flex items-center gap-0.5 cursor-pointer font-display"
              >
                Deep Dive <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-[10px] text-[#f4f3ee]/60 font-semibold">{metricDef.label}</div>
                <div className="font-extrabold text-[#f4f3ee] text-sm font-display">
                  {metricDef.format(activeWorm.currentValue)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#f4f3ee]/60 font-semibold">Period Change</div>
                <div
                  className={`font-bold flex items-center gap-0.5 text-xs font-display ${
                    activeWorm.changeValue >= 0 ? 'text-[#10b981]' : 'text-[#c15f3c]'
                  }`}
                >
                  {activeWorm.changeValue >= 0 ? (
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                  {activeWorm.changePercent >= 0 ? '+' : ''}
                  {activeWorm.changePercent.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#f4f3ee]/60 font-semibold">Companies & P/E</div>
                <div className="font-semibold text-[#f4f3ee]/90 text-[11px]">
                  {activeWorm.companies} cos • {activeWorm.pe}x
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden mb-2 px-3 py-2 bg-[#f4f3ee] border border-[#b1ada1]/30 rounded-xl flex items-center justify-between text-[11px] text-[#08090a]/80 font-semibold">
          <span className="flex items-center gap-1.5">
            <span>↔</span> Swipe left/right to scroll through timeline
          </span>
          <span className="text-[10px] text-[#08090a] bg-white px-2 py-0.5 rounded-md font-bold border border-[#b1ada1]/30 font-display">
            {plotDimensions.chartWidth}px timeline
          </span>
        </div>

        {/* SVG Multi-Line Chart Scrollable Container */}
        <div
          className="w-full relative overflow-x-auto pb-3 touch-pan-x overscroll-x-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <svg
            width={plotDimensions.chartWidth}
            height={plotDimensions.chartHeight}
            style={{ minWidth: `${plotDimensions.chartWidth}px` }}
            className="h-auto overflow-visible cursor-crosshair block"
            onMouseLeave={() => {
              setHoveredSector(null);
            }}
          >
            <defs>
              <filter id="wormGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#08090a" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Background Grid Lines (Horizontal Y-Ticks) */}
            {yTicks.map((tickVal, idx) => {
              const y = plotDimensions.getY(tickVal);
              return (
                <g key={`ytick-${idx}`}>
                  <line
                    x1={plotDimensions.paddingLeft}
                    y1={y}
                    x2={plotDimensions.chartWidth - plotDimensions.paddingRight}
                    y2={y}
                    stroke="#b1ada1"
                    strokeOpacity="0.2"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={plotDimensions.paddingLeft - 8}
                    y={y + 3.5}
                    textAnchor="end"
                    fontSize="10"
                    fill="#08090a"
                    opacity="0.6"
                    fontWeight="600"
                  >
                    {metricDef.format(tickVal)}
                  </text>
                </g>
              );
            })}

            {/* Zero Baseline if min < 0 and max > 0 */}
            {plotDimensions.minY <= 0 && plotDimensions.maxY >= 0 && (
              <line
                x1={plotDimensions.paddingLeft}
                y1={plotDimensions.getY(0)}
                x2={plotDimensions.chartWidth - plotDimensions.paddingRight}
                y2={plotDimensions.getY(0)}
                stroke="#c15f3c"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            )}

            {/* X-Axis Date Grid Lines & Labels */}
            {xTicks.map((xt, idx) => {
              const x = plotDimensions.getX(xt.idx);
              return (
                <g key={`xtick-${idx}`}>
                  <line
                    x1={x}
                    y1={plotDimensions.paddingTop}
                    x2={x}
                    y2={plotDimensions.chartHeight - plotDimensions.paddingBottom}
                    stroke="#b1ada1"
                    strokeOpacity="0.15"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={plotDimensions.chartHeight - plotDimensions.paddingBottom + 16}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#08090a"
                    opacity="0.7"
                    fontWeight="700"
                  >
                    {xt.date}
                  </text>
                </g>
              );
            })}

            {/* Inactive Worm Lines (Rendered first with low opacity if one is hovered) */}
            {renderedPaths.map((path) => {
              const isHovered = hoveredSector === path.sector;
              const isPinned = pinnedSectors.includes(path.sector);
              const opacity = hoveredSector
                ? isHovered
                  ? 1
                  : 0.1
                : isPinned
                ? 1
                : visibleWorms.length > 50
                ? 0.55
                : 0.8;

              const strokeWidth = isHovered ? 4 : isPinned ? 2.5 : 1.4;

              return (
                <g
                  key={`worm-${path.sector}`}
                  className="transition-opacity duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredSector(path.sector)}
                  onClick={() => onSelectSector(path.sector)}
                >
                  <path
                    d={path.d}
                    fill="none"
                    stroke={path.color}
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={isHovered ? 'url(#wormGlow)' : undefined}
                  />

                  {/* End Dot on the rightmost value */}
                  <circle
                    cx={path.lastCoord.x}
                    cy={path.lastCoord.y}
                    r={isHovered ? 5.5 : isPinned ? 3.5 : 2.5}
                    fill={path.color}
                    stroke="#ffffff"
                    strokeWidth={isHovered ? 2 : 1}
                    opacity={opacity}
                  />
                </g>
              );
            })}

            {/* Active Worm (Re-rendered on top to pop visually) */}
            {hoveredSector && (
              (() => {
                const p = renderedPaths.find((r) => r.sector === hoveredSector);
                if (!p) return null;
                return (
                  <g className="pointer-events-none">
                    <path
                      d={p.d}
                      fill="none"
                      stroke={p.color}
                      strokeWidth={4.5}
                      strokeOpacity={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={p.lastCoord.x}
                      cy={p.lastCoord.y}
                      r={6}
                      fill={p.color}
                      stroke="#ffffff"
                      strokeWidth={2.5}
                    />
                  </g>
                );
              })()
            )}

            {/* Rightmost End-Worm Sector Names & Value Tags */}
            {showRightLabels &&
              renderedPaths.map((path) => {
                const isHovered = hoveredSector === path.sector;
                const isPinned = pinnedSectors.includes(path.sector);
                const shouldShowText =
                  isHovered ||
                  isPinned ||
                  visibleWorms.length <= 35 ||
                  (visibleWorms.length <= 60 && Math.random() > 0.3);

                if (!shouldShowText && !isHovered) return null;

                const opacity = hoveredSector ? (isHovered ? 1 : 0.2) : isPinned ? 1 : 0.85;

                return (
                  <g
                    key={`label-${path.sector}`}
                    transform={`translate(${path.lastCoord.x + 8}, ${path.lastCoord.y})`}
                    className="cursor-pointer transition-opacity duration-150"
                    onMouseEnter={() => setHoveredSector(path.sector)}
                    onClick={() => onSelectSector(path.sector)}
                  >
                    {isHovered && (
                      <rect
                        x="-4"
                        y="-10"
                        width={180}
                        height="20"
                        rx="6"
                        fill="#08090a"
                        stroke="#b1ada1"
                        strokeOpacity="0.3"
                      />
                    )}
                    <text
                      x="0"
                      y="3.5"
                      fontSize={isHovered ? '11' : '9.5'}
                      fontWeight={isHovered || isPinned ? '800' : '600'}
                      fill={isHovered ? '#f4f3ee' : path.color}
                      opacity={opacity}
                      fontFamily="Outfit, sans-serif"
                    >
                      {path.sector.length > 18 ? path.sector.slice(0, 16) + '..' : path.sector}{' '}
                      <tspan
                        fill={isHovered ? '#10b981' : '#08090a'}
                        opacity={isHovered ? 1 : 0.6}
                        fontWeight="700"
                        fontSize={isHovered ? '10' : '9'}
                      >
                        {metricDef.format(path.currentValue)}
                      </tspan>
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>
      </div>

      {/* Bottom Interactive Sector Rail & Legend for all Tracked Sectors */}
      <div className="border-t border-[#b1ada1]/30 bg-[#f4f3ee]/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#08090a] uppercase tracking-wider font-display">
              {sortedWorms.length} Sector Worm Index
            </span>
            <span className="text-[11px] text-[#08090a]/60 font-medium">
              Hover to illuminate worm • Click to deep dive
            </span>
          </div>
          <span className="text-xs font-bold text-[#10b981] font-display">
            {sortedWorms.length} Total Industries Tracked
          </span>
        </div>

        {/* Scrollable multi-color chip bar */}
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 p-1">
          {sortedWorms.map((w) => {
            const isHovered = hoveredSector === w.sector;
            const isPinned = pinnedSectors.includes(w.sector);
            const isGainer = w.changePercent >= 0;

            return (
              <button
                key={w.sector}
                onMouseEnter={() => setHoveredSector(w.sector)}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => onSelectSector(w.sector)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[12px] text-xs border transition-all text-left group cursor-pointer ${
                  isHovered
                    ? 'bg-[#08090a] text-white border-[#08090a] shadow-md scale-105 z-10'
                    : isPinned
                    ? 'bg-[#10b981]/15 border-[#10b981]/40 text-[#08090a] font-bold'
                    : 'bg-white border-[#b1ada1]/30 text-[#08090a] hover:border-[#c15f3c] hover:bg-[#f4f3ee]'
                }`}
              >
                {/* Sector Color Dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-black/10"
                  style={{ backgroundColor: w.color }}
                />
                <span className="font-semibold truncate max-w-[130px] font-display">{w.sector}</span>

                {/* Current Metric Value */}
                <span
                  className={`text-[10px] font-bold shrink-0 font-display ${
                    isHovered ? 'text-[#10b981]' : 'text-[#08090a]/60'
                  }`}
                >
                  {metricDef.format(w.currentValue)}
                </span>

                {/* Delta Arrow */}
                <span
                  className={`text-[9px] font-bold font-display ${
                    isGainer ? 'text-[#10b981]' : 'text-[#c15f3c]'
                  }`}
                >
                  {isGainer ? '+' : ''}
                  {w.changePercent.toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
