// Draft: titles switch to Zalando Sans (variable wdth) and animate 75% → 125% when they load or scroll into view.
(() => {
  const SEL = 'h1,h2,h3';
  const FROM = '75%', TO = '125%';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      play(e.target);
    });
  }, { threshold: 0.15 }) : null;
  function play(el) {
    el.style.fontStretch = TO;
    el.animate([{ fontStretch: FROM }, { fontStretch: TO }], { duration: 1500, delay: 300, easing: 'cubic-bezier(.4,0,0,1)', fill: 'backwards' });
  }
  function scan() {
    document.querySelectorAll(SEL).forEach(el => {
      if (el.dataset.motion) return;
      el.dataset.motion = '1';
      el.dataset.fitStretch = TO;
      el.style.fontFamily = "'Zalando Sans',system-ui,sans-serif";
      if (reduce || !io) { el.style.fontStretch = TO; return; }
      el.style.fontStretch = FROM;
      io.observe(el);
    });
  }
  let q = 0;
  const run = () => { clearTimeout(q); q = setTimeout(scan, 16); };
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('load', run);
  run();
})();
