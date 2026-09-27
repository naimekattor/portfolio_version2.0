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
  Monitor,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/language-context';

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
  Monitor,
};

const DEFAULT_SERVICES = {
  sectionTitle: 'Services & Automated Solutions',
  sectionSubtitle:
    'Custom web platforms, intelligent AI agents, EdTech school systems, and end-to-end social media automation.',
  items: [
    {
      id: '1',
      title: 'E-commerce & SaaS Platforms',
      description:
        'Building scalable online stores, multi-vendor marketplaces, and full-featured SaaS web applications with Next.js, Stripe, and PostgreSQL.',
      icon: 'Code',
      tags: ['E-commerce', 'SaaS', 'Next.js', 'Stripe', 'PostgreSQL'],
    },
    {
      id: '2',
      title: 'AI Agent Building & Chatbots',
      description:
        'Building specialized autonomous AI agents including HR Agents (onboarding & Q&A), AI Receptionists (24/7 message handling), Sales & Lead Qualification Agents, Appointment Booking Agents, and Support RAG Assistants.',
      icon: 'Cpu',
      tags: ['HR Agent', 'AI Receptionist', 'Sales Agent', 'Booking Agent', 'Support RAG'],
    },
    {
      id: '3',
      title: 'n8n & Social Media Automation',
      description:
        'Automating user engagement and lead generation across WhatsApp, Messenger, and Instagram alongside complex n8n backend workflows.',
      icon: 'Zap',
      tags: ['n8n', 'WhatsApp API', 'Messenger', 'Instagram Automation'],
    },
    {
      id: '4',
      title: 'AI Education & School Systems',
      description:
        'Developing modern learning management portals, student record systems, and AI-assisted grading/curriculum tools for educational institutions.',
      icon: 'Layers',
      tags: ['School Systems', 'Education', 'LMS', 'AI Portal'],
    },
    {
      id: '5',
      title: 'AI-Powered Websites',
      description:
        'Transforming traditional marketing sites into intelligent, interactive web platforms with real-time AI personalization.',
      icon: 'Monitor',
      tags: ['AI-Powered', 'Personalization', 'React', 'TypeScript'],
    },
  ],
};

export function ServicesSection() {
  const [data, setData] = useState(DEFAULT_SERVICES);
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/site-settings`);
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
        console.warn('Backend offline or unreachable, using default services section settings');
      }
    }
    fetchSettings();
  }, []);

  const badgeText = language !== 'en' ? t('services.badge') : 'What I Offer';
  const titleText = language !== 'en' ? t('services.title') : data.sectionTitle;
  const subtitleText = language !== 'en' ? t('services.subheading') : data.sectionSubtitle;

  return (
    <section className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300" id="services">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800 text-primary-600 dark:text-primary-400 text-[12px] font-semibold tracking-[0.04em] uppercase mb-4">
            <Layers className="w-3.5 h-3.5" /> {badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100 leading-[1.12] mb-4">
            {language !== 'en' ? t('services.title') : (
              <>
                Engineering Custom Platforms <span className="text-primary-600">& AI Systems</span>
              </>
            )}
          </h2>
          <p className="text-lg sm:text-[19px] text-slate-600 dark:text-slate-400 max-w-2xl leading-[1.42] tracking-[-0.016em]">{subtitleText}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.items?.map((item: any, i: number) => {
            const IconComponent = ICON_MAP[item.icon] || Code;
            const itemKey = String(i + 1);
            const itemTitle = language !== 'en' && t(`serviceItems.${itemKey}.title`) !== `serviceItems.${itemKey}.title`
              ? t(`serviceItems.${itemKey}.title`)
              : item.title;
            const itemDesc = language !== 'en' && t(`serviceItems.${itemKey}.description`) !== `serviceItems.${itemKey}.description`
              ? t(`serviceItems.${itemKey}.description`)
              : item.description;

            return (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 p-8 rounded-[6px] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-[6px] flex items-center justify-center mb-6 text-slate-700 dark:text-slate-200 group-hover:text-primary-600 group-hover:border-primary-500/30 group-hover:bg-primary-50/50 dark:group-hover:bg-primary-950/30 transition-all duration-300 shadow-2xs">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-[21px] font-semibold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary-600 transition-colors leading-[1.2] tracking-[-0.015em]">
                    {itemTitle}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-[16px] leading-[1.47] tracking-[-0.015em] mb-6">
                    {itemDesc}
                  </p>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="pt-4 border-t border-slate-200/80 flex flex-wrap gap-2">
                    {item.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-[11px] font-medium rounded-[6px] shadow-2xs"
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
