Type 1 street-sign blade for primary navigation routes — placed at route beginnings and at intersections of two primary routes.

```jsx
<StreetSign name="Thompson Trail" number={71} level="moderate" route="green-line" ppi={12} />
```

- Face color = difficulty; lettering always white. No difficulty symbol by default (Playbook: the background already communicates it); `showSymbol` adds one.
- `route="green-line"` adds the Green Line badge plaque below the blade.
- `level="access"` → brown access-road blade, no symbol.
- Size: 6″ tall; 24″ wide, or 30″ when the name won't fit 24″ at full letter height. `width="auto"` (default) chooses; never shrink lettering to stay at 24″. Vendor may supply final artwork; treat as spec, not print file.
- Never put a street sign on a trail that is not in the primary navigation network.
