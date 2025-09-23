import { prisma } from '../db/client';

export const getEducation = () =>
  prisma.education.findMany({
    orderBy: { sortOrder: 'asc' },
  });
