import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = 'goshoo429@gmail.com'

function label(key: string): string {
  const map: Record<string, string> = {
    siteType: 'Тип сайт', businessType: 'Тип бизнес', existingSite: 'Съществуващ сайт',
    pages: 'Брой страници', content: 'Съдържание', features: 'Функции',
    timeline: 'Срок', budget: 'Бюджет', industry: 'Индустрия',
    businessTypeOther: 'Тип бизнес (друго)', industryOther: 'Индустрия (друго)',
  }
  return map[key] ?? key
}

function row(k: string, v: unknown): string {
  const val = Array.isArray(v) ? v.join(', ') : String(v ?? '—')
  return `<tr><td style="padding:6px 12px;color:#888;font-size:13px;white-space:nowrap">${label(k)}</td><td style="padding:6px 12px;font-size:13px;color:#2d232e">${val}</td></tr>`
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { answers, lead, result, lang } = await req.json()
    const isBG = lang === 'BG'

    const answersHtml = Object.entries(answers as Record<string, unknown>)
      .map(([k, v]) => row(k, v))
      .join('')

    const html = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2d232e">
  <h2 style="margin:0 0 4px">Ново запитване от калкулатора${isBG ? '' : ' (EN)'}</h2>
  <p style="color:#888;margin:0 0 24px;font-size:13px">${new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })}</p>

  <h3 style="margin:0 0 8px;font-size:15px">Контакт</h3>
  <table style="width:100%;border-collapse:collapse;background:#f8f7f2;border-radius:8px;overflow:hidden;margin-bottom:24px">
    ${row('Име', lead.name)}
    ${row('Имейл', lead.email)}
    ${lead.phone ? row('Телефон', lead.phone) : ''}
    ${lead.company ? row('Компания', lead.company) : ''}
  </table>

  <h3 style="margin:0 0 8px;font-size:15px">Оценка</h3>
  <table style="width:100%;border-collapse:collapse;background:#f8f7f2;border-radius:8px;overflow:hidden;margin-bottom:24px">
    ${row('Диапазон', `${result.minPrice} – ${result.maxPrice} EUR`)}
    ${row('Тип проект', result.recommendedType)}
  </table>

  <h3 style="margin:0 0 8px;font-size:15px">Отговори</h3>
  <table style="width:100%;border-collapse:collapse;background:#f8f7f2;border-radius:8px;overflow:hidden">
    ${answersHtml}
  </table>
</div>`

    await resend.emails.send({
      from: 'Karchev Калкулатор <onboarding@resend.dev>',
      to: TO_EMAIL,
      subject: `Ново запитване — ${lead.name} (${result.minPrice}–${result.maxPrice} EUR)`,
      html,
      replyTo: lead.email,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[submit-lead]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
