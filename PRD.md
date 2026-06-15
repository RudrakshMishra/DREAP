# Product Requirements Document
## DREAP — Disaster Response & Emergency Assistance Portal
### UI/UX & Frontend

**Version:** 1.0  
**Status:** Approved for Development  
**Author:** Product Team  
**Last Updated:** June 2025

---

## 1. Executive Summary

DREAP is a public-facing emergency coordination platform for citizens, responders, and government agencies. This PRD defines the complete UI/UX and frontend product requirements — covering information architecture, page-level specifications, component behavior, interaction design, accessibility standards, and performance targets.

The design goal is a system that is **immediately usable under stress** — readable in bright sunlight, operable with one hand, trusted on first visit, and functional without internet.

---

## 2. Problem Statement

### 2.1 User Pain Points

| User | Scenario | Pain Today |
|---|---|---|
| Citizen | Flood warning hits at 2am | Doesn't know nearest shelter or road status |
| Citizen | Family member trapped | 112 line is busy. Doesn't know other numbers |
| Responder | Incoming incident reports | No aggregated view. Calls and messages scattered |
| Government | Tracking relief progress | No real-time dashboard of citizen status |

### 2.2 Current State Failure Modes

- Alert dissemination averages 18 minutes across existing systems
- 73% of citizens surveyed cannot name their nearest emergency shelter
- Emergency hotlines saturate within 4 minutes of a major event
- No single platform aggregates alerts, shelters, contacts, and reporting

---

## 3. Product Vision

> "In the worst moment of someone's life, DREAP should be the calmest, clearest thing on their screen."

Every UI decision flows from this. Panic reduces cognitive load — DREAP compensates with radical clarity, minimal decision friction, and immediate action paths.

---

## 4. Users & Personas

### 4.1 Primary Users

**Ritu, 34 — Homemaker, Bhopal**
- Low digital literacy. Uses WhatsApp daily.
- During a flood, her first instinct is to call someone.
- Needs: large tap targets, simple language, phone numbers visible without scrolling.

**Arjun, 22 — Engineering Student, Indore**
- High digital literacy. Uses multiple apps confidently.
- During an emergency, wants real-time data fast.
- Needs: dense information, map view, incident tracking.

**Inspector Kavita, 41 — Emergency Coordinator, NDRF**
- Uses government dashboards. Comfortable with data tables.
- Needs: incident feed, shelter capacity overview, dispatch interface.

### 4.2 Secondary Users

- Journalists monitoring active emergency events
- NGO volunteers coordinating relief logistics
- State/municipal administrators reviewing response dashboards

---

## 5. Information Architecture

### 5.1 Site Map

```
dreap.gov.in/
├── /                    (Landing — public, SEO-optimized)
├── /alerts              (Live feed — all active/recent alerts)
│   └── /alerts/[id]     (Single alert detail + map)
├── /shelters            (Map + list search)
│   └── /shelters/[id]   (Shelter detail — capacity, directions, facilities)
├── /guidelines          (Disaster protocol library)
│   └── /guidelines/[type]  (Flood / Earthquake / Fire / Heatwave / Cyclone)
├── /contacts            (Emergency directory)
├── /report              (Incident submission form)
│   └── /report/success  (Confirmation + tracking ID)
├── /dashboard           (Admin — role-gated, responders only)
└── /offline             (Static fallback, cached)
```

### 5.2 Navigation Model

- **Primary nav:** Fixed top bar, collapses to hamburger on mobile
- **Quick actions:** Floating action button (mobile only) — one-tap to Contacts
- **Section nav:** Sidebar dots on landing page for section awareness
- **Emergency access:** "Emergency" button always visible in nav, links to /contacts

---

## 6. Page Requirements

---

### 6.1 Landing Page

**Purpose:** Educate, build trust, drive registration or portal access.

**Performance Target:** LCP < 1.8s, CLS < 0.05, FCP < 0.9s

