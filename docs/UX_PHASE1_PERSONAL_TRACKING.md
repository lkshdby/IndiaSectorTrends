# UX Phase 1 — Sector detail and personal tracked stocks

## What changed

- The sector detail page begins with a compact performance/rotation/breadth summary
  and places the main chart **before** the long four-signal explanation.
- Technical diagnostics and adjacent-business details are in expandable sections.
- Directional-agreement labels always show basket size and warn when a basket
  contains fewer than four priced core companies.
- Wider, two-line sector names, larger search input and chart mode controls,
  plus a mobile shortcut to the selected-sector analysis.
- A third left-sidebar tab, **Tracked**, holds a personal stock watchlist.
  The **Add stock** button opens it; when inspecting an individual stock,
  **Track stock** adds that company immediately.

## Personal tracking behavior

**No extra server credentials are required.** Watchlist entries are stored in
`localStorage` on the current browser only. They do not sync to other devices,
and deleting site storage deletes the saved list.

For each ticker:
- NSE symbols are normalized to uppercase and an optional `.NS` suffix is
  removed. Duplicate symbols are rejected.
- Users may enter a display name and associate the company with a sector for
  their own organization.
- If that symbol is already present with sufficient history in the latest
  verified JSON market snapshot, its stored quote and weekly return are shown.
- If it isn't in the scheduled feed, the app says **not automatically
  collected**, shows no invented price, and provides a GitHub **Request feed
  inclusion** link that creates a proposed issue for review. The issue is not
  automatically submitted or accepted.
- Assigning a sector or tracking a company **does not silently modify** the
  62 curated core-basket constituents, weighting, breadth, rotation phases or
  scheduled GitHub Actions universe. This keeps reference signals comparable
  and avoids misleading index results.
- Existing core constituents can be opened directly in their sector detail.
  Newly entered businesses without a curated sector detail remain viewable in
  the watchlist while their price feed or classification is reviewed.

## Unchanged

- GitHub Actions automatic collections at **18:30, 02:00, 04:00 IST daily**,
  plus optional manually triggered collections.
- Last-committed-snapshot reload and its Vercel fallback.
- Equal-weight vs stored-market-cap index math, source tickers, and existing
  chart overlay, composite and rotation views.
- All core sector baskets, adjacent-company classification, alert and custom
  index features.

## Future (not part of Phase 1)

- A cross-sector discovery/heatmap page and research shortlist tools.
- User sign-in and multi-device watchlist storage.
- An authorized, centrally reviewed mechanism for promoting user suggestions
  into the shared tracked-symbol source.
- Real-time or intraday prices for newly entered tickers.
