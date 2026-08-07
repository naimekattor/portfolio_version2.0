'use client';

import { useState, useEffect } from "react";
import { useLanguage } from "../context/language-context";

interface SkillItem {
  name: string;
  level: number;
  featured?: boolean;
}

interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  glow: string;
  border: string;
  tag: string;
  items: SkillItem[];
}

const INITIAL_SKILLS: SkillCategory[] = [
  {
    category: "Frontend Engineering",
    icon: "❖",
    color: "var(--primary-color, #174d4d)",
    glow: "rgba(23,77,77,0.08)",
    border: "rgba(23,77,77,0.18)",
    tag: "UI & State",
    items: [
      { name: "React.js & Next.js (App Router)", level: 96, featured: true },
      { name: "TypeScript & Strict Type Systems", level: 93, featured: true },
      { name: "Tailwind CSS & Design Systems", level: 95 },
      { name: "State Management (Zustand, Redux)", level: 90 },
      { name: "Micro-frontends & Web Performance", level: 87 },
    ],
  },
  {
    category: "Backend Architecture",
    icon: "◈",
    color: "var(--secondary-color, #a67a3b)",
    glow: "rgba(166,122,59,0.08)",
    border: "rgba(166,122,59,0.18)",
    tag: "Distributed & Scalable",
    items: [
      { name: "Node.js & Express / NestJS", level: 94, featured: true },
      { name: "Python (FastAPI & Django)", level: 88 },
      { name: "RESTful & GraphQL API Design", level: 92, featured: true },
      { name: "Microservices & Message Queues", level: 85 },
      { name: "Auth (OAuth2, JWT, NextAuth)", level: 91 },
    ],
  },
  {
    category: "Data & Storage",
    icon: "◆",
    color: "var(--primary-color, #174d4d)",
    glow: "rgba(23,77,77,0.08)",
    border: "rgba(23,77,77,0.18)",
    tag: "Persistence & Cache",
    items: [
      { name: "PostgreSQL & Complex SQL", level: 91, featured: true },
      { name: "MongoDB & Document Stores", level: 88 },
      { name: "Redis Caching & Pub/Sub", level: 86 },
      { name: "Prisma & ORM Optimization", level: 92 },
      { name: "Vector Databases (Pinecone, PGVector)", level: 83 },
    ],
  },
  {
    category: "AI & Automation",
    icon: "▲",
    color: "var(--secondary-color, #a67a3b)",
    glow: "rgba(166,122,59,0.08)",
    border: "rgba(166,122,59,0.18)",
    tag: "LLMs & Agentic AI",
    items: [
      { name: "AI Agent Building & LangChain", level: 90, featured: true },
      { name: "n8n & Workflow Automation", level: 93, featured: true },
      { name: "RAG & Knowledge Assistants", level: 88 },
      { name: "Social Media Bots (WhatsApp/IG)", level: 92 },
      { name: "OpenAI API & Model Fine-tuning", level: 87 },
    ],
  },
];

function SkillBar({
  level,
  animate,
}: {
  level: number;
  animate: boolean;
}) {
  return (
    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
        style={{
          width: animate ? `${level}%` : "0%",
        }}
      />
    </div>
  );
}

