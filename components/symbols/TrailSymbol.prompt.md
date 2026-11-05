The standard trail identification graphic — trail number inside its difficulty shape; use on trail markers, board-sign rows and maps.

```jsx
<TrailSymbol level="easy" number="21" size={72} />
<TrailSymbol level="difficult" number="149b" size={72} />
<TrailSymbol level="extreme" number="11" size={72} />            {/* plate beside double diamond */}
<TrailSymbol level="extreme" number="11" size={72} layout="stack" />  {/* square, for decals */}
```

- Diamonds have the least room inside; draw Difficult symbols ~1.2× the circle/square size so 3-digit numbers stay legible (BoardSignRow does this).
- Number is white, set at 85% of the largest size that fits (NUM_SCALE) so every shape keeps the same margin around it; auto-fits the shape's inner area by measuring the actual glyphs; 3-digit diamonds get smallest — check readability at the intended size.
- Never show the number and the symbol as separate elements, except Extreme (built in) or where readability requires it.
- Street signs do NOT use this; their full background already carries difficulty.
