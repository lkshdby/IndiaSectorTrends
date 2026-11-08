export interface StockConstituent {
  ticker: string;
  name: string;
  price: number;
  change1D: number; // percentage e.g. +0.90
  change1W: number; // percentage e.g. -0.02
  marketCapCr: number;
  pe: number;
  volume: number;
  logoBg?: string;
  logoText?: string;
}

export interface HistoricalPricePoint {
  date: string;
  value: number; // normalized index level (e.g. 108.0 to 130.0)
  volume: number; // in volume units
  changePct?: number;
}

export interface SectorIndexData {
  id: string;
  name: string;
  category: string;
  companiesCount: number;
  change1D: number; // % e.g. -0.74
  change1W: number; // % e.g. +4.91
  change1M: number;
  change1Y: number;
  currentReturn: number; // % return for active timeframe (e.g. -5.76%)
  history: HistoricalPricePoint[];
  stocks: StockConstituent[];
  breadthPositivePct: number; // % of stocks in green today
  rotationStatus: 'Leading' | 'Improving' | 'Weakening' | 'Lagging';
}

export type TimeframePeriod = '3M' | '6M' | 'YTD' | '1Y' | '3Y' | '5Y' | 'Max';

export interface CustomIndexItem {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  stockTickers: string[];
}
