# DataFast-informed hero revision — 8 September 2026

Scope: bilingual homepage hero and immediately following interactive examples. The owner rejected unrelated technical art and asked for immediate understanding, using DataFast and Marc Lou as design references. Existing neutral UI, original-color large portrait, vertical founder chapter and centered FAQ remain. No new product name or future-OS claims.

Implementation: concise centered headline (BG: “AI агент за Вашата работа.”), concrete individually-built-agent explanation, one booking action, existing terms/commitments, and the existing task workbench directly underneath. The redundant dark request-to-draft banner/component and associated CSS/motion selectors were removed. Headline motion starts at visible opacity and respects reduced motion.

## Verification

- `npm run build`: passed; full production log `/tmp/karchx-datafast-hero/build.log`.
- Scoped ESLint on MarketingHome, AgentWorkbench and agent-motion: passed with existing temporary config `/tmp/karchx-redesign-sept7/eslint.json`.
- Targeted `git diff --check`: passed.
- Production server on `http://127.0.0.1:3000`.
- Installed Brave only; Playwright verification script `/tmp/karchx-datafast-hero/verify.cjs`, exit 0.
- BG and EN at 1440×1000, 1280×1025, 768×1000, 390×844, 320×740 and 844×390. Twelve viewport cases passed. No page errors or horizontal overflow. Centered heading and introduction. Intro >=16px. Booking action visible in every portrait first viewport. One H1 and one workbench. No old hero art/canvas.
- Keyboard task tabs (arrows, Home, End), document scenario, FAQ, demo hash anchor, mobile-menu Escape and locale destination checks passed. Contact submission was not exercised in this hero revision; form behavior is unchanged.
- Founder photo loaded in original colors (`filter:none`), 1040px at desktop and viewport minus40px on mobile. Founder heading above photograph; no links in this section.
- 390px with DPR3, normal motion and 4×CPU throttling: settled headline fully visible, no runtime error. Switching to reduced motion resets transforms. With JS disabled, offer and initial example remain visible. This is a smoke check, not a performance benchmark or screen-reader audit.
- One detector run: 56 advisories (46 type-ramp,6 palette,4 radius), no other severities. These compare against stale design documentation, which the mandatory documenter will refresh after review; no second detector run.
- Shipping raster provenance scan:2 rasters,0 missing. No raster authored or replaced.

## Evidence

All captures are actual local production rendering in installed Brave. Main matrix uses DPR1, reduced motion, loaded fonts/images and declined cookie state. Full-page captures start at document top. Root opened all12 hero captures, BG/EN1440 and390 full-page views, both founder crops, document-state crops and the normal-motion/no-JS first viewports. No UI correction was needed in this inspection round. Document-state evidence was corrected to crop a document-top screenshot after dismissing cookies, because element capture brought fixed overlays into the crop; this is evidence correction, not a source/layout change.

Required review files under this directory:
- `{bg,en}-{1440,1280,768,390,320,844}-hero.png`: twelve actual viewports.
- `{bg,en}-{1440,390}-full.png`: page composition and context.
- `bg-{1440,390}-about.png`: original-color large founder section.
- `{bg,en}-documents-state.png`: alternate task state; keyboard operation is covered separately in checks.json.
- `bg-mobile-motion.png`, `bg-no-js.png`.
- `checks.json`, `detector.json`, `REFERENCES.md` and `references/`.

Code-led local replacement; no approved image comp or new identity tournament. Latest user reference is DataFast, with ShipFast/CodeFast supplying clarity/product-demonstration calibration. The rejected dark prototype is retained only as a marked anti-reference and its temporary server is stopped.

Fresh full review: `fix`, with one documentation-only material item. All 22 required captures were valid, the hero matched the contract, and no material UI correction was requested. The shipped documenter updated DESIGN.md and its sidecar; JSON/YAML, canonical headers and evidence links passed. The reviewer scored the one documentation-only fix resolved in VERDICT.md, disposition `ship` at that scored-fix scope. The 22 previously reviewed captures and UI are unchanged. No build, recapture or second detector was run for documentation changes.
