'use client';

import { useEffect, useRef } from 'react';
import ShelterCard from '@/components/ui/ShelterCard';
import { MOCK_SHELTERS } from '@/lib/constants';
import Link from 'next/link';

// Map dot markers
const MAP_DOTS = [
  { x: 30, y: 40, color: 'var(--acid)', status: 'Available' },
  { x: 55, y: 25, color: 'var(--acid)', status: 'Available' },
  { x: 70, y: 55, color: 'var(--warn)', status: 'Near Full' },
  { x: 45, y: 65, color: 'var(--danger)', status: 'Full' },
  { x: 20, y: 70, color: 'var(--acid)', status: 'Available' },
  { x: 80, y: 30, color: 'var(--warn)', status: 'Near Full' },
  { x: 60, y: 75, color: 'var(--acid)', status: 'Available' },
];

export default function ShelterSlide() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const els = entries[0].target.querySelectorAll('.slide-up, .slide-right');
          els.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="snap-section grid-bg"
      id="shelters"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '100px 24px',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left: Shelter cards */}
          <div>
            <div className="section-label slide-right" style={{ marginBottom: '16px' }}>
              05 — Shelter Finder
            </div>

            <h2
              className="slide-right"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                color: 'var(--text)',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              12,000+ shelters.{' '}
              <span style={{ color: 'var(--acid)' }}>Live capacity.</span>
            </h2>

            <p
              className="slide-right"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              GPS-based shelter search with real-time capacity tracking. One-tap directions, facility
              icons, and accessibility information for every registered shelter in India.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {MOCK_SHELTERS.slice(0, 3).map((shelter, i) => (
                <div
                  key={shelter.id}
                  className="slide-right"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <ShelterCard shelter={shelter} compact />
                </div>
              ))}
            </div>

            <Link
              href="/shelters"
              className="slide-right"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--acid)',
                padding: '10px 20px',
                border: '1px solid rgba(168,255,62,0.2)',
                borderRadius: '4px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = 'var(--acid-faint)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = 'transparent')
              }
            >
              Open Shelter Map →
            </Link>
          </div>

          {/* Right: Map mockup */}
          <div className="slide-up">
            <div
              style={{
                background: 'var(--dark)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Map header */}
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.1em',
                  }}
                >
                  LIVE MAP — SHELTER LOCATIONS
                </span>
              </div>

              {/* Map grid area */}
              <div
                style={{
                  position: 'relative',
                  height: '340px',
                  backgroundImage:
                    'linear-gradient(rgba(168,255,62,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,255,62,0.04) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              >
                {/* Location dots */}
                {MAP_DOTS.map((dot, i) => (
                  <div
                    key={i}
                    title={dot.status}
                    style={{
                      position: 'absolute',
                      left: `${dot.x}%`,
                      top: `${dot.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: dot.color,
                      boxShadow: `0 0 10px ${dot.color}`,
                      cursor: 'pointer',
                      animation: 'pulse-ring 2.5s ease-out infinite',
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}

                {/* You Are Here */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#4A9EFF',
                      border: '3px solid white',
                      boxShadow: '0 0 16px rgba(74,158,255,0.6)',
                      position: 'relative',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '-24px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      color: '#4A9EFF',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.05em',
                    }}
                  >
                    YOU ARE HERE
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div
                style={{
                  padding: '12px 16px',
                  borderTop: '1px solid var(--border-dim)',
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { color: 'var(--acid)', label: 'Available' },
                  { color: 'var(--warn)', label: 'Near Full' },
                  { color: 'var(--danger)', label: 'Full' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: item.color,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--muted)',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #shelters .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
