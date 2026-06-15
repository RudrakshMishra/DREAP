# DREAP — Disaster Response & Emergency Assistance Portal

> A unified emergency coordination platform for India. Real-time alerts, shelter maps, safety guidelines, emergency contacts, and incident reporting — all in one place.

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Frontend Architecture](#frontend-architecture)
- [UI System](#ui-system)
- [Pages & Sections](#pages--sections)
- [Animation System](#animation-system)
- [Component Library](#component-library)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Design Tokens](#design-tokens)
- [Accessibility](#accessibility)
- [Deployment](#deployment)

---

## Overview

DREAP (Disaster Response & Emergency Assistance Portal) is a frontend-first emergency management platform designed for state governments, municipal corporations, and emergency management agencies across India.

The platform solves a critical problem: when disasters strike, people waste life-saving minutes across disconnected apps, outdated websites, and overloaded hotlines. DREAP brings every emergency service into a single, fast, always-available interface.

**Design philosophy:** Information architecture over decoration. Speed over visual complexity. Trust through clarity.

---

## Core Features

| Feature | Description |
|---|---|
| Real-Time Alert Feed | Multi-severity emergency broadcasts with zone targeting |
| Shelter Finder | 12,000+ mapped shelters with live capacity and navigation |
| Safety Guidelines | Disaster-type protocols in 12 regional languages |
| Emergency Contacts | One-tap calling with auto-GPS sharing |
| Incident Reporting | Citizen-submitted reports with photo, location, severity |
| Offline Mode | Core features cached via service workers |

---

## Frontend Architecture

```
Browser (PWA)
  └── Next.js App Router
        ├── /                → Landing Page (10 slides)
        ├── /alerts          → Live Alert Feed
        ├── /shelters        → Shelter Map & Search
        ├── /guidelines      → Safety Protocol Library
        ├── /contacts        → Emergency Directory
        └── /report          → Incident Report Form
```

### Rendering Strategy

- **Landing page:** Static generation (SSG) for instant load
- **Alert feed:** Server-sent events (SSE) for real-time updates
- **Shelter map:** Incremental Static Regeneration (ISR) every 60s
- **Incident form:** Client-side with optimistic UI updates

---

## UI System

### Color System

```css
--acid:       #A8FF3E   /* Primary action, active states, data highlights */
--acid-dim:   #6FCC1A   /* Pressed state, secondary highlights */
--acid-glow:  rgba(168,255,62,0.18)  /* Halos, card backgrounds */
--black:      #060A04   /* Page background */
--dark:       #0D1408   /* Alternating section background */
--card:       #111A0A   /* Card surfaces */
--border:     rgba(168,255,62,0.18)  /* Active borders */
--border-dim: rgba(168,255,62,0.07)  /* Subtle dividers */
--text:       #E8F5D0   /* Primary text */
--muted:      #7A9660   /* Secondary text, labels */
--danger:     #FF4444   /* Critical alerts */
--warn:       #FFB700   /* High severity, near-full capacity */
--safe:       #A8FF3E   /* Clear status, available capacity */
```

### Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | Syne | 800 | Section headings, hero titles, numerals |
| Body | Space Grotesk | 300–600 | Paragraphs, labels, UI copy |
| Mono | JetBrains Mono | 400–600 | Section labels, timestamps, codes, data |

### Spacing Scale

```
4px   · micro gap (icon to label)
8px   · tight (form field margins)
12px  · compact (list item gap)
16px  · default (card padding internal)
20px  · comfortable (between cards)
28px  · section internal
40px  · between components
64px  · between sections
```

---

## Pages & Sections

### Landing Page (10 Slides)

| # | Slide | Purpose |
|---|---|---|
| 1 | **Hero** | Brand statement, radar animation, live stats, CTA |
| 2 | **Problem** | Why existing systems fail. Real statistics. |
| 3 | **Solution Overview** | 6 core modules introduced as a grid |
| 4 | **Alert System** | Live alert feed UI with severity states |
| 5 | **Shelter Finder** | Map mockup + live capacity cards |
| 6 | **Safety Guidelines** | Tabbed protocol viewer + emergency checklist |
| 7 | **Emergency Contacts** | 8-card directory with one-tap calling |
| 8 | **Incident Reporting** | Form walkthrough + 3-step process |
| 9 | **Architecture** | Tech diagram — data sources → platform → users |
| 10 | **Deploy CTA** | Government partner pitch + 3 impact stats |

---

## Animation System

### Principles
- All animations serve communication — no decoration for its own sake
- Reduced motion respected via `prefers-reduced-motion` media query
- Scroll-triggered via `IntersectionObserver` (threshold: 0.2)

### Animations Used

| Effect | Element | Trigger |
|---|---|---|
| `slide-in` | Section content blocks | Scroll into view |
| `radar-expand` | Hero radar rings | Page load, continuous |
| `pulse` | Alert severity dots | Always on |
| `ping` | Shelter map dots | Always on |
| `scrollDown` | Hero scroll indicator | Always on |
| `capacity-fill` | Shelter capacity bars | Section enters view |
| `cursor-ring` | Custom cursor halo | Mouse movement |
| Progress bar | Top border | Window scroll |

### Scroll Behavior

```css
html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}
section {
  scroll-snap-align: start;
}
```

Sections snap to viewport for focused, slide-style reading. Section dot navigation in the right rail reflects current position.

---

## Component Library

### AlertItem
```
Props:
  severity: 'critical' | 'high' | 'medium' | 'info' | 'resolved'
  title: string
  meta: string
  badge: string

States:
  Default, Hover, Read, Expanding
```

### ShelterCard
```
Props:
  name: string
  type: 'school' | 'hall' | 'stadium' | 'temple'
  distance: string
  capacity: number
  total: number
  facilities: string[]

Capacity bar color:
  < 70%   → --acid (green)
  70–90%  → --warn (yellow)
  > 90%   → --danger (red)
```

### ContactCard
```
Props:
  emoji: string
  name: string
  number: string
  description: string

Interaction:
  Hover → border-color: --acid, radial glow fades in
  Click → tel: link triggers
```

### IncidentForm
```
Fields:
  type (select)
  description (textarea)
  severity (toggle: Critical / High / Medium)
  location (GPS auto-fill with manual override)
  photos (optional)

Submission:
  Optimistic UI → spinner → success state
```

### GuideTab
```
Props:
  type: 'Flood' | 'Earthquake' | 'Fire' | 'Heatwave' | 'Cyclone'
  steps: GuideStep[]
  checklist: string[]

Interaction:
  Tab switch → steps animate out then in
```

---

## Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + CSS Variables |
| Animations | Framer Motion + CSS |
| Maps | Leaflet.js + OpenStreetMap |
| PWA | next-pwa (Workbox) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| State | Zustand |

### Backend (for integration)

| Layer | Technology |
|---|---|
| API | Node.js + Fastify |
| Database | PostgreSQL (PostGIS for geo) |
| Cache | Redis |
| Real-time | WebSocket (Socket.io) |
| Queue | BullMQ |
| Auth | JWT + OTP (mobile) |

### Infrastructure

| Service | Provider |
|---|---|
| Hosting | AWS (Mumbai region primary) |
| CDN | CloudFront |
| DB | RDS PostgreSQL (Multi-AZ) |
| Storage | S3 (incident photos) |
| SMS | Twilio / MSG91 |

---

## Folder Structure

```
dreap/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              ← Landing page (10 slides)
│   ├── alerts/
│   │   └── page.tsx
│   ├── shelters/
│   │   └── page.tsx
│   ├── guidelines/
│   │   ├── page.tsx
│   │   └── [type]/page.tsx
│   ├── contacts/
│   │   └── page.tsx
│   └── report/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── AlertItem.tsx
│   │   ├── ShelterCard.tsx
│   │   ├── ContactCard.tsx
│   │   ├── IncidentForm.tsx
│   │   ├── GuideStep.tsx
│   │   └── SeverityBadge.tsx
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionDots.tsx
│   │   └── ProgressBar.tsx
│   └── landing/
│       ├── HeroSlide.tsx
│       ├── ProblemSlide.tsx
│       ├── SolutionSlide.tsx
│       ├── AlertSlide.tsx
│       ├── ShelterSlide.tsx
│       ├── GuidelineSlide.tsx
│       ├── ContactsSlide.tsx
│       ├── IncidentSlide.tsx
│       ├── TechSlide.tsx
│       └── CTASlide.tsx
├── lib/
│   ├── api.ts
│   ├── types.ts
│   ├── constants.ts
│   └── utils.ts
├── styles/
│   ├── globals.css
│   └── tokens.css
├── public/
│   ├── icons/
│   └── manifest.json
└── README.md
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/dreap.git
cd dreap

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.dreap.gov.in
NEXT_PUBLIC_MAPS_KEY=your_maps_api_key
NEXT_PUBLIC_SOCKET_URL=wss://ws.dreap.gov.in
```

---

## Design Tokens

All design decisions are encoded in CSS custom properties in `styles/tokens.css`. Never hardcode colors, spacing, or fonts in components — always reference tokens.

```css
/* Import in every component stylesheet */
@import '@/styles/tokens.css';
```

---

## Accessibility

- All interactive elements have visible `:focus-visible` states with `--acid` outline
- Color is never the only indicator of state (always paired with icon or label)
- Alert severity uses both color AND text badge
- Capacity bars have numeric text alongside visual bar
- All contact cards are keyboard-navigable
- Font size minimum: 12px (12px only for JetBrains Mono labels)
- Body copy minimum: 16px
- Reduced motion: all CSS animations wrapped in `@media (prefers-reduced-motion: no-preference)`
- WCAG AA contrast for all body text against backgrounds

---

## Deployment

```bash
# Build static assets
npm run build

# Deploy to AWS (using provided deploy script)
./scripts/deploy.sh production

# Health check
curl https://dreap.gov.in/api/health
```

### Uptime Requirements

- Landing page: 99.99% (static CDN)
- Alert API: 99.9% with multi-region failover
- Shelter data: ISR with 60s staleness tolerance
- Incident reporting: 99.5% (graceful offline queue)

---

## License

Government of India open-source license. Free for state and municipal government entities. Contact partnerships@dreap.gov.in for enterprise integration.

---

*DREAP — Built for resilience. Designed for speed.*
