# Phase 2 foundation — NSE basic-industry research alongside 62 themes

## What was added

A top-level **Basic industries** tab alongside **Investment themes · 62**, with:
- A searchable candidate list seeded from the exact industry names the user supplied.
- NSE basic-industry **codes and four-level parent hierarchy only for rows explicitly checked**
  against the linked July 2023 NSE classification structure document.
- Dated, source-linked **company classifications** from individual NSE equity quote pages.
- A source-verified stock-cohort heatmap and industry leaderboard, with price-return,
  relative-strength versus NIFTY 500, participation breadth, coverage, and static
  market-cap concentration diagnostics.
- A detail inspector showing which individual symbols and NSE pages support each row.
- Links from these basic-industry cohorts back to the 62 existing thematic research baskets.
- Explicit **unmapped**, **single stock**, **limited sample** and **insufficient price
  data** labels. No return is calculated for unverified classifications.

## Crucial distinction: initial evidence is NOT the complete NSE stock master

NSE states that its published classification has **12 macro sectors, 22 sectors,
59 industries and 197 basic industries**. This PR does **not** claim to reproduce
the complete current taxonomy or its full company membership.

The user-provided names are a **candidate reference catalog**. Any label without
a checked NSE code or parent is left explicitly unresolved; it is not assigned
to a guessed parent. Source-verified company mappings are **only an initial
sample**, not the full set of Indian listed companies or all companies in
each basic industry.

The current `rankable` condition (at least five aligned verified sample
stocks, >=80% coverage of the currently mapped sample, and largest stored market
cap weight below 65%) means **rankable within the confirmed sample only**.
It is NOT proof of coverage of an entire NSE industry. Do not compare the
sample as if it were a comprehensive NSE index, an official index, a
live market quote, or a measure of institutional buying.

The industry aggregates use the existing saved market JSON and the same
date-aligned price-index builder as the thematic indices. They are price
returns, not corporate-action-adjusted total returns. Market caps are static
editorial estimates, not NSE free-float weights. No synthetic prices are added.

## Industry and company mapping sources

- NSE methodology and 197-industry framework:
  https://www.nseindia.com/static/products-services/industry-classification
- July 2023 NSE structure, including industry codes and parentage:
  https://nsearchives.nseindia.com/web/sites/default/files/inline-files/nse-indices_industry-classification-structure-2023-07.pdf
- Seed evidence for mapped company symbols: linked source by source in
  `src/data/basicIndustryMappings.ts`. These are NSE equity pages that explicitly
  identify the company's Basic Industry. The records include a review date.

### Extending mappings safely

1. Confirm the company's *current* NSE symbol/ISIN (including any demerger
   or rename) and its specific **Basic Industry** via NSE sources.
2. Verify that the code and parent hierarchy match the classification structure.
3. Add one auditable `ticker -> basicIndustry + sourceUrl + verifiedOn` record
   to `src/data/basicIndustryMappings.ts`.
4. Add a checked code/parent row to `src/data/basicIndustryCatalog.ts` when
   needed. **Never infer parentage or company membership from the 62 themes**.
5. Run the automated validation suite and review any missing price histories
   against the committed market data. If the new symbol is outside the existing
   GitHub refresh universe, it needs a separately reviewed addition to the
   scheduled collector; this PR does not silently expand that universe.
6. Record the **official classification version/effective date**, and review
   changes after annual reports, ticker changes and corporate actions.

Before treating industry league tables as comprehensive, procure or
independently verify the authoritative full mapping, check its licensing/
permitted uses, store source and review date for each record, and measure
real industry-level *universe completeness* rather than coverage of the
currently seeded sample.

## Unchanged

- All 62 thematic sector definitions and index calculation paths.
- Existing manual stock watchlists and custom indices.
- The three GitHub scheduled refresh slots: 18:30, 02:00 and 04:00 IST daily.
- GitHub Actions manual market refresh and previous saved-snapshot fallback.
- No added credentials, admin sync routes, browser-side market scraping, or
  modifications to published market snapshots.

## Roadmap following this foundation

- Complete and version the 197-code taxonomy with licensing review.
- Build and audit a full ticker/ISIN -> industry mapping for the NSE-listed
  universe and reconcile it with the existing 450+ symbols.
- Extend verified price collection only for reviewed symbols, and record
  corporate-action, liquidity and listing-date quality checks.
- Replace sample rankings with an industry-completeness-qualified universe
  and historical rank-change analysis across multiple snapshots.
- Add authenticated syncing of personal lists only if explicitly requested.
