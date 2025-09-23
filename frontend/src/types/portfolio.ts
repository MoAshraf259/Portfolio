export type Profile = {
  id: number;
  name: string;
  headline: string;
  email: string;
  phone?: string | null;
  location: string;
  summary: string;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
};

export type ExperienceHighlight = {
  id: number;
  description: string;
  sortOrder: number;
};

export type Experience = {
  id: number;
  role: string;
  company: string;
  location?: string | null;
  employmentType?: string | null;
  startDate: string;
  endDate?: string | null;
  sortOrder: number;
  highlights: ExperienceHighlight[];
};

export type Education = {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  details?: string | null;
  sortOrder: number;
};

export type ProjectTag = {
  id: number;
  label: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  impact?: string | null;
  type: 'DEVOPS' | 'EMBEDDED' | 'OTHER';
  githubUrl?: string | null;
  externalUrl?: string | null;
  sortOrder: number;
  tags: ProjectTag[];
};

export type Skill = {
  id: number;
  name: string;
  description?: string | null;
  level?: string | null;
};

export type SkillCategory = {
  id: number;
  name: string;
  sortOrder: number;
  skills: Skill[];
};

export type Certification = {
  id: number;
  name: string;
  issuer: string;
  issueDate?: string | null;
  credentialUrl?: string | null;
  sortOrder: number;
};

export type Course = {
  id: number;
  name: string;
  provider: string;
  link?: string | null;
  sortOrder: number;
};

export type PortfolioData = {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  courses: Course[];
};

export type ContactMessage = {
  id: number;
  fullName: string;
  email: string;
  subject?: string | null;
  message: string;
  createdAt: string;
};
