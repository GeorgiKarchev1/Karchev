import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = 'goshoo429@gmail.com'

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

function translateValue(v: unknown): string {
  if (Array.isArray(v)) return v.map(item => VALUE_LABELS[item] ?? item).join(', ')
  const s = String(v ?? '—')
  return VALUE_LABELS[s] ?? s
}

function row(k: string, v: unknown): string {
  const keyLabel = KEY_LABELS[k] ?? k
  const val = translateValue(v)
  return `<tr><td style="padding:6px 12px;color:#888;font-size:13px;white-space:nowrap">${keyLabel}</td><td style="padding:6px 12px;font-size:13px;color:#2d232e">${val}</td></tr>`
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
