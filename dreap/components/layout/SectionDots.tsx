'use client';

import { useState, useEffect } from 'react';

const SECTIONS = [
  'Hero',
  'Problem',
  'Solution',
  'Alerts',
  'Shelters',
  'Guidelines',
  'Contacts',
  'Incident',
  'Architecture',
  'Deploy',
];

interface SectionDotsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function SectionDots({ containerRef }: SectionDotsProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const idx = Math.round(scrollTop / clientHeight);
      setActiveSection(Math.max(0, Math.min(idx, SECTIONS.length - 1)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 50,
      }}
      aria-label="Page navigation"
    >
      {SECTIONS.map((section, i) => (
        <button
          key={section}
          onClick={() => scrollTo(i)}
          aria-label={`Go to ${section} section`}
          title={section}
          style={{
            width: activeSection === i ? '6px' : '4px',
            height: activeSection === i ? '24px' : '4px',
            borderRadius: '3px',
            background: activeSection === i ? 'var(--acid)' : 'rgba(168,255,62,0.25)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: 0,
            boxShadow: activeSection === i ? '0 0 8px var(--acid)' : 'none',
          }}
        />
      ))}
    </div>
  );
}
