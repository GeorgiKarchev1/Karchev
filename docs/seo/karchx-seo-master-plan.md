# Karchx SEO Master Plan

Prepared on May 12, 2026.

This document combines:

- a summary of what we discussed
- the useful lessons from the ClawBox SEO setup
- the current SEO diagnosis for `karchx.com`
- the full SEO strategy for Bulgaria and the United States
- the future implementation plan for separate BG and EN pages
- a practical restart brief for when work resumes

This is intended to be the single working SEO document for the project.

## 1. Summary of What We Discussed

You shared the full SEO operating model used by the people you work for on ClawBox SEO. The stack is strong because it combines daily rank tracking, Google Search Console, GA4, aggressive indexing, directory backlinks, and a large satellite domain network that supports the main money site.

You wanted that knowledge preserved in the repo and then turned into a serious strategy for your own site, `karchx.com`.

Your main goal is:

- the site to rank in the US
- the site to rank in Bulgaria
- ideally to reach at least top 5 for selected important keywords, especially in Bulgaria

After reviewing the current codebase, the key conclusion was that `karchx.com` should not copy the ClawBox model literally.

The site should copy:

- the measurement discipline
- the keyword segmentation
- the reporting mindset
- the consistency of content updates

The site should not blindly copy:

- the full satellite-domain network
- doorway-like SEO structures
- scaled content whose only job is ranking rather than helping users

For this site, the right SEO foundation is:

- proper localized page structure
- separate BG and EN crawlable URLs
- service pages with clear commercial intent
- case studies
- bilingual topical content clusters
- real backlinks from relevant external sites

## 2. ClawBox SEO Stack Summary

This section preserves the useful operational model from ClawBox.

## Daily and Recurring SEO Systems

### Serper.dev rank tracking

Used to run Google US searches for `57` tracked keywords every morning.

- script: `serper_rank_tracker.py`
- purpose: exact live keyword positions
- focus: main site plus satellites

### Google Search Console

Used to fetch real search query data from Google.

- script: `gsc_fetch.py`
- purpose: clicks, impressions, CTR, average position

### GA4

Used to connect search and acquisition to business outcomes.

- tracks users, sessions, purchases, revenue
- used through a service account

### Satellite domain network

ClawBox uses `52+` keyword-targeted supporting domains that publish unique pages and link upward to the main domain.

### IndexNow

Used after each satellite update so URLs get recrawled faster.

### Daily SEO report

Runs every morning and combines:

- Serper positions
- GSC data
- GA4 data
- Telegram reporting

### Directory and backlink campaign

ClawBox also pushes backlinks from real external directories and communities.

## Main lesson from ClawBox

The biggest lesson is not “use 52 domains.”

The biggest lesson is:

- measure every day
- segment keyword intent
- track rankings and revenue together
- keep content and URLs fresh
- treat backlinks as a real system, not a side task

## 3. Current SEO Diagnosis for Karchx

This diagnosis is based on the current repo state as reviewed on May 12, 2026.

## What the site already has

- Next.js site with metadata in `app/layout.tsx`
- `robots.ts`
- `sitemap.ts`
- blog section
- tools section
- bilingual content in the UI layer
- base `LocalBusiness` schema

## Main SEO problems right now

### 1. BG and EN are not separate indexable page sets

Right now the site changes language through client-side state and cookies. That is okay for UX, but weak for SEO.

Search engines need separate URLs if you want strong ranking in two languages.

### 2. `hreflang` setup is not SEO-ready

In the current metadata, both BG and EN alternates point to the same homepage URL. That does not create proper localized search signals.

### 3. The document language is globally Bulgarian

The root layout currently uses `<html lang="bg">`, even when English content is shown.

### 4. The homepage positioning is too broad

The site tries to say too many things at once:

- websites
- content
- automation
- general agency services

That weakens topical clarity, especially for US search.

### 5. The content surface is too small

The blog currently has only one published post. That is far too little to build topical authority in either market.

### 6. There are not enough dedicated service pages

The site needs landing pages built around clear search intent, not only a homepage and a general blog.

### 7. There were metadata issues

During this pass, one wrong canonical on `/tools` was found and corrected.

### 8. Sitemap and localization are too limited

The current sitemap is functional but not yet built for a serious bilingual SEO structure.

## 4. The Main Strategic Decision

If `karchx.com` wants to rank in both Bulgaria and the United States, it should be structured as a bilingual SEO system, not as one mixed homepage with a language toggle.

That means the future architecture should be:

- `/bg/...` for Bulgarian pages
- `/en/...` for English pages

This is the most important future implementation change.

Without it:

- Google gets weaker language targeting signals
- real `hreflang` is not implemented properly
- metadata cannot be aligned cleanly per market
- content strategy gets muddy

## 5. Full SEO Strategy for Bulgaria and the United States

