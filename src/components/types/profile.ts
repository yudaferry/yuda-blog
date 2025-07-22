export interface ContactInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  telegram: string;
  instagram: string;
  x: string;
  experienceYears: string;
  specialization: string;
}

export interface Skill {
  name: string;
  years?: string;
  progress?: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
  type: 'progress' | 'grid';
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface Project {
  title: string;
  meta: string;
  description: string;
  technologies: string[];
}

export interface ProfileData {
  contact: ContactInfo;
  skillCategories: SkillCategory[];
  education: Education;
  professionalSummary: string;
  timeline: TimelineItem[];
  projects: Project[];
}