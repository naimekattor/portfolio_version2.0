'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "Working with this developer was a game-changer for our product. They didn't just build what we asked for — they challenged our assumptions and delivered a system that was far more scalable and efficient than we imagined.",
    name: 'Sarah Jenkins',
    role: 'CTO at TechFlow Systems',
    color: '#174d4d',
    initials: 'SJ',
  },
  {
    quote:
      'Exceptional technical depth combined with clear communication. Every sprint delivered measurable outcomes. Our infrastructure costs dropped by 40% within two months of engagement.',
    name: 'Marcus Okafor',
    role: 'VP Engineering, NovaPay',
    color: '#a67a3b',
    initials: 'MO',
  },
  {
    quote:
      'The AI integration they built for us went live in three weeks and immediately reduced our support ticket volume by 60%. That kind of velocity with that level of quality is rare.',
    name: 'Priya Sharma',
    role: 'Head of Product, Loopwise',
    color: '#174d4d',
    initials: 'PS',
  },
  {
    quote:
      "They brought a product-level mindset to every technical decision. It wasn't just about writing code — it was about solving the right problems. Our team grew significantly from working alongside them.",
    name: 'Daniel Kruse',
    role: 'CEO, Stackform',
    color: '#a67a3b',
    initials: 'DK',
  },
];

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
      <path
        d="M0 28V17.6C0 12.693 1.387 8.853 4.16 6.08 6.933 3.307 10.88 1.493 16 0.64L17.28 3.52C14.507 4.267 12.373 5.493 10.88 7.2 9.387 8.907 8.64 10.88 8.64 13.12H15.36V28H0ZM20.64 28V17.6C20.64 12.693 22.027 8.853 24.8 6.08 27.573 3.307 31.52 1.493 36.64.64L37.92 3.52C35.147 4.267 33.013 5.493 31.52 7.2 30.027 8.907 29.28 10.88 29.28 13.12H36V28H20.64Z"
        fill={color}
        fillOpacity="0.15"
      />
    </svg>
  );
}

function StarRow({ color }: { color: string }) {
  return (
    <div className="flex gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={color} className="opacity-90">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

import { useLanguage } from '../context/language-context';

export function Testimonials() {
  const { t, language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const [testimonials, setTestimonials] = useState<any[]>(DEFAULT_TESTIMONIALS);
  const [headerInfo, setHeaderInfo] = useState({
    badge: 'Client Stories',
    title: 'Trusted by Teams that Ship',
    subheading: 'Real words from the people behind the products.',
    bottomStripText: '4 of many',
  });

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);

    async function fetchSettings() {
      try {
        const res = await fetch('http://localhost:4000/api/v1/site-settings');
        if (res.ok) {
          const json = await res.json();
          if (json.data?.testimonials_section_header) {
            setHeaderInfo((prev) => ({ ...prev, ...json.data.testimonials_section_header }));
          }
          if (json.data?.testimonials_items && Array.isArray(json.data.testimonials_items) && json.data.testimonials_items.length > 0) {
            setTestimonials(json.data.testimonials_items);
          }
        }
      } catch (err) {
        console.error('Failed to load testimonials settings:', err);
      }
    }

    fetchSettings();
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, testimonials]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const badgeText = language !== 'en' ? t('testimonialsSection.badge') : headerInfo.badge || 'Client Stories';
  const titleText = language !== 'en' ? t('testimonialsSection.title') : headerInfo.title || 'Trusted by Teams that Ship';
  const subtitleText = language !== 'en' ? t('testimonialsSection.subheading') : headerInfo.subheading || 'Real words from the people behind the products.';

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-600/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col items-center text-center mb-14 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-[#174d4d] mb-5 px-4.5 py-1.5 rounded-full bg-[#174d4d]/10 border border-[#174d4d]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#174d4d] inline-block" />
            {badgeText}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {titleText}
          </h2>

          <p className="text-base md:text-lg text-slate-600 max-w-md leading-relaxed font-medium">
            {subtitleText}
          </p>
        </div>

        {/* Carousel viewport */}
        <div ref={emblaRef} className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
          <div className="flex -ml-5">
            {testimonials.map((t, i) => {
              const isActive = i === selectedIndex;
              return (
                <div key={i} className="flex-[0_0_88%] md:flex-[0_0_660px] min-w-0 pl-5">
                  <div
                    className={`relative rounded-3xl p-8 md:p-11 transition-all duration-500 backdrop-blur-xl border ${
                      isActive
                        ? 'bg-white border-slate-300 shadow-2xl scale-100 opacity-100'
                        : 'bg-white/60 border-slate-200 shadow-sm scale-95 opacity-50'
                    }`}
                  >
                    {/* Top indicator bar */}
                    <div
                      className={`absolute top-0 left-11 right-11 h-1 rounded-b bg-gradient-to-r from-transparent via-[#174d4d] to-transparent transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    <div className="relative z-10">
                      {/* Rating stars */}
                      <StarRow color={t.color || '#174d4d'} />

                      {/* Quote mark icon */}
                      <div className="mb-4">
                        <QuoteIcon color={t.color || '#174d4d'} />
                      </div>

                      {/* Quote text */}
                      <p className="text-base md:text-xl font-normal text-slate-800 leading-relaxed mb-8 tracking-tight">
                        "{t.quote}"
                      </p>

                      {/* Divider line */}
                      <div
                        className={`h-px bg-gradient-to-r from-[#174d4d]/30 to-transparent mb-6 transition-all duration-700 ${
                          isActive ? 'w-full' : 'w-2/5'
                        }`}
                      />

                      {/* Author credentials */}
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm text-white shadow-md shrink-0"
                          style={{ backgroundColor: t.color || '#174d4d' }}
                        >
                          {t.initials || 'CT'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 mb-0.5">{t.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-9">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-7 bg-[#174d4d] shadow' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Footer rule strip */}
        <div
          className={`flex items-center justify-center gap-5 mt-12 transition-opacity duration-1000 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300" />
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-slate-400 whitespace-nowrap">
            {headerInfo.bottomStripText
              ? headerInfo.bottomStripText.replace('{count}', String(testimonials.length))
              : `${testimonials.length} OF MANY`}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent" />
        </div>
      </div>
    </section>
  );
}