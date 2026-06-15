// DREAP — Type Definitions

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'info' | 'resolved';

export interface Alert {
  id: string;
  severity: SeverityLevel;
  title: string;
  description: string;
  zone: string;
  disasterType: string;
  timestamp: string;
  isNew?: boolean;
}

export interface Facility {
  id: string;
  icon: string;
  label: string;
}

export interface Shelter {
  id: string;
  name: string;
  type: 'school' | 'hall' | 'stadium' | 'temple' | 'community';
  address: string;
  district: string;
  state: string;
  distance: string;
  capacity: number;
  occupied: number;
  facilities: string[];
  lat: number;
  lng: number;
  phone: string;
}

export interface Contact {
  id: string;
  emoji: string;
  name: string;
  number: string;
  description: string;
  category: 'national' | 'state' | 'district' | 'specialized';
}

export interface GuideStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export type DisasterType = 'Flood' | 'Earthquake' | 'Fire' | 'Heatwave' | 'Cyclone' | 'Landslide';

export interface DisasterGuide {
  type: DisasterType;
  icon: string;
  dangerLevel: 'Extreme' | 'High' | 'Moderate';
  before: GuideStep[];
  during: GuideStep[];
  after: GuideStep[];
  dos: string[];
  donts: string[];
  checklist: string[];
}

export interface IncidentReport {
  type: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium';
  lat?: number;
  lng?: number;
  address?: string;
  peopleAffected?: number;
  name?: string;
  phone?: string;
  anonymous: boolean;
  photos?: File[];
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface FeatureCard {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProblemCard {
  icon: string;
  title: string;
  description: string;
}
