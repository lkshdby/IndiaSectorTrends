/** Public, tiny, point-in-time thematic signal diary (no Screener data). */
export interface RadarDiaryTheme {
  themeId: string;
  themeName: string;
  phase: 'Early turn' | 'Broad leader' | 'Losing steam' | 'Still lagging' | 'Thin evidence';
  rs5: number;
  rs21: number;
  acceleration: number;
  breadth5: number;
  coveragePct: number;
  members: string[];
  forwardExcess5: number | null;
}
export interface RadarDiaryDay {
  date: string;
  firstRecordedAt: string;
  sourceSnapshotAt: string;
  themes: RadarDiaryTheme[];
}
export interface RadarDiary {
  version: 1;
  days: RadarDiaryDay[];
}
export interface DiaryForwardScore {
  observedDates: number;
  totalMatured: number;
  earlyMatured: number;
  distinctEarlyThemes: number;
  earlyHitRate: number | null;
  earlyMeanExcess: number | null;
  baselineHitRate: number | null;
  baselineMeanExcess: number | null;
}
export function summarizeRadarDiary(diary: RadarDiary): DiaryForwardScore {
  const outcomes = diary.days.flatMap(d=>d.themes.filter(t=>t.forwardExcess5!==null));
  const early = outcomes.filter(t=>t.phase==='Early turn');
  const mean = (r: RadarDiaryTheme[]) => r.length ?
    Number((r.reduce((sum,t)=>sum+t.forwardExcess5!,0)/r.length).toFixed(2)) : null;
  const hit = (r: RadarDiaryTheme[]) => r.length ?
    Number((100*r.filter(t=>t.forwardExcess5!>0).length/r.length).toFixed(1)) : null;
  return {
    observedDates: diary.days.length,
    totalMatured: outcomes.length,
    earlyMatured: early.length,
    distinctEarlyThemes: new Set(early.map(x=>x.themeId)).size,
    earlyHitRate: hit(early),
    earlyMeanExcess: mean(early),
    baselineHitRate: hit(outcomes),
    baselineMeanExcess: mean(outcomes),
  };
}

/**
 * Fetch public GitHub diary directly. Avoid Vercel preview build scheduling
 * and never send private Screener storage or classifications.
 */
export async function fetchRotationDiary(): Promise<RadarDiary> {
  const uri='https://raw.githubusercontent.com/lkshdby/IndiaSectorTrends/main/src/data/rotationRadarObservations.json';
  const response=await fetch(uri+'?v='+Date.now(),{cache:'no-store',credentials:'omit'});
  if(!response.ok) throw new Error('Diary unavailable: HTTP '+response.status);
  const d=await response.json() as RadarDiary;
  if (d?.version!==1 || !Array.isArray(d.days) || d.days.length>550 ||
      !d.days.every(day => typeof day.date === 'string' && Array.isArray(day.themes))) {
    throw new Error('Invalid rotation diary format');
  }
  return d;
}
