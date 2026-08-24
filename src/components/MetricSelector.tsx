import React from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { MetricKey } from '../types';
import { METRIC_DEFINITIONS, METRIC_KEYS } from '../utils/metrics';

interface MetricSelectorProps {
  selectedMetric: MetricKey;
  onSelectMetric: (key: MetricKey) => void;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({
  selectedMetric,
  onSelectMetric,
}) => {
  const currentDef = METRIC_DEFINITIONS[selectedMetric];

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center bg-white border border-[#b1ada1]/40 rounded-xl px-2.5 py-1.5 shadow-2xs hover:border-[#08090a]/40 transition-colors h-9">
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#A2AB73] mr-1.5 shrink-0 stroke-[2.2]" />
        <span className="text-[11px] font-semibold text-[#08090a]/60 mr-1.5 hidden sm:inline">
          Indicator:
        </span>
        <select
          id="metric-dropdown-select"
          value={selectedMetric}
          onChange={(e) => onSelectMetric(e.target.value as MetricKey)}
          className="bg-transparent text-xs font-extrabold text-[#08090a] focus:outline-hidden cursor-pointer pr-6 font-display appearance-none"
          title={`Active Indicator: ${currentDef.label} - ${currentDef.description}`}
        >
          {METRIC_KEYS.map((key) => {
            const def = METRIC_DEFINITIONS[key];
            return (
              <option key={key} value={key} className="text-[#08090a] py-1">
                {def.label} {def.unit ? `(${def.unit})` : ''}
              </option>
            );
          })}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-[#08090a]/50 absolute right-2 pointer-events-none stroke-[2]" />
      </div>
      
      {/* Mini Unit / Hint Pill */}
      {currentDef.unit && (
        <span className="hidden lg:inline-flex text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-white border border-[#b1ada1]/30 text-[#08090a]/70 shadow-2xs">
          {currentDef.unit}
        </span>
      )}
    </div>
  );
};

