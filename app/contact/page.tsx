'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CTA } from '@/components/cta';
import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-slate-800 border border-primary-100 dark:border-slate-700 text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" /> {t('cta.badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
              {t('cta.title')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('cta.subheading')}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Info Cards */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
                  Direct Email
                </span>
                <a
                  href="mailto:naim.dev.tech@gmail.com"
                  className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-primary-600 transition-colors"
                >
                  naim.dev.tech@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-secondary-50 dark:bg-slate-800 text-secondary-600 dark:text-secondary-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
                  Response Time
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Within 24 Hours</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
                  Availability
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Open for Global Remote Work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive CTA Contact Component */}
      <section className="flex-1">
        <CTA />
      </section>

      <Footer />
    </main>
  );
}