#### Section Specifications

---

**S1 — Hero**

| Element | Requirement |
|---|---|
| Headline | Max 8 words. Present-tense, human. |
| Sub-headline | Max 25 words. What it is, who it's for. |
| Primary CTA | "Get Emergency Access" → /register or /dashboard |
| Secondary CTA | "Learn How It Works" → smooth scroll to #solution |
| Visual | Animated radar/sonar metaphor. No stock photos. |
| Live status | "System Active" indicator with pulsing dot |
| Stats | 4 live-refreshed numbers: alert time, uptime, shelters, languages |
| Load animation | Hero content fades + slides up on page load (< 600ms) |

---

**S2 — Problem**

| Element | Requirement |
|---|---|
| Heading | Acknowledge the failure, not the solution |
| Body copy | 2 paragraphs max. Real, verifiable statistics only. |
| Stat row | 3 headline numbers. Use real disaster data. |
| Problem cards | 4 cards, 2×2 grid. Each: icon, title, 1-sentence description |
| Tone | Serious but not alarming. Empathetic, not accusatory. |

---

**S3 — Solution Overview**

| Element | Requirement |
|---|---|
| Heading | Solution framing. Contrast with problem. |
| Feature grid | 6 cards in 3×2 grid |
| Each card | Number label, icon, title, 2-sentence description |
| Hover state | Animated bottom border reveals in --acid color |
| Transition | Cards fade in staggered on scroll (100ms between) |

---

**S4 — Alert System**

| Element | Requirement |
|---|---|
| Layout | 2-column: copy left, live feed right |
| Alert feed | 5 items visible, scrollable. Severity color-coded. |
| Severity states | Critical (red), High (yellow), Info/Resolved (green) |
| Each item | Dot indicator, title, meta (time + zone), badge |
| Animation | Items slide in from right on section enter |
| Copy | 3 callout stats with supporting context |

---

**S5 — Shelter Finder**

| Element | Requirement |
|---|---|
| Layout | 2-column: shelter cards left, map right |
| Map | Grid mockup with dot markers, You Are Here indicator |
| Map legend | 3 states: Available (green), Near Full (yellow), Full (red) |
| Shelter cards | 3 visible cards. Name, distance, facilities, capacity bar |
| Capacity bar | Fills on scroll-enter. Color based on fill percentage |
| Hover | Card border highlights in --acid |

---

**S6 — Safety Guidelines**

| Element | Requirement |
|---|---|
| Layout | 2-column: steps left, checklist right |
| Tab bar | 4 disaster types. Active tab underlined in --acid |
| Tab switch | Steps animate out/in on tab change |
| Steps | 4 steps per type. Number badge, title, description. |
| Checklist | 8 items. Checkbox icon + text. Static (not interactive on landing) |
| Offline note | Small label: "Available offline" |

---

**S7 — Emergency Contacts**

| Element | Requirement |
|---|---|
| Layout | 4×2 grid of contact cards |
| Each card | Emoji icon, service name, phone number (large, monospace), description |
| Hover | Radial glow from top, border highlights |
| Phone display | Numbers must be readable without glasses at arm's length |
| Tap behavior | On landing: visual only. On /contacts: tel: link |
| Accessibility | All cards keyboard-navigable |

---

**S8 — Incident Reporting**

| Element | Requirement |
|---|---|
| Layout | 2-column: process steps left, form mock right |
| Process | 3 numbered steps with connecting line |
| Form mock | Filled-in example state (not interactive on landing) |
| Fields shown | Type, description, severity toggle, location |
| Severity | 3-button toggle: Critical / High / Medium |
| CTA | "Submit Report →" leads to /report |

---

**S9 — Architecture**

| Element | Requirement |
|---|---|
| Layout | 3-column flow diagram: Sources → Platform → Users |
| Each column | 4 boxes with layer label and service name |
| Arrows | Simple → between columns |
| Tech footer | 3-column text row: Frontend / Backend / Infrastructure |
| Tone | Technical, honest. No marketing buzzwords. |

