import React from 'react';
import { BADGE_SPEC, ROUTES, DEFAULT_PPI } from './signSpec.js';
import { RouteBadge } from './RouteBadge.jsx';
import { DirectionArrow } from './DirectionArrow.jsx';

/** Route continuity marker: route badge + arrow in the route color, on a white plaque. Inches × ppi. */
export function RouteMarker({ route = 'green-line', direction = 'right', ppi = DEFAULT_PPI, style }) {
  const r = ROUTES[route] || ROUTES['green-line'];
  const left = /left$/.test(String(direction));
  const arrow = <DirectionArrow direction={direction} color={r.color} size={3.5 * ppi} strokeWidth={3.75} />;
  return <div data-sign="route-marker" style={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 * ppi, padding: 0.6 * ppi + 'px ' + 0.8 * ppi + 'px', background: 'var(--sign-face)', border: 0.25 * ppi + 'px solid ' + r.color, borderRadius: 0.4 * ppi, flex: 'none', ...style }}>
    {left && arrow}<RouteBadge route={route} height={BADGE_SPEC.heights.routeMarker * ppi} />{!left && arrow}
  </div>;
}
