import React,{useEffect,useMemo,useState} from 'react';
import {CheckCircle2,ExternalLink,Plus,RefreshCw,ShieldCheck,X} from 'lucide-react';
import {THEMATIC_SECTOR_INDICES,classifySectorMember} from '../data/sectorUniverse';
import type {ThemeRotationPulse} from '../utils/rotationRadar';
import {normalizeMonitorSymbol} from '../utils/priceMonitoring';
import {joinPrivateIndustryAssignments,loadPrivateIndustryEvidence} from '../utils/privateIndustryEvidence';
import {loadScreenerResearchPool} from '../utils/screenerResearchPool';
import {suggestSharedIndustryThemeCandidates} from '../utils/sharedIndustryThemeCandidates';
import type {BrowserMarketSnapshot} from '../utils/marketSnapshotClient';
import {
  buildThemeReviewIssueUrl,mostRecentThemeReview,
  type CompositionAssignment,type CompositionTier,type ThemeReviewBook
} from '../utils/themeCompositionReviews';

interface Props {
  reviews:ThemeReviewBook;
  activeThemeId:string|null;
  activeRadarPulse:ThemeRotationPulse|null;
  onSelectTheme:(themeId:string)=>void;
  refreshReviews:()=>Promise<void>;
  refreshError:string|null;
  marketSnapshot:BrowserMarketSnapshot|null;
}
const roles:CompositionTier[]=['core','adjacent','proxy','excluded'];

