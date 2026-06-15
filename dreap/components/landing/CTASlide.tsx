'use client';

import { useEffect, useRef } from 'react';
import { CTA_STATS } from '@/lib/constants';
import Link from 'next/link';

export default function CTASlide() {
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
      className="snap-section"
      id="deploy"
      style={{
        background: 'var(--dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(168,255,62,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div
        className="container"
        style={{
          maxWidth: '760px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Label */}
        <div className="section-label slide-up" style={{ marginBottom: '24px', display: 'inline-block' }}>
          10 — Deploy DREAP
        </div>

        {/* Heading */}
        <h2
          className="slide-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--text)',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}
        >
          Ready to deploy{' '}
          <span style={{ color: 'var(--acid)' }}>emergency infrastructure</span>{' '}
          for your state?
        </h2>

        <p
          className="slide-up"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            color: 'var(--muted)',
            lineHeight: 1.7,
            marginBottom: '56px',
            maxWidth: '560px',
            margin: '0 auto 56px',
          }}
        >
          DREAP is available to state governments, municipal corporations, and emergency management agencies.
          Open-source, WCAG-compliant, and deployable in 72 hours.
        </p>

        {/* Impact stats */}
        <div
          className="slide-up"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginBottom: '56px',
            flexWrap: 'wrap',
          }}
        >
          {CTA_STATS.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  color: 'var(--acid)',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {stat.value}
                <span style={{ fontSize: '0.7em' }}>{stat.suffix}</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="slide-up"
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="mailto:partnerships@dreap.gov.in"
            id="cta-request-demo"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--black)',
              background: 'var(--acid)',
              padding: '14px 36px',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              letterSpacing: '0.02em',
              transition: 'background 0.2s, transform 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
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
            Request Demo →
          </a>

          <a
            href="#"
            id="cta-download-brochure"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.9rem',
              color: 'var(--text)',
              background: 'transparent',
              padding: '14px 36px',
              border: '1px solid rgba(168,255,62,0.18)',
              borderRadius: '4px',
              letterSpacing: '0.02em',
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--acid)';
              (e.currentTarget as HTMLElement).style.color = 'var(--acid)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,255,62,0.18)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            ↓ Download Brochure
          </a>
        </div>

        {/* Bottom note */}
        <p
          className="slide-up"
          style={{
            marginTop: '40px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--muted)',
            letterSpacing: '0.05em',
          }}
        >
          Government of India Open Source · partnerships@dreap.gov.in · WCAG 2.1 AA
        </p>
      </div>
    </section>
  );
}
