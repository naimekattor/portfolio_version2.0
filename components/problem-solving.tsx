'use client';

import { CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const problems = [
  {
    title: "Scalability Bottlenecks",
    problem: "Legacy systems failing under high traffic loads during peak hours.",
    solution: "Implemented microservices architecture with Redis caching and horizontal scaling, reducing latency by 60%.",
    icon: Zap,
  },
  {
    title: "Data Security Risks",
    problem: "Vulnerable authentication flows and unencrypted sensitive user data.",
    solution: "Architected a secure OAuth2/OIDC flow with end-to-end encryption and automated security audits.",
    icon: Shield,
  },
  {
    title: "Inefficient Workflows",
    problem: "Manual data entry processes costing teams 20+ hours per week.",
    solution: "Built an AI-powered automation engine that reduced manual effort by 85% using LLM-based extraction.",
    icon: BarChart3,
  }
];

export function ProblemSolving() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Solving Real Problems</h2>
          <p className="text-slate-600 max-w-2xl">I don't just write code; I engineer solutions that address critical business pain points.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, i) => (
            <motion.div 
              key={i}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">The Problem</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-1">The Solution</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
