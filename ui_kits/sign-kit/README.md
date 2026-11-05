# Sign Kit

Interactive composer for the Hawk Pride sign types plus the legend. Uses only design-system components (StreetSign, BoardSign, TrailMarker, DifficultyLegend), so what you see follows the standards in `NEW_SIGN_INSTRUCTIONS.md`.

- `index.html` — tabs: Street sign · Board sign · Trail marker · Legend. Edit fields to update the sign. Kit code is inline (kept out of `.jsx` files so it is never bundled into the design system).
- Board tab: up to 5 entries; board size, entry order, spacing and the "To" rule are applied automatically. Red outline = name too long.

This is a preview tool, not a print-file exporter. For print files see §9 of `NEW_SIGN_INSTRUCTIONS.md`.
