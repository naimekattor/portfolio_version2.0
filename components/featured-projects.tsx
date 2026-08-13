"use client";

import { useEffect, useState, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useLanguage } from "../context/language-context";

const INITIAL_PROJECTS = [
  {
    title: "Islamic Knowledge Center",
    description:
      "Engineered a high-performance verification platform using Next.js 16 and Supabase, featuring a centralized database of authentic texts and advanced search indexing.",
    impact:
      "Established a 'Single Source of Truth' for community education, providing 100% verified content with sub-second retrieval times.",
    technologies: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    images: ["/hokpath.png"],
    liveUrl: "https://hokpath.com",
    githubUrl: "#",
  },
  {
    title: "Refabry E-commerce",
    description:
      "Designed a minimalist, high-conversion shopping experience with optimized state management and a seamless 'One-Click' inspired UI flow.",
    impact:
      "Boosted user engagement by 40% through intuitive navigation and a mobile-first responsive architecture.",
    technologies: ["React", "Node.js", "Tailwind CSS", "Redux"],
    images: ["/refabry.png"],
    liveUrl: "https://loquacious-cucurucho-76d0bb.netlify.app/",
    githubUrl: "#",
  },
];

export function FeaturedProjects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<any[]>(INITIAL_PROJECTS);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/projects`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setProjects(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch projects from backend:", err);
      }
    }
    loadProjects();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if projects are loaded
    if (projects.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Get all project cards inside the container
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-project-card");
      
      let startX = 60;
      if (window.innerWidth >= 1024) startX = 160;
      else if (window.innerWidth >= 768) startX = 100;

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            x: startX,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]); // Re-run when projects load

  return (
    <section id="projects" ref={containerRef} className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      <div className="container mx-auto px-6">
        <motion.div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-4">
              {language !== 'en' ? t('featuredProjects.title') : (
                <>
                  Featured <span className="text-primary-600">Projects</span>
                </>
              )}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
              {t('featuredProjects.subheading')}
            </p>
          </div>
          <Link href="/projects">
            <button className="hidden md:block text-primary-600 font-semibold hover:underline">
              {t('featuredProjects.viewAll')}
            </button>
          </Link>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => {
            const techList =
              project.technologies || project.tech || [];
            const imgSrc =
              (project.images && project.images[0]) ||
              project.image ||
              "/hokpath.png";
            const liveLink = project.liveUrl || "#";
            const githubLink = project.githubUrl || "#";

            return (
              <motion.div key={project.id || i} className="group gsap-project-card">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <img
                    src={imgSrc}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors"></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {techList.map((t: string, j: number) => (
                    <span
                      key={j}
                      className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2">
                  {project.description || project.solution}
                </p>
                {project.impact && (
                  <div className="p-4 bg-secondary-50 dark:bg-slate-900 border border-secondary-100 dark:border-slate-800 rounded-xl mb-6">
                    <p className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-wider mb-1">
                      Impact
                    </p>
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      {project.impact}
                    </p>
                  </div>
                )}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(liveLink, "_blank")}
                    className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-primary-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(githubLink, "_blank")}
                    className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-primary-600 transition-colors"
                  >
                    <Github className="w-4 h-4" /> Source Code
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
