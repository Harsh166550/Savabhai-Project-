export type ProjectCategory = 
  | 'All'
  | 'Architecture & Spatial'
  | 'Brand Identity'
  | 'UI/UX Design'
  | '3D & Interactive';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  location: string;
  duration: string;
  scope: string;
  role: string[];
  summary: string;
  challenge: string;
  designConcept: string;
  spacePlanning?: string;
  materials?: string;
  furniture?: string;
  lighting?: string;
  execution?: string;
  finalResult: string;
  featured: boolean;
  coverImage: string;
  gallery: {
    url: string;
    caption: string;
    layoutType?: 'full' | 'split' | 'grid';
  }[];
  accentTone?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack?: string[];
}

export interface ProcessStep {
  step: string;
  name: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}
