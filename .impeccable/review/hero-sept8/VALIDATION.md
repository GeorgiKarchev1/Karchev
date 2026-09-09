# Hero and original portrait — 8 September 2026

## Scope and result

Latest user request: “Не искам снимката ми да е черно бяла, и може ли да взеемш идея за нова hero секция , тъй като и тази не ми харесва”. The earlier ship verdict does not override this correction.

The side-by-side offer/orbit diagram is removed. A large centered offer leads into a wide dark request → agent → reviewable-draft example. The booking action remains in the first viewport on portrait screens, and the secondary demo link sits inside the example. The example is explicitly fictional and implies no live execution. The hero heading retains the exact two-line Bulgarian offer and English equivalent. On phones the copy stays centered and the example reads vertically.

The original portrait colors are restored by removing CSS grayscale. Original photo, size, crop and provenance are retained. Natural green in that photograph is permitted by the user's explicit original-color request; interface colors remain white, graphite and neutral gray. The existing vertical profile, centered FAQ, one unnamed agent, portfolio removal and scoped profile LinkedIn removal persist. No deployment or commit.

## Evidence

Production build passed. Scoped ESLint passed for all four affected TS/TSX files. Target diff whitespace checks passed. A repository-wide whitespace scan found an unrelated pre-existing trailing space in components/WhoItsFor.tsx; that file was not changed in this revision.

Brave production checks passed on both locales at 1440×1000,1280×1025,768×1000,390×844,320×740 and844×390. Full pages start at scroll origin. Hero captures are actual viewport screenshots; full-page and portrait crops provide below-fold context. The root opened every full-page and hero capture plus both representative portrait crops and all normal/no-JS state captures before handoff.

checks.json records no horizontal overflow or page errors, loaded images, all checked controls >=44px tall, centered title/intro, two unwrapped headline lines, copy above task example, mobile task stacking, original portrait filter=none and preserved profile/FAQ geometry. Booking URL is unchanged; #demo link, scenario tab keyboard controls, FAQ disclosure, language links and mobile menu Escape work.

Normal-motion run: 390px,DPR3,4×CPU slowdown. Task result finishes fully revealed; portrait settles at natural scale; changing reduced-motion preference reverts its transform. The screenshot named bg-handoff-motion.png is a scrolled view of the entire handoff after animation, not a document-top capture. bg-mobile-motion.png shows the first viewport. bg-no-js.png confirms core offer, booking link and task content remain visible without JS. This is browser emulation, not a physical-device or network performance benchmark. No contact submission was needed or sent.

New text uses existing pairs #171717/#ffffff, #5c5c5c/#ffffff, #f5f5f5/#171717 and #c8c8c8/#171717; all exceed 4.5:1. No new external dependency or raster. Raster provenance scan passed (2 files,0 missing).

One manual detector run returned 61 advisories: 51 type-size,6 color,4 radius. No non-advisory finding. Most are established local values; the hero scale and removed diagram remain for the authorized bounded design-doc refresh after review. No second detector run.

## References and authority

See REFERENCES.md for live Brave observations of Tines,Cofounder and Marc Lou, with reference captures and metadata. These are compositional research, not approved comps or product claims. Prior-desktop.png and prior-mobile.png are genuine previous local-build captures, explicitly anti-references. This is a local hero replacement within the existing visual world, so no new concept tournament or seed is required; the parent-world seed32aa0fba remains recorded. Code-led, no approved comp. The direction contract is in ../../surfaces/components-site-marketinghome-tsx.md.

Review and documentation completion are pending the required finishing handoffs.

## User rejection during review

The owner rejected this hero before finishing: “от сега ти казвам не ми харесва, не е това което си отива на този сайт”. The task-panel hero is not accepted. The finish reviewer was interrupted and no ship verdict may be claimed. Original portrait color restoration remains explicitly requested. Root is researching a materially different visual direction and collecting a preference before another site revision.
