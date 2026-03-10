"use client"
import { useState, useEffect } from "react";

const BLOG_POSTS = [
  {
    title: "Architecting for Scale: Lessons from 1M Users",
    excerpt: "How we handled a sudden 10x traffic spike without downtime using serverless functions and edge caching.",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    tag: "Infrastructure",
    url: "#",
    accent: "#174d4d",
  },
  {
    title: "The Future of AI in Web Development",
    excerpt: "Beyond chatbots: Integrating LLMs into core application logic for smarter user experiences.",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    tag: "AI / LLM",
    url: "#",
    accent: "#a67a3b",
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  );
}

function PostCard({ post, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100 + index * 140); }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(post.url, "_blank")}
      style={{
        position: "relative",
        background: hovered ? "#ffffff" : "rgba(255,255,255,0.72)",
        border: `1.5px solid ${hovered ? post.accent + "30" : "rgba(23,60,60,0.09)"}`,
        borderRadius: "24px",
        padding: "36px 32px 32px",
        cursor: "pointer",
        transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 60px ${post.accent}14, 0 4px 20px rgba(0,0,0,0.07)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${post.accent}, ${post.accent}44)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "24px", pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 45% at 0% 0%, ${post.accent}08, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Tag row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "22px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "10px", fontWeight: 700,
          letterSpacing: "2.5px", textTransform: "uppercase",
          color: post.accent,
          padding: "4px 12px", borderRadius: "100px",
          background: `${post.accent}0e`, border: `1px solid ${post.accent}22`,
        }}>
          <BookIcon />
          {post.tag}
        </div>
        <span style={{
          fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "12px",
          color: "#a0b4b4", fontWeight: 500,
        }}>
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
        fontSize: "clamp(18px,2vw,22px)", fontWeight: 800,
        color: hovered ? "#0a1a1a" : "#1c3030",
        lineHeight: 1.25, letterSpacing: "-0.4px",
        marginBottom: "14px",
        transition: "color 0.3s",
      }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "14.5px",
        color: hovered ? "#4a6060" : "#8aacac",
        lineHeight: 1.7, marginBottom: "28px",
        transition: "color 0.3s",
      }}>
        {post.excerpt}
      </p>

      {/* Footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: "20px",
        borderTop: `1px solid ${hovered ? post.accent + "18" : "rgba(23,60,60,0.07)"}`,
        transition: "border-color 0.3s",
      }}>
        <span style={{
          fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "12.5px",
          color: "#a0b4b4", fontWeight: 500,
        }}>
          {post.date}
        </span>
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "12px", fontWeight: 700,
          color: post.accent,
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          Read article <ArrowIcon />
        </div>
      </div>
    </div>
  );
}

export default function Communication() {
  const [visible, setVisible] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <section style={{
        padding: "96px 0 112px",
        background: "linear-gradient(165deg,#f0f2ed 0%,#eceee9 45%,#f2ede8 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Bg glows */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(23,77,77,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle,rgba(166,122,59,0.08) 0%,transparent 65%)", pointerEvents: "none" }} />

        {/* Dot texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle,rgba(23,77,77,0.07) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)",
        }} />

        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

          {/* ── Header row ── */}
          <div style={{
            display: "flex", flexDirection: "row", flexWrap: "wrap",
            alignItems: "flex-end", justifyContent: "space-between",
            gap: "24px", marginBottom: "56px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ maxWidth: "560px" }}>
              {/* Eyebrow */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "10px", fontWeight: 700,
                letterSpacing: "3.5px", textTransform: "uppercase", color: "#174d4d",
                marginBottom: "18px", padding: "5px 16px", borderRadius: "100px",
                background: "rgba(23,77,77,0.08)", border: "1.5px solid rgba(23,77,77,0.15)",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#174d4d", display: "inline-block" }} />
                Writing & Insights
              </div>

              <h2 style={{
                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
                fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 800,
                lineHeight: 1.08, letterSpacing: "-1.5px", color: "#0a1a1a",
                marginBottom: "14px",
              }}>
                Technical{" "}
                <span style={{
                  background: "linear-gradient(130deg,#174d4d,#2a8a7a)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Communication
                </span>
              </h2>

              <p style={{
                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "16px",
                color: "#5e7878", lineHeight: 1.75,
              }}>
                I believe in sharing knowledge and explaining complex concepts clearly — from architecture decisions to AI integrations.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "13px", fontWeight: 700,
                letterSpacing: "0.3px",
                padding: "13px 26px", borderRadius: "14px",
                border: `1.5px solid ${btnHover ? "#174d4d" : "rgba(23,77,77,0.2)"}`,
                background: btnHover ? "#174d4d" : "rgba(255,255,255,0.8)",
                color: btnHover ? "#ffffff" : "#174d4d",
                cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                transform: btnHover ? "translateY(-2px)" : "translateY(0)",
                boxShadow: btnHover ? "0 8px 28px rgba(23,77,77,0.2)" : "0 2px 10px rgba(0,0,0,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              Read all posts
              <span style={{ transform: btnHover ? "translateX(3px)" : "translateX(0)", transition: "transform 0.3s", display: "flex" }}>
                <ArrowIcon />
              </span>
            </button>
          </div>

          {/* ── Cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "22px",
          }}>
            {BLOG_POSTS.map((post, i) => (
              <PostCard key={i} post={post} index={i} />
            ))}
          </div>

          {/* ── Bottom editorial strip ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "20px", marginTop: "52px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg,transparent,rgba(23,77,77,0.15))" }} />
            <span style={{
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", fontSize: "10px", fontWeight: 700,
              letterSpacing: "3px", textTransform: "uppercase", color: "rgba(23,77,77,0.35)",
              whiteSpace: "nowrap",
            }}>
              More articles coming soon
            </span>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg,rgba(23,77,77,0.15),transparent)" }} />
          </div>

        </div>
      </section>
    </>
  );
}