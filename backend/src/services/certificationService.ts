import { prisma } from '../db/client';

export const getCertifications = () =>
  prisma.certification.findMany({
    orderBy: { sortOrder: 'asc' },
  });
