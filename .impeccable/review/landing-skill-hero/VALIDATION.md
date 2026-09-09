# Hero revision: 8 September 2026

User request: use landing-page-design from /Users/Apple/Desktop/agentscontrol and replace the homepage hero without the screenshot's three-tab workbench.

Implemented in Bulgarian and English: two-line personal-agent headline, 680px measure, Manrope marketing font, neutral text gradient required by the named skill, one rectangular booking CTA, existing free-conversation terms, original-color founder byline, three existing commitments. The workbench is no longer mounted. Its legacy #demo anchor resolves to the new hero. Large founder section and contact behavior remain intact. No new product capabilities or evidence claims.

Checks:
- npm run build passed (63 pages), /tmp/karchx-hero-sept8/build.log.
- TypeScript noEmit passed. Scoped ESLint passed using a temporary config extending the installed next/core-web-vitals config; the project had no ESLint config.
- Production browser checks passed for BG and EN at 1440×1000, 768×1000, 390×844 and 320×740 in installed Brave. One H1, zero workbenches, no horizontal overflow, 48px CTA in first viewport, valid anchor and booking URL; no page errors.
- Mobile-menu open/Escape, FAQ expansion, normal-motion settling and JavaScript-disabled hero passed. No lead/contact messages or bookings submitted.
- Source diff whitespace check passed. Existing unused workbench source remains on disk.
- One detector run: one gradient warning is explicitly allowed by landing-page-design B5; 26 advisories reflect existing lower-page styles and the prior design token documentation. No mechanical blocker. Documentation update follows review.
- The existing founder image and wordmark retain their original assets/provenance sidecars. No raster created or modified. A broad asset-directory scan also reports unrelated historical assets lacking provenance; they were not touched by this task.

Evidence: {bg,en}-{1440,768,390,320}-hero.png; {bg,en}-{1440,390}-full.png; bg-mobile-motion.png; bg-no-js.png; checks.json. Captures show loaded fonts, reduced motion except the motion example and declined cookies. Full-page screenshots were corrected to load the lazy founder image before capturing from the document top.

Local production preview: http://127.0.0.1:3000/bg and /en. Not deployed.

Finish: fresh independent reviewer disposition `ship` for the scoped hero, with no material fixes, recorded in FINISH-REVIEW.md. Documentation handoff completed: DESIGN.md, .impeccable/design.json and narrow PRODUCT.md corrections now describe Manrope, the new hero and the rejected/unmounted workbench. YAML/JSON, token/narrative consistency and whitespace checks passed. No implementation changes followed the reviewed production captures.
