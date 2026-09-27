"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "../context/language-context";

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "Working with this developer was a game-changer for our product. They didn't just build what we asked for — they challenged our assumptions and delivered a system that was far more scalable and efficient than we imagined.",
    name: "Sarah Jenkins",
    role: "CTO at TechFlow Systems",
    color: "#174d4d",
    initials: "SJ",
  },
  {
    quote:
      "Exceptional technical depth combined with clear communication. Every sprint delivered measurable outcomes. Our infrastructure costs dropped by 40% within two months of engagement.",
    name: "Marcus Okafor",
    role: "VP Engineering, NovaPay",
    color: "#a67a3b",
    initials: "MO",
  },
  {
    quote:
      "The AI integration they built for us went live in three weeks and immediately reduced our support ticket volume by 60%. That kind of velocity with that level of quality is rare.",
    name: "Priya Sharma",
    role: "Head of Product, Loopwise",
    color: "#174d4d",
    initials: "PS",
  },
  {
    quote:
      "They brought a product-level mindset to every technical decision. It wasn't just about writing code — it was about solving the right problems. Our team grew significantly from working alongside them.",
    name: "Daniel Kruse",
    role: "CEO, Stackform",
    color: "#a67a3b",
    initials: "DK",
  },
];

function QuoteIcon({ color }: { color?: string }) {
  return (
    <Quote
      className="w-8 h-8 text-primary-600/30 dark:text-primary-400/30 rotate-180"
      aria-hidden="true"
    />
  );
}

function StarRow() {
  return (
    <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5 fill-secondary-500 text-secondary-500 opacity-90"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t, language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const [testimonials, setTestimonials] = useState<any[]>(DEFAULT_TESTIMONIALS);
  const [headerInfo, setHeaderInfo] = useState({
    badge: "Client Stories",
    title: "Trusted by Teams that Ship",
    subheading: "Real words from the people behind the products.",
    bottomStripText: "4 of many",
  });

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);

    async function fetchSettings() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/site-settings`);
        if (res.ok) {
          const json = await res.json();
          if (json.data?.testimonials_section_header) {
            setHeaderInfo((prev) => ({
              ...prev,
              ...json.data.testimonials_section_header,
            }));
          }
          if (
            json.data?.testimonials_items &&
            Array.isArray(json.data.testimonials_items) &&
            json.data.testimonials_items.length > 0
          ) {
            setTestimonials(json.data.testimonials_items);
          }
        }
      } catch (err) {
        console.warn("Backend offline or unreachable, using default testimonials settings");
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
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  const badgeText =
    language !== "en"
      ? t("testimonialsSection.badge")
      : headerInfo.badge || "Client Stories";
  const titleText =
    language !== "en"
      ? t("testimonialsSection.title")
      : headerInfo.title || "Trusted by Teams that Ship";
  const subtitleText =
    language !== "en"
      ? t("testimonialsSection.subheading")
      : headerInfo.subheading ||
        "Real words from the people behind the products.";

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-600/10 dark:bg-primary-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary-600/10 dark:bg-secondary-500/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col items-center text-center mb-14 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-primary-600 dark:text-primary-400 mb-5 px-4.5 py-1.5 rounded-[6px] bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 inline-block" />
            {badgeText}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100 leading-[1.12] mb-4">
            {language !== "en" ? (
              t("testimonialsSection.title")
            ) : (
              <>
                Trusted by{" "}
                <span className="text-primary-600">Teams that Ship</span>
              </>
            )}
          </h2>

          <p className="text-lg sm:text-[19px] text-slate-600 dark:text-slate-400 max-w-md leading-[1.42] tracking-[-0.016em] font-normal">
            {subtitleText}
          </p>
        </div>

        {/* Carousel viewport */}
        <div
          ref={emblaRef}
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing"
        >
          <div className="flex -ml-5">
            {testimonials.map((tItem, i) => {
              const isActive = i === selectedIndex;
              return (
                <div
                  key={i}
                  className="flex-[0_0_88%] md:flex-[0_0_660px] min-w-0 pl-5"
                >
                  <div
                    className={`relative rounded-[6px] p-8 md:p-11 transition-all duration-500 backdrop-blur-xl border ${
                      isActive
                        ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-2xl scale-100 opacity-100"
                        : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/60 shadow-sm scale-95 opacity-50"
                    }`}
                  >
                    {/* Top indicator bar */}
                    <div
                      className={`absolute top-0 left-11 right-11 h-1 rounded-b bg-gradient-to-r from-transparent via-primary-600 to-transparent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div className="relative z-10">
                      {/* Rating stars */}
                      <StarRow />

                      {/* Quote mark icon */}
                      <div className="mb-4">
                        <QuoteIcon color={tItem.color || "#174d4d"} />
                      </div>

                      {/* Quote text */}
                      <p className="text-base md:text-xl font-normal text-slate-800 dark:text-slate-200 leading-relaxed mb-8 tracking-tight">
                        "{tItem.quote}"
                      </p>

                      {/* Divider line */}
                      <div
                        className={`h-px bg-gradient-to-r from-primary-600/30 to-transparent mb-6 transition-all duration-700 ${
                          isActive ? "w-full" : "w-2/5"
                        }`}
                      />

                      {/* Author credentials */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-[6px] flex items-center justify-center font-extrabold text-sm text-white shadow-md shrink-0 bg-primary-600">
                          {tItem.initials || "CT"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-0.5">
                            {tItem.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {tItem.role}
                          </p>
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
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-[6px] transition-all duration-300 ${
                i === selectedIndex
                  ? "w-7 bg-primary-600 shadow"
                  : "w-2 bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Footer rule strip */}
        <div
          className={`flex items-center justify-center gap-5 mt-12 transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-800" />
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {headerInfo.bottomStripText
              ? headerInfo.bottomStripText.replace(
                  "{count}",
                  String(testimonials.length),
                )
              : `${testimonials.length} OF MANY`}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-300 dark:from-slate-800 to-transparent" />
        </div>
      </div>
    </section>
  );
}
