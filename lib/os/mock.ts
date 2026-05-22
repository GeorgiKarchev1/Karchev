import type {
  BusinessProfileInput,
  ContentIdea,
  ContentPillar,
  HookTemplate,
  OSBootstrapResult,
  RepurposePlatform,
  RepurposeVariant,
  WeeklyPlanDay,
} from '@/lib/os/types'

const firstSentence = (value: string, fallback: string) =>
  value
    .split(/\.|\n/)
    .map((part) => part.trim())
    .filter(Boolean)[0] || fallback

const id = (prefix: string, i: number) => `${prefix}-${i + 1}`

export function buildMockOSBootstrap(input: BusinessProfileInput): OSBootstrapResult {
  const business = input.businessName || 'Your business'
  const audience = firstSentence(input.targetAudience, 'small business owners')
  const pain = firstSentence(input.customerPains, 'wasting time on inconsistent marketing')
  const offer = firstSentence(input.whatYouSell, 'your offer')
  const faq = firstSentence(input.faqs, 'What makes your offer different?')

  const pillars: ContentPillar[] = [
    {
      id: id('pillar', 0),
      title: 'Problem Awareness',
      description: `Educate ${audience} on the hidden cost of ${pain.toLowerCase()}.`,
      weight: 25,
    },
    {
      id: id('pillar', 1),
      title: 'Offer Clarity',
      description: `Make ${offer.toLowerCase()} easy to understand and easy to trust.`,
      weight: 25,
    },
    {
      id: id('pillar', 2),
      title: 'Proof & Authority',
      description: `Show why ${business} gets results through case studies, lessons, and breakdowns.`,
      weight: 25,
    },
    {
      id: id('pillar', 3),
      title: 'Objection Handling',
      description: `Turn buyer hesitation into posts that answer concerns before the sales call.`,
      weight: 25,
    },
  ]

  const ideaSeed: Omit<ContentIdea, 'id' | 'status'>[] = [
    {
      pillarId: pillars[0].id,
      title: `Why ${audience} stay stuck before buying ${offer}`,
      hook: `Most people don't need more options. They need clarity on what actually works.`,
      format: 'LinkedIn post',
      angle: 'Education',
    },
    {
      pillarId: pillars[0].id,
      title: `The biggest mistake people make when dealing with ${pain}`,
      hook: `The expensive part isn't the mistake. It's repeating it for 6 months.`,
      format: 'Instagram caption',
      angle: 'Pain point',
    },
    {
      pillarId: pillars[1].id,
      title: `A short FAQ breakdown: ${faq}`,
      hook: `If a prospect asks this, they're already close to buying.`,
      format: 'Short video / Reel',
      angle: 'FAQ',
    },
    {
      pillarId: pillars[2].id,
      title: `Behind the scenes: how ${business} approaches ${offer}`,
      hook: `Here's how we think about this before we touch execution.`,
      format: 'Founder / opinion post',
      angle: 'Authority',
    },
    {
      pillarId: pillars[3].id,
      title: `What to do this week if you want more trust from ${audience}`,
      hook: `If I had to rebuild trust from zero this week, I'd do these 3 things first.`,
      format: 'Carousel / thread',
      angle: 'Trust building',
    },
    {
      pillarId: pillars[2].id,
      title: `Case-study breakdown: a result we got with ${offer}`,
      hook: `We didn't change the offer. We changed the order of what we said.`,
      format: 'LinkedIn post',
      angle: 'Proof',
    },
    {
      pillarId: pillars[1].id,
      title: `What ${offer} actually replaces`,
      hook: `Most people compare us to the wrong thing — that's where the confusion starts.`,
      format: 'Carousel',
      angle: 'Positioning',
    },
    {
      pillarId: pillars[3].id,
      title: `"It's too expensive" — the real answer`,
      hook: `Price isn't the objection. Risk is. Here's how we resolve it.`,
      format: 'Short video / Reel',
      angle: 'Objection',
    },
  ]

  const ideas: ContentIdea[] = ideaSeed.map((idea, i) => ({
    ...idea,
    id: id('idea', i),
    status: 'draft',
  }))

  const hooks: HookTemplate[] = [
    {
      id: id('hook', 0),
      category: 'pain',
      template: `The most expensive part of ${pain.toLowerCase()} isn't what you think.`,
      example: `The most expensive part of bad content isn't the time. It's the silence.`,
    },
    {
      id: id('hook', 1),
      category: 'curiosity',
      template: `Most ${audience} get ${offer} wrong because of one assumption.`,
      example: `Most founders get content wrong because they assume more = better.`,
    },
    {
      id: id('hook', 2),
      category: 'authority',
      template: `After working with ${audience}, here's the one pattern I see every time.`,
      example: `After 50+ founders, the one pattern I see every time: they post for peers, not buyers.`,
    },
    {
      id: id('hook', 3),
      category: 'contrarian',
      template: `Everyone tells ${audience} to do X. That's why they stay stuck.`,
      example: `Everyone tells founders to post daily. That's why they burn out by week 3.`,
    },
    {
      id: id('hook', 4),
      category: 'story',
      template: `Last month a ${audience} came to us with ${pain.toLowerCase()}. Here's what we changed.`,
      example: `Last month a SaaS founder came to us with zero inbound. Here's what we changed.`,
    },
    {
      id: id('hook', 5),
      category: 'list',
      template: `3 things ${audience} need to fix before chasing more ${offer}.`,
      example: `3 things to fix in your funnel before chasing more leads.`,
    },
    {
      id: id('hook', 6),
      category: 'pain',
      template: `If ${pain.toLowerCase()} sounds familiar, you're not alone — and the fix isn't more effort.`,
      example: `If inconsistent posting sounds familiar, you're not alone — and the fix isn't more effort.`,
    },
    {
      id: id('hook', 7),
      category: 'curiosity',
      template: `I used to think ${offer} was about [X]. After ${business}, I think different.`,
      example: `I used to think content was about volume. After 12 months running this, I think different.`,
    },
  ]

  const weeklyPlan: WeeklyPlanDay[] = [
    {
      day: 'Monday',
      pillar: pillars[2].title,
      ideaTitle: ideas[5].title,
      format: ideas[5].format,
      hook: ideas[5].hook,
      cta: 'Start a conversation in comments',
    },
    {
      day: 'Tuesday',
      pillar: pillars[1].title,
      ideaTitle: ideas[2].title,
      format: ideas[2].format,
      hook: ideas[2].hook,
      cta: 'Save for later',
    },
    {
      day: 'Wednesday',
      pillar: pillars[2].title,
      ideaTitle: ideas[3].title,
      format: ideas[3].format,
      hook: ideas[3].hook,
      cta: 'Reply with your take',
    },
    {
      day: 'Thursday',
      pillar: pillars[3].title,
      ideaTitle: ideas[7].title,
      format: ideas[7].format,
      hook: ideas[7].hook,
      cta: 'Book a call',
    },
    {
      day: 'Friday',
      pillar: pillars[1].title,
      ideaTitle: ideas[6].title,
      format: ideas[6].format,
      hook: ideas[6].hook,
      cta: 'Visit the offer page',
    },
  ]

  return { pillars, ideas, hooks, weeklyPlan }
}

