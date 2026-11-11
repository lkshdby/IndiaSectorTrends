/**
 * Daily point-in-time Rotation Radar signal diary (PUBLIC research signals).
 * Captures only themes/stock tickers and observed returns already included in
 * our public curated universe. No proprietary Screener export is accessed.
 *
 * First accepted signal per observed trading date is immutable. Future
 * outcomes are filled in only AFTER five further benchmark trading sessions.
 * Run after a successful refresh-market-snapshot.ts quality gate.
 */
import fs from 'node:fs';
import path from 'node:path';
import { computeRotationRadar } from '../src/utils/rotationRadar';
import { summarizeRadarDiary, type RadarDiary } from '../src/utils/rotationDiary';
import { sanitizeSnapshot } from '../src/utils/priceQuality';
import type { BrowserMarketSnapshot } from '../src/utils/marketSnapshotClient';

const isoDay = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const ret = (newer: number, earlier: number) => 100 * (newer / earlier - 1);

export function recordRadarDiary(existing: RadarDiary, snapshot: BrowserMarketSnapshot): RadarDiary {
  const radar = computeRotationRadar(snapshot);
  if (!radar.asOf || !isoDay(radar.asOf)) throw new Error('No validated radar observation date');
  const dates = (snapshot.benchmarks.nifty500.history || [])
    .filter(h => isoDay(h.date) && Number.isFinite(h.value) && h.value > 0)
    .map(h => h.date).sort();
  const benchmark = new Map(snapshot.benchmarks.nifty500.history.map(h => [h.date, h.value]));
  const validated = sanitizeSnapshot(snapshot.stocks);
  const close = new Map(Object.entries(validated).map(([ticker, r]) => [
    ticker.toUpperCase(),
    new Map((r.rawHistory || []).filter(x => isoDay(x.date)).map(p => [p.date, p.close])),
  ]));
  const days = [...existing.days].sort((a, b) => a.date.localeCompare(b.date));
  if (!days.some(x => x.date === radar.asOf)) {
    days.push({
      date: radar.asOf,
      firstRecordedAt: new Date().toISOString(),
      sourceSnapshotAt: snapshot.fetchedAt,
      themes: radar.allThemes.filter(t => t.phase !== 'Thin evidence' && t.phase !== 'Provisional composition').map(t => ({
        themeId: t.themeId, themeName: t.themeName, phase: t.phase,
        rs5: t.rs5, rs21: t.rs21, acceleration: t.rsAcceleration,
        breadth5: t.advancingPct5, coveragePct: t.coveragePct,
        members: t.stockDrivers.map(s => s.ticker.toUpperCase()).sort(),
        forwardExcess5: null,
      })),
    });
  }

  // t+5 exit is deliberately not available at t, and cannot be evaluated
  // using a subsequent *different* group of constituents.
  for (const day of days) {
    const idx = dates.indexOf(day.date);
    if (idx < 0 || idx + 5 >= dates.length) continue;
    const exit = dates[idx + 5];
    const benchmarkFrom = benchmark.get(day.date), benchmarkTo = benchmark.get(exit);
    if (!benchmarkFrom || !benchmarkTo || benchmarkFrom <= 0 || benchmarkTo <= 0) continue;
    const benchmarkReturn = ret(benchmarkTo, benchmarkFrom);
    for (const t of day.themes) {
      if (t.forwardExcess5 !== null || !t.members.length) continue;
      const gains: number[] = [];
      for (const ticker of t.members) {
        const from = close.get(ticker)?.get(day.date);
        const to = close.get(ticker)?.get(exit);
        if (!from || !to || from <= 0 || to <= 0) break;
        gains.push(ret(to, from));
      }
      if (gains.length !== t.members.length) continue;
      t.forwardExcess5 = Number((gains.reduce((sum, v) => sum + v, 0) / gains.length -
        benchmarkReturn).toFixed(2));
    }
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  // Keep at most 550 trading-day signal vintages, ~2 years of point-in-time audits.
  return { version: 1, days: days.slice(-550) };
}

function main() {
  const source = JSON.parse(fs.readFileSync(
    path.join(process.cwd(),'src/data/verifiedLiveMarketData.json'),'utf8',
  )) as BrowserMarketSnapshot;
  const target = path.join(process.cwd(),'src/data/rotationRadarObservations.json');
  const previous = fs.existsSync(target) ?
    JSON.parse(fs.readFileSync(target,'utf8')) as RadarDiary :
    { version:1, days:[] } as RadarDiary;
  const next = recordRadarDiary(previous, source);
  const output = JSON.stringify(next,null,2) + '\n';
  if (!fs.existsSync(target) || fs.readFileSync(target,'utf8')!==output) {
    fs.writeFileSync(target,output,'utf8');
  }
  console.log('Rotation Radar diary: ',JSON.stringify(summarizeRadarDiary(next)));
}

if (process.argv[1]?.endsWith('/scripts/record-rotation-signals.ts')) {
  main();
}
