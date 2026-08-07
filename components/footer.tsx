'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/language-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
              <Image src="/logo-naim.png" width={95} height={55} alt="naim" className="h-auto w-auto" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.home')}</Link>
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link href="/projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.projects')}</Link>
            <Link href="/blogs" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.blogs')}</Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.contact')}</Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/naimekattor" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://bd.linkedin.com/in/naimekattor" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:naimekttor@gmail.com" className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div>© {new Date().getFullYear()} Naim. {t('footer.rights')}</div>
          <div>{t('footer.builtWith')}</div>
        </div>
      </div>
    </footer>
  );
}
