'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--dark)',
        borderTop: '1px solid var(--border-dim)',
        padding: '64px 0 32px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'var(--acid)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              DREAP
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '260px',
              }}
            >
              Disaster Response & Emergency Assistance Portal. Built for resilience. Designed for speed.
            </p>
            <div
              style={{
                marginTop: '20px',
                padding: '10px 14px',
                background: 'var(--acid-faint)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--acid)',
                  flexShrink: 0,
                  animation: 'pulse-ring 2s ease-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--acid)',
                  letterSpacing: '0.1em',
                }}
              >
                SYSTEM ACTIVE — 99.9% UPTIME
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--acid)',
                marginBottom: '20px',
                opacity: 0.7,
              }}
            >
              Platform
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/alerts', label: 'Live Alerts' },
                { href: '/shelters', label: 'Shelter Finder' },
                { href: '/guidelines', label: 'Safety Guidelines' },
                { href: '/contacts', label: 'Emergency Contacts' },
                { href: '/report', label: 'Report Incident' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'var(--muted)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = 'var(--text)')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = 'var(--muted)')
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--acid)',
                marginBottom: '20px',
                opacity: 0.7,
              }}
            >
              Emergency
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'National Emergency', number: '112' },
                { label: 'NDMA Control Room', number: '1078' },
                { label: 'Ambulance', number: '108' },
                { label: 'Fire & Rescue', number: '101' },
              ].map((c) => (
                <div key={c.number}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--muted)',
                      marginBottom: '2px',
                    }}
                  >
                    {c.label}
                  </div>
                  <a
                    href={`tel:${c.number}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--text)',
                      letterSpacing: '0.05em',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--acid)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--text)')
                    }
                  >
                    {c.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Government */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--acid)',
                marginBottom: '20px',
                opacity: 0.7,
              }}
            >
              Authority
            </h3>
            <div
              style={{
                padding: '16px',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--acid-faint)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏛️</div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  color: 'var(--text)',
                  marginBottom: '4px',
                }}
              >
                Government of India
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                }}
              >
                Ministry of Home Affairs<br />
                National Disaster Management Authority
              </div>
              <a
                href="mailto:partnerships@dreap.gov.in"
                style={{
                  display: 'inline-block',
                  marginTop: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--acid)',
                  letterSpacing: '0.05em',
                }}
              >
                partnerships@dreap.gov.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--muted)',
              letterSpacing: '0.05em',
            }}
          >
            © 2025 DREAP — Government of India Open Source. WCAG 2.1 AA Compliant.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'API Docs'].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--acid)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--muted)')
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
