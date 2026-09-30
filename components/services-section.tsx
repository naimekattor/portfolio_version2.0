'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/language-context';

const DEFAULT_3D_ASSETS = [
  { img: '/images/services/3d-chrome-cross.png', isLight: false },
  { img: '/images/services/3d-glass-spiral.png', isLight: true },
  { img: '/images/services/3d-chrome-cubes.png', isLight: false },
  { img: '/images/services/3d-holographic-torus.png', isLight: true },
  { img: '/images/services/3d-chrome-sphere.png', isLight: false },
  { img: '/images/services/3d-chrome-cross.png', isLight: true },
];

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
      image3d: '/images/services/3d-chrome-cross.png',
      isLight: false,
      tags: ['E-commerce', 'SaaS', 'Next.js', 'Stripe'],
    },
    {
      id: '2',
      title: 'AI Agent Building & Chatbots',
      description:
        'Building specialized autonomous AI agents: HR Agents, AI Receptionists, 24/7 message handling, and Support RAG Assistants.',
      image3d: '/images/services/3d-glass-spiral.png',
      isLight: true,
      tags: ['HR Agent', 'AI Receptionist', 'Sales Agent', 'RAG'],
    },
    {
      id: '3',
      title: 'n8n & Social Media Automation',
      description:
        'Automating user engagement and lead generation across WhatsApp, Messenger, and Instagram alongside complex n8n backend workflows.',
      image3d: '/images/services/3d-chrome-cubes.png',
      isLight: false,
      tags: ['n8n', 'WhatsApp API', 'Messenger', 'Instagram'],
    },
    {
      id: '4',
      title: 'AI Education & School Systems',
      description:
        'Developing modern learning management portals, student record systems, and AI-assisted grading tools for educational institutions.',
      image3d: '/images/services/3d-holographic-torus.png',
      isLight: true,
      tags: ['School Systems', 'Education', 'LMS', 'AI Portal'],
    },
    {
      id: '5',
      title: 'AI-Powered Websites',
      description:
        'Transforming traditional marketing sites into intelligent, interactive web platforms with real-time AI personalization.',
      image3d: '/images/services/3d-chrome-sphere.png',
      isLight: false,
      tags: ['AI-Powered', 'Personalization', 'React', 'TypeScript'],
    },
    {
      id: '6',
      title: 'System Architecture & Microservices',
      description:
        'High-throughput distributed systems, event-driven architectures, automated CI/CD pipelines, and bulletproof cloud infrastructure.',
      image3d: '/images/services/3d-glass-spiral.png',
      isLight: true,
      tags: ['Microservices', 'Docker', 'PostgreSQL', 'Cloud'],
    },
  ],
};

