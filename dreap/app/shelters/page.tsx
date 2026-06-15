'use client';

import { useState } from 'react';
import ShelterCard from '@/components/ui/ShelterCard';
import { MOCK_SHELTERS } from '@/lib/constants';
import { Shelter } from '@/lib/types';

const MAP_DOTS = [
  { x: 25, y: 35, shelter: MOCK_SHELTERS[0], color: 'var(--acid)' },
  { x: 52, y: 22, shelter: MOCK_SHELTERS[1], color: 'var(--warn)' },
  { x: 70, y: 50, shelter: MOCK_SHELTERS[2], color: 'var(--acid)' },
  { x: 42, y: 65, shelter: MOCK_SHELTERS[3], color: 'var(--danger)' },
  { x: 18, y: 68, shelter: MOCK_SHELTERS[4], color: 'var(--acid)' },
];

export default function SheltersPage() {
  const [search, setSearch] = useState('');
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

  const filtered = MOCK_SHELTERS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.district.toLowerCase().includes(search.toLowerCase()) ||
      s.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        height: '100vh',
        background: 'var(--black)',
        paddingTop: '72px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Split layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '380px',
            flexShrink: 0,
            background: 'var(--dark)',
            borderRight: '1px solid var(--border-dim)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar header */}
          <div
            style={{
              padding: '20px',
              borderBottom: '1px solid var(--border-dim)',
              flexShrink: 0,
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'var(--text)',
                marginBottom: '12px',
              }}
            >
              Shelter Finder
            </h1>
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, district or state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search shelters"
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(168,255,62,0.03)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--acid)')}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--border-dim)')}
            />

            {/* Filter chips */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              {['All', 'School', 'Hall', 'Stadium', 'Temple'].map((t) => (
                <button
                  key={t}
                  style={{
                    padding: '4px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: t === 'All' ? 'var(--black)' : 'var(--muted)',
                    background: t === 'All' ? 'var(--acid)' : 'transparent',
                    border: `1px solid ${t === 'All' ? 'var(--acid)' : 'var(--border-dim)'}`,
                    borderRadius: '3px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <p
              style={{
                marginTop: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--muted)',
              }}
            >
              {filtered.length} shelter{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Shelter list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filtered.map((shelter) => (
                <div
                  key={shelter.id}
                  onClick={() => setSelectedShelter(shelter)}
                  style={{ cursor: 'pointer' }}
                >
                  <ShelterCard shelter={shelter} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Map grid */}
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage:
                'linear-gradient(rgba(168,255,62,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,255,62,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              background: 'var(--black)',
              position: 'relative',
            }}
          >
            {/* Background grid lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(168,255,62,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,255,62,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Map pins */}
            {MAP_DOTS.map((dot, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedShelter(dot.shelter)}
                title={dot.shelter.name}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: dot.color,
                    border: '2px solid var(--dark)',
                    boxShadow: `0 0 12px ${dot.color}`,
                    position: 'relative',
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    background: dot.color,
                    opacity: 0.2,
                    animation: 'pulse-ring 2.5s ease-out infinite',
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              </div>
            ))}

            {/* You Are Here */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#4A9EFF',
                  border: '3px solid white',
                  boxShadow: '0 0 20px rgba(74,158,255,0.7)',
                  position: 'relative',
                  zIndex: 3,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-28px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(74,158,255,0.15)',
                  border: '1px solid rgba(74,158,255,0.4)',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: '#4A9EFF',
                  whiteSpace: 'nowrap',
                }}
              >
                YOU ARE HERE
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(6,10,4,0.9)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.1em',
                  marginBottom: '4px',
                }}
              >
                CAPACITY STATUS
              </span>
              {[
                { color: 'var(--acid)', label: 'Available (< 70%)' },
                { color: 'var(--warn)', label: 'Near Full (70–90%)' },
                { color: 'var(--danger)', label: 'Full (> 90%)' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--muted)',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Selected shelter popup */}
            {selectedShelter && (
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(6,10,4,0.95)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  minWidth: '300px',
                  maxWidth: '400px',
                  zIndex: 10,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--text)',
                    }}
                  >
                    {selectedShelter.name}
                  </h3>
                  <button
                    onClick={() => setSelectedShelter(null)}
                    style={{
                      color: 'var(--muted)',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                      marginLeft: '12px',
                    }}
                    aria-label="Close popup"
                  >
                    ×
                  </button>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--muted)',
                    marginBottom: '12px',
                  }}
                >
                  📍 {selectedShelter.address}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--muted)',
                        marginBottom: '2px',
                      }}
                    >
                      DISTANCE
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--acid)',
                      }}
                    >
                      {selectedShelter.distance}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--muted)',
                        marginBottom: '2px',
                      }}
                    >
                      CAPACITY
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--text)',
                      }}
                    >
                      {selectedShelter.occupied}/{selectedShelter.capacity}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--muted)',
                        marginBottom: '2px',
                      }}
                    >
                      PHONE
                    </div>
                    <a
                      href={`tel:${selectedShelter.phone}`}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        color: 'var(--acid)',
                      }}
                    >
                      {selectedShelter.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={`https://maps.google.com/?q=${selectedShelter.lat},${selectedShelter.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'var(--acid)',
                    color: 'var(--black)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#C4FF5A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = 'var(--acid)')
                  }
                >
                  Get Directions →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
