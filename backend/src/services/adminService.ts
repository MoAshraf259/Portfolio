import { Prisma } from '@prisma/client';
import { prisma } from '../db/client';
import {
  PortfolioInput,
  PortfolioInputSchema,
} from '../types/portfolio';

const parseDate = (value?: string | null) => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value received: ${value}`);
  }
  return date;
};

export const getPortfolioData = async (): Promise<PortfolioInput> => {
  const profileRecord = await prisma.profile.findUnique({ where: { id: 1 } });
  if (!profileRecord) {
    throw new Error('Profile not found');
  }

  const experiencesRecords = await prisma.experience.findMany({
    orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    include: {
      highlights: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });
  const educationRecords = await prisma.education.findMany({ orderBy: { sortOrder: 'asc' } });
  const projectRecords = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      tags: {
        orderBy: { label: 'asc' },
      },
    },
  });
  const skillCategoryRecords = await prisma.skillCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      skills: {
        orderBy: { name: 'asc' },
      },
    },
  });
  const certificationRecords = await prisma.certification.findMany({ orderBy: { sortOrder: 'asc' } });
  const courseRecords = await prisma.course.findMany({ orderBy: { sortOrder: 'asc' } });

  return {
    profile: {
      id: profileRecord.id,
      name: profileRecord.name,
      headline: profileRecord.headline,
      email: profileRecord.email,
      phone: profileRecord.phone ?? undefined,
      location: profileRecord.location,
      summary: profileRecord.summary,
      linkedin: profileRecord.linkedin ?? undefined,
      github: profileRecord.github ?? undefined,
      website: profileRecord.website ?? undefined,
    },
    experiences: experiencesRecords.map((experience) => ({
      id: experience.id,
      role: experience.role,
      company: experience.company,
      location: experience.location ?? undefined,
      employmentType: experience.employmentType ?? undefined,
      startDate: experience.startDate.toISOString(),
      endDate: experience.endDate?.toISOString() ?? undefined,
      summary: experience.summary ?? undefined,
      sortOrder: experience.sortOrder,
      highlights: experience.highlights.map((highlight) => ({
        id: highlight.id,
        description: highlight.description,
        sortOrder: highlight.sortOrder,
      })),
    })),
    education: educationRecords.map((entry) => ({
      id: entry.id,
      institution: entry.institution,
      degree: entry.degree,
      fieldOfStudy: entry.fieldOfStudy ?? undefined,
      location: entry.location ?? undefined,
      startDate: entry.startDate?.toISOString() ?? undefined,
      endDate: entry.endDate?.toISOString() ?? undefined,
      details: entry.details ?? undefined,
      sortOrder: entry.sortOrder,
    })),
    projects: projectRecords.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      impact: project.impact ?? undefined,
      type: project.type,
      githubUrl: project.githubUrl ?? undefined,
      externalUrl: project.externalUrl ?? undefined,
      sortOrder: project.sortOrder,
      tags: project.tags.map((tag) => ({ id: tag.id, label: tag.label })),
    })),
    skills: skillCategoryRecords.map((category) => ({
      id: category.id,
      name: category.name,
      sortOrder: category.sortOrder,
      skills: category.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        description: skill.description ?? undefined,
        level: skill.level ?? undefined,
      })),
    })),
    certifications: certificationRecords.map((certification) => ({
      id: certification.id,
      name: certification.name,
      issuer: certification.issuer,
      issueDate: certification.issueDate?.toISOString() ?? undefined,
      credentialUrl: certification.credentialUrl ?? undefined,
      sortOrder: certification.sortOrder,
    })),
    courses: courseRecords.map((course) => ({
      id: course.id,
      name: course.name,
      provider: course.provider,
      link: course.link ?? undefined,
      sortOrder: course.sortOrder,
    })),
  } satisfies PortfolioInput;
};

async function replacePortfolio(transaction: Prisma.TransactionClient, data: PortfolioInput) {
  const { profile, experiences, education, projects, skills, certifications, courses } = data;

  await transaction.projectTag.deleteMany();
  await transaction.project.deleteMany();
  await transaction.experienceHighlight.deleteMany();
  await transaction.experience.deleteMany();
  await transaction.education.deleteMany();
  await transaction.skill.deleteMany();
  await transaction.skillCategory.deleteMany();
  await transaction.certification.deleteMany();
  await transaction.course.deleteMany();

  await transaction.profile.upsert({
    where: { id: 1 },
    update: {
      name: profile.name,
      headline: profile.headline,
      email: profile.email,
      phone: profile.phone ?? null,
      location: profile.location,
      summary: profile.summary,
      linkedin: profile.linkedin ?? null,
      github: profile.github ?? null,
      website: profile.website ?? null,
    },
    create: {
      id: 1,
      name: profile.name,
      headline: profile.headline,
      email: profile.email,
      phone: profile.phone ?? null,
      location: profile.location,
      summary: profile.summary,
      linkedin: profile.linkedin ?? null,
      github: profile.github ?? null,
      website: profile.website ?? null,
    },
  });

  for (const [index, experience] of experiences.entries()) {
    await transaction.experience.create({
      data: {
        role: experience.role,
        company: experience.company,
        location: experience.location ?? null,
        employmentType: experience.employmentType ?? null,
        startDate: parseDate(experience.startDate)!,
        endDate: parseDate(experience.endDate) ?? undefined,
        summary: experience.summary ?? null,
        sortOrder: experience.sortOrder ?? index + 1,
        highlights: {
          create: (experience.highlights ?? []).map((highlight, highlightIndex) => ({
            description: highlight.description,
            sortOrder: highlight.sortOrder ?? highlightIndex + 1,
          })),
        },
      },
    });
  }

  for (const [index, entry] of education.entries()) {
    await transaction.education.create({
      data: {
        institution: entry.institution,
        degree: entry.degree,
        fieldOfStudy: entry.fieldOfStudy ?? null,
        location: entry.location ?? null,
        startDate: parseDate(entry.startDate),
        endDate: parseDate(entry.endDate),
        details: entry.details ?? null,
        sortOrder: entry.sortOrder ?? index + 1,
      },
    });
  }

  for (const [index, project] of projects.entries()) {
    await transaction.project.create({
      data: {
        name: project.name,
        description: project.description,
        impact: project.impact ?? null,
        type: project.type,
        githubUrl: project.githubUrl ?? null,
        externalUrl: project.externalUrl ?? null,
        sortOrder: project.sortOrder ?? index + 1,
        tags: {
          create: (project.tags ?? []).map((tag) => ({ label: tag.label })),
        },
      },
    });
  }

  for (const [index, category] of skills.entries()) {
    await transaction.skillCategory.create({
      data: {
        name: category.name,
        sortOrder: category.sortOrder ?? index + 1,
        skills: {
          create: (category.skills ?? []).map((skill) => ({
            name: skill.name,
            description: skill.description ?? null,
            level: skill.level ?? null,
          })),
        },
      },
    });
  }

  for (const [index, certification] of certifications.entries()) {
    await transaction.certification.create({
      data: {
        name: certification.name,
        issuer: certification.issuer,
        issueDate: parseDate(certification.issueDate),
        credentialUrl: certification.credentialUrl ?? null,
        sortOrder: certification.sortOrder ?? index + 1,
      },
    });
  }

  for (const [index, course] of courses.entries()) {
    await transaction.course.create({
      data: {
        name: course.name,
        provider: course.provider,
        link: course.link ?? null,
        sortOrder: course.sortOrder ?? index + 1,
      },
    });
  }
}

export const replacePortfolioData = async (payload: unknown) => {
  const parsed = PortfolioInputSchema.parse(payload);

  await prisma.$transaction((tx) => replacePortfolio(tx, parsed));

  return getPortfolioData();
};

export const listContactMessages = async () =>
  prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
