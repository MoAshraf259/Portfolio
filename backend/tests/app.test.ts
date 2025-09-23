import fs from 'node:fs/promises';
import path from 'node:path';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { app } from '../src/app';
import { prisma as appPrisma } from '../src/db/client';
import { seed } from '../prisma/seed';

const TEST_DB_PATH = path.resolve(__dirname, '../test.db');
const prisma = new PrismaClient();

const adminCredentials = {
  email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  password: process.env.ADMIN_PASSWORD ?? 'change-me',
};

describe('Portfolio API', () => {
  beforeAll(async () => {
    await fs.rm(TEST_DB_PATH, { force: true });
    await seed(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await appPrisma.$disconnect();
    await fs.rm(TEST_DB_PATH, { force: true });
  });

  it('returns OK health status', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: 'ok' });
  });

  it('provides profile details', async () => {
    const response = await request(app).get('/api/v1/profile');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: expect.stringContaining('Mohamed'),
      headline: expect.stringContaining('Engineer'),
      email: 'mohamed.ashraf13998@gmail.com',
    });
  });

  it('lists experiences ordered by priority', async () => {
    const response = await request(app).get('/api/v1/experiences');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toMatchObject({
      role: 'DevOps Engineer',
      company: 'SEITech Solutions',
    });
    expect(response.body[0].highlights).toHaveLength(5);
  });

  it('accepts contact submissions and persists them', async () => {
    const payload = {
      fullName: 'Test User',
      email: 'test@example.com',
      subject: 'Interested in collaboration',
      message: 'Hello Mohamed, I would love to discuss a DevOps project with you.',
    };

    const response = await request(app).post('/api/v1/contact').send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      message: expect.stringContaining('Thank you'),
    });

    const stored = await appPrisma.contactMessage.findMany();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      fullName: payload.fullName,
      email: payload.email,
    });
  });

  it('authenticates admin and views contacts', async () => {
    const loginResponse = await request(app).post('/api/v1/admin/login').send(adminCredentials);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');

    const token = loginResponse.body.token as string;

    const contactsResponse = await request(app)
      .get('/api/v1/admin/contacts')
      .set('Authorization', `Bearer ${token}`);

    expect(contactsResponse.status).toBe(200);
    expect(Array.isArray(contactsResponse.body)).toBe(true);
    expect(contactsResponse.body.length).toBeGreaterThanOrEqual(1);
  });

  it('allows admin to update portfolio content', async () => {
    const loginResponse = await request(app).post('/api/v1/admin/login').send(adminCredentials);
    const token = loginResponse.body.token as string;

    const portfolioResponse = await request(app)
      .get('/api/v1/admin/portfolio')
      .set('Authorization', `Bearer ${token}`);

    expect(portfolioResponse.status).toBe(200);
    const portfolio = portfolioResponse.body;
    const updatedSummary = 'Updated summary for automated test';
    portfolio.profile.summary = updatedSummary;

    const updateResponse = await request(app)
      .put('/api/v1/admin/portfolio')
      .set('Authorization', `Bearer ${token}`)
      .send(portfolio);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.profile.summary).toBe(updatedSummary);
  });
});