---

**S10 — CTA**

| Element | Requirement |
|---|---|
| Layout | Centered, max-width 760px |
| Headline | Government/agency focus. Not consumer. |
| Stats row | 3 deployment/impact numbers |
| Primary CTA | "Request Demo" |
| Secondary CTA | "Download Brochure" |
| Ambient | Subtle radial glow from center |

---

### 6.2 Alerts Page (/alerts)

**Layout:** Full-page live feed with filter bar

**Filters:** All / Critical / High / Medium / Zone / Disaster Type / Date

**Each Alert Item (expanded):**
- Severity badge + colored left border
- Title, timestamp, affected zone
- Brief description (2 sentences)
- Action links: View Map / Share / Dismiss

**Real-time behavior:** New alerts animate in from top. Badge on tab when page not focused.

**Empty state:** "No active alerts in your area" with last-checked timestamp.

---

### 6.3 Shelters Page (/shelters)

**Layout:** Split — search/list on left (380px), full map on right

**Search:** Text search + filters (distance, type, facilities, accessibility)

**Map:**
- Leaflet.js base, dark OpenStreetMap tiles
- Clustered markers for dense zones
- You Are Here (blue dot)
- Shelter markers: green / yellow / red by capacity
- Click marker → shelter info popup

**List items:**
- Shelter name, type, distance
- Capacity bar with numeric label
- Facilities icons (food, water, medical, pet-friendly, wheelchair)
- "Get Directions" → opens device maps app

---

### 6.4 Guidelines Page (/guidelines)

**Layout:** Sidebar (disaster type nav) + main content area

**Disaster Types:** Flood, Earthquake, Fire, Heatwave, Cyclone, Landslide

**Each Guide:**
- Danger level indicator
- Before / During / After tabs
- Numbered steps with icons
- Do's and Don'ts (side by side)
- Downloadable PDF (for offline use)
- Video link (NDRF official)

**Languages:** Toggle in header. 12 languages supported.

---

### 6.5 Contacts Page (/contacts)

**Layout:** Grid of all emergency services + search

**Each Card (interactive):**
- Tap to call (tel: link on mobile)
- Copy number button on desktop
- Share button
- "Send location" toggle (shares GPS with call)

**Sections:** National / State / District / Specialized

---

### 6.6 Incident Report Page (/report)

**Multi-step form — 3 steps:**

**Step 1 — Incident Details**
- Incident type (dropdown with icons)
- Title (auto-suggested based on type)
- Description (textarea, 500 chars max)
- Photos (optional, max 3, auto-compressed)

**Step 2 — Location & Severity**
- Auto-detect GPS with confirm
- Manual address override
- Severity level (Critical / High / Medium)
- People affected (optional number input)

**Step 3 — Contact & Submit**
- Name (optional)
- Phone (optional, for responder callback)
- Anonymous submission toggle
- Review summary
- Submit

**Post-submit:**
- Tracking ID displayed
- "Report submitted to [nearest unit] — ETA X minutes"
- Option to add more info

---

## 7. Component Specifications

### 7.1 Severity Badge

```
Variants: critical | high | medium | info | resolved

Critical:
  background: rgba(255,68,68,0.12)
  border: 1px solid rgba(255,68,68,0.3)
  color: #FF4444
  text: "CRITICAL"

High:
  background: rgba(255,183,0,0.1)
  border: 1px solid rgba(255,183,0,0.3)
  color: #FFB700
  text: "HIGH"

Medium:
  background: rgba(168,255,62,0.06)
  border: 1px solid rgba(168,255,62,0.2)
  color: #A8FF3E
  text: "MEDIUM"

Font: JetBrains Mono, 0.62rem, letter-spacing: 0.1em
Padding: 3px 10px
```

### 7.2 Button

