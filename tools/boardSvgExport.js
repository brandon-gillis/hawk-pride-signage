// Hawk Pride board sign → print-ready SVG: exact sign size, 300 DPI coordinates, all text outlined, no fonts/CSS needed.
// Pure geometry (no page layout), so it runs in a browser page or a headless script.
// Requires on the page: React, ReactDOM, the DS bundle (window.HawkPrideSignageDesignSystem_931354), and the token CSS (tokens/*.css).
// API: await HPBoardSVG.exportSVG({ rows, signId, bleed }, { anton?: ArrayBuffer, brandmark?: string })
//   → { svg, filename, width, height, problems }
(function () {
  const DPI = 300;
  const OPENTYPE = 'https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.module.js';
  const SCRIPT_SRC = document.currentScript ? document.currentScript.src : location.href;
  let font = null, nameFont = null;

  async function loadAnton(buf, nameBuf) {
    if (!font) {
      const ot = await import(OPENTYPE);
      const ab = buf || await (await fetch(new URL('../assets/fonts/Anton-Regular.ttf', SCRIPT_SRC))).arrayBuffer();
      font = (ot.default || ot).parse(ab.slice(0));
      if (document.fonts && ![...document.fonts].some(f => f.family.replace(/"/g, '') === 'Anton' && f.status === 'loaded')) {
        const ff = new FontFace('Anton', ab.slice(0)); await ff.load(); document.fonts.add(ff);
      }
    }
    if (!nameFont) {
      const ot = await import(OPENTYPE);
      const ab = nameBuf || await (await fetch(new URL('../assets/fonts/BarlowSemiCondensed-Bold.ttf', SCRIPT_SRC))).arrayBuffer();
      nameFont = (ot.default || ot).parse(ab.slice(0));
      if (document.fonts && ![...document.fonts].some(f => f.family.replace(/"/g, '') === 'Barlow Semi Condensed' && f.status === 'loaded')) {
        const ff = new FontFace('Barlow Semi Condensed', ab.slice(0), { weight: '700' }); await ff.load(); document.fonts.add(ff);
      }
    }
    return font;
  }
  const r2 = v => Math.round(v * 100) / 100;
  const textW = (s, fs, ls = 0, f = font) => f.getAdvanceWidth(s, fs) + ls * s.length;
  // Baseline of a CSS line box with line-height:1 whose top is `top` (Chrome half-leading model, hhea metrics).
  const baseline = (top, fs, f = font) => { const a = f.ascender / f.unitsPerEm * fs, d = -f.descender / f.unitsPerEm * fs; return top + (fs - (a + d)) / 2 + a; };
  function textPath(s, x, y, fs, ls, fill, f = font) {
    if (!ls) return `<path d="${f.getPath(s, x, y, fs).toPathData(2)}" fill="${fill}"/>`;
    let d = '', cx = x;
    for (const ch of s) { d += f.getPath(ch, cx, y, fs).toPathData(2); cx += f.getAdvanceWidth(ch, fs) + ls; }
    return `<path d="${d}" fill="${fill}"/>`;
  }
  function rrect(x, y, w, h, [a, b, c, d]) {
    return `M${r2(x + a)} ${r2(y)}H${r2(x + w - b)}${b ? `A${b} ${b} 0 0 1 ${r2(x + w)} ${r2(y + b)}` : ''}V${r2(y + h - c)}${c ? `A${c} ${c} 0 0 1 ${r2(x + w - c)} ${r2(y + h)}` : ''}H${r2(x + d)}${d ? `A${d} ${d} 0 0 1 ${r2(x)} ${r2(y + h - d)}` : ''}V${r2(y + a)}${a ? `A${a} ${a} 0 0 1 ${r2(x + a)} ${r2(y)}` : ''}Z`;
  }
  const tokenCache = {};
  const token = name => tokenCache[name] || (tokenCache[name] = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#000');
  const resolveVars = s => s.replace(/var\((--[\w-]+)\)/g, (_, v) => token(v));

  // Render a DS symbol component to static SVG markup, outline its <text>, and place it so its box is centered on (cx, cy).
  function placeSymbol(el, cx, cy, leftX) {
    const host = document.createElement('div');
    const root = ReactDOM.createRoot(host);
    ReactDOM.flushSync(() => root.render(el));
    const svgEl = host.querySelector('svg');
    const w = parseFloat(svgEl.getAttribute('width')), h = parseFloat(svgEl.getAttribute('height'));
    const fsOf = new Map([...svgEl.querySelectorAll('text')].map((t, i) => [i, parseFloat(t.style.fontSize)]));
    svgEl.querySelectorAll('[style]').forEach(x => x.removeAttribute('style')); svgEl.removeAttribute('style');
    const doc = new DOMParser().parseFromString(resolveVars(svgEl.outerHTML.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')), 'image/svg+xml').documentElement;
    root.unmount();
    if (doc.querySelector('parsererror')) throw new Error('Symbol SVG failed to parse');
    doc.querySelectorAll('text').forEach((t, i) => {
      const fs = fsOf.get(i);
      const p = doc.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', font.getPath(t.textContent, parseFloat(t.getAttribute('x')), parseFloat(t.getAttribute('y')), fs).toPathData(2));
      p.setAttribute('fill', t.getAttribute('fill'));
      t.replaceWith(p);
    });
    doc.querySelectorAll('[style]').forEach(e => e.removeAttribute('style'));
    ['role', 'aria-label', 'style'].forEach(a => doc.removeAttribute(a));
    doc.setAttribute('x', r2(leftX != null ? leftX : cx - w / 2)); doc.setAttribute('y', r2(cy - h / 2));
    doc.__w = w;
    doc.setAttribute('overflow', 'visible');
    const str = new XMLSerializer().serializeToString(doc).replace(/ xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');
    return Object.assign(new String(str), { w });
  }

  async function brandmarkSvg(opts, NS) {
    let text = opts.brandmark;
    if (!text && NS.BRANDMARK_WHITE) text = decodeURIComponent(escape(atob(NS.BRANDMARK_WHITE.split(',')[1])));
    if (!text) text = await (await fetch(new URL('../assets/logo/brandmark-white.svg', SCRIPT_SRC))).text();
    return new DOMParser().parseFromString(text, 'image/svg+xml').documentElement;
  }

  async function exportSVG({ rows = [], signId = '', bleed = false }, opts = {}) {
    const NS = window.HawkPrideSignageDesignSystem_931354;
    if (!NS.BOARD_RULES) { // bundle older than boardLayout.js: build the rules from source
      const src = async p => (await (await fetch(new URL('../components/' + p, SCRIPT_SRC))).text()).replace(/^import .*$/gm, '').replace(/^export /gm, '');
      NS.BOARD_RULES = new Function('NS', 'const {SIZES,BOARD_SIZES,MAX_BOARD_ROWS}=NS;' + await src('symbols/pathArrow.js') + await src('board-sign/boardLayout.js') + ';return BOARD_RULES;')(NS);
    }
    const RULES = NS.BOARD_RULES;
    const { BOARD: B, BOARD_NAME_FS, BOARD_WORD_FS, BOARD_SYM, BOARD_GAP, BOARD_ARROW, BOARD_BADGE_H, LEVELS, ROUTES } = NS;
    await loadAnton(opts.anton, opts.barlow);
    const u = DPI, h = React.createElement;
    const BSPEC = NS.BADGE_SPEC || { capRatio: 0.52, padX: 0.25, tracking: 0.02, heights: { board: 1 } };
    const BIH = BSPEC.heights.board * u, BCAP = BSPEC.capRatio * BIH, BLF = BCAP / 0.86, BPX = BSPEC.padX * BIH, BLS = BSPEC.tracking * BLF;
    const ordered = RULES.orderRows(rows);
    const Hin = RULES.boardHeight(ordered.length) || 24, Win = B.width;
    const W = Win * u, H = Hin * u, M = B.margin * u, R = B.corner * u, BW = B.border * u;
    const ink = token('--sign-ink'), face = token('--sign-face'), frame = token('--sign-frame'), white = token('--hp-white'), rule = token('--hp-gray-400');
    const out = [];
    // Face, header band, full-bleed border
    out.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${frame}"/>`); // square black backing: corners print black on a square-cut panel
    out.push(`<path d="${rrect(0, 0, W, H, [R, R, R, R])}" fill="${face}"/>`);
    const ri = Math.max(0, R - BW);
    const ring = (`<path fill-rule="evenodd" d="${rrect(0, 0, W, H, [R, R, R, R])}${rrect(BW, BW, W - 2 * BW, H - 2 * BW, [ri, ri, ri, ri])}" fill="${frame}"/>`);
    out.push(ring);
    // One-entry boards (24×6) have no header.
    const header = ordered.length > 1;
    if (header) {
      out.push(`<path d="${rrect(0, 0, W, (B.margin + B.headerHeight + B.headerGap / 2) * u, [R, R, 0, 0])}" fill="${frame}"/>`);
      // Header: brandmark + HAWK PRIDE OFFROAD, centered as one unit
      const mark = await brandmarkSvg(opts, NS);
      const vb = (mark.getAttribute('viewBox') || '0 0 1 1').split(/[\s,]+/).map(Number);
      const mh = B.markHeight * u, mw = mh * vb[2] / vb[3];
      const wfs = BOARD_WORD_FS * u, wls = 0.02 * wfs, word = 'HAWK PRIDE OFFROAD';
      const ww = textW(word, wfs, wls), gap = B.brandGap * u;
      const gx = (W - (mw + gap + ww)) / 2;
      mark.setAttribute('x', r2(gx)); mark.setAttribute('y', r2(B.markTop * u)); mark.setAttribute('width', r2(mw)); mark.setAttribute('height', r2(mh));
      out.push(new XMLSerializer().serializeToString(mark).replace(/ xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, ''));
      out.push(textPath(word, gx + mw + gap, (B.wordCapTop + B.wordmarkCap) * u, wfs, wls, white));
    }
    // Entries: fixed 4″ bands stacked below the header
    const bodyTop = (header ? B.margin + B.headerHeight + B.headerGap : B.margin) * u, rowH = B.entryHeight * u;
    const SYM = BOARD_SYM * u, GAP = BOARD_GAP * u, ARW = BOARD_ARROW * u, BH = BOARD_BADGE_H * u;
    ordered.forEach((r, i) => {
      const cy = bodyTop + rowH * (i + 0.5);
      if (i > 0) { const rr = B.rowRule * u; out.push(`<path d="${rrect(M, bodyTop + i * rowH - rr / 2, W - 2 * M, rr, [rr / 2, rr / 2, rr / 2, rr / 2])}" fill="${rule}"/>`); }
      const dest = r.level === 'destination', conn = r.level === 'connector', rated = !!LEVELS[r.level] && !dest;
      const symEl = dest ? h(NS.DestinationIcon, { destination: r.destination || 'info', size: SYM * 0.9, strokeWidth: 3 })
        : h(NS.TrailSymbol, { level: rated || r.level === 'access' ? r.level : null, number: r.number ?? '', size: r.level === 'difficult' ? SYM * 1.1 : SYM });
      let sym = conn ? { w: 0 } : placeSymbol(symEl, M + SYM / 2, cy);
      const symW = Math.max(SYM, sym.w);
      if (sym.w > SYM) sym = placeSymbol(symEl, 0, cy, M); // wide symbols (Extreme) start at the margin and push the name right
      if (!conn) out.push(String(sym));
      const name = RULES.boardLabel(r.name, r.number), nfs = BOARD_NAME_FS * u, npad = nfs * 0.1;
      const nx = M + symW + GAP, ntop = cy - (nfs + npad) / 2;
      out.push(textPath(name, nx, baseline(ntop, nfs, nameFont), nfs, 0, ink, nameFont));
      if (r.route) {
        const rt = ROUTES[r.route] || ROUTES['green-line'];
        const label = String(rt.label).toUpperCase();
        const bw = textW(label, BLF, BLS) + 2 * BPX;
        const bx = nx + textW(name, nfs, 0, nameFont) + GAP, by = cy - BIH / 2;
        out.push(`<rect x="${r2(bx)}" y="${r2(by)}" width="${r2(bw)}" height="${r2(BIH)}" fill="${resolveVars(rt.color)}"/>`);
        out.push(textPath(label, bx + BPX, by + (BIH + BCAP) / 2, BLF, BLS, white)); // cap height centred in the bar
      }
      const al = r.arrowLevel || r.level;
      const color = LEVELS[al] ? undefined : dest || conn ? 'var(--wayfinding-destination)' : 'var(--hp-gray-400)';
      out.push(String(placeSymbol(h(NS.DirectionArrow, { direction: r.direction || 'right', level: LEVELS[al] ? al : undefined, color, size: ARW, strokeWidth: 3.75 }), W - M - ARW / 2, cy)));
    });
    // Sign ID in the bottom border, right side
    if (signId) {
      const sfs = 0.26 * u, sls = 0.06 * sfs, sw = textW(signId, sfs, sls);
      out.push(textPath(signId, W - 2 * u - sw, baseline(H - BW + (BW - sfs) / 2, sfs), sfs, sls, white));
    }
    const bl = bleed ? B.bleed * u : 0;
    const wIn = Win + (bleed ? 2 * B.bleed : 0), hIn = Hin + (bleed ? 2 * B.bleed : 0);
    const title = `Hawk Pride board sign ${signId} - ${Win} x ${Hin} in trim${bleed ? ' + 0.125 in bleed' : ''} - 300 DPI - text outlined`;
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${wIn}in" height="${hIn}in" viewBox="${-bl} ${-bl} ${W + 2 * bl} ${H + 2 * bl}">\n<title>${title}</title>\n${bleed ? `<rect x="${-bl}" y="${-bl}" width="${W + 2 * bl}" height="${H + 2 * bl}" fill="${frame}"/>\n` : ''}${out.join('\n')}\n</svg>\n`;
    const filename = `${signId || 'board'}_${Win}x${Hin}in${bleed ? '_bleed' : ''}.svg`;
    return { svg, filename, width: Win, height: Hin, problems: RULES.checkBoard(rows) };
  }
  window.HPBoardSVG = { exportSVG, DPI };
})();
