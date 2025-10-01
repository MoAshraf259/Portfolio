import { z } from 'zod';
import { portfolioData } from '../content/portfolio-data';
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

const CONTACT_EMAIL = portfolioData.profile.email;

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

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export async function fetchPortfolio(): Promise<PortfolioData> {
  return Promise.resolve({
    profile: clone<Profile>(portfolioData.profile),
    experiences: clone<Experience[]>(portfolioData.experiences),
    education: clone<Education[]>(portfolioData.education),
    projects: clone<Project[]>(portfolioData.projects),
    skills: clone<SkillCategory[]>(portfolioData.skills),
    certifications: clone<Certification[]>(portfolioData.certifications),
    courses: clone<Course[]>(portfolioData.courses),
  });
}

export async function submitContact(values: ContactFormValues) {
  const payload = contactSchema.parse(values);

  if (typeof window !== 'undefined') {
    const subject = encodeURIComponent(payload.subject ?? 'Portfolio Contact');
    const body = encodeURIComponent(
      [`Name: ${payload.fullName}`, `Email: ${payload.email}`, '', payload.message].join('\n')
    );
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }

  return Promise.resolve({ message: 'Email client opened' });
}
