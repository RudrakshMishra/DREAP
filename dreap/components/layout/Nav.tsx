'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/alerts', label: 'Alerts' },
  { href: '/shelters', label: 'Shelters' },
  { href: '/guidelines', label: 'Guidelines' },
  { href: '/contacts', label: 'Contacts' },
  { href: '/report', label: 'Report' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
      setScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also listen on snap container
    const snap = document.querySelector('.snap-container');
    if (snap) snap.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (snap) snap.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '72px',
          zIndex: 'var(--z-nav)' as any,
          display: 'flex',
          alignItems: 'center',
          background: scrolled
            ? 'rgba(6,10,4,0.97)'
            : 'linear-gradient(to bottom, rgba(6,10,4,0.95), transparent)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--border-dim)' : 'none',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: 'var(--acid)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--acid)',
                display: 'inline-block',
                animation: 'pulse-ring 2s ease-out infinite',
                flexShrink: 0,
              }}
            />
            DREAP
          </Link>

          {/* Desktop Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  color: pathname === link.href ? 'var(--acid)' : 'var(--muted)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href)
                    (e.target as HTMLElement).style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href)
                    (e.target as HTMLElement).style.color = 'var(--muted)';
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--acid)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            ))}

            <Link
              href="/contacts"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.82rem',
                color: 'var(--danger)',
                padding: '8px 18px',
                border: '1px solid rgba(255,68,68,0.4)',
                borderRadius: '4px',
                letterSpacing: '0.04em',
                transition: 'background 0.2s, box-shadow 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,68,68,0.1)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-danger)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              🚨 Emergency
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--text)',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--text)',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--text)',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            background: 'rgba(6,10,4,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-dim)',
            zIndex: 99,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="mobile-menu"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '1rem',
                color: pathname === link.href ? 'var(--acid)' : 'var(--text)',
                padding: '12px 0',
                borderBottom: '1px solid var(--border-dim)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacts"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--danger)',
              padding: '14px',
              border: '1px solid rgba(255,68,68,0.4)',
              borderRadius: '4px',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            🚨 Emergency Contacts
          </Link>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
