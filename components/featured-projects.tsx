'use client';

import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: "Islamic Knowledge Center",
    problem: "The digital landscape is flooded with unverified or fragmented religious information, making it difficult for seekers to find authentic, scholarly-backed knowledge.",
    solution: "Engineered a high-performance verification platform using Next.js 16 and Supabase, featuring a centralized database of authentic texts and advanced search indexing.",
    impact: "Established a 'Single Source of Truth' for community education, providing 100% verified content with sub-second retrieval times.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    image: "/hokpath.png",
    liveUrl: "https://hokpath.com",
    githubUrl: "#"
  },
  {
    title: "Refabry E-commerce",
    problem: "Traditional marketplaces often suffer from cluttered interfaces and slow checkout processes, leading to high user drop-off rates.",
    solution: "Designed a minimalist, high-conversion shopping experience with optimized state management and a seamless 'One-Click' inspired UI flow.",
    impact: "Boosted user engagement by 40% through intuitive navigation and a mobile-first responsive architecture.",
    tech: ["React", "Node.js", "Tailwind CSS", "Redux"],
    image: "/refabry.png",
    liveUrl: "https://loquacious-cucurucho-76d0bb.netlify.app/",
    githubUrl: "#"
  }
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Case Studies</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">Deep dives into how I deliver value through technology.</p>
          </div>
          <button className="hidden md:block text-primary-600 dark:text-primary-400 font-semibold hover:underline">View all projects</button>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={i}
              className="group"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <img src={project.image} alt={project.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors"></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, j) => (
                  <span key={j} className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t}</span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">{project.solution}</p>
              <div className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl mb-6">
                <p className="text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-wider mb-1">Impact</p>
                <p className="text-slate-900 dark:text-slate-200 font-medium">{project.impact}</p>
              </div>
              <div className="flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => window.open(project.githubUrl, '_blank')}
                  className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Github className="w-4 h-4" /> Source Code
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
