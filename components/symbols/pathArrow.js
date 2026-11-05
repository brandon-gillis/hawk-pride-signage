// Compound route arrows: a sequence of moves drawn as one rounded polyline with a head on the last leg.
// Accepts arrays (['straight','right']) or strings ('straight-then-right', 'straight>right>down').
const V = { straight: [0, -1], up: [0, -1], back: [0, 1], down: [0, 1], right: [1, 0], left: [-1, 0],
  'bear-right': [0.7071, -0.7071], 'bear-left': [-0.7071, -0.7071], 'back-right': [0.7071, 0.7071], 'back-left': [-0.7071, 0.7071] };
export const ARROW_MOVES = Object.keys(V);
export const ARROW_PRESETS = [
  'straight-then-right', 'straight-then-left', 'right-then-straight', 'left-then-straight',
  'straight-then-right-then-down', 'straight-then-left-then-down',
  'straight-then-right-then-straight', 'straight-then-left-then-straight',
  'right-then-down', 'left-then-down', 'straight-then-bear-right', 'straight-then-bear-left',
];
export function parseDirection(d) {
  if (Array.isArray(d)) return d;
  if (!d) return [];
  return String(d).split(/-then-|>|,/).map(s => s.trim()).filter(Boolean);
}
const legLen = (i, n) => (n === 1 ? 1 : i === 0 ? 1.4 : 1);
export function isLeftward(d) {
  let x = 0;
  parseDirection(d).forEach((m, i, a) => { x += (V[m] || [0, 0])[0] * legLen(i, a.length); });
  return x < -0.05;
}
const n2 = v => Math.round(v * 100) / 100;
export function pathArrowD(d, { box = 24, fit = 19, radius = 2.6, arm = 6 } = {}) {
  const moves = parseDirection(d).filter(m => V[m]);
  if (!moves.length) return '';
  const pts = [[0, 0]];
  moves.forEach((m, i) => { const v = V[m], p = pts[pts.length - 1], L = legLen(i, moves.length); pts.push([p[0] + v[0] * L, p[1] + v[1] * L]); });
  const last = V[moves[moves.length - 1]], e = pts[pts.length - 1], c = Math.SQRT1_2;
  const head = a => { const bx = -last[0], by = -last[1];
    return [[e[0] + a * c * (bx - by), e[1] + a * c * (bx + by)], [e[0] + a * c * (bx + by), e[1] + a * c * (by - bx)]]; };
  const bbox = ps => { const xs = ps.map(p => p[0]), ys = ps.map(p => p[1]);
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }; };
  let s = 16 / Math.max(...(b => [b.x1 - b.x0, b.y1 - b.y0, 0.001])(bbox(pts)));
  let b;
  for (let k = 0; k < 3; k++) { b = bbox([...pts, ...head(arm / s)]); s = fit / Math.max(b.x1 - b.x0, b.y1 - b.y0, 0.001); }
  b = bbox([...pts, ...head(arm / s)]);
  const cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
  const T = p => [(p[0] - cx) * s + box / 2, (p[1] - cy) * s + box / 2];
  const P = pts.map(T);
  let out = 'M' + n2(P[0][0]) + ' ' + n2(P[0][1]);
  for (let i = 1; i < P.length - 1; i++) {
    const [px, py] = P[i - 1], [x, y] = P[i], [nx, ny] = P[i + 1];
    const d1 = Math.hypot(px - x, py - y), d2 = Math.hypot(nx - x, ny - y), r = Math.min(radius, d1 / 2, d2 / 2);
    const a = [x + (px - x) / d1 * r, y + (py - y) / d1 * r], z = [x + (nx - x) / d2 * r, y + (ny - y) / d2 * r];
    out += 'L' + n2(a[0]) + ' ' + n2(a[1]) + 'Q' + n2(x) + ' ' + n2(y) + ' ' + n2(z[0]) + ' ' + n2(z[1]);
  }
  const E = P[P.length - 1], [h1, h2] = head(arm / s).map(T);
  out += 'L' + n2(E[0]) + ' ' + n2(E[1]) + 'M' + n2(h1[0]) + ' ' + n2(h1[1]) + 'L' + n2(E[0]) + ' ' + n2(E[1]) + 'L' + n2(h2[0]) + ' ' + n2(h2[1]);
  return out;
}
