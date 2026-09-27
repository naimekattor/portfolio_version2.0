'use client';

import React, { useEffect, useRef } from 'react';
import {
  Layout,
  Server,
  BrainCircuit,
  Terminal,
  Code2,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Cpu,
  Database,
  Compass,
  Layers,
  Bot,
  GitBranch,
  Link2,
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
  SiDocker,
  SiVercel,
  SiLinux,
} from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillItem {
  name: string;
  icon: React.ElementType;
}

interface SkillCategory {
  id: string;
  number: string;
  title: string;
  tagline: string;
  highlight: string;
  icon: React.ElementType;
  accent: {
    text: string;
    border: string;
    bg: string;
    glow: string;
    badgeHover: string;
    iconColor: string;
  };
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'FRONTEND ENGINEERING',
    tagline: 'Client-side architecture & fluid, responsive interfaces',
    highlight: 'SSR • Fluid Motion • Strict Typing',
    icon: Layout,
    accent: {
      text: 'text-sky-600 dark:text-sky-400',
      border: 'border-sky-500/20 group-hover:border-sky-500/40',
      bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      glow: 'from-sky-500/10 to-transparent',
      badgeHover: 'hover:border-sky-500/40 hover:bg-sky-50/50 dark:hover:bg-sky-950/30',
      iconColor: 'text-sky-500',
    },
    skills: [
      { name: 'React.js', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Redux Toolkit', icon: SiRedux },
      { name: 'GSAP', icon: SiGreensock },
    ],
  },
  {
    id: 'backend',
    number: '02',
    title: 'BACKEND ENGINEERING',
    tagline: 'Resilient APIs, relational data modeling & auth security',
    highlight: 'ACID Compliance • REST APIs • ORM',
    icon: Server,
    accent: {
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/20 group-hover:border-emerald-500/40',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      glow: 'from-emerald-500/10 to-transparent',
      badgeHover: 'hover:border-emerald-500/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30',
      iconColor: 'text-emerald-500',
    },
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'REST APIs', icon: Globe },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Prisma ORM', icon: SiPrisma },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Authentication & Authorization', icon: ShieldCheck },
    ],
  },
  {
    id: 'ai-ml',
    number: '03',
    title: 'AI & MACHINE LEARNING',
    tagline: 'Context retrieval, vector similarity & autonomous agents',
    highlight: 'Vector Search • RAG Pipelines • LLMs',
    icon: BrainCircuit,
    accent: {
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500/20 group-hover:border-purple-500/40',
      bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      glow: 'from-purple-500/10 to-transparent',
      badgeHover: 'hover:border-purple-500/40 hover:bg-purple-50/50 dark:hover:bg-purple-950/30',
      iconColor: 'text-purple-500',
    },
    skills: [
      { name: 'LLM Integration', icon: Cpu },
      { name: 'Retrieval-Augmented Generation (RAG)', icon: Database },
      { name: 'Vector Search', icon: Compass },
      { name: 'Embeddings', icon: Layers },
      { name: 'AI Agents', icon: Bot },
      { name: 'Gemini API', icon: SiGooglegemini },
    ],
  },
  {
    id: 'tools-infra',
    number: '04',
    title: 'TOOLS & INFRASTRUCTURE',
    tagline: 'Containerized environments, automated CI/CD & edge delivery',
    highlight: 'Dockerized Services • GitOps • Edge Runtime',
    icon: Terminal,
    accent: {
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500/20 group-hover:border-amber-500/40',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      glow: 'from-amber-500/10 to-transparent',
      badgeHover: 'hover:border-amber-500/40 hover:bg-amber-50/50 dark:hover:bg-amber-950/30',
      iconColor: 'text-amber-500',
    },
    skills: [
      { name: 'Git & GitHub', icon: SiGit },
      { name: 'Docker', icon: SiDocker },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Linux', icon: SiLinux },
      { name: 'CI/CD', icon: GitBranch },
      { name: 'API Integration', icon: Link2 },
    ],
  },
];

export default function TechnicalExpertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation for the section header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 2. Sequential card entrance animation
      const cards = gsap.utils.toArray<HTMLElement>('.expertise-card');
      if (cards && cards.length > 0 && cardsContainerRef.current) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      aria-labelledby="technical-expertise-heading"
      className="relative py-24 md:py-32 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-primary-500/5 via-sky-500/5 to-purple-500/5 blur-[120px] pointer-events-none -z-10"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20"
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800 text-primary-600 dark:text-primary-400 text-[12px] font-semibold tracking-[0.04em] uppercase mb-4 shadow-2xs">
              <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>TECHNICAL EXPERTISE</span>
            </div>

            {/* Main Heading & Subtitle */}
            <h2
              id="technical-expertise-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100 leading-[1.12]"
            >
              Engineering Mastery{' '}
              <span className="font-serif italic font-normal text-slate-600 dark:text-slate-400 block sm:inline">
                crafted to scale.
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Building scalable web applications, reliable backend systems, and
            AI-powered experiences through modern engineering and thoughtful
            architecture.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {SKILL_CATEGORIES.map((category) => {
            const CategoryIcon = category.icon;

            return (
              <div
                key={category.id}
                className="expertise-card group relative p-7 sm:p-8 rounded-[6px] border border-slate-200/80 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top-corner radial glow on hover */}
                <div
                  aria-hidden="true"
                  className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.accent.glow} pointer-events-none`}
                />

                <div>
                  {/* Top Bar: Icon + Category Number & Count */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-[6px] flex items-center justify-center border ${category.accent.border} ${category.accent.bg} transition-colors duration-300 shadow-2xs`}
                      >
                        <CategoryIcon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
                          CATEGORY {category.number}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-snug">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
                      {category.skills.length} Skills
                    </span>
                  </div>

                  {/* Category Tagline */}
                  <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {category.tagline}
                  </p>

                  {/* Skill Badges */}
                  <div
                    className="flex flex-wrap gap-2 sm:gap-2.5 mb-6"
                    role="list"
                    aria-label={`${category.title} Skills`}
                  >
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon;

                      return (
                        <span
                          key={skill.name}
                          role="listitem"
                          className={`group/badge inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-slate-100/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${category.accent.badgeHover} cursor-default`}
                        >
                          <SkillIcon
                            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/badge:scale-110 ${category.accent.iconColor}`}
                            aria-hidden="true"
                          />
                          <span>{skill.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer: Architecture / Focus Highlights */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${category.accent.text}`}
                      aria-hidden="true"
                    />
                    <span>{category.highlight}</span>
                  </div>

                  <span className="font-mono uppercase tracking-wider text-[10px] text-slate-400 dark:text-slate-500">
                    Production Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}