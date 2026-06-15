'use client';

import { useEffect, useRef } from 'react';
import { Shelter } from '@/lib/types';
import { getCapacityColor, getCapacityPct } from '@/lib/utils';

const FACILITY_ICONS: Record<string, { icon: string; label: string }> = {
  food:       { icon: '🍲', label: 'Food' },
  water:      { icon: '💧', label: 'Water' },
  medical:    { icon: '🏥', label: 'Medical' },
  wheelchair: { icon: '♿', label: 'Accessible' },
  pet:        { icon: '🐾', label: 'Pet-friendly' },
};

interface ShelterCardProps {
  shelter: Shelter;
  compact?: boolean;
}

export default function ShelterCard({ shelter, compact = false }: ShelterCardProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pct = getCapacityPct(shelter.occupied, shelter.capacity);
  const colorClass = getCapacityColor(shelter.occupied, shelter.capacity);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && fillRef.current) {
            fillRef.current.style.width = `${pct}%`;
          }
        });
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div
      ref={cardRef}
      style={{
        padding: compact ? '14px 16px' : '20px',
        background: 'var(--card)',
        border: '1px solid var(--border-dim)',
        borderRadius: 'var(--radius-lg)',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.background = 'var(--card-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-dim)';
        (e.currentTarget as HTMLElement).style.background = 'var(--card)';
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '4px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: compact ? '0.88rem' : '0.95rem',
              color: 'var(--text)',
              lineHeight: 1.3,
            }}
          >
            {shelter.name}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--acid)',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            {shelter.distance}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--muted)',
          }}
        >
          📍 {shelter.address}
        </p>
      </div>

      {/* Capacity */}
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--muted)',
            }}
          >
            Capacity
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color:
                colorClass === 'red'
                  ? 'var(--danger)'
                  : colorClass === 'yellow'
                  ? 'var(--warn)'
                  : 'var(--acid)',
              fontWeight: 600,
            }}
          >
            {shelter.occupied}/{shelter.capacity} ({pct}%)
          </span>
        </div>
        <div className="capacity-track">
          <div
            ref={fillRef}
            className={`capacity-fill ${colorClass}`}
            style={{ width: '0%' }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${pct}% capacity`}
          />
        </div>
      </div>

      {/* Facilities */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: compact ? '0' : '12px',
        }}
      >
        {shelter.facilities.map((f) => {
          const fc = FACILITY_ICONS[f];
          if (!fc) return null;
          return (
            <span
              key={f}
              title={fc.label}
              aria-label={fc.label}
              style={{
                fontSize: '1rem',
                padding: '4px',
                background: 'var(--border-dim)',
                borderRadius: '4px',
                cursor: 'default',
              }}
            >
              {fc.icon}
            </span>
          );
        })}
      </div>

      {/* Actions */}
      {!compact && (
        <a
          href={`https://maps.google.com/?q=${shelter.lat},${shelter.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--acid)',
            padding: '6px 14px',
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
          Get Directions →
        </a>
      )}
    </div>
  );
}
