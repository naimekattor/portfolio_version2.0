'use client';

import { useState, useEffect } from "react";

const INITIAL_SKILLS = [
  {
    category: "Frontend",
    icon: "⬡",
    color: "#174d4d",
    glow: "rgba(23,77,77,0.08)",
    border: "rgba(23,77,77,0.18)",
    tag: "UI Layer",
    items: [
      { name: "React", level: 98 },
      { name: "Next.js", level: 95 },
      { name: "TypeScript", level: 93 },
      { name: "Tailwind CSS", level: 97 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    category: "Backend",
    icon: "◈",
    color: "#a67a3b",
    glow: "rgba(166,122,59,0.08)",
    border: "rgba(166,122,59,0.2)",
    tag: "Server Layer",
    items: [
      { name: "Node.js", level: 94 },
      { name: "Express", level: 92 },
      { name: "PostgreSQL", level: 89 },
      { name: "Redis", level: 85 },
      { name: "GraphQL", level: 87 },
    ],
  },
  {
    category: "AI / LLM",
    icon: "◎",
    color: "#174d4d",
    glow: "rgba(23,77,77,0.08)",
    border: "rgba(23,77,77,0.18)",
    tag: "Intelligence",
    items: [
      { name: "OpenAI API", level: 96 },
      { name: "Prompt Engineering", level: 94 },
    ],
  },
  {
    category: "Cloud / DevOps",
    icon: "⬟",
    color: "#a67a3b",
    glow: "rgba(166,122,59,0.08)",
    border: "rgba(166,122,59,0.2)",
    tag: "Infrastructure",
    items: [
      { name: "AWS", level: 91 },
      { name: "Docker", level: 93 },
      { name: "CI/CD", level: 90 },
      { name: "Vercel", level: 96 },
    ],
  },
];

const CATEGORY_META: Record<
  string,
  { icon: string; color: string; glow: string; border: string; tag: string }
> = {
  Frontend: {
    icon: "⬡",
    color: "#174d4d",
    glow: "rgba(23,77,77,0.08)",
    border: "rgba(23,77,77,0.18)",
    tag: "UI Layer",
  },
  Backend: {
    icon: "◈",
    color: "#a67a3b",
    glow: "rgba(166,122,59,0.08)",
    border: "rgba(166,122,59,0.2)",
    tag: "Server Layer",
  },
  "AI / LLM": {
    icon: "◎",
    color: "#174d4d",
    glow: "rgba(23,77,77,0.08)",
    border: "rgba(23,77,77,0.18)",
    tag: "Intelligence",
  },
  "Cloud / DevOps": {
    icon: "⬟",
    color: "#a67a3b",
    glow: "rgba(166,122,59,0.08)",
    border: "rgba(166,122,59,0.2)",
    tag: "Infrastructure",
  },
};

function SkillBar({
  level,
  color,
  animate,
}: {
  level: number;
  color: string;
  animate: boolean;
}) {
  return (
    <div className="relative h-1 bg-black/10 rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
        style={{
          width: animate ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${color}77, ${color})`,
          boxShadow: `0 0 5px ${color}44`,
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
  skill: any;
  index: number;
  globalActive: number | null;
  setGlobalActive: (i: number | null) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80 + index * 110);
    return () => clearTimeout(timer);
  }, [index]);

  const isActive = globalActive === index;
  const isDimmed = globalActive !== null && !isActive;

  return (
    <div
      onMouseEnter={() => setGlobalActive(index)}
      onMouseLeave={() => setGlobalActive(null)}
      className={`relative rounded-2xl p-7 md:p-8 cursor-default transition-all duration-500 backdrop-blur-md ${
        isActive
          ? "bg-white -translate-y-2 scale-[1.015] shadow-2xl"
          : "bg-white/65 translate-y-0 scale-100 shadow-sm"
      } ${isDimmed ? "opacity-40" : mounted ? "opacity-100" : "opacity-0"}`}
      style={{
        border: `1.5px solid ${isActive ? skill.border : "rgba(23,60,60,0.08)"}`,
      }}
    >
      {/* Top color strip */}
      <div
        className={`absolute top-0 left-7 right-7 h-[3px] rounded-b transition-opacity duration-400 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
        }}
      />

      {/* Radial glow */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${skill.glow}, transparent)`,
        }}
      />

      {/* Tag */}
      <div
        className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[2.5px] uppercase mb-4 px-3 py-1 rounded-full"
        style={{
          color: skill.color,
          background: `${skill.color}0d`,
          border: `1px solid ${skill.color}22`,
        }}
      >
        <span
          className="w-1 h-1 rounded-full inline-block"
          style={{ background: skill.color }}
        />
        {skill.tag}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[9.5px] font-bold tracking-[3px] uppercase text-slate-400 mb-1.5">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {skill.category}
          </h3>
        </div>
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${
            isActive ? "rotate-12 scale-110" : ""
          }`}
          style={{
            background: `${skill.color}10`,
            border: `1.5px solid ${skill.color}22`,
            color: skill.color,
          }}
        >
          {skill.icon}
        </div>
      </div>

      {/* Expanding divider */}
      <div
        className="h-px mb-5 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${skill.color}40, transparent)`,
          width: isActive ? "100%" : "35%",
        }}
      />

      {/* Skills */}
      <div className="flex flex-col gap-3.5">
        {skill.items.map((item: any, j: number) => (
          <div key={j}>
            <div className="flex justify-between items-center mb-1.5">
              <span
                className={`text-[13.5px] font-medium transition-colors ${
                  isActive ? "text-slate-800" : "text-slate-500"
                }`}
              >
                {item.name}
              </span>
              <span
                className={`text-[10.5px] font-bold transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{ color: skill.color }}
              >
                {item.level}%
              </span>
            </div>
            <SkillBar level={item.level} color={skill.color} animate={mounted} />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useLanguage } from "../context/language-context";

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

        let metaData = CATEGORY_META;
        if (resSet.ok) {
          const jsonSet = await resSet.json();
          if (jsonSet.data?.skills_section_header) {
            setHeaderInfo((prev) => ({
              ...prev,
              ...jsonSet.data.skills_section_header,
            }));
          }
          if (jsonSet.data?.skills_category_meta) {
            metaData = { ...metaData, ...jsonSet.data.skills_category_meta };
          }
        }

        if (resSkills.ok) {
          const jsonSkills = await resSkills.json();
          if (jsonSkills.data && jsonSkills.data.length > 0) {
            const groupedMap = new Map<string, any[]>();
            jsonSkills.data.forEach((s: any) => {
              const cat = s.category || "Frontend";
              if (!groupedMap.has(cat)) groupedMap.set(cat, []);
              groupedMap.get(cat)!.push({ name: s.name, level: s.percentage });
            });

            const categoriesArr: any[] = [];
            groupedMap.forEach((items, catName) => {
              const meta = metaData[catName] || {
                icon: "◈",
                color: "#174d4d",
                glow: "rgba(23,77,77,0.08)",
                border: "rgba(23,77,77,0.18)",
                tag: catName,
              };

              categoriesArr.push({
                category: catName,
                icon: meta.icon,
                color: meta.color,
                glow: meta.glow,
                border: meta.border,
                tag: meta.tag,
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
    { num: `${skillCategories.length}`, label: "Domains", color: "#174d4d" },
    { num: `${totalSkills}+`, label: "Technologies", color: "#a67a3b" },
    { num: `${avgLevel}%`, label: "Avg. Proficiency", color: "#174d4d" },
    { num: headerInfo.yearsExp || "5+", label: "Years Exp.", color: "#a67a3b" },
  ];

  return (
    <section className="relative py-24 md:py-28 overflow-hidden bg-gradient-to-b from-[#f0f2ed] via-[#eceee9] to-[#f2ede8]">
      {/* Corner glows */}
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(23,77,77,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(166,122,59,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(23,77,77,0.07)_1px,transparent_1px)] bg-[size:28px_28px]"
        style={{
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Header ── */}
        <div
          className={`flex flex-col items-center text-center mb-16 transition-all duration-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-[#174d4d] mb-5 px-4.5 py-1.5 rounded-full bg-[#174d4d]/10 border border-[#174d4d]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#174d4d] inline-block" />
            {language !== 'en' ? t('expertise.badge') : headerInfo.badge || "Technical Stack"}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0a1a1a] leading-tight tracking-tight mb-4 max-w-3xl">
            {language !== 'en' ? t('expertise.title') : headerInfo.title || "Built to Scale. Wired to Deliver."}
          </h2>

          <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
            {language !== 'en' ? t('expertise.subheading') : headerInfo.subheading ||
              "A full-spectrum toolkit spanning UI to infrastructure — every layer of the modern stack, mastered."}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center mt-10 rounded-2xl overflow-hidden border border-[#174d4d]/15 bg-white/80 backdrop-blur-md shadow-lg">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`px-8 py-5 text-center ${
                  i < stats.length - 1 ? "border-r border-[#174d4d]/10" : ""
                }`}
              >
                <div
                  className="text-2xl md:text-3xl font-extrabold leading-none"
                  style={{ color: s.color }}
                >
                  {s.num}
                </div>
                <div className="text-[10.5px] font-bold text-slate-400 mt-1.5 tracking-wider uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cards ── */}
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