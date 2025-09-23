import { z } from 'zod';

export const ExperienceHighlightInputSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1),
  sortOrder: z.number().int().nonnegative().optional(),
});

export const ExperienceInputSchema = z.object({
  id: z.number().optional(),
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().nullable().optional(),
  employmentType: z.string().nullable().optional(),
  startDate: z.string().min(1),
  endDate: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  highlights: z.array(ExperienceHighlightInputSchema).default([]),
});

export const EducationInputSchema = z.object({
  id: z.number().optional(),
  institution: z.string().min(1),
  degree: z.string().min(1),
  fieldOfStudy: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  details: z.string().nullable().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
});

export const ProjectInputSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  impact: z.string().nullable().optional(),
  type: z.enum(['DEVOPS', 'EMBEDDED', 'OTHER']).default('OTHER'),
  githubUrl: z.string().url().nullable().optional(),
  externalUrl: z.string().url().nullable().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  tags: z.array(
    z.object({
      id: z.number().optional(),
      label: z.string().min(1),
    }),
  ).default([]),
});

export const SkillInputSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  level: z.string().nullable().optional(),
});

export const SkillCategoryInputSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  sortOrder: z.number().int().nonnegative().optional(),
  skills: z.array(SkillInputSchema).default([]),
});

export const CertificationInputSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string().nullable().optional(),
  credentialUrl: z.string().url().nullable().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
});

export const CourseInputSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  provider: z.string().min(1),
  link: z.string().url().nullable().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
});

export const ProfileInputSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  headline: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  location: z.string().min(1),
  summary: z.string().min(1),
  linkedin: z.string().url().nullable().optional(),
  github: z.string().url().nullable().optional(),
  website: z.string().url().nullable().optional(),
});

export const PortfolioInputSchema = z.object({
  profile: ProfileInputSchema,
  experiences: z.array(ExperienceInputSchema).default([]),
  education: z.array(EducationInputSchema).default([]),
  projects: z.array(ProjectInputSchema).default([]),
  skills: z.array(SkillCategoryInputSchema).default([]),
  certifications: z.array(CertificationInputSchema).default([]),
  courses: z.array(CourseInputSchema).default([]),
});

export type PortfolioInput = z.infer<typeof PortfolioInputSchema>;
export type ExperienceInput = z.infer<typeof ExperienceInputSchema>;
export type EducationInput = z.infer<typeof EducationInputSchema>;
export type ProjectInput = z.infer<typeof ProjectInputSchema>;
export type SkillCategoryInput = z.infer<typeof SkillCategoryInputSchema>;
export type SkillInput = z.infer<typeof SkillInputSchema>;
export type CertificationInput = z.infer<typeof CertificationInputSchema>;
export type CourseInput = z.infer<typeof CourseInputSchema>;
export type ProfileInput = z.infer<typeof ProfileInputSchema>;
