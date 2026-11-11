/**
 * One-pass STRUCTURAL membership audit of all 62 thematic baskets.
 * Editorial theme fit is never represented as NSE/source verified business
 * segment exposure. Prices, recent returns, and screen momentum are not used
 * to accept or remove members: no performance-based look-ahead selection.
 */
import { THEMATIC_SECTOR_INDICES, classifySectorMember, type ExposureTier, type ThemeMember } from '../data/sectorUniverse';

export interface ThemeMembershipAuditRow {
  themeId: string;
  themeName: string;
  ticker: string;
  companyName: string;
  tier: ExposureTier;
  membershipReview: ThemeMember['reviewStatus'];
  rationale: string;
  marketCapCrSnapshot: number | null;
}
export interface ThemeAuditSummary {
  themeId: string;
  themeName: string;
  total: number;
  core: number;
  adjacent: number;
  proxy: number;
  excluded: number;
  explicitlyReviewed: number;
  provisional: number;
  reviewState: 'explicit-editorial' | 'provisional';
  lowSampleCore: boolean;
  coreMarketCapConcentrationPct: number | null;
  pendingActions: string[];
}
export interface ThemeMembershipAudit {
  themes: ThemeAuditSummary[];
  rows: ThemeMembershipAuditRow[];
  themeCount: number;
  themeEntries: number;
  uniqueTickers: number;
  provisionalThemes: number;
  provisionalCoreEntries: number;
  narrowCoreThemes: number;
}
function csv(v: string | number | null): string {
  let s = String(v ?? '');
  if (/^[=+@\t\r\n]/.test(s)) s = "'" + s;
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
}
export function buildThemeMembershipAudit(): ThemeMembershipAudit {
  const rows: ThemeMembershipAuditRow[] = [];
  const themes: ThemeAuditSummary[] = [];
  for (const sector of THEMATIC_SECTOR_INDICES) {
    const members = sector.stocks.map(stock => ({stock, assessment: classifySectorMember(sector.id,stock)}));
    const thematicRows: ThemeMembershipAuditRow[] = members.map(({stock,assessment}) => ({
      themeId:sector.id,
      themeName:sector.name,
      ticker:stock.ticker.toUpperCase(),
      companyName:stock.name,
      tier:assessment.tier,
      membershipReview:assessment.reviewStatus,
      rationale:assessment.reason,
      marketCapCrSnapshot:Number.isFinite(stock.marketCapCr)&&stock.marketCapCr>0?stock.marketCapCr:null,
    }));
    rows.push(...thematicRows);
    const core=thematicRows.filter(x=>x.tier==='core');
    const caps=core.map(x=>x.marketCapCrSnapshot).filter((x):x is number=>x!==null);
    const concentration=caps.length===core.length && caps.length ?
      Math.round(10000 * Math.max(...caps) / caps.reduce((n,c)=>n+c,0)) / 100 : null;
    const provisional=thematicRows.filter(x=>x.membershipReview==='provisional');
    const reviewState=provisional.length?'provisional':'explicit-editorial';
    const pendingActions=[
      ...(reviewState==='provisional'?['Review each provisional company for direct, material or adjacent revenue exposure; evidence URL/date required']:[]),
      ...(core.length<5?['Concentrated core basket; retain as watchlist or limited-sample, do not add unrelated stocks for threshold']:[]),
      ...(concentration!==null&&concentration>60?['Largest constituent exceeds 60% of static market-cap weight; check concentration sensitivity']:[]),
    ];
    themes.push({
      themeId:sector.id,themeName:sector.name,
      total:thematicRows.length,core:core.length,
      adjacent:thematicRows.filter(x=>x.tier==='adjacent').length,
      proxy:thematicRows.filter(x=>x.tier==='proxy').length,
      excluded:thematicRows.filter(x=>x.tier==='excluded').length,
      explicitlyReviewed:thematicRows.length-provisional.length,
      provisional:provisional.length,reviewState,
      lowSampleCore:core.length<5,coreMarketCapConcentrationPct:concentration,
      pendingActions,
    });
  }
  return {
    themes,rows,themeCount:themes.length,themeEntries:rows.length,
    uniqueTickers:new Set(rows.map(x=>x.ticker)).size,
    provisionalThemes:themes.filter(x=>x.reviewState==='provisional').length,
    provisionalCoreEntries:rows.filter(x=>x.tier==='core'&&x.membershipReview==='provisional').length,
    narrowCoreThemes:themes.filter(x=>x.lowSampleCore).length,
  };
}
export function themeMembershipAuditCsv(audit: ThemeMembershipAudit): string {
  const keys = ['themeId','themeName','ticker','companyName','tier','membershipReview','rationale','marketCapCrSnapshot'] as const;
  return [keys.join(','), ...audit.rows.map(r=>keys.map(k=>csv(r[k])).join(','))].join('\r\n')+'\r\n';
}
