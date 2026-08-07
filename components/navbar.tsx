'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/language-context';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/blogs', label: t('blogs') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3.5 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <Image src="/logo-naim.png" width={95} height={55} alt="naim" className="h-auto w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? 'text-primary-600 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-700 transition-all shadow-sm"
          >
            {t('hireMe')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
