import type { Metadata } from 'next'
import type { ArticlePageProps } from '@/components/seo/ArticlePage'
import type { CaseStudyPageProps } from '@/components/seo/CaseStudyPage'
import { localizedAlternates } from '@/lib/site'

type ArticleDefinition = ArticlePageProps & { metadata: Metadata }
type CaseStudyDefinition = CaseStudyPageProps & { metadata: Metadata }

export const localizedArticles: Record<string, ArticleDefinition> = {
  bgWebsiteCost: {
    locale: 'bg',
    path: '/bg/blog/kolko-struva-sait-za-malak-biznes',
    title: 'Колко струва сайт за малък бизнес в България — честен отговор',
    description: 'Цените за уебсайт варират от 150€ до 5000€. Ето честен разбор на трите варианта, скритите разходи и как да избереш правилното решение.',
    category: 'Уеб Разработка',
    readTime: '5 мин четене',
    date: '25 Април 2026',
    intro: 'Всеки път когато някой ни пита "колко струва един сайт?" знаем какво следва — или им даваме честен отговор и изглеждаме по-скъпи от съседната агенция, или им казваме "зависи" и звучим като всички останали. Решихме да изберем честния отговор.',
    sections: [
      {
        heading: 'Защо цените са толкова различни?',
        body: 'Ако потърсиш в Google, ще видиш оферти от 150€ до 5000€ за "сайт за малък бизнес." Това не е измама — просто не се говори за едно и също нещо. Разликата е като между ръчно шита риза и такава от мола. И двете са ризи. Но не са едно и също.',
      },
      {
        heading: 'Трите варианта и реалните им цени',
        subsections: [
          {
            title: 'Шаблонен сайт — 100 до 300€',
            body: 'Wix, Squarespace, готова WordPress тема. Бърз за правене, евтин, изглежда окей. Подходящ е, ако тепърва тестваш пазара и не искаш голям риск.',
          },
          {
            title: 'Персонализиран сайт — 400 до 1300€',
            body: 'Тук вече говорим за нещо направено специално за теб. Дизайн по мярка, бързо зареждане и структура, която кара хората да се обаждат.',
          },
          {
            title: 'Онлайн магазин — 1000 до 3000€+',
            body: 'Продукти, плащания, количка, управление на поръчки и интеграции. Това е различен проект и съответно различен бюджет.',
          },
        ],
      },
      {
        heading: 'Скритите разходи, за които никой не те предупреждава',
        list: [
          'Домейн — около 10-15€ на година',
          'Хостинг — 30 до 100€ на година според качеството',
          'Поддръжка — 25 до 75€ на месец, ако искаш някой да следи обновяванията и сигурността',
          'Съдържание — снимки, текстове и видео, което мнозина подценяват',
        ],
      },
      {
        heading: 'Защо някои агенции таксуват 2500€+ за "обикновен" сайт?',
        body: 'Понякога защото в цената влизат branding, copywriting и SEO стратегия. Понякога просто защото могат. Истинският въпрос е не "колко струва?", а "какво получавам за тези пари?"',
      },
      {
        heading: 'Какво правим ние?',
        body: 'Работим в диапазона 400-1500€ за персонализирани сайтове и не приемаме проект, ако не вярваме, че ще донесе реален резултат. Ако ситуацията ти не изисква голяма инвестиция, ще го кажем директно.',
      },
    ],
    ctaLabel: 'Запази безплатен разговор',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/bg/blog',
    backLabel: 'Назад към блога',
    relatedServiceHref: '/bg/izrabotka-na-saitove',
    relatedServiceLabel: 'Изработка на сайтове за бизнес',
    metadata: {
      title: 'Колко струва сайт за малък бизнес в България',
      description: 'Честен разбор на цените за сайт за малък бизнес в България — шаблонен сайт, custom сайт и онлайн магазин.',
      alternates: localizedAlternates('/bg/blog/kolko-struva-sait-za-malak-biznes', '/en/blog/website-cost-small-business-bulgaria', 'bg'),
      keywords: ['колко струва сайт', 'цена сайт малък бизнес', 'уебсайт цена българия'],
    },
  },
  enWebsiteCost: {
    locale: 'en',
    path: '/en/blog/website-cost-small-business-bulgaria',
    title: 'How Much Does a Website Cost for a Small Business in Bulgaria?',
    description: 'An honest breakdown of template websites, custom websites, online stores, and the hidden costs small businesses usually miss.',
    category: 'Web Development',
    readTime: '5 min read',
    date: 'April 25, 2026',
    intro: 'Every time someone asks us how much a website costs, the same problem shows up: either you give a real answer and sound expensive, or you say "it depends" and sound like every vague agency on the internet.',
    sections: [
      {
        heading: 'Why are the prices all over the place?',
        body: 'A small business website can cost €150 or €5,000 depending on what is actually being built. Those offers are not talking about the same thing, even if they use the same label.',
      },
      {
        heading: 'The three common price bands',
        subsections: [
          {
            title: 'Template website — €100 to €300',
            body: 'Cheap and quick. Good for testing the waters, but rarely a strong fit when trust and conversion actually matter.',
          },
          {
            title: 'Custom website — €400 to €1,300',
            body: 'This is where the site starts becoming a real business asset: faster load times, better structure, and a message built around your offer.',
          },
          {
            title: 'Online store — €1,000 to €3,000+',
            body: 'Products, payments, shipping logic, admin, and integrations make this a different category of work altogether.',
          },
        ],
      },
      {
        heading: 'The hidden costs most people forget',
        list: [
          'Domain costs',
          'Hosting quality',
          'Ongoing maintenance and updates',
          'Copy, photos, and content production',
        ],
      },
      {
        heading: 'Why do some agencies charge much more?',
        body: 'Sometimes because the scope includes brand work, strategy, and copy. Sometimes because the quote is padded. The important question is not the number alone, but the logic behind it.',
      },
      {
        heading: 'How we approach it',
        body: 'We usually work in the custom site range and stay direct about what is and is not worth paying for. If a business does not need a bigger build, we say that plainly.',
      },
    ],
    ctaLabel: 'Book a free call',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/en/blog',
    backLabel: 'Back to blog',
    relatedServiceHref: '/en/website-development',
    relatedServiceLabel: 'Website development for service businesses',
    metadata: {
      title: 'Website Cost for a Small Business in Bulgaria',
      description: 'An honest website cost breakdown for small businesses in Bulgaria: template sites, custom websites, online stores, and hidden costs.',
      alternates: localizedAlternates('/bg/blog/kolko-struva-sait-za-malak-biznes', '/en/blog/website-cost-small-business-bulgaria', 'en'),
      keywords: ['website cost small business bulgaria', 'small business website pricing', 'custom website cost'],
    },
  },
  bgSmallBusinessWebsiteNeeds: {
    locale: 'bg',
    path: '/bg/blog/kakvo-tryabva-da-ima-sait-za-malak-biznes',
    title: 'Какво трябва да има един сайт за малък бизнес през 2026',
    description: 'Структура, trust елементи и SEO основа за сайт, който не е просто визитка, а актив за бизнеса.',
    category: 'Уеб Стратегия',
    readTime: '6 мин четене',
    date: '12 Май 2026',
    intro: 'Повечето малки бизнес сайтове губят още в първите секунди, защото не казват ясно какво предлагат, на кого и защо човек трябва да се довери точно на тях.',
    sections: [
      {
        heading: '1. Ясно първо изречение какво правиш',
        body: 'Потребителят не е длъжен да разгадава бизнеса ти. Above the fold трябва да казва ясно услугата, аудиторията и следващата стъпка.',
      },
      {
        heading: '2. Структура около услугата, не около егото',
        body: 'Начало, услуги, резултати, казуси, често задавани въпроси и контакт. Това работи по-добре от хаотични секции с общи обещания.',
      },
      {
        heading: '3. Доказателства за доверие',
        list: [
          'казуси или примери от реална работа',
          'ясни контакти и реален човек зад бизнеса',
          'социални доказателства, когато ги имаш',
          'скорост, мобилна версия и чист UX',
        ],
      },
      {
        heading: '4. SEO основа, не “магия”',
        body: 'Нужни са индексируеми страници, правилни title и description тагове, логична вътрешна структура и ясна услуга на отделен URL.',
      },
      {
        heading: '5. Ясен CTA',
        body: 'Ако човек не разбира какво точно да направи после, сайтът губи смисъл. Една ясна посока е по-силна от пет разсейващи бутона.',
      },
    ],
    ctaLabel: 'Виж страницата за изработка на сайтове',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/bg/blog',
    backLabel: 'Назад към блога',
    relatedServiceHref: '/bg/izrabotka-na-saitove',
    relatedServiceLabel: 'Изработка на сайтове за бизнес',
    metadata: {
      title: 'Какво трябва да има един сайт за малък бизнес',
      description: 'Практическа структура за сайт на малък бизнес: ясно предложение, доверие, SEO основа и силен CTA.',
      alternates: localizedAlternates('/bg/blog/kakvo-tryabva-da-ima-sait-za-malak-biznes', '/en/blog/what-a-small-business-website-needs', 'bg'),
      keywords: ['какво трябва да има сайт за малък бизнес', 'сайт за малък бизнес', 'фирмен сайт структура'],
    },
  },
  enSmallBusinessWebsiteNeeds: {
    locale: 'en',
    path: '/en/blog/what-a-small-business-website-needs',
    title: 'What a Small Business Website Actually Needs in 2026',
    description: 'A practical breakdown of structure, trust elements, and SEO foundations for a website that helps a business grow.',
    category: 'Website Strategy',
    readTime: '6 min read',
    date: 'May 12, 2026',
    intro: 'Most small business websites fail in the first few seconds because they do not explain the offer clearly, establish trust quickly, or guide the visitor toward one obvious next step.',
    sections: [
      {
        heading: '1. A clear opening statement',
        body: 'The visitor should understand what you do, who you do it for, and what to do next without decoding vague brand language.',
      },
      {
        heading: '2. Structure around the offer',
        body: 'A solid small business site usually needs a clearer services structure, proof, FAQs, and contact flow more than it needs decorative sections.',
      },
      {
        heading: '3. Trust elements',
        list: [
          'real case studies or project examples',
          'clear contact information and visible ownership',
          'proof and authority signals when available',
          'speed, mobile UX, and a clean visual hierarchy',
        ],
      },
      {
        heading: '4. SEO basics that matter',
        body: 'Search needs crawlable pages, relevant titles and descriptions, internal structure, and dedicated URLs for actual services.',
      },
      {
        heading: '5. One strong CTA path',
        body: 'A site gets weaker when every section asks for something different. One dominant action usually converts better.',
      },
    ],
    ctaLabel: 'Book a free call',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/en/blog',
    backLabel: 'Back to blog',
    relatedServiceHref: '/en/website-development',
    relatedServiceLabel: 'Website development for service businesses',
    metadata: {
      title: 'What a Small Business Website Needs',
      description: 'A practical guide to what a small business website should include: structure, trust, SEO basics, and a strong CTA path.',
      alternates: localizedAlternates('/bg/blog/kakvo-tryabva-da-ima-sait-za-malak-biznes', '/en/blog/what-a-small-business-website-needs', 'en'),
      keywords: ['small business website essentials', 'what a business website needs', 'service business website structure'],
    },
  },
  bgLandingPageInsteadOfWebsite: {
    locale: 'bg',
    path: '/bg/blog/koga-ti-tryabva-landing-stranitsa-vmesto-sait',
    title: 'Кога ти трябва landing страница вместо цял сайт',
    description: 'Кога landing page е по-силен избор от многостраничен сайт и как това влияе на конверсията и бюджета.',
    category: 'Landing Pages',
    readTime: '5 мин четене',
    date: '12 Май 2026',
    intro: 'Не всеки бизнес има нужда от голям сайт още от началото. Понякога една точна landing страница носи повече резултат от пет страници без посока.',
    sections: [
      {
        heading: 'Кога landing page печели',
        list: [
          'имаш една основна услуга или оферта',
          'пускаш реклами към конкретна страница',
          'тестваш ново позициониране или нов продукт',
          'искаш по-бърз и по-евтин старт',
        ],
      },
      {
        heading: 'Кога цял сайт е по-добрият избор',
        body: 'Ако имаш няколко услуги, по-широка оферта, нужда от повече SEO surface area и различни audience сегменти, landing page няма да е достатъчен.',
      },
      {
        heading: 'Най-честата грешка',
        body: 'Да се направи “landing page”, която реално е мини-сайт без фокус. Ако всичко е важно, нищо не е важно.',
      },
      {
        heading: 'Практическото правило',
        body: 'Една оферта, една аудитория, една цел за конверсия: landing page. Повече от това: вероятно вече ти трябва сайт.',
      },
    ],
    ctaLabel: 'Виж как правим landing страници',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/bg/blog',
    backLabel: 'Назад към блога',
    relatedServiceHref: '/bg/landing-stranitsi',
    relatedServiceLabel: 'Landing страници за бизнес',
    metadata: {
      title: 'Кога ти трябва landing страница вместо сайт',
      description: 'Landing page или цял сайт? Практичен разбор кога кое има по-голям смисъл за бизнес, оферта и конверсия.',
      alternates: localizedAlternates('/bg/blog/koga-ti-tryabva-landing-stranitsa-vmesto-sait', '/en/blog/when-you-need-a-landing-page-instead-of-a-website', 'bg'),
      keywords: ['кога ти трябва landing page', 'landing страница вместо сайт', 'landing page за бизнес'],
    },
  },
  enLandingPageInsteadOfWebsite: {
    locale: 'en',
    path: '/en/blog/when-you-need-a-landing-page-instead-of-a-website',
    title: 'When You Need a Landing Page Instead of a Full Website',
    description: 'A practical look at when a focused landing page makes more sense than a broader multi-page website.',
    category: 'Landing Pages',
    readTime: '5 min read',
    date: 'May 12, 2026',
    intro: 'Not every business needs a full site first. In many cases, one sharp landing page converts better than a bloated five-page website with no clear direction.',
    sections: [
      {
        heading: 'When a landing page is the better call',
        list: [
          'you have one main service or offer',
          'you are sending ads traffic to one focused destination',
          'you are testing a new positioning angle or product',
          'you need a faster, leaner launch',
        ],
      },
      {
        heading: 'When a full site makes more sense',
        body: 'If you have multiple offers, broader information needs, and a bigger SEO footprint to build, a landing page alone is too narrow.',
      },
      {
        heading: 'The common mistake',
        body: 'Calling something a landing page when it is really a mini-site with too many competing messages and actions.',
      },
      {
        heading: 'A simple rule',
        body: 'One offer, one audience, one conversion goal usually points to a landing page. More complexity usually points to a full site.',
      },
    ],
    ctaLabel: 'See our landing page service',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/en/blog',
    backLabel: 'Back to blog',
    relatedServiceHref: '/en/landing-pages',
    relatedServiceLabel: 'Landing page development',
    metadata: {
      title: 'When You Need a Landing Page Instead of a Website',
      description: 'A practical guide to deciding between a landing page and a broader website for offers, campaigns, and lead generation.',
      alternates: localizedAlternates('/bg/blog/koga-ti-tryabva-landing-stranitsa-vmesto-sait', '/en/blog/when-you-need-a-landing-page-instead-of-a-website', 'en'),
      keywords: ['landing page vs website', 'when to use a landing page', 'landing page for service business'],
    },
  },
  bgAiAutomationTimeSavings: {
    locale: 'bg',
    path: '/bg/blog/kak-ai-avtomatizatsiite-pestyat-vreme-na-malak-biznes',
    title: 'Как AI автоматизациите пестят време на малък бизнес',
    description: 'Къде AI автоматизациите имат реален смисъл за малки екипи и къде са просто buzzword разход.',
    category: 'AI Автоматизации',
    readTime: '6 мин четене',
    date: '12 Май 2026',
    intro: 'Малкият бизнес няма нужда от AI театър. Има нужда от по-малко ръчна работа, по-бърза реакция и по-малко изпуснати възможности.',
    sections: [
      {
        heading: 'Най-силните use-case-и',
        list: [
          'автоматичен follow-up след форма',
          'content repurposing и publish workflows',
          'сортиране и маршрутизиране на входящи запитвания',
          'вътрешни admin процеси, които се повтарят постоянно',
        ],
      },
      {
        heading: 'Къде хората грешат',
        body: 'Купуват скъп инструмент, преди изобщо да са описали процеса, който искат да подобрят. Лош процес + AI = по-бърз хаос.',
      },
      {
        heading: 'Как да мислиш правилно',
        body: 'Първо намираш bottleneck. После решаваш дали да го автоматизираш изцяло, частично или просто да го направиш по-ясен.',
      },
      {
        heading: 'Минималният работещ AI стек',
        body: 'За много малки екипи стига комбинация от сайт, форма, календар, имейл automation и 1-2 AI-assisted workflow-а.',
      },
    ],
    ctaLabel: 'Виж услугата за AI автоматизации',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/bg/blog',
    backLabel: 'Назад към блога',
    relatedServiceHref: '/bg/ai-avtomatizatsii',
    relatedServiceLabel: 'AI автоматизации за бизнес',
    metadata: {
      title: 'Как AI автоматизациите пестят време на малък бизнес',
      description: 'Практически AI автоматизации за малък бизнес: follow-up, content workflows и по-малко административна загуба на време.',
      alternates: localizedAlternates('/bg/blog/kak-ai-avtomatizatsiite-pestyat-vreme-na-malak-biznes', '/en/blog/how-ai-automation-saves-time-for-small-businesses', 'bg'),
      keywords: ['AI автоматизации за малък бизнес', 'как AI пести време', 'автоматизации за бизнес'],
    },
  },
  enAiAutomationTimeSavings: {
    locale: 'en',
    path: '/en/blog/how-ai-automation-saves-time-for-small-businesses',
    title: 'How AI Automation Saves Time for Small Businesses',
    description: 'Where AI automation creates real leverage for small teams and where it is just expensive noise.',
    category: 'AI Automation',
    readTime: '6 min read',
    date: 'May 12, 2026',
    intro: 'Small businesses do not need AI theater. They need less repetitive work, faster response times, and fewer dropped leads.',
    sections: [
      {
        heading: 'The strongest automation use cases',
        list: [
          'automatic follow-up after inbound forms',
          'content repurposing and publishing workflows',
          'lead sorting and routing',
          'repetitive internal admin tasks',
        ],
      },
      {
        heading: 'Where people get it wrong',
        body: 'They buy the tool before they define the process. A bad process plus AI usually just creates faster chaos.',
      },
      {
        heading: 'A better way to think about it',
        body: 'Find the bottleneck first. Then decide whether to automate it fully, partially, or simply make it clearer.',
      },
      {
        heading: 'A minimal workable stack',
        body: 'For many small teams, a site, form, calendar, email automation, and one or two AI-assisted workflows are already enough.',
      },
    ],
    ctaLabel: 'See the AI automation service',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/en/blog',
    backLabel: 'Back to blog',
    relatedServiceHref: '/en/ai-automation',
    relatedServiceLabel: 'AI automation for small business',
    metadata: {
      title: 'How AI Automation Saves Time for Small Businesses',
      description: 'Practical AI automation ideas for small businesses: follow-up, content workflows, and operational time savings.',
      alternates: localizedAlternates('/bg/blog/kak-ai-avtomatizatsiite-pestyat-vreme-na-malak-biznes', '/en/blog/how-ai-automation-saves-time-for-small-businesses', 'en'),
      keywords: ['ai automation for small business', 'small business workflow automation', 'lead follow-up automation'],
    },
  },
  bgWebsiteTrustMistakes: {
    locale: 'bg',
    path: '/bg/blog/greshkite-v-saita-koito-ubivat-doverieto',
    title: 'Грешките в сайта, които убиват доверието за 10 секунди',
    description: 'Най-честите сайт грешки, които карат посетителя да излезе, преди изобщо да е разбрал офертата.',
    category: 'Конверсия',
    readTime: '5 мин четене',
    date: '12 Май 2026',
    intro: 'Хората не четат сайта ти спокойно и търпеливо. Те сканират за сигнал дали изглеждаш сериозен, ясен и безопасен избор.',
    sections: [
      {
        heading: '1. Неясен headline',
        body: 'Ако headline-ът звучи като рекламен дим, вместо като ясна услуга, доверието пада веднага.',
      },
      {
        heading: '2. Прекалено много визуален шум',
        body: 'Лошият hierarchy, тежките анимации и претрупаните секции карат сайта да изглежда по-евтин, не по-впечатляващ.',
      },
      {
        heading: '3. Няма доказателства',
        body: 'Без проекти, реални примери, ясен човек зад бизнеса или trust сигнали, посетителят остава на guessing mode.',
      },
      {
        heading: '4. Бавен mobile experience',
        body: 'Ако сайтът се усеща муден или счупен на телефон, човекът често напуска преди да прочете и половин екран.',
      },
    ],
    ctaLabel: 'Подобри сайта си',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/bg/blog',
    backLabel: 'Назад към блога',
    relatedServiceHref: '/bg/izrabotka-na-saitove',
    relatedServiceLabel: 'Изработка на сайтове за бизнес',
    metadata: {
      title: 'Грешките в сайта, които убиват доверието',
      description: 'Най-честите грешки в сайта, които подкопават доверие и конверсия още в първите секунди.',
      alternates: localizedAlternates('/bg/blog/greshkite-v-saita-koito-ubivat-doverieto', '/en/blog/website-mistakes-that-kill-trust', 'bg'),
      keywords: ['грешки в сайта', 'как сайтът губи доверие', 'конверсия сайт'],
    },
  },
  enWebsiteTrustMistakes: {
    locale: 'en',
    path: '/en/blog/website-mistakes-that-kill-trust',
    title: 'Website Mistakes That Kill Trust in the First 10 Seconds',
    description: 'The most common website mistakes that make a visitor leave before they even understand the offer.',
    category: 'Conversion',
    readTime: '5 min read',
    date: 'May 12, 2026',
    intro: 'Visitors do not read your site patiently. They scan it for cues that tell them whether you look credible, clear, and safe to buy from.',
    sections: [
      {
        heading: '1. A vague headline',
        body: 'If the first message sounds like ad smoke instead of a clear service promise, trust drops fast.',
      },
      {
        heading: '2. Too much visual noise',
        body: 'Weak hierarchy, cluttered sections, and unnecessary effects usually make the site feel cheaper, not more impressive.',
      },
      {
        heading: '3. No proof',
        body: 'Without examples, case studies, visible ownership, or trust signals, the visitor is forced to guess.',
      },
      {
        heading: '4. A weak mobile experience',
        body: 'If the site feels slow, broken, or awkward on mobile, many people leave before they read even a full screen.',
      },
    ],
    ctaLabel: 'Improve your site',
    ctaHref: 'https://cal.com/georgi-karchev-3r9puz/30min',
    backHref: '/en/blog',
    backLabel: 'Back to blog',
    relatedServiceHref: '/en/website-development',
    relatedServiceLabel: 'Website development for service businesses',
    metadata: {
      title: 'Website Mistakes That Kill Trust',
      description: 'Common website mistakes that weaken trust and conversion in the first few seconds.',
      alternates: localizedAlternates('/bg/blog/greshkite-v-saita-koito-ubivat-doverieto', '/en/blog/website-mistakes-that-kill-trust', 'en'),
      keywords: ['website mistakes that kill trust', 'conversion trust signals', 'service business website trust'],
    },
  },
}

