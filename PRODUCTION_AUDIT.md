# Production readiness audit — 2026-11-05

## Verdict
**Ready for production use, with five open items** (below). The board sign workflow is complete end to end: request → `BoardSign` → checks → 300 DPI SVG print file.

## Checked and passing
- **Design system compiles clean:** 28 cards, 45 exports, 100 tokens, 3 fonts (Anton, Barlow Semi Condensed, DM Sans), no issues.
- **Every card fits its frame** (measured all 28 + 6 component thumbnails).
- **Green Line signs (v6):** 14 boards and 7 street-sign posts. 13 boards pass every check and export a valid SVG (exact 24″ width, outlined text, no fonts, no CSS variables). Sizes needed: 4 × 24×6, 4 × 24×12, 4 × 24×16, 1 × 24×20.
- **One source of truth:** board geometry, badge spec, sizes and short sign names live in `signSpec.js`, `boardLayout.js` and the trail inventory; the on-screen board, the SVG export, the v6 mockups and the website all read them.
- **Trail data:** 156 trails, no duplicate numbers. Four Green Line short names in use (Thompson, Gobbler's Rdg, Maynard's Trl, Cane Creek).
- **Docs agree with the components:** readme, SKILL.md, NEW_SIGN_INSTRUCTIONS.md, component notes and cards were swept for old specs (3 sizes, 3″ header, evenly spread entries, Anton caps names, stacked/1.25″ badge, holes).
- **Website** (`site/`): generated from the design system; navigation stable across pages; design guide mirrors the Design System tab.

## Fixed in this audit
- Sign kit note still described the old 12/16/24″ sizes and "spread evenly" entries.
- Readme type rules said Anton for *all* sign lettering; font list omitted Barlow; open-items list still asked for the Sign Name column that now exists.
- SKILL.md step order was garbled.
- Stale code comments (badge height, entry layout) and a dead Instructions page reference in the site build.

## Open items
None. All 14 Green Line boards pass.

## Closed
- **GL-05 Green Line Cut Through:** a connector (no number, no rating) shown as **Cut-through**, no symbol, black arrow.
- Unrated trails and over-long names elsewhere in the inventory: accepted as-is; `checkBoard` blocks any board that uses them.
- **Printing:** boards move from PVC to **Dibond** from Square Signs (white aluminum composite, 1/8″, single-sided, matte laminate, square cut). Order options are in `NEW_SIGN_INSTRUCTIONS.md` §10. Print files now have square black corners so a square cut looks finished.
- **Test print:** passed (bleed, both fonts, numbers in diamonds, header centering).

## Not production deliverables
`explorations/` (v5 mockups, Fit Lab, typeface study, recommendations) is history and not kept in sync. `Green Line Sign Mockups v6.html` is the current reference.
