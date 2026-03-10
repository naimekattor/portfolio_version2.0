'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedGrid } from './ui/grid-background';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <AnimatedGrid className="z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 border border-secondary-100 text-secondary-600 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            Available for new projects
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-primary-600 leading-[1.1] mb-8"
          >
            Full-Stack Developer Building <span className="text-secondary-600">Scalable AI-Powered</span> Web Applications
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-primary-600 mb-10 max-w-2xl leading-relaxed"
          >
            I bridge the gap between complex technical problems and elegant, production-ready solutions that deliver real business value.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary-600/20">
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl border border-primary-100 hover:border-primary-200 hover:bg-primary-50 transition-all">
             <Link target='_blank' href={"https://drive.google.com/file/d/1wlKh0G_yN_v7uOFnVjonwCqk9_ROxuPB/view?usp=sharing"}>
              Download Resume
              </Link>
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 -z-10 w-1/2 h-full pointer-events-none"
      >
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-400/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-400/20 rounded-full blur-[100px]"></div>
      </motion.div>
    </section>
  );
}
