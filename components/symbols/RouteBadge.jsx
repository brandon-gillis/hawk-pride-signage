import React from 'react';
import { ROUTES, BADGE_SPEC } from './signSpec.js';

const ANTON_CAP = 0.86; // Anton cap height / em
const ANTON_CAP_TOP_EM = 0.0642; // cap top below the line-box top at line-height 1

/** Navigation Route Badge — the one badge standard (BADGE_SPEC): route color, white Anton caps at 0.52 H, 0.25 H side padding, square corners. height = H in px. */
export function RouteBadge({ route = 'green-line', height = 32, style }) {
  const r = ROUTES[route] || ROUTES['green-line'];
  const H = height, cap = BADGE_SPEC.capRatio * H, fs = cap / ANTON_CAP;
  const padTop = (H - cap) / 2 - ANTON_CAP_TOP_EM * fs; // centres the CAP height (not the em box) in the bar
  return <div role="img" aria-label={r.label + ' route'} style={{ display: 'inline-flex', alignItems: 'flex-start', flex: 'none', height: H, padding: padTop + 'px ' + BADGE_SPEC.padX * H + 'px 0', boxSizing: 'border-box', background: r.color, color: r.ink, fontFamily: 'var(--font-sign)', fontSize: fs, lineHeight: 1, textTransform: 'uppercase', letterSpacing: BADGE_SPEC.tracking + 'em', whiteSpace: 'nowrap', borderRadius: 0, ...style }}>{r.label}</div>;
}
