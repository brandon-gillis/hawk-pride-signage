Type 2 board sign — the standard printed Dibond (aluminum composite) board for decision points; give it the entries and it applies every Hawk Pride board rule (size, order, margins, header, type, arrows, badge).

```jsx
<BoardSign signId="GL-04" ppi={16} rows={[
  { name: 'Ridgeline', number: '81', level: 'access', direction: 'left' },
  { name: 'Lower Ridgeline', number: '101', level: 'moderate', direction: 'right' },
  { name: 'Outfitter Trail', number: '100', level: 'easy', route: 'green-line', direction: 'straight' },
]} />
```

- Every entry is a fixed 4″ band (symbol, name and arrow centered in it), stacked under a 2.5″ header.
- Size is automatic: 24×6 (1 entry, no header), 24×12 (2), 24×16 (3), 24×20 (4), 24×24 (5). More than 5 → make two boards.
- Rows are sorted straight → left → right; "To" is stripped; names are Barlow Semi Condensed Bold, mixed case, at 1.5″ cap height and never shrink; the Green Line badge is the standard RouteBadge at H = 1″.
- Always look up number + level in `TRAIL_INVENTORY` (new numbers). Unrated trails render gray and are not printable.
- `showChecks` outlines names that are too long; the board's `data-ready` / `title` list every problem.
- Full rules and the request workflow: `NEW_SIGN_INSTRUCTIONS.md`.
- **Print file:** always export boards with `HPBoardSVG.exportSVG({ signId, rows })` from `tools/boardSvgExport.js`. It produces an SVG at the exact sign size and 300 DPI with outlined text. See `NEW_SIGN_INSTRUCTIONS.md` §9.
