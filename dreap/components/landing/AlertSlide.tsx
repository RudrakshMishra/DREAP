'use client';

import { useEffect, useRef } from 'react';
import AlertItem from '@/components/ui/AlertItem';
import { MOCK_ALERTS } from '@/lib/constants';
import Link from 'next/link';

const STATS = [
  { value: '< 90s', label: 'Alert broadcast time' },
  { value: '5', label: 'Severity levels tracked' },
  { value: '24/7', label: 'Real-time monitoring' },
];

export default function AlertSlide() {
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

  const displayAlerts = MOCK_ALERTS.slice(0, 5);

  return (
    <section
      ref={ref}
      className="snap-section"
      id="alerts"
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
            alignItems: 'center',
          }}
        >
          {/* Left: Copy */}
          <div>
            <div className="section-label slide-right" style={{ marginBottom: '16px' }}>
              04 — Alert System
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
              Live alerts.{' '}
              <span style={{ color: 'var(--acid)' }}>In under 90 seconds.</span>
            </h2>

            <p
              className="slide-right"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              DREAP aggregates alerts from NDMA, IMD, and state emergency operation centers.
              SSE-powered real-time broadcast ensures zero page reload for citizens monitoring active events.
            </p>

            {/* Callout stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="slide-right"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 16px',
                    background: 'var(--card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: 'var(--radius-md)',
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.4rem',
                      color: 'var(--acid)',
                      minWidth: '70px',
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--muted)',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/alerts"
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
              View Live Alert Feed →
            </Link>
          </div>

          {/* Right: Alert feed */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.1em',
                }}
              >
                LIVE FEED — ACTIVE ALERTS
              </span>
              <div className="pulse-dot" style={{ width: '8px', height: '8px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {displayAlerts.map((alert, i) => (
                <div
                  key={alert.id}
                  className="slide-up"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <AlertItem alert={alert} interactive={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #alerts .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
