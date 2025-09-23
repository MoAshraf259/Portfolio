import 'dotenv/config';
import { z } from 'zod';

type NodeEnv = 'development' | 'test' | 'production';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL must be a valid email address'),
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD must be at least 8 characters'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration', parsed.error.format());
  process.exit(1);
}

export const env: {
  NODE_ENV: NodeEnv;
  PORT: number;
  DATABASE_URL: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
} = parsed.data;
