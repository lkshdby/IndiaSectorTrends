# Thematic composition approval and add-NSE-ticker workflow

Open **Rotation Radar → Review theme composition**, then select one of the 62 themes.

## Add an NSE ticker (new)

1. Type a ticker such as `ICICIAMC` (the `.NS` suffix is optional) into **Add an NSE ticker to this theme** and click **Add ticker**.
2. The ticker appears in the same composition list. Choose **Core**, **Adjacent**, **Proxy**, or **Excluded**. The default for a newly added stock is Core; change it if the company is not a direct business fit. You can remove a newly added draft ticker before submitting.
3. Click **Approve composition on GitHub**, sign in as the repository owner, and **Submit new issue**.
4. The owner-only GitHub workflow validates the issue and requires an authentic, observable NSE Yahoo `.NS` daily price history for any symbol not already in the saved NSE-price snapshot. It commits the complete revised roster and roles to the append-only `src/data/themeCompositionReviews.json`. If verification fails, the issue is not applied.
5. The committed approval serves as the single permanent source of newly added ticker memberships. The GitHub `main` deployment automatically incorporates them in `THEMATIC_SECTOR_INDICES`. The market collector automatically discovers every theme's full constituent universe, queues an immediate refresh after a new ticker is approved, and includes it in the three scheduled collections thereafter.
6. Refresh the deployed page and click **Reload Saved Data** after the new market snapshot is committed. New tickers need aligned daily history before they influence rotation signals; if Yahoo history is missing or incomplete, the Radar shows a price-data gap.

Add up to **five new symbols per approval issue**. A request must retain all existing constituents, including previously added tickers; changing a tier to Excluded is supported, but silently deleting a stock from a previously approved roster is not. Ticker-only additions are public; no private Screener export is uploaded. The added record initially uses the ticker as a placeholder display name and leaves market cap and other unknown metadata unset (zero sentinel), rather than inventing financial values.

## Existing review flow

You can still approve an unchanged roster or modify its Core, Adjacent, Proxy, or Excluded roles. Each successful review appends a dated GitHub issue reference to the public audit. The last review is recognized by the Radar only when the complete roster matches. New members require a new frontend build/deployment because the stock list is compiled into the application; changing tiers within a fixed roster is visible after **Refresh approved reviews**.

The immutable prospective signal diary remains unchanged. Historical signals are never backdated with new memberships.

Editorial approval does **not** verify independent segment revenue exposure. The default eligible rotation rule still requires at least five core stocks and at least 75% exact-date historical price coverage. Adding an irrelevant stock merely to clear a threshold reduces research quality.
