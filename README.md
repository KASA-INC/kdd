# Kristian Dalen – nettsted

Statisk nettsted, publisert på Cloudflare Workers. Ingen byggesteg.

- Selve nettstedet ligger i `public/`.
- `wrangler.jsonc` forteller Cloudflare at `public/` skal publiseres.
- Hver push til `main` på GitHub publiseres automatisk av Cloudflare.

- `public/index.html` – forsiden. Én HTML-fil per case (`kasa.html`, `hub.html` …).
- `public/css/tokens.css` – design tokens fra designsystemet (farger, fonter, avstand, typografiklasser). Endre dem her for å endre hele nettstedet.
- `public/css/site.css` – felles stiler: importerer tokens.css, kundefonter, lenker og hover-effekter.
- `public/js/` – små frittstående skript:
  - `fit-titles.js` skalerer ned overskrifter som ellers ville blitt bredere enn skjermen.
  - `title-motion.js` animerer overskriftene fra smal til bred bredde.
  - `sticky-footer.js` viser den kompakte kontaktlinjen og bytter til full footer nederst.
  - `site.js` fyller ferdighets-barene på forsiden.
- `public/assets/` – bilder, logoer og fonter.

Layout står som inline `style` på elementene. Kundefarger i casene er faste verdier med vilje; nettstedets egne farger bruker variablene fra `site.css`.

Hover-effekter: elementer med `data-hover="…"` får stilen sin fra `site.css`.

Nye arbeider på forsiden sorteres alfabetisk (norsk, Å sist).
