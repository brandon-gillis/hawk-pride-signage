# New Sign Instructions — Hawk Pride Offroad

The instruction set for producing any new trail sign. Follow it step by step. When a rule here conflicts with an older file, **this file wins**.

Sources behind these rules: `uploads/playbook-v3.txt` (current Trail Rating, Navigation & Signage Playbook), `data/trail-inventory.csv` (every trail), and the standards settled in `explorations/Green Line Sign Mockups v6.html` (the reference rendering). Files in `explorations/archive/` are superseded — don't follow them.

---

## 1. Intake — what you need before designing

For **each sign** collect:

| Field | Required | Notes |
|---|---|---|
| Sign ID | yes | `<ROUTE or AREA code>-<2-digit number>`, e.g. `GL-04`. Printed on the sign; matches its GIS point. |
| Location | yes | Plain description + reference photo filename. GPS if known. |
| Purpose | yes | One sentence: what decision the rider makes here. |
| Entries | yes | For each trail or destination: name, direction of travel (see §4). |
| Sign type | decide | Use §2. Don't take the requester's label as final ("street-style" with 3 arrows is a board). |

If anything required is missing, **ask** — don't invent it. List what you assumed as "Check:" notes on the output.

## 2. Pick the sign type

| Situation | Type | Component |
|---|---|---|
| Names a trail that is on the primary navigation network, at its start or where it meets another primary trail. No arrows. | **Type 1 — Street sign** | `StreetSign` |
| A decision point: 2–5 entries, each with an arrow. | **Type 2 — Board sign** | `BoardSign` |
| Confirms which trail you're on, or one direction only. | **Type 3 — Trail marker** | `TrailMarker` |
| Shows where the Green Line turns or changes trail. | **Route marker** | `RouteMarker` |

- A one-entry board is allowed: 24×6, no header. Suggest a trail or route marker instead where it would do the job, since they cost less.
- More than 5 entries → two boards on the same post, or simplify the junction.
- Intersection street signs = one blade per trail, stacked on one post.

## 3. Look up every trail in the inventory

Use `TRAIL_INVENTORY` / `TRAILS_BY_NUMBER` (from `components/symbols/trailInventory.js`, generated from `data/trail-inventory.csv`).

- **Number:** always the **new** number (`number` field). Example: Whiskey Run is **149** (old 100); **100 is Outfitter Trail**.
- **Rating:** `level` → `easy | moderate | difficult | extreme | access`. `null` = unrated → render gray, mark **not ready to print**, ask for a rating.
- **Duplicate names** exist (Ed's Ledge 120 vs 140; Stinger 14 vs 86; Lucky's Loop 23a/23b). Always confirm by number.
- **Not in the inventory** → no number, no rating; flag it and ask.
- **Connectors:** short link trails with no number or rating (inventory level `connector`, e.g. Green Line Cut Through → **Cut-through**). On boards: no symbol, black arrow, short sign name. Not blocked by the checks.
- **Green Line membership:** `greenLine: true` (1, 6, 21, 65, 71, 89, 90, 91, 100). Only badge the portion of a trail actually on the route.
- "**Green Line**" in a request means the Green Line **route**, not a trail name. Sign the actual trail (usually **Outfitter Trail 100**) with the Green Line badge. Never print "GREEN LINE" as a trail name.
- CartoTracks legacy ratings: 1 → access, 2 → easy, 3 → moderate, 4 & 5 → difficult, 6 → extreme. "Hard" / "Moderate Hard" → **difficult**.

## 4. Directions

Single moves: `straight, bear-right, right, back-right, back, back-left, left, bear-left` (`up`/`down` = straight/back).
Compound routes: join with `-then-`, max 3 moves: `straight-then-right`, `straight-then-right-then-down` (hairpin). Presets in `ARROW_PRESETS`.

Arrow color = meaning of where it points:
- Rated trail → its difficulty color (green / blue / red / purple)
- Destination or access road → **black**
- Unrated → gray (placeholder, not printable)
- Route marker → route green

**Green Line badge standard** (`RouteBadge`, `BADGE_SPEC` in `signSpec.js`). Everything scales from the badge height **H**:
- Color: route green **#0B5D33** (`--route-green-line`), white letters. Never the Easy green.
- Shape: rectangle, **square corners, no border or outline**.
- Lettering: **GREEN LINE**, Anton caps, one line, **cap height 0.52 H**, tracking 0.02 em, cap height centred in the bar.
- Side padding **0.25 H**; width follows the label (about 2.96 H).
- Clear space: **0.25 H** on every side.
- Sizes: board (beside the name) **1″** · route marker **2.2″** · street plaque **3″** · trail marker decal **1″**.
- Minimum **H = 1″**. Never stretch, recolor, outline, round, or split onto two lines.

