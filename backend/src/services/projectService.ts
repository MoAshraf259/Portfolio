import { prisma } from '../db/client';

export const getProjects = () =>
  prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      tags: {
        orderBy: { label: 'asc' },
      },
    },
  });
