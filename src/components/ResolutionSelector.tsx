import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import { TimeResolution } from '../types';

interface ResolutionSelectorProps {
  resolution: TimeResolution;
  onSelectResolution: (res: TimeResolution) => void;
  sortBy: 'value-desc' | 'value-asc' | 'change-desc' | 'change-asc' | 'alphabetical';
  onSelectSortBy: (sort: 'value-desc' | 'value-asc' | 'change-desc' | 'change-asc' | 'alphabetical') => void;
  totalSnapshots?: number;
}

export const ResolutionSelector: React.FC<ResolutionSelectorProps> = ({
  resolution,
  onSelectResolution,
  sortBy,
  onSelectSortBy,
}) => {
  const resolutions: { id: TimeResolution; label: string; full: string }[] = [
    { id: 'daily', label: 'D', full: 'Daily (Day-on-Day change)' },
    { id: 'weekly', label: 'W', full: 'Weekly (Week-on-Week trends)' },
    { id: 'monthly', label: 'M', full: 'Monthly (Month-on-Month shifts)' },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Segmented D / W / M Buttons */}
      <div className="inline-flex p-0.5 bg-white border border-[#b1ada1]/40 rounded-xl gap-0.5 shadow-2xs h-9 items-center">
        {resolutions.map((r) => {
          const isActive = resolution === r.id;
          return (
            <button
              key={r.id}
              id={`res-btn-${r.id}`}
              onClick={() => onSelectResolution(r.id)}
              className={`w-7 h-7 flex items-center justify-center text-xs font-extrabold rounded-lg transition-all cursor-pointer font-display ${
                isActive
                  ? 'bg-[#08090a] text-white shadow-2xs'
                  : 'text-[#08090a]/60 hover:text-[#08090a] hover:bg-[#f4f3ee]'
              }`}
              title={r.full}
              aria-label={r.full}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      {/* Sort Select */}
      <div className="flex items-center text-xs text-[#08090a] bg-white border border-[#b1ada1]/40 rounded-xl px-2.5 py-1.5 shadow-2xs h-9">
        <ArrowDownUp className="w-3.5 h-3.5 text-[#A2AB73] mr-1.5 shrink-0 stroke-[2.2]" />
        <select
          id="resolution-sort-select"
          value={sortBy}
          onChange={(e) => onSelectSortBy(e.target.value as any)}
          className="bg-transparent text-xs font-bold text-[#08090a] focus:outline-hidden cursor-pointer font-display"
          title="Sort Sectors and Worms"
        >
          <option value="value-desc">Highest Value</option>
          <option value="value-asc">Lowest Value</option>
          <option value="change-desc">Top Gainers (%)</option>
          <option value="change-asc">Top Decliners (%)</option>
          <option value="alphabetical">Alphabetical (A–Z)</option>
        </select>
      </div>
    </div>
  );
};