export function buildRepurposeVariants(
  source: string,
  profile: BusinessProfileInput | null
): RepurposeVariant[] {
  const business = profile?.businessName || 'us'
  const audience = profile
    ? firstSentence(profile.targetAudience, 'your audience')
    : 'your audience'
  const tone = profile?.tone || 'direct, practical'
  const cleaned = source.trim()
  const core = cleaned || `One thought we keep coming back to at ${business}.`

  const platforms: { key: RepurposePlatform; label: string; format: string }[] = [
    { key: 'linkedin', label: 'LinkedIn', format: 'Long-form post (150–250 words)' },
    { key: 'instagram', label: 'Instagram', format: 'Caption (90–140 words)' },
    { key: 'twitter', label: 'X / Twitter', format: '5-tweet thread' },
    { key: 'email', label: 'Email', format: '4-line newsletter blurb' },
    { key: 'short-video', label: 'Short Video', format: '30s script (Reel / TikTok)' },
  ]

  return platforms.map(({ key, label, format }) => ({
    platform: key,
    label,
    format,
    copy: formatForPlatform(key, core, audience, business, tone),
    notes: notesForPlatform(key),
  }))
}

function formatForPlatform(
  platform: RepurposePlatform,
  core: string,
  audience: string,
  business: string,
  tone: string
): string {
  const opening = core.split('\n')[0].slice(0, 140)

  switch (platform) {
    case 'linkedin':
      return [
        `${opening}`,
        ``,
        `Here's what we see working with ${audience}:`,
        ``,
        `→ ${core}`,
        ``,
        `If you're rebuilding this from scratch, start small — one consistent angle beats five inconsistent ones.`,
        ``,
        `What's the one thing you'd change first?`,
      ].join('\n')
    case 'instagram':
      return [
        `${opening} 👇`,
        ``,
        `${core}`,
        ``,
        `Save this if it hit. Tag someone who needs the reminder.`,
      ].join('\n')
    case 'twitter':
      return [
        `1/ ${opening}`,
        ``,
        `2/ Most ${audience} miss this because they're focused on the wrong layer.`,
        ``,
        `3/ ${core}`,
        ``,
        `4/ The shift is small. The compound effect is not.`,
        ``,
        `5/ If this helped, follow @${business.toLowerCase().replace(/\s+/g, '')} — we share the playbook in public.`,
      ].join('\n')
    case 'email':
      return [
        `Subject: ${opening}`,
        ``,
        `Quick one today.`,
        ``,
        `${core}`,
        ``,
        `Reply and tell me where you're stuck — I read every email.`,
      ].join('\n')
    case 'short-video':
      return [
        `HOOK (0–3s): ${opening}`,
        ``,
        `BODY (3–22s): ${core}`,
        ``,
        `PROOF (22–27s): Here's exactly what happened when we tested this with ${audience}.`,
        ``,
        `CTA (27–30s): Comment "${tone.split(/[, ]/)[0] || 'guide'}" and I'll send you the breakdown.`,
      ].join('\n')
  }
}

function notesForPlatform(platform: RepurposePlatform): string {
  switch (platform) {
    case 'linkedin':
      return 'Lead with a 1-line hook. Break every 1–2 lines. End with one question.'
    case 'instagram':
      return 'Front-load value before the “…more”. Single CTA. Save-worthy framing.'
    case 'twitter':
      return 'Numbered thread. Each tweet must stand alone. End with follow-CTA.'
    case 'email':
      return 'Short, personal, one CTA. Subject line is 80% of the open rate.'
    case 'short-video':
      return 'Hook in 3s or you lose them. Pattern interrupt, then payoff, then CTA.'
  }
}
