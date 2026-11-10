import React, { useMemo, useState } from 'react';
import { ExternalLink, Plus, Search, Star, Trash2 } from 'lucide-react';
import { CORE_SECTOR_INDICES, THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import { dataFeedRequestUrl, type TrackedStock } from '../utils/trackedStocks';

interface Quote {
  price: number;
  change1W: number;
  rawHistory?: { date: string; close: number }[];
}
interface TrackedStocksPanelProps {
  items: TrackedStock[];
  quotes: Record<string, Quote>;
  onAdd: (ticker: string, name: string, sectorId?: string) => void;
  onRemove: (ticker: string) => void;
  onOpenStock: (ticker: string) => void;
}

const KNOWN_STOCKS = new Map<string, { name: string; sectorId: string }>();
THEMATIC_SECTOR_INDICES.forEach(sector => sector.stocks.forEach(stock => {
  if (!KNOWN_STOCKS.has(stock.ticker)) {
    KNOWN_STOCKS.set(stock.ticker, { name: stock.name, sectorId: sector.id });
  }
}));

export function TrackedStocksPanel({ items, quotes, onAdd, onRemove, onOpenStock }: TrackedStocksPanelProps) {
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => items.filter(item =>
    `${item.ticker} ${item.name}`.toLowerCase().includes(query.toLowerCase())
  ), [items, query]);
  const suggested = KNOWN_STOCKS.get(ticker.trim().toUpperCase().replace(/\.NS$/, ''));

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(ticker, name.trim() || suggested?.name || ticker.trim().toUpperCase(), sectorId || suggested?.sectorId);
    setTicker('');
    setName('');
    setSectorId('');
  };

  return (
    <div className="p-3 sm:p-4 space-y-4" aria-label="Personal tracked stocks">
      <div>
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#08090a]">
          <Star className="h-4 w-4 text-[#2563eb]" />
          My Tracked Stocks
        </div>
        <p className="text-xs text-[#08090a]/65 mt-1 leading-relaxed">
          Your personal stock shortlist. Saved in this browser, separate from curated sector-return calculations.
        </p>
      </div>

      <form onSubmit={submit} className="p-3.5 bg-[#f4f3ee] border border-[#b1ada1]/35 rounded-2xl space-y-3">
        <label className="block text-xs font-bold text-[#08090a]" htmlFor="watch-ticker">NSE ticker</label>
        <input
          id="watch-ticker" required maxLength={24} value={ticker}
          onChange={e => setTicker(e.target.value.toUpperCase())}
          placeholder="e.g. KPITTECH, LT, M&M"
          className="w-full min-h-10 px-3 py-2 text-sm rounded-xl border border-[#b1ada1]/50 bg-white focus:border-[#2563eb] focus:outline-none"
        />
        {suggested && (
          <p className="text-xs text-[#2563eb]">Recognized: {suggested.name}</p>
        )}
        <label className="block text-xs font-bold text-[#08090a]" htmlFor="watch-name">Company name (optional)</label>
        <input
          id="watch-name" maxLength={120} value={name} onChange={e => setName(e.target.value)}
          placeholder={suggested?.name || 'Company name'}
          className="w-full min-h-10 px-3 py-2 text-sm rounded-xl border border-[#b1ada1]/50 bg-white focus:border-[#2563eb] focus:outline-none"
        />
        <label className="block text-xs font-bold text-[#08090a]" htmlFor="watch-sector">Related sector (optional)</label>
        <select id="watch-sector" value={sectorId} onChange={e => setSectorId(e.target.value)}
          className="w-full min-h-10 px-3 py-2 text-sm rounded-xl border border-[#b1ada1]/50 bg-white focus:border-[#2563eb] focus:outline-none">
          <option value="">Unassigned / infer if known</option>
          {CORE_SECTOR_INDICES.map(sector => <option key={sector.id} value={sector.id}>{sector.name}</option>)}
        </select>
        <button type="submit" className="w-full min-h-11 flex items-center justify-center gap-2 bg-[#08090a] hover:bg-[#1f2429] text-white font-bold text-sm rounded-xl transition-colors">
          <Plus className="h-4 w-4"/> Add to My Tracked Stocks
        </button>
      </form>

      <div className="space-y-2">
        <div className="flex justify-between items-center gap-2">
          <h3 className="font-bold text-sm">Saved stocks <span className="text-[#08090a]/45 font-medium">({items.length})</span></h3>
        </div>
        {items.length > 6 && (
          <div className="relative">
            <Search className="w-4 h-4 text-[#08090a]/40 absolute top-3 left-3" />
            <input aria-label="Filter tracked stocks" value={query} onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 min-h-10 rounded-xl text-sm bg-white border border-[#b1ada1]/40"
              placeholder="Filter your tracked stocks..."/>
          </div>
        )}
        {items.length === 0 ? (
          <div className="p-5 border border-dashed border-[#b1ada1]/40 rounded-2xl text-center text-sm text-[#08090a]/60">
            Add your first stock above. Existing stocks with verified histories will show prices and returns.
          </div>
        ) : filtered.map(item => {
          const quote = quotes[item.ticker];
          const hasHistory = !!quote?.rawHistory?.length && quote.rawHistory.length >= 40;
          const knownCore = CORE_SECTOR_INDICES.some(sector => sector.stocks.some(st => st.ticker === item.ticker));
          return (
            <div key={item.ticker} className="border border-[#b1ada1]/30 bg-white rounded-xl p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-sm text-[#08090a] font-mono">{item.ticker}</span>
                  <p className="text-xs text-[#08090a]/60 break-words">{item.name}</p>
                </div>
                <button type="button" onClick={() => onRemove(item.ticker)}
                  aria-label={`Remove ${item.ticker} from watchlist`}
                  className="min-h-9 min-w-9 p-2 flex items-center justify-center rounded-lg hover:bg-[#fee2e2] text-[#9f1239]">
                  <Trash2 className="h-4 w-4"/>
                </button>
              </div>
              {hasHistory ? (
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold font-mono">₹{quote.price.toLocaleString('en-IN')}</span>
                  <span className={quote.change1W >= 0 ? 'text-[#047857] font-bold' : 'text-[#be123c] font-bold'}>
                    1W: {quote.change1W > 0 ? '+' : ''}{quote.change1W.toFixed(2)}%
                  </span>
                </div>
              ) : (
                <p className="text-xs text-[#92400e] bg-[#fffbeb] rounded-lg px-2.5 py-2">
                  Not in verified price feed yet. Saved to your personal list, but not automatically collected.
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {hasHistory && knownCore && (
                  <button type="button" onClick={() => onOpenStock(item.ticker)}
                    className="font-bold text-[#2563eb] hover:underline">View sector analysis</button>
                )}
                {!hasHistory && (
                  <a href={dataFeedRequestUrl(item)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex gap-1 items-center font-bold text-[#2563eb] hover:underline">
                    Request feed inclusion <ExternalLink className="h-3 w-3"/>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-[#08090a]/60 leading-relaxed">
        Personal entries are stored only on this browser. Adding a ticker does not automatically change the shared GitHub collection universe or a curated sector index.
      </p>
    </div>
  );
}
