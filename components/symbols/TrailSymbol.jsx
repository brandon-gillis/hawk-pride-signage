import React from 'react';
import { LEVELS } from './signSpec.js';

// Numbers sit at ~85% of the largest size that fits, leaving even breathing room inside the shape.
// Diamonds are already the tightest fit, so they keep full size to stay legible.
const NUM_SCALE = 0.85;

// Ink metrics for a string set in the sign face, measured once the webfont is ready.
const inkCache = {};
function measureInk(str) {
  const ready = !document.fonts || document.fonts.check('100px Anton');
  if (ready && inkCache[str]) return inkCache[str];
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = '100px Anton, Impact, sans-serif';
  const m = ctx.measureText(str);
  const left = m.actualBoundingBoxLeft || 0, right = m.actualBoundingBoxRight || m.width;
  const r = { w: left + right, left, asc: m.actualBoundingBoxAscent || 72, desc: m.actualBoundingBoxDescent || 0 };
  r.h = r.asc + r.desc;
  if (ready) inkCache[str] = r;
  return r;
}
function useFontReady() {
  const [, setT] = React.useState(0);
  React.useEffect(() => {
    let live = true;
    if (document.fonts && !document.fonts.check('100px Anton')) document.fonts.load('100px Anton').then(() => live && setT(t => t + 1));
    return () => { live = false; };
  }, []);
}
// Centered text element whose INK box (not em box) is centered on (cx, cy) at scale k.
function InkText({ str, ink, k: k0, cx, cy, fill, scale = NUM_SCALE }) {
  const k = k0 * scale;
  return <text x={cx - (k * ink.w) / 2 + k * ink.left} y={cy + (k * (ink.asc - ink.desc)) / 2} fill={fill}
    style={{ fontFamily: 'var(--font-sign)', fontSize: 100 * k + 'px' }}>{str}</text>;
}

/** Standardized numbered trail symbol (Playbook Part 1): white number inside the difficulty shape. Extreme = number plate beside a double diamond. size = height in px. */
export function TrailSymbol({ level = 'easy', number = '', size = 64, layout = 'row', keyline = false, title, style }) {
  useFontReady();
  const str = String(number ?? '');
  const ink = measureInk(str || '0');
  const spec = LEVELS[level];
  const label = title || ((spec ? spec.label : 'Unrated') + ' trail ' + str);
  const kl = keyline ? { stroke: 'var(--hp-white)', strokeWidth: 6, paintOrder: 'stroke' } : {};
  const svg = (w, h, children) => <svg width={size * w / 100} height={size * h / 100} viewBox={'0 0 ' + w + ' ' + h} role="img" aria-label={label} style={{ display: 'block', flex: 'none', overflow: 'visible', ...style }}>{children}</svg>;

  if (level === 'extreme') {
    const purple = 'var(--difficulty-extreme)';
    if (layout === 'stack') {
      const dd = 'M22 2 L42 24 L22 46 L2 24 Z M78 2 L98 24 L78 46 L58 24 Z';
      const k = Math.min(70 / ink.w, 30 / ink.h);
      return svg(100, 100, <>
        <path d={dd} fill={purple} {...kl} />
        <rect x="2" y="54" width="96" height="44" rx="6" fill={purple} {...kl} />
        <InkText str={str} ink={ink} k={k} cx={50} cy={76} fill="var(--hp-white)" />
      </>);
    }
    const k = Math.min(60 / ink.h, 1);
    const pw = Math.max(k * ink.w + 30, 64);
    const W = 180 + 10 + pw;
    return svg(W, 100, <>
      <path d="M45 2 L88 50 L45 98 L2 50 Z M135 2 L178 50 L135 98 L92 50 Z" fill={purple} {...kl} />
      <rect x="190" y="8" width={pw} height="84" rx="10" fill={purple} {...kl} />
      <InkText str={str} ink={ink} k={k} cx={190 + pw / 2} cy={50} fill="var(--hp-white)" />
    </>);
  }
  if (level === 'access') {
    const k = Math.min(56 / ink.h, 1);
    const bw = Math.max(k * ink.w + 28, 84);
    return svg(bw + 4, 100, <>
      <rect x="2" y="8" width={bw} height="84" rx="8" fill="var(--hp-white)" stroke="var(--hp-black)" strokeWidth="8" />
      <InkText str={str} ink={ink} k={k} cx={2 + bw / 2} cy={50} fill="var(--hp-black)" />
    </>);
  }
  if (!spec) {
    const k = Math.min(2 * 40 / Math.hypot(ink.w, ink.h), 56 / ink.h);
    return svg(100, 100, <>
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--hp-gray-400)" strokeWidth="6" strokeDasharray="12 8" />
      <InkText str={str} ink={ink} k={k} cx={50} cy={50} fill="var(--hp-gray-400)" />
    </>);
  }
  let shape, k;
  if (spec.symbol === 'circle') { shape = <circle cx="50" cy="50" r="47" fill={spec.color} {...kl} />; k = Math.min((2 * 40.5) / Math.hypot(ink.w, ink.h), 56 / ink.h); }
  else if (spec.symbol === 'square') { shape = <rect x="6" y="6" width="88" height="88" fill={spec.color} {...kl} />; k = Math.min(72 / ink.w, 56 / ink.h); }
  else { shape = <path d="M50 1 L99 50 L50 99 L1 50 Z" fill={spec.color} {...kl} />; k = Math.min(84 / (ink.w + ink.h), 46 / ink.h); }
  return svg(100, 100, <>{shape}{str && <InkText str={str} ink={ink} k={k} cx={50} cy={50} fill="var(--hp-white)" scale={spec.symbol === 'diamond' ? 1 : NUM_SCALE} />}</>);
}
