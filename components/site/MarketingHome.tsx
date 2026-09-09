'use client'

import Image from 'next/image'
import { useEffect, type CSSProperties, type PointerEvent } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import { useLanguage } from '@/context/LanguageContext'
import { useAgentMotion } from '@/lib/agent-motion'

const booking = 'https://cal.com/georgi-karchev-3r9puz/30min'
const content = {
  bg: {
    title: 'Вашият AI агент.', titleSecond: 'По Вашите правила.',
    intro: 'Делегирайте запитвания, документи и рутинни задачи на агент, изграден с Вашата информация и свързан с инструментите Ви.',
    cta: 'Обсъдете Вашия агент', note: '30 минути. Безплатно и без задължения.',
    promises: ['Изцяло персонализиран', 'Свързан с Вашите инструменти', 'Изграденото остава Ваше'],
    differenceTitle: 'Изграден около Вас.', differenceSecond: 'До последния детайл.',
    differenceIntro: 'Първо разбирам как работите. След това изграждам агент, съобразен с конкретните Ви задачи, информация и нужди.',
    principles: [
      { title: 'Вашият контекст', text: 'Документи, знания и предпочитания. Вие определяте информацията, с която агентът ще работи.' },
      { title: 'Вашите инструменти', text: 'Имейл, CRM, таблици и приложения. Уточняваме нужните връзки спрямо Вашия начин на работа.' },
      { title: 'Вашите правила', text: 'Как да отговаря, какво да изпълнява и кога да Ви попита. Контролът е част от персонализацията.' },
    ],
    processTitle: 'От първия разговор', processSecond: 'до Вашия агент.',
    processIntro: 'Работим директно заедно. Всяка стъпка е съобразена с Вас.',
    steps: [
      { title: 'Разбирам как работите', text: 'Обсъждаме ежедневните Ви задачи, инструментите и какво искате да делегирате.' },
      { title: 'Определяме Вашата конфигурация', text: 'Уточняваме обхвата, достъпите, поведението и цената, преди да започне изграждането.' },
      { title: 'Изграждам и тестваме заедно', text: 'Пробвате агента с Ваши сценарии. Настройваме отговорите, действията и нужните одобрения.' },
      { title: 'Включваме го в ежедневието Ви', text: 'Предавам изграденото, показвам Ви как да го използвате и уточняваме поддръжката.' },
    ],
    aboutTitle: 'Личен подход.', aboutSecond: 'От човек до човек.',
    aboutText: 'Аз съм Георги Карчев. Ще работите директно с мен — от първия разговор до настройката на Вашия агент. Ще вникна в задачите Ви, ще изградя решението и ще го настроим заедно, така че да бъде полезно в реалната Ви работа.',
    role: 'Георги Карчев', roleDetail: 'Човекът зад KARCHX',
    faqTitle: 'Нека изясним детайлите.',
    faqs: [
      { q: 'Какво означава „персонализиран за мен“?', a: 'Определяме заедно задачите, източниците на информация, инструментите и правилата на Вашия агент. След това изграждам и настройвам конкретното решение. Обхватът зависи от Вашите нужди.' },
      { q: 'Трябва ли да разбирам от AI?', a: 'Не. Достатъчно е да ми разкажете как работите и какво Ви отнема време. Аз ще обясня възможностите и ограниченията и ще Ви покажа как да използвате агента.' },
      { q: 'С кои инструменти може да работи?', a: 'Проверяваме конкретните Ви инструменти още в началото. Възможностите зависят от достъпа, API-ите и правилата на системите. Уточняваме интеграциите преди изграждането.' },
      { q: 'Какъв контрол имам върху действията му?', a: 'Вие определяте кои действия могат да се изпълняват самостоятелно и кои изискват одобрение. Тестваме и как агентът предава към Вас задача, за която няма достатъчно информация.' },
      { q: 'Колко струва моят агент?', a: 'Цената е индивидуална, защото задачите и интеграциите са различни. След първия разговор получавате ясен обхват и конкретна оферта, преди да решите дали да започнем.' },
      { q: 'Кой притежава изграденото?', a: 'Вие. Кодът, настройките и интеграциите, които изграждам за Вас, остават Ваши. Разходите за външни инструменти и поддръжка се уточняват отделно.' },
    ],
  },
  en: {
    title: 'Your own AI agent.', titleSecond: 'Built on your terms.',
    intro: 'Delegate enquiries, documents and routine tasks to an agent built with your information and connected to the tools you use.',
    cta: 'Let’s discuss your agent', note: '30 minutes. Free, with no commitment.',
    promises: ['Fully personalised', 'Connected to your tools', 'Everything built stays yours'],
    differenceTitle: 'Built around you.', differenceSecond: 'Down to the details.',
    differenceIntro: 'First, I understand how you work. Then I build an agent around your specific tasks, information and needs.',
    principles: [
      { title: 'Your context', text: 'Documents, knowledge and preferences. You decide which information your agent works with.' },
      { title: 'Your tools', text: 'Email, CRM, spreadsheets and applications. We agree on the connections your workflow needs.' },
      { title: 'Your rules', text: 'How to respond, what to do and when to ask you. Control is part of the personalisation.' },
    ],
    processTitle: 'From our first conversation', processSecond: 'to your own agent.',
    processIntro: 'We work directly together. Every step is shaped around you.',
    steps: [
      { title: 'Understand how you work', text: 'We discuss your day-to-day tasks, your tools and the work you want to delegate.' },
      { title: 'Define your configuration', text: 'We agree on scope, access, behaviour and price before building begins.' },
      { title: 'Build and test together', text: 'You try the agent with your own scenarios. We refine responses, actions and approval rules.' },
      { title: 'Make it part of your day', text: 'I hand over what is built, show you how to use it and agree on ongoing support.' },
    ],
    aboutTitle: 'Personal attention.', aboutSecond: 'Person to person.',
    aboutText: 'I’m Georgi Karchev. You’ll work directly with me, from our first conversation to configuring your agent. I’ll understand your tasks, build the solution and refine it with you so it can be useful in your actual work.',
    role: 'Georgi Karchev', roleDetail: 'The person behind KARCHX',
    faqTitle: 'Let’s make things clear.',
    faqs: [
      { q: 'What does “personalised for me” mean?', a: 'We define your agent’s tasks, information sources, tools and rules together. I then build and configure that specific solution. The scope depends on your needs.' },
      { q: 'Do I need to understand AI?', a: 'No. Just tell me how you work and what takes up your time. I’ll explain the possibilities and limitations and show you how to use your agent.' },
      { q: 'Which tools can it work with?', a: 'We check your specific tools at the start. It depends on access, APIs and the rules of those systems. We agree on integrations before building.' },
      { q: 'How much control do I have?', a: 'You decide which actions it can take independently and which require approval. We also test how the agent hands a task back when it needs more information.' },
      { q: 'How much will my agent cost?', a: 'Pricing is individual because tasks and integrations vary. After our first conversation, you receive a clear scope and a specific quote before deciding to proceed.' },
      { q: 'Who owns what is built?', a: 'You do. The code, configuration and integrations I build for you stay yours. External tools and ongoing support are scoped separately.' },
    ],
  },
}

