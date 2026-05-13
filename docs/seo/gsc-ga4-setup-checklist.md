# GSC and GA4 Setup Checklist

Prepared on May 12, 2026.

This file is the practical setup checklist for:

- Google Search Console
- Google Analytics 4

Use it later when you are ready to do the setup manually.

## Current Project State

Already present in the codebase:

- GA4 tag is installed in [app/layout.tsx](/Users/Apple/Downloads/karchev/Karchev/app/layout.tsx) with measurement ID `G-HYR74PQ33D`
- Google verification meta value exists in [app/layout.tsx](/Users/Apple/Downloads/karchev/Karchev/app/layout.tsx)
- HTML verification file exists at [googleaa86a2468f5d12a3.html](/Users/Apple/Downloads/karchev/Karchev/googleaa86a2468f5d12a3.html)
- sitemap exists at `/sitemap.xml`
- localized SEO pages now exist under `/bg/...` and `/en/...`

Not yet implemented in tracking:

- custom GA4 event for contact form success
- custom GA4 event for estimate completion
- custom GA4 event for booked calls

So right now GA4 should be able to collect:

- page views
- session data
- scroll / outbound click / enhanced measurement events if enabled in the stream

But it will not yet reliably measure leads as business outcomes until custom events are added.

## Part 1: Google Search Console

## 1. Add the property

Recommended:

- add a `Domain property` for `karchx.com`

Why:

- it covers all protocol and subdomain versions
- it is the cleanest long-term setup

Official reference:

- Add a property: https://support.google.com/webmasters/answer/34592?hl=en
- Domain property: https://support.google.com/webmasters/answer/10431861?hl=en

## 2. Verify ownership

Best method:

- DNS TXT verification at your domain registrar

Alternative:

- use the existing HTML verification file if needed

Official reference:

- Verify ownership: https://support.google.com/webmasters/answer/9008080?hl=en-IN

## 3. Submit the sitemap

After verification:

1. Open Search Console
2. Select the property
3. Go to `Sitemaps`
4. Submit:
   - `https://www.karchx.com/sitemap.xml`

Official reference:

- Sitemap help: https://support.google.com/webmasters/answer/12817956?hl=en

## 4. Check indexing coverage

After the sitemap is submitted:

- confirm that `/bg` and `/en` pages start appearing
- check that the main service pages are discoverable
- watch for:
  - `Crawled - currently not indexed`
  - `Duplicate without user-selected canonical`
  - `Alternate page with proper canonical`
  - `Redirect` statuses on legacy URLs

Priority URLs to inspect manually:

- `/bg`
- `/en`
- `/bg/izrabotka-na-saitove`
- `/bg/landing-stranitsi`
- `/bg/ai-avtomatizatsii`
- `/en/website-development`
- `/en/landing-pages`
- `/en/ai-automation`
- `/bg/blog`
- `/en/blog`
- `/bg/kazusi`
- `/en/case-studies`

## 5. Use URL Inspection on the most important pages

Request indexing for:

- both homepages
- all 6 service pages
- blog index pages
- case study index pages
- all new articles

Do not waste time requesting indexing for every tiny change.

## 6. First GSC reports to watch

Watch these reports first:

- `Performance > Search results`
- `Pages`
- `Sitemaps`

In Performance:

- filter by page
- filter by country
- compare BG and EN pages separately

First useful dimensions:

- Queries
- Pages
- Countries
- Devices

## 7. Country checks

For BG pages:

- watch Bulgaria impressions and clicks first

For EN pages:

- watch United States first, then other English-speaking traffic only as secondary

## Part 2: Google Analytics 4

## 1. Confirm the GA4 property

Open Analytics and confirm that the property using measurement ID `G-HYR74PQ33D` is the correct one for `karchx.com`.

If you do not have a clean property yet, create one.

Official references:

- Set up GA4 property: https://support.google.com/analytics/answer/9304153?hl=en
- Set up Google tag: https://support.google.com/analytics/answer/15756615?hl=en

