'use client';

import { useState } from 'react';
import { Contact } from '@/lib/types';

interface ContactCardProps {
  contact: Contact;
  interactive?: boolean;
}

export default function ContactCard({ contact, interactive = false }: ContactCardProps) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      style={{
        padding: '20px',
        background: hovered ? 'var(--card-hover)' : 'var(--card)',
        border: `1px solid ${hovered ? 'var(--border)' : 'var(--border-dim)'}`,
        borderRadius: 'var(--radius-lg)',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 0 30px rgba(168,255,62,0.06) inset, 0 4px 20px rgba(0,0,0,0.3)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial glow */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(168,255,62,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Emoji */}
      <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>{contact.emoji}</div>

      {/* Name */}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '0.88rem',
          color: 'var(--text)',
        }}
      >
        {contact.name}
      </div>

      {/* Number — large, monospace, readable */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--acid)',
          letterSpacing: '0.04em',
          lineHeight: 1,
        }}
      >
        {contact.number}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {contact.description}
      </p>

      {/* Interactive action hint */}
      {interactive && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-dim)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              padding: '4px 10px',
              border: '1px solid var(--border-dim)',
              borderRadius: '3px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            📋 Copy
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              padding: '4px 10px',
              border: '1px solid var(--border-dim)',
              borderRadius: '3px',
            }}
          >
            Share ↗
          </span>
        </div>
      )}
    </div>
  );

  if (interactive) {
    return (
      <a
        href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
        aria-label={`Call ${contact.name}: ${contact.number}`}
        style={{ display: 'block', height: '100%', textDecoration: 'none' }}
      >
        {content}
      </a>
    );
  }

  return content;
}
