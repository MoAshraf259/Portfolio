import { prisma } from '../db/client';

export const getCourses = () =>
  prisma.course.findMany({
    orderBy: { sortOrder: 'asc' },
  });
