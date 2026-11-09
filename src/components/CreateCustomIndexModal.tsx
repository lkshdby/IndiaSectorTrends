import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Search, Layers } from 'lucide-react';
import { CustomIndexItem } from '../types/indexTracker';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';

interface CreateCustomIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newIndex: CustomIndexItem) => void;
}

export const CreateCustomIndexModal: React.FC<CreateCustomIndexModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);

  if (!isOpen) return null;

  // Gather all unique stocks across all prebuilt indices
  const allStocksMap = new Map<string, { ticker: string; name: string; sector: string }>();
  THEMATIC_SECTOR_INDICES.forEach((sec) => {
    sec.stocks.forEach((st) => {
      if (!allStocksMap.has(st.ticker)) {
        allStocksMap.set(st.ticker, { ticker: st.ticker, name: st.name, sector: sec.name });
      }
    });
  });

  const allStocks = Array.from(allStocksMap.values());
  const filteredStocks = allStocks.filter(
    (s) =>
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTicker = (ticker: string) => {
    if (selectedTickers.includes(ticker)) {
      setSelectedTickers(selectedTickers.filter((t) => t !== ticker));
    } else {
      setSelectedTickers([...selectedTickers, ticker]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selectedTickers.length === 0) return;

    const newIndex: CustomIndexItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || undefined,
      createdAt: new Date().toISOString(),
      stockTickers: selectedTickers,
    };

    onSave(newIndex);
    setName('');
    setDescription('');
    setSelectedTickers([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-[#f4f3ee] rounded-[24px] shadow-2xl max-w-xl w-full border border-[#b1ada1]/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#b1ada1]/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#08090a] text-white">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-[#08090a] font-display">Create Custom Index</h3>
              <p className="text-xs text-[#08090a]/60">Build your personal equal-weighted stock basket</p>
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
        <form onSubmit={handleCreate} className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-bold text-[#08090a] mb-1 font-display">
              Index Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Defence Leaders, Hospitals Top 5, Solar Momentum"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#08090a] text-[#08090a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#08090a] mb-1 font-display">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short note on strategy or investment thesis"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#08090a] text-[#08090a]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#08090a] font-display">
                Selected Constituents ({selectedTickers.length})
              </label>
              {selectedTickers.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTickers([])}
                  className="text-[11px] text-[#e11d48] hover:underline cursor-pointer font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {selectedTickers.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 p-3 bg-white rounded-xl border border-[#b1ada1]/30 max-h-24 overflow-y-auto">
                {selectedTickers.map((ticker) => (
                  <span
                    key={ticker}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f4f3ee] border border-[#b1ada1]/40 text-[#08090a] rounded-lg text-xs font-mono font-bold"
                  >
                    {ticker}
                    <button
                      type="button"
                      onClick={() => toggleTicker(ticker)}
                      className="text-[#08090a]/50 hover:text-[#e11d48] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-white/60 rounded-xl border border-dashed border-[#b1ada1]/40 text-center text-xs text-[#08090a]/60">
                Select stocks below to include in this custom index
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#08090a] mb-1.5 font-display">
              Add Stocks to Index
            </label>
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#08090a]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ticker or company name..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-[#b1ada1]/40 rounded-xl focus:outline-hidden focus:border-[#08090a] text-[#08090a]"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1 bg-white p-2 rounded-xl border border-[#b1ada1]/30">
              {filteredStocks.map((st) => {
                const isSelected = selectedTickers.includes(st.ticker);
                return (
                  <button
                    key={st.ticker}
                    type="button"
                    onClick={() => toggleTicker(st.ticker)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#10b981]/15 text-[#08090a] font-bold'
                        : 'hover:bg-[#f4f3ee] text-[#08090a]'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold block">{st.ticker}</span>
                      <span className="text-[11px] text-[#08090a]/60 font-medium">
                        {st.name} · {st.sector}
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected
                          ? 'bg-[#10b981] border-[#10b981] text-white'
                          : 'border-[#b1ada1]/40 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
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
              disabled={!name.trim() || selectedTickers.length === 0}
              className="px-5 py-2 text-xs font-bold bg-[#08090a] text-white rounded-xl disabled:opacity-40 cursor-pointer shadow-xs hover:bg-[#1f2429] transition-all"
            >
              Save Index ({selectedTickers.length} stocks)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
