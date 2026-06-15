'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HERO_STATS } from '@/lib/constants';

export default function HeroSlide() {
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setMounted(true);
    // Animate counters
    const targets = [18, 99.9, 12000, 12];
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((t) => Math.round(t * eased * 10) / 10));
      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="snap-section grid-bg"
      id="hero"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 60px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Radar animation */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(600px, 50vw)',
          height: 'min(600px, 50vw)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid var(--acid)',
              animation: `radar-expand 3s ease-out ${i * 0.6}s infinite`,
              transform: 'scale(0)',
            }}
          />
        ))}
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'var(--acid)',
            animation: 'none',
          }}
        />
        {/* Sweep line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: '1px',
            transformOrigin: 'left center',
            background: 'linear-gradient(to right, var(--acid), transparent)',
            animation: 'spin 4s linear infinite',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container"
        style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}
      >
        {/* Status pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'var(--acid-faint)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            marginBottom: '32px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s, transform 0.6s',
          }}
        >
          <div className="pulse-dot" style={{ width: '6px', height: '6px' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--acid)',
              letterSpacing: '0.1em',
            }}
          >
            SYSTEM ACTIVE — ALL SERVICES OPERATIONAL
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: 'var(--text)',
            lineHeight: 1.1,
            marginBottom: '20px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s 0.1s, transform 0.6s 0.1s',
          }}
        >
          Every Second{' '}
          <span style={{ color: 'var(--acid)' }}>Saves a Life.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '540px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s 0.2s, transform 0.6s 0.2s',
          }}
        >
          India's unified emergency coordination platform — real-time alerts, shelter maps,
          safety protocols, and incident reporting for citizens, responders, and agencies.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '64px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s 0.3s, transform 0.6s 0.3s',
          }}
        >
          <Link
            href="/alerts"
            id="cta-emergency-access"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--black)',
              background: 'var(--acid)',
              padding: '14px 32px',
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
            🚨 Get Emergency Access
          </Link>

          <a
            href="#solution"
            id="cta-learn-how"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.9rem',
              color: 'var(--text)',
              background: 'transparent',
              padding: '14px 32px',
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
            Learn How It Works ↓
          </a>
        </div>

        {/* Live Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--border-dim)',
            border: '1px solid var(--border-dim)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s 0.5s',
          }}
        >
          {HERO_STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '20px',
                background: 'var(--card)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                  color: 'var(--acid)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {i === 2
                  ? counts[i] >= 12000
                    ? '12K+'
                    : Math.round(counts[i]).toLocaleString()
                  : counts[i]}
                {stat.suffix && (
                  <span style={{ fontSize: '0.8em', marginLeft: '2px' }}>{stat.suffix}</span>
                )}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.4,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--muted), transparent)',
            animation: 'scroll-indicator 2s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
