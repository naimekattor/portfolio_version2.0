'use client';

import { useEffect, useRef, useState } from "react";

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif";

const metrics = [
  { value: 60,    suffix: "%",   label: "Latency Reduction",    sub: "Across core API endpoints",    color: "#174d4d", prefix: "" },
  { value: 85,    suffix: "%",   label: "Process Automation",   sub: "Manual tasks eliminated",      color: "#a67a3b", prefix: "" },
  { value: 180,   suffix: "k",   label: "Annual Cost Savings",  sub: "Infrastructure optimization",  color: "#174d4d", prefix: "$" },
  { value: 2.4,   suffix: "x",   label: "User Growth",          sub: "Post-redesign performance",    color: "#a67a3b", prefix: "" },
];

// Easing: easeOutExpo
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, duration = 2000, decimals = 0, started = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, decimals, started]);

  return count;
}

function MetricCard({
  metric,
  index,
  started,
}: {
  metric: typeof metrics[0];
  index: number;
  started: boolean;
}) {
  const decimals = metric.value % 1 !== 0 ? 1 : 0;
  const count = useCountUp(metric.value, 1800 + index * 120, decimals, started);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80 + index * 110);
  }, [index]);

  const displayValue = decimals > 0 ? count.toFixed(1) : Math.round(count);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#ffffff" : "rgba(255,255,255,0.65)",
        border: `1.5px solid ${hovered ? metric.color + "30" : "rgba(23,60,60,0.08)"}`,
        borderRadius: "22px",
        padding: "36px 28px 32px",
        textAlign: "center",
        transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-7px) scale(1.02)" : `translateY(0) scale(1)`,
        opacity: visible ? 1 : 0,
        boxShadow: hovered
          ? `0 20px 56px ${metric.color}16, 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1.5px ${metric.color}28`
          : "0 2px 10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)",
        backdropFilter: "blur(12px)",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Top accent strip */}
      <div style={{
        position: "absolute", top: 0, left: "28px", right: "28px", height: "3px",
        background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
        borderRadius: "0 0 4px 4px",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "22px", pointerEvents: "none",
        background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${metric.color}0a, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Index badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        fontFamily: FONT, fontSize: "9.5px", fontWeight: 700,
        letterSpacing: "2.5px", textTransform: "uppercase",
        color: metric.color, marginBottom: "20px",
        padding: "4px 12px", borderRadius: "100px",
        background: `${metric.color}0d`, border: `1px solid ${metric.color}22`,
      }}>
        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: metric.color, display: "inline-block" }} />
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Counter */}
      <div style={{
        fontFamily: FONT,
        fontSize: "clamp(42px, 5vw, 54px)",
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: "-2px",
        color: metric.color,
        marginBottom: "14px",
        transition: "color 0.3s",
        fontVariantNumeric: "tabular-nums",
      }}>
        {metric.prefix}{displayValue}{metric.suffix}
      </div>

      {/* Expanding divider */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${metric.color}40, transparent)`,
        marginBottom: "14px",
        width: hovered ? "80%" : "30%",
        margin: "0 auto 14px",
        transition: "width 0.55s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Label */}
      <p style={{
        fontFamily: FONT,
        fontSize: "14px",
        fontWeight: 700,
        color: hovered ? "#0c1c1c" : "#2a3a3a",
        marginBottom: "6px",
        letterSpacing: "-0.2px",
        transition: "color 0.3s",
      }}>
        {metric.label}
      </p>

      {/* Sub */}
      <p style={{
        fontFamily: FONT,
        fontSize: "12.5px",
        fontWeight: 400,
        color: hovered ? "#5e7878" : "#8a9e9e",
        lineHeight: 1.5,
        transition: "color 0.3s",
      }}>
        {metric.sub}
      </p>
    </div>
  );
}

export function BusinessValue() {
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="value"
      style={{
        padding: "96px 0 112px",
        background: "linear-gradient(165deg,#f0f2ed 0%,#eceee9 45%,#f2ede8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner glows */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle,rgba(23,77,77,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(166,122,59,0.08) 0%,transparent 65%)", pointerEvents: "none" }} />

      {/* Dot texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle,rgba(23,77,77,0.07) 1px,transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(22px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: FONT, fontSize: "10px", fontWeight: 700,
            letterSpacing: "3.5px", textTransform: "uppercase", color: "#174d4d",
            marginBottom: "20px", padding: "6px 18px", borderRadius: "100px",
            background: "rgba(23,77,77,0.08)", border: "1.5px solid rgba(23,77,77,0.15)",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#174d4d", display: "inline-block" }} />
            Impact & Results
          </div>

          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(34px,5vw,58px)", fontWeight: 800,
            lineHeight: 1.06, letterSpacing: "-2px", color: "#0a1a1a", marginBottom: "16px",
          }}>
            Delivering{" "}
            <span style={{ background: "linear-gradient(130deg,#174d4d,#2a8a7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Business
            </span>{" "}
            <span style={{ background: "linear-gradient(130deg,#a67a3b,#d4a055)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Value
            </span>
          </h2>

          <p style={{
            fontFamily: FONT, fontSize: "17px", color: "#5e7878",
            maxWidth: "460px", lineHeight: 1.75, fontWeight: 400,
          }}>
            Work measured by real impact — on the bottom line and the people who use it.
          </p>
        </div>

        {/* Metric cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
          gap: "20px",
        }}>
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} started={started} />
          ))}
        </div>

        {/* Bottom divider */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "20px", marginTop: "52px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.7s",
        }}>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg,transparent,rgba(23,77,77,0.15))" }} />
          <span style={{ fontFamily: FONT, fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(23,77,77,0.3)", whiteSpace: "nowrap" }}>
            Numbers don't lie
          </span>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg,rgba(23,77,77,0.15),transparent)" }} />
        </div>

      </div>
    </section>
  );
}