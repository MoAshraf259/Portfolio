# Portfolio Architecture (Static SPA)

## Overview
The `main` branch now ships a single React application powered entirely by static data. No backend services or databases are required; every section of the CV is sourced from typed objects in the frontend codebase. Deployment is as simple as uploading the compiled assets to GitHub Pages.

## Key Modules
```
frontend/
  src/
    content/
      portfolio-data.ts   // Typed dataset for profile, experience, projects, skills, etc.
    api/
      portfolio.ts        // Wraps the static data and exposes a contact mailto helper
    hooks/
      usePortfolio.ts     // React Query hook that resolves the static dataset
    components/           // Presentational components for each portfolio section
    pages/
      PortfolioPage.tsx   // Public landing page
      Admin*              // Legacy admin pages (kept for reference, hidden from nav)
    styles/               // Token-based design system and global styles
```

## Data Flow
1. `usePortfolio()` triggers a React Query request that simply resolves the exported data from `portfolio-data.ts`.
2. Components consume the cached result; no network calls are made.
3. The contact form validates input with Zod and opens a `mailto:` link so visitors can email Mohamed directly.

## State & Routing
- React Router handles client-side routing, though only the public portfolio route is surfaced in this static build.
- React Query remains in place for light caching and to keep the migration path back to an API straightforward.

## Styling System
- `styles/tokens.css` defines spacing, typography, and color tokens.
- `styles/globals.css` applies global resets, layout utilities, and component-level styles.

## Extensibility
- Update `portfolio-data.ts` to change portfolio content.
- If a backend is reinstated, replace the functions in `api/portfolio.ts` with real HTTP requests (the `fullstack-backup` branch retains the original Express/Prisma implementation).
