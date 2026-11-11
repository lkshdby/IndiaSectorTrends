# Rotation Radar — early cross-theme rotation research (experimental)

## Goal and claimed differentiation

The research goal is to identify **which of the 62 curated, cross-industry investment themes are switching from sustained underperformance to broad short-term outperformance**, and to expose the constituent stocks and basic industries driving that shift. Ordinary sector heatmaps, breadth and relative strength are widely available elsewhere; **we do not claim this radar has a proven advantage**.

## Source and universe

- Price inputs: the existing validated GitHub saved snapshot, Yahoo observed daily close histories, and NIFTY 500 history (rolling ~3 months). **Not** all 3,246 stocks from the user's Screener export; that export supplies industry classifications, not daily prices for the full NSE universe.
- Universe: the 62 curated core thematic baskets; adjacent and proxy stocks are never silently included.
- User's private Screener classification JSON supplies additional industry labels **on their browser only**. No licensed company lists are added to public GitHub.
- Exact benchmark trading-session dates are required at all measurement endpoints; missing prices are excluded rather than set to zero.

## Defined signals

At date t, each included stock must have a valid price at t, t−5 and t−21 benchmark sessions. A qualifying basket must contain **at least 5** such core stocks and meet **75% price-history coverage**.

- RS5 = equal-weight basket 5-session return minus matching-date NIFTY 500 5-session return.
- RS21 = equal-weight basket 21-session return minus matching-date NIFTY 500 21-session return.
- RS acceleration = RS5 minus (equal-weight 5-session-equivalent return from the **preceding 16 sessions** minus NIFTY 500's equivalent previous-16-session pace). For one stock: previous equivalent pace = 100×((P[t−5]/P[t−21])^(5/16)−1). Unit: percentage points.
- Breadth5 = percent of qualified stocks with positive last-5-session returns. Prior breadth = percent with positive previous-16-session returns. Breadth change is the difference in percentage points.
- Outperformer share = percent of qualified stocks whose last-5-session returns exceed matching-date NIFTY 500.

**Early turn:** RS21 ≤ 0, RS5 > 0, RS acceleration > 0, breadth5 ≥ 60%, breadth change ≥ 10pp, outperformer share ≥ 50%, and sampling gates.

**Broad leader:** RS21 > 0, RS5 > 0, breadth5 ≥ 60%, outperformer share ≥ 50%, and sampling gates.

**Losing steam:** RS21 > 0 plus RS5 ≤ 0, negative RS acceleration, or breadth change below −15pp, with sampling gates.

Remaining adequately sampled themes are **Still lagging**; small or insufficiently priced samples are **Thin evidence**. These classifications are diagnostic labels, not predictions.

## Forward 5-session sanity check

At every fifth historical benchmark session, build a signal **solely with prices available up to that session**. Calculate the same included cohort's equal-weight return from t to t+5, less matching-date NIFTY 500. If any original signal stock lacks its exact t+5 close, skip that event. Compare early-turn events against all adequately priced theme-date observations. Display observation counts, positive-excess hit rates and means. Never turn a zero-event set into a 0% hit rate.

This is **not** a valid backtest or evidence of a definitive edge: 3-month data only, today's theme memberships used retrospectively (survivorship/look-ahead *universe* bias), overlapping theme holdings, correlated observations, and no costs, liquidity, trading delays or independently held-out markets. The rules are not fitted on this short history. A robust next test needs at least 12 months of timestamped membership plus price histories, frozen thresholds, trading costs and unseen market regimes.

## Interpreting the panel

- **Early turns** surface possible transitions before a positive 21D benchmark-relative trend is established. Positive short-term acceleration can reflect an oversold rebound, not persistent leadership.
- **Broad leaders** show already established strength and breadth.
- **Losing steam** flags previously strong themes with cooling short-term relative momentum.
- Selecting any theme shows its top 5 stock contributors relative to NIFTY 500 and the underlying source-attributed basic industries, as well as exact sample coverage. The industry breakdown is a decomposition, **not institutional fund-flow evidence**.
- Historical validation compares the predefined signal against a simple contemporaneous baseline. We will remove/rework the early-turn rule if it fails longer-horizon out-of-sample tests.

## Execution integrity

No changes to the GitHub daily price collector, 62 curated baskets or the existing industry analytics. The new radar is a separate research landing tab. Public GitHub does not receive any user's paid Screener dataset.

QA: `npm run lint`; `npx tsx --test src/utils/rotationRadar.test.ts`; other price-quality and index tests; `npm run build`.

## Prospective point-in-time diary (not retrospectively manufactured)

The existing three-slot GitHub Actions market-data workflow now also runs `scripts/record-rotation-signals.ts` **after** its market-quality gate. Each distinct observed benchmark session captures the first accepted theme-label decision and exact core member tickers in `src/data/rotationRadarObservations.json` (a public file containing no Screener classifications). Subsequent same-date collections cannot overwrite that original signal, and at the first snapshot containing five further observed benchmark sessions the script appends the cohort's realized forward 5-session excess return versus NIFTY 500.

The Radar tab loads this tiny point-in-time diary directly from GitHub Raw and displays the actual matured alert hit rate and mean excess return, with all matured eligible theme observations as a comparator. Until signals mature, it displays **Awaiting results**, not fabricated zero-performance statistics. Past alerts are never reconstructed from today's theme mix. The diary retains up to 550 observed trading-day vintages, roughly two years. The schedule is best-effort: missed provider or GitHub collection slots can delay observations; it does not guarantee a daily update.

Importantly, public diary snapshots do not use Screener-derived private classification labels: classification is used only in the user's own browser for explaining the visible industry drivers. Every diary record contains only public curated theme IDs, tickers, measurable price signals and eventual outcomes.

The point-in-time observation mechanism removes *retroactive signal reconstruction*, but not survivorship bias from current theme memberships, non-independence from shared constituents, price-adjustment revisions, benchmark universe issues, or execution costs. We will need a longer evaluation period and independent research baseline before treating this as predictive evidence.

CI also runs `npx tsx --test scripts/record-rotation-signals.test.ts` to prove events have **no forward outcome** at creation and do acquire one only after five additional benchmark closes.

## Core-membership audit and why the radar suppresses provisional alerts (11 Nov 2026)

A code-level audit of the **62 frozen thematic baskets**, distinct from source-verified basic-industry classification, found:

| Core membership status | Observed count |
| --- | ---: |
| Themes with explicit hand-reviewed editorial membership rules | **21** |
| Themes with **no explicit rule** and all stock entries provisionally treated as core | **41** |
| Provisional core stock positions across the 41 baskets | **314 of 421** total core positions (74.6%) |
| Core baskets with fewer than five members | **9** |
| Distinct stocks in all themed baskets | **452** |

An explicit editorial rule is not independent verification of business-segment exposure. Notably, the `Geospatial, Drones & Smart Metering Tech` basket contains distinct end markets; it is a broader technology umbrella, not a pure-play geospatial industry. Narrow thematic baskets can still be useful research watchlists without meeting an index signal's five-stock sample gate. **Do not add unrelated securities merely to make a sample size threshold.**

Consequently, the Radar now labels the 41 unreviewed baskets as **Provisional composition** and keeps them visible under *All themes*, but they **cannot** trigger **Early turn**, **Broad leader**, or **Losing steam** labels until a curated explicit core rule exists. Only editorial-reviewed theme memberships with sufficient valid price history enter the historical baseline or prospective diary. This is an **integrity gate**, not a claim that the 21 already-reviewed baskets have independently validated financial exposures.

### Recommended membership design

1. **Freeze the structural theme universe using business fundamentals**, not recent price appreciation. Review business-segment revenue disclosures, business type (product/service operator vs financier vs supplier), liquidity, active NSE identity/ISIN, and date of the evidence. Maintain an independent rejected/excluded reason for false thematic associations.
2. **Core members:** defensible primary or material, well-documented theme exposure. **Adjacent:** ancillary ecosystem involvement that matters but does not represent the primary company theme. **Proxy:** loosely correlated companies, not part of the core basket. A broad theme may have only two genuine pure plays; label it concentrated instead of manufacturing five.
3. **Leadership overlay, separated from membership:** rank confirmed theme members using benchmark-relative returns, accelerating breadth, liquidity, stock contribution and price-history confidence. Consider earnings/revenue developments only as a separate fundamental layer with timestamped disclosures. Choosing historical winners retroactively as constituents introduces look-ahead and momentum-selection bias.
4. Review membership on **dated quarterly snapshots** or material corporate actions, and record additions/removals. Keep the current list fixed for each daily signal. Compare leaders against the full eligible core set without replacing laggards inside the measured basket.
5. Use Screener's NSE-code and basic-industry coverage to generate **candidate lists**, not automatic theme memberships: basic industry and investment-theme exposure are different taxonomies. The full Screener CSV does not supply current daily prices for previously untracked companies.

Exchange indices also use objective liquidity, listing and free-float constraints: https://niftyindices.com/resources/tutorial/review-of-indices . Those are useful governance benchmarks, not evidence that an individual company's theme exposure is correct.