export function ThemeCompositionReviewPanel({
  reviews,activeThemeId,activeRadarPulse,onSelectTheme,refreshReviews,refreshError,marketSnapshot
}:Props){
  const firstUnreviewed=THEMATIC_SECTOR_INDICES.find(s=>s.stocks.some(st=>
    classifySectorMember(s.id,st,reviews).reviewStatus==='provisional'));
  const [themeId,setThemeId]=useState(firstUnreviewed?.id||THEMATIC_SECTOR_INDICES[0].id);
  const [draft,setDraft]=useState<CompositionAssignment[]>([]);
  const [note,setNote]=useState('');
  const [tickerInput,setTickerInput]=useState('');
  const [candidateQuery,setCandidateQuery]=useState('');
  const [candidateView,setCandidateView]=useState<'confirmed'|'all'>('confirmed');
  const [privateAssignments]=useState(()=>loadPrivateIndustryEvidence()?.assignments||new Map());
  const [researchPool]=useState(()=>loadScreenerResearchPool());
  const classifications=useMemo(()=>joinPrivateIndustryAssignments(privateAssignments),[privateAssignments]);
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
    setTickerInput('');
    setCandidateQuery('');
    setError('');
  },[theme,reviews]);
  const coreCount=draft.filter(x=>x.tier==='core').length;
  const newMembers=draft.filter(x=>!theme.stocks.some(stock=>stock.ticker===x.ticker));
  const candidates=useMemo(()=>suggestSharedIndustryThemeCandidates(
    theme.id,classifications,marketSnapshot,researchPool,reviews
  ),[theme.id,classifications,marketSnapshot,researchPool,reviews]);
  const filteredCandidates=candidates.filter(x=>
    (candidateView==='all'||x.source==='verified-industry') &&
    !draft.some(row=>row.ticker===x.ticker) &&
    (x.ticker+' '+x.name+' '+x.industry).toLowerCase().includes(candidateQuery.toLowerCase())
  );
  const addCandidates=(tickers:readonly string[])=>{
    const selected=candidates.filter(x=>tickers.includes(x.ticker) &&
      !draft.some(row=>row.ticker===x.ticker));
    if(!selected.length)return;
    if(newMembers.length+selected.length>5){
      setError('One GitHub approval can contain at most five new NSE tickers. Select fewer candidates.');
      return;
    }
    setDraft(rows=>[...rows,...selected.map(x=>({
      ticker:x.ticker,tier:x.suggestedTier
    }))].sort((a,b)=>a.ticker.localeCompare(b.ticker)));
    setError('');
  };
  const addTicker=()=>{
    const input=tickerInput.trim().toUpperCase();
    const ticker=normalizeMonitorSymbol(input.endsWith('.NS')?input.slice(0,-3):input);
    if(!ticker){setError('Enter a valid NSE symbol, such as NETWEB or NETWEB.NS (not BSE or a company name).');return;}
    if(draft.some(x=>x.ticker===ticker)){setError(ticker+' is already in this theme.');return;}
    if(newMembers.length>=5){setError('At most five new NSE tickers can be added in one GitHub approval.');return;}
    setDraft(rows=>[...rows,{ticker:ticker!,tier:'core'}].sort((a,b)=>a.ticker.localeCompare(b.ticker)));
    setTickerInput('');
    setError('');
  };
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
          Confirm current companies, add a new NSE ticker, or change Core, Adjacent, Proxy or Excluded roles.
          GitHub owner approval clears Provisional composition; price history separately determines
          whether the theme is Thin evidence, Still lagging, an Early turn or a Broad leader.
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
        <select value={theme.id} onChange={e=>{
          setThemeId(e.target.value);
          onSelectTheme(e.target.value);
        }}
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
    {activeRadarPulse?.themeId===theme.id&&
      <div role="status" className="rounded-lg border border-[#b1ada1]/30 bg-[#f4f3ee] p-3 text-xs">
        <p><strong>This same theme in Rotation Radar:</strong> {activeRadarPulse.phase==='Thin evidence' && activeRadarPulse.total<5?'Small sample':activeRadarPulse.phase}</p>
        <p className="mt-1 text-[#08090a]/65">
          {activeRadarPulse.membershipReview==='explicit-editorial'?
            'Composition is recognized by the Radar. Its signal depends separately on price quality, relative strength and breadth.':
            prior?'GitHub approval exists but the Radar marks this same theme provisional. This is a classification mismatch, not a missing approval.':
            'Composition not yet explicitly reviewed for Radar signals.'}
        </p>
      </div>}
    {prior&&<p className="text-xs text-[#08090a]/65 flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-700"/>
      Last owner review: {new Date(prior.reviewedAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}
    </p>}
    <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3 space-y-2">
      <label htmlFor="new-composition-nse-ticker" className="block text-xs font-extrabold">Add an NSE ticker to this theme</label>
      <div className="flex flex-wrap gap-2">
        <input id="new-composition-nse-ticker" value={tickerInput}
          onChange={e=>setTickerInput(e.target.value.toUpperCase())}
          onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTicker();}}}
          placeholder="e.g. ICICIAMC" autoCapitalize="characters"
          className="min-w-[150px] flex-1 min-h-10 border border-[#b1ada1]/40 rounded-lg px-3 text-sm uppercase bg-white"/>
        <button type="button" onClick={addTicker} disabled={busy||newMembers.length>=5}
          className="rounded-lg min-h-10 px-3 border border-blue-300 bg-white text-blue-900 font-bold text-xs flex items-center gap-1 disabled:opacity-50">
          <Plus className="w-4 h-4"/> Add ticker
        </button>
      </div>
      <p className="text-[11px] text-[#08090a]/65">
        Add up to five NSE symbols per approval, choose each stock's role below, then approve on GitHub.
        The owner workflow verifies new NSE tickers and automatically requests price tracking.
        An added stock affects Radar only when its price history meets the same rules as other stocks.
      </p>
      {newMembers.length>0&&<p className="text-xs font-semibold text-blue-800">
        Pending approval: {newMembers.map(x=>x.ticker).join(', ')}
      </p>}
    </div>
    <details className="rounded-xl border border-[#b1ada1]/30 bg-white p-3 space-y-2">
      <summary className="cursor-pointer text-xs sm:text-sm font-extrabold">
        Reuse confirmed Sector Rotation stocks for this theme
        <span className="font-normal text-[#08090a]/60"> · {candidates.filter(x=>x.source==='verified-industry').length} confirmed industry matches · {candidates.length} total suggestions</span>
      </summary>
      <p className="mt-2 text-xs text-[#08090a]/65">
        Matches the confirmed basic industry of an existing Core company.
        A matching industry does not establish a company's thematic business exposure.
        Suggestions default to <strong>Adjacent</strong>; change a role to Core only after verifying its business fit.
        No stock is added or approved automatically.
      </p>
      <div className="mt-2 flex flex-wrap items-end gap-2">
        <label className="flex-1 min-w-[160px] text-xs font-semibold">
          Search confirmed candidates
          <input value={candidateQuery} onChange={e=>setCandidateQuery(e.target.value)}
            placeholder="Search NSE symbol, company or industry"
            className="block mt-1 w-full min-h-10 px-3 rounded-lg border border-[#b1ada1]/35 text-xs"/>
        </label>
        <label className="text-xs font-semibold">
          Candidate source
          <select value={candidateView} onChange={e=>setCandidateView(e.target.value as 'confirmed'|'all')}
            className="block mt-1 min-h-10 rounded-lg border border-[#b1ada1]/35 px-2 text-xs">
            <option value="confirmed">Confirmed industry mappings</option>
            <option value="all">Include browser-local Screener peers</option>
          </select>
        </label>
        <button type="button" disabled={!filteredCandidates.length||newMembers.length>=5}
          onClick={()=>addCandidates(filteredCandidates.slice(0,Math.max(0,5-newMembers.length)).map(x=>x.ticker))}
          className="min-h-10 px-3 rounded-lg border border-blue-300 text-blue-900 font-bold text-xs disabled:opacity-40">
          Add up to {Math.max(0,5-newMembers.length)} suggestions
        </button>
      </div>
      <div className="mt-2 max-h-64 overflow-y-auto space-y-1.5">
        {filteredCandidates.slice(0,40).map(x=>(
          <div key={x.ticker} className="rounded-lg border border-[#b1ada1]/20 p-2 flex flex-wrap gap-2 items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-extrabold">{x.ticker}
                <span className="font-normal text-[#08090a]/65"> · {x.name}</span>
              </p>
              <p className="text-[11px] text-[#08090a]/60">{x.industry} · {x.sourceLabel}
                {x.hasSavedPrices?' · Saved prices available':' · Price sync required'}
                {x.otherThemes.length?' · Already tracked in '+x.otherThemes.slice(0,2).join(', '):''}
              </p>
              {x.provenance&&<a href={x.provenance} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-blue-700 underline">Industry classification source</a>}
            </div>
            <button type="button" onClick={()=>addCandidates([x.ticker])} disabled={newMembers.length>=5||busy}
              className="rounded-lg border border-blue-300 min-h-9 px-3 font-bold text-xs text-blue-800 disabled:opacity-40">
              Add · Adjacent
            </button>
          </div>
        ))}
        {filteredCandidates.length>40&&<p className="text-xs text-[#08090a]/55">
          Showing first 40 of {filteredCandidates.length} suggestions. Search to narrow the list.
        </p>}
        {!filteredCandidates.length&&<p className="text-xs text-[#08090a]/55 py-3">
          No matching unselected stocks. Verify industry mappings under Basic Industries, or add an NSE ticker manually above.
        </p>}
      </div>
      <p className="text-[11px] text-[#08090a]/55">
        Already monitored stocks reuse the same saved market prices. New approved NSE symbols enter
        the existing collection workflow. A new composition is committed only after you submit the owner-only GitHub issue.
      </p>
    </details>
    <div className="grid sm:grid-cols-2 gap-2">
      {draft.map(member=>{
        const stock=theme.stocks.find(x=>x.ticker===member.ticker);
        const isNew=!stock;
        return <div key={member.ticker}
          className={'rounded-lg border px-3 py-2 flex flex-wrap justify-between items-center gap-2 '+(isNew?'border-blue-300 bg-blue-50/30':'border-[#b1ada1]/25')}>
          <span className="min-w-0">
            <strong className="text-xs">{member.ticker}</strong>
            <span className="block text-[11px] text-[#08090a]/60">
              {stock?.name||candidates.find(x=>x.ticker===member.ticker)?.name||
                'New NSE symbol · pending owner and price verification'}
            </span>
          </span>
          <div className="flex gap-2 items-center">
            <select aria-label={'Role for '+member.ticker} value={member.tier}
              onChange={e=>setDraft(rows=>rows.map(row=>row.ticker===member.ticker?
                {...row,tier:e.target.value as CompositionTier}:row))}
              className="min-h-9 rounded-lg border border-[#b1ada1]/40 bg-white px-2 text-xs font-semibold">
              {roles.map(role=><option key={role} value={role}>
                {role==='core'?'Core':role==='adjacent'?'Adjacent':role==='proxy'?'Proxy':'Excluded'}
              </option>)}
            </select>
            {isNew&&<button type="button" aria-label={'Remove new ticker '+member.ticker}
              onClick={()=>setDraft(rows=>rows.filter(row=>row.ticker!==member.ticker))}
              className="min-h-9 min-w-9 rounded-lg border border-[#b1ada1]/30 flex items-center justify-center">
              <X className="w-4 h-4"/>
            </button>}
          </div>
        </div>;
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
        Opens a prefilled GitHub issue. New NSE symbols are saved to the permanent theme roster and tracked in the next automatic market collection. Sign in as repository owner and click
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
