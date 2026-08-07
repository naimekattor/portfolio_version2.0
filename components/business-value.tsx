'use client';

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/language-context";

const metrics = [
  { value: 60, suffix: "%", label: "Latency Reduction", sub: "Across core API endpoints", prefix: "" },
  { value: 85, suffix: "%", label: "Process Automation", sub: "Manual tasks eliminated", prefix: "" },
  { value: 180, suffix: "k", label: "Annual Cost Savings", sub: "Infrastructure optimization", prefix: "$" },
  { value: 2.4, suffix: "x", label: "User Growth", sub: "Post-redesign performance", prefix: "" },
];

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, duration = 1600, decimals = 0, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(eased * target);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target, duration, start]);

  return count;
}

function MetricCard({
  metric,
  index,
  started,
}: {
  metric: (typeof metrics)[0];
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
      className={`relative rounded-2xl px-7 py-8 text-center cursor-default overflow-hidden transition-all duration-500 backdrop-blur-md border ${
        hovered
          ? "bg-white dark:bg-slate-900 -translate-y-2 scale-[1.02] shadow-2xl border-primary-600"
          : "bg-white/80 dark:bg-slate-900/80 translate-y-0 scale-100 shadow-sm border-slate-200 dark:border-slate-800"
      } ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Top accent strip */}
      <div
        className={`absolute top-0 left-7 right-7 h-[3px] rounded-b transition-opacity duration-400 ${
          hovered ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-primary-600 to-secondary-500`}
      />

      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-black font-mono tracking-tight mb-2 text-primary-600 dark:text-primary-400">
          <span>{metric.prefix}</span>
          <span>{displayValue}</span>
          <span>{metric.suffix}</span>
        </div>

        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-1">
          {metric.label}
        </h3>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          {metric.sub}
        </p>
      </div>
    </div>
  );
}

export function BusinessValue() {
  const { t, language } = useLanguage();
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

  const badgeText = language !== 'en' ? t('businessValue.badge') : 'Impact & Results';
  const titleText = language !== 'en' ? t('businessValue.title') : 'Delivering Business Value';
  const subtitleText = language !== 'en' ? t('businessValue.subheading') : 'Work measured by real impact — on the bottom line and the people who use it.';

  return (
    <section
      ref={sectionRef}
      id="value"
      className="relative py-24 md:py-28 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col items-center text-center mb-16 transition-all duration-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-primary-600 mb-5 px-4.5 py-1.5 rounded-full bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600 inline-block" />
            {badgeText}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-4">
            {titleText}
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-normal">
            {subtitleText}
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
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-800" />
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-slate-400 dark:text-slate-500 whitespace-nowrap">
            Measurable Results
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-300 dark:from-slate-800 to-transparent" />
        </div>
      </div>
    </section>
  );
}