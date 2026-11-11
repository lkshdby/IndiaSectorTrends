import React,{useEffect,useMemo,useState} from 'react';
import {CheckCircle2,ExternalLink,RefreshCw,ShieldCheck} from 'lucide-react';
import {THEMATIC_SECTOR_INDICES,classifySectorMember} from '../data/sectorUniverse';
import {
  buildThemeReviewIssueUrl,mostRecentThemeReview,
  type CompositionAssignment,type CompositionTier,type ThemeReviewBook
} from '../utils/themeCompositionReviews';

interface Props {
  reviews:ThemeReviewBook;
  activeThemeId:string|null;
  refreshReviews:()=>Promise<void>;
  refreshError:string|null;
}
const roles:CompositionTier[]=['core','adjacent','proxy','excluded'];

export function ThemeCompositionReviewPanel({reviews,activeThemeId,refreshReviews,refreshError}:Props){
  const firstUnreviewed=THEMATIC_SECTOR_INDICES.find(s=>s.stocks.some(st=>
    classifySectorMember(s.id,st,reviews).reviewStatus==='provisional'));
  const [themeId,setThemeId]=useState(firstUnreviewed?.id||THEMATIC_SECTOR_INDICES[0].id);
  const [draft,setDraft]=useState<CompositionAssignment[]>([]);
  const [note,setNote]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  useEffect(()=>{if(activeThemeId)setThemeId(activeThemeId);},[activeThemeId]);
  const theme=THEMATIC_SECTOR_INDICES.find(s=>s.id===themeId)||THEMATIC_SECTOR_INDICES[0];
  const prior=useMemo(()=>mostRecentThemeReview(reviews,theme.id,theme.stocks.map(s=>s.ticker)),
    [reviews,theme]);
  useEffect(()=>{
    setDraft(theme.stocks.map(stock=>({
      ticker:stock.ticker,tier:classifySectorMember(theme.id,stock,reviews).tier
    })).sort((a,b)=>a.ticker.localeCompare(b.ticker)));
    setNote('');
    setError('');
  },[theme,reviews]);
  const coreCount=draft.filter(x=>x.tier==='core').length;
  const identical=!!prior&&prior.assignments.length===draft.length&&
    prior.assignments.every((a,i)=>a.ticker===draft[i]?.ticker&&a.tier===draft[i]?.tier);
  const reviewed=theme.stocks.every(stock=>
    classifySectorMember(theme.id,stock,reviews).reviewStatus==='reviewed-theme-fit');
  const approve=()=>{
    try{
      if(coreCount<1)throw new Error('At least one core member is required');
      window.open(buildThemeReviewIssueUrl(theme.id,draft,note),'_blank','noopener,noreferrer');
    }catch(err){setError(err instanceof Error?err.message:String(err));}
  };
  const refresh=async()=>{setBusy(true);try{await refreshReviews();}finally{setBusy(false);}};
  return <section aria-label="Review thematic composition"
    className="rounded-2xl border border-[#b1ada1]/30 bg-white p-4 sm:p-5 space-y-3">
    <div className="flex flex-wrap justify-between gap-3 items-start">
      <div>
        <h3 className="text-base font-extrabold flex gap-2 items-center">
          <ShieldCheck className="w-5 h-5 text-blue-700"/> Review theme composition
        </h3>
        <p className="text-xs text-[#08090a]/65 mt-1 max-w-2xl">
          Confirm current companies as-is, or change their Core, Adjacent, Proxy or Excluded roles.
          GitHub owner approval removes Provisional composition if price-history quality is sufficient.
        </p>
      </div>
      <button type="button" disabled={busy} onClick={refresh}
        className="rounded-lg border bg-white px-3 min-h-10 text-xs font-bold flex items-center gap-2">
        <RefreshCw className="w-4 h-4"/> Refresh approved reviews
      </button>
    </div>
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <label className="text-xs font-bold">
        Theme
        <select value={theme.id} onChange={e=>setThemeId(e.target.value)}
          className="block w-full mt-1 min-h-11 rounded-lg border border-[#b1ada1]/35 px-3 text-sm bg-white">
          {THEMATIC_SECTOR_INDICES.map(s=><option value={s.id} key={s.id}>{s.name}</option>)}
        </select>
      </label>
      <span className={'text-xs font-bold rounded-lg border px-3 py-2 '+(reviewed?
        'text-emerald-800 bg-emerald-50 border-emerald-200':
        'text-amber-800 bg-amber-50 border-amber-200')}>
        {prior?'Owner-approved · GitHub #'+prior.githubIssue:reviewed?'Existing editorial review':'Provisional composition'}
      </span>
    </div>
    {prior&&<p className="text-xs text-[#08090a]/65 flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-700"/>
      Last owner review: {new Date(prior.reviewedAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}
    </p>}
    <div className="grid sm:grid-cols-2 gap-2">
      {theme.stocks.map(stock=>{
        const selected=draft.find(x=>x.ticker===stock.ticker)?.tier||'core';
        return <label key={stock.ticker}
          className="rounded-lg border border-[#b1ada1]/25 px-3 py-2 flex flex-wrap justify-between items-center gap-2">
          <span className="min-w-0">
            <strong className="text-xs">{stock.ticker}</strong>
            <span className="block text-[11px] text-[#08090a]/60">{stock.name}</span>
          </span>
          <select aria-label={'Role for '+stock.ticker} value={selected}
            onChange={e=>setDraft(rows=>rows.map(row=>row.ticker===stock.ticker?
              {...row,tier:e.target.value as CompositionTier}:row))}
            className="min-h-9 rounded-lg border border-[#b1ada1]/40 bg-white px-2 text-xs font-semibold">
            {roles.map(role=><option key={role} value={role}>
              {role==='core'?'Core':role==='adjacent'?'Adjacent':role==='proxy'?'Proxy':'Excluded'}
            </option>)}
          </select>
        </label>;
      })}
    </div>
    <p className="text-xs text-[#08090a]/65">
      {coreCount} core · {draft.filter(x=>x.tier==='adjacent').length} adjacent ·
      {draft.filter(x=>x.tier==='proxy').length} proxy ·
      {draft.filter(x=>x.tier==='excluded').length} excluded
    </p>
    <label className="block text-xs font-bold">
      Optional review note
      <textarea value={note} maxLength={280} rows={2} onChange={e=>setNote(e.target.value)}
        placeholder="Why does the composition fit this theme?"
        className="block mt-1 w-full rounded-lg border border-[#b1ada1]/40 px-3 py-2 text-xs"/>
    </label>
    <div className="flex flex-wrap gap-3 items-center">
      <button type="button" onClick={approve}
        disabled={coreCount<1||busy||!!refreshError||identical}
        className="bg-[#08090a] text-white rounded-lg min-h-11 px-4 text-xs font-bold disabled:opacity-40 flex gap-2 items-center">
        <ExternalLink className="w-4 h-4"/>
        {identical?'Already owner-approved':'Approve composition on GitHub'}
      </button>
      <p className="text-[11px] text-[#08090a]/65 max-w-lg">
        Opens a prefilled GitHub issue. Sign in as repository owner and click
        <strong> Submit new issue</strong>. An owner-only workflow validates every ticker,
        commits a dated review and comments on the issue. Then refresh the status here.
      </p>
    </div>
    {error&&<p role="alert" className="text-xs text-rose-800">{error}</p>}
    {refreshError&&<p role="alert" className="text-xs text-amber-800">
      Review audit unavailable: {refreshError}. Approval disabled to prevent stale submissions.
    </p>}
    <p className="text-[11px] text-[#08090a]/55">
      Editorial classification does not independently verify revenue exposure.
      Previous point-in-time alerts remain frozen. A changed basket roster invalidates its older review.
      Updated core roles affect Rotation Radar after refreshing; other precompiled thematic screens
      pick them up in their next ordinary code deployment.
    </p>
  </section>;
}
