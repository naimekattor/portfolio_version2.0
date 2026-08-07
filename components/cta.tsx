'use client';

import React, { useState } from 'react';
import { ContactModal } from './contact-modal';
import { Calendar, Mail } from 'lucide-react';

export function CTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'call' | 'email'>('call');

  const openCallModal = () => {
    setModalMode('call');
    setModalOpen(true);
  };

  const openEmailModal = () => {
    setModalMode('email');
    setModalOpen(true);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-[#174d4d] rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-teal-900/30">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[3px] text-teal-100 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
              Accepting New Projects
            </div>

            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Let's build scalable <br />
              <span className="bg-gradient-to-r from-teal-200 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                products together
              </span>
            </h2>

            <p className="text-base md:text-xl text-teal-100/90 max-w-2xl mx-auto leading-relaxed font-medium">
              Currently accepting new client projects and full-time technical opportunities. Schedule a 1-on-1 call or send an inquiry below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={openCallModal}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#174d4d] font-bold rounded-2xl hover:bg-teal-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-[#174d4d]" />
                Schedule a Call
              </button>
              <button
                onClick={openEmailModal}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/15 text-white font-bold rounded-2xl border border-white/30 hover:bg-white/25 transition-all backdrop-blur-md shadow-lg hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5 text-teal-200" />
                Send an Email
              </button>
            </div>
          </div>

          {/* Signature Decorative Glows */}
          <div className="absolute top-0 left-0 w-full h-full opacity-25 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white rounded-full blur-[140px]" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-400 rounded-full blur-[140px]" />
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
      />
    </section>
  );
}
