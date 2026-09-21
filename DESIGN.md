---
name: KARCHX Growth Systems
description: A focused growth-systems offer in white, graphite and silver, with an original-color founder portrait.
colors:
  ink: "#171717"
  muted: "#5c5c5c"
  hero-hover: "#383838"
  hero-active: "#505050"
  canvas: "#f5f5f5"
  surface: "#ffffff"
  silver: "#e9e9e9"
  line: "#d9d9d9"
  dark-copy: "#c8c8c8"
  dark-line: "#666666"
  strong-line: "#a3a3a3"
  field-line: "#7a7a7a"
  quiet-gray: "#b0b0b0"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(64px, 6.67vw, 96px)"
    fontWeight: 500
    lineHeight: 1.17
    letterSpacing: "-.04em"
  display-tablet:
    fontFamily: "Manrope, sans-serif"
    fontSize: "64px"
    fontWeight: 500
    lineHeight: 1.17
    letterSpacing: "-.04em"
  display-tablet-en:
    fontFamily: "Manrope, sans-serif"
    fontSize: "60px"
    fontWeight: 500
    lineHeight: 1.17
    letterSpacing: "-.04em"
  display-mobile:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 10.9vw, 60px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.04em"
  display-mobile-en:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(31px, 9.7vw, 56px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.04em"
  hero-price:
    fontFamily: "Manrope, sans-serif"
    fontSize: "48px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-.04em"
  hero-price-compact:
    fontFamily: "Manrope, sans-serif"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-.04em"
  guarantee-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1.3
  guarantee-title-mobile:
    fontFamily: "Manrope, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 3.5vw, 52px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  lead:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  hero-control:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
  hero-control-mobile:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  control:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  annotation:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 500
rounded:
  field: "0"
  compact: "12px"
  action: "8px"
  panel: "16px"
  pill: "99px"
  circle: "50%"
spacing:
  compact: "12px"
  small: "20px"
  medium: "24px"
  inset: "28px"
  large: "40px"
components:
  button-hero:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.hero-control}"
    rounded: "{rounded.action}"
    padding: "14px 24px"
    height: "56px"
  button-hero-hover:
    backgroundColor: "{colors.hero-hover}"
  button-hero-active:
    backgroundColor: "{colors.hero-active}"
  button-hero-mobile:
    typography: "{typography.hero-control-mobile}"
    padding: "12px 20px"
    height: "52px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.pill}"
    padding: "7px 8px 7px 25px"
  button-primary-hover:
    backgroundColor: "{colors.muted}"
  button-nav:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 7px 6px 21px"
  button-nav-hover:
    backgroundColor: "{colors.silver}"
  button-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.pill}"
    padding: "8px 9px 8px 24px"
    width: "100%"
  button-submit-hover:
    backgroundColor: "{colors.muted}"
  text-link:
    textColor: "{colors.ink}"
    padding: "11px 0"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 0 13px"
    width: "100%"
  cookie-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "22px"
---

# Design System: KARCHX Growth Systems

## Overview

**Creative North Star: "From interest to a sale. With a working system."**

White, graphite and silver keep the Growth Systems offer readable. Manrope carries an open, stepped two-line introduction, a compact rectangular call action and quiet offer terms. Fine rules and retained pill actions support the rest of the page. A dark vertical founder chapter introduces the builder through a large original-color portrait and a personal note.

This record describes the September 21, 2026 clean hero replacement in the established marketing identity. Its current authority is the [clean-hero direction](.impeccable/review/clean-hero/DIRECTION.md), supported by the [surface brief](.impeccable/surfaces/components-site-marketinghome-tsx.md) and [finish review](.impeccable/review/clean-hero/FINISH-REVIEW.md). Ground truth is `components/site/GrowthHero.tsx`, `app/hero.css`, `components/site/MarketingHome.tsx`, `app/studio.css`, `app/layout.tsx` and `lib/agent-motion.ts`. Earlier centered, masked-word and five-option hero records are historical evidence, not current visual authority. The five old comparison URLs redirect to the Bulgarian homepage.

