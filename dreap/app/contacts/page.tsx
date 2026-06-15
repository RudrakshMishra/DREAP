'use client';

import { useState } from 'react';
import ContactCard from '@/components/ui/ContactCard';
import { EMERGENCY_CONTACTS } from '@/lib/constants';

const CATEGORIES = ['All', 'National', 'Specialized', 'State', 'District'];

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = EMERGENCY_CONTACTS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.number.includes(search) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === 'All' || c.category === activeCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        paddingTop: '72px',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'var(--dark)',
          borderBottom: '1px solid var(--border-dim)',
          padding: '40px 0',
        }}
      >
        <div className="container">
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Emergency Contacts
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}
          >
            All national emergency services — tap to call. Available offline.
          </p>

          {/* Government seal trust indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              background: 'var(--acid-faint)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🏛️</span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  color: 'var(--text)',
                }}
              >
                Government of India — Verified Numbers
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--muted)',
                }}
              >
                Ministry of Home Affairs · National Disaster Management Authority
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 40,
          background: 'rgba(6,10,4,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-dim)',
          padding: '12px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            placeholder="Search by name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search emergency contacts"
            style={{
              padding: '8px 14px',
              background: 'var(--card)',
              border: '1px solid var(--border-dim)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              outline: 'none',
              minWidth: '220px',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--acid)')}
            onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--border-dim)')}
          />

          <div style={{ display: 'flex', gap: '6px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`cat-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: activeCategory === cat ? 'var(--black)' : 'var(--muted)',
                  background: activeCategory === cat ? 'var(--acid)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'var(--acid)' : 'var(--border-dim)'}`,
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--muted)',
            }}
          >
            {filtered.length} contact{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Contact grid */}
      <div className="container" style={{ padding: '32px 24px' }}>
        {/* National */}
        {(activeCategory === 'All' || activeCategory === 'National') && (
          <Section
            title="National Emergency Services"
            contacts={filtered.filter((c) => c.category === 'national')}
          />
        )}

        {/* Specialized */}
        {(activeCategory === 'All' || activeCategory === 'Specialized') && (
          <Section
            title="Specialized Services"
            contacts={filtered.filter((c) => c.category === 'specialized')}
          />
        )}

        {/* State / District placeholders */}
        {(activeCategory === 'State' || activeCategory === 'District') && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              border: '1px solid var(--border-dim)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--card)',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🏗️</div>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--text)',
                marginBottom: '8px',
              }}
            >
              {activeCategory} contacts — Coming Soon
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--muted)',
              }}
            >
              State and district-level contacts are being onboarded. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  contacts,
}: {
  title: string;
  contacts: typeof EMERGENCY_CONTACTS;
}) {
  if (contacts.length === 0) return null;

  return (
    <div style={{ marginBottom: '48px' }}>
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--acid)',
          opacity: 0.7,
          marginBottom: '16px',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
        }}
      >
        {contacts.map((c) => (
          <ContactCard key={c.id} contact={c} interactive />
        ))}
      </div>
    </div>
  );
}
