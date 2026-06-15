'use client';

import { useEffect, useRef } from 'react';
import { ARCH_SOURCES, ARCH_PLATFORM, ARCH_USERS, TECH_STACK } from '@/lib/constants';

export default function TechSlide() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const els = entries[0].target.querySelectorAll('.slide-up');
          els.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
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
      id="architecture"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '100px 24px',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Label */}
        <div className="section-label slide-up" style={{ marginBottom: '16px' }}>
          09 — Architecture
        </div>

        <h2
          className="slide-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            color: 'var(--text)',
            marginBottom: '12px',
            lineHeight: 1.15,
          }}
        >
          Built for{' '}
          <span style={{ color: 'var(--acid)' }}>99.9% uptime.</span>
        </h2>

        <p
          className="slide-up"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'var(--muted)',
            lineHeight: 1.7,
            marginBottom: '56px',
            maxWidth: '520px',
          }}
        >
          A resilient, multi-region infrastructure that stays up when everything else goes down.
          Designed to handle 10× traffic spikes without degradation.
        </p>

        {/* Architecture flow */}
        <div
          className="slide-up"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            gap: '0',
            alignItems: 'stretch',
            marginBottom: '40px',
          }}
        >
          {/* Sources */}
          <ArchColumn title="Data Sources" items={ARCH_SOURCES} color="var(--muted)" />

          {/* Arrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2rem',
                color: 'var(--border)',
              }}
            >
              →
            </div>
          </div>

          {/* Platform */}
          <ArchColumn title="DREAP Platform" items={ARCH_PLATFORM} color="var(--acid)" highlight />

          {/* Arrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2rem',
                color: 'var(--border)',
              }}
            >
              →
            </div>
          </div>

          {/* Users */}
          <ArchColumn title="End Users" items={ARCH_USERS} color="var(--muted)" />
        </div>

        {/* Tech footer */}
        <div
          className="slide-up"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--border-dim)',
            border: '1px solid var(--border-dim)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Frontend', value: TECH_STACK.frontend },
            { label: 'Backend', value: TECH_STACK.backend },
            { label: 'Infrastructure', value: TECH_STACK.infrastructure },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '20px',
                background: 'var(--card)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--acid)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  opacity: 0.7,
                }}
              >
                {item.label}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #architecture .container > div[style*="grid-template-columns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
          #architecture .container > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ArchColumn({
  title,
  items,
  color,
  highlight,
}: {
  title: string;
  items: { label: string; desc: string }[];
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        border: `1px solid ${highlight ? 'var(--border)' : 'var(--border-dim)'}`,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: highlight ? 'var(--card)' : 'transparent',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: `1px solid ${highlight ? 'var(--border)' : 'var(--border-dim)'}`,
          background: highlight ? 'var(--acid-faint)' : 'transparent',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-dim)' }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              padding: '12px 16px',
              background: highlight ? 'var(--card)' : 'var(--dark)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.82rem',
                color: 'var(--text)',
                marginBottom: '2px',
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--muted)',
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
