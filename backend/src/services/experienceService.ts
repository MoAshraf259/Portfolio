import { prisma } from '../db/client';

export const getExperiences = () =>
  prisma.experience.findMany({
    orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    include: {
      highlights: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });
