export interface SiteSettings {
  brand_name: string;
  color_primary: string;
  color_primary_2: string;
  color_deep: string;
  color_gold: string;
  color_paper: string;
  color_ink: string;
  font_family: string;
  base_font_size: number;
  radius: number;
  dark_mode: boolean;
  hero_title: string;
  hero_highlight: string;
  hero_title_end: string;
  hero_subtitle: string;
  about_text: string;
  whatsapp: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  x_url: string;
  instagram: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
  is_active: boolean;
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  tags: string;
  tag_list: string[];
  link: string;
  order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initial: string;
  order: number;
  is_active: boolean;
}

export interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
  order: number;
}

export interface Bootstrap {
  settings: SiteSettings;
  services: Service[];
  process: ProcessStep[];
  projects: Project[];
  testimonials: Testimonial[];
  stats: Stat[];
}

export interface MetricSnapshot {
  id: number;
  visitors: number;
  sessions: number;
  new_users: number;
  orders: number;
  revenue: string;
  status: "up" | "down" | "degraded";
  response_ms: number;
  recorded_at: string;
}

export interface ExternalSite {
  id: number;
  name: string;
  url: string;
  site_type: string;
  color: string;
  api_key: string;
  is_active: boolean;
  created_at: string;
  latest: MetricSnapshot | null;
}

export interface Overview {
  totals: {
    visitors: number;
    orders: number;
    new_users: number;
    revenue: number;
    sites_total: number;
    sites_up: number;
  };
  sites: ExternalSite[];
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
