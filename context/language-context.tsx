'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de' | 'bn' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About Me',
    projects: 'Projects',
    blogs: 'Writing & Insights',
    contact: 'Contact',
    hireMe: 'Hire Me',
    heroTag: 'Available for Global Contract & Full-Time Work',
    heroTitle: 'Delivering Real Business Value & High-Impact Systems',
    heroSub: 'Full-Stack Engineer specializing in scalable web applications, autonomous AI agents, school systems, and social media automation.',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
    servicesTitle: 'Services & Automated Solutions',
    servicesSub: 'Custom web platforms, intelligent AI agents, EdTech school systems, and social media automation.',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    blogs: 'Escritos e Ideas',
    contact: 'Contacto',
    hireMe: 'Contrátame',
    heroTag: 'Disponible para contratos globales y tiempo completo',
    heroTitle: 'Entregando Valor Empresarial Real y Sistemas de Alto Impacto',
    heroSub: 'Ingeniero Full-Stack especializado en aplicaciones web escalables, agentes de IA autónomos y automatización.',
    viewProjects: 'Ver Proyectos',
    contactMe: 'Contáctame',
    servicesTitle: 'Servicios y Soluciones Automatizadas',
    servicesSub: 'Plataformas web personalizadas, agentes inteligentes de IA y automatización.',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    blogs: 'Écrits & Perspectives',
    contact: 'Contact',
    hireMe: 'Me Recruter',
    heroTag: 'Disponible pour contrats mondiaux et temps plein',
    heroTitle: 'Créer de la Valeur Métier Réelle et des Systèmes à Fort Impact',
    heroSub: 'Ingénieur Full-Stack spécialisé dans les applications web scalables et agents IA autonomes.',
    viewProjects: 'Voir les Projets',
    contactMe: 'Me Contacter',
    servicesTitle: 'Services & Solutions Automatisées',
    servicesSub: 'Plateformes web sur mesure, agents IA intelligents et automatisation.',
  },
  de: {
    home: 'Startseite',
    about: 'Über mich',
    projects: 'Projekte',
    blogs: 'Artikel & Einblicke',
    contact: 'Kontakt',
    hireMe: 'Beauftragen',
    heroTag: 'Verfügbar für globale Verträge & Vollzeit',
    heroTitle: 'Echter Mehrwert & Hochleistungs-Systeme',
    heroSub: 'Full-Stack-Ingenieur für skalierbare Webanwendungen, KI-Agenten und Prozessautomatisierung.',
    viewProjects: 'Projekte Ansehen',
    contactMe: 'Kontaktieren',
    servicesTitle: 'Dienstleistungen & Automatisierung',
    servicesSub: 'Individuelle Webplattformen, intelligente KI-Agenten und Automatisierung.',
  },
  bn: {
    home: 'হোম',
    about: 'আমার সম্পর্কে',
    projects: 'প্রজেক্টসমূহ',
    blogs: 'ব্লগ ও ভাবনা',
    contact: 'যোগাযোগ',
    hireMe: 'হায়ার করুন',
    heroTag: 'রিমোট ও ফুল-টাইম কাজের জন্য উন্মুক্ত',
    heroTitle: 'বাস্তব ব্যবসা এবং হাই-ইম্প্যাক্ট সিস্টেম তৈরি',
    heroSub: 'ফুল-স্ট্যাক ডেভেলপার - ওয়েব অ্যাপ, এআই এজেন্ট এবং সোশ্যাল মিডিয়া অটোমেশনে পারদর্শী।',
    viewProjects: 'প্রজেক্ট দেখুন',
    contactMe: 'যোগাযোগ করুন',
    servicesTitle: 'সার্ভিস ও অটোমেশন সলিউশন',
    servicesSub: 'কাস্টম ওয়েব প্ল্যাটফর্ম, এআই এজেন্ট এবং প্রসেস অটোমেশন।',
  },
  ja: {
    home: 'ホーム',
    about: '私について',
    projects: 'プロジェクト',
    blogs: '記事とインサイト',
    contact: 'お問い合わせ',
    hireMe: 'ご依頼',
    heroTag: 'グローバル契約およびフルタイム対応可能',
    heroTitle: 'ビジネスの価値と高インパクトなシステムを提供',
    heroSub: 'スケーラブルなWebアプリ、AIエージェント、自動化に特化したフルスタックエンジニア。',
    viewProjects: 'プロジェクトを見る',
    contactMe: 'お問い合わせ',
    servicesTitle: 'サービスと自動化ソリューション',
    servicesSub: 'カスタムWebプラットフォーム、インテリジェントAIエージェント、自動化。',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('user_language') as Language;
    if (stored && TRANSLATIONS[stored]) {
      setLanguageState(stored);
      document.documentElement.setAttribute('lang', stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('user_language', lang);
    document.documentElement.setAttribute('lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
