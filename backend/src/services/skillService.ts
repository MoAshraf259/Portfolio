import { prisma } from '../db/client';

export const getSkillCategories = () =>
  prisma.skillCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      skills: {
        orderBy: { name: 'asc' },
      },
    },
  });
