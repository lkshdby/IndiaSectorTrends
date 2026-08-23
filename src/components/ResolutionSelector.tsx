import React from 'react';
import { ArrowDownUp, CalendarDays } from 'lucide-react';
import { TimeResolution } from '../types';

interface ResolutionSelectorProps {
  resolution: TimeResolution;
  onSelectResolution: (res: TimeResolution) => void;
  sortBy: 'value-desc' | 'value-asc' | 'change-desc' | 'change-asc' | 'alphabetical';
  onSelectSortBy: (sort: 'value-desc' | 'value-asc' | 'change-desc' | 'change-asc' | 'alphabetical') => void;
  totalSnapshots: number;
}

export const ResolutionSelector: React.FC<ResolutionSelectorProps> = ({
  resolution,
  onSelectResolution,
  sortBy,
  onSelectSortBy,
  totalSnapshots,
}) => {
  const resolutions: { id: TimeResolution; label: string; sub: string }[] = [
    { id: 'daily', label: 'Daily', sub: 'Day-on-Day change' },
    { id: 'weekly', label: 'Weekly', sub: 'Week-on-Week trends' },
    { id: 'monthly', label: 'Monthly', sub: 'Month-on-Month shifts' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f4f3ee] border border-[#b1ada1]/40 rounded-[16px] p-3 shadow-2xs">
      {/* Zoom Level Button Group */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-[#08090a]/70 mr-1 flex items-center gap-1.5 font-display">
          <CalendarDays className="w-4 h-4 text-[#A2AB73] stroke-[2]" />
          Resolution:
        </span>
        <div className="inline-flex p-1 bg-white/80 border border-[#b1ada1]/30 rounded-xl gap-1">
          {resolutions.map((r) => {
            const isActive = resolution === r.id;
            return (
              <button
                key={r.id}
                id={`res-btn-${r.id}`}
                onClick={() => onSelectResolution(r.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all min-h-[36px] cursor-pointer font-display ${
                  isActive
                    ? 'bg-[#08090a] text-white shadow-xs'
                    : 'text-[#08090a]/70 hover:text-[#08090a] hover:bg-[#f4f3ee]'
                }`}
                title={r.sub}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting & Order */}
      <div className="flex items-center gap-2">
        <div className="flex items-center text-xs text-[#08090a] bg-white border border-[#b1ada1]/40 rounded-xl px-3 py-2 shadow-2xs min-h-[40px]">
          <ArrowDownUp className="w-4 h-4 text-[#A2AB73] mr-2 shrink-0 stroke-[2]" />
          <span className="text-[#08090a]/60 font-semibold mr-1.5">Sort:</span>
          <select
            id="resolution-sort-select"
            value={sortBy}
            onChange={(e) => onSelectSortBy(e.target.value as any)}
            className="bg-transparent text-xs font-extrabold text-[#08090a] focus:outline-hidden cursor-pointer font-display"
          >
            <option value="value-desc">Highest Value First</option>
            <option value="value-asc">Lowest Value First</option>
            <option value="change-desc">Top Gainers (%)</option>
            <option value="change-asc">Top Decliners (%)</option>
            <option value="alphabetical">Alphabetical (A–Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

