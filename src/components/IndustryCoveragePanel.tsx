import React, { useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Download, Search, ShieldAlert } from 'lucide-react';
import { buildBasicIndustryAudit, industryAuditCsv } from '../utils/basicIndustryCoverage';
import type { BrowserMarketSnapshot } from '../utils/marketSnapshotClient';

interface Props { marketSnapshot: BrowserMarketSnapshot | null }

export function IndustryCoveragePanel({ marketSnapshot }: Props) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'needs-review' | 'all' | 'source-verified'>('needs-review');
  const [limit, setLimit] = useState(60);
  const audit = useMemo(() => buildBasicIndustryAudit(marketSnapshot), [marketSnapshot]);
  const filtered = useMemo(() => audit.rows.filter(row => {
    if (status === 'needs-review' && row.status === 'source-verified') return false;
    if (status === 'source-verified' && row.status !== 'source-verified') return false;
    const term = query.toLowerCase().trim();
    return !term || `${row.ticker} ${row.name} ${row.industry || ''} ${row.themeNames.join(' ')}`.toLowerCase().includes(term);
  }), [audit, status, query]);

  const downloadAudit = () => {
    const csv = '\ufeff' + industryAuditCsv(audit.rows);
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sector-rotation-basic-industry-mapping-audit.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-label="Basic industry mapping audit" className="rounded-xl border border-[#b1ada1]/30 bg-white space-y-4 p-3 sm:p-4">
      <div className="flex flex-wrap gap-2 items-start justify-between">
        <div>
          <h4 className="font-bold text-sm sm:text-base flex gap-2 items-center">
            <ShieldAlert className="w-4 h-4 text-[#d97706]"/> Stock-to-industry mapping coverage
          </h4>
          <p className="text-xs text-[#08090a]/60 mt-1 max-w-2xl">
            All unique symbols from the 62 thematic baskets and the currently loaded saved-price snapshot.
            Verified means a source-linked classification, not complete coverage of all NSE listings.
          </p>
        </div>
        <button onClick={downloadAudit} type="button"
          className="min-h-10 px-3 py-2 rounded-xl border border-[#b1ada1]/40 hover:bg-[#f4f3ee] font-bold text-xs inline-flex items-center gap-1.5">
          <Download className="w-4 h-4"/> Export full audit CSV
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {[
          ['Saved + thematic stock universe', audit.totalUniverse],
          ['Source-verified symbols', audit.coveredByVerifiedMapping],
          ['Awaiting company classification', audit.needingReview],
          ['Mapped coverage', audit.mappedPct + '%'],
        ].map(([label, value]) => (
          <div key={label} className="bg-[#f4f3ee] p-3 rounded-xl border border-[#b1ada1]/20">
            <div className="text-[11px] text-[#08090a]/60">{label}</div>
            <div className="text-xl font-mono font-bold mt-1">{value}</div>
          </div>
        ))}
      </div>
      {!marketSnapshot && (
        <p className="rounded-lg bg-[#fffbeb] text-[#92400e] p-3 text-xs">
          Live saved snapshot has not loaded. Counts currently include the bundled thematic universe only.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="relative">
          <Search className="w-4 h-4 text-[#08090a]/45 absolute left-3 top-3"/>
          <input aria-label="Search company mapping coverage" type="search"
            placeholder="Search ticker, company or theme" value={query}
            onChange={e => { setQuery(e.target.value); setLimit(60); }}
            className="w-full min-h-11 pl-9 pr-3 text-sm border border-[#b1ada1]/40 rounded-xl focus:border-[#2563eb] focus:outline-none"/>
        </label>
        <select value={status} onChange={e => { setStatus(e.target.value as typeof status); setLimit(60); }}
          aria-label="Filter mapping coverage"
          className="min-h-11 px-3 text-sm border border-[#b1ada1]/40 rounded-xl bg-white">
          <option value="needs-review">Needs classification review</option>
          <option value="source-verified">Source-verified only</option>
          <option value="all">All tracked symbols</option>
        </select>
      </div>
      <div className="max-h-[400px] overflow-y-auto divide-y divide-[#b1ada1]/20 border border-[#b1ada1]/25 rounded-xl">
        {filtered.length === 0 && <p className="p-5 text-sm text-[#08090a]/60">No symbols match these filters.</p>}
        {filtered.slice(0, limit).map(row => (
          <div key={row.ticker} className="px-3 py-3 flex flex-wrap sm:flex-nowrap gap-2 items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-bold font-mono">{row.ticker}</span>
                {row.status === 'source-verified'
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-[#047857]"/>
                  : <ShieldAlert className="w-3.5 h-3.5 text-[#d97706]"/>}
              </div>
              <p className="text-xs text-[#08090a]/70 mt-0.5 break-words">{row.name}</p>
              <p className="text-xs text-[#08090a]/55 mt-1">
                {row.status === 'source-verified' ? `${row.industry} · ${row.industryCode}` : 'Basic industry not source-verified'}
                {row.themeNames.length ? ` · ${row.themeNames.length} theme(s)` : ' · Snapshot-only'}
                {!row.inSavedSnapshot && marketSnapshot ? ' · No saved price' : ''}
              </p>
            </div>
            <a target="_blank" rel="noopener noreferrer" href={row.sourceUrl || `https://www.nseindia.com/get-quotes/equity?symbol=${encodeURIComponent(row.ticker)}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] min-h-8">
              {row.sourceUrl ? 'Evidence' : 'Check NSE'} <ArrowUpRight className="w-3.5 h-3.5"/>
            </a>
          </div>
        ))}
      </div>
      {filtered.length > limit && (
        <button type="button" className="w-full min-h-11 rounded-xl text-sm font-bold border border-[#b1ada1]/40 hover:bg-[#f4f3ee]"
          onClick={() => setLimit(n => n + 60)}>
          Show more ({filtered.length - limit} remaining)
        </button>
      )}
      <p className="text-xs text-[#08090a]/55">
        This is a stock-level audit, not complete-market industry coverage. Exported rows are a review checklist.
        Any accepted new classification needs its own documented source, verified NSE code and review date.
      </p>
    </section>
  );
}
