// quiply-caset: load-skjermen spilles av på nytt hvert sjette sekund, og ansiktene gjør hver sin bevegelse med litt ulik takt.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const demo = document.querySelector('.qp .demo');
  if (demo) setInterval(() => { const svg = demo.querySelector('svg'); svg.replaceWith(svg.cloneNode(true)); }, 6000);
  const DUR = { blink: 200, 'blink-twice': 500, 'look-left': 1800, 'look-right': 1800, think: 2200, happy: 1600, surprised: 1400, tilt: 1800, sleepy: 3200, glance: 1200, wink: 600 };
  document.querySelectorAll('.qp .face-card').forEach((card, i) => {
    const m = card.querySelector('.mark'), act = card.dataset.act;
    if (act === 'glance') { const f = m.querySelector('.face'); f.style.setProperty('--gx', '55px'); f.style.setProperty('--gy', '40px'); }
    const run = () => { m.classList.remove('do-' + act); void m.getBoundingClientRect(); m.classList.add('do-' + act); };
    setTimeout(() => { run(); setInterval(run, DUR[act] + 1600); }, i * 180);
  });
})();