Confirmed commercial facts and native contact behavior live in [.agents/product-marketing-context.md](.agents/product-marketing-context.md). PRODUCT.md was deliberately deleted by the owner and has not been restored. Secondary resource page bodies, `/os` and `/admin` retain their own systems. Non-hero primitives remain the retained documentation baseline; this handoff verifies the hero and its offer terms, not a full-site token audit. The scoped review describes implementation quality; it does not establish owner approval, deployment status or measured conversion improvement. No raster assets were created or modified for this hero.

**Key Characteristics:**

- White and light-gray fields, graphite typography and silver support surfaces; original photo colors remain intact.
- One Manrope hierarchy for Bulgarian and English, with open line boxes and locale-aware responsive display sizes.
- A stepped desktop hero heading, left-aligned mobile lines and one rectangular call action beside direct phone contact.
- Fine rules, an unboxed compact offer and a large original-color photographic profile further down the page.
- One finite decorative-arrow entrance; the heading and supporting content remain visible without motion or JavaScript.

## Colors

The interface uses neutral grays; the founder photograph retains its original colors, including natural foliage. Frontmatter owns the reusable palette values. Existing logo filters apply only to the wordmarks.

### Primary

- **Graphite ink** (`ink`): headings, primary actions and dark section grounds.
- **Muted gray** (`muted`): supporting copy, secondary section-heading lines, light-surface focus outlines and retained pill-action hover.
- **Hero hover and active** (`hero-hover`, `hero-active`): distinct state feedback on the new rectangular call action.

### Neutral

- **Light-gray canvas** (`canvas`): page ground outside the white opening and light text on graphite.
- **White surface** (`surface`): hero, initial navigation, FAQ disclosures and cookie panel.
- **Silver** (`silver`): contact ground and circular action ends outside the hero.
- **Light rule** (`line`): divisions and panel borders on light grounds.
- **Light-gray copy** (`dark-copy`): supporting copy and small principle drawings on dark grounds.
- **Dark rule** (`dark-line`): divisions in the personalisation chapter and footer.
- **Strong rule** (`strong-line`): numbered process-marker outlines and open FAQ borders.
- **Field rule** (`field-line`): input baselines and cookie-choice outlines.
- **Quiet gray** (`quiet-gray`): menu-toggle border on light ground and founder byline detail on graphite.

The portrait’s dark loading ground, cookie outer border and semantic form feedback remain component-local values; none introduces a brand accent. The current hero uses solid graphite text and a white ground. Its former text gradient and clipping masks are superseded.
**The Surface Pair Rule.** Use graphite text on light fields, light-gray canvas text on graphite, and light-gray copy for supporting text on dark fields. Focus outlines use muted gray on light fields, graphite within the hero, and silver in the dark personalisation chapter and footer. The contact fields retain their own border-and-ring focus treatment.

## Typography

**Display and Body Font:** Manrope, with a sans-serif fallback. It is self-hosted through `next/font`, covers Latin and Cyrillic, and uses `--font-marketing`. It replaces the prior Golos Text selection across shared marketing components. Inter and Space Grotesk remain available for surfaces outside this scope.

The hero display uses weight 500, tight tracking and generous line-height. Its desktop fluid size reaches 96px, then uses an explicit 64px tablet step; the longer English line uses 60px at that breakpoint. Mobile Bulgarian and English have their own fluid display roles. These are intentional adaptations to the real copy, not a new scale imposed on the remaining page.

The current headline reads “От интерес / до нов клиент.” and “From interest / to new customers.” Ordinary text spans form the two lines; visible overflow and vertical line-box padding preserve Cyrillic descenders. At 900px the tablet roles apply. At 700px the mobile roles apply: Bulgarian spans 36–60px and English spans 31–56px, both at 1.2 line-height. The two lines remain part of one accessible H1; the decorative arrow is hidden from assistive technology.

