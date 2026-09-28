"use client";

import { useEffect, useState, useRef } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/language-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INITIAL_PROJECTS = [
  {
    title: "Contra Materia",
    category: "Brand & Editorial",
    description:
      "Minimalist high-concept brand identity, publication design, and visual architectural essay.",
    impact:
      "Featured in leading global design publications and achieved over 250k impressions.",
    technologies: ["Design", "Art Direction", "Marketing", "Editorial"],
    images: [
      "/images/projects/contra-materia-1.jpg",
      "/images/projects/contra-materia-2.jpg",
    ],
    liveUrl: "https://hokpath.com",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Dexa Technology",
    category: "AI Platform",
    description:
      "Next-generation neural AI model metrics, real-time dataset orchestration, and telemetry dashboard.",
    impact:
      "Reduced inference latency by 35% with sub-second distributed query analytics.",
    technologies: ["Next.js", "AI Systems", "TypeScript", "Tailwind CSS"],
    images: [
      "/images/projects/dexa-tech-1.jpg",
      "/images/projects/dexa-tech-2.jpg",
    ],
    liveUrl: "https://metcoly.vercel.app/",
    githubUrl: "https://github.com/naimekattor/metcoly",
    featured: true,
  },
  {
    title: "Mana Hotels",
    category: "Luxury Hospitality",
    description:
      "Bespoke digital guest experience and brand ecosystem for boutique luxury hotels.",
    impact:
      "Increased direct guest reservations by 48% with frictionless mobile booking flows.",
    technologies: ["React", "Hospitality", "UI/UX", "Brand System"],
    images: [
      "/images/projects/mana-hotels-1.jpg",
      "/images/projects/mana-hotels-2.jpg",
    ],
    liveUrl: "https://loquacious-cucurucho-76d0bb.netlify.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Islamic Knowledge Center",
    category: "Web Platform",
    description:
      "Engineered a high-performance verification platform featuring authentic texts and search indexing.",
    impact:
      "100% verified scholarly texts with sub-second retrieval times for 50k+ active users.",
    technologies: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    images: [
      "/hokpath.png",
      "/images/projects/islamic-center-2.jpg",
    ],
    liveUrl: "https://hokpath.com",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Refabry E-commerce",
    category: "E-Commerce",
    description:
      "Designed a minimalist, high-conversion shopping experience with optimized state management.",
    impact:
      "Boosted user checkout conversion by 40% through intuitive, mobile-first design.",
    technologies: ["React", "Node.js", "Tailwind CSS", "Redux"],
    images: [
      "/refabry.png",
      "/images/projects/dexa-tech-2.jpg",
    ],
    liveUrl: "https://loquacious-cucurucho-76d0bb.netlify.app/",
    githubUrl: "#",
    featured: true,
  },
];

