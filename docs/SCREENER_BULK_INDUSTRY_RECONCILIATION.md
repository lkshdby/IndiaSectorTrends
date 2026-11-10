# Full-universe industry classification: one-pass trusted Screener workflow

## Decision

The user accepts Screener.in's detailed Industry classifications as a **trusted company-classification source** for IndiaSectorTrends. **Screener-sourced evidence is labeled Screener, not NSE-verified**. The source-priority order is: existing independently verified NSE company mapping, then exact-symbol Screener mapping with an industry name and checked category code, then unverified editorial candidates (which never enter rankings).

The full audit covers the union of all 62 thematic baskets plus any saved price-snapshot-only tickers. An authorized Screener export is joined by **NSE Code** or **NSE Symbol**, never fuzzy company names. The reference overview is https://www.screener.in/market/ and its industry subpages link to per-company pages. Screener describes its own CSV exports at https://support.screener.in/article/28-export-screen-results (Premium access may be required).

## One-pass execution

From the project root, with permission to use the dataset, export a CSV containing the exact `NSE Code` and `Industry` columns (or `NSE Symbol` and `Basic Industry`). Verify the column is the detailed Screener **Basic Industry**, not a broader parent or industry group. Keep the original source export private.

```bash
npm install
npx tsx scripts/reconcile-screener-industries.ts \
  --input /secure/authorized-screener.csv \
  --out /tmp/full-industry-review.csv
```

The report processes the entire tracked universe at once: matching symbols, duplicates, missing labels, disagreements with existing NSE classifications, category-code gaps, and out-of-universe rows. No change is made to production mapping during the report step.

With explicit permission to retain a derived company-industry table, generate an **attributed, checked subset** in one pass:

```bash
npx tsx scripts/reconcile-screener-industries.ts \
  --input /secure/authorized-screener.csv \
  --out /tmp/full-industry-review.csv \
  --evidence-out src/data/screenerIndustryEvidence.json \
  --authorized-source
npm run lint
npx tsx --test src/utils/screenerIndustryReview.test.ts
npm run build
```

The evidence file is an **empty placeholder** in the repo until authorized data is available. A generated evidence file with rows must not be published or committed without permission consistent with the provider's terms. Screener's terms are at https://www.screener.in/guides/terms/ . User acceptance as a trusted source is not, by itself, a copyright or redistribution license.

## Validation and classification rules

- An exact NSE symbol match and a nonempty category equal to an existing canonical local industry label are required. For code-checked industries, an approved Screener row is tagged `trusted-screener-match` in the local review. Once authorized evidence is provided, it is accepted by `VERIFIED_BASIC_INDUSTRY_ASSIGNMENTS` with source type `screener`, and can participate in industry rankings. It remains explicitly attributed to Screener in the audit and CSV export.
- Existing NSE records take precedence over Screener. A disagreement is `conflicts-with-primary-source` and never silently replaces an NSE record.
- Unknown Screener industry labels, missing local codes, invalid symbols, contradictory duplicate rows, and unlisted symbols are excluded. No industry codes are guessed. Differences in punctuation or source field granularity must be reconciled, not silently normalized into mismatched categories.
- Editorial thematic hints are never accepted as evidence or ranking input.
- The `JUPITERWAG` vs `JWL` discrepancy requires a separate symbol/ISIN/history audit. No unverified alias is applied.
- Each retained record links to the **Screener industry subpage** derived from the checked category code (for example `IN070201001` routes to `/market/IN07/IN0702/IN070201/IN070201001/`). This is evidence of its category table together with the authorized export's exact NSE symbol; it does not claim an independently checked live company page.

## What is still missing

This change delivers the one-pass tooling and ranking integration, **not an invented 100% dataset**. The full authorized Screener CSV is not available inside this chat or this repository. Without it, no new Screener-sourced rows can be populated. The saved snapshot may contain additional tickers beyond the 62 prebuilt baskets; runtime coverage counts should be computed after loading its latest data.

## Validation

```bash
npm run lint
npx tsx --test src/utils/screenerIndustryReview.test.ts src/utils/basicIndustryCoverage.test.ts src/utils/industryEvidence.test.ts
npx tsx scripts/review-basic-industry-import.ts --coverage
npm run build
```
