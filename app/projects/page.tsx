'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Search, ExternalLink, Github, Sparkles, FolderGit2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'Enterprise AI Automation Engine',
    slug: 'ai-automation-engine',
    description:
      'High-throughput LLM workflow extraction engine reducing manual processing time by 85%. Built with Next.js, FastAPI, Redis, and LangChain.',
    impact: '85% Efficiency Boost',
    category: 'AI / ML',
    technologies: ['Next.js', 'Python', 'LangChain', 'Redis', 'PostgreSQL'],
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop'],
    githubUrl: 'https://github.com/naimekattor',
    liveUrl: 'https://example.com',
  },
  {
    id: '2',
    title: 'Microservices Cloud Platform',
    slug: 'microservices-cloud-platform',
    description:
      'Decoupled microservice architecture handling high concurrency requests with sub-50ms latency using Node.js, Docker, and Kafka.',
    impact: '60% Latency Reduction',
    category: 'Microservices',
    technologies: ['Node.js', 'Express', 'Docker', 'Kafka', 'PostgreSQL'],
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop'],
    githubUrl: 'https://github.com/naimekattor',
    liveUrl: 'https://example.com',
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    slug: 'realtime-analytics-dashboard',
    description:
      'Interactive real-time monitoring dashboard supporting live WebSocket streams and retention analytics visualizations.',
    impact: '10M+ Events/Day',
    category: 'Web App',
    technologies: ['React', 'TypeScript', 'Socket.IO', 'Tailwind CSS'],
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
    githubUrl: 'https://github.com/naimekattor',
    liveUrl: 'https://example.com',
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>(DEFAULT_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('http://localhost:4000/api/v1/projects');
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setProjects(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load projects from backend:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Web App')))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || (project.category || 'Web App') === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.technologies &&
        project.technologies.some((t: string) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">
              <FolderGit2 className="w-3.5 h-3.5" /> Portfolio Showcase
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              Featured Engineering Projects
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Explore production web applications, AI integrations, microservice systems, and full-stack solutions built for real business impact.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-slate-100/70 border-b border-slate-200 sticky top-[73px] z-30 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary-600 transition-colors shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-6">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image / Header Banner */}
                    <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                      {project.images && project.images[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-slate-200 text-primary-600 font-bold text-lg">
                          {project.title}
                        </div>
                      )}
                      {project.impact && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/90 text-amber-400 backdrop-blur-md text-[11px] font-bold rounded-lg border border-white/10 shadow-sm">
                          {project.impact}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary-600 mb-2 block">
                        {project.category || 'Web App'}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.map((tech: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        Live Demo <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Internal Project</span>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                        title="View Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <FolderGit2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Projects Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search filter or category selection.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