```
Primary:
  Background: #A8FF3E
  Color: #060A04
  Font: Space Grotesk 700, 0.9rem
  Padding: 14px 32px
  Clip-path: chamfered corner (10px)
  Hover: background lightens to #C4FF5A, translateY(-2px)

Secondary:
  Background: transparent
  Border: 1px solid rgba(168,255,62,0.18)
  Color: #E8F5D0
  Hover: border --acid, color --acid, translateY(-2px)

Danger:
  Background: transparent
  Border: 1px solid rgba(255,68,68,0.4)
  Color: #FF4444
  Hover: background rgba(255,68,68,0.1)
```

### 7.3 Input / Form Fields

```
Background: rgba(168,255,62,0.03)
Border: 1px solid rgba(168,255,62,0.07)
Color: #E8F5D0
Font: Space Grotesk, 0.88rem
Padding: 12px 16px
Outline: none

Focus:
  border-color: #A8FF3E
  No shadow (cleaner look)

Error:
  border-color: #FF4444
  Error text below: 0.75rem, #FF4444

Placeholder: color #7A9660
```

### 7.4 Capacity Bar

```
Track:
  height: 4px
  background: rgba(168,255,62,0.07)
  border-radius: 2px

Fill:
  < 70%:  background #A8FF3E
  70–90%: background #FFB700
  > 90%:  background #FF4444
  border-radius: 2px
  transition: width 1s ease 0.5s  (delays for scroll entrance)
```

### 7.5 Navigation

```
Height: 72px
Background: linear-gradient(to bottom, rgba(6,10,4,0.95), transparent)
backdrop-filter: blur(2px)
Position: fixed, z-index 100

Logo: Syne 800, --acid, letter-spacing 0.12em, uppercase
Links: Space Grotesk 500, 0.82rem, --muted default, --acid hover
CTA: "Launch Portal" — Secondary button style
Mobile: hamburger at < 768px
```

---

## 8. Interaction Design

### 8.1 Scroll Behavior

- **Desktop:** CSS scroll-snap on landing page. Each section is full viewport height.
- **Mobile:** Free scroll. Scroll-snap is optional (reduced on mobile to avoid trapped feel).
- **Smooth scroll:** `scroll-behavior: smooth` for anchor links.

### 8.2 Animation Principles

1. Animate on entry, not on exit.
2. Maximum duration: 750ms for content reveals.
3. Stagger delays: 100ms between sibling elements.
4. Never animate layout — only `opacity`, `transform`, `color`.
5. All animations behind `@media (prefers-reduced-motion: no-preference)`.

### 8.3 Loading States

| State | Behavior |
|---|---|
| Initial page load | Skeleton screen for dynamic content |
| Alert feed refresh | Top spinner, content stays visible |
| Form submission | Button → spinner → success/error state |
| Map loading | Grid pattern visible, dots fade in |
| Image upload | Progress bar within photo thumbnail |

### 8.4 Error States

| Error | Message | Action |
|---|---|---|
| No internet | "You're offline — showing last saved data" | Refresh button |
| Alert fetch fail | "Couldn't load live alerts — retry?" | Retry button |
| Location denied | "Allow location for nearest shelters" | Settings link |
| Form validation | Inline, field-level, specific instructions | Fix and retry |
| API error | "Something went wrong. Try again." | Retry, report link |

---

## 9. Responsive Design

### 9.1 Breakpoints

```
xs:  < 480px   → single column, large touch targets
sm:  480–768px → mostly single column
md:  768–1024px → 2-column layouts emerge
lg:  1024–1280px → full layouts
xl:  > 1280px  → max-width containers centered
```

### 9.2 Mobile-Specific

- Minimum tap target: 48×48px
- Alert items: full-width, swipe to dismiss (right = acknowledge, left = share)
- Map: full-screen toggle available
- Contacts: tap to call, no hover states
- FAB (Floating Action Button): bottom-right, "Emergency" with 🚨 icon

