# Hawk Pride Signage Design System

Design system for all **physical signage at Hawk Pride Offroad**, an off-road vehicle park (4WD, UTV, ATV). This first iteration covers **trail signage**: the difficulty rating system, navigation routes, and the sign types that communicate them.

Goal: an agent can be told "make a board sign with these items" and produce consistent sign art that goes to the printer with little or no editing.

> **Making a sign? Follow [`NEW_SIGN_INSTRUCTIONS.md`](NEW_SIGN_INSTRUCTIONS.md).** It covers intake, choosing the sign type, trail lookup, every sign standard and the output checklist. If anything here conflicts with it, the instructions win.

## Sources
- **Playbook (current):** `uploads/Trail Rating, Navigation & Signage Playbook (2).pdf`, 12 pp. Text: `uploads/playbook-v3.txt`. Earlier versions (`… Playbook.pdf`, `… (1).pdf`) are superseded.
- **Trail inventory:** `uploads/Hawk Pride - Trail Inventory & Ratings - Trail Inventory.csv` → working copy `data/trail-inventory.csv` → generated `components/symbols/trailInventory.js`.
- **Green Line sign list:** `uploads/Green Line - Sign Inventory.pdf` (text: `uploads/green-line.txt`), rendered in `explorations/Green Line Sign Mockups v6.html`.
- **Brandmark:** `uploads/brandmark-gold (2).svg` (vector), copied to `assets/logo/`.
- Photos in the Playbook are starting examples only.
- **Production:** street signs from a sign vendor; board signs printed on Dibond (1/8″ white aluminum composite, matte laminate) by Square Signs; trail markers are post + decals.

## The system

**Difficulty — four levels plus access roads** (from the six CartoTracks classes)

| Level | Color | Symbol | Terrain | Vehicle guidance |
|---|---|---|---|---|
| Easy | Green | Circle | Maintained dirt, mild grades, small rocks and shallow ruts | Most stock off-road vehicles |
| Moderate | Blue | Square | Rougher surfaces, steeper grades, rocks, deeper ruts and some technical features | Capable 4WD / UTV • good clearance recommended |
| Difficult | Red | Diamond | Large obstacles, steep climbs, technical lines, deep ruts and off-camber terrain | Modified vehicles and experienced drivers recommended |
| Extreme | Purple | Double diamond | Severe climbs, major ledges, boulders and highly technical terrain | Highly modified / purpose-built vehicles and experienced drivers |
| Access Road | Brown (street sign), black (board arrow), gray/black (map) | None | General access routes, not part of the difficulty scale | — |

CartoTracks conversion: 1 → Access, 2 → Easy, 3 → Moderate, 4 and 5 → Difficult, 6 → Extreme. Existing trail names and numbers are preserved.

**Rating principles:** terrain defines difficulty, not equipment · rate the hardest unavoidable section under normal conditions · equipment guidance lives on the legend, map and website, not on every sign · vehicle restrictions (e.g. ATV-only) are separate from difficulty · no special per-trail colors (the old Blue Polaris Outfitter Trail color is retired).

**Numbered trail symbols:** the trail number sits inside its difficulty shape: white number in the green circle, blue square or red diamond. Extreme puts the number on a purple plate beside the double diamond. Handles 3-digit numbers and suffixes (23a, 149b). This is the trail ID on boards, markers and maps. Component: `TrailSymbol`.