The frontmatter intentionally records the hero's 96px maximum, 64px tablet display, 48px price, 40px compact price, 30px guarantee heading, 24px mobile guarantee heading and 15px mobile action, plus the English display adaptations. The price switches to its compact role at 900px; the guarantee heading and action switch at 700px. Hero introduction uses 18px/1.65, becomes 16px at 900px, and caps at 47ch. Offer explanation is 14px/1.65; quiet payment and call terms use the 12px annotation family. Price currency is 70% of the amount size.

Recurring section headings retain their existing fluid scale and weight 500. Process headings use the title role; body describes recurring 16px explanatory prose at approximately 1.75–1.8 line-height. The founder note uses 18px/1.8, becoming 16px on mobile. Existing contact fields use 15px desktop and 16px on mobile. The retained actions, fields and compact explanations use control, label and annotation roles; the mobile footer retains local 11px annotations.

Local heading variants remain local: principle titles use 23px, 20px at 900px and 21px at 700px. The founder heading uses `clamp(44px, 5vw, 72px)`/1.08, and FAQ heading `clamp(36px, 3.5vw, 50px)`. At 700px, recurring section headings use `clamp(32px, 8.5vw, 43px)`/1.26; the founder retains 1.17. FAQ questions move from 18px to 16px. These retained variants are not a global step for every literal size.

**The Bilingual Type Rule.** Preserve the same hierarchy and font coverage in English and Bulgarian; let text reflow naturally at narrow widths.

## Layout

The shared container caps at 1280px with 56px side gutters. Gutters become 36px at 1150px and 20px at 700px. Major desktop sections commonly use 82–108px vertical spacing; mobile content sections use approximately 56–64px. Small gaps and panel insets use the recorded spacing steps without imposing a new mathematical scale.

The white hero shares the site's responsive gutters and caps its inner container at 1200px. Top/bottom section padding is 154px/40px, with top padding reduced to 138px at 1150px and 112px/32px section padding at 700px. The second headline line starts 16.5% into the container on desktop, 9% at 900px and flush left at 700px. The first line carries one diagonal arrow; its size tracks the type.

Below the heading, a two-column row pairs the introduction with the call action and phone. It starts 40px below the headline, with a 64px desktop gap, then 40px at 1150px and 32px at 900px. At 900px action and phone stack within their column. At 700px the whole conversation becomes one column, 24px below the heading with a 24px gap, and action plus phone may wrap together. The call action reads “Нека поговорим” / “Let’s talk”; its note identifies a free conversation of up to 30 minutes. It links to the language-matched native contact section; the phone is a real telephone link.

A fine rule separates the compact offer from the conversation. The offer begins 64px below the conversation with a 28px top inset and three columns: amount/duration/payment, continuation terms and a details link. It becomes two columns at 1150px, reduces its top gap to 40px at 900px, then stacks at 700px with a 36px top gap, 24px inset and 18px row gaps. The details link targets the existing pricing section. The `#demo` anchor remains on the hero. Detailed offer terms and all following content remain on the homepage.

Recurring section heading pairs become single columns at 900px; process and contact stack at 700px. The profile is a vertical chapter at every width: centered heading, wide portrait, then personal note and byline. Its content caps at 1040px; the photograph fills that width at 16:9 and changes to 4:5 at 700px. FAQ caps at 880px, with its centered heading above one disclosure stack. The three personalisation columns become ruled rows with small drawings beside the text. The footer moves from four columns to two at 900px, with full-width opening and closing groups at 700px.

Fixed navigation is 86px tall and becomes 72px at 700px. Desktop links give way to a disclosure at 900px; at 700px booking remains in that disclosure after the separate navigation action disappears. Anchor offsets account for the fixed bar. The cookie panel uses viewport-relative width and a mobile safe-area-aware bottom margin.

**The Readable Offer Rule.** Let the headline lead, place explanation and contact next, and keep the compact price and commitment readable below a fine rule. Preserve this order when the layout stacks.

