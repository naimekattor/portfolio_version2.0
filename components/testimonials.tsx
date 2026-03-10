'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif";

const testimonials = [
  {
    quote: "Working with this developer was a game-changer for our product. They didn't just build what we asked for — they challenged our assumptions and delivered a system that was far more scalable and efficient than we imagined.",
    name: "Sarah Jenkins",
    role: "CTO at TechFlow Systems",
    color: "#174d4d",
    initials: "SJ",
  },
  {
    quote: "Exceptional technical depth combined with clear communication. Every sprint delivered measurable outcomes. Our infrastructure costs dropped by 40% within two months of engagement.",
    name: "Marcus Okafor",
    role: "VP Engineering, NovaPay",
    color: "#a67a3b",
    initials: "MO",
  },
  {
    quote: "The AI integration they built for us went live in three weeks and immediately reduced our support ticket volume by 60%. That kind of velocity with that level of quality is rare.",
    name: "Priya Sharma",
    role: "Head of Product, Loopwise",
    color: "#174d4d",
    initials: "PS",
  },
  {
    quote: "They brought a product-level mindset to every technical decision. It wasn't just about writing code — it was about solving the right problems. Our team grew significantly from working alongside them.",
    name: "Daniel Kruse",
    role: "CEO, Stackform",
    color: "#a67a3b",
    initials: "DK",
  },
];

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
      <path d="M0 28V17.6C0 12.693 1.387 8.853 4.16 6.08 6.933 3.307 10.88 1.493 16 0.64L17.28 3.52C14.507 4.267 12.373 5.493 10.88 7.2 9.387 8.907 8.64 10.88 8.64 13.12H15.36V28H0ZM20.64 28V17.6C20.64 12.693 22.027 8.853 24.8 6.08 27.573 3.307 31.52 1.493 36.64.64L37.92 3.52C35.147 4.267 33.013 5.493 31.52 7.2 30.027 8.907 29.28 10.88 29.28 13.12H36V28H20.64Z"
        fill={color} fillOpacity="0.12"/>
    </svg>
  );
}

function StarRow({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={color} opacity="0.85">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const autoplay = Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [autoplay]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section style={{
      padding: '96px 0 112px',
      background: 'linear-gradient(165deg,#f0f2ed 0%,#eceee9 45%,#f2ede8 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner glows */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,77,77,0.07) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(166,122,59,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

      {/* Dot texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle,rgba(23,77,77,0.07) 1px,transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)',
      }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', marginBottom: '56px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(22px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: FONT, fontSize: '10px', fontWeight: 700,
            letterSpacing: '3.5px', textTransform: 'uppercase', color: '#174d4d',
            marginBottom: '20px', padding: '6px 18px', borderRadius: '100px',
            background: 'rgba(23,77,77,0.08)', border: '1.5px solid rgba(23,77,77,0.15)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#174d4d', display: 'inline-block' }} />
            Client Stories
          </div>

          <h2 style={{
            fontFamily: FONT,
            fontSize: 'clamp(34px,5vw,58px)', fontWeight: 800,
            lineHeight: 1.06, letterSpacing: '-2px', color: '#0a1a1a', marginBottom: '16px',
          }}>
            Trusted by{' '}
            <span style={{ background: 'linear-gradient(130deg,#174d4d,#2a8a7a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Teams
            </span>{' '}
            that{' '}
            <span style={{ background: 'linear-gradient(130deg,#a67a3b,#d4a055)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ship
            </span>
          </h2>

          <p style={{ fontFamily: FONT, fontSize: '17px', color: '#5e7878', maxWidth: '420px', lineHeight: 1.75 }}>
            Real words from the people behind the products.
          </p>
        </div>

        {/* Carousel viewport */}
        <div ref={emblaRef} style={{ overflow: 'hidden', cursor: 'grab' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {testimonials.map((t, i) => {
              const isActive = i === selectedIndex;
              return (
                <div
                  key={i}
                  style={{
                    flex: '0 0 min(680px, 90vw)',
                    minWidth: 0,
                    marginLeft: i === 0 ? 'auto' : undefined,
                    marginRight: i === testimonials.length - 1 ? 'auto' : undefined,
                  }}
                >
                  <div style={{
                    position: 'relative',
                    background: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                    border: `1.5px solid ${isActive ? t.color + '30' : 'rgba(23,60,60,0.07)'}`,
                    borderRadius: '26px',
                    padding: '44px 44px 38px',
                    transition: 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
                    transform: isActive ? 'scale(1)' : 'scale(0.96)',
                    opacity: isActive ? 1 : 0.45,
                    boxShadow: isActive
                      ? `0 24px 64px ${t.color}14, 0 4px 20px rgba(0,0,0,0.06)`
                      : '0 2px 10px rgba(0,0,0,0.04)',
                    backdropFilter: 'blur(12px)',
                    overflow: 'hidden',
                  }}>
                    {/* Top strip */}
                    <div style={{
                      position: 'absolute', top: 0, left: '44px', right: '44px', height: '3px',
                      background: `linear-gradient(90deg,transparent,${t.color},transparent)`,
                      borderRadius: '0 0 4px 4px',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }} />

                    {/* Glow */}
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '26px', pointerEvents: 'none',
                      background: `radial-gradient(ellipse 80% 45% at 10% 0%,${t.color}08,transparent)`,
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {/* Stars */}
                      <StarRow color={t.color} />

                      {/* Big quote mark */}
                      <div style={{ marginBottom: '18px' }}>
                        <QuoteIcon color={t.color} />
                      </div>

                      {/* Quote text */}
                      <p style={{
                        fontFamily: FONT,
                        fontSize: 'clamp(16px,2.2vw,20px)',
                        fontWeight: 400,
                        color: '#1a2e2e',
                        lineHeight: 1.75,
                        fontStyle: 'italic',
                        marginBottom: '32px',
                        letterSpacing: '-0.1px',
                      }}>
                        "{t.quote}"
                      </p>

                      {/* Divider */}
                      <div style={{
                        height: '1px',
                        background: `linear-gradient(90deg,${t.color}35,transparent)`,
                        marginBottom: '24px',
                        width: isActive ? '100%' : '40%',
                        transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
                      }} />

                      {/* Author */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '48px', height: '48px', borderRadius: '50%',
                          background: `${t.color}14`,
                          border: `2px solid ${t.color}28`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: FONT, fontSize: '14px', fontWeight: 800,
                          color: t.color, letterSpacing: '0.5px', flexShrink: 0,
                        }}>
                          {t.initials}
                        </div>
                        <div>
                          <p style={{ fontFamily: FONT, fontSize: '14.5px', fontWeight: 700, color: '#0c1c1c', marginBottom: '3px' }}>
                            {t.name}
                          </p>
                          <p style={{ fontFamily: FONT, fontSize: '12.5px', color: '#8aacac', fontWeight: 400 }}>
                            {t.role}
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

        {/* Dot nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '36px' }}>
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              style={{
                width: i === selectedIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '99px',
                background: i === selectedIndex ? testimonials[selectedIndex].color : 'rgba(23,77,77,0.18)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: i === selectedIndex ? `0 0 10px ${testimonials[selectedIndex].color}44` : 'none',
              }}
            />
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '20px', marginTop: '48px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.7s',
        }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg,transparent,rgba(23,77,77,0.15))' }} />
          <span style={{ fontFamily: FONT, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(23,77,77,0.3)', whiteSpace: 'nowrap' }}>
            4 of many
          </span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg,rgba(23,77,77,0.15),transparent)' }} />
        </div>

      </div>
    </section>
  );
}