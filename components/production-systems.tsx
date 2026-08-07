'use client';

import { Server, Database, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/language-context';

export function ProductionSystems() {
  const { t, language } = useLanguage();

  const systemItems = [
    { icon: Server, label: t('productionSystems.microservices'), desc: "Node.js & Go" },
    { icon: Database, label: t('productionSystems.dataLayer'), desc: "PostgreSQL & Redis" },
    { icon: Cpu, label: t('productionSystems.aiIntegration'), desc: "OpenAI & LangChain" },
    { icon: Globe, label: t('productionSystems.edgeComputing'), desc: "Next.js & Vercel" }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-6">
              {language !== 'en' ? t('productionSystems.title') : (
                <>
                  Production-Ready <span className="text-primary-600">Systems</span>
                </>
              )}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {t('productionSystems.subheading')}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {systemItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.label}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-square max-w-md mx-auto bg-slate-900 dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl p-8 flex flex-col justify-center border border-slate-800">
              {/* Simplified Architecture Diagram Representation */}
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="h-12 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center text-primary-400 text-xs font-mono"
                >
                  Client (Next.js)
                </motion.div>
                <div className="flex justify-center"><div className="w-px h-6 bg-slate-700"></div></div>
                <div className="h-12 bg-indigo-500/20 border border-indigo-500/30 rounded-lg flex items-center justify-center text-indigo-400 text-xs font-mono">API Gateway (Node.js)</div>
                <div className="flex justify-between px-12">
                  <div className="w-px h-6 bg-slate-700"></div>
                  <div className="w-px h-6 bg-slate-700"></div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400 text-xs font-mono">Auth Service</div>
                  <div className="flex-1 h-12 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400 text-xs font-mono">AI Engine</div>
                </div>
                <div className="flex justify-center"><div className="w-px h-6 bg-slate-700"></div></div>
                <div className="h-12 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center text-slate-400 text-xs font-mono">PostgreSQL / Redis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
