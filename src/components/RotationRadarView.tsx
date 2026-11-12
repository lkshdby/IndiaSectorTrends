import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Activity, Compass, Info, Layers3, ShieldCheck, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { computeRotationRadar, type RotationPhase, type ThemeRotationPulse } from '../utils/rotationRadar';
import { ThemeCompositionReviewPanel } from './ThemeCompositionReviewPanel';
import { fetchThemeReviews, loadRememberedThemeReviews, mergeThemeReviewBooks, rememberThemeReviews, type ThemeReviewBook } from '../utils/themeCompositionReviews';
import { fetchRotationDiary, summarizeRadarDiary, type RadarDiary } from '../utils/rotationDiary';
import { joinPrivateIndustryAssignments, loadPrivateIndustryEvidence } from '../utils/privateIndustryEvidence';
import type { BrowserMarketSnapshot } from '../utils/marketSnapshotClient';

interface Props {
  marketSnapshot: BrowserMarketSnapshot | null;
  onOpenThemes: () => void;
  onOpenIndustries: () => void;
}
const PHASE_STYLE: Record<RotationPhase, string> = {
  'Early turn':'text-blue-900 bg-blue-50 border-blue-200',
  'Broad leader':'text-emerald-900 bg-emerald-50 border-emerald-200',
  'Losing steam':'text-amber-900 bg-amber-50 border-amber-200',
  'Still lagging':'text-slate-700 bg-slate-50 border-slate-200',
  'Thin evidence':'text-[#08090a]/55 bg-[#f4f3ee] border-[#b1ada1]/35',
  'Provisional composition':'text-amber-900 bg-amber-50 border-amber-300',
};
function num(n: number | null, unit = '%') {
  return n === null ? '—' : (n > 0 ? '+' : '') + n.toFixed(2) + unit;
}
function tone(n: number | null): string {
  return n === null ? 'text-slate-500' : n > 0 ? 'text-emerald-700' : n < 0 ? 'text-rose-700' : 'text-slate-600';
}
function evidenceLabel(p: ThemeRotationPulse): string {
  if (p.phase === 'Thin evidence' && p.total < 5) return 'Small sample';
  if (p.phase === 'Thin evidence' && p.missingPriceDetails.length > 0) return 'Price-data gap';
  return p.phase;
}
function stageExplain(p: ThemeRotationPulse): string {
  if (p.phase === 'Early turn') return 'Underperformed over 21 sessions, but the latest week beat NIFTY 500 with accelerating relative returns and broader participation';
  if (p.phase === 'Broad leader') return 'Outperformed over both five and 21 sessions with more than half the tracked constituents beating the benchmark';
  if (p.phase === 'Losing steam') return 'Previously ahead, but short-term relative strength, acceleration or breadth has deteriorated';
  if (p.phase === 'Thin evidence') {
    if (p.total < 5 && p.validCount === p.total)
      return 'All core stocks have matching price histories, but the basket contains fewer than five companies. This is a small-sample limitation, not a Yahoo collection problem. Watchlist only; the ranking is not eligible for rotation alerts.';
    if (p.total < 5)
      return 'The basket contains fewer than five core companies and some have missing price dates. Watchlist only; not eligible for rotation alerts.';
    return 'Some core constituents lack matching observed price histories, leaving fewer than five valid companies or less than 75% coverage. This is a market-data limitation, not a composition approval issue.';
  }
  if (p.phase === 'Provisional composition') return 'Theme core membership is provisionally assigned without an explicit membership rule. Watchlist only; not eligible for rotation alerts until editorial membership review.';
  return 'Does not satisfy our predeclared broad-leadership or early-turn criteria';
}