function SkillCard({
  skill,
  index,
  globalActive,
  setGlobalActive,
}: {
  skill: SkillCategory;
  index: number;
  globalActive: number | null;
  setGlobalActive: (i: number | null) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const isActive = globalActive === index;
  const isDimmed = globalActive !== null && !isActive;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100 + index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setGlobalActive(index)}
      onMouseLeave={() => setGlobalActive(null)}
      className={`relative rounded-2xl p-7 md:p-8 cursor-default transition-all duration-500 backdrop-blur-md ${
        isActive
          ? "bg-white dark:bg-slate-900 -translate-y-2 scale-[1.015] shadow-2xl border-primary-600"
          : "bg-white/80 dark:bg-slate-900/80 translate-y-0 scale-100 shadow-sm border-slate-200 dark:border-slate-800"
      } ${isDimmed ? "opacity-40" : mounted ? "opacity-100" : "opacity-0"} border`}
    >
      {/* Top color strip */}
      <div
        className={`absolute top-0 left-7 right-7 h-[3px] rounded-b transition-opacity duration-400 ${
          isActive ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600`}
      />

      {/* Tag */}
      <div className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[2.5px] uppercase mb-4 px-3 py-1 rounded-full text-primary-600 bg-primary-50 dark:bg-slate-800 dark:text-primary-400 border border-primary-100 dark:border-slate-700">
        <span className="w-1 h-1 rounded-full bg-primary-600 inline-block" />
        {skill.tag}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[9.5px] font-bold tracking-[3px] uppercase text-slate-400 mb-1.5">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {skill.category}
          </h3>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${isActive ? "rotate-12 scale-110 bg-primary-50 text-primary-600" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
          {skill.icon}
        </div>
      </div>

      {/* Expanding divider */}
      <div className={`h-px mb-5 transition-all duration-500 bg-gradient-to-r from-primary-600/40 to-transparent ${isActive ? "w-full" : "w-1/3"}`} />

      {/* Skills List */}
      <div className="space-y-3.5">
        {skill.items.map((item, idx) => (
          <div key={idx} className="group/item">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className={`transition-colors ${item.featured ? "text-slate-900 dark:text-slate-100 font-bold" : "text-slate-600 dark:text-slate-400"}`}>
                {item.name}
              </span>
              <span className="text-[10.5px] font-mono font-bold text-primary-600 dark:text-primary-400 ml-2">
                {item.level}%
              </span>
            </div>
            <SkillBar level={item.level} animate={mounted} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechnicalExpertise() {
  const { t, language } = useLanguage();
  const [globalActive, setGlobalActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [skillCategories, setSkillCategories] = useState<any[]>(INITIAL_SKILLS);
  const [headerInfo, setHeaderInfo] = useState({
    badge: "Technical Stack",
    title: "Built to Scale. Wired to Deliver.",
    subheading:
      "A full-spectrum toolkit spanning UI to infrastructure — every layer of the modern stack, mastered.",
    yearsExp: "5+",
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resSkills, resSet] = await Promise.all([
          fetch("http://localhost:4000/api/v1/skills"),
          fetch("http://localhost:4000/api/v1/site-settings"),
        ]);

        if (resSet.ok) {
          const jsonSet = await resSet.json();
          if (jsonSet.data?.skills_section_header) {
            setHeaderInfo((prev) => ({ ...prev, ...jsonSet.data.skills_section_header }));
          }
        }

        if (resSkills.ok) {
          const jsonSkills = await resSkills.json();
          if (jsonSkills.data && jsonSkills.data.length > 0) {
            const groupedMap = new Map<string, any[]>();
            jsonSkills.data.forEach((s: any) => {
              const catName = s.category?.name || s.category || "General Engineering";
              if (!groupedMap.has(catName)) {
                groupedMap.set(catName, []);
              }
              groupedMap.get(catName)?.push({
                name: s.name,
                level: s.proficiency || 85,
                featured: s.isFeatured || false,
              });
            });

            const categoriesArr: any[] = [];
            groupedMap.forEach((items, catName) => {
              categoriesArr.push({
                category: catName,
                icon: "◈",
                color: "var(--primary-color, #174d4d)",
                glow: "rgba(23,77,77,0.08)",
                border: "rgba(23,77,77,0.18)",
                tag: catName,
                items,
              });
            });

            setSkillCategories(categoriesArr);
          }
        }
      } catch (err) {
        console.error("Failed to load technical expertise data from backend:", err);
      }
    }

    fetchData();
  }, []);

  const totalSkills = skillCategories.reduce((a, s) => a + s.items.length, 0);
  const avgLevel =
    totalSkills > 0
      ? Math.round(
          skillCategories
            .flatMap((s) => s.items)
            .reduce((a, i) => a + i.level, 0) / totalSkills
        )
      : 0;

  const stats = [
    { num: `${skillCategories.length}`, label: "Domains" },
    { num: `${totalSkills}+`, label: "Technologies" },
    { num: `${avgLevel}%`, label: "Avg. Proficiency" },
    { num: headerInfo.yearsExp || "5+", label: "Years Exp." },
  ];

  return (
    <section className="relative py-24 md:py-28 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col items-center text-center mb-16 transition-all duration-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-primary-600 mb-5 px-4.5 py-1.5 rounded-full bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600 inline-block" />
            {language !== 'en' ? t('expertise.badge') : headerInfo.badge || "Technical Stack"}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-4 max-w-3xl">
            {language !== 'en' ? t('expertise.title') : headerInfo.title || "Built to Scale. Wired to Deliver."}
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
            {language !== 'en' ? t('expertise.subheading') : headerInfo.subheading ||
              "A full-spectrum toolkit spanning UI to infrastructure — every layer of the modern stack, mastered."}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center mt-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg divide-x divide-slate-100 dark:divide-slate-800">
            {stats.map((s, i) => (
              <div key={i} className="px-8 py-5 text-center">
                <div className="text-2xl md:text-3xl font-extrabold leading-none text-primary-600 dark:text-primary-400">
                  {s.num}
                </div>
                <div className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 mt-1.5 tracking-wider uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((skill, i) => (
            <SkillCard
              key={i}
              skill={skill}
              index={i}
              globalActive={globalActive}
              setGlobalActive={setGlobalActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}