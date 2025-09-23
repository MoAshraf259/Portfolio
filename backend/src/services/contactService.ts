import { z } from 'zod';
import { prisma } from '../db/client';

export const contactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().max(120, 'Subject must be shorter than 120 characters').optional(),
  message: z.string().min(10, 'Message should be at least 10 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const createContactMessage = (data: ContactInput) =>
  prisma.contactMessage.create({
    data,
  });
