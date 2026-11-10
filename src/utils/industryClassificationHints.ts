/**
 * Conservative, non-authoritative candidate classification hints for review.
 *
 * Every hint is explicitly EDITORIAL and must NOT be fed to the basic-industry
 * ranking calculations. The user's 62 investment themes are not a source of
 * official basic-industry membership; companies can span several themes.
 */
import { THEMATIC_SECTOR_INDICES } from '../data/sectorUniverse';
import { BASIC_INDUSTRY_BY_NAME } from '../data/basicIndustryCatalog';

export interface EditorialIndustryHint {
  ticker: string;
  suggestedIndustry: string | null;
  suggestedCode: string | null;
  themeIds: string[];
  status: 'editorial-suggestion' | 'ambiguous-themes' | 'no-specific-theme';
  reason: string;
}

/** Only near single-business baskets receive a weak candidate hint.
 * All other sector memberships stay explicitly ambiguous.
 */
export const DIRECT_THEME_CANDIDATES: Record<string, string> = {
  'dairy-value-added-food': 'Dairy Products',
  'jewellery-luxury-watches': 'Gems, Jewellery And Watches',
  'alcoholic-beverages-breweries': 'Breweries & Distilleries',
  'retail-qsr': 'Restaurants',
  'hotels-hospitality': 'Hotels & Resorts',
  'power-generation': 'Power Generation',
  'power-transmission': 'Power - Transmission',
  'cables-wires': 'Cables - Electricals',
  'real-estate': 'Residential, Commercial Projects',
  'amc-mutual-funds': 'Asset Management Company',
  'private-banks': 'Private Sector Bank',
  'psu-banks': 'Public Sector Bank',
  'it-largecap': 'Computers - Software & Consulting',
  'it-midcaps': 'Computers - Software & Consulting',
  'passenger-cars-ev': 'Passenger Cars & Utility Vehicles',
  'two-wheelers': '2/3 Wheelers',
  'commercial-vehicles': 'Commercial Vehicles',
  'auto-components': 'Auto Components & Equipments',
  'hospitals': 'Hospital',
  'pharma-formulations': 'Pharmaceuticals',
  'diagnostics': 'Healthcare Service Provider',
  'chemicals-speciality': 'Specialty Chemicals',
  'agro-chemicals': 'Pesticides & Agrochemicals',
  'fertilisers': 'Fertilizers',
  'cement-products': 'Cement & Cement Products',
  'paints-coatings': 'Paints',
  'paper-forest': 'Paper & Paper Products',
  'sugar-biofuels': 'Sugar',
};

export function getEditorialHints(): Map<string, EditorialIndustryHint> {
  const byTicker = new Map<string, { themes: Set<string>; ideas: Set<string> }>();
  for (const theme of THEMATIC_SECTOR_INDICES) {
    for (const constituent of theme.stocks) {
      const ticker = constituent.ticker.toUpperCase();
      const current = byTicker.get(ticker) || { themes: new Set<string>(), ideas: new Set<string>() };
      current.themes.add(theme.id);
      if (DIRECT_THEME_CANDIDATES[theme.id]) current.ideas.add(DIRECT_THEME_CANDIDATES[theme.id]);
      byTicker.set(ticker, current);
    }
  }
  const hints = new Map<string, EditorialIndustryHint>();
  for (const [ticker, group] of byTicker) {
    const suggestions = [...group.ideas];
    const basicIndustry = suggestions.length === 1 ? suggestions[0] : null;
    const industryCode = basicIndustry ? BASIC_INDUSTRY_BY_NAME.get(basicIndustry)?.code || null : null;
    hints.set(ticker, {
      ticker,
      suggestedIndustry: basicIndustry,
      suggestedCode: industryCode,
      themeIds: [...group.themes],
      status: basicIndustry ? 'editorial-suggestion' :
        suggestions.length > 1 ? 'ambiguous-themes' : 'no-specific-theme',
      reason: basicIndustry
        ? 'Only a thematic-basket hypothesis, NOT a checked NSE company classification; requires company revenue and exchange evidence'
        : suggestions.length > 1
          ? 'Multiple investment themes suggest different primary industries; cannot choose without evidence'
          : 'No narrowly defined theme that could even suggest a single basic industry',
    });
  }
  return hints;
}
