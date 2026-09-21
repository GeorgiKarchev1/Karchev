# KARCHX: first-client website readiness

September 21, 2026. Latest owner steering: native website enquiry journey, GHL trial separate, portfolio presented privately in meetings.

## Delivered

- BG/EN homepage moves from selling AI agents to offer clarity, enquiry handling and follow-up.
- Public phone +359895739335 in navigation, hero, contact and footer, and service metadata.
- Bounded first-three-business offer: €390 total KARCHX fee, 2 × €195, 10–14 working days after information/access. Scope, exclusions, external costs and handover explained.
- Native contact form in both languages, optional preferred call time and explicit personal confirmation. No external booking, GHL embed, marketing autopilot or new CRM dependency.
- Required-field focus, visible Bulgarian errors, 15-second timeout, duplicate-click guard, retained input after failure and independent phone/email fallback. No-JavaScript visitors receive a direct contact alternative rather than submitting a broken form.
- Four-page ungated Bulgarian guide, web-readable at /bg/checklist and downloadable PDF. 12 checks, two reply examples, measurement definitions and a seven-day worksheet. Existing real portfolio and social metrics intentionally kept off the homepage.
- Analytics waits for the visitor's acceptance. Decline prevents analytics requests. Legacy booking links lead to the native contact section, including English destinations.

## Evidence

- Production build passed in an isolated archive of the current production source (5f16084), with only explicit marketing files overlaid. Unrelated dirty OS work untouched.
- TypeScript and scoped next/core-web-vitals ESLint passed. git diff --check passed.
- Brave executable used for all browser tests (not a Chrome installation). Homepage 320/390/768/1440 px, EN 1440, guide 390: no horizontal overflow, JS errors, missing local anchors or third-party frames. Mobile menu Escape works.
- Tests cover invalid fields, 502, 429, timeout, duplicate submit, preserved input, success copy, no-JS fallback and server schema/honeypot/rate limiting.
- Founder image verified after scrolling and decoding; unloaded lazy content in the first full-page capture was a capture artifact, not an image failure. Hero normal-motion capture caught the entry transition; reduced-motion complete captures show final content.
- PDF verified as four A4 pages, Cyrillic text extraction, all page counters present, and visual inspection of every page. No clipping found.
- Local real enquiry returned HTTP 200 / ok:true from Resend-backed endpoint. Resend key is sending-only; delivery-log lookup returned restricted_api_key. Inbox confirmation requested from owner; actual inbox receipt is not claimed.
- Existing local RESEND_API_KEY was missing from Vercel Production. Added it as a sensitive environment variable without logging its value. Delivery recipient remains the existing default goshoo429@gmail.com, public contact email georgikarchev5@gmail.com.

## Limits

No promise of zero bugs, cross-browser certification, guaranteed sales or a Lighthouse score. Automated booking, reminder sequences and CRM capture are intentionally outside this version. Visitor's time preference is a request. Future GHL integration can be evaluated once the owner is comfortable with it.

Published successfully to https://www.karchx.com on September 21, 2026, deployment dpl_5vrQ3897EXyTHjGTBhZZchGiqXQv. Live Brave verification passed for Bulgarian homepage (1440 px), English homepage (390 px), guide (390 px), and the downloadable PDF (HTTP 200, application/pdf, matching 313910 bytes). The actual live native form returned HTTP 200 / ok:true and displayed personal time-confirmation copy. No GHL requests or JavaScript errors were observed. Inbox receipt still awaits owner confirmation. See production.json and deployment.json. Source staging manifest is stage.json; no unrelated OS changes are included.
