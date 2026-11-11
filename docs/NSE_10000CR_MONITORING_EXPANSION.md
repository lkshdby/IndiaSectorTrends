# NSE ₹10,000 Cr+ monitoring expansion (2026-11-11)

This change adds 250 additional **NSE ticker codes only** to the daily monitoring universe. They complement 300 ≥₹10,000 Cr companies already present in curated theme baskets and 40 previously approved monitored symbols, covering 590 qualifying NSE symbols in the private user's Screener snapshot.

## Scope and privacy
- Eligibility: valid NSE code and **export-time** market cap ≥₹10,000 crore in the user's provided Screener CSV. This is **not a live market-cap filter** and is not a claim of current NSE quote availability.
- Public GitHub data: ticker codes only. No proprietary Screener CSV rows, ISINs, industries, company names or market-cap figures are published from the export.
- Existing curated theme membership is unchanged. The new symbols are monitored price-only research candidates and not investment recommendations.
- Duplicate symbols already in curated baskets or previously approved monitoring are excluded from the additional list.
- Symbols that Yahoo cannot resolve remain unresolved; no BSE quote is substituted for monitoring-only NSE candidates.

## Yahoo polling strategy
- Each scheduled sync still requests all curated stocks and approved NSE monitors (not just the latest group of 20 approved on GitHub).
- Concurrent requests are capped at 3; batches pause 1,400 milliseconds, with bounded exponential-ish backoff on HTTP 429, 500, 502–504, and network timeouts.
- Transient provider errors do not trigger an additional BSE fallback request. Previously validated closes survive failed collections; no fabricated data is published.
- The existing quality gates (≥90% fresh thematic tickers, every core basket represented, fresh benchmarks) still control whether a snapshot is committed.
- Scheduled GitHub Action remains three times per IST calendar day; onboarding a large manifest does not require 13 separate approval issues.
