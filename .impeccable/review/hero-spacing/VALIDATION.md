# Hero spacing refinement

The user requested more breathing room between the approved hero and the second section. Added 80px of white space after the commitments on desktop and 64px on mobile. Expanded hero copy padding to 96px vertically on desktop and64px on mobile. Commitment row padding is32px desktop and24px mobile. Second-section top padding is96px desktop and80px mobile.

Production build passed. BG/EN production captures at1440px and390px were inspected; measured separation matches80px/64px, CTA remains visible and there is no horizontal overflow. Layout-scoped detector returned no findings. Whitespace check passed. Updated DESIGN.md, sidecar narrative and surface brief. Typography, copy, motion and remaining sections are unchanged.

Evidence: measurements.json and the four screenshots in this directory. Build log: /tmp/karchx-hero-sept8/spacing-build.log.
