'use client';

import { useState } from 'react';
import AlertItem from '@/components/ui/AlertItem';
import { MOCK_ALERTS } from '@/lib/constants';
import { SeverityLevel } from '@/lib/types';

const FILTERS: { label: string; value: SeverityLevel | 'all' }[] = [
  { label: 'All Alerts', value: 'all' },
  { label: 'Critical', value: 'critical' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Resolved', value: 'resolved' },
];

const DISASTER_TYPES = ['All Types', 'Flood', 'Earthquake', 'Cyclone', 'Fire', 'Heatwave', 'Landslide', 'Industrial'];

export default function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState<SeverityLevel | 'all'>('all');
  const [activeType, setActiveType] = useState('All Types');

  const filtered = MOCK_ALERTS.filter((a) => {
    const severityMatch = activeFilter === 'all' || a.severity === activeFilter;
    const typeMatch = activeType === 'All Types' || a.disasterType === activeType;
    return severityMatch && typeMatch;
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <div className="pulse-dot" style={{ width: '10px', height: '10px' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--acid)',
                letterSpacing: '0.15em',
              }}
            >
              LIVE FEED
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Active Emergency Alerts
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--muted)',
            }}
          >
            Real-time alerts from NDMA, IMD, and state emergency operation centers.
          </p>
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
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {/* Severity filters */}
          {FILTERS.map((f) => (
            <button
              key={f.value}
              id={`filter-${f.value}`}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding: '6px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                color: activeFilter === f.value ? 'var(--black)' : 'var(--muted)',
                background: activeFilter === f.value ? 'var(--acid)' : 'transparent',
                border: `1px solid ${activeFilter === f.value ? 'var(--acid)' : 'var(--border-dim)'}`,
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}

          <div
            style={{
              width: '1px',
              height: '24px',
              background: 'var(--border-dim)',
              margin: '0 4px',
            }}
          />

          {/* Type filters */}
          <select
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
            style={{
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text)',
              background: 'var(--card)',
              border: '1px solid var(--border-dim)',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
            aria-label="Filter by disaster type"
          >
            {DISASTER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--muted)',
            }}
          >
            {filtered.length} alert{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Alert feed */}
      <div className="container" style={{ padding: '32px 24px' }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              border: '1px solid var(--border-dim)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--card)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--text)',
                marginBottom: '8px',
              }}
            >
              No active alerts in selected filters
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--muted)',
              }}
            >
              Last checked: {new Date().toLocaleTimeString('en-IN')}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map((alert) => (
              <AlertItem key={alert.id} alert={alert} interactive />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
