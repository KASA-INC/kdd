// Compact contact bar fixed at the bottom; hands over to the full footer when it scrolls into view.
(() => {
  let last = null, q = 0;
  function update() {
    q = 0;
    const bar = document.querySelector('[data-sticky-bar]'), foot = document.querySelector('[data-sticky-footer]');
    if (!bar || !foot) return;
    const row = foot.querySelector('[data-sticky-row]');
    const at = foot.getBoundingClientRect().top < innerHeight - 60;
    if (bar.dataset.at === String(at) && row && row.dataset.at === String(at)) return;
    bar.dataset.at = row ? (row.dataset.at = String(at)) : String(at);
    bar.style.transform = at ? 'translateY(100%)' : 'none';
    bar.style.opacity = at ? '0' : '1';
    bar.style.pointerEvents = at ? 'none' : '';
    bar.setAttribute('aria-hidden', at ? 'true' : 'false');
    if (row) { row.style.transform = at ? 'none' : 'translateY(40px)'; row.style.opacity = at ? '1' : '0'; }
  }
  const run = () => { if (!q) q = setTimeout(update, 16); };
  addEventListener('scroll', run, { passive: true });
  addEventListener('resize', run);
  addEventListener('load', run);
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
  run();
})();
