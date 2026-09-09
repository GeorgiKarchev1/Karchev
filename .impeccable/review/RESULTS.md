# KARCHX redesign verification — 2026-09-06

Scope: English/Bulgarian homepage; shared public navigation, footer, contact form, and cookie notice.

- Production build: passed, including TypeScript and Next.js lint checks. Existing Browserslist age warning remains.
- Browser matrix: /en and /bg at 390, 768, and 1440 px. No runtime exceptions, broken images, or overflowing content. Captures are the corresponding locale-width PNG files in this directory.
- Interactions: language switching updates the URL, content, and document language; mobile navigation opens/closes, Escape restores focus, and Process reaches its section; project and problem disclosures work.
- Form: simulated server failure preserves input; retry and simulated success work. Requests were intercepted; no email was sent.
- Resilience: headline, portfolio, and booking link remain visible without JavaScript; reduced-motion presentation inspected.
- Cookie notice: English localization and persisted dismissal verified. Existing analytics behavior was outside this design change.
- Secondary-route smoke checks: bilingual service, blog, and estimate pages return 200 without runtime errors or mobile overflow.
- Mechanical design detector: no findings.
- Raster provenance: six reused source assets, six origin sidecars; scan reports zero missing. No StudioX artwork or generated imagery used.
- Independent visual review: matched the specified editorial direction. One material placeholder-contrast finding fixed from 4.26:1 to 4.75:1; final reviewer disposition ship covers that scored fix.
- Final production-server smoke checks: both homepages return 200, correct document language, no runtime errors, corrected placeholder color.

Run the local browser verification with `node .impeccable/review/verify.cjs` while the site runs at port 3000. The script uses the existing Playwright installation on this machine.