function ServiceCard3D({
  item,
  index,
  itemTitle,
  itemDesc,
  isLight,
  image3d,
}: {
  item: any;
  index: number;
  itemTitle: string;
  itemDesc: string;
  isLight: boolean;
  image3d: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative rounded-[6px] p-8 sm:p-9 min-h-[460px] sm:min-h-[490px] flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-all duration-500 hover:scale-[1.015] hover:bg-[#a67a3b] dark:hover:bg-[#a67a3b] hover:border-[#a67a3b] hover:shadow-2xl hover:shadow-[#a67a3b]/30 ${
        isLight
          ? 'bg-white text-slate-950 border border-slate-200/80 shadow-xl'
          : 'bg-[#121417] dark:bg-[#0f1115] text-white border border-white/10 shadow-2xl hover:shadow-black/60'
      }`}
    >
      {/* Dynamic Hover Background Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#a67a3b]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-white/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Top Header: Title & Description with 3D Depth */}
      <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">
        <h3
          className={`text-2xl sm:text-[27px] font-bold tracking-tight mb-4 leading-tight max-w-[270px] transition-colors duration-300 ${
            isLight ? 'text-slate-950 group-hover:text-white' : 'text-white'
          }`}
        >
          {itemTitle}
        </h3>
        <p
          className={`text-sm sm:text-[14.5px] leading-relaxed max-w-[270px] transition-colors duration-300 ${
            isLight
              ? 'text-slate-600 group-hover:text-white/90'
              : 'text-slate-400 group-hover:text-white/90'
          }`}
        >
          {itemDesc}
        </p>
      </div>

      {/* Floating 3D Object in Bottom-Right Corner */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
        style={{ transform: 'translateZ(55px)' }}
        className="absolute -bottom-6 -right-6 w-48 h-48 sm:w-56 sm:h-56 pointer-events-none select-none z-0"
      >
        <img
          src={image3d.replace(/\.jpg$/, '.png')}
          alt={itemTitle}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-[0_16px_32px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

      {/* Bottom Action: KNOW MORE with Circular Arrow Button */}
      <div style={{ transform: 'translateZ(35px)' }} className="relative z-10 pt-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3.5 group/btn"
        >
          <span
            className={`text-xs font-bold tracking-[0.14em] uppercase transition-colors duration-300 ${
              isLight
                ? 'text-slate-900 group-hover:text-white'
                : 'text-white/90 group-hover:text-white'
            }`}
          >
            KNOW MORE
          </span>
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:translate-x-1 ${
              isLight
                ? 'bg-slate-900 text-white group-hover:bg-white group-hover:text-[#a67a3b]'
                : 'bg-white text-slate-950 group-hover:bg-white group-hover:text-[#a67a3b]'
            }`}
          >
            <ArrowRight className="w-4 h-4 rtl-flip" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const [data, setData] = useState(DEFAULT_SERVICES);
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/site-settings`
        );
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
        console.warn(
          'Backend offline or unreachable, using default services section settings'
        );
      }
    }
    fetchSettings();
  }, []);

  const badgeText = language !== 'en' ? t('services.badge') : 'What I Offer';
  const subtitleText =
    language !== 'en' ? t('services.subheading') : data.sectionSubtitle;

  return (
    <section
      className="py-24 md:py-28 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300"
      id="services"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-primary-600/10 via-secondary-500/5 to-transparent dark:from-primary-500/10 dark:via-secondary-500/5 blur-[160px] pointer-events-none -z-10"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800 text-primary-600 dark:text-primary-400 text-[12px] font-semibold tracking-[0.04em] uppercase mb-4">
            <Layers className="w-3.5 h-3.5" /> {badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100 leading-[1.12] mb-4">
            {language !== 'en' ? (
              t('services.title')
            ) : (
              <>
                Engineering Custom Platforms{' '}
                <span className="text-primary-600 dark:text-primary-400">
                  & AI Systems
                </span>
              </>
            )}
          </h2>
          <p className="text-lg sm:text-[19px] text-slate-600 dark:text-slate-400 leading-[1.42] tracking-[-0.016em]">
            {subtitleText}
          </p>
        </div>

        {/* 3D Service Cards Grid matching user's reference design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.items?.map((item: any, i: number) => {
            const itemKey = String(i + 1);
            const itemTitle =
              language !== 'en' &&
              t(`serviceItems.${itemKey}.title`) !==
                `serviceItems.${itemKey}.title`
                ? t(`serviceItems.${itemKey}.title`)
                : item.title;
            const itemDesc =
              language !== 'en' &&
              t(`serviceItems.${itemKey}.description`) !==
                `serviceItems.${itemKey}.description`
                ? t(`serviceItems.${itemKey}.description`)
                : item.description;

            const defaultAsset = DEFAULT_3D_ASSETS[i % DEFAULT_3D_ASSETS.length];
            const isLight =
              item.isLight !== undefined ? item.isLight : defaultAsset.isLight;
            const rawImg = item.image3d || defaultAsset.img;
            const image3d = rawImg.replace(/\.jpg$/, '.png');

            return (
              <ServiceCard3D
                key={item.id || i}
                item={item}
                index={i}
                itemTitle={itemTitle}
                itemDesc={itemDesc}
                isLight={isLight}
                image3d={image3d}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