## 5. Board sign standard (Type 2)

Use `<BoardSign rows={…} signId="GL-04" />`. It applies everything below automatically; this section is the spec it implements.

**Standard entry height: 4″.** Every entry on every board is one 4″ band, with the symbol, name and arrow centered in it (about 0.7″ clear above and below). Board height is set by the entry count, so there is never spare space to distribute.

**Sizes — all 24″ wide, printed Dibond (aluminum composite)**

| Entries | Size | Build (top → bottom) |
|---|---|---|
| 1 | 24″ × 6″ | 1″ margin · 4″ entry · 1″ margin (**no header**) |
| 2 | 24″ × 12″ | 1″ margin · 2.5″ header · 2 × 4″ · 0.5″ |
| 3 | 24″ × 16″ | 1″ margin · 2.5″ header · 3 × 4″ · 0.5″ |
| 4 | 24″ × 20″ | 1″ margin · 2.5″ header · 4 × 4″ · 0.5″ |
| 5 | 24″ × 24″ | 1″ margin · 2.5″ header · 5 × 4″ · 0.5″ |

Any content stays ≥ 1″ from the edge: the 0.5″ bottom space plus the entry's own ~0.7″ clearance.

**One-entry boards:** 24″ × 6″, **no header** (no brandmark or HAWK PRIDE OFFROAD). Same border and margins.

**Layout (inches)**
- **Border:** 0.5″ solid black to the trim edge (print file can add **0.125″ bleed** if the printer asks). Corner radius 0.5″.
- **Margin:** 1″ top and sides; 0.5″ below the last entry band on boards with a header.
- **Header:** solid black band from the top edge to 3.5″, joined to the border. **White brandmark** (`assets/logo/brandmark-white.svg`) **2.15″ tall**, top edge 1.1″ from the board top. **HAWK PRIDE OFFROAD** in white Anton, **1.35″ cap height**, 0.02 em letter spacing, cap top 1.65″ from the board top (baseline at 3.0″). 0.55″ gap between brandmark and title; the pair is centered left to right as one unit (about 3.1″ clear each side).
- **Entries:** stacked directly below the header, each a 4″ band, each entry vertically centered in its band. Never stretch or shrink a band; pick the board size from the table instead.
- **Dividers:** 0.1″ gray (`--hp-gray-400`) rule on each boundary between entry bands, margin to margin. None above the first or below the last.
- **Sign ID:** white, bold, 0.22″ tall, in the bottom border, 2″ from the right edge.

**Each entry, left → right**
1. **Numbered trail symbol** (`TrailSymbol`): white number inside the green circle / blue square / red diamond; Extreme = number on a purple plate beside the double diamond; access road = number in a black-outlined box. Destinations use their black icon instead (no number).
2. **Name:** **Barlow Semi Condensed Bold, mixed case** (as written in the inventory), **1.5″ cap height**. Never shrink. Leading "To" is dropped (the arrow says "this way to"). Header, badge and numbers stay in Anton.
3. **Green Line badge** beside the name at the board size (H = 1″, the minimum, see §4), if that trail segment is on the Green Line.
4. Flexible space.
5. **Arrow** in the right-hand column, ~2.6″, colored per §4.

**Order:** straight entries first, then left-family, then right-family (component sorts automatically).

**Fit rule:** a name must fit the space at 1.5″ cap height (~16″ of name space; ~13.6″ with the Green Line badge; ~11.6″ on Extreme rows, whose symbol is wider). If it doesn't, use a **short sign name** (the inventory's "Sign Name" column; `BoardSign` picks it up by trail number) — never smaller type. `showChecks` outlines failures; `checkBoard(rows)` returns all problems.

**Short sign names in use** (inventory "Sign Name" column; boards use them automatically): Thompson Trail 71 → **Thompson**, Gobbler's Ridge 89 → **Gobbler's Rdg**, Maynard's Trail 21 → **Maynard's Trl**, Cane Creek Trail 91 → **Cane Creek**, Green Line Cut Through → **Cut-through**. Street signs, maps and the website keep the full names.

## 6. Street sign standard (Type 1)

`<StreetSign name number level route />`
- Reflective metal blade, **6″ tall**, **24″ wide** — **30″** only when the name won't fit 24″ at full letter height (`width="auto"` decides).
- Whole background = trail difficulty (access road = brown). **No difficulty symbol.** White lettering, Anton caps; trail number in a white box.
- On Green Line trails, a **Green Line badge plaque** (H = 3″) mounts under the blade.
- Vendor may supply final art; treat ours as the spec.