export function FeaturedProjects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<any[]>(INITIAL_PROJECTS);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"}/projects`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            const backendProjects = json.data.map((p: any, idx: number) => {
              const imgs =
                p.images && p.images.length > 0
                  ? [...p.images]
                  : [p.image || "/hokpath.png"];
              if (imgs.length === 1) {
                const hoverFallbacks = [
                  "/images/projects/contra-materia-2.jpg",
                  "/images/projects/islamic-center-2.jpg",
                  "/images/projects/dexa-tech-2.jpg",
                  "/images/projects/mana-hotels-2.jpg",
                ];
                imgs.push(hoverFallbacks[idx % hoverFallbacks.length]);
              }
              return { ...p, images: imgs };
            });

            // If backend has fewer than 4 items, supplement with showcase items for smooth horizontal scroll
            if (backendProjects.length < 4) {
              const existingTitles = new Set(
                backendProjects.map((p: any) => p.title.toLowerCase())
              );
              const complementary = INITIAL_PROJECTS.filter(
                (p) => !existingTitles.has(p.title.toLowerCase())
              );
              setProjects([...backendProjects, ...complementary]);
            } else {
              setProjects(backendProjects);
            }
          }
        }
      } catch (err) {
        console.warn("Backend offline or unreachable, using default featured projects");
      }
    }
    loadProjects();
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projects.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const track = scrollTrackRef.current;
      const pinWrapper = pinWrapperRef.current;
      const section = sectionRef.current;
      if (!track || !pinWrapper || !section) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px): Pinned horizontal scroll scrubbing on vertical scroll
      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          const amount = track.scrollWidth - window.innerWidth + 60;
          return amount > 0 ? amount : 0;
        };

        const scrollAmount = getScrollAmount();

        if (scrollAmount > 0) {
          gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: pinWrapper,
              pinSpacing: true,
              start: "top top",
              end: () => `+=${getScrollAmount() * 1.15}`,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }
      });

      // Mobile (< 768px): clear props so touch scroll works naturally
      mm.add("(max-width: 767px)", () => {
        gsap.set(track, { clearProps: "all" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      <div ref={pinWrapperRef} className="py-12 lg:py-16 overflow-hidden w-full">
        {/* Horizontal Cards Viewport */}
        <div className="w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none scrollbar-none py-2">
          <div
            ref={scrollTrackRef}
            className="flex h-full w-max"
          >
          {projects.map((project, i) => {
            const techList = project.technologies || project.tech || [];
            const primaryImg =
              (project.images && project.images[0]) ||
              project.image ||
              "/images/projects/contra-materia-1.jpg";
            const secondaryImg =
              (project.images && project.images[1]) ||
              (project.images && project.images[0]) ||
              "/images/projects/contra-materia-2.jpg";
            const liveLink = project.liveUrl || "#";
            const githubLink = project.githubUrl || "#";

            return (
              <div
                key={project.id || project.slug || i}
                className="shrink-0 h-full snap-center"
                style={{
                  width: "750px",
                  maxWidth: "92vw",
                  height: "100%",
                  padding: "0 15px",
                }}
              >
                <div
                  onClick={() => {
                    if (liveLink && liveLink !== "#") {
                      window.open(liveLink, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="group relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200/50 dark:border-white/10 shadow-2xl select-none cursor-pointer transition-transform duration-500 hover:scale-[1.01]"
                >
                  {/* Primary Image: visible initially, zooms & fades on hover */}
                  <img
                    src={primaryImg}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />

                  {/* Secondary Image: crossfades in on hover */}
                  <img
                    src={secondaryImg}
                    alt={`${project.title} alternate view`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  />

                  {/* Soft Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/35" />

                  {/* Top Overlay: Category Tag & Quick Action Buttons */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
                    {project.category && (
                      <span className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-semibold uppercase tracking-wider shadow-md">
                        {project.category}
                      </span>
                    )}
                    <div className="flex items-center gap-2 pointer-events-auto ml-auto">
                      {githubLink && githubLink !== "#" && (
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:scale-105 transition-all shadow-md"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {liveLink && liveLink !== "#" && (
                        <a
                          href={liveLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:scale-105 transition-all shadow-md"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Hover Skills/Tags Stack: pops up directly above bottom pill */}
                  <div className="absolute bottom-[84px] sm:bottom-[92px] left-6 sm:left-8 flex flex-col items-start gap-2 z-20 pointer-events-none">
                    {techList.slice(0, 4).map((tech: string, j: number) => (
                      <span
                        key={j}
                        style={{
                          transitionDelay: `${j * 65}ms`,
                        }}
                        className="px-4 py-2 bg-white text-slate-950 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg transform transition-all duration-300 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Pill: Title & Arrow */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto z-20">
                    <div className="inline-flex items-center justify-between gap-4 px-5 py-3 rounded-2xl bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 group-hover:border-white/40 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                      <span className="truncate max-w-[240px] sm:max-w-none">
                        {project.title}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/25 transition-all duration-300 group-hover:translate-x-1 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final Card: Explore All Projects */}
          <div
            className="shrink-0 h-full snap-center"
            style={{
              width: "750px",
              maxWidth: "92vw",
              height: "100%",
              padding: "0 15px",
            }}
          >
            <Link href="/projects" className="block w-full h-full">
              <div className="group relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-900 via-[#07161f] to-[#0a232e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-2xl select-none cursor-pointer transition-all duration-500 hover:scale-[1.01] flex flex-col justify-between p-8 sm:p-12">
                {/* Background Radial Ambient Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none group-hover:bg-cyan-400/25 transition-all duration-500"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none group-hover:bg-teal-400/20 transition-all duration-500"
                />

                {/* Top Bar: Category Pill & Floating Arrow Button */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-4 py-1.5 rounded-full bg-cyan-950/70 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow">
                    EXPLORE ARCHIVE
                  </span>
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-500 group-hover:scale-110 shadow-lg">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>

                {/* Center Content */}
                <div className="my-auto z-10 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    <span>Complete Collection</span>
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4 group-hover:text-cyan-200 transition-colors">
                    Discover All <br />
                    <span className="text-cyan-400 font-extrabold">Projects</span>
                  </h3>
                  <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed max-w-md">
                    Browse full-stack platforms, client systems, architectural experiments, and open-source software built for scale.
                  </p>
                </div>

                {/* Hover Skills/Categories Stack */}
                <div className="absolute bottom-[92px] sm:bottom-[100px] left-8 sm:left-12 flex flex-col items-start gap-2 z-20 pointer-events-none">
                  {["Full-Stack Web Apps", "AI & RAG Systems", "High-Conversion E-Commerce", "API & Cloud Infra"].map((tag, j) => (
                    <span
                      key={j}
                      style={{ transitionDelay: `${j * 60}ms` }}
                      className="px-4 py-1.5 bg-white text-slate-950 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg transform transition-all duration-300 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Pill */}
                <div className="z-10">
                  <div className="inline-flex items-center justify-between gap-4 px-6 py-3.5 rounded-2xl bg-cyan-500 group-hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-cyan-500/25 transition-all duration-300 group-hover:shadow-cyan-400/40">
                    <span>View All Projects</span>
                    <span className="w-6 h-6 rounded-full bg-slate-950/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
