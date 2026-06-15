// DREAP — Utility Functions

import { SeverityLevel } from './types';

/**
 * Returns color class based on capacity percentage
 */
export function getCapacityColor(occupied: number, total: number): 'green' | 'yellow' | 'red' {
  const pct = (occupied / total) * 100;
  if (pct > 90) return 'red';
  if (pct > 70) return 'yellow';
  return 'green';
}

/**
 * Returns capacity percentage
 */
export function getCapacityPct(occupied: number, total: number): number {
  return Math.min(Math.round((occupied / total) * 100), 100);
}

/**
 * Returns CSS class for severity level
 */
export function getSeverityClass(severity: SeverityLevel): string {
  switch (severity) {
    case 'critical': return 'severity-critical';
    case 'high':     return 'severity-high';
    case 'medium':   return 'severity-medium';
    case 'info':     return 'severity-info';
    case 'resolved': return 'severity-resolved';
    default:         return 'severity-info';
  }
}

/**
 * Returns border color CSS variable for severity
 */
export function getSeverityBorderColor(severity: SeverityLevel): string {
  switch (severity) {
    case 'critical': return '#FF4444';
    case 'high':     return '#FFB700';
    case 'medium':   return '#A8FF3E';
    case 'info':     return '#A8FF3E';
    case 'resolved': return '#7A9660';
    default:         return '#7A9660';
  }
}

/**
 * Returns dot color CSS class for severity
 */
export function getSeverityDotClass(severity: SeverityLevel): string {
  switch (severity) {
    case 'critical': return 'danger';
    case 'high':     return 'warn';
    case 'medium':
    case 'info':     return '';
    case 'resolved': return 'resolved';
    default:         return '';
  }
}

/**
 * Format relative time
 */
export function formatTime(dateStr: string): string {
  // For demo purposes, return the string as-is if it's already relative
  return dateStr;
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

/**
 * Format Indian phone number for display
 */
export function formatPhone(num: string): string {
  // Already formatted
  return num;
}

/**
 * Clamp number between min and max
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Generate a unique tracking ID
 */
export function generateTrackingId(): string {
  const prefix = 'DRP';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Format large numbers
 */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

/**
 * Returns aria-label for severity badge
 */
export function getSeverityLabel(severity: SeverityLevel): string {
  return severity.charAt(0).toUpperCase() + severity.slice(1) + ' alert';
}
