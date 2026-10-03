import type { LucideIcon } from 'lucide-react';

export interface ServiceMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  summary: string;
  description: string;
  accentColor: string;
  icon: LucideIcon;
  metrics: ServiceMetric[];
  capabilities: string[];
  graphicType: 'globe' | 'transport' | 'warehouse' | 'customs' | 'project';
  containerTheme?: 'dark' | 'white';
}

export type CraneState = 'idle' | 'lowering' | 'locking' | 'lifting' | 'hoisted';
