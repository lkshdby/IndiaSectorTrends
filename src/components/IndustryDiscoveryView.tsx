import React, { useMemo, useState } from 'react';
import { ArrowUpRight, BarChart3, BookOpen, ChevronRight, Filter, Layers3, Search, ShieldCheck, Star } from 'lucide-react';
import { BASIC_INDUSTRIES, NSE_PUBLISHED_BASIC_INDUSTRY_COUNT } from '../data/basicIndustryCatalog';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import { readTrackedStocks } from '../utils/trackedStocks';
import { computeIndustryDiscovery, type BasicIndustryScore, type IndustryConfidence } from '../utils/basicIndustryAnalytics';
import type { BrowserMarketSnapshot } from '../utils/marketSnapshotClient';

interface Props {
  marketSnapshot: BrowserMarketSnapshot | null;
  onOpenThemes: () => void;
}

const CONFIDENCE: Record<IndustryConfidence, string> = {
  rankable: 'Rankable · >=5 verified stocks',
  'limited-sample': 'Limited sample / concentration',
  'single-stock': 'Single-stock observation',
  unmapped: 'Company mapping not verified',
  'insufficient-data': 'Incomplete price history',
};
function fmt(value: number | null, unit = '%'): string {
  return value === null ? '—' : `${value > 0 ? '+' : ''}${value.toFixed(2)}${unit}`;
}
function signalTone(value: number | null): string {
  if (value === null) return 'bg-[#f2f1ec] text-[#08090a]/55 border-[#b1ada1]/20';
  if (value >= 5) return 'bg-emerald-100 text-emerald-900 border-emerald-200';
  if (value > 0) return 'bg-emerald-50 text-emerald-800 border-emerald-100';
  if (value <= -5) return 'bg-rose-100 text-rose-900 border-rose-200';
  if (value < 0) return 'bg-rose-50 text-rose-800 border-rose-100';
  return 'bg-slate-50 text-slate-700 border-slate-200';
}

