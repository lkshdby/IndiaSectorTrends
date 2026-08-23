import React from 'react';
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
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-[#08090a]/60 uppercase tracking-wider font-display">
          Select Indicator (8 Financial Metrics)
        </span>
        <span className="text-xs text-[#08090a]/70 hidden sm:inline font-medium">
          {METRIC_DEFINITIONS[selectedMetric].description}
        </span>
      </div>

      {/* The 8 Metric Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {METRIC_KEYS.map((key) => {
          const def = METRIC_DEFINITIONS[key];
          const isSelected = selectedMetric === key;

          return (
            <button
              key={key}
              id={`metric-btn-${key}`}
              onClick={() => onSelectMetric(key)}
              className={`relative px-3 py-3 rounded-[14px] text-left border transition-all duration-150 flex flex-col justify-between min-h-[64px] cursor-pointer ${
                isSelected
                  ? 'bg-[#08090a] text-white border-[#08090a] shadow-md ring-2 ring-[#08090a]/15 scale-[1.02]'
                  : 'bg-white text-[#08090a] border-[#b1ada1]/30 hover:border-[#b1ada1]/70 hover:bg-[#f4f3ee]/50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-xs font-extrabold leading-tight font-display ${
                    isSelected ? 'text-white' : 'text-[#08090a]'
                  }`}
                >
                  {def.label}
                </span>
                {def.unit && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-[#f4f3ee]' : 'bg-[#f4f3ee] text-[#08090a]/70'
                    }`}
                  >
                    {def.unit}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] mt-1 line-clamp-1 font-medium ${
                  isSelected ? 'text-[#f4f3ee]/80' : 'text-[#08090a]/60'
                }`}
              >
                {def.shortLabel}
              </span>

              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-[#c15f3c] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

