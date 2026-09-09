# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary buyer: **international / EU clients** — English-speaking businesses outside
Bulgaria. The `/en` surface is a primary commercial surface, not a translation of a
Bulgarian original.

Second, equally weighted market: **Bulgarian businesses** on `/bg`. Confirmed as full
parity — neither language leads, and every surface ships in both simultaneously.

## Product Purpose

KARCHX currently offers **one unnamed AI agent**, built and strictly personalised
for each individual client. This was explicitly clarified by the user on September 7,
2026, after reviewing the first redesign. Tasks, knowledge, tools, behaviour and
permissions are configured individually. The person may use it for their own work or
with their team; the offer is not limited to companies.

The user is building KarchX OS and expects to change the website again later.
The current public offer is the personalised agent. Do not introduce a product name,
platform launch, standard plans or product capabilities that have not been supplied.

Success is a client using their configured agent in their own work, with clear scope,
permissions and ownership of what is built.

## Positioning

One individually configured AI agent, built directly with Georgi Karchev around the
client’s tasks and way of working.
The homepage explains inputs, actions and human review before the delivery process.
The established commitments are:

- integration into the client's **existing** stack rather than a new system to adopt;
- scope, integrations and delivery timing agreed for the specific task;
- the client owns everything that gets built.

## Operating Context

- The owner expects most visitors to use a phone. Mobile presentation is a primary requirement: center the hero introduction and keep the founder portrait prominent at narrow widths.

- Strict bilingual parity, Bulgarian (`/bg`) and English (`/en`). Both must ship
  together; a surface that exists in one language and not the other is incomplete.
- Lead capture runs through several entry points rather than one contact form: a
  price/estimate calculator, a live AI demo chat, a multi-step funnel wizard, and a
  `submit-lead` endpoint that delivers over Resend.
- Existing public contact-offer copy, retained from `lib/translations.ts`, promises
  a response within 24 hours and a free AI audit, with no commitment required.
  These are inherited commercial commitments, not measured customer outcomes or
  new claims introduced by the AI-agent redesign.
- An admin dashboard (`/admin`) covers analytics, Google Search Console SEO reporting,
  and assisted blog-post generation.
- The existing `/os` route is an internal content-delivery tool, outside this
  redesign. The user’s future KarchX OS direction does not authorize exposing
  internal tools or marketing an unfinished platform on the current homepage.

## Capabilities and Constraints

- Next.js 14 (App Router), TypeScript strict, Tailwind CSS 3, npm.
- Supabase (data/auth), Resend (transactional email), Anthropic SDK (AI features),
  Vercel Blob (storage), Google Auth Library (Search Console).
- A Content Security Policy is enforced. Fonts are self-hosted through `next/font`
  because `fonts.googleapis.com` is blocked by the CSP — external font links will fail
  silently. Any new external origin requires a deliberate CSP change.
- Motion libraries already present: GSAP, Framer Motion, Three.js.
- The case-studies section (`/bg/kazusi`, `/en/case-studies`) is being removed at the
  user's instruction; see Evidence on Hand.

## Brand Commitments

- Name: **KARCHX** (domain `karchx.com`). Confirmed by the user as the brand across
  every surface. **Georgi Karchev** is the principal — a person, not the brand; keep
  him in `author`/`creator` metadata and never substitute one for the other.
- Existing assets: `/img/newfav.png` (favicon), `/img/og-image.png` (Open Graph).
- The September 7 correction explicitly delegates a **new white/black palette with no green**, superseding the earlier request to match live karchx.com. The experiment uses white, graphite and silver. Golos Text was retained at that stage; the later September 8 font decision below supersedes it. The existing brand wordmark remains. Mobile hero text stays centered, and the founder portrait stays large. The repeated side-by-side personal introduction is rejected; it must become a visibly different composition.
- The entire web-project portfolio section and its extra-project disclosure were
  removed at the user's request. Do not restore them as proof on this homepage.
- The September 8 hero direction prioritizes immediate understanding of the personal AI-agent offer. DataFast and Marc Lou’s product sites are explicit composition references. Decorative abstract 3D shapes are rejected for this hero because they are unrelated to the offer and obstruct reading.
- The latest September 8 request explicitly selects `landing-page-design` from `/Users/Apple/Desktop/agentscontrol` for a new hero and rejects the screenshot’s three-tab AgentWorkbench. The new hero has no workbench. Manrope is selected under that named skill for the shared marketing presentation, superseding the earlier Golos Text preference; internal application fonts remain unchanged.

## Evidence on Hand

**Historical evidence, no longer displayed on the homepage:** five client sites —
theagencycourse.bg, algochad.com, editing.bg, yordankolev.com, eterika.eu. These are
existing work; the user has explicitly removed their portfolio section. The live AI demo bot (`/api/ai-demo`) is also
a real, working demonstration rather than a claim. It is not the unnamed commercial
agent and is no longer promoted by its name on the homepage. The former three-scenario
homepage workbench used fictional inputs and explicitly labeled itself as illustrative;
it did not call a model or perform actions on customer systems. The user rejected it
on September 8. Its unused component remains on disk but is not mounted on the homepage.

**Absent, and must not be invented:**

- The two written case-study pages (`editing-bg`, `yordan-kolev`) were rejected by the
  user as unusable and have been removed. Their URLs 301 to the language home. The
  underlying client work stays valid as portfolio evidence; the write-ups do not.
- No verified metrics, percentages, revenue figures, time savings, client counts,
  testimonials, logos, awards, or benchmarks exist.
- **No page may invent, imply, or imply-by-design any result, statistic, or named
  outcome.** Proof-shaped layout with placeholder numbers is the same failure as
  fabricating them.

## Product Principles

1. **Integrate, don't replace.** The offer is AI inside the client's current tools. Any
   surface that implies ripping out and rebuilding their stack misrepresents the product.
2. **Both languages are the product.** Bulgarian and English are peers. Work is not
   done until it exists in both.
3. **Ownership is the promise.** The client owns what is built. This is a stated
   commercial commitment, not a marketing flourish.
4. **Never manufacture proof.** Explain the configured agent and direct collaboration.
   Do not restore the removed web portfolio, invent outcomes, or present illustrative
   task examples as a live commercial product.
5. **Internal tooling stays internal.** `/os` and `/admin` serve delivery, never the
   customer narrative.

- Earlier September 8 correction: preserve the founder photograph in its original colors. The neutral interface palette must not recolor the photograph. That hero was rejected in favor of a new composition with centered mobile copy; the latest hero direction and workbench rejection are recorded above.

- September 8 follow-up: the owner approved the new Manrope hero, then requested removing only its small founder attribution/thumbnail and adding text animation. The large founder profile remains.
