import { PREBUILT_SECTOR_INDICES } from './prebuiltIndices';
import { COMMITTED_THEME_REVIEWS, mostRecentThemeReview, type ThemeReviewBook } from '../utils/themeCompositionReviews';
import type { SectorIndexData, StockConstituent } from '../types/indexTracker';

/**
 * Two-layer research universe:
 *   - CORE: used in rotation indices and sector rank calculations
 *   - ADJACENT/PROXY: research candidates, never silently averaged into the core index.
 * The records below are editorial classifications, NOT verified revenue exposures.
 * Every non-overridden constituent is provisionally core pending a documented audit.
 */
export type ExposureTier = 'core' | 'adjacent' | 'proxy' | 'excluded';
export interface ThemeMember {
  stock: StockConstituent;
  tier: ExposureTier;
  reason: string;
  reviewStatus: 'reviewed-theme-fit' | 'provisional';
}

interface SectorRule {
  core: string[];
  adjacent?: Record<string, string>;
  proxy?: Record<string, string>;
  excluded?: Record<string, string>;
}

const SECTOR_RULES: Record<string, SectorRule> = {
  'quick-commerce-consumer-tech': {
    core: ['ETERNAL', 'SWIGGY'],
    adjacent: { NYKAA: 'Beauty-commerce platform', FIRSTCRY: 'Mother-and-child products marketplace', HONASA: 'Consumer brands' },
    proxy: { NAUKRI: 'Recruitment / classified internet platform', ZAGGLE: 'Enterprise spend-management fintech' },
  },
  'fintech-payments-insurtech': {
    core: ['PAYTM', 'POLICYBZR', 'MOBIKWIK', 'FINOPB'],
    adjacent: { JIOFIN: 'Diversified financial-services holding', CMSINFO: 'Cash and managed payments infrastructure' },
    proxy: { AFFLE: 'Mobile advertising technology' },
  },
  'online-travel-marketplaces': {
    core: ['IXIGO', 'TBOTEK', 'EASEMYTRIP', 'RATEGAIN'],
    adjacent: { CARTRADE: 'Automotive marketplace', INDIAMART: 'B2B marketplace', JUSTDIAL: 'Local business discovery' },
  },
  'data-centers-ai-cloud': {
    core: ['NETWEB', 'ANANTRAJ', 'E2E', 'BBOX'],
    adjacent: { TECHNOE: 'Industrial equipment / infrastructure', AURIONPRO: 'Enterprise banking / transit technology', TANLA: 'Cloud communications rather than data center capacity' },
  },
  'dairy-value-added-food': {
    core: ['MILKYMIST', 'DODLA', 'HATSUN', 'HERITGFOOD', 'PARAGMILK'],
    adjacent: { VADILALIND: 'Frozen desserts and foods', BECTORFOOD: 'Bakery and packaged food' },
  },
  'retail-apparel': {
    core: ['TRENT', 'ABFRL', 'MANYAVAR', 'PAGEIND', 'KKCL', 'ARVIND'],
    adjacent: { DMART: 'General merchandise / grocery retail', RAYMOND: 'Diversified group, business mix requires review' },
  },
  'retail-qsr': {
    core: ['JUBLFOOD', 'DEVYANI', 'WESTLIFE', 'SAPPHIRE', 'RBA'],
    adjacent: { BIKAJI: 'Packaged snacks, not a QSR operator' },
  },
  'aviation-airports-tourism': {
    core: ['INDIGO', 'GMRAIRPORT', 'SPICEJET', 'TAJGVK'],
    adjacent: { THOMASCOOK: 'Travel and forex services', IRCTC: 'Primarily railway ticketing and catering' },
  },
  'solar-renewable': {
    core: ['WAAREEENER', 'PREMIERENE', 'SUZLON', 'INOXWIND', 'SWSOLAR', 'BORORENEW'],
    adjacent: { ACMESOLAR: 'Renewable power generation / development', KPIGREEN: 'Renewable power development / generation' },
    proxy: { IREDA: 'Renewable-energy finance, not an equipment maker' },
  },
  'water-recycling-circular': {
    core: ['WABAG', 'EMSLIMITED', 'IONEXCHANG', 'AWHCL', 'GANECOS', 'GRAVITA'],
    adjacent: { EPIGRAL: 'Chemical producer; water theme exposure needs verification' },
  },
  'railways': {
    core: ['RVNL', 'IRCON', 'TITAGARH', 'JUPITERWAG', 'RAILTEL', 'TEXRAIL', 'RITES', 'BEML'],
    adjacent: { IRFC: 'Railway financier, not rail manufacturing or EPC' },
  },
  'shipping-dredging': {
    core: ['GE-SHIPPING', 'SCI', 'SEAMECLTD', 'DREDGECORP', 'ESSARSHPNG'],
    adjacent: { ALLCARGO: 'Multimodal logistics; not principally ship-owning or dredging' },
  },
  'amc-mutual-funds': {
    core: ['HDFCAMC', 'NAM-INDIA', 'ABSLAMC', 'UTIAMC'],
    adjacent: { CAMS: 'Transfer agency / financial infrastructure', KFINTECH: 'Registrar and financial infrastructure' },
  },
  'gold-loan': {
    core: ['MUTHOOTFIN', 'MANAPPURAM', 'IIFL', 'MUTHOOTCAP'],
    adjacent: { SURYODAY: 'Small finance bank, not a dedicated gold-loan NBFC', SPANDANA: 'Microfinance-led lender' },
  },
  'ev-new-age-mobility': {
    core: ['OLAELEC', 'OLECTRA', 'JBMA', 'GREAVESCOT'],
    adjacent: { EXIDEIND: 'Battery maker with broader end-markets', 'ARE&M': 'Diversified battery producer', HBLENGINE: 'Specialty battery / industrial applications' },
  },
  'passenger-cars-ev': {
    core: ['MARUTI', 'M&M', 'TATAMOTORS', 'HYUNDAI', 'FORCE'],
    adjacent: { BOSCHLTD: 'Auto-component supplier, not passenger-vehicle OEM' },
  },
  'commercial-vehicles': {
    core: ['ASHOKLEY', 'TMCV', 'EICHERMOT', 'FORCEMOT', 'OLECTRA', 'JBMA'],
  },
  'hospitals': {
    core: ['APOLLOHOSP', 'FORTIS', 'MANIPALHOS', 'ASTERDM', 'KIMS', 'JLHL', 'HCG', 'KMCSHIL', 'INDRAMEDCO', 'ARTEMISMED', 'KOVAI', 'GPTHEALTH'],
    adjacent: { DRAGARWQ: 'Specialist ophthalmology care; not multi-specialty hospitals' },
  },
  'pharma-api-cdmo': {
    core: ['DIVISLAB', 'SYNGENE', 'SUVENPHAR', 'LAURUSLABS', 'NEULANDLAB', 'BLUEJET'],
    adjacent: { PPLPHARMA: 'Mixed pharmaceutical-services / products business', GRANULES: 'Vertically integrated pharma with formulations', JUBLPHARMA: 'Diversified pharma and specialty operations' },
  },
  'diagnostics': {
    core: ['LALPATHLAB', 'METROPOLIS', 'VIJAYA', 'THYROCARE', 'KRSNAA'],
    excluded: { SURYODAY: 'Suryoday Small Finance Bank is not a diagnostic laboratory' },
  },
  'geospatial': {
    core: ['MAPMYINDIA', 'GENUSPOWER', 'IDEAFORGE'],
    adjacent: { ZEN: 'Defence simulation / anti-drone exposure', HBLENGINE: 'Industrial and battery business', DRONE: 'Drone services, SME liquidity concern', RRP: 'Business identity / thematic exposure requires verification' },
  },
};

