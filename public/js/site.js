// Ferdighets-barene på forsiden: fylles opp når seksjonen kommer inn i bildet.
(() => {
  const sec = document.querySelector('[data-skills]');
  if (!sec) return;
  const bars = [...sec.querySelectorAll('[data-bar]')].map(el => ({
    el, pct: +el.dataset.bar, i: +el.dataset.i || 0,
    label: el.parentElement.parentElement.querySelector('[data-bar-label]')
  }));
  const draw = t => bars.forEach(b => {
    const x = Math.min(1, Math.max(0, (t - b.i * 0.1) / 1.1));
    const v = b.pct * (1 - Math.pow(1 - x, 3));
    b.el.style.width = v + '%';
    if (b.label) b.label.textContent = Math.round(v) + '%';
  });
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(99); return; }
  const play = () => {
    const t0 = performance.now();
    const tick = () => { const t = (performance.now() - t0) / 1000; draw(t); if (t < 2.4) setTimeout(tick, 16); };
    tick();
  };
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); play(); } }, { threshold: 0.25 });
  io.observe(sec);
})();
