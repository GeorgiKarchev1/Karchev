---
version: 1
slug: "components-site-marketinghome-tsx"
primary_target: "components/site/MarketingHome.tsx"
related_targets: ["components/site/GrowthHero.tsx", "app/hero.css", "app/bg/hero-varianti/[variant]/page.tsx", "lib/agent-motion.ts", "app/studio.css", "app/layout.tsx"]
---

Scope: Bulgarian and English homepage hero. Mode: Persuade. Current authority: [clean-hero direction](../review/clean-hero/DIRECTION.md), September 21, 2026. This bounded replacement follows the owner's rejection of all five previous concepts. Preserve the established Manrope/white/graphite identity, detailed commercial terms, native lead flow, original-color founder profile and all remaining sections.

## Direction contract

THESIS: Connect the business's offer, website and sales so interest has a clear path to becoming a customer.

OWN-WORLD: White, graphite and silver; Manrope 500, open typography, a thin rule and one compact rectangular call action. The established brand remains authoritative.

STORY: Understand the help; request a free conversation or phone directly; read the scope if needed. The call is free and does not purchase the paid offer.

FIRST VIEWPORT: The promise owns the screen. Two plain lines at up to 96px, with the second offset by 16.5% on desktop. One small diagonal arrow moves once into place. The lower row pairs a short explanation with the call action and phone. A fine rule separates the compact €250/two-week offer and free-continuation terms. At tablet the offset becomes 9%; at mobile both lines align left and content stacks in reading order.

FORM: Code-led scoped hero replacement within the established neutral world; inherited seed `32aa0fba` is historical brand context, not a new concept roll. No clipping masks, heading gradient, price cards, mock dashboard or portfolio. Ordinary line spans and visible overflow preserve Bulgarian descenders. The five rejected comparison URLs redirect to `/bg`.

INTERACTION: A finite 900ms arrow settle and small control hover movements; no essential content animation. Reduced motion stops hero effects. Complete text and links remain available without JavaScript.

FINISH: Unreviewed and undocumented is unfinished. Current evidence is [clean-hero finish review](../review/clean-hero/FINISH-REVIEW.md), alongside DESIGN.md and its sidecar. No raster was created or changed. Review acceptance is scoped implementation evidence, not owner approval or measured conversion uplift.

## Current product and conversion constraints

- €250 total KARCHX fee for the first three clients, paid fully upfront after goals and scope are agreed in writing.
- Two weeks from the agreed start; work on the agreed goals continues completely free until those goals are achieved. Keep the detailed scope and boundaries further down the page.
- The free first call lasts up to 30 minutes. Hero CTA targets `/bg#contact` or `/en#contact`; the direct phone is 0895 739 335 (`tel:+359895739335`). The visitor requests a preferred time; Georgi confirms it personally.
- Public enquiry uses the website's native form and phone/email fallback. GHL remains a separate trial, not a dependency of the public contact flow.
- Projects and results are shown privately in meetings. Do not publish a portfolio, invented proof or guarantees beyond the agreed service commitment.
- The four-page Bulgarian checklist remains ungated online and as a PDF. Full product truth is in `.agents/product-marketing-context.md`.

## Implementation and evidence

`GrowthHero.tsx` owns bilingual hero copy and links; `app/hero.css` owns its responsive composition. The display uses `clamp(64px, 6.67vw, 96px)` at weight 500 and 1.17 line-height; 900px introduces BG 64px / EN 60px; 700px introduces BG `clamp(36px, 10.9vw, 60px)` / EN `clamp(31px, 9.7vw, 56px)` and 1.2 line-height. The offer remains subordinate to the headline and has no enclosing card.

The scoped review inspected BG widths 320, 390, 768, 883 and 1440px, EN 390 and 1440px, and the BG full-page transition. Existing contact/pricing anchors, phone, native form, mobile menu, reduced motion, JavaScript-disabled reading and five legacy redirects are covered by the supplied checks. No real test emails are implied by mocked form verification.

## Historical context, superseded for the hero

The September 8 centered introduction, gradient and masked-word reveal; later word-wave refinement; September 10 spacing directions; and September 21 five-option split/centered/dark/process/founder exercise describe earlier versions. All five alternatives were rejected and their comparison pages now redirect. Those records do not authorize restoring their layouts, animations or old booking destinations. The earlier €390, instalment, experiment and unpublished-price proposals are superseded by the confirmed €250 offer above.

Reference research used the owner's `/Users/Apple/Desktop/agentscontrol` vault, including Studio X and notes on TinyWins, Tempo and Base. The current direction record distinguishes local reference notes from live pages that were actually inspected. No third-party imagery, logos, code or assets were copied.
