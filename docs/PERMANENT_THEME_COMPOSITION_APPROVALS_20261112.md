# Permanent theme composition decisions — owner issues #26–#46

The owner makes a one-time editorial decision about which companies belong to a theme.
Once accepted, that roster and each stock's role must be durable repository data, not
a transient UI state dependent on the browser, a CDN, or an additional GitHub fetch.

On 12 Nov 2026 we reconciled the 21 owner-submitted composition requests:
- 16 were already stored in src/data/themeCompositionReviews.json.
- Five issues were missing from that permanent file despite having been submitted
  by the owner: #30 Private Banks, #37 Tyres & Rubber, #39 Brokers & Depositories,
  #41 Insurance, and #43 Cement.
- All five approval records were recovered from the original owner issue bodies,
  preserving the original issue creation timestamp as reviewedAt.
- Four requests matched their existing static basket exactly.
- Issue #39 also includes GROWW as Core. The original broker basket had eight stocks
  and omitted GROWW, so the source basket now includes that user-approved NSE ticker,
  for nine total members. Its static placeholder price/market cap fields are zero
  (unavailable); momentum requires validated Yahoo close histories.

The full 21-owner-review JSON is directly imported into the production build.
Changing prices, reloading the page, or GitHub API downtime cannot revoke these
committed editorial decisions. The optional live-audit fetch is only used to discover
*newer* subsequently approved records, never to replace the committed ones.

No other provisional theme is marked approved without an owner request.
A historical owner approval does not imply a trading/early-turn signal: that
still requires at least five priced Core constituents and 75% valid price-history
coverage. The forward diary remains immutable and historical calculations do not
backdate later approvals.
