Sign-weight arrow — single direction or compound route — colored by the trail's difficulty (or black for destinations/access).

```jsx
<DirectionArrow direction="bear-left" level="moderate" size={64} />
<DirectionArrow direction="straight-then-right" level="easy" size={64} />
<DirectionArrow direction={['straight', 'right', 'down']} level="difficult" size={64} />
```

- Single moves: straight, bear-right, right, back-right, back, back-left, left, bear-left (`up`/`down` = straight/back).
- Compound: join moves with `-then-` (or pass an array). Drawn as one rounded line, head on the last leg. Common ones in `ARROW_PRESETS`.
- Keep compound routes to 3 moves max so they read at distance.
- On board signs the row places the arrow on the left when the route's net movement is leftward.
- On board signs the arrow color IS the meaning — never use a neutral arrow for a rated trail.
