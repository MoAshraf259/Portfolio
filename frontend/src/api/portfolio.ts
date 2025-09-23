import { z } from 'zod';
import { apiClient } from './client';
import type {
  PortfolioData,
  Profile,
  Experience,
  Education,
  Project,
  SkillCategory,
  Certification,
  Course,
} from '../types/portfolio';

const endpoints = {
  profile: '/profile',
  experiences: '/experiences',
  education: '/education',
  projects: '/projects',
  skills: '/skills',
  certifications: '/certifications',
  courses: '/courses',
  contact: '/contact',
} as const;

export const contactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please provide a valid email'),
  subject: z
    .string()
    .max(120, 'Subject must be under 120 characters')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  message: z.string().min(10, 'Message should be at least 10 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export async function fetchPortfolio(): Promise<PortfolioData> {
  const [profile, experiences, education, projects, skills, certifications, courses] = await Promise.all([
    apiClient.get<Profile>(endpoints.profile),
    apiClient.get<Experience[]>(endpoints.experiences),
    apiClient.get<Education[]>(endpoints.education),
    apiClient.get<Project[]>(endpoints.projects),
    apiClient.get<SkillCategory[]>(endpoints.skills),
    apiClient.get<Certification[]>(endpoints.certifications),
    apiClient.get<Course[]>(endpoints.courses),
  ]);

  return { profile, experiences, education, projects, skills, certifications, courses };
}

export async function submitContact(values: ContactFormValues) {
  const payload = contactSchema.parse(values);
  return apiClient.post<{ message: string }>(endpoints.contact, payload);
}
