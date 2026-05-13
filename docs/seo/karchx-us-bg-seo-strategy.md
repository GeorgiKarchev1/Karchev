# Karchx SEO Strategy for US and Bulgaria

Prepared on May 12, 2026 based on the current repository state and Google Search documentation.

## Goal

Make `karchx.com` rank in both:

- Bulgaria, where the site should target top 5 positions for selected local commercial keywords
- the United States, where the site should target top 5 positions for selected niche long-tail commercial keywords, not ultra-broad agency terms

Top 5 in both markets is realistic only if the keyword sets are narrow and intentional. Ranking top 5 in the US for broad terms like `web design agency`, `marketing agency`, or `web development company` is not a serious short-term target for this domain.

## Current Site Diagnosis

This diagnosis is based on the current codebase.

### What is already positive

- The site has a valid `robots.ts` and `sitemap.ts`.
- The homepage has metadata, Open Graph, and base `LocalBusiness` schema.
- There is a blog section.
- There is a tools section that can attract links if developed properly.
- The site already has both BG and EN content in the UI layer.

### What is currently blocking stronger SEO

1. BG and EN are not exposed as separate crawlable URLs.
   Current implementation uses client-side language switching through `context/LanguageContext.tsx`, which is good for UX but weak for SEO.

2. `hreflang` is not implemented in a search-friendly way.
   In `app/layout.tsx`, both `bg` and `en` point to the same canonical URL. Google documentation expects separate localized URLs for alternate language versions.

3. The root document is globally marked as Bulgarian.
   `app/layout.tsx` renders `<html lang="bg">`, even when English content is shown.

4. The English positioning is too broad and unclear.
   The homepage talks about websites, content, automation, and agency services all at once. That weakens topical clarity for US search intent.

5. The content surface is too small.
   The blog currently has one published post in `data/posts.json`. That is not enough topical depth for either BG or US.

6. There are almost no indexable service-intent landing pages.
   The site needs dedicated pages for services and use cases, not only a general homepage.

7. There is at least one technical metadata bug.
   `app/tools/page.tsx` used the wrong canonical domain before this strategy pass.

8. The sitemap is minimal and does not represent a localized content model.

## What Google’s Current Documentation Supports

This strategy follows current Google guidance:

- Localized pages should have separate URLs and explicit alternate relationships.
- Helpful, people-first content is favored over scaled search-first content.
- Doorway-style domain networks and scaled low-value content are risky.
- Sitemaps help search engines discover important URLs and alternate language versions.

References:

- Localized versions: `https://developers.google.com/search/docs/advanced/crawling/localized-versions`
- Helpful content: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Spam policies: `https://developers.google.com/search/docs/advanced/guidelines/auto-gen-content`
- Sitemaps: `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`
- Organization schema: `https://developers.google.com/search/docs/appearance/structured-data/organization`
- Local business schema: `https://developers.google.com/search/docs/appearance/structured-data/local-business`

## The Core Strategy

## 1. Split the SEO architecture by market

Do not try to rank one mixed homepage for everyone.

Recommended URL structure:

- `/bg/` for Bulgarian
- `/en/` for English

Why this matters:

- Each market gets its own crawlable content.
- Real `hreflang` becomes possible.
- Titles, schema, headings, internal links, and blog clusters can be aligned per market.
- Google can understand which page is for which audience.

Do not rely on cookie-based language switching as the primary SEO architecture.

## 2. Use different keyword strategies for BG and US

The same keyword plan should not be translated literally.

### Bulgaria target set

BG should focus on direct commercial intent and local business services.

Priority keyword families:

- `изработка на сайт`
- `изработка на сайт за бизнес`
- `уеб дизайн за малък бизнес`
- `лендинг страница`
- `лендинг страница цена`
- `цена за фирмен сайт`
- `контент за социални мрежи`
- `видео съдържание за бизнес`
- `AI автоматизации за бизнес`
- `чатбот за бизнес`

### United States target set

US should focus on narrower, more specific positioning. Do not chase generic agency terms first.

Recommended US keyword families:

- `landing page developer for coaches`
- `website design for personal brands`
- `ai automation for small business`
- `content systems for founders`
- `conversion focused web design`
- `small business website redesign`
- `website for course creators`
- `website and content agency for creators`
- `marketing site for b2b founder`
- `lead generation website for service business`

If the US target stays vague, the site will compete against thousands of stronger domains with no realistic angle.

## 3. Build service pages before scaling blog content

The next SEO growth should come from landing pages with commercial intent, not from dozens of generic blog posts.

### Required Bulgarian pages

- `/bg/izrabotka-na-saitove`
- `/bg/landing-stranitsi`
- `/bg/ai-avtomatizatsii`
- `/bg/sazdavane-na-sadarzhanie`
- `/bg/tseni`
- `/bg/kazusi`

### Required English pages

- `/en/website-development`
- `/en/landing-pages`
- `/en/ai-automation`
- `/en/content-production`
- `/en/pricing`
- `/en/case-studies`

Each page should include:

- one clear primary keyword
- one clear offer
- proof or examples
- FAQ built from real objections
- internal links to related case studies and blog posts
- schema where appropriate

## 4. Turn case studies into ranking assets

