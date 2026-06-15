'use client';

import { useState } from 'react';
import SeverityBadge from './SeverityBadge';
import { Alert } from '@/lib/types';
import { getSeverityBorderColor, getSeverityDotClass } from '@/lib/utils';

interface AlertItemProps {
  alert: Alert;
  interactive?: boolean;
}

export default function AlertItem({ alert, interactive = false }: AlertItemProps) {
  const [expanded, setExpanded] = useState(false);
  const borderColor = getSeverityBorderColor(alert.severity);
  const dotClass = getSeverityDotClass(alert.severity);

  return (
    <article
      style={{
        padding: '16px 20px',
        background: expanded ? 'var(--card-hover)' : 'var(--card)',
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'background 0.2s',
        position: 'relative',
      }}
      onClick={() => interactive && setExpanded(!expanded)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          setExpanded(!expanded);
        }
      }}
      aria-expanded={interactive ? expanded : undefined}
    >
      {/* New badge */}
      {alert.isNew && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '2px 8px',
            background: 'rgba(168,255,62,0.1)',
            border: '1px solid rgba(168,255,62,0.2)',
            borderRadius: '3px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--acid)',
            letterSpacing: '0.1em',
          }}
        >
          NEW
        </div>
      )}

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Severity dot */}
        <div style={{ paddingTop: '4px', flexShrink: 0 }}>
          <div className={`pulse-dot ${dotClass}`} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '6px',
              flexWrap: 'wrap',
            }}
          >
            <SeverityBadge severity={alert.severity} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--muted)',
              }}
            >
              {alert.disasterType}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: 'var(--text)',
              marginBottom: '6px',
              lineHeight: 1.4,
            }}
          >
            {alert.title}
          </h3>

          {/* Zone + time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--muted)',
              }}
            >
              📍 {alert.zone}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--muted)',
              }}
            >
              🕐 {alert.timestamp}
            </span>
          </div>

          {/* Expanded content */}
          {expanded && (
            <div
              style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-dim)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  marginBottom: '12px',
                }}
              >
                {alert.description}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    padding: '4px 10px',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '3px',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  View Map →
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    padding: '4px 10px',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '3px',
                  }}
                >
                  Share ↗
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    padding: '4px 10px',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '3px',
                  }}
                >
                  Dismiss ×
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
