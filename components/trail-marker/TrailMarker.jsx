import React from 'react';
import { SIZES, DEFAULT_PPI, BADGE_SPEC } from '../symbols/signSpec.js';
import { TrailSymbol } from '../symbols/TrailSymbol.jsx';
import { DirectionArrow } from '../symbols/DirectionArrow.jsx';
import { RouteBadge } from '../symbols/RouteBadge.jsx';

function Decal({ size, children }) {
  return <div style={{ width: size, height: size, background: 'var(--sign-face)', borderRadius: size * 0.08, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', flex: 'none' }}>{children}</div>;
}

/** Type 3 — trail marker post with stacked decals (number, symbol, optional arrow) per route. */
export function TrailMarker({ number = 1, level = 'easy', direction, route, routes, ppi = DEFAULT_PPI, postBelow = 8, showPost = true, style }) {
  const m = SIZES.marker;
  const list = routes && routes.length ? routes : [{ number, level, direction, route }];
  const pw = m.postWidth * ppi, d = m.decal * ppi, gap = m.gap * ppi;
  return (
    <div data-sign="marker" style={{ width: pw, display: 'flex', flexDirection: 'column', alignItems: 'center', gap, padding: gap + 'px 0 ' + (showPost ? postBelow * ppi : gap) + 'px', background: showPost ? 'var(--hp-post-wood)' : 'transparent', borderRadius: pw * 0.06 + 'px ' + pw * 0.06 + 'px 0 0', flex: 'none', ...style }}>
      {list.map((r, i) => (
        <React.Fragment key={i}>
          <Decal size={d}><TrailSymbol level={r.level} number={r.number} size={d * 0.84} layout="stack" /></Decal>
          {r.route && <div style={{ width: d, height: d * 0.5, background: 'var(--sign-face)', borderRadius: d * 0.08, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RouteBadge route={r.route} height={(BADGE_SPEC.heights.markerDecal / 3.5) * d} /></div>}
          {r.direction && <Decal size={d}><DirectionArrow direction={r.direction} level={r.level} size={d * 0.8} strokeWidth={3.5} /></Decal>}
        </React.Fragment>
      ))}
    </div>
  );
}
