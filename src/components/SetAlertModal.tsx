import React, { useState } from 'react';
import { X, Bell, CheckCircle2 } from 'lucide-react';

interface SetAlertModalProps {
  isOpen: boolean;
  targetName: string;
  currentValue?: number | string;
  onClose: () => void;
  onConfirm: (alertSummary: string) => void;
}

export const SetAlertModal: React.FC<SetAlertModalProps> = ({
  isOpen,
  targetName,
  currentValue,
  onClose,
  onConfirm,
}) => {
  const [alertType, setAlertType] = useState<'return_above' | 'return_below' | 'momentum_shift'>('return_above');
  const [threshold, setThreshold] = useState('5.0');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M'>('1W');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = `${targetName}: Alert when ${timeframe} return ${
      alertType === 'return_above' ? 'rises above +' : alertType === 'return_below' ? 'drops below -' : 'rotates by'
    }${threshold}%`;
    onConfirm(summary);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-[#f4f3ee] rounded-[24px] shadow-2xl max-w-md w-full border border-[#b1ada1]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#b1ada1]/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#08090a] text-white">
              <Bell className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-[#08090a] font-display">Set Alert</h3>
              <p className="text-xs text-[#08090a]/60">Trigger alert on {targetName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#f4f3ee] hover:bg-[#b1ada1]/20 flex items-center justify-center text-[#08090a] cursor-pointer border border-[#b1ada1]/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-white rounded-xl border border-[#b1ada1]/30 text-xs">
            <span className="text-[#08090a]/60 font-semibold block mb-0.5">Tracking Target:</span>
            <span className="font-extrabold text-[#08090a] font-display text-sm">{targetName}</span>
            {currentValue && (
              <span className="text-[11px] text-[#08090a]/60 block mt-0.5">Current: {currentValue}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#08090a] mb-1 font-display">
              Condition
            </label>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#08090a] text-[#08090a]"
            >
              <option value="return_above">Performance rises above threshold</option>
              <option value="return_below">Performance falls below threshold</option>
              <option value="momentum_shift">New Sector Rotation Inflow detected</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#08090a] mb-1 font-display">
                Timeframe
              </label>
              <div className="flex bg-white p-1 rounded-xl border border-[#b1ada1]/40">
                {(['1D', '1W', '1M'] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      timeframe === tf
                        ? 'bg-[#08090a] text-white shadow-xs'
                        : 'text-[#08090a]/60 hover:text-[#08090a]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#08090a] mb-1 font-display">
                Threshold (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#08090a] text-[#08090a]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#08090a]/70 hover:text-[#08090a] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#08090a] text-white rounded-xl cursor-pointer shadow-xs hover:bg-[#1f2429] transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Set Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