Your portfolio is currently visually useful, but it is not yet a proper SEO asset.

Every serious project should become a crawlable case study page with:

- client type
- business problem
- work delivered
- timeline
- before/after
- measurable outcome if available
- stack used
- CTA to book a call

Case studies are especially important for US SEO because they create trust and help differentiate you from generic agencies.

## 5. Publish bilingual topic clusters, not random posts

For the next 90 days, publish around:

- `2` Bulgarian articles per month
- `2` English articles per month

### Bulgarian cluster ideas

- `Колко струва фирмен сайт в България през 2026`
- `Какво трябва да има един сайт за малък бизнес`
- `Кога ти трябва landing page вместо цял сайт`
- `Как AI автоматизациите пестят време на малък бизнес`
- `Как да избереш фирма за изработка на сайт`

### English cluster ideas

- `What makes a landing page convert for service businesses`
- `How small businesses waste leads with slow websites`
- `When a founder needs automation before hiring`
- `Website mistakes that kill trust in the first 10 seconds`
- `How to structure a service business site for conversion`

The rule is simple: every article must support a service page or a case study. No isolated content.

## 6. Build authority with real links, not a cloned satellite network

For `karchx.com`, the safer and more durable path is:

- directory profiles that are real and relevant
- founder-led distribution on LinkedIn, X, and communities
- guest posts or interviews on relevant business and creator publications
- portfolio listings and showcases
- tool launches that attract developer and AI links
- partnerships and collaborator mentions from client ecosystems

Useful link categories for BG:

- Bulgarian business directories
- startup and freelancer directories
- Bulgarian marketing, tech, and entrepreneur communities
- podcast appearances or local media features

Useful link categories for US:

- indie hacker and founder communities
- creator economy newsletters
- AI workflow communities
- design and dev showcases
- niche founder podcasts and blogs

The ClawBox satellite pattern should be treated as a reference for operational discipline, not as the default playbook for this site.

## 7. Use the tools page as a link magnet

`/tools` has higher linkability than a generic agency page if the resources are genuinely useful.

This should become a deliberate acquisition channel:

- ship at least one strong free tool
- publish one setup guide per tool
- include GitHub links, usage docs, and a demo
- internally link from tools to service pages that implement similar workflows for clients

This is one of the few realistic ways to earn US-relevant links without pure outreach.

## 8. Upgrade the schema and entity signals

Current `LocalBusiness` schema is a start, but it is too thin for what the site is trying to do.

Recommended additions:

- `Organization` schema on the homepage
- richer `LocalBusiness` fields for BG presence if you have a real location and contact data
- `Article` schema on blog posts
- `BreadcrumbList` on inner pages
- `FAQPage` only where FAQs are truly visible and useful
- consistent author identity for Georgi Karchev across blog and about pages

## 9. Make measurement as disciplined as ClawBox

ClawBox’s biggest transferable advantage is the reporting loop.

Set up a simpler version for `karchx.com`:

- daily or weekly rank tracking for BG and US keyword sets separately
- GSC split review by country and query group
- GA4 dashboards for organic sessions, leads, booked calls, and estimate completions
- page-level lead attribution by landing page

Track these separately:

- BG service keywords
- US service keywords
- brand keywords
- blog informational keywords
- tools-related keywords

## 10. Define success realistically

For the first phase, success should mean:

- top 5 in BG for `3` to `5` chosen commercial long-tail terms
- page 1 in US for `3` to `5` chosen niche service terms
- steady organic growth in impressions, clicks, and qualified leads

That is a much stronger target than chasing one vanity keyword with no conversion value.

## 90-Day Execution Plan

## Phase 1: First 14 days

- create crawlable `/bg` and `/en` architecture
- implement real localized metadata and `hreflang`
- expand sitemap to all core pages
- fix all canonicals and language signals
- create the first `3` BG service pages
- create the first `3` EN service pages

## Phase 2: Days 15 to 45

- publish `2` case studies
- publish `2` BG articles
- publish `2` EN articles
- improve internal linking
- enrich schema
- set up keyword tracking and reporting

## Phase 3: Days 46 to 90

- launch or improve one free tool worth linking to
- do link outreach and directory work
- publish another `4` to `6` articles across both languages
- update pages that get impressions but weak CTR
- expand the winning keyword cluster in each market

## Immediate Repo-Level Priorities

These are the files that matter first if implementation starts in this codebase:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `context/LanguageContext.tsx`
- `middleware.ts`
- `app/page.tsx`
- future localized routes under `app/bg/...` and `app/en/...`
- blog metadata files under `app/blog/...`

## Recommended Next Implementation Order

1. Replace cookie-first language SEO with route-first localization.
2. Build BG and EN service pages.
3. Add case study pages.
4. Expand blog coverage only around service clusters.
5. Add reporting and rank tracking.
6. Start outreach and link acquisition.

## Bottom Line

If `karchx.com` wants to rank in both Bulgaria and the US, it should not copy ClawBox literally.

The right move is:

- copy the measurement discipline
- copy the keyword segmentation
- copy the habit of continuous publishing
- do not copy the full satellite-domain network as the core strategy

For this site, the fastest path to top 5 visibility is a clean bilingual site architecture, strong service pages, real case studies, and a focused link acquisition system.
