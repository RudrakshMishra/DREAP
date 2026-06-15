'use client';

import { useEffect, useRef } from 'react';
import { PROBLEM_CARDS, PROBLEM_STATS } from '@/lib/constants';

export default function ProblemSlide() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.slide-up, .slide-right');
            els.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="snap-section"
      id="problem"
      style={{
        background: 'var(--dark)',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 24px',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Label */}
        <div className="section-label slide-up" style={{ marginBottom: '16px' }}>
          02 — The Problem
        </div>

        {/* Heading */}
        <h2
          className="slide-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: 'var(--text)',
            marginBottom: '16px',
            maxWidth: '640px',
            lineHeight: 1.15,
          }}
        >
          When disasters strike,{' '}
          <span style={{ color: 'var(--danger)' }}>our systems fail first.</span>
        </h2>

        <p
          className="slide-up"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--muted)',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '48px',
          }}
        >
          India faces over 30 significant natural disasters annually. Yet the infrastructure meant to
          protect citizens fragments exactly when it's needed most — siloed systems, saturated hotlines,
          and information deserts leave people making life-or-death decisions without data.
        </p>

        {/* Stat row */}
        <div
          className="slide-up"
          style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            marginBottom: '56px',
            padding: '24px',
            background: 'rgba(255,68,68,0.04)',
            border: '1px solid rgba(255,68,68,0.12)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          {PROBLEM_STATS.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: '120px', flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--danger)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
                <span style={{ fontSize: '0.6em' }}>{stat.suffix}</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                  maxWidth: '140px',
                  margin: '0 auto',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Problem cards 2×2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {PROBLEM_CARDS.map((card, i) => (
            <div
              key={i}
              className="slide-up"
              style={{
                padding: '24px',
                background: 'var(--card)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-lg)',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{card.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  marginBottom: '8px',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
