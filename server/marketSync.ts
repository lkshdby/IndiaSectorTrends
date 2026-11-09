import https from 'https';
import fs from 'fs';
import path from 'path';
import { THEMATIC_SECTOR_INDICES } from '../src/data/sectorUniverse';
import { validateAndRepairStock, sanitizeSnapshot } from '../src/utils/priceQuality';

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

            const rawPoints: { date: string; close: number }[] = [];

            for (let i = 0; i < timestamps.length; i++) {
              const val = quotes[i];
              if (val !== null && val !== undefined && !isNaN(val)) {
                const d = new Date(timestamps[i] * 1000);
                const formattedDate = d.toISOString().slice(0, 10);
                rawPoints.push({
                  date: formattedDate,
                  close: parseFloat(val.toFixed(2)),
                });
              }
            }

            // Real market price & accurate 1D (yesterday close), 1W (5 trading days ago), 3M (range start)
            if (rawPoints.length < 2) return reject(new Error('Insufficient daily closing history'));
            // Avoid mismatched intraday/meta quotes (notably DRONE.NS in cached data).
            // All metrics here refer to observed daily closes, not live intraday ticks.
            const currentPrice = rawPoints[rawPoints.length - 1].close;
            const quoteDrift = meta.regularMarketPrice && currentPrice
              ? Math.abs(meta.regularMarketPrice / currentPrice - 1) * 100 : 0;
            if (quoteDrift > 5) {
              console.warn(`[QUOTE-DIVERGENCE] ${symbol}: meta ${meta.regularMarketPrice} vs daily close ${currentPrice}`);
            }
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
  ETERNAL: 'ETERNAL.NS',
  ZOMATO: 'ETERNAL.NS',
  ZEN: 'ZENTEC.NS',
  ZENTEC: 'ZENTEC.NS',
  MAPMYINDIA: 'MAPMYINDIA.NS',
  CEINFO: 'MAPMYINDIA.NS',
  MANIPALHOS: 'MANIPALHOS.BO',
  JUPITERWAG: 'JWL.NS',
  TATAMOTORS: 'TMPV.NS',
  TMCV: 'TMCV.NS',
  FORCE: 'FORCEMOT.NS',
  LTIM: 'LTM.NS',
  LTM: 'LTM.NS', // NSE symbol changed effective 27 February 2026
  SUVENPHAR: 'SUVEN.NS',
  TRIL: 'TARIL.NS',
  VEDANTFASH: 'MANYAVAR.NS',
  AKZOINDIA: 'INDIGOPNTS.NS',
  'GE-SHIPPING': 'GESHIP.NS',
};

// In-memory stock history cache pre-seeded with verified live market closes
const stockHistoryCache = new Map<string, { data: any; cachedAt: number }>();
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours (daily rotation cadence)

export interface SyncSchedulerStatus {
  timezone: string;
  scheduledTimesIST: string[];
  lastSyncAt: string | null;
  lastSyncReason: string;
  isSyncInProgress: boolean;
  totalTrackedStocks: number;
}

let lastSyncAt: string | null = null;
let lastSyncReason = 'Pre-verified NSE/BSE Snapshot';
let isSyncInProgress = false;
const triggeredSlots = new Set<string>();

try {
  const seedPath = path.join(process.cwd(), 'src', 'data', 'verifiedLiveMarketData.json');
  if (fs.existsSync(seedPath)) {
    const seedJson = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    if (seedJson.fetchedAt || seedJson.syncedAt) {
      lastSyncAt = seedJson.fetchedAt || seedJson.syncedAt;
    }
    if (seedJson.stocks) {
      const seededAt = Date.parse(seedJson.fetchedAt || seedJson.syncedAt || '') || 0;
      const cleaned = sanitizeSnapshot(seedJson.stocks);
      for (const [ticker, stockObj] of Object.entries(cleaned)) {
        stockHistoryCache.set(ticker.toUpperCase(), { data: stockObj, cachedAt: seededAt });
      }
    }
  }
} catch {
  // continue if seed file not accessible
}

