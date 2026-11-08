import { BenchmarkItem } from '../types/indexTracker';

// Verified fallback benchmarks if backend is compiling or offline
export const FALLBACK_BENCHMARKS: Record<string, BenchmarkItem> = {
  nifty50: {
    key: 'nifty50',
    symbol: '^NSEI',
    name: 'NIFTY 50',
    category: 'Large Cap Benchmark',
    price: 25030.35,
    change1D: 1.60,
    change1W: 8.58,
    change3M: 1.60,
    history: [
      { date: '10 Aug', value: 100.0 },
      { date: '14 Aug', value: 99.8 },
      { date: '21 Aug', value: 100.4 },
      { date: '28 Aug', value: 101.2 },
      { date: '4 Sep', value: 102.5 },
      { date: '11 Sep', value: 103.1 },
      { date: '18 Sep', value: 104.2 },
      { date: '25 Sep', value: 103.8 },
      { date: '2 Oct', value: 101.5 },
      { date: '9 Oct', value: 100.8 },
      { date: '16 Oct', value: 99.4 },
      { date: '23 Oct', value: 98.6 },
      { date: '30 Oct', value: 100.2 },
      { date: '6 Nov', value: 101.6 },
    ],
  },
  niftyMidcap: {
    key: 'niftyMidcap',
    symbol: 'MOM100.NS',
    name: 'NIFTY Midcap 100',
    category: 'Mid Cap Benchmark',
    price: 60606.65,
    change1D: -0.80,
    change1W: 5.45,
    change3M: 6.80,
    history: [
      { date: '10 Aug', value: 100.0 },
      { date: '14 Aug', value: 100.5 },
      { date: '21 Aug', value: 101.8 },
      { date: '28 Aug', value: 103.2 },
      { date: '4 Sep', value: 105.1 },
      { date: '11 Sep', value: 106.4 },
      { date: '18 Sep', value: 108.2 },
      { date: '25 Sep', value: 106.9 },
      { date: '2 Oct', value: 103.8 },
      { date: '9 Oct', value: 102.5 },
      { date: '16 Oct', value: 101.2 },
      { date: '23 Oct', value: 100.4 },
      { date: '30 Oct', value: 103.8 },
      { date: '6 Nov', value: 106.8 },
    ],
  },
  niftySmallcap: {
    key: 'niftySmallcap',
    symbol: 'SML100CASE.NS',
    name: 'NIFTY Smallcap 100',
    category: 'Small Cap Benchmark',
    price: 18975.05,
    change1D: -1.20,
    change1W: 2.38,
    change3M: 4.50,
    history: [
      { date: '10 Aug', value: 100.0 },
      { date: '14 Aug', value: 100.8 },
      { date: '21 Aug', value: 102.4 },
      { date: '28 Aug', value: 104.5 },
      { date: '4 Sep', value: 106.8 },
      { date: '11 Sep', value: 107.5 },
      { date: '18 Sep', value: 109.1 },
      { date: '25 Sep', value: 105.4 },
      { date: '2 Oct', value: 102.1 },
      { date: '9 Oct', value: 99.8 },
      { date: '16 Oct', value: 98.2 },
      { date: '23 Oct', value: 97.5 },
      { date: '30 Oct', value: 101.2 },
      { date: '6 Nov', value: 104.5 },
    ],
  },
  nifty500: {
    key: 'nifty500',
    symbol: '^CRSLDX',
    name: 'NIFTY 500',
    category: 'Broad Market Universe',
    price: 23456.95,
    change1D: -1.15,
    change1W: 7.13,
    change3M: 2.40,
    history: [
      { date: '10 Aug', value: 100.0 },
      { date: '14 Aug', value: 100.1 },
      { date: '21 Aug', value: 101.0 },
      { date: '28 Aug', value: 102.1 },
      { date: '4 Sep', value: 103.8 },
      { date: '11 Sep', value: 104.5 },
      { date: '18 Sep', value: 105.8 },
      { date: '25 Sep', value: 104.2 },
      { date: '2 Oct', value: 102.0 },
      { date: '9 Oct', value: 101.2 },
      { date: '16 Oct', value: 99.8 },
      { date: '23 Oct', value: 99.1 },
      { date: '30 Oct', value: 101.4 },
      { date: '6 Nov', value: 102.4 },
    ],
  },
};

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