export function IndustryDiscoveryView({ marketSnapshot, onOpenThemes }: Props) {
  const [search, setSearch] = useState('');
  const [macro, setMacro] = useState('All');
  const [show, setShow] = useState<'all' | 'mapped' | 'rankable'>('mapped');
  const [sort, setSort] = useState<'rs' | '1m' | 'breadth' | 'name'>('rs');
  const [selectedName, setSelectedName] = useState('Computers - Software & Consulting');
  const summary = useMemo(() => computeIndustryDiscovery(marketSnapshot), [marketSnapshot]);
  const selection = summary.industryRows.find(x => x.industry.name === selectedName);
  const macros = useMemo(() => Array.from(new Set(BASIC_INDUSTRIES.map(x => x.macro).filter((x): x is string => !!x))).sort(), []);
  const visible = useMemo(() => summary.industryRows.filter(row => {
    if (search && !`${row.industry.name} ${row.industry.code || ''} ${row.industry.macro || ''}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (macro !== 'All' && row.industry.macro !== macro) return false;
    if (show === 'mapped' && !row.mappedCount) return false;
    if (show === 'rankable' && row.confidence !== 'rankable') return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'name') return a.industry.name.localeCompare(b.industry.name);
    // Unknown observations go LAST, not accidentally shown as 0%-return losers.
    const value = (r: BasicIndustryScore): number | null =>
      sort === 'rs' ? r.nifty500Relative1M : sort === 'breadth' ? r.breadth1W : r.price1M;
    const av = value(a), bv = value(b);
    if (av === null) return bv === null ? a.industry.name.localeCompare(b.industry.name) : 1;
    if (bv === null) return -1;
    return bv - av;
  }), [summary, search, macro, show, sort]);
  const trackedTickers = useMemo(() => new Set(readTrackedStocks().map(x => x.ticker)), []);

  const related = useMemo(() => {
    const tickerSet = new Set(selection?.verifiedTickers || []);
    return THEMATIC_SECTOR_INDICES
      .map(sector => ({
        name: sector.name,
        matches: sector.stocks.filter(x => tickerSet.has(x.ticker)).map(x => x.ticker),
      }))
      .filter(x => x.matches.length)
      .slice(0, 8);
  }, [selection]);

  return (
    <section className="space-y-5 text-[#08090a]" aria-label="Basic industry discovery">
      <header className="bg-white border border-[#b1ada1]/30 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#2563eb] font-bold tracking-wider uppercase">Industry intelligence · Phase 2</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold">Discover India's basic industries</h2>
            <p className="mt-1 text-sm text-[#08090a]/65 max-w-3xl">
              A separate, source-aware classification layer alongside the 62 investment themes.
              The full catalogue and company mapping are being verified—unmapped industries do not receive invented scores.
            </p>
          </div>
          <button onClick={onOpenThemes}
            className="inline-flex gap-2 items-center min-h-11 px-4 py-2 rounded-xl text-sm font-bold border border-[#b1ada1]/40 hover:bg-[#f4f3ee]">
            <Layers3 className="w-4 h-4"/> Browse investment themes <ChevronRight className="w-4 h-4"/>
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-5">
          {[
            { label: 'Candidate industry names', value: String(BASIC_INDUSTRIES.length), note: `NSE framework: ${NSE_PUBLISHED_BASIC_INDUSTRY_COUNT} official` },
            { label: 'Source-verified stock mappings', value: `${summary.verifiedMappingCount} / ${summary.universeSize}`, note: 'Of unique existing thematic tickers' },
            { label: 'Industries with mapped stocks', value: String(summary.groupedIndustries), note: 'Mapped to verified NSE symbols' },
            { label: 'Eligible industry rankings', value: String(summary.eligibleCount), note: '>=5 aligned stocks; adequate coverage' },
          ].map(card => (
            <div key={card.label} className="rounded-xl bg-[#f4f3ee] border border-[#b1ada1]/20 p-3.5">
              <div className="text-xs text-[#08090a]/65 font-semibold">{card.label}</div>
              <div className="text-xl sm:text-2xl font-extrabold font-mono mt-1">{card.value}</div>
              <p className="text-[11px] mt-1 text-[#08090a]/55">{card.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-[#92400e] px-3.5 py-3 rounded-xl border border-[#fbbf24]/40 bg-[#fffbeb]">
          <strong>Coverage notice:</strong> Names are seeded from the supplied list; official NSE codes and stock-to-industry assignments are being audited.
          Do not treat a low-mapping sample as the market-wide industry leaderboard.
          {marketSnapshot ? ` Saved market collection: ${new Date(marketSnapshot.fetchedAt).toLocaleString('en-IN', { timeZone:'Asia/Kolkata' })} IST.` : ' Waiting for the saved market snapshot.'}
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,1fr)] gap-4 items-start">
        <div className="rounded-2xl bg-white border border-[#b1ada1]/30 overflow-hidden">
          <div className="p-4 border-b border-[#b1ada1]/20 space-y-3">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#2563eb]"/> Industry leaderboard</h3>
              <span className="text-xs text-[#08090a]/50">{visible.length} shown · not a complete-market ranking</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="relative">
                <Search className="w-4 h-4 text-[#08090a]/40 absolute left-3 top-3"/>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Find a basic industry or NSE code" aria-label="Search basic industries"
                  className="w-full min-h-11 pl-9 pr-3 rounded-xl border border-[#b1ada1]/40 text-sm focus:outline-none focus:border-[#2563eb]"/>
              </label>
              <label className="flex items-center gap-2 px-2 rounded-xl border border-[#b1ada1]/40">
                <Filter className="w-4 h-4 text-[#08090a]/50 shrink-0"/>
                <select aria-label="Filter macro-economic sector" value={macro} onChange={e => setMacro(e.target.value)}
                  className="w-full min-h-11 text-sm bg-transparent focus:outline-none">
                  <option value="All">All macro sectors</option>
                  {macros.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
              </label>
              <select aria-label="Filter confidence" value={show} onChange={e => setShow(e.target.value)}
                className="min-h-11 px-3 text-sm border border-[#b1ada1]/40 rounded-xl bg-white">
                <option value="mapped">With verified stock assignments</option>
                <option value="rankable">Eligible rankings only</option>
                <option value="all">All candidate industry names</option>
              </select>
              <select aria-label="Sort industry results" value={sort} onChange={e => setSort(e.target.value)}
                className="min-h-11 px-3 text-sm border border-[#b1ada1]/40 rounded-xl bg-white">
                <option value="rs">Relative strength vs NIFTY 500 · 1M</option>
                <option value="1m">Equal-weight return · 1M</option>
                <option value="breadth">Rising constituent breadth · 1W</option>
                <option value="name">Industry name</option>
              </select>
            </div>
          </div>
          <div className="max-h-[690px] overflow-y-auto divide-y divide-[#b1ada1]/20">
            {visible.length === 0 && (
              <div className="p-8 text-sm text-[#08090a]/60 text-center">
                No industries match those filters. Select “All candidate industry names” to explore unmapped categories.
              </div>
            )}
            {visible.map(row => (
              <button type="button" key={row.industry.name} onClick={() => setSelectedName(row.industry.name)}
                aria-pressed={selectedName === row.industry.name}
                className={`w-full text-left px-4 py-3.5 hover:bg-[#f4f3ee] transition-colors border-l-4 ${selectedName === row.industry.name ? 'bg-[#eff6ff] border-[#2563eb]' : 'border-transparent'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold break-words leading-snug">{row.industry.name}</p>
                    <p className="text-xs text-[#08090a]/55 mt-1">
                      {row.industry.macro || 'Parent not yet verified'}
                      {row.industry.code ? ` · ${row.industry.code}` : ' · code pending'}
                    </p>
                  </div>
                  <div className={`rounded-lg px-2 py-1 border font-mono font-bold text-sm shrink-0 ${signalTone(row.price1M)}`}>
                    {fmt(row.price1M)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#08090a]/65 mt-2">
                  <span>{row.pricedCount}/{row.mappedCount} with verified histories</span>
                  <span>1W breadth: {row.breadth1W === null ? '—' : `${row.breadth1W}%`}</span>
                  <span>RS 1M: {fmt(row.nifty500Relative1M)}</span>
                </div>
                <p className={`text-xs mt-1.5 font-semibold ${row.confidence === 'rankable' ? 'text-[#047857]' : 'text-[#92400e]'}`}>
                  {CONFIDENCE[row.confidence]}
                </p>
              </button>
            ))}
          </div>
        </div>

        <aside className="bg-white rounded-2xl border border-[#b1ada1]/30 p-4 sm:p-5 xl:sticky xl:top-20 space-y-4">
          {selection ? (
            <>
              <div>
                <p className="text-xs uppercase font-extrabold text-[#2563eb] tracking-wider">Industry detail</p>
                <h3 className="font-extrabold text-lg leading-snug mt-1">{selection.industry.name}</h3>
                <p className="text-xs text-[#08090a]/60 mt-1 break-words">
                  {selection.industry.macro && `${selection.industry.macro} › ${selection.industry.sector} › ${selection.industry.industry}`}
                  {selection.industry.code ? ` · ${selection.industry.code}` : 'NSE hierarchy pending verification'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['EW return · 1M', fmt(selection.price1M)],
                  ['EW vs NIFTY 500 · 1M', fmt(selection.nifty500Relative1M)],
                  ['MCap return · 1M', fmt(selection.mcap1M)],
                  ['Rising stocks · 1W', `${selection.advancing1W} / ${selection.pricedCount}`],
                ].map(([label,value]) => (
                  <div key={label} className="p-3 bg-[#f4f3ee] rounded-xl">
                    <div className="text-[11px] text-[#08090a]/55">{label}</div>
                    <div className="text-lg font-mono font-extrabold mt-1">{value}</div>
                  </div>
                ))}
              </div>
              <div className={`text-xs p-3 rounded-xl border ${selection.confidence === 'rankable' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-[#fffbeb] text-[#92400e] border-[#fbbf24]/35'}`}>
                <p className="font-bold flex items-center gap-1.5"><ShieldCheck className="w-4 h-4"/>{CONFIDENCE[selection.confidence]}</p>
                <p className="mt-1">Validated cohort {selection.pricedCount} / mapped {selection.mappedCount}. Historical coverage {selection.coveragePct}%. Largest stored market-cap weight: {selection.concentrationPct === null ? 'unknown' : selection.concentrationPct + '%'}.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-2">Source-verified company mappings</h4>
                {selection.provenance.length ? (
                  <div className="space-y-2">
                    {selection.provenance.map(ref => (
                      <a href={ref.sourceUrl} key={ref.ticker} target="_blank" rel="noopener noreferrer"
                        className="flex gap-2 items-center justify-between rounded-lg px-3 py-2 border border-[#b1ada1]/25 text-sm font-semibold hover:bg-[#f4f3ee]">
                        <span className="flex items-center gap-2">
                          {trackedTickers.has(ref.ticker) && <Star className="w-3.5 h-3.5 text-amber-500"/>}
                          {ref.ticker}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[#08090a]/50"/>
                      </a>
                    ))}
                  </div>
                ) : <p className="text-xs text-[#08090a]/60">No source-verified stock assignments. This industry is not ranked.</p>}
              </div>
              {!!related.length && (
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5 mb-2"><Layers3 className="h-4 w-4"/> Connected investment themes</h4>
                  <div className="space-y-1.5">
                    {related.map(x => (
                      <div key={x.name} className="rounded-lg px-3 py-2 bg-[#f4f3ee] text-xs">
                        <span className="font-semibold">{x.name}</span>
                        <span className="block text-[#08090a]/60 mt-1">{x.matches.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <a href="https://www.nseindia.com/static/products-services/industry-classification" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#2563eb] hover:underline">
                <BookOpen className="w-4 h-4"/> NSE industry classification methodology <ArrowUpRight className="w-4 h-4"/>
              </a>
            </>
          ) : <p className="text-sm text-[#08090a]/60">Select an industry to inspect its evidence.</p>}
        </aside>
      </div>
      <p className="text-xs leading-relaxed text-[#08090a]/55">
        Prices are cached daily closes, not live intraday quotes. Industry indices are uninvestable price-return composites with static estimated market caps.
        Underlying classifications are sparse and dated. No inference of institutional buying, business exposure, or investment advice is implied.
      </p>
    </section>
  );
}
