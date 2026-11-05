// Headless setup for exporting board SVGs from a project script (e.g. an AI agent's script runner).
// Usage (inside an async script with readFile/readFileBinary/saveFile helpers):
//   await (0, eval)(await readFile('tools/runScriptSetup.js'))({ readFile, readFileBinary });
//   const r = await HPBoardSVG.exportSVG({ signId: 'GL-04', rows: [...] });
//   await saveFile('exports/' + r.filename, r.svg);
(async ({ readFile, readFileBinary }) => {
  const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  if (!window.React) await load('https://unpkg.com/react@18.3.1/umd/react.production.min.js');
  if (!window.ReactDOM) await load('https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js');
  if (!document.getElementById('hp-tokens')) {
    let css = '';
    for (const f of ['tokens/colors.css', 'tokens/typography.css', 'tokens/spacing.css', 'tokens/sign-dimensions.css']) css += await readFile(f);
    const st = document.createElement('style'); st.id = 'hp-tokens'; st.textContent = css; document.head.appendChild(st);
  }
  (0, eval)(await readFile('_ds_bundle.js'));
  const NS = window.HawkPrideSignageDesignSystem_931354;
  if (!NS.BOARD_RULES) { // older bundle: build the rules from source
    const strip = t => t.replace(/^import .*$/gm, '').replace(/^export /gm, '');
    NS.BOARD_RULES = new Function('NS', 'const {SIZES,BOARD_SIZES,MAX_BOARD_ROWS}=NS;' + strip(await readFile('components/symbols/pathArrow.js')) + strip(await readFile('components/board-sign/boardLayout.js')) + ';return BOARD_RULES;')(NS);
  }
  (0, eval)(await readFile('tools/boardSvgExport.js'));
  const anton = await (await readFileBinary('assets/fonts/Anton-Regular.ttf')).arrayBuffer();
  const barlow = await (await readFileBinary('assets/fonts/BarlowSemiCondensed-Bold.ttf')).arrayBuffer();
  const brandmark = await readFile('assets/logo/brandmark-white.svg');
  const base = window.HPBoardSVG.exportSVG;
  window.HPBoardSVG.exportSVG = (spec, opts = {}) => base(spec, { anton, barlow, brandmark, ...opts });
  return window.HPBoardSVG;
})
