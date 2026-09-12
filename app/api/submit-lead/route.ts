import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { rateLimit, getClientIp, maybeSweep } from '../../../lib/rate-limit'

const TO_EMAIL = 'goshoo429@gmail.com'

// Max 5 submissions per minute per IP — generous for a real user, throttles abuse.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

const leadSchema = z.object({
  answers: z.record(z.unknown()).default({}),
  lead: z.object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(50).optional().or(z.literal('')),
    company: z.string().trim().max(200).optional().or(z.literal('')),
  }),
  result: z.object({
    minPrice: z.union([z.number(), z.string()]),
    maxPrice: z.union([z.number(), z.string()]),
    recommendedType: z.string().max(200).optional().default('—'),
  }),
  lang: z.string().max(8).optional(),
})

const KEY_LABELS: Record<string, string> = {
  siteType:          'Тип сайт',
  pages:             'Брой страници',
  features:          'Функции',
  budget:            'Бюджет',
  businessType:      'Тип бизнес',
  existingSite:      'Съществуващ сайт',
  content:           'Съдържание',
  timeline:          'Срок',
  industry:          'Индустрия',
  businessTypeOther: 'Тип бизнес (друго)',
  industryOther:     'Индустрия (друго)',
}

const VALUE_LABELS: Record<string, string> = {
  // siteType
  business_site: 'Представителен сайт (фирмен)',
  landing_page:  'Лендинг страница',
  ecommerce:     'Онлайн магазин',
  blog:          'Блог',
  unsure:        'Не е сигурен',
  // pages
  one_page:  '1 страница',
  two_five:  '2–5 страници',
  five_ten:  '5–10 страници',
  ten_plus:  '10+ страници',
  // features
  payments:      'Онлайн плащания',
  booking:       'Резервации / записване',
  user_profiles: 'Потребителски профили',
  multilingual:  'Многоезичност',
  integrations:  'Интеграции (ERP, CRM и др.)',
  none:          'Нищо специално',
  // budget
  under_500_lv:  'До 500€',
  '500_1500_lv': '500–1500€',
  '1500_3000_lv':'1500–3000€',
  '3000_plus_lv':'3000€+',
  want_quote:    'Искам оферта',
  // EN budget
  under_500:   'Under $500',
  '500_1500':  '$500–1,500',
  '1500_3000': '$1,500–3,000',
  '3000_plus': '$3,000+',
  // existingSite
  no_site:      'Нов сайт',
  redesign:     'Редизайн',
  improvements: 'Подобрения',
  // timeline
  urgent:   'Спешно',
  normal:   'Нормално',
  flexible: 'Гъвкаво',
  // content
  content_ready:   'Готово съдържание',
  partial_content: 'Частично съдържание',
  no_content:      'Без съдържание',
}

// Escape user-supplied text before it lands in the notification email's HTML,
// so a crafted name/company/answer can't inject markup into the message.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// System stack only — Gmail/Outlook strip <style> blocks and web fonts, so the
// safe path is inline styles with fonts every OS already ships.
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

// A full-width, tappable mailto:/tel: button. Stacked (one per row) rather than
// side-by-side — a 320px phone screen can't reliably fit two inline buttons
// once a real email address is in there.
function actionButton(href: string, label: string, value: string): string {
  return `<tr><td style="padding:0 0 10px"><a href="${href}" style="display:block;background:#2d232e;color:#ffffff;text-decoration:none;font-family:${FONT};font-size:15px;font-weight:600;padding:14px 18px;border-radius:8px;word-break:break-word">${escapeHtml(
    label
  )}: ${escapeHtml(value)}</a></td></tr>`
}

// tel: only tolerates digits and a leading +; strip the spaces/parens/dashes a
// person types so tapping the button actually dials instead of silently no-op-ing.
function telHref(phone: string): string {
  return `tel:${escapeHtml(phone.replace(/[^0-9+]/g, ''))}`
}

// Subject lines are an email header, not HTML — escapeHtml doesn't apply here,
// but a stray newline could still smuggle in extra headers, so flatten it.
function subjectSafe(s: string): string {
  return s.replace(/[\r\n]+/g, ' ').trim()
}

function translateValue(v: unknown): string {
  if (Array.isArray(v)) return v.map(item => VALUE_LABELS[item] ?? item).join(', ')
  const s = String(v ?? '—')
  return VALUE_LABELS[s] ?? s
}

type AnswerRow = { label: string; value: string }

// Splits the raw answers object into picked options (compact, scannable rows)
// vs. hand-typed text (the "...Other" fields from an "other, please specify"
// input) — the latter is the customer's own words and deserves the same
// reading room as the contact form's message, not a cramped table cell.
function collectAnswers(answers: Record<string, unknown>): { structured: AnswerRow[]; freeText: AnswerRow[] } {
  const structured: AnswerRow[] = []
  const freeText: AnswerRow[] = []
  for (const [k, v] of Object.entries(answers)) {
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) continue
    const value = translateValue(v)
    if (!value.trim()) continue
    const label = KEY_LABELS[k] ?? k
    if (k.endsWith('Other')) freeText.push({ label, value })
    else structured.push({ label, value })
  }
  return { structured, freeText }
}

