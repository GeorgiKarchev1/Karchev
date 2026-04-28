"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Globe } from "lucide-react";

const content = {
  BG: {
    lang: "BG",
    switchLabel: "Read in English",
    category: "Уеб Разработка",
    readTime: "5 мин четене",
    date: "25 Април 2026",
    title: "Колко струва сайт за малък бизнес в България — честен отговор",
    intro:
      'Всеки път когато някой ни пита "колко струва един сайт?" знаем какво следва — или им даваме честен отговор и изглеждаме по-скъпи от съседната агенция, или им казваме "зависи" и звучим като всички останали. Решихме да изберем честния отговор.',
    sections: [
      {
        heading: "Защо цените са толкова различни?",
        body: 'Ако потърсиш в Google, ще видиш оферти от 150€ до 5000€ за "сайт за малък бизнес." Това не е измама — просто не се говори за едно и също нещо. Разликата е като между ръчно риза от зара и такава от Polo. И двете са ризи. Но не са едно и също.',
      },
      {
        heading: "Трите варианта и реалните им цени",
        subsections: [
          {
            title: "Шаблонен сайт — 100 до 300€",
            body: "Wix, Squarespace, готова WordPress тема. Бърз за правене, евтин, изглежда окей. Проблемът е, че изглежда като хиляди други сайтове и Google не го обича особено заради бавното зареждане. Подходящ е ако тепърва тестваш дали изобщо имаш нужда от онлайн присъствие и не искаш да рискуваш голяма инвестиция.",
          },
          {
            title: "Персонализиран сайт — 400 до 1300€",
            body: "Тук вече говорим за нещо направено специално за теб. Дизайн по мярка, бързо зареждане, структура която кара хората да се обаждат. Това е вариантът за ресторант, козметичен салон, адвокат, счетоводител — всеки бизнес, който иска сайтът му реално да работи. Повечето наши клиенти влизат в тази категория.",
          },
          {
            title: "Онлайн магазин — 1000 до 3000€+",
            body: "Продуктова система, количка, плащания, управление на поръчки — това е различна история и по-голям проект. Цената расте с броя на продуктите и интеграциите, които са ти нужни.",
          },
        ],
      },
      {
        heading: "Скритите разходи за които никой не те предупреждава",
        list: [
          "Домейн — около 10-15€ на година",
          "Хостинг — 30 до 100€ на година, зависи от качеството",
          "Поддръжка — 25 до 75€ на месец ако искаш някой да следи за обновявания и сигурност",
          "Съдържание — снимки, текстове, видео. Това е отделна инвестиция и много хора го подценяват",
        ],
      },
      {
        heading: 'Защо някои агенции таксуват 2500€+ за "обикновен" сайт?',
        body: 'Понякога защото в цената влизат брандинг, копирайтинг и SEO стратегия — неща с реална стойност. Понякога просто защото могат. Въпросът, който трябва да зададеш не е "колко струва?" а "какво ще получа за тези пари?" Ако агенцията не може да ти отговори конкретно — бягай.',
      },
      {
        heading: "Какво правим ние?",
        body: "Работим в диапазона 400-1500€ за персонализирани сайтове и не приемаме проект ако не сме сигурни, че можем да донесем реален резултат. Ако смятаме, че ситуацията ти не изисква голяма инвестиция — ще ти го кажем директно. Ако искаш да разбереш точно какво ти трябва, запази безплатен разговор. 30 минути, без задължения, без глупости.",
      },
    ],
    cta: "Запази безплатен разговор",
    ctaLink: "https://cal.com/georgi-karchev-3r9puz/30min",
    back: "Назад към блога",
  },
  EN: {
    lang: "EN",
    switchLabel: "Прочети на Български",
    category: "Web Development",
    readTime: "5 min read",
    date: "April 25, 2026",
    title:
      "How Much Does a Website Cost for a Small Business in Bulgaria — an Honest Answer",
    intro:
      'Every time someone asks us "how much does a website cost?" we know what follows — either we give an honest answer and look more expensive than the agency next door, or we say "it depends" and sound like everyone else. We chose the honest answer.',
    sections: [
      {
        heading: "Why are prices so different?",
        body: "Search Google and you'll see offers from €150 to €5,000 for a \"small business website.\" This isn't a scam — they're just not talking about the same thing. The difference is like a hand-tailored shirt versus one from Zara. Both are shirts. But they're not the same thing.",
      },
      {
        heading: "The three options and their real prices",
        subsections: [
          {
            title: "Template website — €100 to €300",
            body: "Wix, Squarespace, a ready-made WordPress theme. Quick to make, cheap, looks okay. The problem is it looks like thousands of other sites and Google doesn't love it due to slow loading speeds. It's suitable if you're just testing whether you need an online presence at all and don't want to risk a large investment.",
          },
          {
            title: "Custom website — €400 to €1,300",
            body: "Here we're talking about something built specifically for you. Custom design, fast loading, structure that makes people pick up the phone. This is the option for restaurants, beauty salons, lawyers, accountants — any business that wants their site to actually work. Most of our clients fall into this category.",
          },
          {
            title: "Online store — €1,000 to €3,000+",
            body: "Product system, cart, payments, order management — this is a different story and a bigger project. The price grows with the number of products and integrations you need.",
          },
        ],
      },
      {
        heading: "The hidden costs nobody warns you about",
        list: [
          "Domain — around €10-15 per year",
          "Hosting — €30 to €100 per year depending on quality",
          "Maintenance — €25 to €75 per month if you want someone monitoring updates and security",
          "Content — photos, copy, video. This is a separate investment many people underestimate",
        ],
      },
      {
        heading: 'Why do some agencies charge €2,500+ for an "ordinary" site?',
        body: 'Sometimes because the price includes branding, copywriting, and SEO strategy — things with real value. Sometimes simply because they can. The question you should ask isn\'t "how much does it cost?" but "what will I get for that money?" If the agency can\'t answer you specifically — run.',
      },
      {
        heading: "What do we do?",
        body: "We work in the €400-€1,500 range for custom websites and don't accept a project unless we're confident we can deliver real results. If we think your situation doesn't require a large investment — we'll tell you directly. If you want to know exactly what you need, book a free call. 30 minutes, no obligations, no bullshit.",
      },
    ],
    cta: "Book a Free Call",
    ctaLink: "https://cal.com/georgi-karchev-3r9puz/30min",
    back: "Back to Blog",
  },
};

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default function BlogPostClient() {
  const [lang, setLang] = useState<"BG" | "EN">("BG");

  useEffect(() => {
    const userPref = getCookie("user-lang-preference");
    if (userPref === "EN" || userPref === "BG") {
      setLang(userPref);
      return;
    }
    const detected = getCookie("detected-country-lang");
    if (detected === "EN" || detected === "BG") setLang(detected);
  }, []);

  const c = content[lang];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.BG.title,
    description:
      "Цените за уебсайт варират от 150€ до 5000€. Ето честен разбор на трите варианта, скритите разходи и как да избереш правилното решение.",
    image: "https://www.karchx.com/img/og-image.png",
    datePublished: "2026-04-25T00:00:00.000Z",
    dateModified: "2026-04-25T00:00:00.000Z",
    author: {
      "@type": "Person",
      name: "Georgi Karchev",
      url: "https://www.karchx.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Karchev",
      url: "https://www.karchx.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.karchx.com/img/newfav.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.karchx.com/blog/kolko-struva-sait-za-malak-biznes",
    },
    inLanguage: lang === "BG" ? "bg" : "en",
    keywords:
      "уебсайт цена, колко струва сайт, website cost small business bulgaria",
    articleSection: "Web Development",
  };

  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />

      <article className="pt-36 pb-24 px-6 md:px-8 max-w-[760px] mx-auto">
        {/* Back + Lang toggle */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d232e]/60 hover:text-[#2d232e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {c.back}
          </Link>
          <button
            onClick={() => setLang(lang === "BG" ? "EN" : "BG")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#2d232e] text-sm font-bold hover:bg-[#2d232e] hover:text-[#f1f0ea] transition-all duration-200"
          >
            <Globe className="w-4 h-4" />
            {c.switchLabel}
          </button>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-widest text-[#534b52] border border-[#534b52]/30 px-3 py-1 rounded-full">
            {c.category}
          </span>
          <span className="text-xs text-[#2d232e]/40 font-medium">
            {c.date}
          </span>
          <span className="text-xs text-[#2d232e]/40 font-medium">·</span>
          <span className="text-xs text-[#2d232e]/40 font-medium">
            {c.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-[#2d232e] leading-tight tracking-tight mb-8">
          {c.title}
        </h1>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#534b52] rounded-full mb-10" />

        {/* Intro */}
        <p className="text-lg md:text-xl leading-relaxed text-[#2d232e]/80 mb-12 font-medium">
          {c.intro}
        </p>

        {/* Sections */}
        <div className="space-y-12">
          {c.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl md:text-2xl font-black text-[#2d232e] mb-4 leading-snug">
                {section.heading}
              </h2>

              {"body" in section && section.body && (
                <p className="text-base md:text-lg leading-relaxed text-[#2d232e]/75">
                  {section.body}
                </p>
              )}

              {"subsections" in section && section.subsections && (
                <div className="space-y-6 mt-2">
                  {section.subsections.map((sub, j) => (
                    <div
                      key={j}
                      className="pl-5 border-l-4 border-[#534b52]/30"
                    >
                      <h3 className="text-base md:text-lg font-bold text-[#2d232e] mb-2">
                        {sub.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#2d232e]/70">
                        {sub.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {"list" in section && section.list && (
                <ul className="mt-3 space-y-3">
                  {section.list.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-base leading-relaxed text-[#2d232e]/75"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#534b52] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 md:p-10 bg-[#2d232e] rounded-2xl border-2 border-[#2d232e] shadow-[4px_4px_0px_#534b52]">
          <a
            href={c.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f1f0ea] text-[#2d232e] text-sm font-black border-2 border-[#f1f0ea] hover:bg-[#534b52] hover:text-[#f1f0ea] hover:border-[#534b52] transition-all duration-300"
          >
            {c.cta} →
          </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}
