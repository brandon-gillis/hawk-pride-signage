import React from 'react';
import { LEVELS, RATED_LEVELS } from '../symbols/signSpec.js';
import { DifficultySymbol } from '../symbols/DifficultySymbol.jsx';

/** Park difficulty legend — the official key for maps, boards and the website. */
export function DifficultyLegend({ variant = 'row', showAccess = true, showDetails = false, size = 48, style }) {
  const levels = showAccess ? [...RATED_LEVELS, 'access'] : RATED_LEVELS;
  if (variant === 'table') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', columnGap: size * 0.5, rowGap: size * 0.35, alignItems: 'center', fontFamily: 'var(--font-body)', color: 'var(--text-body)', ...style }}>
        {levels.map(l => (
          <React.Fragment key={l}>
            <div style={{ width: size * 1.8, display: 'flex', justifyContent: 'center' }}><DifficultySymbol level={l} size={l === 'extreme' ? size * 0.8 : size} /></div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: size * 0.5, textTransform: 'uppercase', lineHeight: 1 }}>{LEVELS[l].label}</div>
            <div style={{ fontSize: Math.max(size * 0.27, 11), lineHeight: 1.35 }}>
              <div>{LEVELS[l].terrain}</div>
              {showDetails && LEVELS[l].vehicles && <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>{LEVELS[l].vehicles}</div>}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: size * 0.6, fontFamily: 'var(--font-body)', ...style }}>
      {levels.map(l => (
        <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.2 }}>
          <div style={{ height: size, display: 'flex', alignItems: 'center' }}><DifficultySymbol level={l} size={l === 'extreme' ? size * 0.85 : size} /></div>
          <div style={{ fontSize: Math.max(size * 0.24, 10), fontWeight: 700, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-body)' }}>{LEVELS[l].label}</div>
        </div>
      ))}
    </div>
  );
}