Current hero evidence covers Bulgarian at 320, 390, 768, 883 and 1440px, and English at 390 and 1440px, plus a Bulgarian desktop full-page capture. These are evidence widths, not extra CSS breakpoints. The scoped review also references reduced-motion and no-JavaScript checks. Earlier viewport reports apply to historical versions only.

## Elevation & Depth

The public presentation is flat. Contrasting section grounds, open space, fine borders and rounded clipping separate content. The hero uses no shadow. Contact fields retain a subtle focus ring; it communicates input state and is not surface elevation.

The homepage hides the legacy viewport scrollbar rail so full-width sections meet the right edge without a pale strip. Wheel, touch and keyboard scrolling remain native. This rule targets the document only while `.agent-site` is present; other routes and nested scroll areas keep their scrollbars. The following dark personalisation chapter meets the hero without an added spacer; subsequent sections retain their existing order and grounds.

**The Flat Surface Rule.** Use tone, spacing and fine rules to separate the existing content surfaces.

Motion enhances already-rendered content. In the hero, only the decorative heading arrow enters: a 900ms movement from 9px left and down to its resting position, using `cubic-bezier(.16, 1, .3, 1)`. No headline, supporting copy or offer content waits for animation. Reduced motion removes this entrance and hero transitions.

The retained process line follows reading progress with scrub .35. The existing motion hook also supports once-only principle drawings when mounted and a portrait entrance from scale 1.08 over 1.1s. The current principle text has no drawing nodes. Nothing pins scroll or runs as a continuous decorative loop. Changing to reduced motion reverts the GSAP context and leaves complete static content; CSS also removes transitions, animation and smooth scrolling. The pending form spinner communicates actual submission state.

## Shapes

The hero action is a compact rectangle with the action radius (8px). Retained navigation and contact actions use pills and circular arrow ends. Cookie panels use the panel radius (16px); portrait clipping and FAQ disclosures use the compact radius (12px). The personalisation chapter has rounded upper corners (32px desktop, 24px mobile), a local section boundary rather than a reusable card radius. Small principle drawings retain their local 3px corners and 30px rounding without adding global tokens.

The current contact form uses softly rounded fields with full borders inside a white form container. Its retained frontmatter input primitive predates that form styling and is outside this hero refresh; do not apply that legacy primitive as a new form specification. Native disclosures use separate white rounded frames with fine borders. Process markers are circles containing real sequence numbers; SVG arrows and compact line icons carry functional meaning.

## Components

### Buttons and links

The hero call action uses the frontmatter hero variant: graphite background, white medium-weight text and an 8px radius. Recorded heights are minimums: 56px desktop and 52px mobile. Below 1150px its horizontal padding becomes 20px; mobile uses the complete mobile variant. Hover changes the background to the recorded hero-hover state and moves the inline SVG arrow 2px right and up; active changes to hero-active. Background transitions last .25s; arrow movement lasts .35s with the hero easing. There is no press scale on this new action. Hero controls use a graphite 2px focus outline with a 5px offset. The adjacent phone and details links have a minimum 44px height; phone hover underlines, while the details arrow moves 3px right over .3s.

Retained pricing and guide rectangles use the compact-action family, including their existing hover arrow and press feedback; they do not inherit the new hero action's size or state rules. Retained contact booking actions are graphite pills with light text, a minimum 56px height and a silver circular arrow end. Navigation uses a compact outlined pill with a minimum 46px height and graphite circular arrow. Submission uses the primary family at full width. Hover shifts pill color and rotates the arrow by 45 degrees; primary and navigation presses scale to 0.98. Open text links underline on hover and move their SVG arrow slightly upward and right. Their existing hover transforms are suppressed on devices without hover.

Keep primary actions and disclosure controls touch-sized. The shared focus treatment uses a 2px outline with a 5px offset, while retained compact pricing/guide actions use a 4px offset. Purely decorative SVGs stay hidden from assistive technology.

### Inputs / Fields

