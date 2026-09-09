---
name: KARCHX public agent system
description: A clear personal AI-agent offer in white, graphite and silver, with an original-color photographic profile.
colors:
  ink: "#171717"
  muted: "#5c5c5c"
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
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-.04em"
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
    lineHeight: "28px"
  hero-control:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
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
    padding: "8px 12px"
    height: "48px"
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

# Design System: KARCHX public agent system

## Overview

**Creative North Star: "One agent. Your configuration."**

White, graphite and silver keep the personal AI-agent offer readable. Manrope carries a centered introduction, a compact rectangular booking action and an animated word-by-word headline. Fine rules and retained pill actions support the rest of the page. A dark vertical founder chapter introduces the builder through a large original-color portrait and a personal note.

This records the September 8, 2026 homepage as currently built at `/bg` and `/en`, plus shared navigation, contact, footer and cookie presentation. The offer is one unnamed, individually configured agent. The latest hero follows the user-selected `landing-page-design` skill from `/Users/Apple/Desktop/agentscontrol`; it replaces the earlier DataFast/Marc Lou iteration and excludes the rejected three-tab workbench. Page composition and the inherited parent seed `32aa0fba` remain in the [surface brief](.impeccable/surfaces/components-site-marketinghome-tsx.md), with product facts in [PRODUCT.md](PRODUCT.md). Secondary page bodies, `/os` and `/admin` retain their own systems.

The user approved the composition, then requested removal of the hero attribution and stronger text animation. The follow-up is recorded in [motion validation](.impeccable/review/hero-text-motion/VALIDATION.md). Ground truth is `components/site/MarketingHome.tsx`, `app/studio.css`, `app/layout.tsx` and `lib/agent-motion.ts`. The [preceding finish review](.impeccable/review/landing-skill-hero/FINISH-REVIEW.md) gives the scoped hero a **ship** disposition with no material correction. [Validation](.impeccable/review/landing-skill-hero/VALIDATION.md) and [checks](.impeccable/review/landing-skill-hero/checks.json) record the production build, scoped ESLint, TypeScript, eight production viewport cases and 14 inspected captures. That earlier disposition applies to the composition before the motion follow-up; it does not record whole-site approval or deployment.

**Key Characteristics:**

- White and light-gray fields, graphite typography and silver support surfaces; original photo colors remain intact.
- One Manrope hierarchy for Bulgarian and English, with a centered offer at every width.
- A compact rectangular hero action; retained pill actions elsewhere.
- Fine rules and a large original-color photographic profile further down the page.
- A masked word-by-word hero entrance, a finite mouse wave and retained scroll-responsive process motion with complete static content.

## Colors

The interface uses neutral grays; the founder photograph retains its original colors, including natural foliage. Frontmatter owns the reusable palette values. Existing logo filters apply only to the wordmarks.

### Primary

- **Graphite ink** (`ink`): headings, primary actions and dark section grounds.
- **Muted gray** (`muted`): supporting copy, secondary heading lines, light-surface focus outlines and primary-action hover.

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

The portrait’s dark loading ground, cookie outer border and semantic form-error red remain component-local values; none introduces a brand accent. The hero alone uses a black-to-gray gradient clipped to heading text, as selected by the requested skill’s B5 rule. Each animated word receives its segment of the line’s #000000 to #666666 range, preserving the overall treatment without making transformed text disappear. Forced-colors mode uses CanvasText. All section backgrounds remain flat; unsupported text clipping falls back to graphite ink.

**The Surface Pair Rule.** Use graphite text on light fields, light-gray canvas text on graphite, and light-gray copy for supporting text on dark fields. Focus outlines use muted gray on light fields, graphite for the hero action, and silver in the dark personalisation chapter and footer.

## Typography

**Display and Body Font:** Manrope, with a sans-serif fallback. It is self-hosted through `next/font`, covers Latin and Cyrillic, and uses `--font-marketing`. It replaces the prior Golos Text selection across shared marketing components. Inter and Space Grotesk remain available for surfaces outside this scope.

The hero uses the frontmatter display role at weight 600 and balanced wrapping. Recurring section headings retain a fluid scale at weight 500. Frontmatter title describes process headings; body describes recurring explanatory prose; lead and hero-control describe the hero introduction and action; control, label and annotation cover the retained actions, fields and compact explanations. The new hero scale does not imply a retrospective size conversion of the remaining page.

The hero headline is “Вашият AI агент. / По Вашите правила.” and “Your own AI agent. / Built on your terms.” Each thought has its own line. Heading and introduction cap at 680px on desktop and tablet. The introduction uses the lead role, then changes to 16px/24px with a 448px maximum width at 700px. The headline remains 60px/1 through tablet, changes to 36px/40px at 700px, and to 30px/36px below 380px. Call terms use 12px/16px; commitments use 14px/20px, becoming 12px/16px on mobile.

