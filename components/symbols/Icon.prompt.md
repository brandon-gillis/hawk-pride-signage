Renders a bundled Lucide line icon; use for destination pictograms and UI glyphs.

```jsx
<Icon name="tent" size={48} strokeWidth={2.75} color="var(--hp-black)" />
```

- Only names present in `iconData.js` render (others return null). Prefer `<DestinationIcon destination="campground" />` on signs.
