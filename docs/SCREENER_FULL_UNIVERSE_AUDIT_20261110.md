# One-pass full-universe Screener industry audit — 2026-11-10

**Source:** a user-supplied Screener.in Premium export containing 5,544 rows and the columns `NSE Code`, `ISIN Code`, `Industry Group`, `Industry`. **Source rights:** private supplied data. This document publishes only aggregate validation findings; **the Screener export and derived company-by-company evidence records are not committed to this public GitHub repository**.

## Whole thematic universe results

| Validation step | Count |
| --- | ---: |
| Distinct bundled thematic NSE ticker symbols | 452 |
| Distinct NSE symbols in user export | 3,246 |
| Matched thematic tickers with exact NSE code | 442 |
| Already NSE source-verified thematic classifications | 129 |
| Additional exact-symbol Screener records with checked NSE basic-industry code | **313** |
| Matched thematic records lacking a checked basic-industry code after catalog completion | **0** |
| Matched thematic records with Industry Group / NSE taxonomy parent mismatch | **0** |
| Matched thematic records differing from existing NSE labels | **0** |
| Theme symbols not found by exact NSE code | **10** |

The 22 missing NSE catalog codes and their macro/sector/industry parents were verified against the official July 2023 NSE taxonomy (https://nsearchives.nseindia.com/web/sites/default/files/inline-files/nse-indices_industry-classification-structure-2023-07.pdf) and added in this PR. One whitespace-only variation in the Screener export (`Telecom -  Equipment & Accessories`) is normalized to the canonical `Telecom - Equipment & Accessories` without changing its meaning. `Industry` is the basic classification; `Industry Group` is used as a parent-category consistency check. ISIN is preserved in the local reconciliation CSV for independent symbol/identity investigation.

The 442/452 figure applies to the **bundled thematic universe**. The saved market snapshot can include additional symbols, so do not claim 442/457 or full tracked-union coverage until the runtime audit is recomputed.

## Still missing: exact NSE symbol, not industry data

`FORCE`, `GE-SHIPPING`, `ICICIPRULI`, `JUPITERWAG`, `LTIM`, `RRP`, `SUVENPHAR`, `TATAMOTORS`, `TRIL`, `ZEN`.

Several appear to be renamed NSE securities (for example `GE-SHIPPING` vs `GESHIP`, `JUPITERWAG` vs `JWL`, `LTIM` vs `LTM`, `ZEN` vs `ZENTEC`), but **no alias is applied** without ISIN, effective date, demerger and historic price-series reconciliation. Treat the remaining symbols as unavailable, not as an industry inference.

## Run the reviewed full-universe import locally

From the project root, with a legally authorized export (do not commit the raw Screener file):

```bash
npm install
npx tsx scripts/reconcile-screener-industries.ts --input /private/query-results.csv --out /private/industry-audit.csv
```

With explicit permission to retain and share derived company classifications, produce a separately attributable source file:

```bash
npx tsx scripts/reconcile-screener-industries.ts --input /private/query-results.csv --out /private/industry-audit.csv --evidence-out /private/screenerIndustryEvidence.json --authorized-source
```

**Do not copy that evidence file into this public repo without checking the provider's redistribution rights.** The empty placeholder in `src/data/screenerIndustryEvidence.json` is intentional. Project acceptance of Screener as a trusted data source is different from permission to redistribute a substantial portion of its database. Screener terms: https://www.screener.in/guides/terms/ .

Existing direct NSE evidence remains authoritative when sources disagree. Editorial thematic guesses remain excluded from rankings. Current market prices, basket memberships and corporate-action history are unchanged.

## Tests

`npm run lint`, `npx tsx --test src/utils/basicIndustryCoverage.test.ts src/utils/screenerIndustryReview.test.ts`, `npx tsx scripts/review-basic-industry-import.ts --coverage`, and `npm run build`.

CI uses synthetic Screener CSV fixtures and does not require or upload the user's paid data. The report is factual as of the user-provided export and not a real-time NSE quote update.
