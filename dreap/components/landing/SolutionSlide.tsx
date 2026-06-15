'use client';

import { useEffect, useRef, useState } from 'react';
import { FEATURE_CARDS } from '@/lib/constants';

export default function SolutionSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
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
      id="solution"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '100px 24px',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Label */}
        <div className="section-label slide-up" style={{ marginBottom: '16px' }}>
          03 — The Solution
        </div>

        {/* Heading */}
        <h2
          className="slide-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: 'var(--text)',
            marginBottom: '12px',
            lineHeight: 1.15,
          }}
        >
          One platform.{' '}
          <span style={{ color: 'var(--acid)' }}>Every emergency.</span>
        </h2>

        <p
          className="slide-up"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--muted)',
            maxWidth: '520px',
            lineHeight: 1.7,
            marginBottom: '56px',
          }}
        >
          DREAP consolidates six critical emergency systems into a single, fast, and always-available interface
          — designed to work under extreme stress, offline, in 12 languages.
        </p>

        {/* Feature grid 3×2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCardItem key={i} card={card} delay={i * 100} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCardItem({
  card,
  delay,
  visible,
}: {
  card: (typeof FEATURE_CARDS)[0];
  delay: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="slide-up"
      style={{
        padding: '28px',
        background: 'var(--card)',
        border: '1px solid var(--border-dim)',
        borderRadius: 'var(--radius-lg)',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'default',
        transitionDelay: `${delay}ms`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated acid bottom border */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          background: 'var(--acid)',
          width: hovered ? '100%' : '0%',
          transition: 'width 0.3s var(--ease-out)',
        }}
      />

      {/* Number */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--acid)',
          letterSpacing: '0.15em',
          marginBottom: '16px',
          opacity: 0.7,
        }}
      >
        {card.number}
      </div>

      {/* Icon */}
      <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{card.icon}</div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '1rem',
          color: hovered ? 'var(--acid)' : 'var(--text)',
          marginBottom: '10px',
          transition: 'color 0.2s',
        }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          lineHeight: 1.65,
        }}
      >
        {card.description}
      </p>
    </div>
  );
}
