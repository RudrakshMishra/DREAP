'use client';

import { useState } from 'react';
import { INCIDENT_TYPES } from '@/lib/constants';
import { generateTrackingId } from '@/lib/utils';

type Step = 1 | 2 | 3;
type Severity = 'Critical' | 'High' | 'Medium';

interface FormData {
  type: string;
  title: string;
  description: string;
  severity: Severity;
  address: string;
  peopleAffected: string;
  name: string;
  phone: string;
  anonymous: boolean;
}

const INITIAL: FormData = {
  type: '',
  title: '',
  description: '',
  severity: 'High',
  address: '',
  peopleAffected: '',
  name: '',
  phone: '',
  anonymous: false,
};

export default function ReportPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const update = (key: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validateStep1 = () => {
    const errs: typeof errors = {};
    if (!form.type) errs.type = 'Please select an incident type.';
    if (!form.description.trim()) errs.description = 'Please describe the incident.';
    if (form.description.length > 500) errs.description = 'Max 500 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: typeof errors = {};
    if (!form.address.trim()) errs.address = 'Please provide a location.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    const id = generateTrackingId();
    setTrackingId(id);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--black)',
          paddingTop: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '480px',
            padding: '48px 24px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(168,255,62,0.1)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 24px',
            }}
          >
            ✅
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '2rem',
              color: 'var(--text)',
              marginBottom: '12px',
            }}
          >
            Report Submitted
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            Your report has been routed to the nearest response unit. They have been notified.
          </p>

          <div
            style={{
              padding: '20px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--muted)',
                letterSpacing: '0.15em',
                marginBottom: '8px',
              }}
            >
              TRACKING ID
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--acid)',
                letterSpacing: '0.08em',
              }}
            >
              {trackingId}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--muted)',
                marginTop: '8px',
              }}
            >
              Save this ID to track your report status
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setForm(INITIAL);
                setSubmitted(false);
                setStep(1);
              }}
              style={{
                padding: '10px 24px',
                background: 'var(--acid)',
                color: 'var(--black)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#C4FF5A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = 'var(--acid)')
              }
            >
              Submit Another Report
            </button>
            <a
              href="/contacts"
              style={{
                padding: '10px 24px',
                background: 'transparent',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.88rem',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-sm)',
                transition: 'border-color 0.2s',
                display: 'inline-block',
              }}
            >
              Emergency Contacts
            </a>
          </div>
        </div>
      </div>
    );
  }

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
          padding: '32px 0',
        }}
      >
        <div className="container">
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Report an Incident
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--muted)',
            }}
          >
            Anonymous submission supported. Routed directly to nearest NDRF unit.
          </p>

          {/* Step progress */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '24px',
            }}
          >
            {([1, 2, 3] as Step[]).map((s) => (
              <div
                key={s}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: step > s ? 'var(--acid)' : step === s ? 'var(--acid-faint)' : 'var(--card)',
                    border: `1px solid ${step >= s ? 'var(--acid)' : 'var(--border-dim)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: step > s ? 'var(--black)' : step === s ? 'var(--acid)' : 'var(--muted)',
                    transition: 'all 0.3s',
                  }}
                >
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && (
                  <div
                    style={{
                      width: '48px',
                      height: '1px',
                      background: step > s ? 'var(--acid)' : 'var(--border-dim)',
                      transition: 'background 0.3s',
                    }}
                  />
                )}
              </div>
            ))}
            <span
              style={{
                marginLeft: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--muted)',
              }}
            >
              Step {step} of 3 —{' '}
              {step === 1
                ? 'Incident Details'
                : step === 2
                ? 'Location & Severity'
                : 'Contact & Submit'}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div
        className="container"
        style={{ padding: '40px 24px', maxWidth: '640px' }}
      >
        {/* Step 1: Incident Details */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormField label="INCIDENT TYPE" error={errors.type} required>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '8px',
                }}
              >
                {INCIDENT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    id={`type-${t.value}`}
                    onClick={() => {
                      update('type', t.value);
                      update('title', t.description);
                    }}
                    style={{
                      padding: '10px 14px',
                      textAlign: 'left',
                      background: form.type === t.value ? 'var(--acid-faint)' : 'var(--card)',
                      border: `1px solid ${form.type === t.value ? 'var(--border)' : 'var(--border-dim)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--text)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="DESCRIPTION" error={errors.description} required>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Describe what is happening, how many people are affected..."
                rows={4}
                maxLength={500}
                aria-label="Incident description"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(168,255,62,0.03)',
                  border: `1px solid ${errors.description ? 'var(--danger)' : 'var(--border-dim)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  resize: 'vertical',
                  outline: 'none',
                  lineHeight: 1.6,
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) =>
                  ((e.target as HTMLTextAreaElement).style.borderColor =
                    errors.description ? 'var(--danger)' : 'var(--acid)')
                }
                onBlur={(e) =>
                  ((e.target as HTMLTextAreaElement).style.borderColor =
                    errors.description ? 'var(--danger)' : 'var(--border-dim)')
                }
              />
              <div
                style={{
                  textAlign: 'right',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: form.description.length > 450 ? 'var(--warn)' : 'var(--muted)',
                  marginTop: '4px',
                }}
              >
                {form.description.length}/500
              </div>
            </FormField>

            <div
              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}
            >
              <button
                id="step1-next"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                style={{
                  padding: '12px 28px',
                  background: 'var(--acid)',
                  color: 'var(--black)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#C4FF5A')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'var(--acid)')
                }
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Location & Severity */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormField label="LOCATION" error={errors.address} required>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <button
                  id="detect-location"
                  style={{
                    padding: '10px 16px',
                    background: 'var(--acid-faint)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--acid)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          update(
                            'address',
                            `${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E — GPS Detected`
                          );
                        },
                        () => {
                          update('address', 'Location access denied — please enter manually');
                        }
                      );
                    }
                  }}
                >
                  📍 Auto-Detect GPS
                </button>
              </div>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                placeholder="Or enter address manually..."
                aria-label="Incident location"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(168,255,62,0.03)',
                  border: `1px solid ${errors.address ? 'var(--danger)' : 'var(--border-dim)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor = 'var(--acid)')
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    errors.address ? 'var(--danger)' : 'var(--border-dim)')
                }
              />
            </FormField>

            <FormField label="SEVERITY LEVEL" required>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['Critical', 'High', 'Medium'] as Severity[]).map((s) => {
                  const colors: Record<Severity, string> = {
                    Critical: '#FF4444',
                    High: '#FFB700',
                    Medium: '#A8FF3E',
                  };
                  const isActive = form.severity === s;
                  return (
                    <button
                      key={s}
                      id={`severity-${s.toLowerCase()}`}
                      onClick={() => update('severity', s)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        color: isActive ? colors[s] : 'var(--muted)',
                        background: isActive
                          ? s === 'Critical'
                            ? 'rgba(255,68,68,0.1)'
                            : s === 'High'
                            ? 'rgba(255,183,0,0.1)'
                            : 'rgba(168,255,62,0.08)'
                          : 'transparent',
                        border: `1px solid ${isActive ? colors[s] + '50' : 'var(--border-dim)'}`,
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {s === 'Critical' ? '🔴' : s === 'High' ? '🟡' : '🟢'} {s.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </FormField>

            <FormField label="PEOPLE AFFECTED (OPTIONAL)">
              <input
                type="number"
                value={form.peopleAffected}
                onChange={(e) => update('peopleAffected', e.target.value)}
                placeholder="Approximate number..."
                min="0"
                aria-label="Number of people affected"
                style={{
                  width: '200px',
                  padding: '12px 16px',
                  background: 'rgba(168,255,62,0.03)',
                  border: '1px solid var(--border-dim)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor = 'var(--acid)')
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor = 'var(--border-dim)')
                }
              />
            </FormField>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  border: '1px solid var(--border-dim)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-dim)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                }}
              >
                ← Back
              </button>
              <button
                id="step2-next"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                style={{
                  padding: '12px 28px',
                  background: 'var(--acid)',
                  color: 'var(--black)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#C4FF5A')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'var(--acid)')
                }
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Submit */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Anonymous toggle */}
            <div
              style={{
                padding: '16px',
                background: 'var(--card)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <button
                id="anonymous-toggle"
                role="switch"
                aria-checked={form.anonymous}
                onClick={() => update('anonymous', !form.anonymous)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  background: form.anonymous ? 'var(--acid)' : 'var(--border-dim)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '3px',
                    left: form.anonymous ? '22px' : '3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: form.anonymous ? 'var(--black)' : 'var(--muted)',
                    transition: 'left 0.2s',
                  }}
                />
              </button>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                  }}
                >
                  {form.anonymous ? 'Anonymous Submission' : 'Named Submission'}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    color: 'var(--muted)',
                  }}
                >
                  {form.anonymous
                    ? 'Your identity will not be shared with responders.'
                    : 'Contact details help responders reach you for follow-up.'}
                </div>
              </div>
            </div>

            {!form.anonymous && (
              <>
                <FormField label="NAME (OPTIONAL)">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name..."
                    aria-label="Your name"
                    style={inputStyle}
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = 'var(--acid)')
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = 'var(--border-dim)')
                    }
                  />
                </FormField>
                <FormField label="PHONE (OPTIONAL)">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 ..."
                    aria-label="Your phone number"
                    style={inputStyle}
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = 'var(--acid)')
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = 'var(--border-dim)')
                    }
                  />
                </FormField>
              </>
            )}

            {/* Summary */}
            <div
              style={{
                padding: '20px',
                background: 'var(--card)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--acid)',
                  letterSpacing: '0.15em',
                  marginBottom: '16px',
                }}
              >
                REPORT SUMMARY
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Type', value: INCIDENT_TYPES.find((t) => t.value === form.type)?.label || '—' },
                  { label: 'Severity', value: form.severity },
                  { label: 'Location', value: form.address || '—' },
                  { label: 'Description', value: form.description.substring(0, 80) + (form.description.length > 80 ? '…' : '') },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', gap: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--muted)',
                        minWidth: '80px',
                        flexShrink: 0,
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--text)',
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  border: '1px solid var(--border-dim)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-dim)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                }}
              >
                ← Back
              </button>
              <button
                id="submit-report"
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  padding: '12px 32px',
                  background: submitting ? 'var(--acid-dim)' : 'var(--acid)',
                  color: 'var(--black)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {submitting ? (
                  <>
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid var(--black)',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        display: 'inline-block',
                      }}
                    />
                    Submitting...
                  </>
                ) : (
                  'Submit Report →'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(168,255,62,0.03)',
  border: '1px solid var(--border-dim)',
  borderRadius: 'var(--radius-sm)' as any,
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

function FormField({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
          marginBottom: '8px',
        }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--danger)', marginLeft: '4px' }}>*</span>
        )}
      </label>
      {children}
      {error && (
        <p
          style={{
            marginTop: '6px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--danger)',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
