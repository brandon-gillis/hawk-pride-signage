import React from 'react';
import { DEFAULT_PPI } from '../symbols/signSpec.js';
import { BoardSignRow } from './BoardSignRow.jsx';
import { BOARD, BOARD_WORD_FS, orderRows, boardHeight, checkBoard } from './boardLayout.js';

import { BRANDMARK_WHITE } from './brandmarkWhite.js';

// Anton, line-height 1: the cap top sits 0.0642 em below the line-box top (hhea 2409/-674, cap 1760, upm 2048).
const ANTON_CAP_TOP_EM = 0.0642;
const BRANDMARK_ASPECT = 500 / 256; // brandmark-white.svg viewBox; explicit width keeps the SVG from stretching its box

/** Type 2 board sign — the Hawk Pride board standard (24″ wide; 6/12/16/20/24″ tall for 1–5 entries; fixed 4″ entries). */
export function BoardSign({ rows = [], signId, ppi = DEFAULT_PPI, logoSrc, showGuides = false, showChecks = false, style }) {
  // Fit checks measure Anton; re-render once the webfont is ready so checks never use fallback-font widths.
  const [, setFontTick] = React.useState(0);
  React.useEffect(() => {
    let live = true;
    if (typeof document !== 'undefined' && document.fonts) document.fonts.load('100px Anton').then(() => document.fonts.ready).then(() => live && setFontTick(t => t + 1));
    return () => { live = false; };
  }, []);
  const u = ppi, W = BOARD.width;
  const ordered = orderRows(rows);
  const H = boardHeight(ordered.length) || 24;
  // One-entry boards (24×6) have no header.
  const header = ordered.length > 1;
  const bodyTop = header ? BOARD.margin + BOARD.headerHeight + BOARD.headerGap : BOARD.margin, bodyH = H - bodyTop - BOARD.margin;
  // Every entry is a fixed-height band (BOARD.entryHeight); board height is chosen so the bands fill the body exactly.
  const rowH = BOARD.entryHeight;
  const problems = checkBoard(rows);
  const guide = 'oklch(0.6 0.25 330)';
  return (
    <div data-sign="board" data-size={W + 'x' + H} data-ready={problems.length ? 'false' : 'true'} title={problems.join('\n') || undefined}
      style={{ position: 'relative', width: W * u, height: H * u, background: 'var(--sign-face)', borderRadius: BOARD.corner * u, flex: 'none', ...style }}>
      {header && <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: (BOARD.margin + BOARD.headerHeight + BOARD.headerGap / 2) * u, background: 'var(--sign-frame)', borderRadius: BOARD.corner * u + 'px ' + BOARD.corner * u + 'px 0 0' }} />}
      <div style={{ position: 'absolute', inset: 0, border: BOARD.border * u + 'px solid var(--sign-frame)', borderRadius: BOARD.corner * u }} />
      {header && <div style={{ position: 'absolute', left: BOARD.margin * u, right: BOARD.margin * u, top: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: BOARD.brandGap * u }}>
        <img src={logoSrc || BRANDMARK_WHITE} alt="" style={{ height: BOARD.markHeight * u, width: BOARD.markHeight * BRANDMARK_ASPECT * u, marginTop: BOARD.markTop * u, display: 'block', flex: 'none' }} />
        <div style={{ fontFamily: 'var(--font-sign)', fontSize: BOARD_WORD_FS * u, lineHeight: 1, textTransform: 'uppercase', whiteSpace: 'nowrap', color: 'var(--hp-white)', letterSpacing: '0.02em', marginTop: (BOARD.wordCapTop - ANTON_CAP_TOP_EM * BOARD_WORD_FS) * u }}>Hawk Pride Offroad</div>
      </div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: bodyTop * u }}>
        {ordered.map((r, i) => (
          <div key={i} style={{ position: 'relative', height: rowH * u, display: 'flex', alignItems: 'center' }}>
            {i > 0 && <div style={{ position: 'absolute', top: -BOARD.rowRule / 2 * u, left: BOARD.margin * u, right: BOARD.margin * u, height: BOARD.rowRule * u, background: 'var(--hp-gray-400)', borderRadius: BOARD.rowRule * u }} />}
            <BoardSignRow {...r} ppi={ppi} showChecks={showChecks} />
          </div>
        ))}
      </div>
      {signId && <div style={{ position: 'absolute', right: 2 * u, bottom: 0, height: BOARD.border * u, display: 'flex', alignItems: 'center', fontFamily: 'var(--font-sign)', fontSize: 0.26 * u, lineHeight: 1, letterSpacing: '0.06em', color: 'var(--hp-white)' }}>{signId}</div>}
      {showGuides && (
        <svg width={W * u} height={H * u} viewBox={'0 0 ' + W + ' ' + H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
          <rect x={-BOARD.bleed} y={-BOARD.bleed} width={W + 2 * BOARD.bleed} height={H + 2 * BOARD.bleed} rx="0.6" fill="none" stroke="oklch(0.7 0.15 230)" strokeWidth="0.05" strokeDasharray="0.2 0.15" />
          <rect x="0" y="0" width={W} height={H} rx={BOARD.corner} fill="none" stroke={guide} strokeWidth="0.06" />
          <rect x={BOARD.margin} y={BOARD.margin} width={W - 2 * BOARD.margin} height={H - 2 * BOARD.margin} fill="none" stroke={guide} strokeWidth="0.05" strokeDasharray="0.3 0.2" />
          {header && <line x1={BOARD.margin} x2={W - BOARD.margin} y1={BOARD.margin + BOARD.headerHeight} y2={BOARD.margin + BOARD.headerHeight} stroke={guide} strokeWidth="0.04" />}
        </svg>
      )}
    </div>
  );
}
