# Approved hero refinement: 8 September 2026

The user liked the new hero and requested removing its small founder attribution/thumbnail and adding more expressive text motion. Those elements and their unused copy/styles are removed in BG and EN. The approved typography, copy, palette, CTA and large profile section remain.

Headline words unfold through masks over 850ms with 75ms stagger. The supporting introduction, action/terms and commitments follow at 300/450/600ms. Mouse entry produces one 700ms wave with 45ms stagger; touch does not trigger it. No loop or new dependency. The complete H1 accessible name remains intact. CSS provides visible static content for reduced motion and forced colors; preference changes cancel active Web Animations API waves. Cleanup removes the preference listener. Masks include descender space.

Validation passed:
- Production build (63 pages), log /tmp/karchx-hero-sept8/motion-build.log; TypeScript and scoped ESLint.
- Production Brave checks in BG and EN at 1440×900,390×844,320×740: one complete accessible title, two heading lines, no founder byline, large profile still mounted, no horizontal overflow, CTA visible, no page errors.
- Timed entrance captures at 150/400/800/1400ms, including restart of all CSS word animations for deterministic captures.
- Actual mouse hover starts the word wave; live reduced-motion change cancels all hero motion.
- Touch skips hover animation; reduced-motion and JavaScript-disabled views remain readable.
- One detector run: one intentional heading-gradient warning (authorized by the user-selected landing-page-design skill),25 advisories from the broader existing stylesheet. No new material issue after the bounded visual pass.
- DESIGN.md, sidecar JSON, surface brief and narrow PRODUCT.md preference note updated. JSON and scoped whitespace checks pass.

Browser evidence is in this directory; checks.json records computed results and frames. No new raster asset, dependency, external message, contact submission or booking. This refinement was verified directly; the preceding independent review applies to the previously approved composition, not a new independent motion verdict.

Local production preview: http://localhost:3000/bg and /en.
