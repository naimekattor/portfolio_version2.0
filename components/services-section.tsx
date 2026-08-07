'use client';

import { useEffect, useState } from 'react';
import {
  Code,
  Cpu,
  Server,
  Terminal,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Wrench,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, any> = {
  Code,
  Cpu,
  Server,
  Terminal,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Wrench,
  Layers,
  Sparkles,
};

const DEFAULT_SERVICES = {
  sectionTitle: 'Services & Engineering Solutions',
  sectionSubtitle:
    'End-to-end software development services built for speed, scale, and long-term maintainability.',
  items: [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      description:
        'Building high-performance React/Next.js frontends and robust Node.js/Express backend APIs with clean, maintainable architecture.',
      icon: 'Code',
      tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    },
    {
      id: '2',
      title: 'AI & LLM Workflows Integration',
      description:
        'Embedding generative AI capabilities, smart automated workflows, and RAG-driven AI assistants into enterprise web applications.',
      icon: 'Cpu',
      tags: ['OpenAI API', 'LangChain', 'Python', 'Vector DBs'],
    },
    {
      id: '3',
      title: 'Database Architecture & Microservices',
      description:
        'Designing scalable PostgreSQL database schemas, Redis caching systems, and decoupled microservices for high throughput.',
      icon: 'Server',
      tags: ['Prisma', 'Redis', 'Docker', 'Microservices'],
    },
  ],
};

export function ServicesSection() {
  const [data, setData] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('http://localhost:4000/api/v1/site-settings');
        if (res.ok) {
          const json = await res.json();
          if (json.data?.services_section) {
            setData((prev) => ({
              ...prev,
              ...json.data.services_section,
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load services section settings:', err);
      }
    }
    fetchSettings();
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> What I Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {data.sectionTitle}
          </h2>
          <p className="text-slate-600 max-w-2xl text-base">{data.sectionSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.items?.map((item: any, i: number) => {
            const IconComponent = ICON_MAP[item.icon] || Code;
            return (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 bg-primary-600 group-hover:bg-secondary-500 rounded-2xl flex items-center justify-center mb-6 text-white transition-colors duration-300 shadow-md">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="pt-4 border-t border-slate-200/80 flex flex-wrap gap-2">
                    {item.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-[11px] font-medium rounded-md shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
