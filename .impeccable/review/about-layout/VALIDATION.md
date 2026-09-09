# Personal introduction composition — 7 September 2026

The user requested a different composition for the personal introduction and removal of its LinkedIn link. The heading and unchanged introduction now lead on the left; a compact portrait and name caption sit on the right. Below 700px, text comes first, followed by a 96px portrait and the name in one row. The LinkedIn link is removed in both languages. The palette, type family and neighbouring FAQ are preserved.

- Production build passed. Scoped ESLint and source whitespace checks passed.
- Layout detector returned no findings in the single mechanical scan.
- Installed Brave tested Bulgarian and English at 1440×1000, 768×1000, 390×844, 320×740 and 844×390.
- All ten cases: no horizontal overflow or JavaScript errors, portrait loaded, expected reading order and compact sizing, no links in the introduction, adjacent FAQ opens.
- Normal-motion checks at desktop and mobile confirm the portrait animation settles at its natural scale.
- Batched visual inspection covered wide context, tablet English, and Bulgarian at 390px and 320px. The text leads, the portrait and caption stay grouped, and the mobile composition remains readable.

Screenshots and measurements are stored beside this file. Checks use browser emulation; no physical-device claim. Preview remains local on port 3000; no deployment or commit.
