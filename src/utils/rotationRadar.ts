/**
 * Cross-layer theme rotation radar.
 *
 * Inputs: independently observed daily CLOSES (not Screener quotes/volumes),
 * static curated CORE theme memberships, NIFTY 500 benchmark closes,
 * and the user's optional private industry classification overlay.
 *
 * No institutional flow is inferred. All RS windows are matched by exact ISO
 * trading dates. Research rules are predeclared, not fitted to past results.
 */
import { CORE_SECTOR_INDICES, classifySectorMember } from '../data/sectorUniverse';
import { VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS, type BasicIndustryAssignment } from '../data/basicIndustryMappings';
import { sanitizeSnapshot } from './priceQuality';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';

export type RotationPhase = 'Early turn' | 'Broad leader' | 'Losing steam' | 'Still lagging' | 'Thin evidence' | 'Provisional composition';
export interface RotationStockPulse {
  ticker: string;
  name: string;
  basicIndustry: string;
  return5: number;
  return21: number;
  relative5: number;
}
export interface IndustryContribution {
  name: string;
  companies: number;
  averageReturn5: number;
  aboveBenchmark: number;
  tickers: string[];
}
export interface ThemeRotationPulse {
  themeId: string;
  themeName: string;
  category: string;
  phase: RotationPhase;
  membershipReview: 'explicit-editorial' | 'provisional';
  total: number;
  validCount: number;
  coveragePct: number;
  return5: number;
  return21: number;
  rs5: number;
  rs21: number;
  rsAcceleration: number;
  advancingPct5: number;
  advancingPctPrior16: number;
  breadthChange: number;
  outperformingPct5: number;
  stockDrivers: RotationStockPulse[];
  industryDrivers: IndustryContribution[];
}
export interface ForwardCheck {
  signalEvents: number;
  evaluatedThemes: number;
  distinctSignalThemes: number;
  sampleDates: number;
  signalHitPct: number | null;
  baselineHitPct: number | null;
  signalAvgExcess5: number | null;
  baselineAvgExcess5: number | null;
  /** Marked exploratory: static present-day memberships, ~3 months of closes,
      benchmark-relative, correlated themes and unadjusted trading costs. */
  label: 'exploratory-in-sample-membership';
}
export interface RotationRadarReport {
  asOf: string | null;
  universePriceSymbols: number;
  coreThemes: number;
  evaluatedThemes: number;
  thinThemes: number;
  provisionalThemes: number;
  earlyTurns: ThemeRotationPulse[];
  broadLeaders: ThemeRotationPulse[];
  losingSteam: ThemeRotationPulse[];
  allThemes: ThemeRotationPulse[];
  forwardCheck: ForwardCheck;
}
type CloseMap = Map<string, number>;
type StockCloses = Map<string, CloseMap>;
interface Evaluation {
  pulse: ThemeRotationPulse;
  memberTickers: string[];
}