**Navigation routes:** a route such as the **Green Line** is a journey across several trails. Each trail keeps its own name, number and rating; a **route badge** marks membership. "Green Line" is never printed as a trail name.
- Badge: square-cornered rectangle in `--route-green-line` (#0B5D33), "GREEN LINE" in white. Deeper than Easy green and borderless, so it can't be read as an Easy rating.
- Green Line trails: 1 Big Hill, 6 Mountainside, 21 Maynard's Trail, 65 Bacon, 71 Thompson Trail, 89 Gobbler's Ridge, 90 Abbie's Trail, 91 Cane Creek Trail, 100 Outfitter Trail.
- Badge only the portion of a trail that is actually on the route.

**Trail inventory notes:** use the **new** number (Whiskey Run is 149; 100 is Outfitter Trail). 12 trails are unrated. Duplicate names exist (Ed's Ledge 120/140, Stinger 14/86); always confirm by number.

**Sign types** (full standards in `NEW_SIGN_INSTRUCTIONS.md` §5–7)
1. **Street sign:** reflective metal blade, 6″ tall, 24″ or 30″ wide by name length. Background = difficulty, no symbol, white Anton caps, number in a white box. A 3″ Green Line plaque goes under blades of Green Line trails. Only at primary-route starts and intersections.
2. **Board sign:** printed Dibond at decision points. All 24″ wide, every entry a fixed 4″ band: 24×6 (1 entry, no header), 24×12 (2), 24×16 (3), 24×20 (4), 24×24 (5).
   - Frame and header: 0.5″ black border to the edge (+0.125″ bleed), 1″ margins, and a black header (to 3.5″) with the 2.15″ white brandmark and HAWK PRIDE OFFROAD at 1.35″ caps (omitted on one-entry boards).
   - Entries: 4″ bands stacked below the 2.5″ header, gray rules between. Each is numbered symbol · name (Barlow Semi Condensed Bold, mixed case, 1.5″ cap height) · Green Line badge if on route · arrow at right. Arrow color = meaning.
3. **Trail marker:** post with 3.5″ white decals: numbered symbol, Green Line badge where on route, arrow where needed.
4. **Route marker:** Green Line badge + route-green arrow where the route turns or changes trails.

**Unified visual language:** one color association everywhere: street sign background, board arrow, marker symbol and map line share the difficulty color.

## CONTENT FUNDAMENTALS
- **Voice:** plain, factual, operational. Signs state names, numbers and directions. No slogans or marketing copy.
- **Sign text:** board entry names in Barlow Semi Condensed Bold, mixed case; street signs, headers, badges and numbers in Anton caps. Names exactly as in the inventory (or its short sign name). No "To" prefix on boards, since the arrow carries it.
- **Numbers:** as in the inventory, digits plus an optional lowercase suffix (`12`, `23a`, `149b`). Never `#12` or `T-12`.
- **Destinations:** short nouns from the fixed vocabulary (Campground, Check-In, Parking, Fuel, Cabins…). Check-in, office and store are the same place.
- **Reference copy (legend, web, map):** sentence-case terrain description; vehicle guidance in italic after it; say "recommended", never "required".
- **Documents:** Anton for titles; DM Sans Black/Bold caps for section heads; DM Sans for body.
- **No emoji, no unicode pictograms.** Color never stands alone: shape always accompanies it (except street-sign faces, where the full color is the cue).

## VISUAL FOUNDATIONS
- **Color:** difficulty green `#24883F`, blue `#1F6FC5`, red `#C92A38`, purple `#7A3AAD`; route green `#0B5D33`; access brown `#6B4426`, map gray `#6E6E6E`; black `#0E0E0E`, white. Yellow `#FFC900` is a document accent only, not used on signs. sRGB values sampled from the Playbook; **print specs pending** (`guidelines/colors-print.html`).
- **Type:** Anton for street signs, board headers, badges and numbers (the Playbook uses Impact; Anton is the open substitute). Barlow Semi Condensed Bold, mixed case, for board entry names. DM Sans for documents and UI. Fixed sizes: never shrink lettering to fit. See `guidelines/type-sign-lettering.html`.
- **Geometry:** everything in inches (`tokens/sign-dimensions.css`, `SIZES`/`BOARD_SIZES` in `signSpec.js`). Components take `ppi`: preview 8–24, print 150+.
- **Faces:** flat solid color, high contrast (white on color, black on white). No gradients, textures, photos, shadows or transparency.
- **Borders:** boards have a 0.5″ full-bleed black border; street blades a white 0.375″ border inset 0.25″, 0.75″ corners; decals 0.08×size corners.
- **Brand on signs:** board header only, the white brandmark + HAWK PRIDE OFFROAD on black. The full-color raster logo is for documents and web.
- **Documents:** white page, generous margins, yellow table header rows with black bold text.
- **Digital surfaces (kit UI):** no animation; active tabs invert to black/yellow.

## ICONOGRAPHY
- **Difficulty shapes** are drawn as geometric primitives (`DifficultySymbol`, `TrailSymbol`), not illustrations.
- **Arrows and destination icons:** [Lucide](https://lucide.dev) v0.454.0 (ISC), copied to `assets/icons/lucide/` and embedded in `components/symbols/iconData.js`; 2.75–3.75 stroke on signs. Lucide is a stand-in: the Playbook defines no pictogram set. Exception: **cabins** use Tabler `building-cottage` (MIT, `assets/icons/tabler/`), same 24-grid round stroke, because Lucide has no cabin distinct from the office `house`. No restroom icon available.
- **Compound arrows** (`straight-then-right`, hairpin `straight-then-right-then-down`) are generated by `DirectionArrow` to match Lucide's stroke; presets in `ARROW_PRESETS`; max 3 moves.
- Destination vocabulary is fixed in `DESTINATION_ICONS`; add new destinations there.
- No emoji, icon fonts or unicode symbols.

## Components
All in `components/`, on the bundle namespace. Dimension props are inches.
- **BoardSign:** Type 2 board standard. Picks size, sorts entries, drops "To", stacks fixed 4″ entry bands, reports problems (`data-ready`, `showChecks`). `components/board-sign/`
- **BoardSignRow:** one board entry. Board helpers: `orderRows`, `boardHeight`, `checkRow`, `checkBoard`, `BOARD_*` constants (`boardLayout.js`).
- **StreetSign:** Type 1 blade; `width="auto"` picks 24/30; `route` adds the plaque. `components/street-sign/`
- **TrailMarker:** Type 3 post + decals; `route` adds the badge decal. `components/trail-marker/`
- **RouteMarker:** route continuity marker.
- **TrailSymbol:** numbered trail symbol. **DifficultySymbol:** shape without number (legends).
- **RouteBadge:** route badge. **DirectionArrow:** single or compound arrow. **DestinationIcon**, **Icon:** pictograms.
- **DifficultyLegend:** official key (row / table). `components/legend/`
- **Data:** `TRAIL_INVENTORY`, `TRAILS_BY_NUMBER`, `LEVELS`, `ROUTES`, `RATED_LEVELS`, `DIRECTIONS`, `ARROW_PRESETS`, `DESTINATION_ICONS`, `SIZES`, `BOARD_SIZES`, `boardSizeFor`, `CARTOTRACKS_CONVERSION`, `ICONS`.

### Intentional additions
- `Icon` / `DestinationIcon` / `DirectionArrow`: keep arrows and pictograms consistent across sign types.
- `BoardSignRow` and `boardLayout.js`: one source for board geometry and fit checks.
- `useFitText`: internal one-line fit helper (street blades only; boards never shrink).
- `brandmarkWhite.js`: white brandmark embedded so boards render it in any project.

- **Green Line badge spec:** `RouteBadge` / `BADGE_SPEC`. Anton caps at 0.52 H, 0.25 H side padding and clear space, square corners, no border. H = 1″ board, 2.2″ route marker, 3″ street plaque, 1″ marker decal (minimum). Card: `guidelines/brand-route-badge.html`.

## Index
- `PRODUCTION_AUDIT.md`: launch-readiness audit and the open items before printing.
- `tools/site-build.txt` + `tools/site-src/`: optional generator for a static sign-system website (not published; its output isn't kept in the repo).
- `tools/`: `Board Sign Export.html` (download a board as a print SVG), `boardSvgExport.js` (the exporter), `runScriptSetup.js` (headless setup for agents). Output goes to `exports/`.
- `NEW_SIGN_INSTRUCTIONS.md`: instruction set for every new sign.
- `SKILL.md`: agent skill entry point.
- `styles.css` → `tokens/` (fonts, colors, typography, spacing, sign-dimensions).
- `components/`: sign components, prompts, cards.
- `guidelines/`: foundation cards (Colors, Type, Spacing, Brand, Iconography).
- `ui_kits/sign-kit/`: interactive composer for all sign types.
- `data/trail-inventory.csv`: trail inventory.
- `assets/logo/`: `brandmark-white.svg` (board headers, on black), `brandmark-gold.svg` (documents, web), `brandmark-black.svg` (one-color on white); `hawk-pride-offroad-logo.png` (full-color raster, documents/web only); `hawk-pride-offroad-logo-black.png` (legacy, superseded by the SVGs).
- `assets/fonts/`: Anton, Barlow Semi Condensed Bold, DM Sans. `assets/icons/lucide/`: icon SVGs.
- `explorations/`: `Green Line Sign Mockups v6.html` (**reference rendering of the standard**), `Board Sign Fit Lab.html`, `Board Sign Recommendations.html`, `Sign Typeface Study.html`. `explorations/archive/`: superseded studies (kept for history; do not follow).
- `uploads/`: source files as provided.

## Open items
- **Print specs:** boards print on Square Signs Dibond (order options in `NEW_SIGN_INSTRUCTIONS.md` §10). Screen colors passed the first test print. Street-sign sheeting codes come from the street-sign vendor.
- **Primary navigation network:** Playbook Part 2 says undecided; the inventory marks the Green Line trails as main navigation.
- **Playbook text to fix:** Type 2 "How and when to use" reads "At trail intersections - Where to buy".
- **Typefaces:** Anton stands in for Impact on street signs, headers, badges and numbers; confirm for print. Board entry names use Barlow Semi Condensed Bold, mixed case (from `explorations/Sign Typeface Study.html`); `assets/fonts/BarlowSemiCondensed-Bold.ttf`.
