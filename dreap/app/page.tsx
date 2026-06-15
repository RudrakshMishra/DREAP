'use client';

import { useRef } from 'react';
import SectionDots from '@/components/layout/SectionDots';
import HeroSlide from '@/components/landing/HeroSlide';
import ProblemSlide from '@/components/landing/ProblemSlide';
import SolutionSlide from '@/components/landing/SolutionSlide';
import AlertSlide from '@/components/landing/AlertSlide';
import ShelterSlide from '@/components/landing/ShelterSlide';
import GuidelineSlide from '@/components/landing/GuidelineSlide';
import ContactsSlide from '@/components/landing/ContactsSlide';
import IncidentSlide from '@/components/landing/IncidentSlide';
import TechSlide from '@/components/landing/TechSlide';
import CTASlide from '@/components/landing/CTASlide';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Section dots navigation */}
      <SectionDots containerRef={containerRef} />

      {/* Scroll-snap container */}
      <div
        ref={containerRef}
        className="snap-container"
        style={{ paddingTop: '0' }}
      >
        <HeroSlide />
        <ProblemSlide />
        <SolutionSlide />
        <AlertSlide />
        <ShelterSlide />
        <GuidelineSlide />
        <ContactsSlide />
        <IncidentSlide />
        <TechSlide />
        <CTASlide />
      </div>
    </>
  );
}
