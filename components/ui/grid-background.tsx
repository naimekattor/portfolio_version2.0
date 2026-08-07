"use client";

import { useId, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BeamConfig {
  row: number;
  delay: number;
  duration: number;
  color: string;
  reverse: boolean;
  opacity: number;
  strokeWidth: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = {
  teal: "23, 73, 77",
  gold: "166, 122, 59",
  tealLight: "40, 110, 115",
} as const;

const GRID_SIZE = 48;

// ─── AnimatedBeam ─────────────────────────────────────────────────────────────

interface AnimatedBeamProps {
  config: BeamConfig;
  containerDimensions: { width: number; height: number };
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  config,
  containerDimensions,
}) => {
  const gradientId = useId();
  const filterId = useId();
  const { width, height } = containerDimensions;

  if (!width || !height) return null;

  const y = height * config.row;
  const padding = 20;
  const pathD = `M ${-padding},${y} L ${width + padding},${y}`;

  const initialX1 = config.reverse ? "100%" : "-20%";
  const initialX2 = config.reverse ? "120%" : "0%";
  const x1Anim = config.reverse ? ["100%", "-20%"] : ["-20%", "120%"];
  const x2Anim = config.reverse ? ["120%", "0%"] : ["0%", "140%"];

  return (
    <g>
      <defs>
        <filter id={filterId} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={initialX1}
          x2={initialX2}
          y1="0%"
          y2="0%"
          animate={{ x1: x1Anim, x2: x2Anim }}
          transition={{
            delay: config.delay,
            duration: config.duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            repeat: Infinity,
            repeatDelay: config.duration * 0.15,
          }}
        >
          <stop offset="0%" stopColor="transparent" stopOpacity="0" />
          <stop
            offset="35%"
            stopColor={`rgb(${config.color})`}
            stopOpacity="0"
          />
          <stop
            offset="47%"
            stopColor={`rgb(${config.color})`}
            stopOpacity={config.opacity * 0.6}
          />
          <stop
            offset="50%"
            stopColor={`rgb(${config.color})`}
            stopOpacity={config.opacity}
          />
          <stop
            offset="53%"
            stopColor={`rgb(${config.color})`}
            stopOpacity={config.opacity * 0.6}
          />
          <stop
            offset="65%"
            stopColor={`rgb(${config.color})`}
            stopOpacity="0"
          />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </motion.linearGradient>
      </defs>

      {/* Track line */}
      <path
        d={pathD}
        stroke={`rgba(${config.color}, 0.06)`}
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />

      {/* Glow layer */}
      <path
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={config.strokeWidth * 4}
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        opacity="0.4"
      />

      {/* Core beam */}
      <path
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
};

// ─── AnimatedGrid ─────────────────────────────────────────────────────────────

export const AnimatedGrid: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setDims({ width: r.width, height: r.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Generate beam configurations
  const beams: BeamConfig[] = Array.from({ length: 18 }, (_, i) => {
    const tier = i % 3;
    const configs = [
      { color: COLORS.teal, duration: 9, opacity: 0.85, strokeWidth: 1.5 },
      { color: COLORS.gold, duration: 7, opacity: 0.65, strokeWidth: 1 },
      { color: COLORS.tealLight, duration: 5.5, opacity: 0.4, strokeWidth: 0.75 },
    ];
    const cfg = configs[tier];
    return {
      row: (i + 0.5) / 18,
      delay: i * 0.55,
      duration: cfg.duration + (i % 4) * 0.8,
      color: cfg.color,
      reverse: i % 5 === 0 || i % 7 === 0,
      opacity: cfg.opacity,
      strokeWidth: cfg.strokeWidth,
    };
  });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300 ${className}`}
    >
      {/* ── Grid lines ── */}
      <div
        className="absolute inset-0 opacity-100 dark:opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(${COLORS.teal}, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(${COLORS.teal}, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      />

      {/* ── Beam SVG ── */}
      {mounted && dims.width > 0 && dims.height > 0 && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${dims.width} ${dims.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {beams.map((beam, i) => (
            <AnimatedBeam key={i} config={beam} containerDimensions={dims} />
          ))}
        </svg>
      )}

      {/* ── Radial fade mask ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_50%,rgba(255,255,255,0.4)_85%,white_100%)] dark:bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_50%,rgba(2,6,23,0.5)_85%,#020617_100%)]" />

      {/* ── Top/bottom edge fade ── */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-white dark:from-slate-950 dark:via-transparent dark:to-slate-950 opacity-90" />

      {/* ── Left/right edge fade ── */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-transparent to-white dark:from-slate-950 dark:via-transparent dark:to-slate-950 opacity-90" />

      {/* ── Subtle center glow ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(${COLORS.teal}, 0.05) 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};