## 2. Confirm the web data stream

In GA4:

1. Go to `Admin`
2. Open `Data streams`
3. Open the web stream for `karchx.com`
4. Make sure `Enhanced measurement` is enabled

Recommended:

- leave enhanced measurement on
- review which automatic events are enabled

This helps collect:

- page views
- scrolls
- outbound clicks
- site search if present
- file downloads if relevant

## 3. Verify data collection

After opening the site in a browser:

1. Open `Reports > Realtime`
2. Visit:
   - `/bg`
   - `/en`
   - one BG service page
   - one EN service page
3. Confirm traffic appears in Realtime

Also check:

- page path or page location
- country
- device category

## 4. Link Search Console to GA4

Do this after both GSC and GA4 are working.

In GA4:

1. Go to `Admin`
2. Open `Product links`
3. Open `Search Console links`
4. Create the link between:
   - your GA4 web stream
   - your Search Console property

Official reference:

- Search Console integration: https://support.google.com/analytics/answer/10737381?hl=es

Important note from Google:

- one GA4 property can link a web data stream to a Search Console property
- Search Console data in Analytics can take up to about 48 hours after collection to appear

## 5. Publish the Search Console report collection in GA4 if needed

Search Console reports are not always visible by default in the left nav.

If you do not see them:

1. Go to `Reports`
2. Open `Library`
3. Find the Search Console collection
4. Publish it

After that, watch:

- Organic Google Search Queries
- Organic Google Search Traffic

## 6. Set up the business outcomes you actually care about

For this site, the key business outcomes should be:

- contact form success
- estimate completion
- booked call click or booked call confirmation

Important:

- these are not fully implemented in code yet
- without them, GA4 will show traffic data but not true SEO business value

## 7. What to do now in GA4 before custom code exists

Right now you can still:

- mark useful existing events as key events only if they truly matter
- use enhanced measurement for baseline behavior

Do not mark weak proxy events as key events unless you have no better option.

Examples of weak proxies:

- generic `scroll`
- generic `page_view`

Those are useful diagnostics, not true business outcomes.

## 8. When custom events are added later

The recommended future custom events are:

- `contact_form_submit_success`
- `estimate_complete`
- `book_call_click`

Then in GA4:

1. Go to `Admin`
2. Open `Events`
3. Find the event
4. Mark it as a key event

Official references:

- Mark events as key events: https://support.google.com/analytics/answer/13128484?hl=en
- Create or modify events: https://support.google.com/analytics/answer/12844695?hl=en

## 9. Recommended GA4 custom definitions later

When custom tracking is added, useful parameters would be:

- `locale`
- `service_type`
- `lead_source`
- `estimate_type`

This helps split:

- BG vs EN
- website vs landing page vs ecommerce
- organic vs direct vs referral

## Part 3: Weekly Workflow

Every week:

1. Open GSC and check queries for the 6 service pages.
2. Open GA4 and check landing pages from organic traffic.
3. Compare:
   - pages with impressions but low CTR
   - pages with clicks but weak engagement
   - pages with visits but no leads
4. Update titles, descriptions, internal links, or section order based on that data.

## Part 4: What You Should Not Waste Time On Yet

Do not spend time yet on:

- dozens of vanity dashboards
- marking too many weak events as key events
- obsessing over total traffic before service pages get enough impressions
- buying multiple paid SEO tools before GSC gives useful data

## Exact Setup Order

Use this order:

1. Verify `karchx.com` in GSC
2. Submit `https://www.karchx.com/sitemap.xml`
3. Confirm GA4 property and stream
4. Check Realtime in GA4
5. Link Search Console to GA4
6. Publish Search Console reports in GA4 if needed
7. Wait for data
8. Later add custom lead events

## High-Priority Follow-Up Code Task

Later, when you want real SEO-to-lead measurement, the next code task should be:

- implement custom GA4 events for contact form success, estimate completion, and booked-call actions

Without that, GA4 will help with traffic analysis, but not with full lead attribution.
