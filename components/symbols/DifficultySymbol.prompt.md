Renders one of the four Hawk Pride difficulty shapes (or the access-road bar); use anywhere difficulty must be read at a glance.

```jsx
<DifficultySymbol level="difficult" size={64} />
<DifficultySymbol level="extreme" size={40} tone="white" />
```

- `level`: easy (green circle) · moderate (blue square) · difficult (red diamond) · extreme (purple double diamond) · access (gray bar, not a rating)
- `tone="white"` on colored sign faces; `keyline` on dark grounds.
- Never recolor a shape. Shape and color always travel together.
