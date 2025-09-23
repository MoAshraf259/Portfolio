# Portfolio Platform Architecture

## Overview
A full-stack portfolio platform tailored to Mohamed Ashraf Shaaban Aata. The backend exposes structured resume data, powers a lightweight admin CMS, and accepts contact submissions, while the frontend renders a polished single-page experience with muted, accessible colors. Docker Compose orchestrates both services for local development and deployment.

## Technology Choices
- **Backend:** Node.js 20, Express 5, Prisma ORM, SQLite (swap-ready for PostgreSQL), Zod for validation, Winston logging, JWT auth.
- **Frontend:** React 18 with TypeScript, Vite, React Router 7, React Query 5 for data fetching/state, CSS variables for theming.
- **Testing:** Jest + Supertest suite for the backend; frontend relies on Vite build for now (extendable to Vitest/RTL).
- **Tooling:** ESLint + Prettier, TypeScript strict mode, dotenv-managed configuration.
- **Containerization:** Multi-stage Dockerfiles per service plus a root `docker-compose.yml` for orchestration.

## Backend Modules
```
backend/
  src/
    app.ts                 // Express app wiring middleware and routes
    server.ts              // HTTP bootstrapper with graceful shutdown
    config/env.ts          // Environment schema + typed export
    config/logger.ts       // Winston logger setup
    db/client.ts           // Prisma client wrapper & shutdown hooks
    routes/                // Router aggregation (public + admin)
    controllers/           // Request handlers
    services/              // Business logic, Prisma interactions
    middleware/            // Error handling, auth, request logging
    types/                 // Shared Zod schemas / Express augments
  prisma/
    schema.prisma
    seed.ts                // Seeds CV content
```

### REST Endpoints
- `GET /api/v1/health` – service health.
- `GET /api/v1/profile` – personal info & summary.
- `GET /api/v1/experiences`
- `GET /api/v1/education`
- `GET /api/v1/projects`
- `GET /api/v1/skills`
- `GET /api/v1/certifications`
- `GET /api/v1/courses`
- `POST /api/v1/contact` – persists contact messages.
- `POST /api/v1/admin/login` – JWT auth for admin console (env-backed credentials).
- `GET /api/v1/admin/portfolio` – returns editable portfolio dataset.
- `PUT /api/v1/admin/portfolio` – replaces CV content (transactional upsert).
- `GET /api/v1/admin/contacts` – latest contact submissions for review.

### Data Model (Prisma)
- `Profile`
- `Experience`
- `ExperienceHighlight`
- `Education`
- `Project`
- `ProjectTag`
- `SkillCategory`
- `Skill`
- `Certification`
- `Course`
- `ContactMessage`

The seed script hydrates all tables with Mohamed's CV. Contact submissions accumulate at runtime; admin updates replace portfolio tables atomically while preserving contact history.

## Frontend Structure
```
frontend/
  src/
    main.tsx                 // React bootstrap + QueryClient provider
    App.tsx                  // Router + providers
    pages/
      PortfolioPage.tsx
      AdminLoginPage.tsx
      AdminDashboardPage.tsx
    components/
      Hero.tsx
      Section.tsx
      ExperienceTimeline.tsx
      ProjectGrid.tsx
      SkillGroups.tsx
      EducationList.tsx
      ContactForm.tsx
      ProtectedRoute.tsx
    api/
      client.ts              // Fetch helper
      portfolio.ts
      admin.ts
    contexts/
      AuthContext.tsx        // JWT token persistence
    hooks/
      usePortfolio.ts
    styles/
      tokens.css             // design tokens (spacing, colors, typography)
      globals.css            // base + admin styling
```  

- Root route renders the portfolio SPA; `/admin/login` and `/admin/dashboard` power the CMS.
- React Query caches public and admin data; mutations push updates to the API.
- Admin dashboard provides JSON editing of portfolio data and a live contact inbox.

## Docker & Deployment
- `backend/Dockerfile` – multi-stage build (dependencies ? TypeScript build ? runtime) with Prisma seed on container start.
- `frontend/Dockerfile` – Vite production build with API base injected at build time, served via Nginx.
- Root `docker-compose.yml` – builds both services, provisions a named volume for SQLite, exposes ports `4000` (API) and `3000` (frontend), and injects admin credentials/JWT secret.
- `.env.example` files document runtime configuration for manual runs or CI/CD pipelines.

## Future Enhancements
- Email/webhook notifications when new contact messages arrive.
- Auth refresh/rotation and support for multiple admin users stored in the database.
- Granular edit UI (form-based editors per section) instead of JSON-level edits.
- Optional Postgres deployment profile and automated migrations.
