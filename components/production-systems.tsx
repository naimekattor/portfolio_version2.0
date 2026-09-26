'use client';

import { Server, Database, Cpu, Globe, ArrowDown, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/language-context';

export function ProductionSystems() {
  const { t, language } = useLanguage();

  const systemItems = [
    {
      icon: Server,
      label: t('productionSystems.microservices'),
      desc: 'Node.js & Go',
      highlight: 'Distributed services',
    },
    {
      icon: Database,
      label: t('productionSystems.dataLayer'),
      desc: 'PostgreSQL & Redis',
      highlight: 'ACID & In-memory cache',
    },
    {
      icon: Cpu,
      label: t('productionSystems.aiIntegration'),
      desc: 'OpenAI & LangChain',
      highlight: 'RAG & Vector search',
    },
    {
      icon: Globe,
      label: t('productionSystems.edgeComputing'),
      desc: 'Next.js & Vercel',
      highlight: 'Edge runtime & SSR',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Heading & Feature Specs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 w-fit">
              <Activity className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wide uppercase text-primary-700 dark:text-primary-300">
                System Architecture
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-5 leading-tight">
              {language !== 'en' ? (
                t('productionSystems.title')
              ) : (
                <>
                  Production-Ready <span className="text-primary-600 dark:text-primary-400">Systems</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
              {t('productionSystems.subheading')}
            </p>

            {/* Spec Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {systemItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm hover:border-primary-500/40 dark:hover:border-primary-500/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-primary-500/10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {item.label}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Architectural Flow Diagram */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl overflow-hidden p-6 sm:p-8"
            >
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    system.live
                  </span>
                </div>
              </div>

              {/* Topology Nodes */}
              <div className="space-y-4">
                {/* 1. Client Layer */}
                <div className="p-3.5 rounded-lg border border-sky-500/30 bg-sky-500/5 dark:bg-sky-950/20 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                    Client Edge
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    Next.js / SSR
                  </span>
                </div>

                {/* Connector */}
                <div className="flex justify-center text-slate-400 dark:text-slate-600">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>

                {/* 2. API Gateway */}
                <div className="p-3.5 rounded-lg border border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/20 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    API Gateway & Auth
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    Reverse Proxy / JWT
                  </span>
                </div>

                {/* Split Connectors */}
                <div className="flex justify-around px-8 text-slate-400 dark:text-slate-600">
                  <ArrowDown className="w-4 h-4" />
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 3. Microservices Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 text-center">
                    <p className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Core API
                    </p>
                    <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Go / Node.js
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 text-center">
                    <p className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                      AI Pipeline
                    </p>
                    <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      LangChain / Embeddings
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center text-slate-400 dark:text-slate-600">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 4. Persistence Layer */}
                <div className="p-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Persistence Layer
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    PostgreSQL + Redis
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}