export async function POST(req: NextRequest) {
  // Rate limit before doing any work (parsing, sending email).
  maybeSweep()
  const ip = getClientIp(req)
  const limit = rateLimit(`submit-lead:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: 'Твърде много заявки. Опитайте отново след малко.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    )
  }

  // Validate input — malformed payloads get a clean 400, not a 500.
  let data: z.infer<typeof leadSchema>
  try {
    data = leadSchema.parse(await req.json())
  } catch {
    return NextResponse.json({ ok: false, error: 'Невалидни данни' }, { status: 400 })
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[submit-lead] RESEND_API_KEY not set')
      return NextResponse.json({ ok: false, error: 'Имейл услугата не е конфигурирана' }, { status: 503 })
    }
    const resend = new Resend(apiKey)
    const { answers, lead, result, lang } = data
    const isBG = lang === 'BG'
    const sentAt = new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })

    const { structured, freeText } = collectAnswers(answers as Record<string, unknown>)

    const minPriceStr = String(result.minPrice)
    const maxPriceStr = String(result.maxPrice)

    const companyRow = lead.company
      ? `<tr><td style="padding:0 24px 4px"><p style="margin:0;font-family:${FONT};font-size:13px;color:#8a8a8a">Компания</p><p style="margin:2px 0 0;font-family:${FONT};font-size:15px;color:#1a1a1a">${escapeHtml(
          lead.company
        )}</p></td></tr>`
      : ''

    // Each hand-typed answer gets the same high-contrast, generously-spaced
    // panel as the contact form's message — it's the customer's own words.
    const freeTextHtml = freeText
      .map(
        ({ label, value }) =>
          `<tr><td style="padding:16px 24px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f3;border:1px solid #ece8dd;border-radius:10px"><tr><td style="padding:18px 20px"><p style="margin:0 0 8px;font-family:${FONT};font-size:12px;font-weight:700;color:#8a8377;text-transform:uppercase;letter-spacing:.04em">${escapeHtml(
            label
          )}</p><p style="margin:0;font-family:${FONT};font-size:16px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap">${escapeHtml(
            value
          )}</p></td></tr></table></td></tr>`
      )
      .join('')

    // Picked options stay compact — they're metadata, secondary to the free text above.
    const structuredRowsHtml = structured
      .map(
        ({ label, value }, i) =>
          `<tr><td style="padding:9px 0;border-top:${
            i === 0 ? 'none' : '1px solid #ece8dd'
          };font-family:${FONT};font-size:13px;color:#8a8a8a;white-space:nowrap;vertical-align:top">${escapeHtml(
            label
          )}</td><td style="padding:9px 0 9px 14px;border-top:${
            i === 0 ? 'none' : '1px solid #ece8dd'
          };font-family:${FONT};font-size:14px;color:#2d2d2d">${escapeHtml(value)}</td></tr>`
      )
      .join('')

    const structuredSection = structuredRowsHtml
      ? `<tr><td style="padding:20px 24px 24px"><p style="margin:0 0 8px;font-family:${FONT};font-size:12px;font-weight:700;color:#8a8377;text-transform:uppercase;letter-spacing:.04em">Отговори</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${structuredRowsHtml}</table></td></tr>`
      : ''

    const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f1ec;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="padding:28px 24px 20px">
<p style="margin:0 0 6px;font-family:${FONT};font-size:12px;color:#9a9a9a;letter-spacing:.02em">${escapeHtml(
      sentAt
    )} · Калкулатор${isBG ? '' : ' (EN)'}</p>
<h1 style="margin:0 0 14px;font-family:${FONT};font-size:24px;line-height:1.3;color:#1a1a1a;font-weight:800">${escapeHtml(
      lead.name
    )}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="background:#2d232e;border-radius:8px">
<tr><td style="padding:10px 16px">
<p style="margin:0;font-family:${FONT};font-size:12px;color:#c9c2cc">Оценка</p>
<p style="margin:2px 0 0;font-family:${FONT};font-size:17px;font-weight:700;color:#ffffff">${escapeHtml(
      minPriceStr
    )}–${escapeHtml(maxPriceStr)} EUR <span style="font-weight:400;color:#c9c2cc;font-size:13px">· ${escapeHtml(
      result.recommendedType
    )}</span></p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 24px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${actionButton(`mailto:${escapeHtml(lead.email)}`, 'Имейл', lead.email)}
${lead.phone ? actionButton(telHref(lead.phone), 'Телефон', lead.phone) : ''}
</table>
</td></tr>
${companyRow}
${freeTextHtml}
${structuredSection}
</table>
</td></tr>
</table>`

    // Plain-text alternative for text-only clients — not escaped, since it isn't HTML.
    const textLines = [
      `Ново запитване от калкулатора${isBG ? '' : ' (EN)'}`,
      sentAt,
      '',
      `Оценка: ${minPriceStr}–${maxPriceStr} EUR`,
      `Тип проект: ${result.recommendedType}`,
      '',
      `Име: ${lead.name}`,
      `Имейл: ${lead.email}`,
    ]
    if (lead.phone) textLines.push(`Телефон: ${lead.phone}`)
    if (lead.company) textLines.push(`Компания: ${lead.company}`)
    if (freeText.length) {
      textLines.push('')
      for (const { label, value } of freeText) textLines.push(`${label}:`, value, '')
    }
    if (structured.length) {
      textLines.push('Отговори:')
      for (const { label, value } of structured) textLines.push(`- ${label}: ${value}`)
    }
    const text = textLines.join('\n')

    const { error } = await resend.emails.send({
      from: 'KARCHX Калкулатор <onboarding@resend.dev>',
      to: TO_EMAIL,
      subject: `${subjectSafe(lead.name)} — оферта ${subjectSafe(minPriceStr)}–${subjectSafe(maxPriceStr)}€`,
      html,
      text,
      replyTo: lead.email,
    })

    if (error) {
      console.error('[submit-lead] resend error', error)
      return NextResponse.json({ ok: false, error: 'Изпращането се провали' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[submit-lead]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
