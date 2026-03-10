'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-900 font-bold tracking-tighter text-xl">
            <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900">
          <Image src={"/logo-naim.png"} width={100} height={60} alt='naim'/>
        </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="https://github.com/naimekattor" className="text-slate-500 hover:text-slate-900 transition-colors"><Github className="w-5 h-5" /></Link>
            <Link href="bd.linkedin.com/in/naimekattor" className="text-slate-500 hover:text-slate-900 transition-colors"><Linkedin className="w-5 h-5" /></Link>
            <Link href="mailto:naimekttor@gmail.com" className="text-slate-500 hover:text-slate-900 transition-colors"><Mail className="w-5 h-5" /></Link>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.NaimEkattor
          </div>
        </div>
      </div>
    </footer>
  );
}
