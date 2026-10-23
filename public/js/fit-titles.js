// Scales h1/h2/h3 down (font-size + line-height together) so no word is wider than the available width.
(() => {
  const SEL = 'h1,h2,h3,[data-fit]';
  let probe;
  function widest(el, cs) {
    if (!probe) { probe = document.createElement('span'); probe.setAttribute('aria-hidden', 'true'); probe.style.cssText = 'position:absolute;left:-99999px;top:0;white-space:nowrap;visibility:hidden;pointer-events:none'; document.body.appendChild(probe); }
    for (const p of ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'fontStretch', 'fontVariationSettings', 'letterSpacing', 'textTransform', 'wordSpacing']) probe.style[p] = cs[p];
    if (el.dataset.fitStretch) probe.style.fontStretch = el.dataset.fitStretch;
    const parts = (el.textContent || '').split(/\s+/);
    let max = 0;
    for (const word of parts) {
      if (!word) continue;
      const segs = word.split(/(?<=-)|\u00AD/);
      segs.forEach((s, i) => {
        if (!s) return;
        const hy = word.includes('\u00AD') && i < segs.length - 1 && !s.endsWith('-') ? '-' : '';
        probe.textContent = s + hy;
        if (probe.offsetWidth > max) max = probe.offsetWidth;
      });
    }
    return max;
  }
  function fit() {
    if (!document.body) return;
    const docW = document.documentElement.clientWidth;
    document.querySelectorAll(SEL).forEach(el => {
      if (el.dataset.fitFs === undefined) { el.dataset.fitFs = el.style.fontSize || ''; el.dataset.fitLh = el.style.lineHeight || ''; }
      el.style.fontSize = el.dataset.fitFs; el.style.lineHeight = el.dataset.fitLh;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize), lh = parseFloat(cs.lineHeight);
      const r = el.getBoundingClientRect();
      const pad = Math.max(16, Math.min(r.left, 40));
      const avail = Math.min(el.clientWidth || r.width, docW - r.left - pad);
      const need = widest(el, cs);
      if (need > avail && avail > 0) {
        const k = avail / need * 0.98;
        el.style.fontSize = (fs * k) + 'px';
        if (!isNaN(lh)) el.style.lineHeight = (lh * k) + 'px';
      }
    });
  }
  let q = 0;
  const run = () => { cancelAnimationFrame(q); q = requestAnimationFrame(fit); };
  new MutationObserver(ms => { if (ms.some(m => m.target !== probe && !(probe && probe.contains(m.target)))) run(); }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  addEventListener('resize', run);
  addEventListener('load', run);
  if (document.fonts) document.fonts.ready.then(run);
  run();
})();
