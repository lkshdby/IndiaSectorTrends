export interface StockConstituent {
  ticker: string;
  name: string;
  price: number;
  change1D: number; // percentage e.g. +0.90
  change1W: number; // percentage e.g. -0.02
  change1M?: number; // 21-trading-day percentage return
  change3M?: number; // 63-trading-day percentage return
  marketCapCr: number;
  pe: number;
  volume: number;
  logoBg?: string;
  logoText?: string;
}

export interface HistoricalPricePoint {
  date: string;
  value: number; // normalized index level (e.g. 108.0 to 130.0)
  equalWeightValue?: number;
  mcapWeightValue?: number;
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
  change1M: number; // 21-trading-day % return
  change3M?: number; // 63-trading-day % return
  change1Y: number;
  equalWt1W?: number;
  mcapWt1W?: number;
  equalWt1M?: number;
  mcapWt1M?: number;
  equalWt3M?: number;
  mcapWt3M?: number;
  ewMcapSpread1M?: number; // Equal-Wt 1M minus MCap-Wt 1M
  ewMcapSpread1W?: number; // Equal-Wt 1W minus MCap-Wt 1W
  currentReturn: number; // % return for active timeframe (e.g. -5.76%)
  history: HistoricalPricePoint[];
  dataCoveragePct?: number; // percentage of basket constituents with aligned observed histories
  stocks: StockConstituent[];
  breadthPositivePct: number; // % of stocks in green
   rotationStatus: 'Leading' | 'Improving' | 'Weakening' | 'Lagging';
  isBenchmark?: boolean;
}

export type TimeframePeriod = '3M' | '6M' | 'YTD' | '1Y' | '3Y' | '5Y' | 'Max';

export interface CustomIndexItem {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  stockTickers: string[];
}

export interface BenchmarkItem {
  key: string;
  symbol: string;
  name: string;
  category: string;
  price: number;
  change1D: number;
  change1W: number;
  change3M: number;
  history: { date: string; value: number }[];
}
