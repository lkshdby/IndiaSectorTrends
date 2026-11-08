import https from 'https';

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
  price: number;
  change1D: number;
  change1W: number;
  change3M: number;
  history: { date: string; value: number }[];
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
            const meta = result.meta;
            const currentPrice = meta.regularMarketPrice || 0;
            const prevClose = meta.chartPreviousClose || currentPrice;
            const change1D = prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : 0;

            const timestamps: number[] = result.timestamp || [];
            const quotes = result.indicators?.quote?.[0]?.close || [];

            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const historyPoints: { date: string; value: number }[] = [];

            for (let i = 0; i < timestamps.length; i++) {
              const val = quotes[i];
              if (val !== null && val !== undefined && !isNaN(val)) {
                const d = new Date(timestamps[i] * 1000);
                const formattedDate = `${d.getDate()} ${monthNames[d.getMonth()]}`;
                historyPoints.push({
                  date: formattedDate,
                  value: parseFloat(val.toFixed(2)),
                });
              }
            }

            // Calculate 1W and 3M change
            const firstVal = historyPoints[0]?.value || currentPrice;
            const oneWeekAgoIdx = Math.max(0, historyPoints.length - 6);
            const oneWeekVal = historyPoints[oneWeekAgoIdx]?.value || currentPrice;

            const change1W = oneWeekVal > 0 ? ((currentPrice - oneWeekVal) / oneWeekVal) * 100 : 0;
            const change3M = firstVal > 0 ? ((currentPrice - firstVal) / firstVal) * 100 : 0;

            // Normalize history to Base 100 for easy relative strength comparison
            const base100History = historyPoints.map((pt) => ({
              date: pt.date,
              value: parseFloat(((pt.value / firstVal) * 100).toFixed(2)),
            }));

            resolve({
              price: currentPrice,
              change1D: parseFloat(change1D.toFixed(2)),
              change1W: parseFloat(change1W.toFixed(2)),
              change3M: parseFloat(change3M.toFixed(2)),
              history: base100History,
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
