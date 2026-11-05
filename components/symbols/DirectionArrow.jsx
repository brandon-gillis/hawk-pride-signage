import React from 'react';
import { Icon } from './Icon.jsx';
import { DIRECTIONS, LEVELS } from './signSpec.js';
import { parseDirection, pathArrowD } from './pathArrow.js';

/** Directional arrow (single or compound route); color comes from the level it points to. */
export function DirectionArrow({ direction = 'right', level, color, size = 48, strokeWidth = 3.25, style }) {
  const spec = level ? LEVELS[level] : null;
  const c = color || (spec ? (spec.arrowColor || spec.color) : 'var(--sign-ink)');
  const moves = parseDirection(direction);
  if (moves.length > 1) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={moves.join(' then ')}
      style={{ display: 'block', flex: 'none', ...style }}><path d={pathArrowD(moves)} /></svg>;
  }
  return <Icon name={DIRECTIONS[moves[0]] || 'arrow-right'} size={size} color={c} strokeWidth={strokeWidth} title={moves[0]} style={style} />;
}
