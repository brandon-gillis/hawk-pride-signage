Navigation Route Badge — a square-cornered route-green rectangle with "GREEN LINE" in white; use wherever a sign marks membership in the Green Line.

```jsx
<RouteBadge route="green-line" height={2 * ppi} />
```

- Never replaces a trail's name, number or difficulty — it sits beside them.
- Square corners, deeper green (`--route-green-line`) and no white border keep it distinct from the Easy circle and an Easy street blade.
- Apply only to the portion of a trail that is actually on the route.
- New routes: add an entry to `ROUTES` in signSpec.js and a `--route-*` token.

**Spec:** height H sets everything: Anton caps at 0.52 H, 0.25 H side padding, 0.02 em tracking, square corners, no border, 0.25 H clear space, minimum 1″. Standard H: board 1″, route marker 2.2″, street plaque 3″, marker decal 1″ (`BADGE_SPEC.heights`). Never pass font-size or padding overrides.
