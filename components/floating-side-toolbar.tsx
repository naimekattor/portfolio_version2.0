'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Languages, Sun, Moon, ArrowUp, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/language-context';

const COLOR_THEMES = [
  { id: 'system', name: 'System Default', color: '#174d4d', badge: 'Auto' },
  { id: 'warm-amber', name: 'Warm Amber', color: '#b5502f', badge: 'Amber' },
  { id: 'emerald-tech', name: 'Emerald Tech', color: '#10b981', badge: 'Emerald' },
  { id: 'deep-indigo', name: 'Deep Indigo', color: '#6366f1', badge: 'Indigo' },
  { id: 'slate-minimal', name: 'Minimalist Slate', color: '#38bdf8', badge: 'Slate' },
  { id: 'sunset-purple', name: 'Sunset Violet', color: '#a855f7', badge: 'Violet' },
];

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export function FloatingSideToolbar() {
  const { language, setLanguage } = useLanguage();
  const [activePanel, setActivePanel] = useState<'theme' | 'language' | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Load stored theme & dark mode
    const storedTheme = localStorage.getItem('user_color_theme') || 'system';
    const storedDark = localStorage.getItem('user_dark_mode') === 'true';

    setSelectedTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);

    setIsDarkMode(storedDark);
    if (storedDark) {
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem('user_color_theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    setActivePanel(null);
  };

  const handleLangSelect = (code: string) => {
    setLanguage(code as any);
    setActivePanel(null);
  };

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem('user_dark_mode', String(nextDark));
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center select-none">
      {/* Flyout Panel */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mr-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl w-64 text-slate-900 dark:text-slate-100"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {activePanel === 'theme' ? 'Select Color Theme' : 'Select Language'}
              </h4>
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Theme Selector List */}
            {activePanel === 'theme' && (
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {COLOR_THEMES.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary-50 dark:bg-slate-800 text-primary-600 font-bold border border-primary-100 dark:border-slate-700'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: theme.color }}
                        />
                        <span>{theme.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-primary-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Language Selector List */}
            {activePanel === 'language' && (
              <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                {LANGUAGES.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary-50 dark:bg-slate-800 text-primary-600 font-bold border border-primary-100 dark:border-slate-700'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-primary-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Side Bar */}
      <div className="flex flex-col bg-white dark:bg-slate-900 border-y border-l border-slate-200/90 dark:border-slate-800 rounded-l-2xl shadow-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/80">
        {/* Color Theme Switcher Button */}
        <button
          onClick={() => setActivePanel(activePanel === 'theme' ? null : 'theme')}
          title="Switch Color Theme"
          className={`p-3.5 transition-colors relative group ${
            activePanel === 'theme'
              ? 'bg-primary-50 dark:bg-slate-800 text-primary-600'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900'
          }`}
        >
          <Palette className="w-5 h-5" />
          <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Theme Palette
          </span>
        </button>

        {/* Language Switcher Button */}
        <button
          onClick={() => setActivePanel(activePanel === 'language' ? null : 'language')}
          title="Switch Language"
          className={`p-3.5 transition-colors relative group ${
            activePanel === 'language'
              ? 'bg-primary-50 dark:bg-slate-800 text-primary-600'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900'
          }`}
        >
          <Languages className="w-5 h-5" />
          <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Language ({language.toUpperCase()})
          </span>
        </button>

        {/* Dark/Light Quick Toggle */}
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-3.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 transition-colors relative group"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
          <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="p-3.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 transition-colors relative group"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              Scroll to Top
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
