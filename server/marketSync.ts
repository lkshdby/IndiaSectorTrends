import https from 'https';
import fs from 'fs';
import path from 'path';

export interface MarketHistoryPoint {
  date: string;
  close: number;
}

export interface BenchmarkQuote {
  symbol: string;
  name: string;
  price: number;
  change1D: number;
  change1W: number;
  change3M: number;
  history: { date: string; value: number }[];
}

// Fetch historical chart data from Yahoo Finance v8 (reliable, no auth required)
export function fetchYahooChart(symbol: string, range = '3mo'): Promise<{
  symbol: string;
  price: number;
  change1D: number;
  change1W: number;
  change3M: number;
  history: { date: string; value: number }[];
  rawHistory: { date: string; close: number }[];
}> {
  return new Promise((resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`;

    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
        timeout: 10000,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (!json.chart?.result?.[0]) {
              return reject(new Error(json.chart?.error?.description || 'No chart data'));
            }

            const result = json.chart.result[0];
            const meta = result.meta || {};
            const timestamps: number[] = result.timestamp || [];
            const quotes = result.indicators?.quote?.[0]?.close || [];

            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const rawPoints: { date: string; close: number }[] = [];

            for (let i = 0; i < timestamps.length; i++) {
              const val = quotes[i];
              if (val !== null && val !== undefined && !isNaN(val)) {
                const d = new Date(timestamps[i] * 1000);
                const formattedDate = `${d.getDate()} ${monthNames[d.getMonth()]}`;
                rawPoints.push({
                  date: formattedDate,
                  close: parseFloat(val.toFixed(2)),
                });
              }
            }

            // Real market price & accurate 1D (yesterday close), 1W (5 trading days ago), 3M (range start)
            const currentPrice = meta.regularMarketPrice || (rawPoints.length > 0 ? rawPoints[rawPoints.length - 1].close : 0);
            const yesterdayClose = rawPoints.length >= 2 ? rawPoints[rawPoints.length - 2].close : (meta.previousClose || currentPrice);
            const change1D = yesterdayClose > 0 ? ((currentPrice - yesterdayClose) / yesterdayClose) * 100 : 0;

            const firstClose = rawPoints[0]?.close || currentPrice;
            const oneWeekAgoIdx = Math.max(0, rawPoints.length - 6);
            const oneWeekClose = rawPoints[oneWeekAgoIdx]?.close || currentPrice;

            const change1W = oneWeekClose > 0 ? ((currentPrice - oneWeekClose) / oneWeekClose) * 100 : 0;
            const change3M = firstClose > 0 ? ((currentPrice - firstClose) / firstClose) * 100 : 0;

            // Normalize history to Base 100 for comparative co-movement
            const base100History = rawPoints.map((pt) => ({
              date: pt.date,
              value: parseFloat(((pt.close / firstClose) * 100).toFixed(2)),
            }));

            resolve({
              symbol,
              price: currentPrice,
              change1D: parseFloat(change1D.toFixed(2)),
              change1W: parseFloat(change1W.toFixed(2)),
              change3M: parseFloat(change3M.toFixed(2)),
              history: base100History,
              rawHistory: rawPoints,
            });
          } catch (err: any) {
            reject(err);
          }
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

// Common symbol alias mapping for NSE/BSE stocks
export const STOCK_SYMBOL_MAP: Record<string, string> = {
  WAAREE: 'WAAREEENER.NS',
  WAAREEENER: 'WAAREEENER.NS',
  ZEN: 'ZENTEC.NS',
  ZENTEC: 'ZENTEC.NS',
  MAPMYINDIA: 'MAPMYINDIA.NS',
  CEINFO: 'MAPMYINDIA.NS',
  MANIPALHOS: 'MANIPALHOS.BO',
  JUPITERWAG: 'JWL.NS',
  TATAMOTORS: 'TMPV.NS',
  FORCE: 'FORCEMOT.NS',
  LTIM: 'LTTS.NS',
  SUVENPHAR: 'SUVEN.NS',
  TRIL: 'TARIL.NS',
  VEDANTFASH: 'MANYAVAR.NS',
  AKZOINDIA: 'INDIGOPNTS.NS',
  'GE-SHIPPING': 'GESHIP.NS',
};

// In-memory stock history cache pre-seeded with verified live market closes
const stockHistoryCache = new Map<string, { data: any; cachedAt: number }>();
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours (daily rotation cadence)

try {
  const seedPath = path.join(process.cwd(), 'src', 'data', 'verifiedLiveMarketData.json');
  if (fs.existsSync(seedPath)) {
    const seedJson = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    if (seedJson.stocks) {
      const seededAt = Date.now();
      for (const [ticker, stockObj] of Object.entries(seedJson.stocks)) {
        stockHistoryCache.set(ticker.toUpperCase(), { data: stockObj, cachedAt: seededAt });
      }
    }
  }
} catch {
  // continue if seed file not accessible
}

export async function fetchStocksBatch(tickers: string[]): Promise<Record<string, any>> {
  const now = Date.now();
  const results: Record<string, any> = {};
  const tickersToFetch: string[] = [];

  for (const rawTicker of tickers) {
    const t = rawTicker.trim().toUpperCase();
    if (!t) continue;
    const cached = stockHistoryCache.get(t);
    if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
      results[t] = cached.data;
    } else {
      tickersToFetch.push(t);
    }
  }

  if (tickersToFetch.length > 0) {
    await Promise.allSettled(
      tickersToFetch.map(async (ticker) => {
        const symbol =
          STOCK_SYMBOL_MAP[ticker] || (ticker.includes('.') ? ticker : `${ticker}.NS`);

        try {
          const chartData = await fetchYahooChart(symbol);
          const stockResult = {
            ticker,
            symbol,
            price: chartData.price,
            change1D: chartData.change1D,
            change1W: chartData.change1W,
            change3M: chartData.change3M,
            history: chartData.history,
            rawHistory: chartData.rawHistory,
          };
          stockHistoryCache.set(ticker, { data: stockResult, cachedAt: now });
          results[ticker] = stockResult;
        } catch (err: any) {
          // If .NS failed and doesn't have an extension, try .BO as fallback
          if (!ticker.includes('.')) {
            try {
              const boSymbol = `${ticker}.BO`;
              const chartData = await fetchYahooChart(boSymbol);
              const stockResult = {
                ticker,
                symbol: boSymbol,
                price: chartData.price,
                change1D: chartData.change1D,
                change1W: chartData.change1W,
                change3M: chartData.change3M,
                history: chartData.history,
                rawHistory: chartData.rawHistory,
              };
              stockHistoryCache.set(ticker, { data: stockResult, cachedAt: now });
              results[ticker] = stockResult;
            } catch {
              // Fall back to existing cached entry if available
              const stale = stockHistoryCache.get(ticker);
              if (stale) {
                results[ticker] = stale.data;
              }
            }
          }
        }
      })
    );
  }

  return results;
}