Recurring body text uses 16px with approximately 1.75–1.8 line height. The founder note uses 18px/1.8, becoming 16px on mobile. Form text remains 16px at every width. Compact context commonly uses 12px; the mobile footer retains local 11px annotations.

Local heading variants remain local: principle titles use 23px, 20px at 900px and 21px at 700px. The founder heading uses `clamp(44px, 5vw, 72px)`/1.08, and FAQ heading `clamp(36px, 3.5vw, 50px)`. At 700px, recurring section and founder headings use `clamp(32px, 8.5vw, 43px)`/1.17. FAQ questions move from 18px to 16px. These retained variants are not a new global step for every literal size.

**The Bilingual Type Rule.** Preserve the same hierarchy and font coverage in English and Bulgarian; let text reflow naturally at narrow widths.

## Layout

The shared container caps at 1280px with 56px side gutters. Gutters become 36px at 1150px and 20px at 700px. Major desktop sections commonly use 82–108px vertical spacing; mobile content sections use approximately 56–64px. Small gaps and panel insets use the recorded spacing steps without imposing a new mathematical scale.

The white hero is centered at every width: a two-line headline, concrete introduction, booking action and terms, then three existing commitments. Its container caps at 1120px with 32px side gutters, reducing to 16px at 700px. The hero section has 96px of top padding and 192px below the commitments; its copy block adds 96px above and below. Mobile uses 80px top and 128px bottom section padding, with a 64px/64px copy inset. This deliberate white interval separates the hero from personalisation, whose top inset is 96px on desktop and 80px on mobile. Intro and action spacing use 24px or 32px gaps. Commitments sit below a fine rule, wrap centrally, and use 32px vertical padding on desktop and 24px on mobile. The existing `#demo` anchor now targets this hero; no workbench is mounted.

Recurring section heading pairs become single columns at 900px; process and contact stack at 700px. The profile is a vertical chapter at every width: centered heading, wide portrait, then personal note and byline. Its content caps at 1040px; the photograph fills that width at 16:9 and changes to 4:5 at 700px. FAQ caps at 880px, with its centered heading above one disclosure stack. The three personalisation columns become ruled rows with small drawings beside the text. The footer moves from four columns to two at 900px, with full-width opening and closing groups at 700px.

Fixed navigation is 86px tall and becomes 72px at 700px. Desktop links give way to a disclosure at 900px; at 700px booking remains in that disclosure after the separate navigation action disappears. Anchor offsets account for the fixed bar. The cookie panel uses viewport-relative width and a mobile safe-area-aware bottom margin.

**The Readable Offer Rule.** Keep the hero introduction centered and immediately understandable, followed by its booking action, terms and existing commitments.

Current recorded verification covers both languages at 1440×1000, 768×1000, 390×844 and 320×740, with full-page captures at 1440px and 390px plus normal-motion and JavaScript-disabled mobile captures. These are evidence widths, not additional CSS breakpoints.

## Elevation & Depth

The public presentation is flat. Contrasting section grounds, open space, fine borders and rounded clipping separate content. The current public stylesheet defines no box shadows.

**The Flat Surface Rule.** Use tone, spacing and fine rules to separate the existing content surfaces.

Motion enhances already-rendered content. The hero headline unfolds word by word over .85s with 75ms stagger, moving from translateY(105%) and rotateX(-70deg) to its resting position inside masks. It uses `cubic-bezier(.32, .72, 0, 1)`. Supporting copy, action/terms and commitments enter over .8s with delays of .3s, .45s and .6s. A mouse entering the headline triggers one 700ms wave with 45ms stagger and a 6px lift using the Web Animations API. Touch is excluded; changing the reduced-motion preference immediately cancels active waves. The hero’s former GSAP intro has been removed; its CSS animation only runs when reduced motion is not requested. The process line follows reading progress with scrub .35. Principle drawings enter once from y13 and rotation −9 degrees over .7s with .12s stagger; the portrait enters once from scale 1.08 over 1.1s. Nothing pins scroll or runs as a continuous decorative loop. Changing to reduced motion reverts the GSAP context and leaves complete static content; CSS also removes transitions, animation and smooth scrolling. The pending form spinner communicates actual submission state.

## Shapes

The hero action is a compact rectangle with the action radius (8px). Retained navigation and contact actions use pills and circular arrow ends. Cookie panels use the panel radius (16px); portrait clipping and FAQ disclosures use the compact radius (12px). The personalisation chapter has rounded upper corners (32px desktop, 24px mobile), a local section boundary rather than a reusable card radius. Small principle drawings retain their local 3px corners and 30px rounding without adding global tokens.

Inputs stay square with a single baseline. Native disclosures use separate white rounded frames with fine borders. Process markers are circles containing real sequence numbers; SVG arrows and compact line icons carry functional meaning.

## Components

