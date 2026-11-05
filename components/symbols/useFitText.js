import React from 'react';
// Shrinks font-size (px) until a single-line element fits its box. Never grows past base.
// Re-fits after webfonts load and whenever the element's box resizes.
export function useFitText(ref, base, deps, min) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let live = true;
    const bump = () => live && setTick(t => t + 1);
    if (document.fonts) { document.fonts.ready.then(bump); document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', bump); }
    let ro;
    if (window.ResizeObserver && ref.current && ref.current.parentElement) { ro = new ResizeObserver(bump); ro.observe(ref.current.parentElement); }
    return () => { live = false; document.fonts && document.fonts.removeEventListener && document.fonts.removeEventListener('loadingdone', bump); ro && ro.disconnect(); };
  }, []);
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    let size = base; el.style.fontSize = size + 'px';
    const floor = min ?? base * 0.4;
    let guard = 0;
    while (el.scrollWidth > el.clientWidth + 0.5 && size > floor && guard++ < 80) { size *= 0.97; el.style.fontSize = size + 'px'; }
  }, [...deps, tick]);
}
