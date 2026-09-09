# Monochrome profile revision — 7 September 2026

The latest user screenshot rejected the repeated light two-column introduction and right-column FAQ. The owner explicitly delegated a white/black palette experiment with no green. This supersedes the earlier live-site palette constraint.

## Built result

- White #ffffff, canvas #f5f5f5, graphite #171717, muted gray #5c5c5c, silver #e9e9e9. Supporting rules and text use neutral grays. The inherited form-error red is a semantic state only.
- The profile is a dark, full-width vertical chapter: centered heading, wide grayscale photograph, personal note and byline below. Desktop image width caps at 1040px; mobile fills its content width with a portrait crop. The former text/photo split is removed from markup and CSS.
- FAQ has a centered title above a single column of individually framed native disclosures.
- Hero remains centered on mobile. One unnamed personalised agent, LinkedIn removed from the personal introduction, and the removed web portfolio remain unchanged. The footer LinkedIn link is outside the scoped removal.

## Evidence and checks

- Production build passed. Scoped ESLint passed.
- Both locales captured at 1440×1000, the user's 1280×1025 screenshot width, 768×1000, 390×844, 320×740 and 844×390.
- All 12 cases passed: no horizontal overflow or page JavaScript errors; loaded images; controls at least 44px high; centered mobile hero; heading above portrait and note below; FAQ title above questions; neutral section colors; grayscale portrait; black navigation logo.
- Keyboard task tabs, FAQ disclosure, mobile menu Escape dismissal and language destinations work.
- Normal-motion run at 390px, DPR 3 and 4× CPU slowdown: portrait settles at natural scale and dynamic reduced motion reverts its transform. This is browser emulation, not a physical-device or network benchmark.
- Both contact forms recovered from mocked error to mocked success; no email or lead was sent. Mobile cookie dismissal passed. Captures and states.json record these states.
- Text pairs in contrast.json pass 4.5:1. Decorative rules are not text.
- One manual detector run: 127 advisory mismatches against the superseded DESIGN.md (68 color, 53 type-size, 6 radius). No other antipattern class appeared. Documentation follows the fresh finish review; no second detector is needed.

Full-page captures are taken from scroll origin. Region JSON and section crops preserve the actual layout while avoiding fixed-header overlays. The root inspected desktop/mobile profile, the user's width FAQ and mobile hero directly; all captured widths are part of the reviewer packet.

The supplied screenshot was visible to the primary agent in the conversation. File tools cannot read its macOS-protected temporary directory. prior-local-version.png is the genuine preceding local build for comparison, explicitly not a copy of the attachment. The user's exact correction and the rejected topology are included in the fresh review packet.

Original portrait/logo raster files and their provenance records are reused. Grayscale and logo presentation are CSS only. No new raster asset or dependency. Preview remains local on port 3000; no deployment or commit.

## Completion

The fresh full finish review returned `disposition: ship` with no material fixes after both success-state captures were corrected. The documenter refreshed root DESIGN.md and .impeccable/design.json from the implemented neutral palette and new profile/FAQ structure. JSON, canonical sections and token metadata were validated. Documentation-only completion required no additional build or detector run.
