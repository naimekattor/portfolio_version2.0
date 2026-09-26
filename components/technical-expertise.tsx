'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/language-context';

interface SkillItem {
  name: string;
  level?: number;
}

interface ExpertiseDomain {
  number: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  glowColor: string;
  accentBadge?: string;
  chips?: string[];
  skills: string[];
}

const EXPERTISE_DOMAINS: ExpertiseDomain[] = [
  {
    number: '01',
    titleLine1: 'Sites web',
    titleLine2: 'sur mesure',
    description:
      "Des sites d'exception, conçus pour refléter votre identité et convertir avec élégance.",
    image: '/images/expertise/prisms.jpg',
    glowColor: 'bg-cyan-500/20 dark:bg-cyan-400/15',
    accentBadge: 'Next.js & React',
    skills: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'State & SSR'],
  },
  {
    number: '02',
    titleLine1: 'Expériences',
    titleLine2: 'interactives',
    description:
      'Animations, micro-interactions et interfaces immersives qui marquent les esprits.',
    image: '/images/expertise/orb.jpg',
    glowColor: 'bg-fuchsia-500/20 dark:bg-purple-400/15',
    chips: ['+ Trigger', 'Animation', 'Action'],
    skills: ['Framer Motion', 'Agentic AI', 'LangChain', 'Workflows', 'n8n'],
  },
  {
    number: '03',
    titleLine1: 'E-commerce',
    titleLine2: 'haute performance',
    description:
      'Des plateformes rapides, sécurisées et optimisées pour la croissance et le scaling.',
    image: '/images/expertise/ecommerce.jpg',
    glowColor: 'bg-rose-500/20 dark:bg-rose-400/15',
    skills: ['Microservices', 'Node.js', 'Go APIs', 'Stripe / Payments', 'PostgreSQL'],
  },
  {
    number: '04',
    titleLine1: 'Webflow & Cloud',
    titleLine2: 'development',
    description:
      'Des architectures modulaires, maintenables et ultra performantes au déploiement mondial.',
    image: '/images/expertise/browser.jpg',
    glowColor: 'bg-sky-500/20 dark:bg-sky-400/15',
    skills: ['Docker', 'Vercel Edge', 'Cloudflare', 'AWS S3', 'Serverless'],
  },
  {
    number: '05',
    titleLine1: 'Design system',
    titleLine2: '& UI/UX',
    description:
      'Des systèmes de design cohérents et des interfaces pensées pour une ergonomie optimale.',
    image: '/images/expertise/layers.jpg',
    glowColor: 'bg-amber-500/20 dark:bg-amber-400/15',
    skills: ['Component Systems', 'Prisma ORM', 'Redis Cache', 'Figma Sync', 'A11y'],
  },
  {
    number: '06',
    titleLine1: 'Optimisation',
    titleLine2: '& SEO technique',
    description:
      'Des performances optimales et une structure technique prête à supporter des millions de requêtes.',
    image: '/images/expertise/terrain.jpg',
    glowColor: 'bg-emerald-500/20 dark:bg-emerald-400/15',
    skills: ['Sub-100ms APIs', 'Core Web Vitals', 'Schema SEO', 'Auth & JWT', 'High Uptime'],
  },
];

// English localized fallbacks if language is set to English
const ENGLISH_TITLES: Record<string, { t1: string; t2: string; desc: string }> = {
  '01': {
    t1: 'Modern Web',
    t2: 'Architecture',
    desc: 'Bespoke web platforms built with cutting-edge frameworks, uncompromising speed, and strict type safety.',
  },
  '02': {
    t1: 'Interactive &',
    t2: 'AI Systems',
    desc: 'Immersive micro-interactions, autonomous AI agents, and frictionless automated workflows.',
  },
  '03': {
    t1: 'High-Throughput',
    t2: 'E-Commerce',
    desc: 'Resilient, secure transaction engines optimized for global scalability and sub-second checkout.',
  },
  '04': {
    t1: 'Cloud & Edge',
    t2: 'Infrastructure',
    desc: 'Scalable containerized clusters, global edge caching, and zero-downtime automated pipelines.',
  },
  '05': {
    t1: 'Design Systems',
    t2: '& Data Layers',
    desc: 'Reusable component design tokens backed by optimized SQL schemas and distributed in-memory cache.',
  },
  '06': {
    t1: 'Performance &',
    t2: 'Security Audit',
    desc: 'Sub-100ms latency targets, 99.9% uptime reliability, and enterprise-grade authentication protocols.',
  },
};

