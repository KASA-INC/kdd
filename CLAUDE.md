# Instruksjoner for Claude Code

- Nettstedet ligger i `public/`. Rediger HTML, CSS og JS direkte; det finnes ikke noe byggesteg.
- Bruk tokens fra `public/css/tokens.css` (f.eks. `var(--accent)`) for nettstedets egne farger og fonter. Kundefarger i casene er faste verdier med vilje.
- Arbeider på forsiden sorteres alfabetisk (norsk, Å sist). Nye arbeider settes inn på riktig plass.
- Hver case har feltene Leveranse, År, Status og eventuelt Lenke – ingen andre.
- Nettstedet bruker bare svart, hvitt, krem og grønt fra paletten; ikke rosa.
- Når en endring er ferdig: commit med en kort norsk melding og push til `main`. Cloudflare publiserer automatisk.
