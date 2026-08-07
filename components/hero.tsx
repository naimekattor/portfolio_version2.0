"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGrid } from "./ui/grid-background";
import Link from "next/link";
import { useLanguage } from "../context/language-context";

const DEFAULT_HERO = {
  badgeText: "Available for new projects",
  badgeDotPulse: true,
  titleLine1: "Full-Stack Developer Building",
  titleHighlight: "Scalable AI-Powered",
  titleLine2: "Web Applications",
  description:
    "I bridge the gap between complex technical problems and elegant, production-ready solutions that deliver real business value.",
  primaryCtaText: "View Projects",
  primaryCtaLink: "#projects",
  secondaryCtaText: "Download Resume",
  secondaryCtaLink:
    "https://drive.google.com/file/d/1wlKh0G_yN_v7uOFnVjonwCqk9_ROxuPB/view?usp=sharing",
};

export function Hero() {
  const [hero, setHero] = useState(DEFAULT_HERO);
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchHeroSettings() {
      try {
        const res = await fetch("http://localhost:4000/api/v1/site-settings");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.hero_section) {
            setHero((prev) => ({ ...prev, ...json.data.hero_section }));
          }
        }
      } catch (err) {
        console.error("Failed to load hero settings:", err);
      }
    }
    fetchHeroSettings();
  }, []);

  const badgeText = language !== "en" ? t("hero.badge") : hero.badgeText;
  const titleLine1 = language !== "en" ? t("hero.title") : hero.titleLine1;
  const descriptionText =
    language !== "en" ? t("hero.subheading") : hero.description;
  const primaryCta =
    language !== "en" ? t("hero.viewProjects") : hero.primaryCtaText;

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <AnimatedGrid className="z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {badgeText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 dark:bg-slate-900 border border-secondary-100 dark:border-slate-800 text-secondary-600 dark:text-secondary-400 text-xs font-bold uppercase tracking-wider mb-6"
            >
              {hero.badgeDotPulse && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
                </span>
              )}
              {badgeText}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-8"
          >
            <span className="text-primary-600 dark:text-primary-400">{titleLine1}</span>{" "}
            {language === "en" && hero.titleHighlight && (
              <span className="text-secondary-600">{hero.titleHighlight} </span>
            )}
            {language === "en" && hero.titleLine2 && (
              <span className="text-primary-600 dark:text-primary-400">{hero.titleLine2}</span>
            )}
          </motion.h1>

          {descriptionText && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed"
            >
              {descriptionText}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {primaryCta && (
              <Link href={hero.primaryCtaLink || "/projects"}>
                <button className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary-600/20 w-full sm:w-auto">
                  {primaryCta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl-flip" />
                </button>
              </Link>
            )}

            {hero.secondaryCtaText && (
              <a
                target={
                  hero.secondaryCtaLink?.startsWith("http") ? "_blank" : "_self"
                }
                rel="noopener noreferrer"
                href={hero.secondaryCtaLink || "#"}
                className="inline-block"
              >
                <button className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all w-full sm:w-auto">
                  {hero.secondaryCtaText}
                </button>
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 -z-10 w-1/2 h-full pointer-events-none"
      >
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-400/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-400/20 rounded-full blur-[100px]"></div>
      </motion.div>
    </section>
  );
}
