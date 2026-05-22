"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const getPortfolioSites = (isBG: boolean) => [
  {
    name: "GBGamingHub",
    url: "https://www.gbgaminghub.com/",
    desc: isBG
      ? "Gaming платформа с общност, новини и ревюта за геймъри"
      : "Gaming platform with community, news and reviews for gamers",
    tag: isBG ? "Уеб Разработка" : "Web Development",
    img: "/img/gbgaminghub.png",
  },
  {
    name: "The Agency Course",
    url: "https://theagencycourse.bg/",
    desc: isBG
      ? "Онлайн курс за изграждане на агенция за видео монтаж"
      : "Online course for building a video editing agency",
    tag: isBG ? "Уеб Разработка" : "Web Development",
    img: "/img/theagency.png",
  },
  {
    name: "Editing.bg",
    url: "https://editing.bg/",
    desc: isBG
      ? "Пазар за видео монтажори — автоматизиран от А до Я"
      : "Marketplace for video editors — automated from A to Z",
    tag: isBG ? "Уеб & Автоматизация" : "Web & Automation",
    img: "/img/editingbg.png",
  },
  {
    name: "InPlayGear",
    url: "https://inplaygear.com/",
    desc: isBG
      ? "Онлайн магазин за спортна и outdoor екипировка"
      : "Online store for sports and outdoor equipment",
    tag: "E-commerce",
    img: "/img/inplaygear.png",
  },
  {
    name: "Готов за час",
    url: "https://gotovzachas.com/",
    desc: isBG
      ? "Платформа за ученици"
      : "Platform for quick booking of home services",
    tag: isBG ? "Уеб Разработка" : "Web Development",
    img: "/img/gotovzachas.png",
  },
  {
    name: "AI Marketing",
    url: "https://aimarketing.bg/",
    desc: isBG
      ? "Сайт за AI маркетинг агенция с блог и услуги"
      : "AI marketing agency site with blog and services",
    tag: isBG ? "Уеб & Контент" : "Web & Content",
    img: "/img/aimarketing.png",
  },
  {
    name: "Yordan Kolev",
    url: "https://yordankolev.com/",
    desc: isBG
      ? "Сайт за личен бранд с висока конверсия за коуч и предприемач"
      : "High-converting personal brand site for a coach and entrepreneur",
    tag: isBG ? "Уеб Разработка" : "Web Development",
    img: "/img/yordankolev.png",
  },
  {
    name: "Eterika",
    url: "https://www.eterika.eu/",
    desc: isBG
      ? "Модерен уебсайт за Eterika с чист, професионален дизайн"
      : "Modern website for Eterika with clean, professional design",
    tag: isBG ? "Уеб Разработка" : "Web Development",
    img: "/img/eterika.png",
  },
];

export default function WhoItsFor() {
  const { t, language } = useLanguage();
  const portfolioSites = getPortfolioSites(language === "BG");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Heading reveal
      gsap.from(".portfolio-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".portfolio-heading", start: "top 85%" },
      });

      // Simple stagger fade + rise — works great on every screen size
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="portfolio"
      className="py-20 md:py-32 bg-[#f1f0ea] overflow-hidden"
    >
      <div className="container-wide mx-auto">
        <div className="portfolio-heading mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="text-sm font-mono text-[#534b52] mb-4 tracking-widest uppercase">
              {t("portfolio.eyeBrow")}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#2d232e]">
              {t("portfolio.titleP1")}{" "}
              <span className="border-b-2 border-[#534b52] pb-1">
                {t("portfolio.titleHighlight")}
              </span>
            </h2>
          </div>
          <p className="text-[#2d232e] text-lg max-w-md font-light leading-relaxed">
            {t("portfolio.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioSites.map((site, index) => (
            <a
              key={index}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card group relative rounded-2xl bg-[#e0ddcf] border border-[#2d232e] overflow-hidden cursor-pointer block transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_40px_-12px_rgba(45,35,46,0.25)] hover:border-[#534b52]/50 will-change-transform"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#f1f0ea]">
                <Image
                  src={site.img}
                  alt={site.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d232e]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="p-6">
                <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold mb-3 border border-[#534b52]/25 bg-[#534b52]/8 text-[#534b52]">
                  {site.tag}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-[#2d232e] mb-1">
                      {site.name}
                    </h3>
                    <p className="text-[#2d232e] text-sm leading-relaxed">
                      {site.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#2d232e] group-hover:text-[#534b52] shrink-0 mt-0.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
