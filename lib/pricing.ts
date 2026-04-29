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
    landing_page:  { min: 180,  max: 380  },
    business_site: { min: 320,  max: 680  },
    ecommerce:     { min: 550,  max: 1500 },
    unsure:        { min: 280,  max: 600  },
  },
  pages: {
    one_page:   { min: 0,  max: 0   },
    three_five: { min: 70, max: 150 },
    five_ten:   { min: 150, max: 350 },
    unsure:     { min: 80, max: 180 },
  },
  content: {
    content_ready:   { min: 0,   max: 0   },
    partial_content: { min: 50,  max: 150 },
    no_content:      { min: 100, max: 300 },
    unsure:          { min: 60,  max: 180 },
  },
  features: {
    contact_form: { min: 0,   max: 0   },
    booking:      { min: 80,  max: 200 },
    payments:     { min: 120, max: 350 },
    blog:         { min: 50,  max: 120 },
    seo_basic:    { min: 60,  max: 150 },
    multilingual: { min: 120, max: 300 },
    none:         { min: 0,   max: 0   },
  },
  existingSite: {
    no_site:  { min: 0,  max: 0   },
    redesign: { min: 60, max: 180 },
    unsure:   { min: 0,  max: 0   },
  },
  improvements: { min: 120, max: 400 },
  urgentMultiplier: 1.2,
  flexibleMaxMultiplier: 0.95,
  minAbsolute: 150,
}

// ─── EN Pricing Config (edit here) ────────────────────────────────────────────

export const EN_PRICING = {
  basePrices: {
    landing_page:  { min: 200,  max: 420  },
    business_site: { min: 350,  max: 750  },
    ecommerce:     { min: 600,  max: 1650 },
    unsure:        { min: 300,  max: 650  },
  },
  pages: {
    one_page:   { min: 0,   max: 0   },
    three_five: { min: 80,  max: 170 },
    five_ten:   { min: 170, max: 380 },
    unsure:     { min: 90,  max: 200 },
  },
  content: {
    content_ready:   { min: 0,   max: 0   },
    partial_content: { min: 60,  max: 170 },
    no_content:      { min: 120, max: 330 },
    unsure:          { min: 70,  max: 200 },
  },
  features: {
    contact_form:    { min: 0,   max: 0   },
    booking:         { min: 90,  max: 220 },
    payments:        { min: 130, max: 380 },
    blog:            { min: 60,  max: 130 },
    seo_basic:       { min: 70,  max: 170 },
    multilingual:    { min: 130, max: 330 },
    crm_integration: { min: 150, max: 350 },
    none:            { min: 0,   max: 0   },
  },
  existingSite: {
    no_site:  { min: 0,  max: 0   },
    redesign: { min: 70, max: 200 },
    unsure:   { min: 0,  max: 0   },
  },
  improvements: { min: 130, max: 450 },
  urgentMultiplier: 1.2,
  flexibleMaxMultiplier: 0.95,
  minAbsolute: 170,
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
    min = Math.max(min, 650)
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
    min = Math.max(min, 700)
  }
  if (features.includes('multilingual') && features.includes('seo_basic') && answers.pages === 'five_ten') {
    max = Math.max(max, 1500)
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
