process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
process.env.PORT = process.env.PORT ?? '0';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://portfolio_user:portfolio_pass@localhost:5432/portfolio_test?schema=public';
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'mohamed.ashraf13998@gmail.com';
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Cross98@';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? '60cbd0f9e9e45eb6cf106b03b01c8bbf83fdba104270b918b26a0950f9c3f7079ce461ec474fc5d6337e0104be60290b';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1h';
