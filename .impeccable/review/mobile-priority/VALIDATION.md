# Mobile-priority revision — 7 September 2026

The owner requested a larger portrait on phone and desktop, centered mobile hero text, and ideas from more reference sites. The portrait is now 440px on desktop and fills the mobile content width (350px at a 390px viewport). Hero text, description, actions and note center below 900px. The phone title stays on two lines even at 320px. A unified demonstration frame contains its task toolbar, explanatory column and response. The plum personalisation chapter has rounded upper boundaries. Reference selection and adaptation are recorded in REFERENCES.md.

## Validation

- Production build passed; scoped ESLint and whitespace checks passed.
- The single layout detector scan returned no findings.
- Both languages tested in installed Brave at 1440×1000, 768×1000, 430×932, 390×844, 360×800, 320×740 and 844×390.
- All 14 cases: no horizontal overflow, JavaScript errors or undersized controls; images loaded; centered hero geometry and expected large portrait dimensions confirmed.
- All task tabs work with arrow keys, Home and End; the FAQ opens, mobile menu closes on Escape, and language destinations remain correct.
- Additional 390px / DPR 3 / 4× CPU check: intro completes, portrait settles at natural scale, and changing to reduced motion removes the animation transform. These are browser-emulation checks, not physical-phone testing or a real-network performance benchmark.
- Two bounded visual rounds inspected hero, portrait, demonstration and section transition across representative phone, tablet and desktop captures. The only UI follow-up adjusted the smallest title size so the 320px Bulgarian hero keeps two lines.
- Final component crops derive from full-page captures at scroll origin, keeping fixed navigation in the page header rather than across the cropped content. Raw captures and regions are retained.

No product name, unsupported claim, third-party production asset or dependency was added. LinkedIn and the web portfolio remain removed. This revision is local at port 3000; no deployment or commit.
