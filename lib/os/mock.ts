import type { BusinessProfileInput, OSBootstrapResult } from '@/lib/os/types'

const firstSentence = (value: string, fallback: string) =>
  value
    .split(/\.|\n/)
    .map((part) => part.trim())
    .filter(Boolean)[0] || fallback

export function buildMockOSBootstrap(input: BusinessProfileInput): OSBootstrapResult {
  const business = input.businessName || 'Your business'
  const audience = firstSentence(input.targetAudience, 'small business owners')
  const pain = firstSentence(input.customerPains, 'wasting time on inconsistent marketing')
  const offer = firstSentence(input.whatYouSell, 'your offer')
  const faq = firstSentence(input.faqs, 'What makes your offer different?')

  return {
    pillars: [
      {
        title: 'Problem Awareness',
        description: `Educate ${audience} on the hidden cost of ${pain.toLowerCase()}.`,
      },
      {
        title: 'Offer Clarity',
        description: `Make ${offer.toLowerCase()} easy to understand and easy to trust.`,
      },
      {
        title: 'Proof & Authority',
        description: `Show why ${business} gets results through case studies, lessons, and breakdowns.`,
      },
      {
        title: 'Objection Handling',
        description: `Turn buyer hesitation into posts that answer concerns before the sales call.`,
      },
    ],
    ideas: [
      {
        title: `Why ${audience} stay stuck before buying ${offer}`,
        hook: `Most people don't need more options. They need clarity on what actually works.`,
        format: 'LinkedIn post',
        angle: 'Education',
      },
      {
        title: `The biggest mistake people make when dealing with ${pain}`,
        hook: `The expensive part isn't the mistake. It's repeating it for 6 months.`,
        format: 'Instagram caption',
        angle: 'Pain point',
      },
      {
        title: `A short FAQ breakdown: ${faq}`,
        hook: `If a prospect asks this, they're already close to buying.`,
        format: 'Short video / Reel',
        angle: 'FAQ',
      },
      {
        title: `Behind the scenes: how ${business} approaches ${offer}`,
        hook: `Here's how we think about this before we touch execution.`,
        format: 'Founder/opinion post',
        angle: 'Authority',
      },
      {
        title: `What to do this week if you want more trust from ${audience}`,
        hook: `If I had to rebuild trust from zero this week, I'd do these 3 things first.`,
        format: 'Carousel / thread',
        angle: 'Trust building',
      },
    ],
    weeklyPlan: [
      { day: 'Monday', focus: 'Authority', format: 'Insight post', cta: 'Start a conversation' },
      { day: 'Tuesday', focus: 'FAQ', format: 'Short video', cta: 'Save for later' },
      { day: 'Wednesday', focus: 'Founder point of view', format: 'Story post', cta: 'Reply with your take' },
      { day: 'Thursday', focus: 'Objection handling', format: 'Carousel / thread', cta: 'Book a call' },
      { day: 'Friday', focus: 'Offer clarity', format: 'CTA post', cta: 'Visit the offer page' },
    ],
  }
}
