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
      { name: 'Next.js', icon: SiNextdotjs, colorClass: 'text-white' },
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
        colorClass: 'text-slate-200',
        isCustom: true,
        customContent: (
          <span className="text-[12px] font-mono font-bold text-slate-200">ex</span>
        ),
      },
      {
        name: 'REST APIs',
        icon: TbApi,
        colorClass: 'text-cyan-400',
        isCustom: true,
        customContent: (
          <span className="w-5 h-5 rounded-full border border-cyan-400/40 flex items-center justify-center text-[9px] font-bold text-cyan-400 font-mono">
            API
          </span>
        ),
      },
      { name: 'PostgreSQL', icon: SiPostgresql, colorClass: 'text-[#4169E1]' },
      { name: 'Prisma', icon: SiPrisma, colorClass: 'text-white' },
      { name: 'Supabase', icon: SiSupabase, colorClass: 'text-[#3ECF8E]' },
      { name: 'Auth', icon: ShieldCheck, colorClass: 'text-cyan-400' },
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
      { name: 'OpenAI', icon: TbBrandOpenai, colorClass: 'text-cyan-400' },
      {
        name: 'Vector Search',
        icon: Database,
        colorClass: 'text-cyan-300',
        isCustom: true,
        customContent: (
          <div className="flex items-center text-cyan-400">
            <Database className="w-4 h-4" />
          </div>
        ),
      },
      { name: 'LangChain', icon: Link2, colorClass: 'text-teal-400' },
      { name: 'AI Agents', icon: Bot, colorClass: 'text-cyan-300' },
      {
        name: 'Gemini',
        icon: SiGooglegemini,
        colorClass: 'text-cyan-400',
        isCustom: true,
        customContent: (
          <span className="inline-flex items-center gap-1 font-semibold text-xs text-cyan-400">
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
      { name: 'GitHub', icon: SiGithub, colorClass: 'text-white' },
      { name: 'Docker', icon: SiDocker, colorClass: 'text-[#2496ED]' },
      { name: 'Vercel', icon: SiVercel, colorClass: 'text-white' },
      { name: 'Linux', icon: SiLinux, colorClass: 'text-amber-400' },
      { name: 'CI/CD', icon: TbInfinity, colorClass: 'text-cyan-400' },
      {
        name: 'API Cloud',
        icon: Cloud,
        colorClass: 'text-cyan-300',
        isCustom: true,
        customContent: (
          <div className="relative flex items-center justify-center">
            <Cloud className="w-5 h-5 text-cyan-400" />
            <span className="absolute text-[8px] font-bold text-cyan-200 mt-0.5">
              API
            </span>
          </div>
        ),
      },
    ],
  },
];

export default function TechnicalExpertise() {
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

  return (
    <section
      id="expertise"
      ref={sectionRef}
      aria-labelledby="technical-expertise-heading"
      className="relative py-24 lg:py-32 bg-[#061217] text-slate-100 overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent blur-[140px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[600px] h-[400px] bg-gradient-to-tl from-cyan-600/10 via-teal-700/5 to-transparent blur-[130px] pointer-events-none -z-10"
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col justify-between h-full pt-2"
          >
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-[2px] bg-cyan-400 rounded-full" />
                <span className="text-[12px] font-bold tracking-[0.18em] text-cyan-400 uppercase font-mono">
                  TECHNICAL EXPERTISE
                </span>
              </div>

              {/* Main Heading */}
              <h2
                id="technical-expertise-heading"
                className="text-4xl sm:text-5xl lg:text-[62px] font-bold text-white tracking-tight leading-[1.08] mb-6"
              >
                Engineering <br />
                <span className="text-cyan-400 font-extrabold">Mastery</span> <br />
                <span className="font-serif italic font-normal text-slate-400 text-3xl sm:text-4xl lg:text-[48px] leading-tight block mt-1">
                  crafted to scale.
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-300/80 text-base sm:text-[17px] leading-relaxed max-w-md mb-8">
                Building scalable web applications, reliable backend systems, and
                AI-powered experiences through modern engineering and thoughtful
                architecture.
              </p>

              {/* CTA Button */}
              <div className="mb-14">
                <Link href="#projects">
                  <button className="inline-flex items-center gap-4 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                    <span>View My Projects</span>
                    <span className="w-6 h-6 rounded-lg bg-slate-950/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Bottom Profile Badge & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-cyan-500/10">
              <div className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-xl bg-[#0b1b22]/90 border border-cyan-500/25 backdrop-blur-md shadow-lg shrink-0">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-white tracking-wide leading-tight">
                    Full-Stack & AI Engineer
                  </div>
                  <div className="text-[9.5px] text-cyan-300/70 font-medium tracking-tight mt-0.5">
                    Modern Web • Scalable Systems • Intelligent Solutions
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400/80 font-normal leading-snug flex items-center gap-2">
                <span className="w-4 h-[1px] bg-cyan-500/40 hidden sm:inline-block shrink-0" />
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
                  className="expertise-grid-card group relative rounded-2xl p-6 sm:p-7 bg-[#0b181e]/75 hover:bg-[#0e2129]/90 border border-cyan-500/20 hover:border-cyan-400/45 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* Subtle inner corner glow on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />

                  <div>
                    {/* Header: Icon + Category Title */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-bold tracking-wider text-white uppercase font-sans">
                        {card.title}
                      </h3>
                    </div>

                    {/* 2-Column Skills List with Cyan Bullet Dots */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-7">
                      {/* Left Column */}
                      <div className="flex flex-col gap-2.5">
                        {card.col1.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-300/90 font-medium leading-tight"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col gap-2.5">
                        {card.col2.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-300/90 font-medium leading-tight"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row of Recognizable Tech Brand Icons */}
                  <div className="pt-4 border-t border-cyan-500/15 flex items-center flex-wrap gap-3 sm:gap-3.5">
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