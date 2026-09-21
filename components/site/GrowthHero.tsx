import Image from 'next/image'
import { ArrowUpRight, Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_HREF, PILOT_PRICE_EUR, bookingPath } from '@/lib/contact-info'

export type HeroVariant = 'split' | 'centered' | 'dark' | 'process' | 'portrait'
export const HERO_VARIANTS: HeroVariant[] = ['split', 'centered', 'dark', 'process', 'portrait']

const copy = {
  bg: {
    split: { lines: ['Повече клиенти.', 'По-малко хаос.'], intro: 'Подреждаме офертата, сайта и обработката на запитванията, за да може интересът към бизнеса Ви да стига до продажба.' },
    centered: { lines: ['Бизнесът Ви.', 'С ясна посока.'], intro: 'Свързваме офертата, сайта и продажбите в работещ процес. Започваме с конкретни цели и две седмици работа по тях.' },
    dark: { lines: ['Две седмици.', 'Конкретни промени.'], intro: 'Откриваме къде се губят запитванията и правим нужните промени в офертата, сайта и начина, по който отговаряте на клиентите.' },
    process: { lines: ['Имате интерес.', 'Превърнете го', 'в нови клиенти.'], intro: 'Когато офертата е ясна и всяко запитване има следваща стъпка, екипът Ви знае как да придвижи разговора към покупка.' },
    portrait: { lines: ['Да подредим бизнеса Ви.', 'Заедно.'], intro: 'Аз съм Георги Кърчев. Ще работя лично с Вас по офертата, сайта и запитванията, с ясни цели и конкретни промени.' },
    cta: 'Обсъдете бизнеса си', callNote: 'Безплатен разговор до 30 минути',
    priceLabel: 'за първите 3 клиента', duration: '2 седмици работа', payment: 'Еднократно. Плаща се предварително.',
    guaranteeTitle: 'Работим до постигане на целите.',
    guarantee: 'Ако след двете седмици договорените цели не са постигнати, продължаваме напълно безплатно, докато ги постигнем.',
    terms: 'Целите и начинът на измерване се уговарят писмено преди плащането.',
    scope: ['По-ясна оферта и сайт', 'Подредени запитвания', 'Последователно проследяване'],
    steps: [
      { title: 'Клиентът разбира офертата.', text: 'Ясни ползи и лесна следваща стъпка в сайта.' },
      { title: 'Получава отговор навреме.', text: 'Всяко запитване стига до точния човек.' },
      { title: 'Разговорът продължава.', text: 'Офертите имат следваща задача и отговорник.' },
    ],
    founder: 'Георги Кърчев', founderRole: 'Основател на KARCHX', details: 'Какво включва работата',
  },
  en: {
    split: { lines: ['More customers.', 'Less chaos.'], intro: 'We improve your offer, website and enquiry handling so interest in your business has a clear path towards a sale.' },
    centered: { lines: ['Your business.', 'With a clear direction.'], intro: 'Connect your offer, website and sales in a working process. Start with specific goals and two weeks of focused work.' },
    dark: { lines: ['Two weeks.', 'Concrete improvements.'], intro: 'Find where enquiries get stuck and make practical changes to your offer, website and customer responses.' },
    process: { lines: ['You have interest.', 'Turn it into', 'new customers.'], intro: 'With a clear offer and a next step for every enquiry, your team knows how to move the conversation towards a purchase.' },
    portrait: { lines: ['Let’s improve your business.', 'Together.'], intro: 'I’m Georgi Karchev. I work directly with you on your offer, website and enquiries, with clear goals and concrete changes.' },
    cta: 'Discuss your business', callNote: 'Free first call, up to 30 minutes',
    priceLabel: 'for the first 3 clients', duration: '2 weeks of work', payment: 'One-off fee. Paid in full upfront.',
    guaranteeTitle: 'We work until the goals are achieved.',
    guarantee: 'If the agreed goals are not achieved after two weeks, we continue working completely free until they are achieved.',
    terms: 'Goals and success measures are agreed in writing before payment.',
    scope: ['A clearer offer and website', 'Organised enquiries', 'Consistent follow-up'],
    steps: [
      { title: 'Customers understand the offer.', text: 'Clear benefits and an easy next step on your website.' },
      { title: 'They receive a timely reply.', text: 'Every enquiry reaches the right person.' },
      { title: 'The conversation continues.', text: 'Each proposal has a next action and an owner.' },
    ],
    founder: 'Georgi Karchev', founderRole: 'Founder of KARCHX', details: 'See what is included',
  },
}

