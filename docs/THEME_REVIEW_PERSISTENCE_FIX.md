# Review persistence fix

The owner review audit remains the source of truth at
`src/data/themeCompositionReviews.json`.
The dashboard previously started from an outdated compiled empty list
and silently reverted to provisional classifications if the GitHub raw
fetch was unsuccessful after a reload.

The dashboard now:
- Bundles the current public review JSON into each production build.
- Merges successful GitHub audits with the last locally verified audit,
  keeping every distinct approved issue (a stale response cannot remove
  an earlier approval).
- Persists the last verified combined audit in browser localStorage,
  without any private Screener data.
- Reads public GitHub raw first, then the public GitHub contents API as
  an independent backup, with bounded 12-second timeouts.
- Shows the number of saved reviews and live/cached/loading state in
  the Rotation Radar header. A failed remote fetch is made visible.
- Continues to require exact current constituent lists for an approval
  to apply. No unreviewed theme is automatically confirmed.

The existing owner-only append-only GitHub issue workflow and historic
point-in-time signal diary are unchanged.
