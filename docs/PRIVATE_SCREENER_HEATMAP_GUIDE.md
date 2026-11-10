# Private Screener mappings and sortable basic-industry heatmap

## Purpose

This change allows the project owner to activate the previously reviewed **313 user-supplied Screener company classifications** in the **Basic industries** view without adding their paid export or derived company list to this public GitHub repository. `src/data/screenerIndustryEvidence.json` remains an empty public placeholder.

## Activate locally

1. Open the deployed IndiaSectorTrends dashboard on the device you use for analysis (after the feature PR has been deployed).
2. Select **Basic industries** in the top navigation.
3. In the blue **Activate your 313 private Screener industry mappings** section, choose the file `IndiaSectorTrends_screener_evidence_PRIVATE.json` delivered privately in the chat.
4. The browser checks each exact tracked NSE ticker, canonical NSE basic-industry code, review date, and exact Screener industry source URL. It rejects duplicate, unknown or tampered rows and preserves existing NSE mappings on any overlap.
5. Accepted mappings are stored in this browser's `localStorage`, not uploaded to GitHub, Vercel, or an API. They affect industry heatmap, leaderboard, detail panel and coverage report on this browser only. Refreshing the page preserves the local import, unless the browser clears its site data.
6. **Remove local copy** clears the saved evidence and reverts the view to the public NSE-only mappings. Browser storage is not encrypted or shared among devices; users should treat the browser profile as private.

**No change** is made to the 62 curated investment themes or the GitHub scheduled daily closing-price fetch. Classification and price coverage are separate.

## Heatmap controls

The **Sort heatmap by** selector independently orders and colors basic-industry tiles using:

| Sort | Calculation | How to interpret |
| --- | --- | --- |
| Gaining momentum (default) | Last **5-session** return minus the **5-session-equivalent pace from the preceding 16 sessions** in the observed aligned 21-session cohort history | Positive means acceleration; could reflect a rebound after a drop |
| Relative strength vs NIFTY 500 · 1M | Industry 1M equal-weight return minus benchmark return over **identical session endpoints** | Positive = outperforming the benchmark (even if absolute performance is negative) |
| Highest return · 1W | Last five observed sessions | Short-term strength |
| Highest return · 1M | Last 21 observed sessions | Persistence across one month |
| Broadest participation · 1W | % of price-eligible mapped companies with positive one-week return | Above 50% = more advancers than decliners |
| Name · A–Z | Alphabetic | Manual browsing |

Missing values sort **last**; zero is a valid return, not missing. Color follows selected metric. For breadth, green means greater than 50%, red means below 50%. The filter can show all mapped industries, only sample-eligible cohorts, or accelerating sample-eligible cohorts.

**Quality warning:** A positive acceleration after a deeply negative month can be a bounce, not durable leadership. Confirm one-month return, NIFTY 500 relative strength, breadth, concentration and the cohort evidence status. Metrics are end-of-day, not intraday. Industries are cohorts drawn from the project's thematic universe, not all NSE-listed constituents, and static market-cap weights may be stale.

## Validation

`npm run lint`, `npx tsx --test src/utils/privateIndustryEvidence.test.ts src/utils/industryHeatmap.test.ts`, existing analytics/coverage tests and `npm run build` run in CI. Synthetic data only—no proprietary Screener records are committed.
