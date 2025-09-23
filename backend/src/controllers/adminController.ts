import { z } from 'zod';
import { env } from '../config/env';
import { asyncHandler } from '../utils/asyncHandler';
import { createAuthToken } from '../utils/token';
import { getPortfolioData, listContactMessages, replacePortfolioData } from '../services/adminService';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = LoginSchema.parse(req.body);

  if (email !== env.ADMIN_EMAIL || password !== env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = createAuthToken(email);
  res.json({ token, expiresIn: env.JWT_EXPIRES_IN });
});

export const getPortfolioAdminHandler = asyncHandler(async (_req, res) => {
  const data = await getPortfolioData();
  res.json(data);
});

export const updatePortfolioAdminHandler = asyncHandler(async (req, res) => {
  const data = await replacePortfolioData(req.body);
  res.json(data);
});

export const listContactsAdminHandler = asyncHandler(async (_req, res) => {
  const contacts = await listContactMessages();
  res.json(contacts);
});

export const meHandler = asyncHandler(async (req, res) => {
  res.json({ email: req.user?.email ?? env.ADMIN_EMAIL });
});
