# Thematic composition approval

Open **Rotation Radar**, then **Review theme composition**. Choose any of the 62 themes.
Review each stock's Core, Adjacent, Proxy or Excluded role, optionally leave a note,
and click **Approve composition on GitHub**. The repository owner must then click
**Submit new issue** in the prefilled GitHub issue.

The owner-only workflow accepts only the exact current ticker list, valid tier
classifications, and at least one Core stock. Each successful review appends a
timestamp, GitHub issue number, and stock roles to the public
src/data/themeCompositionReviews.json. No private Screener CSV data is copied.

Rotation Radar fetches approved reviews directly from GitHub when opened or when
**Refresh approved reviews** is clicked. This avoids requiring another frontend
deployment for every approval. It recalculates Core memberships for live Radar
alerts and refuses to apply new approvals to historical diagnostic dates.

The immutable prospective signal diary is unchanged. A subsequent change to
a theme's public roster invalidates the last approval until it is re-reviewed.

An editorial approval does NOT verify independent segment revenue exposure.
A theme still needs at least five priced Core stocks and at least 75% exact-date
price-history coverage to qualify for a rotation alert.

Other static thematic dashboard screens incorporate changed Core memberships
on their next ordinary code deployment. The review workflow changes no prices
and starts no additional Yahoo market synchronization.