/** Resolve the Tata Motors demerger without reusing passenger-car history in the CV index. */
function resolveStock(stock: StockConstituent, sectorId: string): StockConstituent {
  if (sectorId === 'commercial-vehicles' && stock.ticker === 'TATAMOTORS') {
    return { ...stock, ticker: 'TMCV', name: 'Tata Motors Ltd — Commercial Vehicles', marketCapCr: 147017, price: 0, change1D: 0, change1W: 0, change1M: undefined, change3M: undefined };
  }
  return stock;
}

export function classifySectorMember(sectorId:string,stock:StockConstituent,
  reviews:ThemeReviewBook=COMMITTED_THEME_REVIEWS,asOf?:string):ThemeMember{
  const basket=SOURCE_BASKETS.find(s=>s.id===sectorId);
  const review=basket?mostRecentThemeReview(reviews,sectorId,basket.stocks.map(s=>s.ticker),asOf):null;
  const approvedTier=review?.assignments.find(a=>a.ticker===stock.ticker)?.tier;
  if(approvedTier)return {stock,tier:approvedTier,
    reason:'Owner-reviewed editorial theme role via GitHub issue #'+review!.githubIssue+
      '; independent segment revenue exposure remains unverified',
    reviewStatus:'reviewed-theme-fit'};
  const rule = SECTOR_RULES[sectorId];
  if (!rule) return { stock, tier: 'core', reason: 'Provisional core constituent; business-segment exposure not yet independently verified', reviewStatus: 'provisional' };
  if (rule.excluded?.[stock.ticker]) return { stock, tier: 'excluded', reason: rule.excluded[stock.ticker], reviewStatus: 'reviewed-theme-fit' };
  if (rule.adjacent?.[stock.ticker]) return { stock, tier: 'adjacent', reason: rule.adjacent[stock.ticker], reviewStatus: 'reviewed-theme-fit' };
  if (rule.proxy?.[stock.ticker]) return { stock, tier: 'proxy', reason: rule.proxy[stock.ticker], reviewStatus: 'reviewed-theme-fit' };
  if (rule.core.includes(stock.ticker)) return { stock, tier: 'core', reason: 'Primary business exposure to the stated basket theme (editorial classification)', reviewStatus: 'reviewed-theme-fit' };
  return { stock, tier: 'proxy', reason: 'Unclassified entry in an explicitly curated basket; needs verification', reviewStatus: 'provisional' };
}

