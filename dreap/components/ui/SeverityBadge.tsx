import { SeverityLevel } from '@/lib/types';

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

const CONFIG: Record<SeverityLevel, { bg: string; border: string; color: string; label: string }> = {
  critical: {
    bg: 'rgba(255,68,68,0.12)',
    border: 'rgba(255,68,68,0.3)',
    color: '#FF4444',
    label: 'CRITICAL',
  },
  high: {
    bg: 'rgba(255,183,0,0.1)',
    border: 'rgba(255,183,0,0.3)',
    color: '#FFB700',
    label: 'HIGH',
  },
  medium: {
    bg: 'rgba(168,255,62,0.06)',
    border: 'rgba(168,255,62,0.2)',
    color: '#A8FF3E',
    label: 'MEDIUM',
  },
  info: {
    bg: 'rgba(168,255,62,0.06)',
    border: 'rgba(168,255,62,0.15)',
    color: '#7A9660',
    label: 'INFO',
  },
  resolved: {
    bg: 'rgba(122,150,96,0.08)',
    border: 'rgba(122,150,96,0.2)',
    color: '#7A9660',
    label: 'RESOLVED',
  },
};

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const c = CONFIG[severity] ?? CONFIG.info;
  return (
    <span
      role="status"
      aria-label={`${c.label} severity`}
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.1em',
        borderRadius: '3px',
        whiteSpace: 'nowrap',
        fontWeight: 600,
      }}
    >
      {c.label}
    </span>
  );
}
