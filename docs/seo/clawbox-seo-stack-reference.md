# ClawBox SEO Stack Reference

Captured on May 12, 2026 from an internal user brief. This file is a reference snapshot, not an independently verified audit.

## What ClawBox Is Running

ClawBox is using a multi-layer SEO stack built around daily rank tracking, Google-owned data sources, authority building, and aggressive indexing loops.

## 1. Serper.dev Rank Tracking

Serper.dev is used as a Google search API to run real Google US searches and return positions, URLs, and competing pages.

- Script: `serper_rank_tracker.py`
- Cadence: daily, every morning
- Scope: 57 keywords
- Cost model: approximately `$0.001` per query
- Domain focus: `openclawhardware.dev` plus satellite domains

### Live rankings snapshot from May 12, 2026

| Position | Keyword | Category |
|---|---|---|
| #1 | `clawbox`, `claw box`, `clawbox buy`, `buy clawbox` | Brand |
| #1 | `openclaw box` | OpenClaw |
| #2 | `clawbox review`, `claw box ai` | Brand |
| #2 | `buy openclaw hardware` | Buy intent |
| #4 | `dedicated ai hardware` | Product |
| #4 | `clawbox vs mac mini` | Comparison |
| #5 | `perplexity alternative hardware` | Comparison |
| #6 | `clawbox price` | Brand |
| #7 | `openclaw hardware` | Brand |

Not yet ranking: 35 generic non-brand keywords such as `ai hardware box`, `ai assistant hardware`, `personal ai server`, and `plug and play ai`.

## 2. Google Search Console

Google Search Console is used as the source of truth for actual search queries, clicks, impressions, CTR, and average position.

- Script: `gsc_fetch.py`
- Cadence: daily, every morning

### Last shared GSC snapshot from March 19, 2026

| Query | Clicks | Impressions | CTR | Avg Position |
|---|---|---|---|---|
| `clawbox` | 1,530 | 4,094 | 37.4% | #2.6 |
| `openclaw box` | 45 | 226 | 19.9% | #4.2 |
| `open claw hardware` | 41 | 174 | 23.6% | #2.9 |
| `openclaw hardware` | 32 | 329 | 9.7% | #7.6 |
| `claw box` | 27 | 116 | 23.3% | #3.3 |

## 3. GA4

GA4 is used to connect SEO and total acquisition to sessions, purchases, and revenue.

- Auth method: service account
- Service account path: `/home/nexus0/.config/ga4-service-account.json`
- Browserless automation: yes

### Last shared GA4 snapshot from the week of March 18, 2026

- `1,952` users in 7 days
- `2,257` sessions in 7 days
- `16` purchases in 7 days
- `€9,160` revenue in 7 days
- Source mix: Direct `66%`, Organic Search `19%`, Referral `7%`

## 4. Satellite Domain Network

ClawBox runs a network of `52+` satellite domains registered through Porkbun. Each domain targets a specific keyword and publishes a long-form static page with schema, FAQ, and links back to `openclawhardware.dev`.

- Hosting model: one GitHub repo per domain under `yalexx/<domain>`
- Deployment: GitHub Pages
- Content pattern: one unique landing page per domain, generally `1,500+` words
- Link rule: satellites link up to the main site; the main site does not link down

### Shared examples

| Domain | Target keyword |
|---|---|
| `jetson-ai-box.com` | `jetson ai box` |
| `self-hosted-ai.com` | `self hosted ai` |
| `dedicated-ai-hardware.com` | `dedicated ai hardware` |
| `personal-ai-server.com` | `personal ai server` |
| `no-cloud-ai.com` | `no cloud ai` |
| `openclaw-whatsapp.com` | `openclaw whatsapp` |
| `clawboxai.dev` | main brand variant, not a redirect funnel |

### Nightly updater behavior

Cron time: `2:00 AM` Athens time.

1. Pull the real domain list from the Porkbun API.
2. Find the stalest GitHub repo.
3. Rewrite the page with refreshed content, specs, and FAQ.
4. Submit the updated URL through IndexNow.

## 5. IndexNow

IndexNow is used immediately after each nightly satellite update to request faster recrawl of the updated URL.

## 6. Daily SEO Morning Report

Cron time: `7:30 AM` Athens time.

### Sequence

1. Run `serper_rank_tracker.py` and compare rank changes vs. the prior day.
2. Run `gsc_fetch.py` for fresh GSC metrics.
3. Pull GA4 metrics for users, sessions, purchases, and revenue.
4. Format the combined report and send it to Telegram.

## 7. Directory and Backlink Campaign

ClawBox also has `40+` directory and backlink placements submitted or pending, including platforms such as Product Hunt, HackerNoon, AlternativeTo, NVIDIA Jetson Community, Hackster.io, AI tooling directories, and startup directories.

The stated purpose is to add real external backlinks on top of the satellite network.

## Main Operational Loops

| Cron | Time | Purpose |
|---|---|---|
| Daily SEO Morning Report | `7:30 AM` daily | Serper + GSC + GA4 summary to Telegram |
| SEO Satellite Updater | `2:00 AM` daily | Refresh one satellite site and ping IndexNow |

## Strategic Lessons Worth Reusing

- Daily measurement creates fast feedback loops.
- Ranking data, search data, and revenue data are separated correctly.
- Brand, comparison, and buy-intent keywords are tracked independently.
- Indexation is treated as an operational problem, not an afterthought.
- External backlinks are recognized as the real unlock for generic terms.

## Strategic Lessons Not Safe To Copy Blindly

Some ClawBox tactics are highly specific to a product SEO moat and should not be copied 1:1 into `karchx.com`.

- The satellite-domain model is aggressive and easier to justify for a product ecosystem than for an agency site.
- The content-refresh loop across many near-adjacent domains can drift toward scaled or low-value content if quality drops.
- Google explicitly warns against doorway-style setups and scaled content built mainly to manipulate rankings rather than help users.

Relevant Google documentation:

- Helpful, people-first content: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Spam policies, including doorway abuse and scaled content abuse: `https://developers.google.com/search/docs/advanced/guidelines/auto-gen-content`

## Bottom Line

ClawBox wins because it combines:

- strong brand demand
- daily measurement
- intent-based keyword tracking
- consistent URL updates
- external backlinks
- a large supporting content and domain surface area

For `karchx.com`, the transferable part is the discipline and measurement model, not the full satellite-domain playbook.
