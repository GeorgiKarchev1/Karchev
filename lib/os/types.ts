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
  title: string
  description: string
}

export interface ContentIdea {
  title: string
  hook: string
  format: string
  angle: string
}

export interface WeeklyPlanDay {
  day: string
  focus: string
  format: string
  cta: string
}

export interface OSBootstrapResult {
  pillars: ContentPillar[]
  ideas: ContentIdea[]
  weeklyPlan: WeeklyPlanDay[]
}