## A. SEO Goal by Market

### Bulgaria

The Bulgarian market should target high-intent commercial keywords where top 5 is actually realistic.

Target result:

- top 5 for selected service keywords
- more inbound leads from Bulgarian search
- stronger branded presence in the local market

### United States

The US market should not start with ultra-broad agency terms.

It should target narrower long-tail commercial queries where the site can realistically compete.

Target result:

- page 1 visibility for selected niche service phrases
- leads from founders, creators, and small businesses
- gradual authority growth through content and backlinks

## B. Keyword Strategy

The keyword strategy must be different in BG and EN. Direct translation is not enough.

### Bulgarian keyword clusters

Priority keyword families:

- `изработка на сайт`
- `изработка на сайт за бизнес`
- `фирмен сайт`
- `цена за сайт`
- `лендинг страница`
- `лендинг страница цена`
- `контент за социални мрежи`
- `видео съдържание за бизнес`
- `AI автоматизации за бизнес`
- `чатбот за бизнес`

These are closer to real commercial intent and have a more realistic path to top 5 locally.

### English keyword clusters

Priority keyword families:

- `landing page developer for coaches`
- `website design for personal brands`
- `small business website redesign`
- `conversion focused web design`
- `ai automation for small business`
- `website for course creators`
- `content systems for founders`
- `marketing site for service business`
- `lead generation website for local service business`
- `website and content agency for creators`

The site should avoid trying to win broad terms like:

- `web design agency`
- `marketing agency`
- `web development company`

Those are too competitive and too vague.

## C. Separate Pages for BG and EN

This is the future page model that should be implemented.

### Bulgarian core pages

- `/bg/`
- `/bg/izrabotka-na-saitove`
- `/bg/landing-stranitsi`
- `/bg/ai-avtomatizatsii`
- `/bg/sazdavane-na-sadarzhanie`
- `/bg/tseni`
- `/bg/kazusi`
- `/bg/blog/...`

### English core pages

- `/en/`
- `/en/website-development`
- `/en/landing-pages`
- `/en/ai-automation`
- `/en/content-production`
- `/en/pricing`
- `/en/case-studies`
- `/en/blog/...`

## Why this matters

- each language gets its own crawlable URLs
- each page can have its own title and description
- true `hreflang` becomes possible
- internal linking can be market-specific
- content can match actual search intent in each country

## D. Service Page Strategy

Before publishing a lot of blog content, the site should first build its money pages.

Each main service page should include:

- one primary keyword
- one clear service offer
- proof, examples, or results
- strong CTA
- FAQ section built from real objections
- internal links to case studies and blog posts
- clean metadata and schema support

The service pages should be the main SEO and conversion assets.

## E. Case Study Strategy

Your portfolio should become indexable SEO content, not only visual showcase content.

Each serious project should become its own case study page with:

- who the client was
- what problem they had
- what you built
- why the solution was structured that way
- outcome or measurable change if available
- CTA to contact you

This is especially important for US SEO because it builds trust and differentiation.

## F. Content Strategy

The blog should support service pages, not exist as disconnected content.

Recommended rhythm for the first 90 days:

- `2` Bulgarian articles per month
- `2` English articles per month

### Bulgarian content themes

- site pricing in Bulgaria
- what makes a business website convert
- when to use a landing page
- how AI automation helps small businesses
- how to choose a website partner

### English content themes

- conversion-focused landing pages
- website mistakes that kill trust
- when service businesses need automation
- how to structure a founder website
- website content systems for lead generation

Every article should support:

- a service page
- a case study
- or a linkable tool/resource

## G. Backlink Strategy

For `karchx.com`, the safer path is real link acquisition, not cloned satellites.

Priority backlink sources:

- quality business directories
- local Bulgarian business and startup directories
- creator and founder communities
- guest posts
- podcast features
- portfolio showcases
- partnerships and client mentions
- productized tools and GitHub resources that attract links naturally

### BG link priorities

- Bulgarian entrepreneur and startup communities
- local business directories
- Bulgarian tech and marketing publications
- founder interviews and podcasts

### US link priorities

- founder communities
- indie hacker ecosystems
- creator economy newsletters
- AI tooling communities
- design/dev showcase platforms

## H. Tools as SEO Assets

The `/tools` section has strong potential as a link magnet.

That page should eventually become part of the SEO engine by offering:

- real free tools
- setup guides
- GitHub resources
- tutorials
- practical AI workflow content

This is one of the best ways to earn authority, especially for US-facing audiences.

## I. Measurement and Reporting Strategy

This is the most important ClawBox habit to reuse.

Eventually, `karchx.com` should have its own light SEO reporting loop.

Recommended tracking buckets:

- BG service keywords
- EN service keywords
- brand keywords
- blog informational keywords
- tools/resource keywords

Recommended sources:

