import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  generateHistoryFromLiveSectors,
  getAllSnapshots,
  getSchedulerInfo,
  initializeDataStore,
  performDaily7PMFetch,
  persistSnapshots,
  startBackgroundCron,
} from './server/fetcher';
import { scrapeScreenerMarket } from './server/screenerScraper';
import { fetchYahooChart } from './server/marketSync';

// In-memory cache for benchmarks
let cachedBenchmarks: any = null;
let lastBenchmarkFetchTime = 0;

async function getLiveBenchmarks() {
  const now = Date.now();
  if (cachedBenchmarks && now - lastBenchmarkFetchTime < 3600000) {
    return cachedBenchmarks;
  }

  const benchmarkConfigs = [
    { key: 'nifty50', symbol: '^NSEI', name: 'NIFTY 50', category: 'Large Cap Benchmark' },
    { key: 'niftyMidcap', symbol: 'MOM100.NS', name: 'NIFTY Midcap 100', category: 'Mid Cap Benchmark' },
    { key: 'niftySmallcap', symbol: 'SML100CASE.NS', name: 'NIFTY Smallcap 100', category: 'Small Cap Benchmark' },
    { key: 'nifty500', symbol: '^CRSLDX', name: 'NIFTY 500', category: 'Broad Market Universe' },
  ];

  const results: Record<string, any> = {};

  await Promise.allSettled(
    benchmarkConfigs.map(async (cfg) => {
      try {
        const data = await fetchYahooChart(cfg.symbol);
        results[cfg.key] = {
          ...cfg,
          price: data.price,
          change1D: data.change1D,
          change1W: data.change1W,
          change3M: data.change3M,
          history: data.history,
        };
      } catch (err: any) {
        console.warn(`Could not fetch live benchmark for ${cfg.symbol}:`, err.message);
      }
    })
  );

  if (Object.keys(results).length > 0) {
    cachedBenchmarks = results;
    lastBenchmarkFetchTime = now;
  }

  return cachedBenchmarks || results;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parsing
  app.use(express.json({ limit: '50mb' }));

  // Initialize data store
  initializeDataStore();
  // startBackgroundCron(); // Disabled: Screener sync retired

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Live Benchmarks (NIFTY 50, NIFTY Midcap 100, NIFTY Smallcap 100, NIFTY 500)
  app.get('/api/benchmarks', async (req, res) => {
    try {
      const benchmarks = await getLiveBenchmarks();
      res.json({ success: true, benchmarks });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get all snapshots
  app.get('/api/data', (req, res) => {
    try {
      const data = getAllSnapshots();
      res.json({ success: true, count: data.length, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Save / Sync snapshots
  app.post('/api/data', (req, res) => {
    try {
      const { snapshots } = req.body;
      if (!Array.isArray(snapshots)) {
        return res.status(400).json({ success: false, error: 'snapshots must be an array' });
      }
      persistSnapshots(snapshots);
      res.json({ success: true, count: snapshots.length, message: 'Dataset updated successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Trigger manual on-demand fetch from https://www.screener.in/market/
  app.post('/api/fetch-now', async (req, res) => {
    try {
      const { targetDate, force } = req.body || {};
      const result = await performDaily7PMFetch(targetDate, force !== undefined ? force : true);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Reset & Re-fetch 188 sectors directly from Screener.in /market/
  app.post('/api/reset-seed', async (req, res) => {
    try {
      const scraped = await scrapeScreenerMarket();
      const today = new Date().toISOString().split('T')[0];
      const history = generateHistoryFromLiveSectors(scraped.sectors, '2025-08-20', today);
      
      const todaySnapshot = {
        date: today,
        timestamp: new Date(`${today}T19:00:00+05:30`).getTime(),
        sectors: scraped.sectors,
        fetchedAt: scraped.fetchedAt,
        source: scraped.url,
      };

      const existingIdx = history.findIndex((s) => s.date === today);
      if (existingIdx >= 0) {
        history[existingIdx] = todaySnapshot;
      } else {
        history.push(todaySnapshot);
      }

      persistSnapshots(history);
      res.json({
        success: true,
        count: history.length,
        industryCount: scraped.industryCount,
        message: `Successfully re-scraped https://www.screener.in/market/ with ${scraped.industryCount} industry sectors and generated historical series.`,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get scheduler status
  app.get('/api/scheduler-status', (req, res) => {
    try {
      const info = getSchedulerInfo();
      res.json({ success: true, info });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // CSV Export endpoint
  app.get('/api/export/csv', (req, res) => {
    try {
      const snapshots = getAllSnapshots();
      const headers = [
        'Date',
        'Sector',
        'No. of Companies',
        'Total Market Cap (Cr)',
        'Median Market Cap (Cr)',
        'Median P/E',
        'Wtd. Avg Sales Growth (%)',
        'Wtd. Avg OPM (%)',
        'Wtd. Avg ROCE (%)',
        'Median 1Y Return (%)',
      ];

      const rows: string[] = [headers.join(',')];

      snapshots.forEach((snap) => {
        snap.sectors.forEach((s) => {
          rows.push(
            [
              snap.date,
              `"${s.sector.replace(/"/g, '""')}"`,
              s.noOfCompanies,
              s.totalMarketCap,
              s.medianMarketCap,
              s.medianPE,
              s.wtdAvgSalesGrowth,
              s.wtdAvgOPM,
              s.wtdAvgROCE,
              s.median1YReturn,
            ].join(',')
          );
        });
      });

      const csvContent = rows.join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="screener_industry_trends_${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csvContent);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // JSON Export endpoint
  app.get('/api/export/json', (req, res) => {
    try {
      const snapshots = getAllSnapshots();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="screener_industry_trends_${new Date().toISOString().split('T')[0]}.json"`);
      res.send(JSON.stringify(snapshots, null, 2));
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Explicitly serve static public assets (favicons, apple-touch-icons, manifests)
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`screener.in industry trends server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
