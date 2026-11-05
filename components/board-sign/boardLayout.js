// Board sign standard — geometry + rules shared by BoardSign and BoardSignRow. All values in inches.
import { SIZES, BOARD_SIZES, MAX_BOARD_ROWS, BADGE_SPEC } from '../symbols/signSpec.js';
import { TRAIL_INVENTORY } from '../symbols/trailInventory.js';
import { parseDirection } from '../symbols/pathArrow.js';

export const BOARD = SIZES.board;
const ANTON_CAP = 0.86;  // Anton cap height / em (header, badge, numbers)
const BARLOW_CAP = 0.70; // Barlow Semi Condensed cap height / em (entry names)
export const BOARD_NAME_FONT = '700 100px "Barlow Semi Condensed"';
export const BOARD_NAME_FS = BOARD.nameCap / BARLOW_CAP;          // name font-size, in (Barlow SC Bold, mixed case)
export const BOARD_WORD_FS = BOARD.wordmarkCap / ANTON_CAP;       // HAWK PRIDE OFFROAD font-size, in
const L = BOARD.nameCap / ANTON_CAP; // symbol/arrow/badge scale (unchanged by the name face)
export const BOARD_SYM = L * 1.45, BOARD_GAP = L * 0.25, BOARD_ARROW = L * 1.5, BOARD_BADGE_H = L * 0.85;
export const BOARD_CONTENT_W = BOARD.width - 2 * BOARD.margin;

const MX = { straight: 0, up: 0, back: 0, down: 0, right: 1, left: -1, 'bear-right': 0.7, 'bear-left': -0.7, 'back-right': 0.7, 'back-left': -0.7 };
const netX = d => parseDirection(d).reduce((x, m, i, a) => x + (MX[m] || 0) * (a.length > 1 && i === 0 ? 1.4 : 1), 0);
/** Standard row order: straight, then left-family, then right-family; ties keep input order. */
export function orderRows(rows) {
  const k = d => { const x = netX(d); return Math.abs(x) <= 0.05 ? 0 : x < 0 ? 1 : 2; };
  return rows.map((r, i) => ({ r, i })).sort((a, b) => k(a.r.direction) - k(b.r.direction) || a.i - b.i).map(o => o.r);
}
/** Board text: the inventory's short Sign Name when it has one (matched by trail number, else by full name), and never a "To" prefix — the arrow already says it. */
const SIGN_NAME_BY_NUMBER = {}, SIGN_NAME_BY_NAME = {};
TRAIL_INVENTORY.forEach(t => { if (t.signName) { SIGN_NAME_BY_NUMBER[String(t.number)] = t.signName; SIGN_NAME_BY_NAME[String(t.name).toLowerCase()] = t.signName; } });
export const boardLabel = (name, number) => {
  const n = String(name || '').replace(/^to\s+/i, '');
  return (number != null && SIGN_NAME_BY_NUMBER[String(number)]) || SIGN_NAME_BY_NAME[n.toLowerCase()] || n;
};
/** Height (in) for an entry count: 6 (1), 12 (2), 16 (3), 20 (4), 24 (5). Over 5 → null (split the board). */
export function boardHeight(n) { const b = BOARD_SIZES.find(x => n <= x.maxRows); return b ? b.height : null; }

let ctx;
const hasFace = fam => [...document.fonts].some(f => f.family.replace(/"/g, '') === fam && f.status === 'loaded');
function textW(str, fsIn, name = false) {
  if (typeof document === 'undefined') return 0;
  const fam = name ? 'Barlow Semi Condensed' : 'Anton';
  if (document.fonts && !hasFace(fam)) return 0; // font not ready: don't flag yet
  ctx = ctx || document.createElement('canvas').getContext('2d');
  ctx.font = name ? BOARD_NAME_FONT : '100px Anton, Impact, sans-serif';
  return (ctx.measureText(name ? String(str) : String(str).toUpperCase()).width / 100) * fsIn * 1.01;
}
// Route badge on boards: the standard RouteBadge (BADGE_SPEC) at H = BADGE_SPEC.heights.board (1″).
export const BOARD_BADGE_INLINE_H = BADGE_SPEC.heights.board, BOARD_BADGE_CAP = BADGE_SPEC.capRatio * BOARD_BADGE_INLINE_H;
export const BOARD_BADGE_LINE_FS = BOARD_BADGE_CAP / ANTON_CAP, BOARD_BADGE_PADX = BADGE_SPEC.padX * BOARD_BADGE_INLINE_H, BOARD_BADGE_TRACK = BADGE_SPEC.tracking * BOARD_BADGE_LINE_FS;
export const BOARD_BADGE_LINE_GAP = 0; // kept for older callers
export const badgeWidth = (label = 'Green Line') => textW(label, BOARD_BADGE_LINE_FS) + String(label).length * BOARD_BADGE_TRACK + 2 * BOARD_BADGE_PADX + BOARD_GAP;
/** Space left for the name on a row (in). */
// Extreme symbols (double diamond + number plate) are ~2.55× as wide as the symbol column.
export const nameArea = (route, level) => BOARD_CONTENT_W - BOARD_SYM * (level === 'extreme' ? 2.55 : 1) - BOARD_GAP - BOARD_ARROW - BOARD_GAP - (route ? badgeWidth() : 0);
/** Check one row against the standard. Returns { fits, need, area }. */
export function checkRow(row) {
  const need = textW(boardLabel(row.name, row.number), BOARD_NAME_FS, true), area = nameArea(!!row.route, row.level);
  return { fits: need <= area + 0.01, need, area };
}
/** Check a whole board. Returns a list of human-readable problems ([] = ready to proof). */
export function checkBoard(rows) {
  const out = [];
  if (rows.length > MAX_BOARD_ROWS) out.push(rows.length + ' rows — max is ' + MAX_BOARD_ROWS + '. Split into two boards.');
  rows.forEach(r => {
    if (!r.name && !r.route) out.push('Row without a name.');
    if (r.level !== 'destination' && r.level !== 'access' && r.level !== 'connector' && !r.level) out.push('"' + r.name + '" has no rating.');
    if (r.level !== 'destination' && r.level !== 'connector' && (r.number == null || r.number === '')) out.push('"' + r.name + '" has no trail number.');
    if (!r.direction) out.push('"' + r.name + '" has no arrow direction.');
    const c = checkRow(r);
    if (!c.fits) out.push('"' + boardLabel(r.name, r.number) + '" is ' + (c.need - c.area).toFixed(1) + '″ too long. Use a short sign name.');
  });
  return out;
}
/** Board rules as one namespace-visible object (lowercase helpers aren't exposed on the bundle namespace). */
export const BOARD_RULES = { orderRows, boardHeight, checkBoard, checkRow, boardLabel };
