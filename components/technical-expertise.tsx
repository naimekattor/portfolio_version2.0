'use client';

import { useState, useEffect } from "react";

const skills = [
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
      // { name: "LangChain", level: 90 },
      // { name: "Vector DBs", level: 88 },
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
      // { name: "Terraform", level: 82 },
    ],
  },
];

function SkillBar({ level, color, animate }) {
  return (
    <div style={{ position: "relative", height: "4px", background: "rgba(0,0,0,0.07)", borderRadius: "99px", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: "0 auto 0 0",
        width: animate ? `${level}%` : "0%",
        background: `linear-gradient(90deg, ${color}77, ${color})`,
        borderRadius: "99px",
        transition: "width 1.3s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: `0 0 5px ${color}44`,
      }} />
    </div>
  );
}

function SkillCard({ skill, index, globalActive, setGlobalActive }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80 + index * 110); }, [index]);

  const isActive = globalActive === index;
  const isDimmed = globalActive !== null && !isActive;

  return (
    <div
      onMouseEnter={() => setGlobalActive(index)}
      onMouseLeave={() => setGlobalActive(null)}
      style={{
        position: "relative",
        background: isActive ? "#ffffff" : "rgba(255,255,255,0.65)",
        border: `1.5px solid ${isActive ? skill.border : "rgba(23,60,60,0.08)"}`,
        borderRadius: "22px",
        padding: "32px 28px 36px",
        cursor: "default",
        transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
        transform: isActive ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
        opacity: isDimmed ? 0.38 : mounted ? 1 : 0,
        boxShadow: isActive
          ? `0 20px 56px ${skill.color}18, 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1.5px ${skill.border}`
          : "0 2px 10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top color strip */}
      <div style={{
        position: "absolute", top: 0, left: "28px", right: "28px", height: "3px",
        background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
        borderRadius: "0 0 4px 4px",
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "22px", pointerEvents: "none",
        background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${skill.glow}, transparent)`,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Tag */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "9.5px", fontWeight: 700,
        letterSpacing: "2.5px", textTransform: "uppercase",
        color: skill.color, marginBottom: "18px",
        padding: "4px 12px", borderRadius: "100px",
        background: `${skill.color}0d`, border: `1px solid ${skill.color}22`,
      }}>
        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: skill.color, display: "inline-block" }} />
        {skill.tag}
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "22px" }}>
        <div>
          <div style={{
            fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "9.5px", fontWeight: 700,
            letterSpacing: "3px", textTransform: "uppercase",
            color: "rgba(0,0,0,0.22)", marginBottom: "6px",
          }}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 style={{
            fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "20px", fontWeight: 800,
            color: "#0c1c1c", letterSpacing: "-0.4px", lineHeight: 1,
          }}>
            {skill.category}
          </h3>
        </div>
        <div style={{
          width: "46px", height: "46px", borderRadius: "13px",
          background: `${skill.color}10`, border: `1.5px solid ${skill.color}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "19px", color: skill.color,
          transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          transform: isActive ? "rotate(14deg) scale(1.15)" : "none",
          boxShadow: isActive ? `0 6px 18px ${skill.color}20` : "none",
        }}>
          {skill.icon}
        </div>
      </div>

      {/* Expanding divider */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, ${skill.color}40, transparent)`,
        marginBottom: "22px",
        width: isActive ? "100%" : "35%",
        transition: "width 0.55s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Skills */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {skill.items.map((item, j) => (
          <div key={j}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
              <span style={{
                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "13.5px", fontWeight: 500,
                color: isActive ? "#1a2e2e" : "#8a9e9e",
                transition: "color 0.3s",
              }}>{item.name}</span>
              <span style={{
                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "10.5px", fontWeight: 700,
                color: skill.color,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.3s",
              }}>{item.level}%</span>
            </div>
            <SkillBar level={item.level} color={skill.color} animate={mounted} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechnicalExpertise() {
  const [globalActive, setGlobalActive] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  const totalSkills = skills.reduce((a, s) => a + s.items.length, 0);
  const avgLevel = Math.round(
    skills.flatMap(s => s.items).reduce((a, i) => a + i.level, 0) / totalSkills
  );

  const stats = [
    { num: `${skills.length}`, label: "Domains", color: "#174d4d" },
    { num: `${totalSkills}+`, label: "Technologies", color: "#a67a3b" },
    { num: `${avgLevel}%`, label: "Avg. Proficiency", color: "#174d4d" },
    { num: "5+", label: "Years Exp.", color: "#a67a3b" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <section style={{
        padding: "96px 0 112px",
        background: "linear-gradient(165deg, #f0f2ed 0%, #eceee9 45%, #f2ede8 100%)",
        position: "relative", overflow: "hidden",
      }}>

        {/* Corner glows */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(23,77,77,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(166,122,59,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Dot texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(23,77,77,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
        }} />

        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", marginBottom: "64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "10px", fontWeight: 700,
              letterSpacing: "3.5px", textTransform: "uppercase", color: "#174d4d",
              marginBottom: "20px", padding: "6px 18px", borderRadius: "100px",
              background: "rgba(23,77,77,0.08)", border: "1.5px solid rgba(23,77,77,0.15)",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#174d4d", display: "inline-block" }} />
              Technical Stack
            </div>

            <h2 style={{
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
              fontSize: "clamp(36px,5vw,60px)", fontWeight: 800,
              lineHeight: 1.06, letterSpacing: "-2px", color: "#0a1a1a", marginBottom: "16px",
            }}>
              Built to{" "}
              <span style={{ background: "linear-gradient(130deg,#174d4d,#2a8a7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Scale.
              </span>{" "}
              Wired to{" "}
              <span style={{ background: "linear-gradient(130deg,#a67a3b,#d4a055)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Deliver.
              </span>
            </h2>

            <p style={{
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "17px", color: "#5e7878",
              maxWidth: "480px", lineHeight: 1.75, fontWeight: 400,
            }}>
              A full-spectrum toolkit spanning UI to infrastructure — every layer of the modern stack, mastered.
            </p>

            {/* Stats */}
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center",
              marginTop: "40px", borderRadius: "18px", overflow: "hidden",
              border: "1.5px solid rgba(23,77,77,0.12)",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 4px 28px rgba(23,77,77,0.08)",
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding: "20px 36px", textAlign: "center",
                  borderRight: i < stats.length - 1 ? "1.5px solid rgba(23,77,77,0.09)" : "none",
                }}>
                  <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "26px", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "10.5px", color: "#8aacac", marginTop: "5px", letterSpacing: "1.2px", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Cards ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(258px,1fr))", gap: "20px" }}>
            {skills.map((skill, i) => (
              <SkillCard key={i} skill={skill} index={i} globalActive={globalActive} setGlobalActive={setGlobalActive} />
            ))}
          </div>

          
        </div>
      </section>
    </>
  );
}