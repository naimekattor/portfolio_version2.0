'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import TechnicalExpertise from '@/components/technical-expertise';
import { User, Briefcase, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_EXPERIENCES = [
  {
    id: '1',
    company: 'TechFlow Systems',
    position: 'Senior Full-Stack Engineer',
    duration: '2022 — Present',
    description:
      'Architected microservices, AI workflows, and high-concurrency web applications scaling to 1M+ users.',
    responsibilities: [
      'Led migration from monolithic architecture to Next.js microservices',
      'Implemented Redis caching reducing database load by 60%',
      'Integrated LLM automated document extraction pipelines',
    ],
  },
  {
    id: '2',
    company: 'Stackform Digital',
    position: 'Full-Stack Developer',
    duration: '2020 — 2022',
    description:
      'Built custom SaaS web portals, PostgreSQL data pipelines, and responsive frontend UI components.',
    responsibilities: [
      'Engineered real-time analytics dashboard with Socket.IO',
      'Developed OAuth2 authentication flows and security controls',
    ],
  },
];

export default function AboutPage() {
  const [experiences, setExperiences] = useState<any[]>(DEFAULT_EXPERIENCES);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch('http://localhost:4000/api/v1/experiences');
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setExperiences(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load experiences:', err);
      }
    }
    fetchExperiences();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-slate-800 border border-primary-100 dark:border-slate-700 text-primary-600 text-xs font-bold uppercase tracking-wider mb-6">
              <User className="w-3.5 h-3.5" /> About Naim
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-6">
              Engineering Scalable Systems with a <span className="text-primary-600">Product-Level Mindset</span>.
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
              I am a Full-Stack Engineer specializing in modern web applications, AI integrations, microservice backend architecture, and high-performance databases.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://drive.google.com/file/d/1wlKh0G_yN_v7uOFnVjonwCqk9_ROxuPB/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all inline-flex items-center gap-2"
              >
                Let&rsquo;s Work Together <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Story */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Bridging Technical Complexity & Real Business Value
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                I don't just write code to meet specifications — I evaluate architectural trade-offs, scalability bottlenecks, and user experience outcomes.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether it's building sub-100ms APIs, optimizing frontend bundle sizes, or deploying AI-powered workflow automation, I focus on shipping production-ready systems that last.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-1">5+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Years Experience</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-3xl font-extrabold text-secondary-600 dark:text-secondary-400 mb-1">20+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Projects Shipped</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-1">99.9%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Uptime Focus</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-3xl font-extrabold text-secondary-600 dark:text-secondary-400 mb-1">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Clean Code</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5" /> Work Experience
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Career Trajectory</h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{exp.position}</h3>
                  <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 w-fit">
                    {exp.duration || `${exp.startDate} - ${exp.endDate}`}
                  </span>
                </div>
                <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-4">{exp.company}</div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{exp.description}</p>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r: string, rIdx: number) => (
                      <li key={rIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Expertise Component */}
      <TechnicalExpertise />

      <Footer />
    </main>
  );
}
