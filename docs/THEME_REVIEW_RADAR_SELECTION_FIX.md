# Theme review and Radar selection synchronization

Previously the composition-review dropdown could show Owner-approved GitHub #26 for
Jewellery while the independent Rotation Radar selector displayed a provisional
status belonging to a different theme.

Selecting a theme for review now selects the same theme in Rotation Radar,
switches to All themes, and clears unrelated filters. The review panel shows
its actual Radar phase and editorial membership status.

Owner approval removes the provisional-composition gate, but does not
automatically generate Early turn or Broad leader momentum signals.
The saved 16 GitHub approval records, price feeds and theme rosters are unchanged.

Regression tests create observed prices for every currently approved basket
and ensure none is classified as Provisional composition.
