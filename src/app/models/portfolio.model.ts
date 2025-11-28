export interface Skill {
  id: string;
  name: string;
  level: number; // 1-10
  category: 'frontend' | 'language' | 'tool';
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  yearsExperience: number;
  projectsCompleted: number;
  profileImage?: string;
}

export interface PortfolioState {
  personalInfo: PersonalInfo | null;
  skills: Skill[];
  projects: Project[];
  loading: boolean;
  error: string | null;
}