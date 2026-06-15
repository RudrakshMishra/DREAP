'use client';

import { useEffect, useRef } from 'react';
import ContactCard from '@/components/ui/ContactCard';
import { EMERGENCY_CONTACTS } from '@/lib/constants';
import Link from 'next/link';

export default function ContactsSlide() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const els = entries[0].target.querySelectorAll('.slide-up');
          els.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 60);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const displayContacts = EMERGENCY_CONTACTS.slice(0, 8);

  return (
    <section
      ref={ref}
      className="snap-section grid-bg"
      id="contacts"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '100px 24px',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div className="section-label slide-up" style={{ marginBottom: '16px' }}>
              07 — Emergency Contacts
            </div>
            <h2
              className="slide-up"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                color: 'var(--text)',
                lineHeight: 1.15,
              }}
            >
              One tap.{' '}
              <span style={{ color: 'var(--acid)' }}>Right number.</span>
            </h2>
          </div>
          <Link
            href="/contacts"
            className="slide-up"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--acid)',
              padding: '10px 20px',
              border: '1px solid rgba(168,255,62,0.2)',
              borderRadius: '4px',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = 'var(--acid-faint)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = 'transparent')
            }
          >
            All Contacts →
          </Link>
        </div>

        {/* 4×2 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
          }}
        >
          {displayContacts.map((contact, i) => (
            <div
              key={contact.id}
              className="slide-up"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <ContactCard contact={contact} interactive={false} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          #contacts .container div[style*="repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          #contacts .container div[style*="repeat(4"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
