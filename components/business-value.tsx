'use client';

import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 60, suffix: "%", label: "Latency Reduction", sub: "Across core API endpoints", color: "#174d4d", prefix: "" },
  { value: 85, suffix: "%", label: "Process Automation", sub: "Manual tasks eliminated", color: "#a67a3b", prefix: "" },
  { value: 180, suffix: "k", label: "Annual Cost Savings", sub: "Infrastructure optimization", color: "#174d4d", prefix: "$" },
  { value: 2.4, suffix: "x", label: "User Growth", sub: "Post-redesign performance", color: "#a67a3b", prefix: "" },
];

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
    const timer = setTimeout(() => setVisible(true), 80 + index * 110);
    return () => clearTimeout(timer);
  }, [index]);

  const displayValue = decimals > 0 ? count.toFixed(1) : Math.round(count);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl px-7 py-8 text-center cursor-default overflow-hidden transition-all duration-500 backdrop-blur-md ${
        hovered
          ? "bg-white -translate-y-2 scale-[1.02] shadow-2xl"
          : "bg-white/65 translate-y-0 scale-100 shadow-sm"
      } ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        border: `1.5px solid ${hovered ? metric.color + "30" : "rgba(23,60,60,0.08)"}`,
      }}
    >
      {/* Top accent strip */}
      <div
        className={`absolute top-0 left-7 right-7 h-[3px] rounded-b transition-opacity duration-400 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
        }}
      />

      {/* Radial glow */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${metric.color}0a, transparent)`,
        }}
      />

      {/* Index badge */}
      <div
        className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[2.5px] uppercase mb-5 px-3 py-1 rounded-full"
        style={{
          color: metric.color,
          background: `${metric.color}0d`,
          border: `1px solid ${metric.color}22`,
        }}
      >
        <span
          className="w-1 h-1 rounded-full inline-block"
          style={{ background: metric.color }}
        />
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Counter */}
      <div
        className="text-4xl md:text-5xl font-extrabold leading-none tracking-tight mb-3 tabular-nums transition-colors duration-300"
        style={{ color: metric.color }}
      >
        {metric.prefix}
        {displayValue}
        {metric.suffix}
      </div>

      {/* Expanding divider */}
      <div
        className="h-px mx-auto mb-3.5 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${metric.color}40, transparent)`,
          width: hovered ? "80%" : "30%",
        }}
      />

      {/* Label */}
      <p
        className={`text-sm font-bold mb-1.5 tracking-tight transition-colors duration-300 ${
          hovered ? "text-[#0c1c1c]" : "text-[#2a3a3a]"
        }`}
      >
        {metric.label}
      </p>

      {/* Sub */}
      <p
        className={`text-xs font-normal leading-relaxed transition-colors duration-300 ${
          hovered ? "text-[#5e7878]" : "text-[#8a9e9e]"
        }`}
      >
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
    const timer = setTimeout(() => setVisible(true), 60);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="value"
      className="relative py-24 md:py-28 overflow-hidden bg-gradient-to-b from-[#f0f2ed] via-[#eceee9] to-[#f2ede8]"
    >
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
        {/* Header */}
        <div
          className={`flex flex-col items-center text-center mb-16 transition-all duration-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-[#174d4d] mb-5 px-4.5 py-1.5 rounded-full bg-[#174d4d]/10 border border-[#174d4d]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#174d4d] inline-block" />
            Impact & Results
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0a1a1a] leading-tight tracking-tight mb-4">
            Delivering{" "}
            <span className="bg-gradient-to-r from-[#174d4d] to-[#2a8a7a] bg-clip-text text-transparent">
              Business
            </span>{" "}
            <span className="bg-gradient-to-r from-[#a67a3b] to-[#d4a055] bg-clip-text text-transparent">
              Value
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#5e7878] max-w-md leading-relaxed font-normal">
            Work measured by real impact — on the bottom line and the people who use it.
          </p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} started={started} />
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className={`flex items-center justify-center gap-5 mt-14 transition-opacity duration-1000 delay-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#174d4d]/20" />
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#174d4d]/40 whitespace-nowrap">
            Numbers don't lie
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#174d4d]/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}