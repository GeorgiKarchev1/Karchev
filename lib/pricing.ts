// ─── Types ────────────────────────────────────────────────────────────────────

export interface BgAnswers {
  siteType?: 'business_site' | 'landing_page' | 'ecommerce' | 'unsure'
  businessType?: 'services' | 'restaurant' | 'beauty_health' | 'professional' | 'online_store' | 'other'
  businessTypeOther?: string
  existingSite?: 'no_site' | 'redesign' | 'improvements' | 'unsure'
  pages?: 'one_page' | 'three_five' | 'five_ten' | 'unsure'
  content?: 'content_ready' | 'partial_content' | 'no_content' | 'unsure'
  features?: string[]
  timeline?: 'urgent' | 'normal' | 'flexible'
  budget?: 'under_300' | '300_800' | '800_1500' | '1500_plus' | 'unsure'
}

export interface EnAnswers {
  siteType?: 'business_site' | 'landing_page' | 'ecommerce' | 'unsure'
  industry?: 'professional' | 'health_beauty' | 'food' | 'ecommerce_retail' | 'tech_startup' | 'other'
  industryOther?: string
  existingSite?: 'no_site' | 'redesign' | 'improvements' | 'unsure'
  pages?: 'one_page' | 'three_five' | 'five_ten' | 'unsure'
  content?: 'content_ready' | 'partial_content' | 'no_content' | 'unsure'
  features?: string[]
  timeline?: 'urgent' | 'normal' | 'flexible'
  budget?: 'under_500' | '500_1500' | '1500_3000' | '3000_plus' | 'unsure'
}

export interface EstimateResult {
  minPrice: number
  maxPrice: number
  recommendedType: string
  explanation: string
  flags: string[]
  warnings: string[]
}

// ─── BG Pricing Config (edit here) ────────────────────────────────────────────

export const BG_PRICING = {
  basePrices: {
    landing_page:  { min: 300,  max: 600  },
    business_site: { min: 500,  max: 1100 },
    ecommerce:     { min: 1000, max: 3000 },
    unsure:        { min: 500,  max: 1200 },
  },
  pages: {
    one_page:   { min: 0,   max: 0   },
    three_five: { min: 150, max: 300 },
    five_ten:   { min: 350, max: 700 },
    unsure:     { min: 200, max: 400 },
  },
  content: {
    content_ready:   { min: 0,   max: 0   },
    partial_content: { min: 100, max: 250 },
    no_content:      { min: 250, max: 600 },
    unsure:          { min: 150, max: 350 },
  },
  features: {
    contact_form: { min: 0,   max: 50  },
    booking:      { min: 150, max: 400 },
    payments:     { min: 250, max: 700 },
    blog:         { min: 100, max: 300 },
    seo_basic:    { min: 150, max: 400 },
    multilingual: { min: 250, max: 700 },
    none:         { min: 0,   max: 0   },
  },
  existingSite: {
    no_site:  { min: 0,   max: 0   },
    redesign: { min: 100, max: 300 },
    unsure:   { min: 0,   max: 0   },
  },
  improvements: { min: 250, max: 700 },
  urgentMultiplier: 1.2,
  flexibleMaxMultiplier: 0.95,
  minAbsolute: 250,
}

// ─── EN Pricing Config (edit here) ────────────────────────────────────────────

