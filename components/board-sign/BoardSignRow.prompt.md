One entry on a board sign (numbered trail symbol · NAME · optional Green Line badge · arrow at right); normally rendered for you by `<BoardSign rows={…}>`.

```jsx
<BoardSignRow name="Outfitter Trail" number="100" level="easy" route="green-line" direction="right" ppi={16} />
```

- Destinations: `level: 'destination', destination: 'cabins'` — black icon, black arrow, no number.
- Unrated (`level` missing): dashed gray symbol and gray arrow — placeholder only.
