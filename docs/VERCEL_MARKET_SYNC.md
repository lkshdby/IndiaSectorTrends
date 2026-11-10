# Three automatic collections plus optional manual GitHub refresh — Vercel, no secrets

## Final design

The Sector Rotation Engine is hosted as a **Vite static frontend** on Vercel.
Vercel does NOT run the long-lived Express `server.ts`, and it should not
fetch hundreds of stock histories from a web button.

A public, read-only Vercel API serves the last saved, validated snapshot.
GitHub Actions automatically collects the stock data **three times per IST calendar day**, following the originally requested schedule.

| IST slot | UTC GitHub Actions schedule | Days |
| --- | --- | --- |
| **18:30 IST** | 13:00 UTC | Every day |
| **02:00 IST** | 20:30 UTC on the previous calendar day | Every day |
| **04:00 IST** | 22:30 UTC on the previous calendar day | Every day |

All three entries run daily, matching the application's original 6:30 PM,
2:00 AM and 4:00 AM IST schedule (including weekends). **There is no extra
scheduled run and no browser-triggered collection. The GitHub Actions
**Run workflow** button can additionally start an on-demand collection.** On weekends or exchange
holidays, prices will ordinarily remain at the latest completed session.

GitHub Actions cron is best-effort: especially during high service load, jobs
can start late or occasionally be skipped. The original time slots are
configured, not guaranteed to execute to the second.

## Optional manual collection from GitHub Actions

You can refresh on demand without waiting for the next scheduled time:

1. Open [Refresh Committed Market Snapshot](https://github.com/lkshdby/IndiaSectorTrends/actions/workflows/market-snapshot-refresh.yml).
2. Click **Run workflow**, select **main** and click the green **Run workflow** action.
3. Inspect the job result: it collects the entire market snapshot and applies
   **the same checks as scheduled runs**. If they pass, GitHub Actions commits
   the JSON snapshot to **main**, not a dry run. If they fail, the existing
   snapshot is preserved and the workflow reports failure.
4. Reload the dashboard or use **Reload Saved Data** after the commit.

Manual runs are **additional** to the three daily scheduled attempts; they
are not part of the automatic schedule. No Vercel secret or personal access
token is needed because GitHub Actions uses its built-in workflow token.

## What the dashboard button does

**Reload Saved Data** makes a read-only GET to `/api/stocks-snapshot` and
re-renders the latest saved stocks and benchmarks. It does **not** start a
new market-price download and does **not** write data. No token, key, login,
or browser-triggered GitHub Actions dispatch is required.

Vercel routes:
- `GET /api/stocks-snapshot` returns the last GitHub-committed stock snapshot.
- `GET /api/stocks-history?tickers=...` returns saved observations.
- `GET /api/benchmarks` returns saved benchmark series (ETF proxies identified).
- All other dynamic Express routes are not deployed on the Vercel frontend.

## What keeps stored data safe

The workflow uses its **built-in GitHub Actions GITHUB_TOKEN** with narrowly
declared `contents: write` permission to save the refreshed JSON to `main`.
No personal access token or Vercel environment variable is needed.

Collection safeguards:
- Reconstruct stock returns from real daily closes and reject unverified
  large discontinuities.
- Require at least **90% of thematic symbols** to be fetched fresh.
- Require **all four benchmark** histories to have been fetched in that run.
- Ensure every core basket has at least one fresh constituent.
- When validation fails, the workflow exits with an error **before the commit**
  and keeps the existing saved snapshot unchanged.
- The snapshot's `fetchedAt` is the **collection timestamp**, not the
  timestamp of an actual market trade; overnight pulls may retrieve the same
  closing prices as the preceding evening.
- Avoid concurrent overlapping runs and rebase the bot's data-only commit
  on changes to the main branch.

## Verification after merge/deploy

1. Merge the code change and let Vercel automatically deploy `main`,
   or redeploy it manually if your project doesn't auto-deploy.
2. Visit `/api/stocks-snapshot`; you should see JSON with
   `success: true`, a nonempty `stocks` collection and `fetchedAt`.
3. Press **Reload Saved Data**. It should report the saved collection time
   without asking for a key or issuing an HTTP POST.
4. Visit [GitHub Actions](https://github.com/lkshdby/IndiaSectorTrends/actions/workflows/market-snapshot-refresh.yml)
   to inspect the next scheduled run. GitHub Actions must be enabled on the
   repository, and `GITHUB_TOKEN` must be allowed to commit to `main`
   under any branch protection rules you apply.
5. Check the recent `data: update verified market snapshot` commit.
   If the Action fails, inspect its validation output: **stale data is safer
   than publishing fabricated or partially collected sector rankings**.

## Known remaining limitations

- Yahoo Finance daily chart bars are **not** independent NSE/BSE bhavcopy
  reconciliation. Some listings or symbols may fail or be thinly traded.
- The market-cap figures in sector definitions are stored estimates and
  not continuously updated exchange free-float weights.
- All bars and sectors retain the existing price-data and theme-fit caveats
  in `docs/SECTOR_ROTATION_DATA_POLICY.md`.
- This zero-config setup trades guaranteed exact-on-time collection for a
  simpler and more reliable scheduled snapshot architecture. For guaranteed
  execution-time SLAs, use a dedicated managed scheduler.

**Do not configure `GITHUB_ACTIONS_TOKEN` or `SYNC_ADMIN_KEY` in Vercel
for this design.** They were only needed for the now-removed manual-dispatch
route in the previous version.