export async function fetchStocksBatch(
  tickers: string[],
  forceRefresh = false
): Promise<Record<string, any>> {
  const now = Date.now();
  const results: Record<string, any> = {};
  const tickersToFetch: string[] = [];

  for (const rawTicker of tickers) {
    const t = rawTicker.trim().toUpperCase();
    if (!t) continue;
    const cached = stockHistoryCache.get(t);
    if (!forceRefresh && cached && now - cached.cachedAt < CACHE_TTL_MS) {
      results[t] = cached.data;
    } else {
      tickersToFetch.push(t);
    }
  }

  if (tickersToFetch.length > 0) {
    // Process in polite batches of 15 to avoid Yahoo Finance rate limiting
    const BATCH_SIZE = 15;
    for (let i = 0; i < tickersToFetch.length; i += BATCH_SIZE) {
      const batch = tickersToFetch.slice(i, i + BATCH_SIZE);
      await Promise.allSettled(
        batch.map(async (ticker) => {
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
              fetchedAt: new Date().toISOString(),
            };
            const checked = validateAndRepairStock(stockResult);
            if (!checked.record) {
              console.warn(`[QUARANTINED] ${ticker}: ${checked.warnings.join('; ')}`);
              return;
            }
            stockHistoryCache.set(ticker, { data: checked.record, cachedAt: now });
            results[ticker] = checked.record;
          } catch {
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
                  fetchedAt: new Date().toISOString(),
                };
                const checked = validateAndRepairStock(stockResult);
                if (!checked.record) {
                  console.warn(`[QUARANTINED] ${ticker}: ${checked.warnings.join('; ')}`);
                  return;
                }
                stockHistoryCache.set(ticker, { data: checked.record, cachedAt: now });
                results[ticker] = checked.record;
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
  }

  return results;
}

/**
 * Full-universe pull of all 456 stocks + 4 benchmarks, persisting to verifiedLiveMarketData.json
 */
export async function runFullUniverseSync(reason = 'Scheduled IST Pull'): Promise<{
  success: boolean;
  updatedStocksCount: number;
  totalRequestedCount: number;
  syncedAt: string;
}> {
  if (isSyncInProgress) {
    return {
      success: false,
      updatedStocksCount: 0,
      totalRequestedCount: stockHistoryCache.size,
      syncedAt: lastSyncAt || new Date().toISOString(),
    };
  }

  isSyncInProgress = true;
  try {
    const seedPath = path.join(process.cwd(), 'src', 'data', 'verifiedLiveMarketData.json');
    let existingJson: any = { benchmarks: {}, stocks: {} };
    if (fs.existsSync(seedPath)) {
      existingJson = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    }

    // Include the entire curated constituent universe, not only stocks in the seed cache.
    const allTickers = Array.from(
      new Set([
        ...THEMATIC_SECTOR_INDICES.flatMap(sector => sector.stocks.map(stock => stock.ticker)),
        ...Object.keys(existingJson.stocks || {}),
        ...Array.from(stockHistoryCache.keys()),
      ])
    );

    const syncStartedAt = Date.now();
    const refreshedStocks = await fetchStocksBatch(allTickers, true);
    const mergedStocks = {
      ...sanitizeSnapshot(existingJson.stocks || {}),
      ...refreshedStocks,
    };
    const refreshedCount = Object.values(refreshedStocks).filter((s: any) =>
      s?.fetchedAt && Date.parse(s.fetchedAt) >= syncStartedAt
    ).length;

    // Refresh the 4 benchmarks as well
    const benchmarkConfigs = [
      { key: 'nifty50', symbol: '^NSEI', name: 'NIFTY 50', category: 'Large Cap Benchmark (Top 50 Giants)', indexPrice: 25030.35 },
      { key: 'niftyMidcap', symbol: 'MOM100.NS', name: 'NIFTY Midcap 100', category: 'Mid Cap Benchmark (Next 100 Growth Leaders)', indexPrice: 60606.65 },
      { key: 'niftySmallcap', symbol: 'SML100CASE.NS', name: 'NIFTY Smallcap 100', category: 'Small Cap Benchmark (High-Beta Emerging 100)', indexPrice: 18975.05 },
      { key: 'nifty500', symbol: '^CRSLDX', name: 'NIFTY 500', category: 'Broad Market Universe (94%+ Total Market Cap)', indexPrice: 23456.95 },
    ];

    const refreshedBenchmarks: Record<string, any> = { ...(existingJson.benchmarks || {}) };
    await Promise.allSettled(
      benchmarkConfigs.map(async (cfg) => {
        try {
          const data = await fetchYahooChart(cfg.symbol);
          refreshedBenchmarks[cfg.key] = {
            ...cfg,
            price: data.price || cfg.indexPrice,
            change1D: data.change1D,
            change1W: data.change1W,
            change3M: data.change3M,
            history: data.history,
          };
        } catch {
          // keep existing benchmark entry on transient error
        }
      })
    );

    const nowIso = new Date().toISOString();
    lastSyncAt = nowIso;
    lastSyncReason = reason;

    const updatedPayload = {
      fetchedAt: nowIso,
      lastSyncReason: reason,
      benchmarks: refreshedBenchmarks,
      stocks: mergedStocks,
    };

    try {
      fs.writeFileSync(seedPath, JSON.stringify(updatedPayload, null, 2), 'utf-8');
    } catch {
      // ignore if read-only container filesystem
    }

    return {
      success: refreshedCount > 0,
      updatedStocksCount: refreshedCount,
      totalRequestedCount: allTickers.length,
      syncedAt: nowIso,
    };
  } finally {
    isSyncInProgress = false;
  }
}

/**
 * Ensures that if the Cloud Run container slept through the 2:00 AM / 4:00 AM IST window,
 * it automatically triggers a catch-up background pull as soon as the server wakes up.
 */
export function ensureFreshDailySync() {
  if (isSyncInProgress) return;
  try {
    const lastMs = lastSyncAt ? new Date(lastSyncAt).getTime() : 0;
    const ageHours = (Date.now() - lastMs) / (1000 * 60 * 60);
    if (!lastMs || ageHours >= 6) {
      runFullUniverseSync('Auto Wake-Up Catch-Up Sync (IST)').catch((err) =>
        console.warn('Auto wake-up sync error:', err)
      );
    }
  } catch {
    // ignore
  }
}

export function getMarketSyncStatus(): SyncSchedulerStatus {
  ensureFreshDailySync();
  return {
    timezone: 'Asia/Kolkata (IST)',
    scheduledTimesIST: [
      '18:30 IST (Post-Market EOD & Bhavcopy Settlement Pull)',
      '02:00 IST (Overnight Primary Batch Pull)',
      '04:00 IST (Pre-Market Corporate Action & Reconciliation Pull)',
    ],
    lastSyncAt,
    lastSyncReason,
    isSyncInProgress,
    totalTrackedStocks: stockHistoryCache.size,
  };
}

/**
 * Starts automated daily pulls in Indian Standard Time (IST):
 * 1) 18:30 IST (6:30 PM) - Right after NSE/BSE final closing settlement & Bhavcopy release
 * 2) 02:00 IST (2:00 AM) - Overnight full-universe pull
 * 3) 04:00 IST (4:00 AM) - Pre-market verification & corporate action adjustment pull
 * Plus an automatic wake-up catch-up check if the container was idle overnight.
 */
export function startMarketSyncScheduler() {
  const TARGET_SLOTS: Record<string, string> = {
    '18:30': '18:30 IST Post-Market Settlement Pull',
    '02:00': '02:00 IST Overnight Primary Pull',
    '04:00': '04:00 IST Pre-Market Verification Pull',
  };

  // Run an initial freshness check shortly after server boot
  setTimeout(() => {
    ensureFreshDailySync();
  }, 5000);

  setInterval(() => {
    try {
      const nowIST = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      );
      const yyyy = nowIST.getFullYear();
      const mm = String(nowIST.getMonth() + 1).padStart(2, '0');
      const dd = String(nowIST.getDate()).padStart(2, '0');
      const hh = String(nowIST.getHours()).padStart(2, '0');
      const min = String(nowIST.getMinutes()).padStart(2, '0');

      const hhmm = `${hh}:${min}`;
      const slotKey = `${yyyy}-${mm}-${dd}_${hhmm}`;

      if (TARGET_SLOTS[hhmm] && !triggeredSlots.has(slotKey)) {
        triggeredSlots.add(slotKey);
        runFullUniverseSync(TARGET_SLOTS[hhmm]).catch((err) =>
          console.warn(`Scheduled market sync (${hhmm} IST) error:`, err)
        );
      }
    } catch {
      // ignore timezone formatting issues
    }
  }, 30 * 1000);
}




/**
 * Complete in-memory, validated snapshot for frontend rehydration.
 * This does not trigger 452 independent network fetches.
 */
export function getVerifiedStockSnapshot(): { stocks: Record<string, any>; fetchedAt: string | null } {
  return {
    stocks: Object.fromEntries(Array.from(stockHistoryCache, ([ticker, entry]) => [ticker, entry.data])),
    fetchedAt: lastSyncAt,
  };
}