### Buttons and links

The hero booking action uses the frontmatter hero variant: graphite background, white semibold text, a minimum 48px height, 8px/12px padding and an 8px radius. Its inline SVG arrow moves 4px right on hover, while the background changes to the local #313131 hover value. Background and transform transitions last .7s with the hero easing; a press scales to .98. Its focus outline is graphite with a 4px offset. Retained contact booking actions are graphite pills with light text, a minimum 56px height and a silver circular arrow end. Navigation uses a compact outlined pill with a minimum 46px height and graphite circular arrow. Submission uses the primary family at full width. Hover shifts the pill color and rotates the arrow by 45 degrees; primary and navigation presses scale to 0.98. Open text links underline on hover and move their SVG arrow slightly upward and right. Hover transforms are suppressed on devices without hover.

Interactive controls receive a 2px focus outline with a 5px offset, except the hero’s 4px offset. Keep primary actions and disclosure controls touch-sized; the checked controls have at least 44px height. Purely decorative SVGs stay hidden from assistive technology.

### Inputs / Fields

Visible labels sit above transparent, full-width fields with a muted baseline, graphite caret and square edges. Placeholder text remains fully opaque in muted gray. Textareas resize vertically. Submission exposes a busy state and disabled waiting control, an error alert with retry available, and a success status region. The local error red is a form state, not a brand accent.

### Navigation and footer

The fixed light navigation contains the existing KARCHX image logo rendered black with CSS `brightness(0)`, compact links, language switch and booking action. After scrolling it changes to the canvas ground with a lower rule. Link hover uses an underline; current-language text gains weight. The circular menu toggle reports its expanded state; the disclosure closes on navigation, outside pointer input or Escape, which returns focus to the toggle. The dark footer renders its existing logo white with CSS `brightness(0) invert(1)` and uses compact link columns, muted headings and a circular back-to-top action. These presentation filters leave the source rasters unchanged.

### Hero headline motion

The user approved the new hero and then explicitly removed its founder thumbnail and attribution. The headline now reveals its words through individual masks with a short perspective unfold. Mouse entry triggers one finite wave; touch does not. The H1 retains its complete accessible name while its visual word spans are hidden from assistive technology. The large founder profile remains below the process section.

The rejected `AgentWorkbench.tsx` and its CSS remain unused source. They are historical implementation, not a component of the current homepage or a pattern to restore through this design record.

### Portrait and disclosures

The profile is a dark vertical chapter with a centered, large two-line heading, a wide original-color photograph and a personal note with byline below. Its heading uses `clamp(44px, 5vw, 72px)` at a 1.08 line height; below 700px it returns to the mobile section-heading scale. The photo has a compact rounded crop, `object-fit: cover` and `object-position: center 20%`; the image has no color filter, preserving the original photograph and its natural foliage. The note caps at 64ch with 18px prose, becoming 16px on mobile. This section has no links; the inherited footer LinkedIn link remains outside that scoped removal. The portrait and existing logos retain their adjacent provenance records. FAQ uses native details/summary disclosures in a single stack with 12px gaps. White frames use the compact radius, light borders and 24px horizontal insets, reduced to 18px on mobile; the border darkens when open. Each SVG plus rotates to show the open state. Answers stay readable without motion.

### Cookies

The fixed white-surface panel uses a thin border, panel radius and compact copy. Accept and decline use equal outlined pills; close is an explicitly labeled 44px control. This records its presentation wherever the shared component appears, not unrelated page styling or analytics behavior.

## Do's and Don'ts

### Do:

- **Do** use the established surface pairs and contrasting focus outlines.
- **Do** preserve bilingual hierarchy, visible labels, keyboard interaction and touch-sized controls.
- **Do** keep the centered offer readable, with one hero booking action, clear terms and the real builder’s name.
- **Do** keep full content available without motion and honor dynamic reduced-motion changes.
- **Do** preserve the founder portrait in its original colors, the existing logo and their provenance records.

### Don't:

- **Don't** introduce green UI styling; natural photographic colors remain intact and semantic form-error red remains a local state.
- **Don't** replace Manrope or change the distinct hero and retained action shapes without a separate design task.
- **Don't** apply this homepage system to secondary page bodies, `/os` or `/admin` without a separate design task.
- **Don't** restore the homepage web portfolio or promote the future KarchX OS as the current offer.
- **Don't** manufacture metrics, testimonials or proof-shaped decoration, or present illustrative tasks as live execution.
- **Don't** restore the rejected three-tab workbench or obscure the homepage offer with unrelated technical artwork, abstract 3D sculpture, an orbit or a configuration diagram.
- **Don't** extend the hero’s text-only gradient to section backgrounds.
- **Don't** turn local artwork colors, radii or functional labels into global tokens or decorative kickers.
- **Don't** add scroll pinning or continuous decorative animation to these public surfaces.
