# Fixing HTTP 405 on market refresh (Vercel)

## Root cause

The app is built as a Vite static site (`vercel.json` uses `vite build`). The
previous React refresh button posted to `/api/sync-universe`, but that route
existed only in `server.ts` (an Express server **not deployed** by Vercel).
Vercel served the SPA fallback instead of the API, so POST returned HTTP 405.

## Architecture after this change

1. Vercel deploys `api/sync-universe.ts` (POST). It checks an admin key and,
   using a server-side GitHub token, **queues** the `market-snapshot-refresh.yml`
   workflow. It does **not** directly scrape 452+ ticker series in an API request.
2. GitHub Actions runs `scripts/refresh-market-snapshot.ts` with the full
   universe, and commits `src/data/verifiedLiveMarketData.json` to `main`
   only if enough stocks refreshed successfully. The scheduled job is also
   configured for weekdays at 19:00 IST.
3. The `api/stocks-snapshot.ts` and `api/benchmarks.ts` Vercel functions
   retrieve the latest **committed** snapshot from GitHub. The UI uses these
   on load, regardless of whether Vercel has redeployed yet.
4. The button reports **queued**, not **synchronized**. The new data appears
   after the GitHub Action finishes and commits it; reload the page then.

## Required configuration — Vercel dashboard

Open the Vercel project that deploys `lkshdby/IndiaSectorTrends` and set
these **server-side environment variables** for Production (and Preview if
using Preview):

- `GITHUB_ACTIONS_TOKEN`: GitHub fine-grained personal access token limited to
  **only** `lkshdby/IndiaSectorTrends`, with repository permission
  **Actions: Read and write**. This token stays **on Vercel only**.
- `SYNC_ADMIN_KEY`: a separate long, random secret passphrase that you keep
  privately. The browser asks for it when pressing Request Market Refresh.
  This avoids allowing any website visitor to enqueue expensive jobs.

**Never** prefix these variables with `VITE_` and never commit their values
to GitHub. Redeploy the Vercel site after saving the environment variables.

The manual sync API returns:
- `202` with `queued:true` when the workflow dispatch is accepted.
- `503` when the environment variables are missing.
- `401` for an incorrect admin key.
- `502` when GitHub rejects the dispatch or cannot be reached.
- `405` for methods other than POST on this *working* endpoint.

## Verification checklist

1. Merge this branch and redeploy the Vercel project from `main`.
2. Visit `https://<your-domain>/api/benchmarks`. It should return JSON
   with `success:true`, not the application's HTML.
3. Visit `https://<your-domain>/api/stocks-snapshot`; verify it returns a
   nonempty `stocks` object and a `fetchedAt` time.
4. Press **Request Market Refresh**, enter `SYNC_ADMIN_KEY`, and confirm
   it says *queued* (not *all stocks refreshed*).
5. Open the
   [Market Snapshot Refresh workflow](https://github.com/lkshdby/IndiaSectorTrends/actions/workflows/market-snapshot-refresh.yml)
   and verify the triggered run completes successfully and makes a commit.
6. Reload the dashboard; check quote freshness and price anomaly alerts.

## Caveats

- This does not guarantee NSE/BSE trade settlement or split/bonus adjustment.
  The source remains Yahoo daily chart data and remains subject to the quality
  safeguards introduced in PR #2.
- GitHub Actions `GITHUB_TOKEN` must have **Contents: write** permission
  to push the refreshed snapshot (set in the workflow).
- The GitHub Actions job may fail from market-data provider throttling or
  return too few valid stocks. In that case it deliberately makes **no commit**.
  The last saved snapshot remains available.
- The Vercel snapshot API reads a public repository file; for a private
  repository a different authenticated storage mechanism would be necessary.
- A configured Vercel API is not an Express server. Other routes in
  `server.ts`, such as older Screener industry APIs, are not automatically
  exposed by this change.