### 9.3 Offline Mode

Cached via service worker (Workbox):
- Emergency contacts (all numbers)
- Nearest 5 shelters (based on last known location)
- Safety guidelines (all types, all languages)
- Landing page (full static)

Offline banner: `"You're offline — emergency contacts and shelters available"`

---

## 10. Performance Requirements

| Metric | Target | Critical |
|---|---|---|
| LCP | < 1.8s | Yes |
| FID / INP | < 100ms | Yes |
| CLS | < 0.05 | Yes |
| FCP | < 0.9s | No |
| TTI | < 3.5s | No |
| Bundle size (gzipped) | < 180kb initial | Yes |
| Lighthouse score | > 90 all categories | No |

### Optimizations Required

- Images: WebP with fallback, lazy-loaded
- Fonts: `display: swap`, preconnect to Google Fonts
- Icons: SVG inline (no icon font)
- Map tiles: CDN-cached, only load in viewport
- Alert polling: SSE preferred over polling
- Form: no library bloat — use native form + custom validation

---

## 11. Accessibility

### Standards

- WCAG 2.1 AA compliance minimum
- WCAG 2.1 AAA for emergency contact numbers (critical path)

### Requirements

- All interactive elements keyboard-navigable
- Focus indicators always visible (--acid outline, 2px, 2px offset)
- Color never sole indicator (always paired with text/icon)
- ARIA labels on icon-only buttons
- Screen reader friendly: live regions for alert feed updates
- Alt text required for all images
- Contrast ratios:
  - Body text on --black: minimum 7:1
  - --muted on --black: minimum 4.5:1
  - --acid on --black: 9.2:1 (exceeds AAA)

---

## 12. Localization

- Interface language toggle in nav header
- Supported at launch: English, Hindi
- Phase 2: Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Urdu
- All strings in `i18n/[lang].json`
- Date/time in local format
- Phone numbers formatted per Indian standard
- RTL support for Urdu (Phase 2)

---

## 13. Security & Trust

- No login required to view alerts, contacts, or guidelines
- Incident reports: optional anonymous submission
- Location data: not stored beyond routing the report
- Incident photos: auto-deleted after 30 days
- HTTPS required. No mixed content.
- Government branding (seal) displayed on contacts page for trust

---

## 14. Analytics (Privacy-Safe)

Track:
- Page views per section (no PII)
- Alert impressions vs link clicks
- Shelter searches by district (aggregate)
- Incident report submissions (type + severity, no content)
- Contacts tapped by number (which numbers are most used)

Do not track:
- Individual user identity
- Location beyond district level
- Free-text content

Tool: Self-hosted Plausible or Umami (no Google Analytics).

---

## 15. Launch Criteria

### Must Have (v1.0)
- [ ] Landing page — all 10 sections responsive + animated
- [ ] Alert feed — live data from NDMA API
- [ ] Shelter map — 5,000+ shelters loaded
- [ ] Emergency contacts — all national numbers
- [ ] Incident report form — working submission
- [ ] Offline mode — contacts + shelters cached
- [ ] Mobile-responsive — passes on 320px viewport
- [ ] Accessibility — passes WCAG AA audit
- [ ] Performance — LCP < 1.8s on 4G

### Should Have (v1.1)
- [ ] Regional language support (Hindi at minimum)
- [ ] Admin dashboard for responders
- [ ] Push notifications (PWA)
- [ ] Shelter directions integration

### Nice to Have (v2.0)
- [ ] Native mobile app (React Native)
- [ ] AI triage for incident reports
- [ ] Shelter booking system
- [ ] Family check-in feature

---

## 16. Revision History

| Version | Date | Changes |
|---|---|---|
| 1.0 | June 2025 | Initial release |

---

*This document is the single source of truth for DREAP UI/UX and frontend development. All design and engineering decisions should reference this PRD.*

*DREAP — When every second saves a life.*
