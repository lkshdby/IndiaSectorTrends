# Private Screener CSV → NSE daily price monitoring — owner's approval bridge

## Why this exists

Previously, importing the full Screener export into browser storage made new industry peers visible **but did not add them to scheduled Yahoo closing-price collection**. The collector runs in GitHub Actions and has no access to a user's browser localStorage. This PR bridges that gap **without uploading licensed Screener records or storing GitHub tokens in the browser**.

## Workflow

1. In **Stock Leaders · Research → Wider universe**, the owner imports the full Screener CSV (once per browser; current local data is reused). The reduced company/ISIN/industry/market-cap research pool stays in local browser storage.
2. **Turn your Screener CSV into daily stock monitoring** screens that private pool against the 62 themes' core-member basic industries. The **Across all 62 themes** option screens all suitable candidates; **Selected theme** restricts to its corresponding industries. This is a heuristic peer search, not a verification of thematic exposure.
3. The owner explicitly chooses up to **20 NSE ticker symbols** at once, or chooses **Select up to 20**. The screen opens a **prefilled GitHub issue** containing only those ticker strings and an explicit acknowledgement. They must press **Submit new issue** on GitHub to approve; clicking the dashboard button does not submit anything by itself.
4. GitHub's `approve-nse-monitoring.yml` runs on an issue opened by the repository OWNER (`lkshdby`) only. A separate TypeScript validator double-checks the event identity, exact marker, explicit acknowledgement, valid unique NSE ticker format, max 20 per request, and max **150** additional monitored tickers total. It filters already curated or monitored symbols. It writes only `src/data/priceMonitoringSymbols.json`.
5. The same workflow commits the symbol-only manifest and requests a fresh market-data workflow via GitHub Actions. If the dispatch fails, the committed monitor list remains and the next scheduled 18:30/02:00/04:00 IST refresh can pick it up. A GitHub issue comment explains acceptance; that is **not** proof the price provider returned a valid quote.
6. `server/marketSync.ts` includes these approved tickers in its daily fetch, but disallows `.BO` fallback on monitoring-only NSE symbols. Their validated daily histories are saved in `src/data/verifiedLiveMarketData.json`, with independent `priceMonitoring` requested/refreshed/unresolved metadata. The existing **>=90% thematic freshness**, **no empty core basket** and **four benchmark** quality gates are unchanged. A missing optional monitor does **not** incorrectly fail the main 453-stock snapshot.
7. Back in the dashboard, press **Refresh monitoring status** to see approved symbols and whether the most recent snapshot contains a fresh validated NSE close history. Their listing and financial relevance still need review, and **no monitored stock becomes core/adjacent/proxy in a theme automatically**.

## Security and data boundaries

- Public repository: only symbols the owner explicitly approves, plus normal stock closing prices. **No private CSV, Screener industry group, ISIN, market cap or company display name is posted to GitHub** by this bridge.
- GitHub issue contents are public ticker-only text. The action never executes body text as a shell command; it reads the event file and validates fields before writing a JSON-only manifest.
- The GitHub issue intake is restricted to new issues opened by the repository owner, with a second code-level association/login check. Malformed, duplicate, oversized or unapproved requests are rejected.
- Monitoring is independent of theme membership to avoid retroactively choosing price winners as constituents. A separate date-stamped company exposure/ISIN/financial-evidence review is required before adding a stock to a theme.
- Input Screener industry is a screening hint only; matching the same basic industry does not prove the company participates in the selected specialized theme.

## Boundaries / realistic expectations

- Existing user-imported CSV remains private and usable immediately once the new UI deploys; no need to upload the CSV again on the same browser.
- The new monitored list begins **empty**. Initial daily additional-symbol coverage is **zero** until the owner actually submits an approval issue and the GitHub workflow commits it.
- Capped at **20 tickers per issue** and **150 additional tickers total**, protecting Yahoo provider capacity and the 45-minute collection window. These are conservative starter caps, not evidence that all Yahoo responses can be fetched at every slot.
- A provider may return no valid NSE history, quarantine a split, or rate-limit requests. The dashboard distinguishes accepted monitoring from validated recent price coverage.
- The monitor list is a research input. It is **not yet a cross-market rotation index**: the additional symbols are not included in the 62 core-basket rotation calculations. That requires separate theme-exposure verification, timestamped membership decisions, and liquidity checks.
- Before treating this as investible research, validate symbol-to-ISIN identity, free float, liquidity and corporate actions. No all-3,000-symbol snapshot, automatic institutional-flow inference or proven alpha is claimed.

## Test

`npx tsx --test src/utils/priceMonitoring.test.ts` verifies symbol-only issues, rejects unauthorized actors and malformed requests, protects the watchlist cap, and confirms the full private candidate pool does not automatically alter a thematic basket. Full CI also type-checks and builds.

## Research after approval: discover actual stock price leadership

Once the public monitoring manifest contains approved symbols and the collector has obtained exact-date NSE histories, the same private candidate screen displays **Emerging stock leaders in the approved monitoring universe**, ranked by latest five-session benchmark-relative momentum acceleration against the preceding sixteen-session pace. It includes separate 5D absolute return, 5D/21D NIFTY 500 relative returns and a visible **Awaiting history** state for missing, mismatched or quarantined quotations.

The extra leaderboard is deliberately independent of all 62 curated index memberships. The private import is useful twice: (1) identifying candidates across the broad export, and (2) explaining their industry when actual fresh price histories have been captured. The public stock snapshot has only validated daily closes and ticker-only owner approvals; it does not publish private Screener fields.
