import React from 'react';
import { LEVELS, SIZES, DEFAULT_PPI, BADGE_SPEC } from '../symbols/signSpec.js';
import { DifficultySymbol } from '../symbols/DifficultySymbol.jsx';
import { useFitText } from '../symbols/useFitText.js';
import { RouteBadge } from '../symbols/RouteBadge.jsx';

function textWidthIn(str, fontIn, tracking = 0) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = '100px Anton, Impact, sans-serif';
  return (ctx.measureText(str).width / 100) * fontIn + str.length * tracking * fontIn;
}
// Smallest standard width (24 → 30) whose name area holds the name at full letter height.
export function pickStreetWidth({ name = '', number, height = SIZES.street.height, showSymbol = false }) {
  const s = SIZES.street, H = height;
  const pad = s.inset + s.border + H * 0.07, gap = H * 0.1;
  const numW = number != null && number !== '' ? Math.max(H * 0.56, textWidthIn(String(number), H * 0.42) + H * 0.12) + gap : 0;
  const symW = showSymbol ? H * 0.42 + gap : 0;
  const need = textWidthIn(String(name).toUpperCase(), H * 0.6, 0.01);
  for (const w of s.widths) if (w - 2 * pad - numW - symW >= need) return w;
  return s.widths[s.widths.length - 1];
}
function useFontTick() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { let live = true; if (document.fonts) document.fonts.load('100px Anton').then(() => live && setT(x => x + 1)); return () => { live = false; }; }, []);
  return t;
}

/** Type 1 — reflective street-sign blade. Whole face = difficulty color. width 'auto' picks 24″ or 30″ by name length. */
export function StreetSign({ name = 'Trail Name', number, level = 'easy', route, width = 'auto', height = SIZES.street.height, ppi = DEFAULT_PPI, showSymbol = false, style }) {
  const spec = LEVELS[level] || LEVELS.easy;
  const s = SIZES.street;
  const tick = useFontTick();
  const widthIn = React.useMemo(() => (width === 'auto' ? pickStreetWidth({ name, number, height, showSymbol }) : width), [width, name, number, height, showSymbol, tick]);
  const W = widthIn * ppi, H = height * ppi;
  const inset = s.inset * ppi, bw = s.border * ppi, r = s.corner * ppi;
  const pad = inset + bw + H * 0.07;
  const nameRef = React.useRef(null);
  const base = H * 0.6;
  useFitText(nameRef, base, [name, number, W, H, showSymbol, level]);
  const hasSymbol = showSymbol && spec.symbol !== 'none';
  const blade = (
    <div data-sign="street" data-width-in={widthIn} style={{ width: W, height: H, background: spec.color, borderRadius: r, position: 'relative', boxSizing: 'border-box', flex: 'none', ...style }}>
      <div style={{ position: 'absolute', inset, border: bw + 'px solid var(--sign-ink-inverse)', borderRadius: Math.max(r - inset, 0) }} />
      <div style={{ position: 'absolute', inset: pad, display: 'flex', alignItems: 'center', gap: H * 0.1 }}>
        {number != null && number !== '' && (
          <div style={{ flex: 'none', height: H * 0.56, minWidth: H * 0.56, padding: '0 ' + H * 0.06 + 'px', boxSizing: 'border-box', background: 'var(--sign-ink-inverse)', color: spec.color, borderRadius: H * 0.06, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sign)', fontSize: H * 0.42, lineHeight: 1 }}>{number}</div>
        )}
        <div ref={nameRef} style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', fontFamily: 'var(--font-sign)', fontSize: base, lineHeight: 1.1, color: 'var(--sign-ink-inverse)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-sign)', textAlign: 'center' }}>{name}</div>
        {hasSymbol && <DifficultySymbol level={level} tone="white" size={H * 0.42} style={{ flex: 'none' }} />}
      </div>
    </div>
  );
  if (!route) return blade;
  return <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 * ppi, flex: 'none' }}>{blade}<RouteBadge route={route} height={BADGE_SPEC.heights.streetPlaque * ppi} /></div>;
}