/** No word masks: Cyrillic descenders and wrapped lines keep their full ink area. */
export default function GrowthHero({ bg = true, variant = 'split', preview = false }: { bg?: boolean; variant?: HeroVariant; preview?: boolean }) {
  const c = copy[bg ? 'bg' : 'en']
  const text = c[variant]
  const heading = <div className="kx-hero-copy"><h1 id="hero-title">{text.lines.map(line => <span key={line}>{line}{' '}</span>)}</h1><p className="kx-hero-intro">{text.intro}</p></div>
  const action = <div className="kx-hero-actions"><a className="kx-hero-action" href={bookingPath(bg)}>{c.cta}<ArrowUpRight size={22} aria-hidden="true" /></a><p>{c.callNote}</p><a className="kx-hero-phone" href={PHONE_HREF}><Phone size={17} aria-hidden="true" />{PHONE_DISPLAY}</a></div>
  const price = <div className="kx-hero-price"><p className="kx-hero-amount">{PILOT_PRICE_EUR}<span> €</span></p><div><p className="kx-hero-duration">{c.duration}</p><p className="kx-hero-payment">{c.payment}</p><p className="kx-hero-availability">{c.priceLabel}</p></div></div>
  const guarantee = <div className="kx-hero-guarantee"><h2>{c.guaranteeTitle}</h2><p>{c.guarantee}</p><small>{c.terms}</small></div>
  const scope = <ul className="kx-hero-scope">{c.scope.map(item => <li key={item}>{item}</li>)}</ul>
  const details = <a className="kx-hero-details" href={`${bg ? '/bg' : '/en'}#pricing`}>{c.details}<ArrowUpRight size={17} aria-hidden="true" /></a>

  return <section className={`kx-hero kx-hero-${variant}${preview ? ' kx-hero-preview' : ''}`} aria-labelledby="hero-title" id="demo">
    <div className="studio-wrap kx-hero-inner">
      {variant === 'split' && <><div className="kx-hero-lead">{heading}{action}</div><div className="kx-hero-offer">{price}{guarantee}{details}</div>{scope}</>}
      {variant === 'centered' && <>{heading}<div className="kx-hero-centered-offer">{price}{action}</div>{guarantee}{details}</>}
      {variant === 'dark' && <><div className="kx-hero-lead">{heading}{action}</div><div className="kx-hero-dark-offer">{price}{details}</div>{guarantee}{scope}</>}
      {variant === 'process' && <><div className="kx-hero-lead">{heading}{action}</div><div className="kx-hero-path"><ol>{c.steps.map((step, i) => <li key={step.title}><span aria-hidden="true">{i + 1}</span><div><h2>{step.title}</h2><p>{step.text}</p></div></li>)}</ol>{price}</div>{guarantee}{details}</>}
      {variant === 'portrait' && <><div className="kx-hero-lead">{heading}{price}{action}</div><figure className="kx-hero-person"><Image src="/img/azseriozen_optimized_1000.jpg" alt={bg ? 'Георги Кърчев, основател на KARCHX' : 'Georgi Karchev, founder of KARCHX'} fill priority sizes="(max-width: 900px) calc(100vw - 48px), 560px" /><figcaption><strong>{c.founder}</strong><span>{c.founderRole}</span></figcaption></figure>{guarantee}{details}</>}
    </div>
  </section>
}
