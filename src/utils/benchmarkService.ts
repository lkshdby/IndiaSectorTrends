import { BenchmarkItem, StockConstituent } from '../types/indexTracker';
import verifiedLiveMarketData from '../data/verifiedLiveMarketData.json';

// Pre-loaded verified real market closes (63 trading days) for all 196 NSE/BSE stocks across all 46 sectors
export const INITIAL_LIVE_STOCKS_DATA: Record<
  string,
  {
    ticker: string;
    symbol: string;
    price: number;
    change1D: number;
    change1W: number;
    change3M: number;
    history: { date: string; value: number }[];
    rawHistory: { date: string; close: number }[];
  }
> = (verifiedLiveMarketData.stocks as any) || {};

// Top constituent stocks for the major benchmarks (Real NSE Market Data)
export const BENCHMARK_TOP_CONSTITUENTS: Record<string, StockConstituent[]> = {
  nifty50: [
    { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 788.25, change1D: 0.50, change1W: 1.80, marketCapCr: 1320000, pe: 19.4, volume: 14500000, logoBg: '#1e3a8a', logoText: 'HD' },
    { ticker: 'RELIANCE', name: 'Reliance Industries Ltd', price: 1320.0, change1D: 0.80, change1W: 1.20, marketCapCr: 1880000, pe: 26.5, volume: 8200000, logoBg: '#0284c7', logoText: 'RI' },
    { ticker: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1571.2, change1D: 0.60, change1W: 2.10, marketCapCr: 885000, pe: 18.2, volume: 11000000, logoBg: '#ea580c', logoText: 'IC' },
    { ticker: 'INFY', name: 'Infosys Ltd', price: 1181.4, change1D: 0.40, change1W: 1.50, marketCapCr: 772000, pe: 27.8, volume: 6500000, logoBg: '#0284c7', logoText: 'IN' },
    { ticker: 'TCS', name: 'Tata Consultancy Services', price: 2498.5, change1D: 0.20, change1W: 1.10, marketCapCr: 1510000, pe: 29.5, volume: 1900000, logoBg: '#1e3a8a', logoText: 'TC' },
    { ticker: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 2107.2, change1D: 1.10, change1W: 3.40, marketCapCr: 890000, pe: 68.0, volume: 5400000, logoBg: '#dc2626', logoText: 'BA' },
    { ticker: 'LT', name: 'Larsen & Toubro Ltd', price: 4117.7, change1D: -0.30, change1W: 1.40, marketCapCr: 492000, pe: 36.5, volume: 1800000, logoBg: '#1e3a8a', logoText: 'LT' },
    { ticker: 'ITC', name: 'ITC Limited', price: 283.15, change1D: 0.10, change1W: 0.90, marketCapCr: 597000, pe: 28.0, volume: 9200000, logoBg: '#b45309', logoText: 'IT' },
  ],
  niftyMidcap: [
    { ticker: 'DIXON', name: 'Dixon Technologies Ltd', price: 12625.0, change1D: -1.20, change1W: 2.50, marketCapCr: 92100, pe: 112.0, volume: 380000, logoBg: '#0284c7', logoText: 'DX' },
    { ticker: 'PERSISTENT', name: 'Persistent Systems Ltd', price: 6053.5, change1D: 1.10, change1W: 3.20, marketCapCr: 86500, pe: 64.0, volume: 640000, logoBg: '#f97316', logoText: 'PS' },
    { ticker: 'SUZLON', name: 'Suzlon Energy Ltd', price: 38.8, change1D: 0.80, change1W: 1.40, marketCapCr: 53500, pe: 68.0, volume: 45000000, logoBg: '#0284c7', logoText: 'SE' },
    { ticker: 'POLYCAB', name: 'Polycab India Ltd', price: 7871.0, change1D: 0.60, change1W: 2.10, marketCapCr: 102400, pe: 54.0, volume: 620000, logoBg: '#dc2626', logoText: 'PC' },
    { ticker: 'COFORGE', name: 'Coforge Limited', price: 2076.0, change1D: 1.40, change1W: 3.80, marketCapCr: 52400, pe: 52.0, volume: 520000, logoBg: '#059669', logoText: 'CF' },
    { ticker: 'FEDERALBNK', name: 'Federal Bank Ltd', price: 340.1, change1D: 0.40, change1W: 1.10, marketCapCr: 48500, pe: 12.0, volume: 9200000, logoBg: '#0284c7', logoText: 'FB' },
    { ticker: 'INDHOTEL', name: 'Indian Hotels Co Ltd', price: 888.0, change1D: 1.20, change1W: 2.90, marketCapCr: 105000, pe: 74.0, volume: 3200000, logoBg: '#1e3a8a', logoText: 'IH' },
  ],
  niftySmallcap: [
    { ticker: 'ZENTEC', name: 'Zen Technologies Ltd', price: 1720.8, change1D: 1.20, change1W: 3.40, marketCapCr: 15400, pe: 78.0, volume: 890000, logoBg: '#06b6d4', logoText: 'ZT' },
    { ticker: 'KAYNES', name: 'Kaynes Technology India', price: 3233.0, change1D: 1.50, change1W: 4.80, marketCapCr: 34800, pe: 135.0, volume: 540000, logoBg: '#059669', logoText: 'KT' },
    { ticker: 'MAPMYINDIA', name: 'C.E. Info Systems Ltd', price: 839.2, change1D: -0.40, change1W: -1.80, marketCapCr: 11800, pe: 85.0, volume: 380000, logoBg: '#0284c7', logoText: 'MI' },
    { ticker: 'CDSL', name: 'Central Depository Services', price: 1331.4, change1D: 0.90, change1W: 2.10, marketCapCr: 38000, pe: 64.0, volume: 3800000, logoBg: '#1e3a8a', logoText: 'CD' },
    { ticker: 'RAILTEL', name: 'RailTel Corp of India', price: 241.05, change1D: -0.60, change1W: 0.80, marketCapCr: 12400, pe: 45.0, volume: 1400000, logoBg: '#8b5cf6', logoText: 'RT' },
    { ticker: 'ANGELONE', name: 'Angel One Ltd', price: 331.0, change1D: 0.40, change1W: 1.60, marketCapCr: 26500, pe: 21.0, volume: 1100000, logoBg: '#dc2626', logoText: 'AO' },
  ],
  nifty500: [
    { ticker: 'TRENT', name: 'Trent Ltd (Tata Retail)', price: 3079.0, change1D: -0.90, change1W: 2.04, marketCapCr: 243000, pe: 145.0, volume: 920000, logoBg: '#1e3a8a', logoText: 'TR' },
    { ticker: 'HAL', name: 'Hindustan Aeronautics Ltd', price: 4980.0, change1D: 1.10, change1W: 2.40, marketCapCr: 295000, pe: 38.4, volume: 2400000, logoBg: '#0284c7', logoText: 'HL' },
    { ticker: 'WAAREEENER', name: 'Waaree Energies Ltd', price: 2438.0, change1D: -1.45, change1W: -5.82, marketCapCr: 69800, pe: 42.0, volume: 3400000, logoBg: '#f59e0b', logoText: 'WE' },
    { ticker: 'BEL', name: 'Bharat Electronics Ltd', price: 396.0, change1D: 0.50, change1W: 1.20, marketCapCr: 215000, pe: 48.0, volume: 9800000, logoBg: '#16a34a', logoText: 'BE' },
    { ticker: 'TITAGARH', name: 'Titagarh Rail Systems', price: 677.85, change1D: -2.10, change1W: -6.40, marketCapCr: 16700, pe: 54.0, volume: 1100000, logoBg: '#eab308', logoText: 'TR' },
  ],
};

export const FALLBACK_BENCHMARKS: Record<string, BenchmarkItem> =
  verifiedLiveMarketData.benchmarks as Record<string, BenchmarkItem>;

export async function fetchLiveBenchmarks(): Promise<Record<string, BenchmarkItem>> {
  try {
    const res = await fetch('/api/benchmarks');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.benchmarks && Object.keys(data.benchmarks).length > 0) {
        return data.benchmarks;
      }
    }
  } catch (err) {
    console.warn('Using verified benchmark fallbacks:', err);
  }
  return FALLBACK_BENCHMARKS;
}