// The exact owner-approved Brokers & Depositories composition in GitHub issue
// #39 includes GROWW, absent from the original prebuilt theme file.
// Preserve that explicit editorial choice. Price/market cap are intentionally
// unknown here (zero is the existing empty-data sentinel); only validated
// daily market prices can contribute to rotation signals.
const SOURCE_BASKETS: SectorIndexData[] = PREBUILT_SECTOR_INDICES.map(sector => {
  const stocks = sector.stocks.map(stock => resolveStock(stock, sector.id));
  if (sector.id === 'brokers-depositories' && !stocks.some(s => s.ticker === 'GROWW')) {
    stocks.push({
      ticker: 'GROWW',
      name: 'Billionbrains Garage Ventures Limited (Groww)',
      price: 0,
      change1D: 0,
      change1W: 0,
      marketCapCr: 0,
      pe: 0,
      volume: 0,
      logoBg: '#1d4ed8',
      logoText: 'GR',
    });
  }
  return { ...sector, stocks, companiesCount: stocks.length };
});

export const THEMATIC_SECTOR_INDICES = SOURCE_BASKETS;
export function getCoreSectorIndices(reviews:ThemeReviewBook=COMMITTED_THEME_REVIEWS,
  asOf?:string):SectorIndexData[]{
  return SOURCE_BASKETS.map(sector=>{
    const coreStocks=sector.stocks.filter(stock=>classifySectorMember(sector.id,stock,reviews,asOf).tier==='core');
    return {...sector,stocks:coreStocks,companiesCount:coreStocks.length};
  });
}
export const CORE_SECTOR_INDICES:SectorIndexData[]=getCoreSectorIndices();
export const CORE_SECTOR_BY_ID = new Map(CORE_SECTOR_INDICES.map(x => [x.id, x]));
export const THEMATIC_SECTOR_BY_ID = new Map(THEMATIC_SECTOR_INDICES.map(x => [x.id, x]));

export function getSectorOpportunityMembers(sectorId: string): ThemeMember[] {
  const sector = THEMATIC_SECTOR_BY_ID.get(sectorId);
  return sector ? sector.stocks.map(stock => classifySectorMember(sectorId, stock)).filter(x => x.tier !== 'core' && x.tier !== 'excluded') : [];
}

export function getUniverseDiagnostics() {
  const allCore = CORE_SECTOR_INDICES.flatMap(x => x.stocks);
  const allTheme = THEMATIC_SECTOR_INDICES.flatMap(x => x.stocks);
  return {
    basketCount: CORE_SECTOR_INDICES.length,
    coreEntries: allCore.length,
    coreUniqueSymbols: new Set(allCore.map(x => x.ticker)).size,
    thematicEntries: allTheme.length,
    thematicUniqueSymbols: new Set(allTheme.map(x => x.ticker)).size,
    provisionalBaskets: CORE_SECTOR_INDICES.filter(x=>
      x.stocks.some(stock=>classifySectorMember(x.id,stock).reviewStatus==='provisional')).length,
  };
}