## 7. Trail marker standard (Type 3)

`<TrailMarker number level route direction />`
- 4″ post, 3.5″ white decals, 0.5″ apart: numbered trail symbol → Green Line badge decal (if on route; badge H = 1″ on a 3.5″ × 1.75″ white decal) → arrow (only where the path is unclear).
- Decals durable, weather-resistant, replaceable.

## 8. Never do

- Recolor a difficulty shape, or show color without its shape.
- Print a rating that isn't in the inventory.
- Use "Green Line" as a trail name, or put the badge on a segment that isn't on the route.
- Shrink lettering to fit; add board sizes beyond the five in the table; stretch or shrink the 4″ entry band; exceed 24″ board width.
- Use emoji, unicode arrows, or icons outside the bundled set.
- Place arrows on the back of a board.

## 9. Output checklist

Before delivering, confirm on every board: three-size rule, 1″ margins, header standard, **every entry a 4″ band and the board size matching the entry count**, names at 1.5″ cap height with no shrinking.

For every sign deliver:
- **The SVG print file** (see below) for every board, plus a review rendering (HTML using the components, `ppi` 12–18).
- Spec line: type, size, material (e.g. `Dibond 1/8″ · 24″ × 16″ · 3 entries`, or `Vendor blade · 30″ × 6″ + Green Line plaque`).
- Location, purpose, photo, sign ID, GPS (or "not recorded").
- Status: **ready for proof** or **not ready** + reason.
- "Check:" notes for every assumption.
- For a batch: a production schedule (count per board size, blades by width, plaques, signs on hold).

**Board print file (always, for every board sign request): an SVG.**
- Exact sign size: `width="24in"`, `height` = 6/12/16/20/24in. Coordinates at **300 DPI** (viewBox 7200 × 1800–7200).
- All text converted to outlines (no fonts needed), colors as hex, no guides, no mounting holes.
- Trim size by default. Add the 0.125″ bleed only when the printer asks (`bleed: true`).
- File name: `<signId>_24x<H>in.svg`, saved to `exports/`.
- Made with `tools/boardSvgExport.js`, which uses the same rules as `BoardSign`. People can use `tools/Board Sign Export.html`. Agents use a script:

```js
await (0, eval)(await readFile('tools/runScriptSetup.js'))({ readFile, readFileBinary });
const r = await HPBoardSVG.exportSVG({ signId: 'GL-04', rows: [ /* same rows as BoardSign */ ] });
await saveFile('exports/' + r.filename, r.svg);   // r.problems must be [] before calling it ready for proof
```

Color specs (CMYK / Pantone / sheeting) are still to be confirmed with the printer.

## 10. Printer spec (boards)

Boards are ordered online from **Square Signs — Dibond Signs** (https://www.squaresigns.com/product/dibond-signs/). Choose these options on every order:

| Option | Choice |
|---|---|
| Size | Custom: 24″ × the board height (6, 12, 16, 20 or 24″) |
| Material | **White Composite Aluminum** (Dibond / ACM: aluminum faces on a polyethylene core) |
| Thickness | **1/8″ (3 mm)** |
| Shape | **Square / Rectangle cut** (see corners below) |
| Print sides | **Single-sided** — one face per direction of approach |
| Lamination | **Matte** (cuts glare and scratches on the trail) |
| Drilled holes / standoffs / French cleat | None — mounting is handled at install |
| Artwork | Upload the SVG from `tools/boardSvgExport.js` (exact size, text outlined) |

- Square Signs prints with UV-cured inks and rates Dibond at **5+ years outdoors**.
- **Corners:** the print file has square, fully black corners, so a square cut looks finished. Our 0.5″ rounded corner is the on-screen look only; if you order the "Rounded" cut, confirm its radius with Square Signs.
- **Bleed:** files are trim size. If Square Signs asks for bleed, export with `bleed: true` (0.125″ black on every side).
- Same art and sizes if a board is ever reordered; the sign ID in the border identifies it.

---

### Minimal example

```jsx
<BoardSign signId="GL-20" ppi={16} rows={[
  { name: 'One Shot', number: '144', level: 'difficult', direction: 'right' },
  { name: 'Sunshine', number: '145', level: 'difficult', direction: 'right' },
  { name: 'Outfitter Trail', number: '100', level: 'easy', route: 'green-line', direction: 'left' },
]} />
// → 24″ × 16″ board, entries ordered left → right, ready for proof.
```
