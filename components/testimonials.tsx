'use client';

import { Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary-100 -z-0" />
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-medium text-slate-900 mb-8 leading-relaxed italic">
                "Working with this developer was a game-changer for our product. They didn't just build what we asked for; they challenged our assumptions and delivered a system that was far more scalable and efficient than we imagined."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-bold text-slate-900">Sarah Jenkins</p>
                  <p className="text-sm text-slate-500">CTO at TechFlow Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
