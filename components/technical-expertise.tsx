'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Server,
  BrainCircuit,
  Wrench,
  ArrowRight,
  Layers,
  ShieldCheck,
  Database,
  Link2,
  Bot,
  Cloud,
} from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiGreensock,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiGooglegemini,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiLinux,
} from 'react-icons/si';
import { TbBrandOpenai, TbApi, TbInfinity } from 'react-icons/tb';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/language-context';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillCardData {
  id: string;
  title: string;
  icon: React.ElementType;
  col1: string[];
  col2: string[];
  techLogos: {
    name: string;
    icon: React.ElementType;
    colorClass: string;
    isCustom?: boolean;
    customContent?: React.ReactNode;
  }[];
}

const EXPERTISE_CARDS: SkillCardData[] = [
  {
    id: 'frontend',
    title: 'FRONTEND ENGINEERING',
    icon: Monitor,
    col1: ['React.js', 'Next.js', 'TypeScript', 'JavaScript'],
    col2: ['Tailwind CSS', 'Redux Toolkit', 'GSAP'],
    techLogos: [
      { name: 'React', icon: SiReact, colorClass: 'text-[#00D8FF]' },
      { name: 'Next.js', icon: SiNextdotjs, colorClass: 'text-slate-900 dark:text-white' },
      { name: 'TypeScript', icon: SiTypescript, colorClass: 'text-[#3178C6]' },
      { name: 'JavaScript', icon: SiJavascript, colorClass: 'text-[#F7DF1E]' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, colorClass: 'text-[#38BDF8]' },
      { name: 'Redux', icon: SiRedux, colorClass: 'text-[#764ABC]' },
      {
        name: 'GSAP',
        icon: SiGreensock,
        colorClass: 'text-[#88CE02]',
        isCustom: true,
        customContent: (
          <span className="inline-flex items-center gap-1 font-bold text-[11px] text-[#88CE02] font-mono tracking-tight">
            <SiGreensock className="w-3.5 h-3.5" />
            <span>GSAP</span>
          </span>
        ),
      },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND ENGINEERING',
    icon: Server,
    col1: ['Node.js', 'Express.js', 'REST APIs', 'PostgreSQL'],
    col2: ['Prisma ORM', 'Supabase', 'Authentication & Authorization'],
    techLogos: [
      { name: 'Node.js', icon: SiNodedotjs, colorClass: 'text-[#5FA04E]' },
      {
        name: 'Express',
        icon: SiExpress,
        colorClass: 'text-slate-800 dark:text-slate-200',
        isCustom: true,
        customContent: (
          <span className="text-[12px] font-mono font-bold text-slate-800 dark:text-slate-200">ex</span>
        ),
      },
      {
        name: 'REST APIs',
        icon: TbApi,
        colorClass: 'text-primary-600 dark:text-primary-400',
        isCustom: true,
        customContent: (
          <span className="w-5 h-5 rounded-[4px] border border-primary-500/40 flex items-center justify-center text-[9px] font-bold text-primary-600 dark:text-primary-400 font-mono">
            API
          </span>
        ),
      },
      { name: 'PostgreSQL', icon: SiPostgresql, colorClass: 'text-[#4169E1]' },
      { name: 'Prisma', icon: SiPrisma, colorClass: 'text-slate-900 dark:text-white' },
      { name: 'Supabase', icon: SiSupabase, colorClass: 'text-[#3ECF8E]' },
      { name: 'Auth', icon: ShieldCheck, colorClass: 'text-primary-600 dark:text-primary-400' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & MACHINE LEARNING',
    icon: BrainCircuit,
    col1: [
      'LLM Integration',
      'Retrieval-Augmented Generation (RAG)',
      'Vector Search',
    ],
    col2: ['Embeddings', 'AI Agents', 'Gemini API'],
    techLogos: [
      { name: 'OpenAI', icon: TbBrandOpenai, colorClass: 'text-slate-900 dark:text-white' },
      {
        name: 'Vector Search',
        icon: Database,
        colorClass: 'text-primary-600 dark:text-primary-400',
        isCustom: true,
        customContent: (
          <div className="flex items-center text-primary-600 dark:text-primary-400">
            <Database className="w-4 h-4" />
          </div>
        ),
      },
      { name: 'LangChain', icon: Link2, colorClass: 'text-teal-600 dark:text-teal-400' },
      { name: 'AI Agents', icon: Bot, colorClass: 'text-primary-600 dark:text-primary-400' },
      {
        name: 'Gemini',
        icon: SiGooglegemini,
        colorClass: 'text-primary-600 dark:text-primary-400',
        isCustom: true,
        customContent: (
          <span className="inline-flex items-center gap-1 font-semibold text-xs text-primary-600 dark:text-primary-400">
            <SiGooglegemini className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium tracking-tight">Gemini</span>
          </span>
        ),
      },
    ],
  },
  {
    id: 'tools-infra',
    title: 'TOOLS & INFRASTRUCTURE',
    icon: Wrench,
    col1: ['Git & GitHub', 'Docker', 'Vercel'],
    col2: ['Linux', 'CI/CD', 'API Integration'],
    techLogos: [
      { name: 'Git', icon: SiGit, colorClass: 'text-[#F05032]' },
      { name: 'GitHub', icon: SiGithub, colorClass: 'text-slate-900 dark:text-white' },
      { name: 'Docker', icon: SiDocker, colorClass: 'text-[#2496ED]' },
      { name: 'Vercel', icon: SiVercel, colorClass: 'text-slate-900 dark:text-white' },
      { name: 'Linux', icon: SiLinux, colorClass: 'text-amber-500 dark:text-amber-400' },
      { name: 'CI/CD', icon: TbInfinity, colorClass: 'text-primary-600 dark:text-primary-400' },
      {
        name: 'API Cloud',
        icon: Cloud,
        colorClass: 'text-primary-600 dark:text-primary-400',
        isCustom: true,
        customContent: (
          <div className="relative flex items-center justify-center">
            <Cloud className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="absolute text-[8px] font-bold text-primary-700 dark:text-primary-200 mt-0.5">
              API
            </span>
          </div>
        ),
      },
    ],
  },
];

export default function TechnicalExpertise() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation for the left column content
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Sequential entrance for the 4 skill cards
      const cards = gsap.utils.toArray<HTMLElement>('.expertise-grid-card');
      if (cards && cards.length > 0 && cardsRef.current) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const badgeText = language !== 'en' ? t('expertise.badge') : 'TECHNICAL EXPERTISE';
  const descriptionText =
    language !== 'en'
      ? t('expertise.subheading')
      : 'Building scalable web applications, reliable backend systems, and AI-powered experiences through modern engineering and thoughtful architecture.';

  return (
    <section
      id="expertise"
      ref={sectionRef}
      aria-labelledby="technical-expertise-heading"
      className="relative py-24 md:py-28 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow matching project theme */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-br from-primary-600/10 via-secondary-500/5 to-transparent dark:from-primary-500/10 dark:via-secondary-500/5 blur-[140px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-gradient-to-tl from-primary-600/10 via-secondary-600/5 to-transparent dark:from-primary-500/10 dark:via-secondary-600/5 blur-[130px] pointer-events-none -z-10"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col justify-between h-full pt-2"
          >
            <div>
              {/* Eyebrow badge matching project theme */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800 text-primary-600 dark:text-primary-400 text-[12px] font-semibold tracking-[0.04em] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 inline-block" />
                {badgeText}
              </div>

              {/* Main Heading matching project theme font sizes and typography */}
              <h2
                id="technical-expertise-heading"
                className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100 leading-[1.15] mb-4"
              >
                Engineering <br />
                <span className="text-primary-600 dark:text-primary-400">Mastery</span> <br />
                <span className="text-slate-500 dark:text-slate-400 font-normal text-2xl sm:text-3xl lg:text-[34px] leading-tight block mt-1">
                  crafted to scale.
                </span>
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed mb-8">
                {descriptionText}
              </p>

              {/* CTA Button matching standard project button style */}
              <div className="mb-12">
                <Link href="#projects">
                  <button className="h-[40px] px-6 bg-primary-600 text-white font-medium text-[15px] rounded-[6px] hover:bg-primary-700 transition-all inline-flex items-center justify-center gap-2 group shadow-md shadow-primary-600/20">
                    <span>{language !== 'en' ? t('hero.viewProjects') : 'View My Projects'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl-flip" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Bottom Profile Badge & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-[6px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
                <div className="w-8 h-8 rounded-[6px] bg-primary-50 dark:bg-slate-800 border border-primary-100 dark:border-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100 tracking-wide leading-tight">
                    Full-Stack & AI Engineer
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5">
                    Modern Web • Scalable Systems • Intelligent Solutions
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-snug flex items-center gap-2">
                <span className="w-4 h-[1px] bg-primary-500/40 hidden sm:inline-block shrink-0" />
                <span>Building the future with modern technologies.</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: 2x2 SKILL CARDS ================= */}
          <div
            ref={cardsRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {EXPERTISE_CARDS.map((card) => {
              const CategoryIcon = card.icon;

              return (
                <div
                  key={card.id}
                  className="expertise-grid-card group relative rounded-[6px] p-6 sm:p-7 bg-slate-50/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-primary-500/40 dark:hover:border-primary-500/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon + Category Title */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-10 h-10 rounded-[6px] bg-primary-50 dark:bg-slate-800 border border-primary-100 dark:border-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-semibold tracking-wider text-slate-900 dark:text-slate-100 uppercase">
                        {card.title}
                      </h3>
                    </div>

                    {/* 2-Column Skills List with Theme Bullet Dots */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-7">
                      {/* Left Column */}
                      <div className="flex flex-col gap-2.5">
                        {card.col1.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-tight"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 shrink-0 mt-1" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col gap-2.5">
                        {card.col2.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-tight"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 shrink-0 mt-1" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row of Recognizable Tech Brand Icons */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center flex-wrap gap-3 sm:gap-3.5">
                    {card.techLogos.map((tech) => {
                      const TechIcon = tech.icon;

                      if (tech.isCustom && tech.customContent) {
                        return (
                          <div
                            key={tech.name}
                            title={tech.name}
                            className="flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-200"
                          >
                            {tech.customContent}
                          </div>
                        );
                      }

                      return (
                        <div
                          key={tech.name}
                          title={tech.name}
                          className={`opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-200 ${tech.colorClass}`}
                        >
                          <TechIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}