export const EN_PRICING = {
  basePrices: {
    landing_page:  { min: 400,  max: 800  },
    business_site: { min: 600,  max: 1400 },
    ecommerce:     { min: 1200, max: 4000 },
    unsure:        { min: 600,  max: 1500 },
  },
  pages: {
    one_page:   { min: 0,   max: 0   },
    three_five: { min: 200, max: 400 },
    five_ten:   { min: 400, max: 800 },
    unsure:     { min: 250, max: 500 },
  },
  content: {
    content_ready:   { min: 0,   max: 0   },
    partial_content: { min: 150, max: 350 },
    no_content:      { min: 300, max: 700 },
    unsure:          { min: 200, max: 450 },
  },
  features: {
    contact_form:    { min: 0,   max: 50  },
    booking:         { min: 200, max: 500 },
    payments:        { min: 300, max: 800 },
    blog:            { min: 150, max: 400 },
    seo_basic:       { min: 200, max: 500 },
    multilingual:    { min: 300, max: 800 },
    crm_integration: { min: 250, max: 600 },
    none:            { min: 0,   max: 0   },
  },
  existingSite: {
    no_site:  { min: 0,   max: 0   },
    redesign: { min: 150, max: 400 },
    unsure:   { min: 0,   max: 0   },
  },
  improvements: { min: 350, max: 900 },
  urgentMultiplier: 1.2,
  flexibleMaxMultiplier: 0.95,
  minAbsolute: 350,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function roundTo50(n: number): number {
  return Math.round(n / 50) * 50
}

// ─── BG Calculate ─────────────────────────────────────────────────────────────

export function calculateBgEstimate(answers: BgAnswers): EstimateResult {
  const cfg = BG_PRICING
  const flags: string[] = []
  const warnings: string[] = []
  const features = answers.features ?? []

  // Special case: improvements only (no complex features)
  if (answers.existingSite === 'improvements') {
    const hasComplex = features.some(f => ['booking', 'payments', 'multilingual'].includes(f))
    if (!hasComplex) {
      let { min, max } = cfg.improvements
      features.forEach(f => {
        const adj = (cfg.features as any)[f]
        if (adj) { min += adj.min; max += adj.max }
      })
      return {
        minPrice: roundTo50(Math.max(min, cfg.minAbsolute)),
        maxPrice: roundTo50(max),
        recommendedType: 'Подобрения на съществуващ сайт',
        explanation: 'Тъй като вече имаш сайт и търсиш само конкретни подобрения, диапазонът е по-нисък.',
        flags: ['improvements_only'],
        warnings,
      }
    }
  }

  const base = cfg.basePrices[answers.siteType ?? 'unsure']
  let min = base.min
  let max = base.max

  const pAdj = cfg.pages[answers.pages ?? 'unsure']
  min += pAdj.min; max += pAdj.max

  const cAdj = cfg.content[answers.content ?? 'unsure']
  min += cAdj.min; max += cAdj.max

  features.forEach(f => {
    const fAdj = (cfg.features as any)[f]
    if (fAdj) { min += fAdj.min; max += fAdj.max }
  })

  if (answers.existingSite === 'redesign') {
    min += cfg.existingSite.redesign.min
    max += cfg.existingSite.redesign.max
  }

  if (answers.timeline === 'urgent') {
    min = Math.round(min * cfg.urgentMultiplier)
    max = Math.round(max * cfg.urgentMultiplier)
    flags.push('urgent_timeline')
  } else if (answers.timeline === 'flexible') {
    max = Math.round(max * cfg.flexibleMaxMultiplier)
  }

  // Special rules
  if (features.includes('payments') && answers.siteType === 'ecommerce') {
    min = Math.max(min, 1200)
  }
  if (features.includes('multilingual') && features.includes('seo_basic') && answers.pages === 'five_ten') {
    max = Math.max(max, 1800)
  }

  // Budget warnings
  if (answers.budget === 'under_300') {
    if (min > 500) warnings.push('budget_too_low')
    if (answers.siteType === 'ecommerce') warnings.push('ecommerce_budget_mismatch')
  }

  // Flags
  if (features.includes('booking')) flags.push('booking_feature')
  if (answers.content === 'no_content') flags.push('content_needed')

  min = roundTo50(Math.max(min, cfg.minAbsolute))
  max = roundTo50(Math.max(max, min + 100))

  const typeMap: Record<string, string> = {
    landing_page: 'Landing page',
    business_site: 'Персонализиран сайт за бизнес',
    ecommerce: 'Онлайн магазин',
    unsure: 'Персонализиран сайт за бизнес',
  }

  const explanationMap: Record<string, string> = {
    landing_page: 'Изглежда, че за момента най-логичният вариант е landing page — една силна страница, която представя конкретна услуга и води хората към запитване.',
    business_site: 'Най-логичният вариант е персонализиран сайт за бизнес — с ясна структура, бързо зареждане и страници, които помагат на хората да се свържат с теб.',
    ecommerce: 'Твоят проект прилича повече на онлайн магазин — продуктова система, количка, плащания и управление на поръчки.',
    unsure: 'Ще разберем заедно на базата на разговор — диапазонът е ориентировъчен.',
  }

  return {
    minPrice: min,
    maxPrice: max,
    recommendedType: typeMap[answers.siteType ?? 'unsure'],
    explanation: explanationMap[answers.siteType ?? 'unsure'],
    flags,
    warnings,
  }
}

// ─── EN Calculate ─────────────────────────────────────────────────────────────

export function calculateEnEstimate(answers: EnAnswers): EstimateResult {
  const cfg = EN_PRICING
  const flags: string[] = []
  const warnings: string[] = []
  const features = answers.features ?? []

  if (answers.existingSite === 'improvements') {
    const hasComplex = features.some(f => ['booking', 'payments', 'multilingual', 'crm_integration'].includes(f))
    if (!hasComplex) {
      let { min, max } = cfg.improvements
      features.forEach(f => {
        const adj = (cfg.features as any)[f]
        if (adj) { min += adj.min; max += adj.max }
      })
      return {
        minPrice: roundTo50(Math.max(min, cfg.minAbsolute)),
        maxPrice: roundTo50(max),
        recommendedType: 'Website improvements',
        explanation: "Since you already have a site and are looking for specific improvements, the range is more focused.",
        flags: ['improvements_only'],
        warnings,
      }
    }
  }

  const base = cfg.basePrices[answers.siteType ?? 'unsure']
  let min = base.min
  let max = base.max

  const pAdj = cfg.pages[answers.pages ?? 'unsure']
  min += pAdj.min; max += pAdj.max

  const cAdj = cfg.content[answers.content ?? 'unsure']
  min += cAdj.min; max += cAdj.max

  features.forEach(f => {
    const fAdj = (cfg.features as any)[f]
    if (fAdj) { min += fAdj.min; max += fAdj.max }
  })

  if (answers.existingSite === 'redesign') {
    min += cfg.existingSite.redesign.min
    max += cfg.existingSite.redesign.max
  }

  if (answers.timeline === 'urgent') {
    min = Math.round(min * cfg.urgentMultiplier)
    max = Math.round(max * cfg.urgentMultiplier)
    flags.push('urgent_timeline')
  } else if (answers.timeline === 'flexible') {
    max = Math.round(max * cfg.flexibleMaxMultiplier)
  }

  if (features.includes('payments') && answers.siteType === 'ecommerce') {
    min = Math.max(min, 1500)
  }
  if (features.includes('multilingual') && features.includes('seo_basic') && answers.pages === 'five_ten') {
    max = Math.max(max, 2200)
  }

  if (answers.budget === 'under_500') {
    if (min > 700) warnings.push('budget_too_low')
    if (answers.siteType === 'ecommerce') warnings.push('ecommerce_budget_mismatch')
  }

  if (features.includes('booking')) flags.push('booking_feature')
  if (answers.content === 'no_content') flags.push('content_needed')

  min = roundTo50(Math.max(min, cfg.minAbsolute))
  max = roundTo50(Math.max(max, min + 150))

  const typeMap: Record<string, string> = {
    landing_page: 'Landing page',
    business_site: 'Custom business website',
    ecommerce: 'E-commerce store',
    unsure: 'Custom business website',
  }

  const explanationMap: Record<string, string> = {
    landing_page: "A focused landing page seems like the right fit — one strong page built around a single offer that drives people to take action.",
    business_site: "A custom business website makes the most sense — clear structure, fast loading, and pages designed to turn visitors into enquiries.",
    ecommerce: "Your project looks like an e-commerce store — product listings, cart, payments, and order management.",
    unsure: "We'll figure out the best fit together on a call — this range is a starting point.",
  }

  return {
    minPrice: min,
    maxPrice: max,
    recommendedType: typeMap[answers.siteType ?? 'unsure'],
    explanation: explanationMap[answers.siteType ?? 'unsure'],
    flags,
    warnings,
  }
}
