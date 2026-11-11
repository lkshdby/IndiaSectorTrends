import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Database, Download, FileUp, Info, Layers3, Search, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import { joinPrivateIndustryAssignments, loadPrivateIndustryEvidence } from '../utils/privateIndustryEvidence';
import { buildThemeMembershipAudit, themeMembershipAuditCsv } from '../utils/themeMembershipAudit';
import { computeThemeStockLeadership, sortThemeStockLeaders, type LeaderSort, type ThemeStockLeader } from '../utils/stockLeadership';
import { clearScreenerResearchPool, loadScreenerResearchPool, parseScreenerResearchPool, saveScreenerResearchPool, selectScreenerIndustryPeers, type ScreenerResearchPool } from '../utils/screenerResearchPool';
import type { BrowserMarketSnapshot } from '../utils/marketSnapshotClient';

interface Props {
  marketSnapshot:BrowserMarketSnapshot|null;
  onOpenRadar:()=>void;
}
function fmt(v:number|null,unit='%'):string {
  return v===null?'—':(v>0?'+':'')+v.toFixed(2)+unit;
}
const stateColors:Record<ThemeStockLeader['state'],string>={
  Emerging:'text-blue-800 bg-blue-50 border-blue-200',
  Established:'text-emerald-800 bg-emerald-50 border-emerald-200',
  Cooling:'text-amber-800 bg-amber-50 border-amber-200',
  Lagging:'text-slate-700 bg-slate-50 border-slate-200',
  'Insufficient data':'text-slate-500 bg-slate-50 border-slate-200',
};
export function StockDiscoveryView({marketSnapshot,onOpenRadar}:Props) {
  const audit=useMemo(()=>buildThemeMembershipAudit(),[]);
  const [themeId,setThemeId]=useState('data-centers-ai-cloud');
  const [sort,setSort]=useState<LeaderSort>('acceleration');
  const [tier,setTier]=useState<'all'|'core'|'adjacent'|'proxy'>('all');
  const [state,setState]=useState('all');
  const [minCap,setMinCap]=useState(1000);
  const [pool,setPool]=useState<ScreenerResearchPool|null>(()=>loadScreenerResearchPool());
  const [uploadMessage,setUploadMessage]=useState('');
  const [uploadError,setUploadError]=useState('');
  const [privateAssignments]=useState(()=>loadPrivateIndustryEvidence()?.assignments||new Map());
  const classifications=useMemo(()=>joinPrivateIndustryAssignments(privateAssignments),[privateAssignments]);
  const report=useMemo(()=>computeThemeStockLeadership(marketSnapshot,themeId,classifications),
    [marketSnapshot,themeId,classifications]);
  const selectedAudit=audit.themes.find(x=>x.themeId===themeId);
  const ranked=useMemo(()=>sortThemeStockLeaders(report.leaders,sort).filter(r=>
    (tier==='all'||r.tier===tier)&&(state==='all'||r.state===state)),[report,sort,tier,state]);
  const peers=useMemo(()=>pool?selectScreenerIndustryPeers(pool,themeId,classifications,minCap):[],
    [pool,themeId,classifications,minCap]);
  const downloadAudit=()=>{
    const csv=themeMembershipAuditCsv(audit);
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');
    a.href=url;a.download='IndiaSectorTrends_full_62_theme_membership_audit.csv';
    document.body.appendChild(a);a.click();a.remove();
    URL.revokeObjectURL(url);
  };
  const importPool=async(event:React.ChangeEvent<HTMLInputElement>)=>{
    const file=event.target.files?.[0];
    if(!file)return;
    setUploadError('');setUploadMessage('');
    try{
      if(file.size>8_000_000)throw new Error('File exceeds 8 MB.');
      const asOf=new Date().toISOString().slice(0,10);
      const data=parseScreenerResearchPool(await file.text(),asOf);
      saveScreenerResearchPool(data);
      setPool(data);
      setUploadMessage(data.companies.length+' NSE-symbol industry peers loaded locally. Candidates still require business-exposure review.');
    }catch(error){
      setUploadError(error instanceof Error?error.message:'Cannot import Screener CSV');
    }finally{event.target.value='';}
  };
  return (
    <section className="space-y-4 text-[#08090a]" aria-label="Theme membership audit and stock leadership research">
      <header className="bg-white border border-[#b1ada1]/30 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-wrap gap-3 justify-between items-start">
          <div>
            <p className="text-[11px] uppercase font-extrabold tracking-widest text-blue-700">Research workflow · Stock selection</p>
            <h2 className="text-xl sm:text-2xl font-extrabold mt-1 flex gap-2 items-center">
              <Sparkles className="w-6 h-6 text-blue-600"/> Stock Leaders & Theme Membership
            </h2>
            <p className="mt-2 text-sm text-[#08090a]/65 max-w-3xl">
              <strong>Membership is based on the business, leadership on the price.</strong>
              Review structural membership across all 62 themes, dynamically rank their priced stocks, and screen the full private Screener export for additional industry peers.
            </p>
          </div>
          <button type="button" onClick={onOpenRadar}
            className="border border-[#b1ada1]/35 bg-[#f4f3ee] rounded-xl px-3 min-h-10 text-xs font-bold flex items-center gap-2">
            Rotation Radar <ArrowUpRight className="w-4 h-4"/>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5">
          {([
            ['Thematic baskets',audit.themeCount,'Fully included in structural review'],
            ['Stock positions',audit.themeEntries,'Includes repeated names across baskets'],
            ['Provisional baskets',audit.provisionalThemes,'Need documented membership evidence'],
            ['Small core baskets',audit.narrowCoreThemes,'Less than five direct members'],
          ] as const).map(([label,value,note])=>(
            <div key={label} className="rounded-xl bg-[#f4f3ee] border border-[#b1ada1]/20 p-3">
              <p className="text-[11px] text-[#08090a]/60 font-semibold">{label}</p>
              <p className="font-mono text-xl sm:text-2xl font-extrabold mt-1">{value}</p>
              <p className="text-[11px] text-[#08090a]/55 mt-1">{note}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-3">
          <button type="button" onClick={downloadAudit} className="flex items-center gap-2 border border-[#b1ada1]/35 rounded-xl px-3 py-2 text-xs font-bold">
            <Download className="w-4 h-4"/> Download all membership rows
          </button>
          <p className="text-[11px] text-[#92400e]">
            Structural inventory only: explicit *editorial* review is not independent company-revenue verification. The radar does not treat provisional baskets as confirmed early-turn signals.
          </p>
        </div>
      </header>

      <div className="bg-white border border-[#b1ada1]/30 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex-1 min-w-[250px] text-xs font-bold text-[#08090a]/65">
            Theme to investigate
            <select value={themeId} onChange={e=>setThemeId(e.target.value)} aria-label="Choose thematic basket"
              className="w-full mt-1 min-h-11 px-3 bg-white border border-[#b1ada1]/40 rounded-xl text-sm font-semibold text-[#08090a]">
              {THEMATIC_SECTOR_INDICES.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </label>
          <span className={'px-3 py-2 text-xs font-bold rounded-xl border '+
            (selectedAudit?.reviewState==='explicit-editorial'?'bg-emerald-50 border-emerald-200 text-emerald-800':
              'bg-amber-50 border-amber-200 text-amber-800')}>
            {selectedAudit?.reviewState==='explicit-editorial'?'Explicit editorial membership':'Provisional membership'}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#08090a]/65">
          <span>Core: <strong>{selectedAudit?.core||0}</strong></span>
          <span>Adjacent: <strong>{selectedAudit?.adjacent||0}</strong></span>
          <span>Proxy: <strong>{selectedAudit?.proxy||0}</strong></span>
          <span>Explicitly reviewed entries: <strong>{selectedAudit?.explicitlyReviewed||0}</strong></span>
          <span>Observed price histories: <strong>{report.valid}/{report.total}</strong></span>
        </div>
        {selectedAudit?.pendingActions.map(x=>(
          <p key={x} className="text-[11px] text-[#92400e] bg-amber-50 border border-amber-200 p-2 rounded-lg">{x}</p>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-[#b1ada1]/30 overflow-hidden">
        <div className="p-4 space-y-3 border-b border-[#b1ada1]/25">
          <div className="flex gap-2 items-center">
            <ShieldCheck className="w-4 h-4 text-blue-600"/>
            <h3 className="font-extrabold text-base">Who is leading the theme?</h3>
          </div>
          <p className="text-xs text-[#08090a]/65">
            Ranking uses observed five- and 21-session prices aligned with NIFTY 500. Core, adjacent and proxy members are separate; no stock is promoted into core for rising faster.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="text-[11px] text-[#08090a]/60 font-semibold">
              Sort stocks by
              <select value={sort} onChange={e=>setSort(e.target.value as LeaderSort)} aria-label="Stock leadership ranking metric"
                className="block mt-1 w-full min-h-10 bg-white border border-[#b1ada1]/35 rounded-lg px-2 text-xs">
                <option value="acceleration">Gaining relative momentum</option>
                <option value="relative5">5D relative strength</option>
                <option value="relative21">21D relative strength</option>
                <option value="return5">5D absolute return</option>
                <option value="return21">21D absolute return</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
            <label className="text-[11px] text-[#08090a]/60 font-semibold">
              Membership
              <select value={tier} onChange={e=>setTier(e.target.value as typeof tier)} aria-label="Filter by thematic exposure tier"
                className="block mt-1 w-full min-h-10 bg-white border border-[#b1ada1]/35 rounded-lg px-2 text-xs">
                <option value="all">Core + adjacent + proxy</option>
                <option value="core">Core only</option>
                <option value="adjacent">Adjacent only</option>
                <option value="proxy">Proxy only</option>
              </select>
            </label>
            <label className="text-[11px] text-[#08090a]/60 font-semibold">
              Leadership
              <select value={state} onChange={e=>setState(e.target.value)} aria-label="Filter stock leadership phase"
                className="block mt-1 w-full min-h-10 bg-white border border-[#b1ada1]/35 rounded-lg px-2 text-xs">
                <option value="all">All observed stocks</option>
                <option value="Emerging">Emerging</option>
                <option value="Established">Established</option>
                <option value="Cooling">Cooling</option>
                <option value="Lagging">Lagging</option>
                <option value="Insufficient data">Missing price history</option>
              </select>
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[780px] w-full text-left text-xs">
            <thead className="bg-[#f4f3ee] text-[#08090a]/60"><tr>
              {['Stock / basic industry','Theme exposure','State','5D return','5D RS','21D RS','RS acceleration'].map(x=>
                <th className="p-3 font-bold" key={x}>{x}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-[#b1ada1]/20">
              {ranked.map(s=>(
                <tr key={s.ticker} className="hover:bg-[#f4f3ee]/70">
                  <td className="p-3">
                    <p className="font-extrabold">{s.ticker}</p>
                    <p className="text-[11px] text-[#08090a]/55 max-w-[240px] truncate">{s.name}</p>
                    <p className="text-[11px] text-[#08090a]/55">{s.industry||'Industry not classified in this browser'}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-bold capitalize">{s.tier}</p>
                    <p className="text-[10px] text-[#08090a]/60">{s.reviewStatus==='provisional'?'Fit requires review':'Editorial rule'}</p>
                  </td>
                  <td className="p-3">
                    <span className={'inline-block whitespace-nowrap border rounded-lg px-2 py-1 text-[11px] font-bold '+stateColors[s.state]}>{s.state}</span>
                  </td>
                  <td className={'p-3 font-mono font-bold '+(s.return5!==null&&s.return5>0?'text-emerald-700':'')}>{fmt(s.return5)}</td>
                  <td className="p-3 font-mono font-bold">{fmt(s.relative5,' pp')}</td>
                  <td className="p-3 font-mono">{fmt(s.relative21,' pp')}</td>
                  <td className="p-3 font-mono font-bold">{fmt(s.acceleration,' pp')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {ranked.length===0&&<p className="p-4 text-sm text-[#08090a]/60">No stock matches this combination of evidence filters.</p>}
        </div>
        <p className="p-4 text-xs text-[#08090a]/60">
          Emerging = positive 5D RS and acceleration after nonpositive 21D RS. Established = positive 5D and 21D RS.
          No daily price or forward return is fabricated for a missing stock.
          Multiple baskets may share a stock. Comparison excludes trading costs and is not a buy recommendation.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-[#b1ada1]/30 p-4 space-y-3">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div>
            <h3 className="font-extrabold text-base flex gap-2 items-center"><Database className="w-4 h-4 text-blue-700"/> Wider universe · industry peers</h3>
            <p className="text-xs text-[#08090a]/65 mt-1">
              Import your full Screener CSV on this device to find <strong>same-basic-industry companies not yet in the selected theme</strong>.
              This is a candidate queue, not automatically verified thematic exposure.
            </p>
          </div>
          {pool&&<button type="button" onClick={()=>{clearScreenerResearchPool();setPool(null);setUploadMessage('Private research pool removed from this browser.');}}
            className="flex items-center gap-1.5 text-xs border border-[#b1ada1]/30 rounded-lg px-3 min-h-10">
            <Trash2 className="w-3.5 h-3.5"/> Remove local copy
          </button>}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <label className="inline-flex gap-2 items-center min-h-11 rounded-xl bg-[#08090a] text-white font-bold text-xs px-4 cursor-pointer">
            <FileUp className="w-4 h-4"/>{pool?'Replace full Screener CSV':'Choose full Screener CSV'}
            <input type="file" accept=".csv,text/csv" onChange={importPool} className="sr-only" aria-label="Import private full Screener industry export"/>
          </label>
          <span className="text-xs text-[#08090a]/70">{pool?pool.companies.length+' NSE industry companies · exported '+pool.extractedAt:'No full-universe candidate pool loaded'}</span>
        </div>
        {uploadMessage&&<p role="status" className="text-xs text-emerald-800">{uploadMessage}</p>}
        {uploadError&&<p role="alert" className="text-xs text-rose-700">{uploadError}</p>}
        {pool&&<>
          <label className="flex gap-2 items-center text-xs text-[#08090a]/70">
            Minimum market cap (export-time ₹ crore)
            <select value={minCap} onChange={e=>setMinCap(Number(e.target.value))}
              className="border border-[#b1ada1]/40 px-2 py-2 rounded-lg bg-white">
              <option value={500}>₹500 cr</option><option value={1000}>₹1,000 cr</option>
              <option value={5000}>₹5,000 cr</option><option value={10000}>₹10,000 cr</option>
            </select>
          </label>
          <p className="text-xs text-[#08090a]/60">
            {peers.length} same-industry NSE peers outside this theme. Market cap is a static Screener-export figure.
            No daily prices are collected for these new candidates until explicitly added to a separately validated price universe.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {peers.slice(0,18).map(p=>(
              <div key={p.ticker} className="bg-[#f4f3ee] border border-[#b1ada1]/20 rounded-xl p-3 text-xs">
                <p className="font-extrabold">{p.ticker} <span className="font-normal text-[#08090a]/50">· ₹{Math.round(p.marketCapCr||0).toLocaleString('en-IN')} cr</span></p>
                <p className="text-[#08090a]/75 mt-1">{p.name}</p>
                <p className="text-[11px] text-blue-800 mt-1">{p.industry}</p>
                <p className="text-[11px] text-amber-800 mt-1">Industry peer only · direct theme relevance unverified</p>
              </div>
            ))}
          </div>
          {peers.length===0&&<p className="text-xs text-[#08090a]/60">
            No new peers match the selected theme's classified core industries and this market-cap threshold.
            A niche theme may require business-segment research across multiple industries rather than broadening by industry label.
          </p>}
        </>}
        <p className="text-[11px] text-[#08090a]/60 flex gap-2 items-start">
          <Info className="w-4 h-4 shrink-0"/>
          Only the reduced NSE-symbol/company/industry/mcap research pool is retained in this browser; nothing is uploaded.
          Screener's Industry classification is not evidence of direct theme revenue, liquidity, fresh market data or investment merit.
          Use only data you're permitted to retain.
        </p>
      </div>
    </section>
  );
}
