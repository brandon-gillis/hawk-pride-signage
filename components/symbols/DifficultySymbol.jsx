import React from 'react';
import { LEVELS } from './signSpec.js';

/** The four difficulty shapes. size = height in px. */
export function DifficultySymbol({ level = 'easy', size = 48, tone = 'color', keyline = false, title, style }) {
  const spec = LEVELS[level] || LEVELS.easy;
  const fill = tone === 'white' ? 'var(--hp-white)' : tone === 'black' ? 'var(--hp-black)' : spec.color;
  const stroke = keyline ? { stroke: 'var(--hp-white)', strokeWidth: 6, paintOrder: 'stroke' } : {};
  const label = title || spec.symbolName;
  if (spec.symbol === 'none') {
    return <svg width={size * 1.6} height={size} viewBox="0 0 160 100" role="img" aria-label={label} style={{ display: 'block', ...style }}>
      <rect x="4" y="40" width="152" height="20" rx="10" fill={tone === 'color' ? spec.lineColor : fill} />
    </svg>;
  }
  if (spec.symbol === 'double-diamond') {
    return <svg width={size * 1.8} height={size} viewBox="0 0 180 100" role="img" aria-label={label} style={{ display: 'block', ...style }}>
      <path d="M45 2 L88 50 L45 98 L2 50 Z M135 2 L178 50 L135 98 L92 50 Z" fill={fill} {...stroke} />
    </svg>;
  }
  const shape = spec.symbol === 'circle' ? <circle cx="50" cy="50" r="47" fill={fill} {...stroke} />
    : spec.symbol === 'square' ? <rect x="8" y="8" width="84" height="84" fill={fill} {...stroke} />
    : <path d="M50 2 L98 50 L50 98 L2 50 Z" fill={fill} {...stroke} />;
  return <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label} style={{ display: 'block', ...style }}>{shape}</svg>;
}
