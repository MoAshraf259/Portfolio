process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
process.env.PORT = process.env.PORT ?? '0';
process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'file:./test.db';
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@example.com';
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'change-me';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret-change-me';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1h';
