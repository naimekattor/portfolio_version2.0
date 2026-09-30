'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Moon, Sun, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/language-context';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' || theme === 'dark' : true;

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/blogs', label: t('nav.blogs') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/75 dark:bg-[#0b0f17]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5 py-3 shadow-xs'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* ================= LEFT: Brand Logo ================= */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform hover:scale-105 duration-200"
            >
              <Image
                src="/logo-naim.png"
                width={95}
                height={55}
                alt="naim"
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          {/* ================= CENTER: Floating Pill Navigation ================= */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center bg-[#181818]/95 dark:bg-[#141416]/95 backdrop-blur-xl border border-white/10 dark:border-white/10 px-7 py-4 rounded-full shadow-xl shadow-black/20"
          >
            <div className="flex items-center gap-2 lg:gap-3">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200 px-3.5 py-1.5 rounded-full ${active
                      ? 'text-white bg-white/15 shadow-xs'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ================= RIGHT: Controls & Actions ================= */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Desktop Hire Me CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center h-[36px] px-5 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-primary-600/20"
            >
              {t('nav.hireMe')}
            </Link>

            {/* Circular Theme Toggle Button (Moon / Sun) */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full border border-slate-300 dark:border-white/20 bg-white/60 dark:bg-[#181818]/90 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center text-slate-800 dark:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Toggle theme"
            >
              <Moon
                className={`w-4 h-4 transition-transform duration-300 ${isDark ? 'scale-100 rotate-0' : 'scale-90 text-slate-700'
                  }`}
              />
            </button>

            {/* Minimalist 2-line Hamburger Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-full border border-slate-300 dark:border-white/20 bg-white/60 dark:bg-[#181818]/90 hover:bg-slate-100 dark:hover:bg-white/10 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-slate-800 dark:text-white transition-all shadow-xs"
              aria-label="Toggle menu"
            >
              <span
                className={`w-4 h-[1.5px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                  }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ================= Mobile & Quick Slide-out Drawer ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white dark:bg-[#10141b] border-l border-slate-200 dark:border-slate-800 z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                  <Link href="/" onClick={() => setMobileOpen(false)}>
                    <Image
                      src="/logo-naim.png"
                      width={80}
                      height={45}
                      alt="naim"
                      className="h-auto w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links in Drawer */}
                <div className="flex flex-col gap-2 py-6">
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-[6px] text-sm font-semibold tracking-wider uppercase transition-colors ${active
                          ? 'bg-primary-50 dark:bg-slate-800/80 text-primary-600 dark:text-primary-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        <span>{link.label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full h-[40px] bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold uppercase tracking-wider rounded-[6px] flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>{t('nav.hireMe')}</span>
                  <ArrowRight className="w-4 h-4 rtl-flip" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

