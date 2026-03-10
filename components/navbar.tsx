'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900">
          <Image src={"/logo-naim.png"} width={100} height={60} alt='naim'/>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#projects" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Projects</Link>
          <Link href="#expertise" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Expertise</Link>
          <Link href="#blog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Blog</Link>
          <Link href="#contact" className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-800 transition-all">
            Hire Me
          </Link>
        </div>
      </div>
    </nav>
  );
}
