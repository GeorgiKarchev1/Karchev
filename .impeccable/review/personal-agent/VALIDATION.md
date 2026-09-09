# Personal-agent revision — 7 September 2026

The user's correction replaces the previous homepage's offer, colors, typography,
buttons and motion. The web portfolio and named demo promotion are removed. The
public product is one unnamed, individually configured agent; KarchX OS stays out
of the current offer.

## Verification

- `npm run build`: passed; 63 pages generated, /bg and /en first-load JS 170 kB.
- `npx tsc --noEmit`: passed.
- Scoped ESLint using the installed Next core-web-vitals config: no errors; two
  existing plain-image warnings for the brand logos. No lint configuration was
  added to the repository.
- Production captures and checks use installed **Brave Browser** through Playwright.
  Both locales: 1440×1000, 768×1000, 390×844, 320×740, 844×390. All ten had no horizontal
  content overflow, no page JavaScript errors, loaded images, and controls with at
  least 44px height (inline cookie-policy prose is exempt).
- Task tabs work with ArrowLeft, ArrowRight, Home and End; FAQ disclosure, menu
  Escape dismissal, menu navigation and locale destinations work.
- Both localized contact forms were checked against intercepted error/success
  responses. Failure recovers by retry, with no actual email or lead submission.
- Cookie dismissal works at 390×844.
- Normal-motion checks at 1440px and 390px: the finite introductory timeline completes;
  contour rotation follows scroll; the process line advances; changing to reduced
  motion reverts and stops the scroll animation. Mobile was additionally tested
  with 4× CPU throttling. Observed CLS was 0 on localhost. These are browser-emulation
  checks, not a physical-phone or real-network performance benchmark.
- The homepage uses one lazy-loaded founder portrait and the existing logo; the
  two web-project screenshots and Manrope/Lora font loads were removed. Hero artwork
  is vector geometry. No new bitmap assets or dependencies were added.

## Evidence

`checks.json`, `motion-checks.json`, full `{bg,en}-{width}.png` captures,
`*-hero.png`, and sequential `*-sheet.jpg` contact sheets describe the final
production result. `cookie.png` is the initial consent state. Normal motion is
captured in `motion-1440-hero.png` and `motion-390-hero.png`.

`live-style.json` and `live-hero.png` record the live karchx.com page inspected
through Brave. The palette follows its #f1f0ea, #f6f3ed, #2d232e, #534b52, #e0ddcf values.

The single manual detector run reported 121 advisory differences against the old
DESIGN.md (63 colors, 45 type sizes, 13 radii), with no other antipattern findings.
The fresh finish reviewer returned `ship` with no material fixes; see
`FINISH-REVIEW.md`. The revised system is recorded in root `DESIGN.md` and
`.impeccable/design.json` after that verdict.

This is a local revision. No deployment or commit was performed.
