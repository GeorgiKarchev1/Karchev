/**
 * Hero copy for the five variants, written per language rather than translated.
 * The offer itself is fixed (250 EUR, two weeks, first three clients, keep
 * working free until the agreed goals are met) — only the framing changes.
 *
 * Framing follows Problem → Agitate → Solution: the audience knows it loses
 * enquiries but does not yet know that this is a fixable process, so leading
 * with the problem outperforms leading with the promise.
 */

export type HeroVariantCopy = {
  /** Manual line breaks, placed where the thought breaks, per language. */
  headline: string[]
  sub: string
  cta: string
  proof: string
  callNote: string
}

export type HeroCopy = {
  price: string
  duration: string
  payment: string
  availability: string
  detailsLink: string
  v1: HeroVariantCopy
  v2: HeroVariantCopy & { artifactTitle: string; checks: string[]; checksCount: string; checksLabel: string }
  v3: HeroVariantCopy & { fieldLabel: string; fieldPlaceholder: string; priceLine: string }
  v4: Omit<HeroVariantCopy, 'proof'> & { amount: string; terms: string; continuation: string }
  v5: HeroVariantCopy & {
    beforeLabel: string
    afterLabel: string
    before: string[]
    after: string[]
    bridge: string
  }
}

export const heroCopy: { bg: HeroCopy; en: HeroCopy } = {
  bg: {
    price: '250',
    duration: 'Две седмици работа',
    payment: 'Еднократно, предварително',
    availability: 'За първите 3 клиента',
    detailsLink: 'Какво включва',

    v1: {
      headline: ['Нито едно запитване', 'не се губи.'],
      sub: 'За две седмици подреждам офертата, сайта и начина, по който отговаряте на клиент. Целите се записват писмено, преди да платите.',
      cta: 'Запазете безплатен разговор',
      proof: 'Ако целите не са постигнати за две седмици, продължаваме безплатно, докато ги постигнем.',
      callNote: 'Безплатно · до 30 минути · без ангажимент',
    },

    v2: {
      headline: ['Клиентите Ви спират', 'на 12 места.'],
      sub: 'Минаваме през всяко от тях, поправяме най-скъпите и Ви оставям процес, който екипът Ви може да използва без мен.',
      cta: 'Започнете с безплатен разговор',
      proof: '250 € еднократно · целите се записват преди плащането',
      callNote: 'Безплатно · до 30 минути · без ангажимент',
      artifactTitle: 'Къде се губят запитванията',
      checksCount: '12',
      checksLabel: 'проверки по пътя до клиента',
      checks: [
        'Разбира ли се от сайта за кого е услугата',
        'Колко време минава до първия отговор',
        'Има ли кой да поеме запитването извън работно време',
        'Стига ли всяка оферта до последващо свързване',
      ],
    },

    v3: {
      headline: ['Вижте къде спира', 'клиентът Ви.'],
      sub: 'Оставете линк към сайта си. В безплатния разговор минаваме по пътя на клиента и Ви казвам кои три неща губят най-много запитвания.',
      cta: 'Заявете безплатен преглед',
      proof: 'Отговарям лично, обикновено до един работен ден.',
      callNote: 'Безплатно · до 30 минути · без ангажимент',
      fieldLabel: 'Линк към сайта Ви',
      fieldPlaceholder: 'primer.bg',
      priceLine: 'Ако решим да работим заедно: 250 € за две седмици, за първите 3 клиента.',
    },

    v4: {
      headline: ['Започни да печелиш повече.', 'Подобри бизнеса си.'],
      sub: 'Избираш едно нещо, което ще донесе най-много на бизнеса ти. Записваме го писмено, преди да платиш. После две седмици работим по него.',
      cta: 'Запази безплатен разговор',
      callNote: '30 минути. Без ангажимент. Ако не мога да ти помогна, ще ти го кажа още в разговора.',
      amount: '250',
      terms: 'и работим две седмици',
      continuation: 'Ако постигнем резултата, продължаваме нататък.',
    },

    v5: {
      headline: ['Ето какво се променя', 'за две седмици.'],
      sub: 'Едно и също запитване, преди и след подредения процес. Нищо в примера не изисква нов сайт или нов екип.',
      cta: 'Запазете безплатен разговор',
      proof: 'Целите се записват писмено преди плащането.',
      callNote: 'Безплатно · до 30 минути · без ангажимент',
      beforeLabel: 'Сега',
      afterLabel: 'След две седмици',
      before: [
        'Запитване в Messenger в 21:40',
        'Отговор след два дни',
        'Офертата остава без последващо свързване',
        'Клиентът вече е купил другаде',
      ],
      after: [
        'Известие веднага щом дойде запитване',
        'Готов текст за първи отговор',
        'Всяка оферта има етап и отговорник',
        'Виждате на кого още дължите отговор',
      ],
      bridge: 'Две седмици · 250 €',
    },
  },

  en: {
    price: '250',
    duration: 'Two weeks of work',
    payment: 'One-off fee, paid upfront',
    availability: 'For the first 3 clients',
    detailsLink: 'What is included',

    v1: {
      headline: ['Not one enquiry', 'goes missing.'],
      sub: 'In two weeks I put your offer, your site and the way you answer a customer in order. The goals are agreed in writing before you pay.',
      cta: 'Book a free call',
      proof: 'If the goals are not met in two weeks, we keep working for free until they are.',
      callNote: 'Free · up to 30 minutes · no commitment',
    },

    v2: {
      headline: ['Customers drop off', 'in 12 places.'],
      sub: 'We walk through every one of them, fix the costly ones, and leave you a process your team can run without me.',
      cta: 'Start with a free call',
      proof: '250 € one-off · goals agreed in writing before payment',
      callNote: 'Free · up to 30 minutes · no commitment',
      artifactTitle: 'Where enquiries get lost',
      checksCount: '12',
      checksLabel: 'checks on the path to a customer',
      checks: [
        'Does the site make clear who the service is for',
        'How long until the first reply goes out',
        'Does anyone pick up enquiries after hours',
        'Does every quote get a follow up',
      ],
    },

    v3: {
      headline: ['See where your', 'customer stops.'],
      sub: 'Leave a link to your site. On the free call we walk the customer path together and I name the three things losing you the most enquiries.',
      cta: 'Request a free review',
      proof: 'I reply personally, usually within one working day.',
      callNote: 'Free · up to 30 minutes · no commitment',
      fieldLabel: 'Link to your site',
      fieldPlaceholder: 'example.com',
      priceLine: 'If we decide to work together: 250 € for two weeks, for the first 3 clients.',
    },

    v4: {
      headline: ['Start earning more.', 'Improve your business.'],
      sub: 'You pick the one thing that will do the most for your business. We put it in writing before you pay. Then I work on it for two weeks.',
      cta: 'Book a free call',
      callNote: '30 minutes. No commitment. If I cannot help you, I will say so on the call.',
      amount: '250',
      terms: 'and we work for two weeks',
      continuation: 'If we reach the result, we carry on from there.',
    },

    v5: {
      headline: ['This is what changes', 'in two weeks.'],
      sub: 'The same enquiry, before and after the process is in order. Nothing in the example needs a new site or a new team.',
      cta: 'Book a free call',
      proof: 'Goals are agreed in writing before payment.',
      callNote: 'Free · up to 30 minutes · no commitment',
      beforeLabel: 'Today',
      afterLabel: 'After two weeks',
      before: [
        'Enquiry arrives at 21:40',
        'Reply goes out two days later',
        'The quote never gets a follow up',
        'The customer has already bought elsewhere',
      ],
      after: [
        'You are notified the moment it arrives',
        'A ready first reply to send',
        'Every quote has a stage and an owner',
        'You can see who is still waiting',
      ],
      bridge: 'Two weeks · 250 €',
    },
  },
}
