'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '../messages/en.json';
import esMessages from '../messages/es.json';
import frMessages from '../messages/fr.json';
import deMessages from '../messages/de.json';
import bnMessages from '../messages/bn.json';
import jaMessages from '../messages/ja.json';

type Language = 'en' | 'es' | 'fr' | 'de' | 'bn' | 'ja';

const MESSAGES_MAP: Record<Language, any> = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  de: deMessages,
  bn: bnMessages,
  ja: jaMessages,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('user_language') as Language;
    if (stored && MESSAGES_MAP[stored]) {
      setLanguageState(stored);
      document.documentElement.setAttribute('lang', stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('user_language', lang);
    document.documentElement.setAttribute('lang', lang);
  };

  const currentMessages = MESSAGES_MAP[language] || enMessages;

  const t = (key: string): string => {
    // Helper function to resolve nested keys like "nav.home"
    const keys = key.split('.');
    let result = currentMessages;
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <NextIntlClientProvider locale={language} messages={currentMessages} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
