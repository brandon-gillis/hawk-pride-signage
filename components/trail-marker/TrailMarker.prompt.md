Type 3 trail marker — a post with 3.5in decals: the numbered trail symbol, the Green Line badge where the segment is on the route, and an arrow where needed; use along trails, at entrances, confusing junctions and just after major junctions.

```jsx
<TrailMarker number={71} level="moderate" route="green-line" direction="bear-left" ppi={12} />
<TrailMarker routes={[{ number: 7, level: 'easy', direction: 'right' }, { number: 31, level: 'difficult', direction: 'left' }]} />
```

- Decals are white with colored symbol/arrow so they read on any post color.
- `showPost={false}` renders just the decal stack for a decal print sheet.
