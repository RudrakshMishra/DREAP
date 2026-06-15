'use client';

import { useState } from 'react';
import { DISASTER_GUIDES } from '@/lib/constants';
import { DisasterType } from '@/lib/types';

type Tab = 'before' | 'during' | 'after';

export default function GuidelinesPage() {
  const [activeType, setActiveType] = useState<DisasterType>('Flood');
  const [activeTab, setActiveTab] = useState<Tab>('during');

  const guide = DISASTER_GUIDES.find((g) => g.type === activeType)!;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        paddingTop: '72px',
        display: 'flex',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '240px',
          flexShrink: 0,
          background: 'var(--dark)',
          borderRight: '1px solid var(--border-dim)',
          padding: '32px 0',
          position: 'sticky',
          top: '72px',
          height: 'calc(100vh - 72px)',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            padding: '0 20px 20px',
            borderBottom: '1px solid var(--border-dim)',
            marginBottom: '12px',
          }}
        >
          <div className="section-label">Disaster Type</div>
        </div>

        <nav>
          {DISASTER_GUIDES.map((g) => (
            <button
              key={g.type}
              id={`guide-${g.type.toLowerCase()}`}
              onClick={() => setActiveType(g.type)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 20px',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: activeType === g.type ? 'var(--acid)' : 'var(--muted)',
                background: activeType === g.type ? 'var(--acid-faint)' : 'transparent',
                borderLeft: `2px solid ${activeType === g.type ? 'var(--acid)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              onMouseEnter={(e) => {
                if (activeType !== g.type)
                  (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                if (activeType !== g.type)
                  (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
              }}
            >
              <span>{g.icon}</span>
              <span>{g.type}</span>
              <span
                style={{
                  marginLeft: 'auto',
                  padding: '2px 6px',
                  background:
                    g.dangerLevel === 'Extreme' ? 'rgba(255,68,68,0.12)' : 'rgba(255,183,0,0.12)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: g.dangerLevel === 'Extreme' ? 'var(--danger)' : 'var(--warn)',
                  letterSpacing: '0.05em',
                }}
              >
                {g.dangerLevel}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        {/* Guide header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2rem' }}>{guide.icon}</span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                color: 'var(--text)',
              }}
            >
              {guide.type} Guidelines
            </h1>
            <span
              style={{
                padding: '4px 12px',
                background:
                  guide.dangerLevel === 'Extreme' ? 'rgba(255,68,68,0.1)' : 'rgba(255,183,0,0.1)',
                border: `1px solid ${guide.dangerLevel === 'Extreme' ? 'rgba(255,68,68,0.3)' : 'rgba(255,183,0,0.3)'}`,
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: guide.dangerLevel === 'Extreme' ? 'var(--danger)' : 'var(--warn)',
                letterSpacing: '0.1em',
              }}
            >
              {guide.dangerLevel.toUpperCase()} RISK
            </span>
          </div>
        </div>

        {/* Before/During/After tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-dim)',
            marginBottom: '32px',
            gap: '0',
          }}
        >
          {(['before', 'during', 'after'] as Tab[]).map((tab) => (
            <button
              key={tab}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: activeTab === tab ? 'var(--acid)' : 'var(--muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? 'var(--acid)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
                marginBottom: '-1px',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'before' ? '⏰ Before' : tab === 'during' ? '⚡ During' : '✅ After'}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '40px',
          }}
        >
          {/* Steps */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--text)',
                marginBottom: '24px',
              }}
            >
              {activeTab === 'before' ? 'Preparation Steps' : activeTab === 'during' ? 'Emergency Response' : 'Recovery Steps'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {guide[activeTab].map((step) => (
                <div
                  key={step.number}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    background: 'var(--card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-dim)')
                  }
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
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      color: 'var(--acid)',
                      flexShrink: 0,
                    }}
                  >
                    {step.number}
                  </div>
                  <div>
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
                        lineHeight: 1.65,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Do's and Don'ts */}
            <div
              style={{
                marginTop: '32px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <div
                style={{
                  padding: '20px',
                  background: 'rgba(168,255,62,0.04)',
                  border: '1px solid rgba(168,255,62,0.12)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--acid)',
                    marginBottom: '12px',
                  }}
                >
                  ✅ Do's
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                  {guide.dos.map((d, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--muted)',
                        lineHeight: 1.5,
                        paddingLeft: '12px',
                        borderLeft: '2px solid rgba(168,255,62,0.3)',
                      }}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  padding: '20px',
                  background: 'rgba(255,68,68,0.04)',
                  border: '1px solid rgba(255,68,68,0.12)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--danger)',
                    marginBottom: '12px',
                  }}
                >
                  ❌ Don'ts
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                  {guide.donts.map((d, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--muted)',
                        lineHeight: 1.5,
                        paddingLeft: '12px',
                        borderLeft: '2px solid rgba(255,68,68,0.3)',
                      }}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar: Checklist */}
          <div>
            <div
              style={{
                padding: '20px',
                background: 'var(--card)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-lg)',
                position: 'sticky',
                top: '20px',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--text)',
                    marginBottom: '4px',
                  }}
                >
                  Emergency Checklist
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--muted)',
                  }}
                >
                  📶 Saved offline
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {guide.checklist.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px',
                      background: 'var(--dark)',
                      border: '1px solid var(--border-dim)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <span style={{ color: 'var(--acid)', fontSize: '0.9rem', flexShrink: 0 }}>☑</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--text)',
                        lineHeight: 1.4,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '10px',
                  background: 'var(--acid-faint)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--acid)',
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(168,255,62,0.12)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'var(--acid-faint)')
                }
              >
                ↓ DOWNLOAD PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