export function RotationRadarView({ marketSnapshot, onOpenThemes, onOpenIndustries }: Props) {
  // The user has already imported 313 Screener classifications on this browser.
  // Read only private browser state, never add source records to a public build.
  const [privateAssignments] = useState(() => loadPrivateIndustryEvidence()?.assignments || new Map());
  const classifications = useMemo(() => joinPrivateIndustryAssignments(privateAssignments), [privateAssignments]);
  // Start from approvals embedded in the current build plus the last successful
  // browser verification. Never display an empty provisional universe simply
  // because GitHub's public raw endpoint is temporarily inaccessible.
  const [themeReviews,setThemeReviews] = useState<ThemeReviewBook>(()=>loadRememberedThemeReviews());
  const [themeReviewError,setThemeReviewError] = useState<string|null>(null);
  const [themeReviewStatus,setThemeReviewStatus] = useState<'checking'|'verified'|'cached'>('checking');
  const refreshThemeReviews = async () => {
    setThemeReviewStatus('checking');
    try{
      const fresh=await fetchThemeReviews();
      setThemeReviews(prev=>mergeThemeReviewBooks(prev,fresh));
      setThemeReviewError(null);
      setThemeReviewStatus('verified');
    }catch(err){
      // Keep existing successfully validated editorial decisions, including
      // when a new session starts without network connectivity.
      setThemeReviewError(err instanceof Error?err.message:String(err));
      setThemeReviewStatus('cached');
    }
  };
  useEffect(()=>{void refreshThemeReviews();},[]);
  useEffect(()=>{rememberThemeReviews(themeReviews);},[themeReviews]);
  const radar = useMemo(() => computeRotationRadar(marketSnapshot, classifications,themeReviews),
    [marketSnapshot, classifications,themeReviews]);
  const [focus, setFocus] = useState<'early'|'leaders'|'cooling'|'all'>('early');
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');
  const [diary, setDiary] = useState<RadarDiary | null>(null);
  const [diaryError, setDiaryError] = useState<string | null>(null);
  useEffect(() => {
    let active=true;
    fetchRotationDiary()
      .then(result=>{if(active){setDiary(result);setDiaryError(null);}})
      .catch(error=>{if(active)setDiaryError(error instanceof Error ? error.message : 'Unavailable');});
    return ()=>{active=false;};
  }, []);
  const liveStudy = useMemo(()=>diary ? summarizeRadarDiary(diary) : null,[diary]);
  const display = useMemo(() => {
    const rows = focus === 'early' ? radar.earlyTurns :
      focus === 'leaders' ? radar.broadLeaders :
        focus === 'cooling' ? radar.losingSteam : radar.allThemes;
    return rows.filter(p => (p.themeName + ' ' + p.category).toLowerCase().includes(search.toLowerCase()));
  }, [radar, focus, search]);
  const active = radar.allThemes.find(p=>p.themeId===selectedId) || display[0] || null;
  // The review selector and Radar must refer to the SAME theme.
  const selectThemeForReview=(themeId:string)=>{
    setFocus('all');
    setSearch('');
    setSelectedId(themeId);
  };
  const check = radar.forwardCheck;
  const smallSampleThemes = radar.allThemes.filter(p => p.phase === 'Thin evidence' && p.total < 5).length;
  const priceLimitedThemes = radar.allThemes.filter(p => p.phase === 'Thin evidence' && p.total >= 5).length;

  return (
    <section className="space-y-4 text-[#08090a]" aria-label="Emerging thematic rotation radar">
      <header className="bg-white border border-[#b1ada1]/30 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-extrabold text-blue-700">Research lab · early rotation</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold flex gap-2 items-center">
              <Compass className="w-6 h-6 text-blue-600"/> Rotation Radar
            </h2>
            <p className="text-sm text-[#08090a]/65 mt-1 max-w-3xl">
              Not another market heatmap. Detect shifts in the <strong>62 custom investment themes</strong>,
              confirm stock participation, and identify which constituent companies and basic industries are driving the turn.
            </p>
          </div>
          <div className="text-xs font-semibold rounded-xl px-3 py-2 border border-[#b1ada1]/30 bg-[#f4f3ee]">
            {radar.asOf ? 'Last observed trading close: ' + radar.asOf : 'Waiting for validated price histories'}
          </div>
        </div>
        <div role="status" aria-live="polite"
          className={'mt-4 rounded-lg border px-3 py-2 text-xs '+(themeReviewStatus==='cached'?
            'border-amber-300 bg-amber-50 text-amber-900':
            'border-[#b1ada1]/30 bg-[#f4f3ee] text-[#08090a]/70')}>
          <strong>Theme approvals:</strong>{' '}
          {themeReviews.reviews.length} saved GitHub review records.
          {themeReviewStatus==='verified'?' Latest public GitHub audit checked.':
            themeReviewStatus==='checking'?' Checking the latest GitHub audit…':
            ' Live check unavailable; using the latest approved records saved in the build or this browser.'}
          {themeReviewError&&<span className="block mt-1">
            The saved approvals are retained. Open Review theme composition below to retry.
          </span>}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 mt-5">
          {[
            ['Early-turn candidates',radar.earlyTurns.length,'Relative strength just improving'],
            ['Broad leaders',radar.broadLeaders.length,'Confirmed over 5D and 21D'],
            ['Losing steam',radar.losingSteam.length,'Prior leadership now fading'],
            ['Eligible reviewed samples',radar.evaluatedThemes + ' / ' + radar.coreThemes,'Explicit editorial theme fit · ≥5 stocks · ≥75% data'],
          ].map(([label,value,note]) => (
            <div key={label} className="rounded-xl bg-[#f4f3ee] border border-[#b1ada1]/20 px-3.5 py-3">
              <p className="text-xs text-[#08090a]/65 font-semibold">{label}</p>
              <p className="text-2xl font-extrabold font-mono mt-1">{value}</p>
              <p className="text-[11px] text-[#08090a]/55 mt-1">{note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4 text-[#08090a]/60">
          Rotation here means <strong>relative price-strength change</strong>, not observed institutional money flows.
          {' '}Ineligible themes: <strong>{smallSampleThemes}</strong> small samples (under five core stocks),
          <strong> {priceLimitedThemes}</strong> with insufficient matching price histories,
          and <strong>{radar.provisionalThemes}</strong> provisional compositions awaiting editorial review.
          All remain visible for research but cannot trigger Early turn alerts.
          Our data covers the curated stock universe, <strong>not all companies in the Screener export</strong>.
          {privateAssignments.size ? ' Private industry classifications active on this browser: ' + privateAssignments.size + '.' :
            ' Import your private Screener classifications in Basic industries to label the industry drivers.'}
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,1fr)] gap-4 items-start">
        <div className="bg-white border border-[#b1ada1]/30 rounded-2xl overflow-hidden">
          <div className="p-4 space-y-3 border-b border-[#b1ada1]/25">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600"/>
              <h3 className="text-base font-extrabold">Where leadership is shifting</h3>
            </div>
            <div className="flex gap-1.5 overflow-x-auto">
              {([
                ['early','Early turns',radar.earlyTurns.length],
                ['leaders','Leaders',radar.broadLeaders.length],
                ['cooling','Cooling',radar.losingSteam.length],
                ['all','All themes',radar.allThemes.length],
              ] as const).map(([id,label,count]) => (
                <button key={id} type="button" onClick={()=>{setFocus(id);setSelectedId('');}}
                  aria-pressed={focus===id}
                  className={focus===id ?
                    'min-h-10 rounded-lg bg-[#08090a] text-white px-3 text-xs font-bold whitespace-nowrap' :
                    'min-h-10 rounded-lg border border-[#b1ada1]/40 bg-white px-3 text-xs font-bold whitespace-nowrap'}>
                  {label} <span className="opacity-70 ml-1">{count}</span>
                </button>
              ))}
            </div>
            <input aria-label="Search rotation themes" value={search} onChange={e=>{setSearch(e.target.value);setSelectedId('');}}
              className="w-full min-h-10 rounded-xl border border-[#b1ada1]/30 px-3 text-sm"
              placeholder="Search any investment theme…"/>
            <p className="text-[11px] text-[#08090a]/55">
              Ranked by 5D excess-return acceleration versus the preceding 16D pace; thin samples cannot qualify.
            </p>
          </div>
          <div className="max-h-[660px] overflow-y-auto divide-y divide-[#b1ada1]/20">
            {display.length===0 && (
              <p className="p-5 text-sm text-[#08090a]/65">
                {focus==='early' ? 'No theme satisfies every early-turn confirmation rule on this snapshot. Check leaders or all themes; absence of a signal is a valid result.' :
                  'No themes match this filter.'}
              </p>
            )}
            {display.map(p=>(
              <button key={p.themeId} type="button" onClick={()=>setSelectedId(p.themeId)}
                aria-pressed={active?.themeId===p.themeId}
                className={active?.themeId===p.themeId ?
                  'w-full text-left p-3.5 bg-blue-50 border-l-4 border-blue-600 hover:bg-blue-50' :
                  'w-full text-left p-3.5 hover:bg-[#f4f3ee] border-l-4 border-transparent'}>
                <div className="flex gap-2 items-start justify-between">
                  <div className="min-w-0">
                    <p className="font-bold text-sm">{p.themeName}</p>
                    <p className="text-[11px] text-[#08090a]/55 mt-0.5">{p.category} · {p.validCount}/{p.total} stocks</p>
                  </div>
                  <span className={'text-[10px] font-bold border px-2 py-1 rounded-lg shrink-0 ' + PHASE_STYLE[p.phase]}>{evidenceLabel(p)}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-3 text-center">
                  <div className="bg-white/75 rounded-lg p-2">
                    <p className="text-[10px] text-[#08090a]/60">RS acceleration</p>
                    <p className={'text-sm font-mono font-extrabold '+tone(p.rsAcceleration)}>{num(p.rsAcceleration,' pp')}</p>
                  </div>
                  <div className="bg-white/75 rounded-lg p-2">
                    <p className="text-[10px] text-[#08090a]/60">5D vs NIFTY</p>
                    <p className={'text-sm font-mono font-extrabold '+tone(p.rs5)}>{num(p.rs5,' pp')}</p>
                  </div>
                  <div className="bg-white/75 rounded-lg p-2">
                    <p className="text-[10px] text-[#08090a]/60">Rising stocks</p>
                    <p className="text-sm font-mono font-extrabold">{p.advancingPct5.toFixed(0)}%</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="bg-white border border-[#b1ada1]/30 rounded-2xl p-4 sm:p-5 xl:sticky xl:top-16 space-y-4">
          {active ? (
            <>
              <div>
                <p className="text-xs uppercase text-blue-700 font-extrabold tracking-wide">Theme investigation</p>
                <h3 className="text-lg font-extrabold mt-1">{active.themeName}</h3>
                <span className={'inline-block mt-2 text-xs font-bold border rounded-lg px-2 py-1 '+PHASE_STYLE[active.phase]}>{evidenceLabel(active)}</span>
                <p className="text-xs text-[#08090a]/65 mt-2 leading-relaxed">{stageExplain(active)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  ['5-session return', num(active.return5),active.return5],
                  ['21-session return', num(active.return21),active.return21],
                  ['21D RS vs NIFTY 500',num(active.rs21,' pp'),active.rs21],
                  ['5D RS acceleration',num(active.rsAcceleration,' pp'),active.rsAcceleration],
                  ['Breadth vs prior 16D',num(active.breadthChange,' pp'),active.breadthChange],
                  ['5D stocks beating NIFTY',active.outperformingPct5.toFixed(0)+'%',active.outperformingPct5-50],
                ] as const).map(([label,value,signal]) => (
                  <div key={label} className="rounded-xl border border-[#b1ada1]/20 bg-[#f4f3ee] p-2.5">
                    <p className="text-[11px] text-[#08090a]/60">{label}</p>
                    <p className={'font-mono text-base font-extrabold mt-1 '+tone(signal)}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-[#f4f3ee] border border-[#b1ada1]/25 p-3 text-xs">
                <p className="font-bold flex gap-1.5 items-center"><ShieldCheck className="w-4 h-4"/> Evidence quality</p>
                <p className="mt-1 text-[#08090a]/70">{active.validCount} of {active.total} core companies had matching observed prices at all required dates; {active.coveragePct}% coverage.
                  {active.membershipReview === 'provisional' ? ' Core thematic membership is provisional; not eligible for rotation alert even if price coverage is strong.' :
                    active.total<5 && active.validCount===active.total ? ' All constituent price histories are available; the only limiting factor is the minimum five-company sample rule.' :
                    active.validCount<5 || active.coveragePct<75 ? ' Not eligible for early-turn classification because of insufficient matching price data or sample size.' : ' Meets sampling and explicit editorial-membership thresholds (business revenue exposure still requires verification).'}
                </p>
                {active.missingPriceDetails.length>0&&(
                  <div className="mt-2">
                    <p className="font-semibold text-amber-900">Missing observed trading dates (not failed approvals):</p>
                    <ul className="mt-1 space-y-1 list-disc pl-4 text-[#08090a]/75">
                      {active.missingPriceDetails.map(detail=><li key={detail}>{detail}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-sm font-extrabold mb-2">Stocks driving this week's move</h4>
                <div className="space-y-1.5">
                  {active.stockDrivers.slice(0,5).map(stock=>(
                    <div key={stock.ticker} className="flex gap-2 items-center justify-between text-xs border border-[#b1ada1]/25 rounded-lg p-2">
                      <div className="min-w-0">
                        <p className="font-bold">{stock.ticker}</p>
                        <p className="text-[11px] text-[#08090a]/55 truncate">{stock.basicIndustry}</p>
                      </div>
                      <span className={'font-mono font-bold shrink-0 '+tone(stock.relative5)}>{num(stock.relative5,' pp vs NIFTY')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-extrabold mb-2 flex items-center gap-1.5"><Layers3 className="w-4 h-4"/> Which basic industries participate?</h4>
                <div className="space-y-1.5">
                  {active.industryDrivers.slice(0,6).map(group=>(
                    <div key={group.name} className="flex gap-2 items-center justify-between text-xs bg-[#f4f3ee] rounded-lg p-2">
                      <div className="min-w-0">
                        <p className="font-bold">{group.name}</p>
                        <p className="text-[#08090a]/55">{group.companies} stock(s) · {group.aboveBenchmark} beating NIFTY</p>
                      </div>
                      <span className={'font-mono font-bold shrink-0 '+tone(group.averageReturn5)}>{num(group.averageReturn5)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={onOpenThemes}
                className="w-full min-h-10 flex items-center justify-center gap-2 border rounded-lg text-sm font-bold hover:bg-[#f4f3ee]">
                <Activity className="w-4 h-4"/> Explore complete theme chart
              </button>
            </>
          ):(
            <p className="text-sm text-[#08090a]/60">Load the validated market snapshot and select a theme to see the contributing companies and industries.</p>
          )}
        </aside>
      </div>

      <ThemeCompositionReviewPanel reviews={themeReviews} activeThemeId={active?.themeId||null}
        activeRadarPulse={active} onSelectTheme={selectThemeForReview}
        refreshReviews={refreshThemeReviews} refreshError={themeReviewError}/>

      <section className="rounded-2xl bg-white border border-[#b1ada1]/30 p-4 sm:p-5 space-y-3">
        <h3 className="text-base font-extrabold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700"/> Prospective forward diary · real alerts as recorded
        </h3>
        <p className="text-xs text-[#08090a]/70">
          Each accepted market snapshot freezes the day's eligible theme labels and exact constituent tickers.
          Five trading sessions later, the collector attaches their observed returns relative to NIFTY 500.
          Historical signals are never recreated using future theme selections.
        </p>
        {liveStudy ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {([
              ['Trading dates recorded',String(liveStudy.observedDates)],
              ['Matured early-turn events',String(liveStudy.earlyMatured)],
              ['Early-turn next-5D hit rate',liveStudy.earlyHitRate===null?'Awaiting results':liveStudy.earlyHitRate.toFixed(1)+'%'],
              ['Mean next-5D excess',num(liveStudy.earlyMeanExcess,' pp')],
            ] as const).map(([label,value])=>(
              <div key={label} className="bg-[#f4f3ee] border border-[#b1ada1]/20 rounded-xl p-3">
                <p className="text-[11px] text-[#08090a]/60">{label}</p>
                <p className="font-extrabold text-lg font-mono mt-1">{value}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-[#08090a]/60">{diaryError ?
          'Point-in-time diary unavailable: '+diaryError :
          'Reading the first point-in-time observations…'}</p>}
        <p className="text-xs text-[#92400e]">
          {liveStudy && liveStudy.totalMatured>0 ?
            'Comparison across '+liveStudy.totalMatured+' matured eligible theme events: baseline mean excess '+num(liveStudy.baselineMeanExcess,' pp')+
              ', hit rate '+(liveStudy.baselineHitRate===null?'—':liveStudy.baselineHitRate.toFixed(1)+'%')+'.' :
            'Results appear only after enough new daily snapshots have accumulated. We do not backfill fictional alerts.'}
          {' '}Too few observed dates, correlated themes and missing execution costs still preclude claims of a proven trading advantage.
        </p>
      </section>

      <section className="rounded-2xl bg-white border border-[#b1ada1]/30 p-4 sm:p-5 space-y-3">
        <h3 className="font-extrabold text-base flex items-center gap-2"><Info className="w-4 h-4 text-blue-600"/> Does the early-turn rule work? Historical sanity check</h3>
        <p className="text-xs text-[#08090a]/70 leading-relaxed">
          At every fifth historical close, the same predefined early-turn rule evaluates only preceding prices.
          We then check the following five trading sessions versus NIFTY 500, compared with all eligible theme observations.
          This is an **exploratory, look-ahead-separated calculation**, not a valid out-of-sample backtest.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {([
            ['Early-turn events',String(check.signalEvents),'Across '+check.distinctSignalThemes+' themes'],
            ['Next-5D hit rate',check.signalHitPct===null?'Not enough data':check.signalHitPct.toFixed(0)+'%','Positive excess over NIFTY 500'],
            ['Mean next-5D excess',num(check.signalAvgExcess5,' pp'),'Of early-turn events'],
            ['Eligible-event baseline',num(check.baselineAvgExcess5,' pp'),'Mean next-5D excess across '+check.evaluatedThemes+' theme observations'],
          ] as const).map(([label,value,note])=>(
            <div key={label} className="bg-[#f4f3ee] border border-[#b1ada1]/20 rounded-xl p-3">
              <p className="text-[11px] text-[#08090a]/60">{label}</p>
              <p className="font-extrabold text-lg font-mono mt-1">{value}</p>
              <p className="text-[11px] text-[#08090a]/55">{note}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[#92400e] leading-relaxed border border-amber-200 bg-amber-50 p-3 rounded-xl">
          **Do not treat this as evidence of trading alpha.** The ~3-month Yahoo history is too short for meaningful
          strategy validation; theme memberships were selected using today's information (survivorship/look-ahead
          universe risk); baskets overlap; event observations are correlated; adjusted corporate actions, turnover,
          transaction costs, slippage, bid/ask, and an independent test period are not modeled.
          We need a longer frozen-universe history and an unseen evaluation period before calling this a proven edge.
          {check.sampleDates ? ' Evaluation dates: '+check.sampleDates+'. Baseline positive-hit rate: '+(check.baselineHitPct===null?'—':check.baselineHitPct.toFixed(0)+'%')+'.':''}
        </p>
      </section>

      <footer className="flex flex-wrap items-center justify-between text-xs text-[#08090a]/60 gap-3">
        <p>Only exact-date observed daily closes. No synthetic prices or claims of institutional fund flows.</p>
        <button type="button" onClick={onOpenIndustries}
          className="inline-flex items-center gap-2 font-bold text-blue-700 hover:underline">
          <Layers3 className="w-4 h-4"/> Open detailed basic-industry analysis
        </button>
      </footer>
    </section>
  );
}
