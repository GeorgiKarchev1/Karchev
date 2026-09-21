import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { rateLimit, getClientIp, maybeSweep } from '../../../lib/rate-limit'

export const runtime = 'nodejs'

// Where enquiries land. Resend's shared `onboarding@resend.dev` sender can only
// deliver to the address the Resend account was registered with, so this must
// stay goshoo429@gmail.com until a domain is verified at resend.com/domains.
// Verifying karchx.com (free) is what unlocks a custom From and any recipient.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'goshoo429@gmail.com'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'KARCHX <onboarding@resend.dev>'

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  preferredTime: z.string().trim().max(200).optional().or(z.literal('')),
  service: z.string().trim().max(500).optional().or(z.literal('')),
  message: z.string().trim().max(5000).optional().or(z.literal('')),
  lang: z.enum(['BG', 'EN']).optional(),
  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Accept any value here — rejecting it at the schema would answer 400 and
  // tell the bot to try a different shape. It is handled silently below.
  website: z.string().max(2000).optional(),
})

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

export async function POST(req: NextRequest) {
  maybeSweep()
  const ip = getClientIp(req)
  const limit = rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    )
  }

  let data: z.infer<typeof contactSchema>
  try {
    data = contactSchema.parse(await req.json())
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  // Silently accept bot submissions so the bot doesn't learn to retry.
  if (data.website) return NextResponse.json({ ok: true })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not set')
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 503 })
  }

  const { name, email, phone, service, preferredTime, message, lang } = data
  const sentAt = new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })

  // The message is the whole point of the form — it gets its own high-contrast,
  // generously-spaced panel so it reads as the headline, not another table row.
  const messagePanel = message
    ? `<tr><td style="padding:20px 24px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f3;border:1px solid #ece8dd;border-radius:10px"><tr><td style="padding:18px 20px"><p style="margin:0 0 8px;font-family:${FONT};font-size:12px;font-weight:700;color:#8a8377;text-transform:uppercase;letter-spacing:.04em">Съобщение</p><p style="margin:0;font-family:${FONT};font-size:16px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap">${escapeHtml(
        message
      )}</p></td></tr></table></td></tr>`
    : ''

  const servicePanel = service
    ? `<tr><td style="padding:0 24px 4px"><p style="margin:0;font-family:${FONT};font-size:13px;color:#8a8a8a">Основен проблем за решаване</p><p style="margin:2px 0 0;font-family:${FONT};font-size:15px;color:#1a1a1a">${escapeHtml(
        service
      )}</p></td></tr>`
    : ''

  const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f1ec;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="padding:28px 24px 20px">
<p style="margin:0 0 6px;font-family:${FONT};font-size:12px;color:#9a9a9a;letter-spacing:.02em">${escapeHtml(
    sentAt
  )}${lang ? ` · ${escapeHtml(lang)}` : ''} · Контактна форма</p>
<h1 style="margin:0;font-family:${FONT};font-size:24px;line-height:1.3;color:#1a1a1a;font-weight:800">${escapeHtml(
    name
  )}</h1>
</td></tr>
<tr><td style="padding:0 24px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${actionButton(`mailto:${escapeHtml(email)}`, 'Имейл', email)}
${phone ? actionButton(telHref(phone), 'Телефон', phone) : ''}
</table>
</td></tr>
${servicePanel}
${preferredTime ? `<tr><td style="padding:8px 24px"><p style="font-family:${FONT};font-size:14px">Удобно време (за потвърждение): ${escapeHtml(preferredTime)}</p></td></tr>` : ''}
${messagePanel}
<tr><td style="padding:0 24px 24px">
<p style="margin:0;font-family:${FONT};font-size:12px;color:#b0b0b0">Отговорете директно на този имейл, за да пишете на ${escapeHtml(
    name
  )}.</p>
</td></tr>
</table>
</td></tr>
</table>`

  // Plain-text alternative for text-only clients — not escaped, since it isn't HTML.
  const textLines = [
    'Ново запитване от контактната форма',
    `${sentAt}${lang ? ` · ${lang}` : ''}`,
    '',
    `Име: ${name}`,
    `Имейл: ${email}`,
  ]
  if (phone) textLines.push(`Телефон: ${phone}`)
  if (preferredTime) textLines.push(`Удобно време (за потвърждение): ${preferredTime}`)
  if (service) textLines.push(`Основен проблем за решаване: ${service}`)
  if (message) textLines.push('', 'Съобщение:', message)
  textLines.push('', `Отговорете директно на този имейл, за да пишете на ${name}.`)
  const text = textLines.join('\n')

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `${subjectSafe(name)} — ново запитване от сайта`,
      html,
      text,
      replyTo: email,
    })

    if (error) {
      console.error('[contact] resend error', error)
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 })
  }
}
