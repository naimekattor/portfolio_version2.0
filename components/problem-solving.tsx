'use client';

import { useEffect, useState } from 'react';
import {
  Zap,
  Shield,
  BarChart3,
  Code,
  Cpu,
  CheckCircle2,
  Server,
  Terminal,
  Wrench,
  Layers,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/language-context';

const ICON_MAP: Record<string, any> = {
  Zap,
  Shield,
  BarChart3,
  Code,
  Cpu,
  CheckCircle2,
  Server,
  Terminal,
  Wrench,
  Layers,
  Sparkles,
};

const DEFAULT_PROBLEM_SOLVING = {
  sectionTitle: 'Solving Real Problems',
  sectionSubtitle: "I don't just write code; I engineer solutions that address critical business pain points.",
  items: [
    {
      id: '1',
      title: 'Scalability Bottlenecks',
      problem: 'Legacy systems failing under high traffic loads during peak hours.',
      solution: 'Implemented microservices architecture with Redis caching and horizontal scaling, reducing latency by 60%.',
      icon: 'Zap',
    },
    {
      id: '2',
      title: 'Data Security Risks',
      problem: 'Vulnerable authentication flows and unencrypted sensitive user data.',
      solution: 'Architected a secure OAuth2/OIDC flow with end-to-end encryption and automated security audits.',
      icon: 'Shield',
    },
    {
      id: '3',
      title: 'Inefficient Workflows',
      problem: 'Manual data entry processes costing teams 20+ hours per week.',
      solution: 'Built an AI-powered automation engine that reduced manual effort by 85% using LLM-based extraction.',
      icon: 'BarChart3',
    },
  ],
};

export function ProblemSolving() {
  const [data, setData] = useState(DEFAULT_PROBLEM_SOLVING);
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/site-settings`);
        if (res.ok) {
          const json = await res.json();
          if (json.data?.problem_solving_section) {
            setData((prev) => ({
              ...prev,
              ...json.data.problem_solving_section,
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load problem solving section settings:', err);
      }
    }
    fetchSettings();
  }, []);

  const badgeText = language !== 'en' ? t('problems.badge') : 'Case Studies';
  const titleText = language !== 'en' ? t('problems.title') : data.sectionTitle;
  const subtitleText = language !== 'en' ? t('problems.subheading') : data.sectionSubtitle;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-4">
            {language !== 'en' ? t('problems.title') : (
              <>
                Solving Real <span className="text-primary-600">Technical Challenges</span>
              </>
            )}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl">{subtitleText}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data.items?.map((item: any, i: number) => {
            const IconComponent = ICON_MAP[item.icon] || Zap;
            const itemKey = String(i + 1);
            const itemTitle = language !== 'en' && t(`problemItems.${itemKey}.title`) !== `problemItems.${itemKey}.title`
              ? t(`problemItems.${itemKey}.title`)
              : item.title;
            const itemProblem = language !== 'en' && t(`problemItems.${itemKey}.problem`) !== `problemItems.${itemKey}.problem`
              ? t(`problemItems.${itemKey}.problem`)
              : item.problem;
            const itemSolution = language !== 'en' && t(`problemItems.${itemKey}.solution`) !== `problemItems.${itemKey}.solution`
              ? t(`problemItems.${itemKey}.solution`)
              : item.solution;

            return (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{itemTitle}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                      {language === 'ar' ? 'المشكلة' : 'The Problem'}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{itemProblem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary-500 uppercase tracking-wider mb-1">
                      {language === 'ar' ? 'الحل الهندسي' : 'The Solution'}
                    </p>
                    <p className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-relaxed">
                      {itemSolution}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
