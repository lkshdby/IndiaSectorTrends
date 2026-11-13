/**
 * Reuse verified Basic Industry assignments from Sector Rotation to surface
 * candidates for the independently curated Investment Theme roster.
 *
 * A source-confirmed industry is NOT proof of direct thematic revenue:
 * candidates default to Adjacent and require explicit owner GitHub approval.
 * Private Screener rows stay browser-local; only selected NSE ticker roles
 * enter the existing public owner-review workflow.
 */
import { THEMATIC_SECTOR_INDICES, classifySectorMember } from '../data/sectorUniverse';
import type { BasicIndustryAssignment } from '../data/basicIndustryMappings';
import type { BrowserMarketSnapshot } from './marketSnapshotClient';
import type { ScreenerResearchPool } from './screenerResearchPool';
import type { ThemeReviewBook, CompositionTier } from './themeCompositionReviews';
import { COMMITTED_THEME_REVIEWS } from './themeCompositionReviews';

export interface SharedIndustryThemeCandidate {
  ticker: string;
  name: string;
  industry: string;
  source: 'verified-industry'|'local-screener-peer';
  provenance: string | null;
  sourceLabel: string;
  otherThemes: string[];
  hasSavedPrices: boolean;
  suggestedTier: CompositionTier;
}

/** One ticker identity and one shared price record; each theme has its own role. */
export function suggestSharedIndustryThemeCandidates(
  themeId: string,
  classifications: ReadonlyMap<string,BasicIndustryAssignment>,
  marketSnapshot: BrowserMarketSnapshot | null,
  pool: ScreenerResearchPool | null = null,
  reviews: ThemeReviewBook = COMMITTED_THEME_REVIEWS,
): SharedIndustryThemeCandidate[] {
  const theme = THEMATIC_SECTOR_INDICES.find(x=>x.id===themeId);
  if(!theme)return [];
  const currentMembers = new Set(theme.stocks.map(x=>x.ticker.toUpperCase()));
  const coreIndustries = new Set(theme.stocks.filter(s=>
    classifySectorMember(themeId,s,reviews).tier==='core'
  ).map(s=>classifications.get(s.ticker.toUpperCase())?.basicIndustry).filter(
    (name):name is string=>Boolean(name)
  ));
  if(!coreIndustries.size)return [];

  const knownNames = new Map<string,string>();
  const otherThemeNames = new Map<string,Set<string>>();
  for(const basket of THEMATIC_SECTOR_INDICES){
    for(const stock of basket.stocks){
      const ticker=stock.ticker.toUpperCase();
      if(!knownNames.has(ticker))knownNames.set(ticker,stock.name);
      if(basket.id!==themeId){
        const related=otherThemeNames.get(ticker)||new Set<string>();
        related.add(basket.name);
        otherThemeNames.set(ticker,related);
      }
    }
  }
  for(const company of pool?.companies||[]){
    if(!knownNames.has(company.ticker))knownNames.set(company.ticker,company.name);
  }

  const candidates=new Map<string,SharedIndustryThemeCandidate>();
  const add=(ticker:string,industry:string,source:SharedIndustryThemeCandidate['source'],
    provenance:string|null,sourceLabel:string)=>{
    if(currentMembers.has(ticker)||!coreIndustries.has(industry))return;
    const earlier=candidates.get(ticker);
    if(earlier?.source==='verified-industry' && source==='local-screener-peer')return;
    candidates.set(ticker,{
      ticker,
      name:knownNames.get(ticker)||ticker,
      industry,source,provenance,sourceLabel,
      otherThemes:[...(otherThemeNames.get(ticker)||[])].sort(),
      hasSavedPrices:Boolean(marketSnapshot?.stocks?.[ticker]?.rawHistory?.length),
      // A shared industry is insufficient to make this stock a core thematic pure play.
      suggestedTier:'adjacent',
    });
  };
  for(const [ticker,entry] of classifications){
    add(ticker.toUpperCase(),entry.basicIndustry,'verified-industry',entry.sourceUrl,
      entry.sourceType==='screener'?'Confirmed locally · Screener':'Confirmed Basic Industry · NSE');
  }
  for(const company of pool?.companies||[]){
    add(company.ticker.toUpperCase(),company.industry,'local-screener-peer',null,
      'Local Screener peer · review required');
  }
  return [...candidates.values()].sort((a,b)=>{
    const aRank=(a.source==='verified-industry'?4:0)+(a.hasSavedPrices?2:0)+(a.otherThemes.length?1:0);
    const bRank=(b.source==='verified-industry'?4:0)+(b.hasSavedPrices?2:0)+(b.otherThemes.length?1:0);
    return bRank-aRank || a.ticker.localeCompare(b.ticker);
  });
}
