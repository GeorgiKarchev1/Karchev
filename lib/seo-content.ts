import type { Metadata } from 'next'
import type { ServiceLandingPageProps } from '@/components/seo/ServiceLandingPage'
import { localizedAlternates } from '@/lib/site'

type ServicePageDefinition = ServiceLandingPageProps & {
  metadata: Metadata
}

export const servicePages: Record<string, ServicePageDefinition> = {
  bgWebsiteDevelopment: {
    locale: 'bg',
    path: '/bg/izrabotka-na-saitove',
    title: 'Изработка на сайтове за бизнес, които носят запитвания',
    intro: 'Правим фирмени сайтове и маркетинг сайтове, които зареждат бързо, обясняват офертата ясно и превръщат трафика в реални разговори с клиенти.',
    primaryKeyword: 'изработка на сайт за бизнес',
    eyebrow: 'Услуга · България',
    ctaLabel: 'Запази безплатна консултация',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    proof: [
      'Малък бизнес, който иска по-сериозно онлайн присъствие',
      'Фирма със стар сайт, който не носи запитвания',
      'Бранд, който има нужда от ясно позициониране и по-добра конверсия',
    ],
    offerTitle: 'Какво влиза в услугата',
    offerPoints: [
      'Структура около офертата, а не около случайни секции.',
      'Copy direction за ключовите послания и CTA моменти.',
      'Бърз front-end, mobile-first UX и техническа SEO основа.',
      'Свързване с формуляри, календар, аналитики и основни автоматизации.',
    ],
    outcomesTitle: 'Какъв резултат целим',
    outcomes: [
      'По-ясно разбиране какво точно предлагаш още в първите секунди.',
      'Повече качествени запитвания вместо просто посещения.',
      'Страница, която може да служи и за organic, и за ads трафик.',
    ],
    faqTitle: 'Често задавани въпроси',
    faqs: [
      {
        question: 'Колко време отнема един фирмен сайт?',
        answer: 'Повечето сайтове влизат в диапазон между 2 и 5 седмици според съдържанието, броя страници и нужните интеграции.',
      },
      {
        question: 'Работите ли само с дизайн или и с текста?',
        answer: 'Работим и по структурата, и по ключовите послания, защото красив дизайн без ясно предложение рядко продава.',
      },
      {
        question: 'Подходящо ли е за малък локален бизнес?',
        answer: 'Да. Това е една от най-силните ни use-case категории, особено когато сайтът трябва да носи директни запитвания.',
      },
      {
        question: 'Може ли после да се надгражда?',
        answer: 'Да. Правим структура, върху която после могат да се добавят blog, case studies, landing pages и автоматизации.',
      },
    ],
    relatedTitle: 'Следващи логични страници',
    relatedLinks: [
      {
        href: '/bg/landing-stranitsi',
        label: 'Landing страници',
        description: 'Когато ти трябва по-агресивна страница за ads, оферта или конкретна услуга.',
      },
      {
        href: '/bg/blog/kolko-struva-sait-za-malak-biznes',
        label: 'Колко струва сайт за малък бизнес',
        description: 'Статията, която обяснява честно различните ценови диапазони и какво влиза в тях.',
      },
      {
        href: '/bg/kazusi',
        label: 'Казуси',
        description: 'Реални проекти и как подхождаме, когато сайтът трябва да носи доверие и резултати.',
      },
    ],
    serviceName: 'Изработка на сайтове за бизнес',
    serviceDescription: 'Бързи фирмени сайтове и маркетинг сайтове с ясна структура, силен copy direction и SEO-ready техническа основа.',
    metadata: {
      title: 'Изработка на сайт за бизнес | Karchev',
      description: 'Изработка на сайтове за бизнес в България с фокус върху скорост, доверие и повече качествени запитвания.',
      alternates: localizedAlternates('/bg/izrabotka-na-saitove', '/en/website-development', 'bg'),
      keywords: ['изработка на сайт', 'изработка на сайт за бизнес', 'фирмен сайт', 'уеб дизайн за бизнес'],
    },
  },
  bgLandingPages: {
    locale: 'bg',
    path: '/bg/landing-stranitsi',
    title: 'Landing страници, направени да превръщат трафика в клиенти',
    intro: 'Когато имаш конкретна оферта, услуга или рекламна кампания, landing page е по-силен инструмент от разхвърлян многостраничен сайт.',
    primaryKeyword: 'landing страница',
    eyebrow: 'Услуга · България',
    ctaLabel: 'Виж дали landing page е правилният ход',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    proof: [
      'Услуга с една основна оферта и ясен call-to-action',
      'Рекламни кампании, които пращат трафик към конкретна страница',
      'Тест на нов продукт, оферта или funnel без тежък сайт',
    ],
    offerTitle: 'Какво включваме',
    offerPoints: [
      'Messaging around one primary offer и една основна конверсия.',
      'Секция след секция логика: проблем, решение, proof, objection handling, CTA.',
      'Бързина, mobile UX и чиста аналитична структура за измерване на заявки.',
      'SEO-ready техническа основа, ако страницата трябва да работи и за organic intent.',
    ],
    outcomesTitle: 'Защо е по-силен формат',
    outcomes: [
      'По-малко разсейване и по-ясна посока за посетителя.',
      'По-лесно тестване на оферта, headline и CTA логика.',
      'По-добър fit за ads, launch-и, локални услуги и lead generation.',
    ],
    faqTitle: 'FAQ',
    faqs: [
      {
        question: 'Кога е по-добре landing page вместо цял сайт?',
        answer: 'Когато имаш една оферта, една основна аудитория и искаш по-директен conversion flow.',
      },
      {
        question: 'Може ли после да стане част от по-голям сайт?',
        answer: 'Да. Често правим landing page като първа стъпка и после надграждаме към пълен site structure.',
      },
      {
        question: 'Подходящо ли е за локален бизнес?',
        answer: 'Да, особено за услуги с ясна оферта като клиники, салони, консултанти, треньори и B2B услуги.',
      },
      {
        question: 'Колко copy е нужен?',
        answer: 'Толкова, колкото е нужно за доверие и яснота. Не пълним страници с fluff само за да изглеждат големи.',
      },
    ],
    relatedTitle: 'Свързани страници',
    relatedLinks: [
      {
        href: '/bg/izrabotka-na-saitove',
        label: 'Фирмени сайтове',
        description: 'Ако офертата ти вече е по-широка и имаш нужда от пълна структура.',
      },
      {
        href: '/bg/ai-avtomatizatsii',
        label: 'AI автоматизации',
        description: 'Landing page е по-силен, когато формата и follow-up процесът са автоматизирани.',
      },
      {
        href: '/bg/kazusi/yordan-kolev',
        label: 'Казус: Yordan Kolev',
        description: 'Личен бранд сайт, в който доверието и ясният CTA са по-важни от визуалния шум.',
      },
    ],
    serviceName: 'Landing страници за бизнес',
    serviceDescription: 'Landing страници за услуги, кампании и оферти с фокус върху ясна структура и директна конверсия.',
    metadata: {
      title: 'Landing страници за бизнес | Karchev',
      description: 'Landing страници за услуги, кампании и lead generation с ясна оферта, силен CTA и бързо зареждане.',
      alternates: localizedAlternates('/bg/landing-stranitsi', '/en/landing-pages', 'bg'),
      keywords: ['landing страница', 'landing страница цена', 'landing page за бизнес', 'lead generation page'],
    },
  },
  bgAiAutomation: {
    locale: 'bg',
    path: '/bg/ai-avtomatizatsii',
    title: 'AI автоматизации за малък бизнес без enterprise театър',
    intro: 'Автоматизираме запитвания, content ops и вътрешни процеси така, че да спестяваш време и да не губиш lead-ове по пътя.',
    primaryKeyword: 'AI автоматизации за бизнес',
    eyebrow: 'Услуга · България',
    ctaLabel: 'Нека видим какво може да се автоматизира',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    proof: [
      'Екип, който губи време в повтаряеми ръчни действия',
      'Бизнес, който събира lead-ове, но follow-up-ът е слаб',
      'Съдържание, запитвания и admin работа без ясна система',
    ],
    offerTitle: 'Къде носим стойност',
    offerPoints: [
      'Lead capture и автоматичен follow-up след форма или запитване.',
      'AI подпомогнати content workflows за идеи, repurposing и publish процес.',
      'Интеграции между сайт, календар, CRM, имейл и вътрешни инструменти.',
      'Леки системи, които са практични за малък бизнес, а не сложни enterprise инсталации.',
    ],
    outcomesTitle: 'Очакван ефект',
    outcomes: [
      'По-малко ръчна административна работа.',
      'По-бърза реакция след нов lead и по-малко изпуснати възможности.',
      'Система, която се връзва с реалния ти процес, вместо да го усложнява.',
    ],
    faqTitle: 'FAQ',
    faqs: [
      {
        question: 'Трябва ли да имам CRM или сложен stack?',
        answer: 'Не. Започваме от това какво вече използваш и надграждаме само там, където има реална полза.',
      },
      {
        question: 'Автоматизациите заменят ли човека?',
        answer: 'Не. Добрата автоматизация маха repetitive работа и оставя човека за важните разговори и решения.',
      },
      {
        question: 'Подходящо ли е за малък екип?',
        answer: 'Да. Всъщност точно при малките екипи ефектът от спестено време се усеща най-бързо.',
      },
      {
        question: 'Може ли да се комбинира със сайт или landing page?',
        answer: 'Да. Най-добрите резултати идват, когато страницата и backend flow-ът са мислени като една система.',
      },
    ],
    relatedTitle: 'Полезни следващи ходове',
    relatedLinks: [
      {
        href: '/bg/landing-stranitsi',
        label: 'Landing страници',
        description: 'Автоматизациите работят по-силно, когато входящият трафик влиза в ясен conversion flow.',
      },
      {
        href: '/tools',
        label: 'Tools & resources',
        description: 'Инструменти и workflows, които използваме за реални automation системи.',
      },
      {
        href: '/bg/kazusi/editing-bg',
        label: 'Казус: Editing.bg',
        description: 'Пример как automation логиката става част от самия продукт, а не само add-on.',
      },
    ],
    serviceName: 'AI автоматизации за бизнес',
    serviceDescription: 'AI автоматизации и леки workflow системи за сайтове, lead capture, content operations и административни процеси.',
    metadata: {
      title: 'AI автоматизации за бизнес | Karchev',
      description: 'AI автоматизации за малък бизнес: lead follow-up, content workflows и интеграции между сайт, календар и CRM.',
      alternates: localizedAlternates('/bg/ai-avtomatizatsii', '/en/ai-automation', 'bg'),
      keywords: ['AI автоматизации за бизнес', 'чатбот за бизнес', 'автоматизация на запитвания', 'AI workflows'],
    },
  },
  enWebsiteDevelopment: {
    locale: 'en',
    path: '/en/website-development',
    title: 'Website development for service businesses that need qualified leads',
    intro: 'We build fast, conversion-focused websites that explain the offer clearly, establish trust fast, and turn visits into real sales conversations.',
    primaryKeyword: 'website development for service business',
    eyebrow: 'Service · United States',
    ctaLabel: 'Book a free strategy call',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    proof: [
      'Service businesses with an outdated or weak-converting site',
      'Founders who need a clearer offer and stronger trust layer',
      'Teams running ads or outreach that currently lands on generic pages',
    ],
    offerTitle: 'What the engagement covers',
    offerPoints: [
      'Offer-first structure built around how prospects actually decide.',
      'Copy direction for core messaging, objections, and calls to action.',
      'Fast front-end, mobile-first UX, and solid technical SEO foundations.',
      'Forms, calendar routing, analytics, and light automation where it matters.',
    ],
    outcomesTitle: 'What we are trying to improve',
    outcomes: [
      'Stronger first-impression trust and clarity.',
      'More qualified inbound conversations instead of passive traffic.',
      'A site that works for both organic discovery and paid acquisition.',
    ],
    faqTitle: 'Common questions',
    faqs: [
      {
        question: 'How long does a website project usually take?',
        answer: 'Most projects land between 2 and 5 weeks depending on the content readiness, page count, and required integrations.',
      },
      {
        question: 'Do you handle messaging or only design and development?',
        answer: 'We handle structure and message direction too, because design without a clear offer usually underperforms.',
      },
      {
        question: 'Is this a fit for smaller service businesses?',
        answer: 'Yes. That is one of the strongest use cases, especially when the site needs to generate direct leads.',
      },
      {
        question: 'Can the site expand later?',
        answer: 'Yes. We design the foundation so you can layer in landing pages, blog content, case studies, and automations later.',
      },
    ],
    relatedTitle: 'Related pages',
    relatedLinks: [
      {
        href: '/en/landing-pages',
        label: 'Landing pages',
        description: 'For narrower offers, campaigns, and direct-response traffic.',
      },
      {
        href: '/en/blog/website-cost-small-business-bulgaria',
        label: 'Website cost breakdown',
        description: 'An honest pricing article that explains where site budgets actually go.',
      },
      {
        href: '/en/case-studies',
        label: 'Case studies',
        description: 'Real work, strategic decisions, and the outcomes we optimize for.',
      },
    ],
    serviceName: 'Website development for service businesses',
    serviceDescription: 'Conversion-focused website development for service businesses, founders, and personal brands.',
    metadata: {
      title: 'Website Development for Service Businesses',
      description: 'Fast, conversion-focused website development for service businesses, founders, and personal brands.',
      alternates: localizedAlternates('/bg/izrabotka-na-saitove', '/en/website-development', 'en'),
      keywords: ['website development for service business', 'small business website redesign', 'conversion focused web design'],
    },
  },
  enLandingPages: {
    locale: 'en',
    path: '/en/landing-pages',
    title: 'Landing pages built for campaigns, offers, and cleaner conversion paths',
    intro: 'When you have one offer, one audience, and one action you want people to take, a focused landing page usually outperforms a bloated multi-page site.',
    primaryKeyword: 'landing page developer',
    eyebrow: 'Service · United States',
    ctaLabel: 'Talk through your funnel',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    proof: [
      'Founders testing a new offer or niche positioning',
      'Ads traffic that needs a clearer destination than a homepage',
      'Local and service businesses that need a direct lead-generation page',
    ],
    offerTitle: 'What we build into the page',
    offerPoints: [
      'One-offer messaging with a single primary conversion goal.',
      'Section flow built around trust, proof, objections, and CTA timing.',
      'Fast-loading implementation and analytics-ready conversion tracking.',
      'Search-friendly technical setup when the page should support commercial organic intent too.',
    ],
    outcomesTitle: 'Why this format works',
    outcomes: [
      'Less distraction and more clarity for the visitor.',
      'Cleaner testing for headlines, offers, and CTA changes.',
      'A better fit for launches, local offers, paid traffic, and lead gen funnels.',
    ],
    faqTitle: 'FAQ',
    faqs: [
      {
        question: 'When should I choose a landing page instead of a full site?',
        answer: 'Choose a landing page when the offer is narrow, the audience is clear, and you want a tighter path to one primary action.',
      },
      {
        question: 'Can this become part of a larger site later?',
        answer: 'Yes. We often start with the page that converts first and expand into a broader site structure after that.',
      },
      {
        question: 'Is this useful for local businesses too?',
        answer: 'Absolutely, especially for local services, clinics, consultants, and founder-led businesses with one main offer.',
      },
      {
        question: 'How much copy does a page need?',
        answer: 'Enough to establish clarity and trust. We avoid padding pages with generic filler just to make them look longer.',
      },
    ],
    relatedTitle: 'Useful next steps',
    relatedLinks: [
      {
        href: '/en/website-development',
        label: 'Website development',
        description: 'When the offer set is broader and you need a full information architecture.',
      },
      {
        href: '/en/ai-automation',
        label: 'AI automation',
        description: 'A landing page performs better when lead capture and follow-up are systematized.',
      },
      {
        href: '/en/case-studies/yordan-kolev',
        label: 'Case study: Yordan Kolev',
        description: 'A personal brand site where trust and CTA clarity mattered more than visual noise.',
      },
    ],
    serviceName: 'Landing page development',
    serviceDescription: 'Landing page development for offers, campaigns, launches, and lead-generation funnels.',
    metadata: {
      title: 'Landing Page Development',
      description: 'Landing page development for campaigns, offers, and lead generation with clear messaging and fast performance.',
      alternates: localizedAlternates('/bg/landing-stranitsi', '/en/landing-pages', 'en'),
      keywords: ['landing page developer', 'conversion focused landing page', 'lead generation landing page'],
    },
  },
  enAiAutomation: {
    locale: 'en',
    path: '/en/ai-automation',
    title: 'AI automation for small businesses that need leverage, not hype',
    intro: 'We automate lead follow-up, content workflows, and repetitive internal tasks so your team spends less time on admin and more time on revenue-generating work.',
    primaryKeyword: 'ai automation for small business',
    eyebrow: 'Service · United States',
    ctaLabel: 'Find the highest-leverage workflow',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    proof: [
      'Small teams drowning in repetitive admin and follow-up tasks',
      'Businesses capturing leads but responding too slowly or inconsistently',
      'Founder-led companies that need better content or ops systems without enterprise overhead',
    ],
    offerTitle: 'Where automation actually helps',
    offerPoints: [
      'Lead capture and automatic follow-up after forms, calls, or enquiries.',
      'AI-assisted content workflows for ideation, repurposing, and publish support.',
      'Integrations between the website, calendar, CRM, email, and internal tools.',
      'Practical systems built for small businesses, not bloated enterprise process maps.',
    ],
    outcomesTitle: 'What we want to improve',
    outcomes: [
      'Less manual busywork.',
      'Faster response after new inbound leads.',
      'A workflow that fits the way your team already operates instead of fighting it.',
    ],
    faqTitle: 'FAQ',
    faqs: [
      {
        question: 'Do I need a full CRM stack already in place?',
        answer: 'No. We start from what you already use and only add layers when they create clear operational value.',
      },
      {
        question: 'Is the goal to replace people?',
        answer: 'No. The goal is to remove repetitive work so people can spend more time on strategy, service, and sales conversations.',
      },
      {
        question: 'Is this still worth it for a small team?',
        answer: 'Yes. Small teams usually feel the benefit the fastest because every hour saved matters more.',
      },
      {
        question: 'Can this be paired with a site or landing page project?',
        answer: 'Yes. The strongest systems usually connect the front-end page experience with what happens after the lead submits.',
      },
    ],
    relatedTitle: 'Related paths',
    relatedLinks: [
      {
        href: '/en/landing-pages',
        label: 'Landing pages',
        description: 'The front-end conversion layer becomes stronger when the backend follow-up is automated.',
      },
      {
        href: '/tools',
        label: 'Tools & resources',
        description: 'Useful tooling and workflows that inform our client automation systems.',
      },
      {
        href: '/en/case-studies/editing-bg',
        label: 'Case study: Editing.bg',
        description: 'A product where automation was part of the user and ops flow, not an afterthought.',
      },
    ],
    serviceName: 'AI automation for small business',
    serviceDescription: 'AI automation for lead capture, follow-up, content systems, and lightweight business operations.',
    metadata: {
      title: 'AI Automation for Small Business',
      description: 'AI automation for small businesses: lead follow-up, content systems, and practical workflow integrations.',
      alternates: localizedAlternates('/bg/ai-avtomatizatsii', '/en/ai-automation', 'en'),
      keywords: ['ai automation for small business', 'lead follow-up automation', 'content workflow automation'],
    },
  },
}