Visible labels sit above full-width fields with a pale ground, fine full border, graphite caret and softly rounded corners. Hover strengthens the border; focus changes the ground to white, the border to graphite and adds a subtle ring. Placeholder text remains fully opaque. Textareas resize vertically. Submission exposes a busy state and disabled waiting control, an error alert with retry available, and a success status region. The native form remains on the website; local error red and success green communicate state, not brand accents.

### Navigation and footer

The fixed light navigation contains the existing KARCHX image logo rendered black with CSS `brightness(0)`, compact links, language switch and booking action. After scrolling it changes to the canvas ground with a lower rule. Link hover uses an underline; current-language text gains weight. The circular menu toggle reports its expanded state; the disclosure closes on navigation, outside pointer input or Escape, which returns focus to the toggle. The dark footer renders its existing logo white with CSS `brightness(0) invert(1)` and uses compact link columns, muted headings and a circular back-to-top action. These presentation filters leave the source rasters unchanged.

### Hero heading and offer

The heading uses two ordinary line spans with no masks or text gradient. The small decorative arrow is the only entrance animation. The lower conversation and unboxed offer stay present in the HTML and retain their reading order on mobile. No founder thumbnail, attribution, price card or alternative-composition selector appears in the hero; the large founder profile remains later on the page.

The rejected `AgentWorkbench.tsx`, unused old hero selectors and historical five-option records are not current hero patterns. The remaining compact action class used by pricing and the guide is still active and remains a distinct component. The legacy comparison route accepts variants 1–5 and redirects each to `/bg`; it no longer renders alternative designs.

### Portrait and disclosures

The profile is a dark vertical chapter with a centered, large two-line heading, a wide original-color photograph and a personal note with byline below. Its heading uses `clamp(44px, 5vw, 72px)` at a 1.08 line height; below 700px it returns to the mobile section-heading scale. The photo has a compact rounded crop, `object-fit: cover` and `object-position: center 20%`; the image has no color filter, preserving the original photograph and its natural foliage. The note caps at 64ch with 18px prose, becoming 16px on mobile. This section has no links; the inherited footer LinkedIn link remains outside that scoped removal. The portrait and existing logos retain their adjacent provenance records. FAQ uses native details/summary disclosures in a single stack with 12px gaps. White frames use the compact radius, light borders and 24px horizontal insets, reduced to 18px on mobile; the border darkens when open. Each SVG plus rotates to show the open state. Answers stay readable without motion.

### Cookies

The fixed white-surface panel uses a thin border, panel radius and compact copy. Accept and decline use equal outlined pills; close is an explicitly labeled 44px control. This records its presentation wherever the shared component appears, not unrelated page styling or analytics behavior.

## Do's and Don'ts

### Do:

- **Do** use the established surface pairs and contrasting focus outlines.
- **Do** preserve bilingual hierarchy, visible labels, keyboard interaction and touch-sized controls.
- **Do** keep the stepped hero heading and its compact offer readable, with one call action, direct phone contact and clear terms.
- **Do** keep full content available without motion and honor dynamic reduced-motion changes.
- **Do** preserve the founder portrait in its original colors, the existing logo and their provenance records.

### Don't:

- **Don't** introduce green brand styling; natural photographic colors and semantic form feedback remain intact.
- **Don't** replace Manrope or change the distinct hero and retained action shapes without a separate design task.
- **Don't** apply this homepage system to secondary page bodies, `/os` or `/admin` without a separate design task.
- **Don't** restore the homepage web portfolio or promote the future KarchX OS as the current offer.
- **Don't** manufacture metrics, testimonials or proof-shaped decoration, or present illustrative tasks as live execution.
- **Don't** restore the rejected three-tab workbench or obscure the homepage offer with unrelated technical artwork, abstract 3D sculpture, an orbit or a configuration diagram.
- **Don't** restore the rejected hero masks, text gradient or price cards; the current opening uses plain text, open space and one fine rule.
- **Don't** turn local artwork colors, radii or functional labels into global tokens or decorative kickers.
- **Don't** add scroll pinning or continuous decorative animation to these public surfaces.