- Google Search Console
- GA4
- rank tracking for a defined keyword set

Recommended metrics:

- impressions
- clicks
- CTR
- average position
- organic sessions
- estimate completions
- booked calls
- leads by landing page

## 6. Technical SEO Plan for the Future BG and EN Structure

When implementation starts, this is the technical direction.

## Page architecture

Move from language-toggle SEO to route-based SEO.

Target structure:

- `app/bg/...`
- `app/en/...`

## Metadata

Each language page should have:

- its own `title`
- its own `description`
- its own canonical
- proper alternates for BG, EN, and `x-default`

## `hreflang`

Each BG page should point to its EN equivalent, and each EN page should point back to its BG equivalent.

Example concept:

- `bg`: `https://www.karchx.com/bg/izrabotka-na-saitove`
- `en`: `https://www.karchx.com/en/website-development`
- `x-default`: whichever default version you choose

## Language signal

The HTML `lang` should match the actual route language.

## Sitemap

The sitemap should expand to include:

- BG pages
- EN pages
- blog pages
- service pages
- case studies

## Schema

Recommended additions:

- richer `Organization` schema
- improved `LocalBusiness` schema if business location details are valid to publish
- `Article` schema for blog posts
- `BreadcrumbList` on inner pages
- `FAQPage` only when the page visibly contains the FAQ

## Internal linking

Internal links should support topical clusters. Example:

- homepage links to service pages
- service pages link to case studies
- blog posts link to services
- tools link to relevant commercial pages

## 7. 90-Day Execution Plan

## Phase 1: Foundation

Target window: first 2 weeks

- create the future `/bg` and `/en` route structure
- move from cookie-first SEO to route-first SEO
- implement real localized metadata
- implement proper `hreflang`
- expand the sitemap
- define the first BG and EN keyword sets
- create the first core service pages

## Phase 2: Commercial content buildout

Target window: days 15 to 45

- publish the first BG service pages
- publish the first EN service pages
- create at least `2` case studies
- publish `2` BG articles
- publish `2` EN articles
- improve internal linking

## Phase 3: Authority building

Target window: days 46 to 90

- expand content around winning clusters
- improve pages with impressions but weak CTR
- launch or improve at least one tool worth linking to
- begin consistent directory and outreach work
- track rankings and lead performance

## 8. Priority SEO Tasks When We Resume

When you come back to this later, these should be the first practical steps.

### Highest-priority implementation tasks

1. Create real `/bg` and `/en` page architecture.
2. Rework metadata and alternates page by page.
3. Build the first BG service pages.
4. Build the first EN service pages.
5. Create case study pages from existing portfolio work.
6. Expand the blog around those service clusters.
7. Set up repeatable SEO reporting.

### Highest-priority content tasks

1. Define the exact top `10` BG keywords to attack first.
2. Define the exact top `10` EN long-tail keywords to attack first.
3. Write service page copy around those terms.
4. Publish one strong case study immediately after the service pages.

## 9. What Has Already Been Done in the Repo

During this pass:

- the ClawBox SEO knowledge was documented
- the full `karchx.com` strategy was documented
- the wrong canonical on `/tools` was corrected to `https://www.karchx.com/tools`

Relevant file:

- `app/tools/page.tsx`

## 10. Important Strategic Guardrails

These are the rules that should guide future SEO work.

### Do

- build separate localized URLs
- target commercial intent first
- build useful pages before scaling content
- publish real case studies
- earn relevant backlinks
- track performance regularly

### Do not

- rely only on one homepage to rank in two languages
- translate pages literally without market adaptation
- publish large amounts of low-value filler content
- copy aggressive satellite strategies blindly
- chase vanity keywords that do not convert

## 11. Recommended Google Guidance Behind This Strategy

The strategy is aligned with current Google Search guidance:

- Localized pages and `hreflang`:
  `https://developers.google.com/search/docs/advanced/crawling/localized-versions`
- Helpful, people-first content:
  `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Spam policies and scaled content risk:
  `https://developers.google.com/search/docs/advanced/guidelines/auto-gen-content`
- Sitemaps:
  `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`

## 12. Fast Restart Brief

If we continue this later, the fastest restart context is:

“`karchx.com` needs a bilingual SEO architecture with `/bg` and `/en` pages. The goal is top 5 locally in Bulgaria for selected commercial keywords and page 1 visibility in the US for carefully chosen long-tail service terms. The site should use localized service pages, case studies, blog support content, real backlinks, and proper metadata rather than rely on one language-switched homepage.`”

## Final Bottom Line

This site can rank in both BG and EN, but only if the structure changes from language toggle to real localized SEO architecture.

The future winning formula is:

- separate BG and EN pages
- focused service keywords
- strong case studies
- bilingual content clusters
- real backlinks
- consistent measurement

That is the clearest path to meaningful SEO growth for `karchx.com`.
