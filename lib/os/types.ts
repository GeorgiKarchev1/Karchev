export type ContentGoal = 'leads' | 'trust' | 'awareness' | 'education'

export interface BusinessProfileInput {
  businessName: string
  businessType: string
  whatYouSell: string
  targetAudience: string
  customerPains: string
  faqs: string
  tone: string
  goals: ContentGoal[]
}

export interface ContentPillar {
  id: string
  title: string
  description: string
  weight: number
}

export interface ContentIdea {
  id: string
  pillarId: string
  title: string
  hook: string
  format: string
  angle: string
  status: 'draft' | 'queued' | 'shipped'
}

export interface HookTemplate {
  id: string
  category: 'pain' | 'curiosity' | 'authority' | 'contrarian' | 'story' | 'list'
  template: string
  example: string
}

export interface WeeklyPlanDay {
  day: string
  pillar: string
  ideaTitle: string
  format: string
  hook: string
  cta: string
}

export type RepurposePlatform =
  | 'linkedin'
  | 'instagram'
  | 'twitter'
  | 'email'
  | 'short-video'

export interface RepurposeVariant {
  platform: RepurposePlatform
  label: string
  format: string
  copy: string
  notes: string
}

export interface OSBootstrapResult {
  pillars: ContentPillar[]
  ideas: ContentIdea[]
  hooks: HookTemplate[]
  weeklyPlan: WeeklyPlanDay[]
}