function HeroTitleLine({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  const words = text.split(' ')
  let character = 0

  return (
    <span className="agent-title-line" aria-hidden="true">
      {words.map((word, index) => {
        const start = character / text.length
        character += word.length
        const end = character / text.length
        character += 1

        return (
          <span key={word + index}>
            <span className="agent-title-mask">
              <span className="agent-title-word" style={{
                '--word-delay': `${(startIndex + index) * 75}ms`,
                '--word-ink-from': `rgb(${Array(3).fill(Math.round(start * 102)).join(' ')})`,
                '--word-ink-to': `rgb(${Array(3).fill(Math.round(end * 102)).join(' ')})`,
              } as CSSProperties}>{word}</span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </span>
        )
      })}
    </span>
  )
}

function animateTitleWave(event: PointerEvent<HTMLHeadingElement>) {
  if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return

  event.currentTarget.querySelectorAll<HTMLElement>('.agent-title-mask').forEach((word, index) => {
    word.getAnimations().forEach(animation => animation.cancel())
    word.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-6px)', offset: .4 },
      { transform: 'translateY(0)' },
    ], { duration: 700, delay: index * 45, easing: 'cubic-bezier(.32, .72, 0, 1)' })
  })
}

export default function MarketingHome() {
  const { language } = useLanguage()
  const bg = language === 'BG'
  const c = content[bg ? 'bg' : 'en']
  const scope = useAgentMotion(language)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopWave = () => {
      scope.current?.querySelectorAll('.agent-title-mask').forEach(word => {
        word.getAnimations().forEach(animation => animation.cancel())
      })
    }
    preference.addEventListener('change', stopWave)
    return () => {
      preference.removeEventListener('change', stopWave)
      stopWave()
    }
  }, [scope])

  return (
    <div className="agent-site" ref={scope}>
      <a href="#main-content" className="studio-skip">{bg ? 'Към съдържанието' : 'Skip to content'}</a>
      <Navbar />
      <main id="main-content">
        <section className="agent-hero" id="demo" aria-labelledby="hero-title">
          <div className="studio-wrap agent-hero-inner">
            <div className="agent-hero-copy">
              <h1 id="hero-title" key={language} aria-label={`${c.title} ${c.titleSecond}`} onPointerEnter={animateTitleWave}>
                <HeroTitleLine text={c.title} />{' '}
                <HeroTitleLine text={c.titleSecond} startIndex={c.title.split(' ').length + 1} />
              </h1>
              <p>{c.intro}</p>
              <div className="agent-hero-actions">
                <a href={booking} target="_blank" rel="noopener noreferrer" className="agent-hero-button">
                  <span>{c.cta}</span>
                  <svg viewBox="0 0 256 256" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M40 128h176M144 56l72 72-72 72" /></svg>
                </a>
              </div>
              <span className="agent-call-note">{c.note}</span>
            </div>
            <ul className="agent-promises" aria-label={bg ? 'Какво получавате' : 'What you get'}>{c.promises.map(promise => <li key={promise}>{promise}</li>)}</ul>
          </div>
        </section>

        <section className="agent-principles" id="solutions" aria-labelledby="solutions-title">
          <div className="studio-wrap"><div className="agent-section-heading"><h2 id="solutions-title">{c.differenceTitle}<br /><span>{c.differenceSecond}</span></h2><p>{c.differenceIntro}</p></div>
            <div className="agent-principles-list">{c.principles.map((principle, i) => <article key={principle.title}><span className={'agent-principle-drawing drawing-' + i} aria-hidden="true"><i /><i /><i /></span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div>
          </div>
        </section>

        <section className="agent-process studio-wrap" id="how-it-works" aria-labelledby="process-title">
          <div className="agent-process-intro"><h2 id="process-title">{c.processTitle}<br /><span>{c.processSecond}</span></h2><p>{c.processIntro}</p><a href={booking} target="_blank" rel="noopener noreferrer" className="agent-link">{c.cta}<ArrowUpRight size={20} aria-hidden="true" /></a></div>
          <div className="agent-process-sequence"><span className="agent-process-track" aria-hidden="true"><i /></span><ol>{c.steps.map((step, i) => <li key={step.title}><span className="agent-step-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div>
        </section>

        <section className="agent-about" id="about" aria-labelledby="about-title">
          <div className="agent-about-inner studio-wrap">
            <h2 id="about-title">{c.aboutTitle}<br /><span>{c.aboutSecond}</span></h2>
            <figure className="agent-about-person">
              <div className="agent-about-photo">
                <Image src="/img/azseriozen_optimized_1000.jpg" alt={bg ? 'Портрет на Георги Карчев' : 'Portrait of Georgi Karchev'} fill sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1150px) calc(100vw - 72px), 1040px" />
              </div>
              <figcaption className="agent-about-note">
                <p>{c.aboutText}</p>
                <div className="agent-founder"><strong>{c.role}</strong><span>{c.roleDetail}</span></div>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="agent-faq studio-wrap" id="faq" aria-labelledby="faq-title"><h2 id="faq-title">{c.faqTitle}</h2><div className="agent-faq-list">{c.faqs.map(faq => <details key={faq.q}><summary>{faq.q}<Plus size={21} aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div></section>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
