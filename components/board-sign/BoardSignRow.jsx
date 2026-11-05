import React from 'react';
import { LEVELS, ROUTES, DEFAULT_PPI } from '../symbols/signSpec.js';
import { TrailSymbol } from '../symbols/TrailSymbol.jsx';
import { DestinationIcon } from '../symbols/DestinationIcon.jsx';
import { DirectionArrow } from '../symbols/DirectionArrow.jsx';
import { RouteBadge } from '../symbols/RouteBadge.jsx';
import { BOARD, BOARD_NAME_FS, BOARD_SYM, BOARD_GAP, BOARD_ARROW, BOARD_BADGE_H, BOARD_BADGE_LINE_FS, BOARD_BADGE_INLINE_H, BOARD_BADGE_PADX, boardLabel, checkRow } from './boardLayout.js';

/** One entry on a board sign: numbered trail symbol · NAME · [Green Line badge] · arrow (right column). */
export function BoardSignRow({ name, number, level, destination, direction = 'right', route, arrowLevel, ppi = DEFAULT_PPI, showChecks = false, style }) {
  const u = ppi;
  const dest = level === 'destination', conn = level === 'connector'; // connector: unnumbered, unrated link trail
  const rated = !!LEVELS[level] && !dest;
  const al = arrowLevel || level;
  const arrowColor = LEVELS[al] ? undefined : dest || conn ? 'var(--wayfinding-destination)' : 'var(--hp-gray-400)';
  const fits = checkRow({ name, route }).fits;
  return (
    <div data-sign-row={level || 'unrated'} data-fits={fits ? 'true' : 'false'} style={{ display: 'flex', alignItems: 'center', gap: BOARD_GAP * u, padding: '0 ' + BOARD.margin * u + 'px', width: '100%', boxSizing: 'border-box', outline: showChecks && !fits ? '2px dashed var(--hp-red)' : 'none', outlineOffset: -2, ...style }}>
      <div style={{ minWidth: BOARD_SYM * u, flex: 'none', display: 'flex', justifyContent: 'center' }}>
        {conn ? null : dest ? <DestinationIcon destination={destination || 'info'} size={BOARD_SYM * 0.9 * u} strokeWidth={3} />
          : <TrailSymbol level={rated || level === 'access' ? level : null} number={number ?? ''} size={(level === 'difficult' ? BOARD_SYM * 1.1 : BOARD_SYM) * u} />}
      </div>
      <div style={{ fontFamily: 'var(--font-sign-name)', fontWeight: 700, fontSize: BOARD_NAME_FS * u, lineHeight: 1, whiteSpace: 'nowrap', color: 'var(--sign-ink)', paddingBottom: BOARD_NAME_FS * 0.1 * u, minWidth: 0, overflow: 'hidden' }}>{boardLabel(name, number)}</div>
      {route && <RouteBadge route={route} height={BOARD_BADGE_INLINE_H * u} />}
      <div style={{ flex: 1 }} />
      <div style={{ width: BOARD_ARROW * u, flex: 'none', display: 'flex', justifyContent: 'center' }}>
        <DirectionArrow direction={direction} level={LEVELS[al] ? al : undefined} color={arrowColor} size={BOARD_ARROW * u} strokeWidth={3.75} />
      </div>
    </div>
  );
}
