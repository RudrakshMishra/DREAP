'use client';

import { useEffect, useRef, useState } from 'react';
import { DISASTER_GUIDES } from '@/lib/constants';
import { DisasterType } from '@/lib/types';
import Link from 'next/link';

const TABS: DisasterType[] = ['Flood', 'Earthquake', 'Fire', 'Heatwave'];

export default function GuidelineSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<DisasterType>('Flood');
  const [animating, setAnimating] = useState(false);

  const guide = DISASTER_GUIDES.find((g) => g.type === activeTab)!;

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

  const switchTab = (tab: DisasterType) => {
    if (tab === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimating(false);
    }, 200);
  };

  return (
    <section
      ref={ref}
      className="snap-section"
      id="guidelines"
      style={{
        background: 'var(--dark)',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 24px',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Header */}
        <div className="section-label slide-up" style={{ marginBottom: '16px' }}>
          06 — Safety Guidelines
        </div>
        <h2
          className="slide-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            color: 'var(--text)',
            marginBottom: '32px',
            lineHeight: 1.15,
          }}
        >
          Know what to do.{' '}
          <span style={{ color: 'var(--acid)' }}>Before it happens.</span>
        </h2>

        {/* Tab bar */}
        <div
          className="slide-up"
          style={{
            display: 'flex',
            gap: '0',
            marginBottom: '40px',
            borderBottom: '1px solid var(--border-dim)',
          }}
        >
          {TABS.map((tab) => {
            const g = DISASTER_GUIDES.find((d) => d.type === tab)!;
            return (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                onClick={() => switchTab(tab)}
                style={{
                  padding: '12px 24px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  color: activeTab === tab ? 'var(--acid)' : 'var(--muted)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === tab ? 'var(--acid)' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                  marginBottom: '-1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{g.icon}</span>
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
        >
          {/* Steps */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text)',
                }}
              >
                {guide.icon} During a {activeTab}
              </h3>
              <span
                style={{
                  padding: '3px 10px',
                  background:
                    guide.dangerLevel === 'Extreme'
                      ? 'rgba(255,68,68,0.1)'
                      : 'rgba(255,183,0,0.1)',
                  border: `1px solid ${guide.dangerLevel === 'Extreme' ? 'rgba(255,68,68,0.3)' : 'rgba(255,183,0,0.3)'}`,
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color:
                    guide.dangerLevel === 'Extreme' ? 'var(--danger)' : 'var(--warn)',
                  letterSpacing: '0.1em',
                }}
              >
                {guide.dangerLevel.toUpperCase()} RISK
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {guide.during.map((step) => (
                <div
                  key={step.number}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--acid-faint)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--acid)',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--text)',
                        marginBottom: '4px',
                      }}
                    >
                      {step.icon} {step.title}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
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

            <Link
              href={`/guidelines`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--acid)',
                padding: '8px 16px',
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
              Full {activeTab} Guide →
            </Link>
          </div>

          {/* Checklist */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  marginBottom: '4px',
                }}
              >
                Emergency Checklist
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                }}
              >
                📶 Available offline
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {guide.checklist.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    background: 'var(--card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span style={{ color: 'var(--acid)', fontSize: '1rem', flexShrink: 0 }}>
                    ☑
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--text)',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #guidelines .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
