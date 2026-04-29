"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

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

  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 bg-[#f1f0ea] overflow-hidden"
    >
      <div className="container-wide mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
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
            <motion.a
              key={index}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 70, rotateX: 20, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={{
                y: -12,
                rotateX: -6,
                rotateY: index % 2 === 0 ? 4 : -4,
                scale: 1.03,
              }}
              transition={{
                delay: index * 0.09,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              style={{
                transformPerspective: 700,
                transformStyle: "preserve-3d",
              }}
              className="group relative rounded-2xl bg-[#e0ddcf] border border-[#2d232e] hover:border-[#534b52]/40 transition-all duration-300 overflow-hidden cursor-pointer block"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#f1f0ea]">
                <Image
                  src={site.img}
                  alt={site.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#f1f0ea]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-[#2d232e] font-semibold text-sm bg-[#e0ddcf]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#534b52]/30">
                    {t("portfolio.viewSite")}{" "}
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
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
                  <ArrowUpRight className="w-4 h-4 text-[#2d232e] group-hover:text-[#534b52] shrink-0 mt-0.5 transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
