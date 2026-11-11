import React, { useEffect, useMemo, useState } from 'react';
import { CheckSquare, ExternalLink, RefreshCw, ShieldCheck, Square, Telescope } from 'lucide-react';
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import type { BasicIndustryAssignment } from '../data/basicIndustryMappings';
import type { BrowserMarketSnapshot } from '../utils/marketSnapshotClient';
import { monitorLeadership } from '../utils/monitoringLeadership';
import {
  discoverCrossThemeIndustryPeers, selectScreenerIndustryPeers, type ScreenerResearchPool,
  type IndustryPeerCandidate,
} from '../utils/screenerResearchPool';
import {
  buildMonitoringIssueUrl, fetchPriceMonitoringManifest,
  MAX_APPROVAL_BATCH, MAX_MONITORED_TICKERS, EMPTY_MONITORING,
  type PriceMonitoringManifest,
} from '../utils/priceMonitoring';

interface Props {
  pool:ScreenerResearchPool;
  themeId:string;
  minCap:number;
  classifications:ReadonlyMap<string,BasicIndustryAssignment>;
  snapshot:BrowserMarketSnapshot|null;
}
const themed=new Set(THEMATIC_SECTOR_INDICES.flatMap(x=>x.stocks.map(s=>s.ticker.toUpperCase())));
export function MonitoringApprovalPanel({pool,themeId,minCap,classifications,snapshot}:Props){
  const [scope,setScope]=useState<'all'|'theme'>('all');
  const [monitoring,setMonitoring]=useState<PriceMonitoringManifest>(EMPTY_MONITORING);
  const [monitorError,setMonitorError]=useState('');
  const [loading,setLoading]=useState(false);
  const [selected,setSelected]=useState<string[]>([]);
  const [offset,setOffset]=useState(0);
  const [search,setSearch]=useState('');
  const [issueError,setIssueError]=useState('');
  const allCandidates=useMemo(()=>discoverCrossThemeIndustryPeers(pool,classifications,minCap),[pool,classifications,minCap]);
  const themeCandidates=useMemo(()=>selectScreenerIndustryPeers(pool,themeId,classifications,minCap),
    [pool,themeId,classifications,minCap]);
  const queued=new Set(monitoring.symbols);
  const eligible=useMemo(()=>(scope==='all'?allCandidates:themeCandidates).filter(c=>
    !themed.has(c.ticker) && !queued.has(c.ticker) &&
    (c.ticker.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase()))),
    [scope,allCandidates,themeCandidates,monitoring.symbols,search]);
  const visible=eligible.slice(offset,offset+30);
  const refresh=async()=>{
    setLoading(true);setMonitorError('');
    try{
      const next=await fetchPriceMonitoringManifest();
      setMonitoring(next);
      setSelected(old=>old.filter(x=>!next.symbols.includes(x)));
    }catch(e){
      setMonitorError(e instanceof Error?e.message:'Could not load public approved-monitoring list');
    }finally{setLoading(false);}
  };
  useEffect(()=>{
    let active=true;
    fetchPriceMonitoringManifest().then(result=>{
      if(active)setMonitoring(result);
    }).catch(err=>{if(active)setMonitorError(String(err));});
    return()=>{active=false;};
  },[]);
  useEffect(()=>{setSelected([]);setOffset(0);},[scope,themeId,minCap,pool,search]);
  const toggle=(ticker:string)=>{
    setSelected(list=>list.includes(ticker)?list.filter(x=>x!==ticker):
      list.length>=MAX_APPROVAL_BATCH?list:[...list,ticker]);
  };
  const selectNextBatch=()=>{
    const capacity=Math.min(MAX_APPROVAL_BATCH,MAX_MONITORED_TICKERS-monitoring.symbols.length);
    setSelected(eligible.slice(offset,offset+capacity).map(c=>c.ticker));
  };
  const submit=()=>{
    setIssueError('');
    try{
      const url=buildMonitoringIssueUrl(selected);
      // Direct click; no browser GitHub access token ever enters the site.
      window.open(url,'_blank','noopener,noreferrer');
    }catch(e){setIssueError(e instanceof Error?e.message:'Could not prepare GitHub approval');}
  };
  const current=monitoring.symbols.map(symbol=>{
    const record=snapshot?.stocks?.[symbol] as {symbol?:string;rawHistory?:unknown[];fetchedAt?:string}|undefined;
    const good=record?.symbol===symbol+'.NS' && Array.isArray(record.rawHistory)&&record.rawHistory.length>=22;
    const fetched=record?.fetchedAt?Date.parse(record.fetchedAt):NaN;
    const collected=snapshot?.fetchedAt?Date.parse(snapshot.fetchedAt):NaN;
    const fresh=good&&Number.isFinite(fetched)&&Number.isFinite(collected)&&
      fetched>=collected-90*60*1000&&fetched<=collected+60*1000;
    return {symbol,good,fresh};
  });
  const ready=current.filter(r=>r.fresh).length;
  const pulses=useMemo(()=>monitorLeadership(snapshot,monitoring.symbols),[snapshot,monitoring.symbols]);
  const companyDetails=useMemo(()=>new Map(pool.companies.map(c=>[c.ticker,c])),[pool]);

  return (
    <section className="mt-4 rounded-xl border border-blue-200 bg-blue-50/40 p-3 sm:p-4 space-y-3" aria-label="Approve NSE stocks for daily price monitoring">
      <div className="flex flex-wrap justify-between gap-2 items-start">
        <div>
          <h4 className="font-extrabold text-sm flex gap-2 items-center"><Telescope className="w-4 h-4 text-blue-700"/> Turn your Screener CSV into daily stock monitoring</h4>
          <p className="text-xs text-[#08090a]/65 mt-1 max-w-2xl">
            We've screened the imported CSV against core-stock industries in the 62 themes.
            Select candidate NSE symbols to monitor. Only ticker codes are sent to a GitHub
            approval issue; your private Screener records remain in this browser.
          </p>
        </div>
        <button type="button" disabled={loading} onClick={refresh}
          className="min-h-10 px-3 border border-[#b1ada1]/40 bg-white rounded-lg flex gap-2 items-center text-xs font-bold">
          <RefreshCw className="w-4 h-4"/> Refresh monitoring status
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {([
          ['Industry-peer prospects',allCandidates.length],
          ['Approved daily monitors',monitoring.symbols.length],
          ['Recently verified closes',ready],
          ['Monitoring capacity left',MAX_MONITORED_TICKERS-monitoring.symbols.length],
        ] as const).map(([label,value])=>(
          <div key={label} className="bg-white border border-[#b1ada1]/20 rounded-lg p-3">
            <p className="text-[11px] text-[#08090a]/60">{label}</p>
            <p className="text-xl font-extrabold font-mono">{value}</p>
          </div>
        ))}
      </div>
      {monitorError&&<p role="alert" className="text-xs text-amber-800">
        Approved-list status unavailable: {monitorError}. You can research candidates, but verify GitHub's public list before resubmitting.
      </p>}
      <div className="flex flex-wrap items-end gap-2">
        <label className="text-xs font-bold text-[#08090a]/70">
          Scope
          <select value={scope} onChange={e=>setScope(e.target.value as 'all'|'theme')}
            className="block mt-1 bg-white border border-[#b1ada1]/35 px-2 min-h-10 rounded-lg text-xs">
            <option value="all">Across all 62 themes</option>
            <option value="theme">Selected theme only</option>
          </select>
        </label>
        <label className="text-xs font-bold text-[#08090a]/70 flex-1 min-w-[180px]">
          Find ticker, name or industry
          <input value={search} onChange={e=>setSearch(e.target.value)}
            className="block w-full mt-1 min-h-10 bg-white border border-[#b1ada1]/35 rounded-lg px-3 text-sm"
            placeholder="Search the imported universe"/>
        </label>
        <button type="button" onClick={selectNextBatch} disabled={!eligible.length||monitoring.symbols.length>=MAX_MONITORED_TICKERS}
          className="bg-white min-h-10 px-3 border border-[#b1ada1]/40 rounded-lg text-xs font-bold flex gap-1.5 items-center">
          <CheckSquare className="w-4 h-4"/> Select up to {MAX_APPROVAL_BATCH}
        </button>
      </div>
      <p className="text-[11px] text-[#08090a]/60">
        {eligible.length} unmonitored candidates match this filter. This is ranked by coverage of the selected industries
        and <strong>static export-time market cap</strong>, not by future stock performance or verified theme relevance.
        Monitoring is for research, not approval to invest or join an index.
      </p>
      <div className="grid sm:grid-cols-2 gap-2">
        {visible.map(candidate=>(
          <label key={candidate.ticker} className={'cursor-pointer rounded-lg border p-3 text-xs flex items-start gap-2 '+
            (selected.includes(candidate.ticker)?'bg-blue-100 border-blue-300':'bg-white border-[#b1ada1]/20')}>
            <input type="checkbox" checked={selected.includes(candidate.ticker)}
              onChange={()=>toggle(candidate.ticker)} disabled={!selected.includes(candidate.ticker)&&selected.length>=MAX_APPROVAL_BATCH}
              className="mt-1 w-4 h-4 accent-blue-700"/>
            <div className="min-w-0">
              <p className="font-extrabold">{candidate.ticker} <span className="font-normal text-[#08090a]/55">· {candidate.name}</span></p>
              <p className="text-[#08090a]/65 mt-1">{candidate.industry} · ₹{Math.round(candidate.marketCapCr||0).toLocaleString('en-IN')} cr at export</p>
              {'associatedThemes' in candidate && Array.isArray(candidate.associatedThemes) &&
                <p className="text-[11px] text-blue-800 mt-1">
                  Possible theme peers: {(candidate.associatedThemes as string[]).slice(0,2).join(', ')}
                </p>}
              <p className="text-[11px] text-amber-800 mt-1">Not yet reviewed for business exposure, trading liquidity or NSE quote identity</p>
            </div>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" disabled={offset===0} onClick={()=>setOffset(Math.max(0,offset-30))}
          className="rounded-lg border bg-white px-3 min-h-9 text-xs disabled:opacity-40">Previous 30</button>
        <span className="text-xs text-[#08090a]/60">{eligible.length?offset+1:0}–{Math.min(offset+30,eligible.length)} of {eligible.length}</span>
        <button type="button" disabled={offset+30>=eligible.length} onClick={()=>setOffset(offset+30)}
          className="rounded-lg border bg-white px-3 min-h-9 text-xs disabled:opacity-40">Next 30</button>
      </div>
      <div className="flex flex-wrap gap-3 items-center rounded-lg bg-white border border-blue-200 p-3">
        <button type="button" onClick={submit} disabled={!selected.length || Boolean(monitorError) ||
          monitoring.symbols.length+selected.length>MAX_MONITORED_TICKERS}
          className="min-h-11 bg-[#08090a] text-white rounded-lg px-4 font-bold text-xs flex gap-2 items-center disabled:opacity-40">
          <ExternalLink className="w-4 h-4"/> Approve {selected.length} ticker(s) on GitHub
        </button>
        <button type="button" onClick={()=>setSelected([])} disabled={!selected.length}
          className="min-h-10 px-3 text-xs underline disabled:opacity-40">Clear selection</button>
        <p className="text-xs text-[#08090a]/65">
          GitHub will open a prefilled issue. <strong>Click Submit new issue there</strong> to authorize monitoring.
          The owner-only workflow updates the list and requests a refresh; this button alone makes no change.
        </p>
      </div>
      {issueError&&<p role="alert" className="text-xs text-rose-700">{issueError}</p>}
      <p className="text-[11px] text-[#08090a]/65 flex gap-2 items-start">
        <ShieldCheck className="w-4 h-4 shrink-0 text-blue-700"/>
        New symbols enter daily Yahoo closing-price collection after the issue is approved by GitHub and the
        manifest update succeeds. Unavailable symbols show as unresolved; <strong>no automatic theme promotion</strong>.
        Monitoring batches are limited to {MAX_APPROVAL_BATCH} and {MAX_MONITORED_TICKERS} total to protect data quality and API limits.
        The GitHub issue and approved NSE codes are public, but your Screener classifications and raw CSV are not.
      </p>

      {monitoring.symbols.length>0&&
        <div className="bg-white rounded-xl border border-[#b1ada1]/25 p-3 sm:p-4 space-y-2">
          <h5 className="font-extrabold text-sm">Emerging stock leaders in the approved monitoring universe</h5>
          <p className="text-xs text-[#08090a]/65">
            Once verified NSE daily histories arrive, these monitored candidates are ranked by
            5D benchmark-relative acceleration versus the preceding 16 sessions. This is a
            price-only research ranking, <strong>not an automatic addition to any theme</strong>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[660px] text-left text-xs">
              <thead className="bg-[#f4f3ee] text-[#08090a]/65">
                <tr>
                  {['Monitored NSE stock','Observed phase','5D return','5D vs NIFTY 500','21D vs NIFTY 500','RS acceleration'].map(label=>
                    <th key={label} className="p-2 font-bold">{label}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b1ada1]/20">
                {pulses.slice(0,30).map(p=>{
                  const company=companyDetails.get(p.ticker);
                  const fmt=(value:number|null)=>value===null?'—':(value>0?'+':'')+value.toFixed(2);
                  return <tr key={p.ticker}>
                    <td className="p-2">
                      <strong>{p.ticker}</strong>
                      {company&&<p className="text-[11px] text-[#08090a]/55">{company.name} · {company.industry}</p>}
                      <p className="text-[10px] text-[#08090a]/50">{p.lastObserved?'Price session '+p.lastObserved:'Awaiting validated NSE close'}</p>
                    </td>
                    <td className="p-2 font-semibold">{p.phase}</td>
                    <td className="p-2 font-mono">{p.return5===null?'—':fmt(p.return5)+'%'}</td>
                    <td className="p-2 font-mono">{p.rs5===null?'—':fmt(p.rs5)+' pp'}</td>
                    <td className="p-2 font-mono">{p.rs21===null?'—':fmt(p.rs21)+' pp'}</td>
                    <td className="p-2 font-mono font-bold">{p.acceleration===null?'—':fmt(p.acceleration)+' pp'}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[#08090a]/60">
            Showing first 30 of {pulses.length} monitored symbols. Price windows require observed closes at matching
            benchmark dates; a missing or quarantined history is not treated as a loser.
          </p>
        </div>}
      {monitoring.symbols.length>0&&
        <details className="text-xs bg-white rounded-lg border border-[#b1ada1]/20 p-3">
          <summary className="cursor-pointer font-bold">Monitored NSE stocks and price status ({current.length})</summary>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-1">
            {current.map(r=><p key={r.symbol} className="rounded-md bg-[#f4f3ee] p-2">
              <strong>{r.symbol}</strong>
              <span className={'block text-[11px] '+(r.fresh?'text-emerald-700':'text-amber-700')}>
                {r.fresh?'Fresh validated history':r.good?'Historical closes; refresh pending':'No valid NSE history yet'}
              </span>
            </p>)}
          </div>
        </details>}
    </section>
  );
}