export default function TechnicalExpertise() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFrench = language === 'fr';

  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header Matching Design */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span>{isFrench ? 'SERVICES' : 'TECHNICAL EXPERTISE'}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.08]">
              {isFrench ? 'Solutions digitales' : 'Engineering Mastery'}
              <br />
              <span className="font-serif italic font-normal tracking-tight text-slate-700 dark:text-slate-300">
                {isFrench ? 'sur mesure.' : 'crafted to scale.'}
              </span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-normal">
            {isFrench
              ? 'Nous concevons des expériences web performantes, élégantes et évolutives pour des marques ambitieuses.'
              : 'Architecting high-throughput web applications, resilient distributed backends, and agentic AI systems that drive measurable impact.'}
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {EXPERTISE_DOMAINS.map((domain, index) => {
            const localized = !isFrench ? ENGLISH_TITLES[domain.number] : null;
            const title1 = localized ? localized.t1 : domain.titleLine1;
            const title2 = localized ? localized.t2 : domain.titleLine2;
            const desc = localized ? localized.desc : domain.description;

            return (
              <motion.div
                key={domain.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative h-[360px] sm:h-[390px] p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xs hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle colorful glow orb positioned behind the 3D art */}
                <div
                  className={`absolute -right-8 -bottom-8 w-60 h-60 rounded-full blur-3xl opacity-40 dark:opacity-30 ${domain.glowColor} pointer-events-none transition-opacity duration-500 group-hover:opacity-70`}
                />

                {/* 3D Glass Artwork positioned right/bottom */}
                <div className="absolute -right-6 -bottom-6 sm:-right-4 sm:-bottom-4 w-52 sm:w-60 h-52 sm:h-60 pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-108 group-hover:-rotate-1">
                  <img
                    src={domain.image}
                    alt={`${title1} ${title2}`}
                    className="w-full h-full object-contain relative z-10 [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] mix-blend-multiply dark:mix-blend-screen opacity-95 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Floating Chips on Card 2 (Interactions / Workflow) */}
                {domain.chips && (
                  <div className="absolute right-5 sm:right-7 top-10 z-20 flex flex-col gap-2 pointer-events-none">
                    <div className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm flex items-center gap-1.5 transition-transform duration-500 group-hover:-translate-y-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                      {domain.chips[0]}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm flex items-center gap-1.5 ml-3 transition-transform duration-500 group-hover:translate-x-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {domain.chips[1]}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm flex items-center gap-1.5 transition-transform duration-500 group-hover:translate-y-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {domain.chips[2]}
                    </div>
                  </div>
                )}

                {/* Card Top Text Header */}
                <div className="relative z-10">
                  <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider block mb-3">
                    {domain.number}
                  </span>

                  <h3 className="text-xl sm:text-[23px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-3 max-w-[210px]">
                    {title1}
                    <br />
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      {title2}
                    </span>
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mb-3 line-clamp-3">
                    {desc}
                  </p>
                </div>

                {/* Card Bottom: Interactive Round Arrow Button + Skill Tags on Hover */}
                <div className="relative z-10 flex items-center justify-between pt-4">
                  <Link
                    href="/contact"
                    className="w-10 h-10 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 dark:group-hover:text-white shadow-md"
                    aria-label={`Explore ${title1} ${title2}`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>

                  {/* Micro skill badges */}
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    <span>{domain.skills[0]}</span>
                    <span>•</span>
                    <span>{domain.skills[1]}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}