const round = (n: number): number => Number(n.toFixed(2));
const average = (items: number[]): number => items.reduce((sum, n) => sum + n, 0) / (items.length || 1);
const returnPct = (now: number, before: number): number => 100 * (now / before - 1);
const isoDay = (text: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(text);

function historyByStock(snapshot: BrowserMarketSnapshot): StockCloses {
  const stocks = sanitizeSnapshot(snapshot.stocks);
  const result = new Map<string, CloseMap>();
  for (const [ticker, record] of Object.entries(stocks)) {
    const history = new Map<string, number>();
    for (const point of record.rawHistory || []) {
      if (isoDay(point.date) && point.close > 0 && Number.isFinite(point.close)) {
        history.set(point.date, point.close);
      }
    }
    if (history.size >= 27) result.set(ticker.toUpperCase(), history);
  }
  return result;
}
function referenceHistory(snapshot: BrowserMarketSnapshot): { dates: string[]; values: CloseMap } {
  const values = new Map<string, number>();
  for (const pt of snapshot.benchmarks?.nifty500?.history || []) {
    if (isoDay(pt.date) && pt.value > 0 && Number.isFinite(pt.value)) values.set(pt.date, pt.value);
  }
  return { dates: [...values.keys()].sort(), values };
}

function evaluateTheme(
  theme: (typeof CORE_SECTOR_INDICES)[number],
  at: number,
  dates: string[],
  benchmark: CloseMap,
  stockCloses: StockCloses,
  classifications: ReadonlyMap<string, BasicIndustryAssignment>,
): Evaluation | null {
  if (at < 21 || at >= dates.length) return null;
  const current = dates[at], before5 = dates[at - 5], before21 = dates[at - 21];
  const bNow = benchmark.get(current), b5 = benchmark.get(before5), b21 = benchmark.get(before21);
  if (!bNow || !b5 || !b21) return null;
  const benchmark5 = returnPct(bNow, b5);
  const benchmark21 = returnPct(bNow, b21);
  const benchmarkPriorPace = 100 * (Math.pow(b5 / b21, 5 / 16) - 1);

  const uniqueMembers = [...new Map(theme.stocks.map(stock => [stock.ticker.toUpperCase(), stock])).values()];
  if (!uniqueMembers.length) return null;
  // Explicit membership rule is editorial review, NOT proof of segment revenue exposure.
  // Unreviewed themes remain explorable, but cannot be called a reliable early turn.
  const membershipReview: ThemeRotationPulse['membershipReview'] = uniqueMembers.every(stock => {
    const member = classifySectorMember(theme.id, stock);
    return member.tier === 'core' && member.reviewStatus === 'reviewed-theme-fit';
  }) ? 'explicit-editorial' : 'provisional';
  const priced = uniqueMembers.flatMap(stock => {
    const history = stockCloses.get(stock.ticker.toUpperCase());
    const p0 = history?.get(current), p5 = history?.get(before5), p21 = history?.get(before21);
    if (!p0 || !p5 || !p21) return [];
    const r5 = returnPct(p0, p5);
    const r21 = returnPct(p0, p21);
    const priorPace5 = 100 * (Math.pow(p5 / p21, 5 / 16) - 1);
    return [{
      stock, r5, r21, priorPace5,
      risingPrior16: p5 > p21,
      name: stock.name,
      basicIndustry: classifications.get(stock.ticker.toUpperCase())?.basicIndustry || 'Unclassified',
    }];
  });
  if (!priced.length) return null;

  const validCount = priced.length;
  const coveragePct = Math.round(100 * validCount / uniqueMembers.length);
  const theme5 = average(priced.map(p => p.r5));
  const theme21 = average(priced.map(p => p.r21));
  const priorPace = average(priced.map(p => p.priorPace5));
  const relative5 = theme5 - benchmark5;
  const relative21 = theme21 - benchmark21;
  const acceleration = relative5 - (priorPace - benchmarkPriorPace);
  const breadthNow = 100 * priced.filter(p => p.r5 > 0).length / validCount;
  const breadthEarlier = 100 * priced.filter(p => p.risingPrior16).length / validCount;
  const breadthChange = breadthNow - breadthEarlier;
  const beatingBenchmark = 100 * priced.filter(p => p.r5 > benchmark5).length / validCount;

  // A small theme is still shown for research, but never called a signal.
  const quality = validCount >= 5 && coveragePct >= 75;
  let phase: RotationPhase = membershipReview === 'provisional' ? 'Provisional composition' : 'Thin evidence';
  if (quality && membershipReview === 'explicit-editorial') {
    if (relative21 <= 0 && relative5 > 0 && acceleration > 0 &&
        breadthNow >= 60 && breadthChange >= 10 && beatingBenchmark >= 50) {
      phase = 'Early turn';
    } else if (relative21 > 0 && relative5 > 0 && breadthNow >= 60 && beatingBenchmark >= 50) {
      phase = 'Broad leader';
    } else if (relative21 > 0 && (relative5 <= 0 || acceleration < 0 || breadthChange < -15)) {
      phase = 'Losing steam';
    } else {
      phase = 'Still lagging';
    }
  }

  const drivers: RotationStockPulse[] = priced.map(p => ({
    ticker: p.stock.ticker, name: p.name, basicIndustry: p.basicIndustry,
    return5: round(p.r5), return21: round(p.r21),
    relative5: round(p.r5 - benchmark5),
  })).sort((a, b) => b.relative5 - a.relative5 || a.ticker.localeCompare(b.ticker));

  const byIndustry = new Map<string, typeof priced>();
  for (const p of priced) byIndustry.set(p.basicIndustry, [...(byIndustry.get(p.basicIndustry) || []), p]);
  const industryDrivers: IndustryContribution[] = [...byIndustry].map(([name, members]) => ({
    name, companies: members.length,
    averageReturn5: round(average(members.map(m => m.r5))),
    aboveBenchmark: members.filter(m => m.r5 > benchmark5).length,
    tickers: members.map(m => m.stock.ticker).sort(),
  })).sort((a, b) => b.averageReturn5 - a.averageReturn5 || a.name.localeCompare(b.name));

  return {
    memberTickers: priced.map(p => p.stock.ticker.toUpperCase()),
    pulse: {
      themeId: theme.id, themeName: theme.name, category: theme.category,
      phase, membershipReview, total: uniqueMembers.length, validCount, coveragePct,
      return5: round(theme5), return21: round(theme21),
      rs5: round(relative5), rs21: round(relative21), rsAcceleration: round(acceleration),
      advancingPct5: round(breadthNow),
      advancingPctPrior16: round(breadthEarlier),
      breadthChange: round(breadthChange),
      outperformingPct5: round(beatingBenchmark),
      stockDrivers: drivers, industryDrivers,
    },
  };
}

export function computeRotationRadar(
  snapshot: BrowserMarketSnapshot | null,
  classifications: ReadonlyMap<string, BasicIndustryAssignment> = VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS,
): RotationRadarReport {
  const emptyCheck: ForwardCheck = {
    signalEvents: 0, evaluatedThemes: 0, distinctSignalThemes: 0, sampleDates: 0,
    signalHitPct: null, baselineHitPct: null,
    signalAvgExcess5: null, baselineAvgExcess5: null,
    label: 'exploratory-in-sample-membership',
  };
  const blank: RotationRadarReport = {
    asOf: null, universePriceSymbols: 0, coreThemes: CORE_SECTOR_INDICES.length,
    evaluatedThemes: 0, thinThemes: CORE_SECTOR_INDICES.length, provisionalThemes: 0,
    earlyTurns: [], broadLeaders: [], losingSteam: [], allThemes: [],
    forwardCheck: emptyCheck,
  };
  if (!snapshot) return blank;
  const priceData = historyByStock(snapshot);
  const reference = referenceHistory(snapshot);
  const { dates, values } = reference;
  if (dates.length < 27) return { ...blank, universePriceSymbols: priceData.size };
  const asOf = dates[dates.length - 1];
  const endIndex = dates.length - 1;
  const observations = CORE_SECTOR_INDICES.flatMap(theme => {
    const result = evaluateTheme(theme, endIndex, dates, values, priceData, classifications);
    return result ? [result.pulse] : [];
  });
  // Primary ranking: demonstrated week-over-prior-relative acceleration,
  // with breadth/quality gates, not an opaque optimized composite.
  const sorted = observations.sort((a, b) => {
    const isEligible = (p: ThemeRotationPulse) => p.phase !== 'Thin evidence' && p.phase !== 'Provisional composition';
    const aEligible = isEligible(a) ? 1 : 0;
    const bEligible = isEligible(b) ? 1 : 0;
    return bEligible - aEligible || b.rsAcceleration - a.rsAcceleration ||
      b.breadthChange - a.breadthChange || a.themeName.localeCompare(b.themeName);
  });

  // A deliberately modest historical sanity check. Signals are formed at t
  // only from dates <= t; price at t+5 is referenced ONLY for the outcome.
  // Fixed current constituents and overlapping thematic membership can induce
  // survivorship/selection bias. Five-session non-overlapping event dates.
  const signals: number[] = [], baseline: number[] = [];
  const sampleDates = new Set<string>(), distinct = new Set<string>();
  for (let i = 21; i + 5 < dates.length; i += 5) {
    const curr = dates[i], forward = dates[i + 5];
    const bNow = values.get(curr)!, bForward = values.get(forward)!;
    const benchmarkNext5 = returnPct(bForward, bNow);
    for (const theme of CORE_SECTOR_INDICES) {
      const e = evaluateTheme(theme, i, dates, values, priceData, classifications);
      if (!e || e.pulse.phase === 'Thin evidence' || e.pulse.phase === 'Provisional composition') continue;
      // Exact same cohort required at exit, no forward-filled missing closes.
      const forwardReturns: number[] = [];
      for (const ticker of e.memberTickers) {
        const p0 = priceData.get(ticker)?.get(curr);
        const p5 = priceData.get(ticker)?.get(forward);
        if (!p0 || !p5) break;
        forwardReturns.push(returnPct(p5, p0));
      }
      if (forwardReturns.length !== e.memberTickers.length) continue;
      const excess = average(forwardReturns) - benchmarkNext5;
      baseline.push(excess);
      sampleDates.add(curr);
      if (e.pulse.phase === 'Early turn') {
        signals.push(excess);
        distinct.add(e.pulse.themeId);
      }
    }
  }
  const stats = (items: number[]) => ({
    hit: items.length ? round(100 * items.filter(x => x > 0).length / items.length) : null,
    avg: items.length ? round(average(items)) : null,
  });
  const signalStats = stats(signals), baselineStats = stats(baseline);
  return {
    asOf,
    universePriceSymbols: priceData.size,
    coreThemes: CORE_SECTOR_INDICES.length,
    evaluatedThemes: sorted.filter(x => x.phase !== 'Thin evidence' && x.phase !== 'Provisional composition').length,
    thinThemes: CORE_SECTOR_INDICES.length - sorted.filter(x => x.phase !== 'Thin evidence' && x.phase !== 'Provisional composition').length - sorted.filter(x => x.phase === 'Provisional composition').length,
    provisionalThemes: sorted.filter(x => x.phase === 'Provisional composition').length,
    earlyTurns: sorted.filter(x => x.phase === 'Early turn'),
    broadLeaders: sorted.filter(x => x.phase === 'Broad leader'),
    losingSteam: sorted.filter(x => x.phase === 'Losing steam'),
    allThemes: sorted,
    forwardCheck: {
      signalEvents: signals.length, evaluatedThemes: baseline.length,
      distinctSignalThemes: distinct.size, sampleDates: sampleDates.size,
      signalHitPct: signalStats.hit, baselineHitPct: baselineStats.hit,
      signalAvgExcess5: signalStats.avg, baselineAvgExcess5: baselineStats.avg,
      label: 'exploratory-in-sample-membership',
    },
  };
}
