'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    title: 'Describe the Incident',
    description: 'Select type, add a title and description. Optional: attach up to 3 photos, auto-compressed.',
    icon: '📝',
  },
  {
    number: '02',
    title: 'Confirm Location & Severity',
    description: 'Auto-detects your GPS coordinates. Override with manual address. Set severity: Critical, High, or Medium.',
    icon: '📍',
  },
  {
    number: '03',
    title: 'Submit & Track',
    description: 'Anonymous or named submission. Routed to nearest unit. Track with your unique ID.',
    icon: '✅',
  },
];

const INCIDENT_TYPES_SAMPLE = ['🌊 Flood', '🔥 Fire', '🌍 Earthquake', '🚗 Road Accident', '🏥 Medical Emergency'];

export default function IncidentSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeSeverity, setActiveSeverity] = useState<'Critical' | 'High' | 'Medium'>('Critical');

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
      className="snap-section"
      id="incident"
      style={{
        background: 'var(--dark)',
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
          {/* Left: Process steps */}
          <div>
            <div className="section-label slide-right" style={{ marginBottom: '16px' }}>
              08 — Incident Reporting
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
              Report fast.{' '}
              <span style={{ color: 'var(--acid)' }}>Reach responders.</span>
            </h2>

            <p
              className="slide-right"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              Citizen-submitted reports are routed directly to the nearest NDRF unit.
              Anonymous submissions supported. No login required.
            </p>

            {/* Steps with connector */}
            <div style={{ position: 'relative' }}>
              {/* Connector line */}
              <div
                style={{
                  position: 'absolute',
                  left: '19px',
                  top: '40px',
                  bottom: '40px',
                  width: '1px',
                  background: 'linear-gradient(to bottom, var(--acid), transparent)',
                  opacity: 0.3,
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {STEPS.map((step, i) => (
                  <div
                    key={step.number}
                    className="slide-right"
                    style={{
                      display: 'flex',
                      gap: '20px',
                      transitionDelay: `${i * 0.15}s`,
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--acid-faint)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--acid)',
                        fontWeight: 700,
                        flexShrink: 0,
                        zIndex: 1,
                        position: 'relative',
                      }}
                    >
                      {step.number}
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: 'var(--text)',
                          marginBottom: '6px',
                        }}
                      >
                        {step.icon} {step.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          color: 'var(--muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/report"
              className="slide-right"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '32px',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--black)',
                background: 'var(--acid)',
                padding: '12px 28px',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#C4FF5A';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--acid)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Submit Report →
            </Link>
          </div>

          {/* Right: Form mockup */}
          <div className="slide-up">
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}
            >
              {/* Form header */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--danger)',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.1em',
                  }}
                >
                  INCIDENT REPORT — EXAMPLE
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Type select */}
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    INCIDENT TYPE
                  </label>
                  <div
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(168,255,62,0.03)',
                      border: '1px solid var(--border-dim)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--text)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>🌊 Flood</span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>▼</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    DESCRIPTION
                  </label>
                  <div
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(168,255,62,0.03)',
                      border: '1px solid var(--border-dim)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--muted)',
                      lineHeight: 1.5,
                      minHeight: '64px',
                    }}
                  >
                    Water rising on main street, knee-level flooding near market area. 3 families stranded.
                  </div>
                </div>

                {/* Severity toggle */}
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    SEVERITY
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(['Critical', 'High', 'Medium'] as const).map((s) => {
                      const isActive = activeSeverity === s;
                      const colors: Record<string, string> = {
                        Critical: '#FF4444',
                        High: '#FFB700',
                        Medium: '#A8FF3E',
                      };
                      return (
                        <button
                          key={s}
                          onClick={() => setActiveSeverity(s)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.08em',
                            color: isActive ? (s === 'Medium' ? 'var(--black)' : colors[s]) : 'var(--muted)',
                            background: isActive
                              ? s === 'Critical'
                                ? 'rgba(255,68,68,0.12)'
                                : s === 'High'
                                ? 'rgba(255,183,0,0.12)'
                                : 'rgba(168,255,62,0.12)'
                              : 'transparent',
                            border: `1px solid ${isActive ? colors[s] + '50' : 'var(--border-dim)'}`,
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {s.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    LOCATION
                  </label>
                  <div
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(168,255,62,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--acid)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>📍</span>
                    <span>23.2156°N, 72.6369°E — Detected</span>
                  </div>
                </div>

                {/* Submit button */}
                <Link
                  href="/report"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px',
                    background: 'var(--acid)',
                    color: 'var(--black)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#C4FF5A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = 'var(--acid)')
                  }
                >
                  Submit Report →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #incident .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