export const bgBlogArticles = [
  localizedArticles.bgWebsiteCost,
  localizedArticles.bgSmallBusinessWebsiteNeeds,
  localizedArticles.bgLandingPageInsteadOfWebsite,
  localizedArticles.bgAiAutomationTimeSavings,
  localizedArticles.bgWebsiteTrustMistakes,
]

export const enBlogArticles = [
  localizedArticles.enWebsiteCost,
  localizedArticles.enSmallBusinessWebsiteNeeds,
  localizedArticles.enLandingPageInsteadOfWebsite,
  localizedArticles.enAiAutomationTimeSavings,
  localizedArticles.enWebsiteTrustMistakes,
]

export const caseStudies: Record<string, CaseStudyDefinition> = {
  bgEditing: {
    locale: 'bg',
    path: '/bg/kazusi/editing-bg',
    title: 'Editing.bg — marketplace логика, сайт и automation мислене в едно',
    description: 'Платформа, която трябваше да изглежда ясна за клиента, но и да работи гладко за екипа зад нея.',
    client: 'Editing.bg',
    category: 'Казус · Уеб & Автоматизация',
    challenge: 'Проектът изискваше едновременно ясно UX изживяване, доверие към услугата и логика, която не товари екипа с излишни ръчни стъпки.',
    solution: [
      'Ясна структура около услугата и marketplace логиката.',
      'UX, който показва стойността бързо и не губи потребителя в шум.',
      'Automation-first мислене за процесите зад самата платформа.',
    ],
    outcome: [
      'По-подредено представяне на услугата и платформата.',
      'По-силен bridge между front-end изживяването и operational flow-а.',
      'Основа, върху която сайтът и процесите могат да се надграждат заедно.',
    ],
    metrics: [
      { label: 'Тип проект', value: 'Marketplace' },
      { label: 'Фокус', value: 'Automation' },
      { label: 'Роля', value: 'UX + Build' },
    ],
    liveUrl: 'https://editing.bg/',
    image: '/img/editingbg.png',
    metadata: {
      title: 'Казус: Editing.bg',
      description: 'Как структурираме marketplace сайт и automation логика така, че да работят като една система.',
      alternates: localizedAlternates('/bg/kazusi/editing-bg', '/en/case-studies/editing-bg', 'bg'),
    },
  },
  enEditing: {
    locale: 'en',
    path: '/en/case-studies/editing-bg',
    title: 'Editing.bg — where marketplace UX and automation logic had to work together',
    description: 'A platform that needed to feel clear for users while staying operationally practical behind the scenes.',
    client: 'Editing.bg',
    category: 'Case Study · Web & Automation',
    challenge: 'The platform had to communicate value clearly on the front-end while reducing internal friction in the workflow behind it.',
    solution: [
      'A clearer structure around the offer and the platform model.',
      'UX that highlights value early instead of burying it in clutter.',
      'Automation-minded decisions in the parts users do not see but teams feel every day.',
    ],
    outcome: [
      'A stronger bridge between front-end trust and operational practicality.',
      'Cleaner presentation of the platform and service.',
      'A foundation where the website and the workflow can evolve together.',
    ],
    metrics: [
      { label: 'Project type', value: 'Marketplace' },
      { label: 'Focus', value: 'Automation' },
      { label: 'Role', value: 'UX + Build' },
    ],
    liveUrl: 'https://editing.bg/',
    image: '/img/editingbg.png',
    metadata: {
      title: 'Case Study: Editing.bg',
      description: 'How we approached a platform where marketplace UX and automation thinking needed to support each other.',
      alternates: localizedAlternates('/bg/kazusi/editing-bg', '/en/case-studies/editing-bg', 'en'),
    },
  },
  bgYordan: {
    locale: 'bg',
    path: '/bg/kazusi/yordan-kolev',
    title: 'Yordan Kolev — личен бранд сайт с фокус върху доверие и ясна оферта',
    description: 'Персонален сайт, който трябва да превърне вниманието към личния бранд в по-ясна бизнес оферта и по-силен conversion flow.',
    client: 'Yordan Kolev',
    category: 'Казус · Личен Бранд',
    challenge: 'При личните брандове рискът е сайтът да стане само визитка. Тук целта беше да работи като доверителен asset и да води към реално действие.',
    solution: [
      'Структура, която подрежда личния бранд около резултатите и офертата.',
      'По-изчистено насочване към CTA вместо разсейващи елементи.',
      'Сайт, който изглежда сериозно и помага на позиционирането, не просто да стои красиво.',
    ],
    outcome: [
      'По-ясно представяне на експертизата и офертата.',
      'По-силен trust layer за първи контакт.',
      'Страница, която е по-полезна за organic, direct и referral трафик едновременно.',
    ],
    metrics: [
      { label: 'Тип сайт', value: 'Personal Brand' },
      { label: 'Фокус', value: 'Trust + CTA' },
      { label: 'Подход', value: 'Offer-first' },
    ],
    liveUrl: 'https://yordankolev.com/',
    image: '/img/yordankolev.png',
    metadata: {
      title: 'Казус: Yordan Kolev',
      description: 'Как personal brand сайтът на Yordan Kolev беше структуриран около доверие, яснота и conversion logic.',
      alternates: localizedAlternates('/bg/kazusi/yordan-kolev', '/en/case-studies/yordan-kolev', 'bg'),
    },
  },
  enYordan: {
    locale: 'en',
    path: '/en/case-studies/yordan-kolev',
    title: 'Yordan Kolev — a personal brand site built around trust and a clearer offer',
    description: 'A personal brand website designed to turn attention into a stronger business proposition and cleaner conversion path.',
    client: 'Yordan Kolev',
    category: 'Case Study · Personal Brand',
    challenge: 'Personal brand sites often become decorative biographies. The goal here was to make the site function as a trust asset that moves visitors toward action.',
    solution: [
      'An offer-first structure instead of a generic personal profile layout.',
      'Cleaner CTA direction and less visual noise.',
      'Positioning that supports credibility and business intent at the same time.',
    ],
    outcome: [
      'Clearer presentation of expertise and offer.',
      'A stronger trust layer for first-time visitors.',
      'A page that supports organic, direct, and referral traffic more effectively.',
    ],
    metrics: [
      { label: 'Site type', value: 'Personal Brand' },
      { label: 'Focus', value: 'Trust + CTA' },
      { label: 'Approach', value: 'Offer-first' },
    ],
    liveUrl: 'https://yordankolev.com/',
    image: '/img/yordankolev.png',
    metadata: {
      title: 'Case Study: Yordan Kolev',
      description: 'How we structured Yordan Kolev’s personal brand site around trust, clarity, and conversion logic.',
      alternates: localizedAlternates('/bg/kazusi/yordan-kolev', '/en/case-studies/yordan-kolev', 'en'),
    },
  },
}
