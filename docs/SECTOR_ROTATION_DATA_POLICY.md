# Sector Rotation Engine — data and membership policy

This file describes the stock-price dashboard added in the November 2026 data-quality update.
It does **not** certify the investment merit or full business-segment composition of any company.

## What the engine actually measures

- **Raw market series:** daily bars from Yahoo Finance's public chart endpoint, not direct NSE/BSE bhavcopies. The most recent bar can be an unfinished intraday session if refreshed during trading hours. Screener.in /market/ snapshots are a separate industry-fundamentals data pipeline.
- **Sector coverage:** 62 manually curated, non-exhaustive baskets, drawn from listed Indian companies. These are **not official NSE sector indices** and are not necessarily representative of all listed companies in an industry.
- **Core versus thematic:** `src/data/sectorUniverse.ts` assigns reviewed theme fits to **core**, **adjacent**, **proxy** or **excluded**. Only core names feed prebuilt sector performance. Others remain visible as opportunity candidates and available for custom user-created indices. Basket definitions without a rule are **provisional**, not independently audited.
- **Weighting:** equal-weight or stored total-market-cap snapshot weights. This is **not** a free-float-adjusted, periodically rebalanced NSE/BSE investable index. Highly concentrated baskets require caution.
- **Indicators:** price returns and relative price strength do **not** prove institutional money flow, buying, or selling.
- **Benchmarks:** Nifty 50 and Nifty 500 are intended index histories; Midcap 100 (`MOM100`) and Smallcap 100 (`SML100CASE`) are **ETF proxies**, with tracking differences. Never show a fabricated ETF quote using index-level points.

## Source and freshness controls

1. `server/marketSync.ts` pulls daily closing bars with full ISO calendar dates, and uses the **last observed close** as the price for derived returns rather than mixing it with `meta.regularMarketPrice`.
2. `src/utils/priceQuality.ts` reconstructs returns from consecutive observed closing bars and normalizes historical price paths from the same data. It repairs incompatible quote-versus-close records (the DRONE case) but **quarantines** unverified one-session jumps above 40%, which may be bad data or corporate actions. A stock without sufficient history does not qualify for three-month basket rankings.
3. Validated, in-memory prices are exposed by `GET /api/stocks-snapshot`; the UI reloads the **full universe** after manual refresh instead of refreshing only the selected sector. If a fetch fails, the backend can still retain older validated prices; such data may remain stale.
4. Verified cache is a **local runtime cache**, not a guaranteed durable data store. A read-only hosting filesystem may discard server-side updates upon restart. Periodic scheduled refreshes require a running scheduler and working network access.
5. Historic legacy labels like `9 Nov` remain supported for the old bundled snapshot. Newly fetched bars use `YYYY-MM-DD`; **full-year date matching across legacy data is still a migration task**.
6. A check against exchange-provided closing prices, corporate-action files, and trading volume is **not yet automated**. The quality gate checks internal coherence, not independent NSE/BSE authentication of every observation.

## Membership standards / current caveats

- Avoid using a diversified internet platform in a pure quick-commerce index purely because it is consumer-facing.
- Keep financing companies separate from equipment makers; infrastructure suppliers can remain thematic beneficiaries.
- Exclude entities operating entirely different businesses (for example, a small finance bank from diagnostics).
- Use `TMCV` in the commercial-vehicle basket and `TATAMOTORS` (mapped to `TMPV`) in passenger vehicles following the demerger.
- AMC operating companies and RTA/financial-infrastructure providers belong to distinct core indices.
- Non-core thematic companies must not change the core index just because they have unusually strong returns.
- Some themes remain broad and mixed, especially Geospatial/Drones/Smart Metering, Renewables, and Telecom Operators/Equipment. Future versions should split them when there are enough genuine core companies.
- Overlap is allowed with a valid documented business rationale, not treated as proof of correlation or sector membership.
- Where feasible, tag each company with audited segment revenue exposure, data source, share of revenue, date, market segment, liquidity, trading lot, and primary/secondary exchange symbol.

## Future audit tasks (not implied as implemented)

- **Exchange reconciliation:** Cross-check current close, series, face value, traded volume, split/bonus adjustments, and ISIN using NSE/BSE data; alert on disparities.
- **All-company business verification:** Independently review all ~450 unique tickers and update the default provisional memberships. Editorial rules presently cover a subset of baskets.
- **Real liquidity filter:** Average traded value, bid-ask spreads, circuit prevalence and SME lot sizes. The old static constituent `volume` field was a placeholder (850000) and is not evidence of trading activity.
- **Dynamic market caps:** Dated shares outstanding, free-float factors, periodic rebalancing, and delisting/IPO treatment.
- **Long history:** Build a persistent corporate-action-adjusted time series, not the current rolling ~3-month window.
- **Thematic expansion:** Assess oil and gas, textiles, consumables, industrial exports, and SME manufacturing without forcing companies into inappropriate categories.
- **Signal calibration:** Backtest breadth, relative strength, persistence, concentration and subsequent excess returns before claiming predictive efficacy.

## Verification on every PR

`npm run lint`, `npx tsx --test src/utils/sectorIndexMath.test.ts`,
`npx tsx --test src/utils/priceQuality.test.ts`,
`npx tsx --test src/data/sectorUniverse.test.ts`, and `npm run build`.
