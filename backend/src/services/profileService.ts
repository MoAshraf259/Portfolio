import { prisma } from '../db/client';

export const getProfile = async () => {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  return profile;
};
