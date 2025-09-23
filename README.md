# Mohamed Ashraf Shaaban Portfolio Platform

A full-stack portfolio application for Mohamed Ashraf Shaaban Aata. The backend delivers a structured resume API, admin CMS, and contact inbox, while the frontend renders a polished React experience with muted blues/greys tailored for DevOps and embedded engineering work.

## Stack
- **Backend:** Node.js 20, Express 5, Prisma (SQLite by default), Zod, Winston, JWT auth
- **Frontend:** React 18, Vite, TypeScript, React Router 7, React Query 5, custom CSS token system
- **Testing:** Jest + Supertest (backend)
- **Containerization:** Multi-stage Dockerfiles per service, orchestrated via Docker Compose

## Environment Variables
Backend `.env` (sample values provided in `.env.example`):
- `DATABASE_URL` – SQLite/DB connection string
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` – credentials for the admin console
- `JWT_SECRET`, `JWT_EXPIRES_IN` – signing secret and token lifetime
- `PORT`, `NODE_ENV`

Frontend `.env`:
- `VITE_API_BASE_URL` – API root the SPA should call (defaults to `http://localhost:4000/api/v1`)

## Local Development
### Backend API
```bash
cd backend
npm install
cp .env.example .env   # or Copy-Item on Windows
npm run prisma:seed
npm run dev
```
The API listens on <http://localhost:4000> with all routes under `/api/v1`.

Run backend tests:
```bash
npm test
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # ensure VITE_API_BASE_URL points to your API
npm run dev
```
The Vite dev server runs on <http://localhost:5173>.

### Admin Console
1. Start both backend and frontend as above.
2. Visit <http://localhost:5173/admin/login> (or `/admin/login` on the dockerised site).
3. Sign in with the credentials from `backend/.env` (defaults: `admin@example.com` / `change-me`).
4. Use the Content tab to edit the JSON representation of the CV; save pushes changes through the `PUT /api/v1/admin/portfolio` endpoint.
5. Use the Contacts tab to review inbound contact messages.

### Production Builds
```bash
cd backend && npm run build
cd ../frontend && npm run build
```
Artifacts land in `backend/dist` and `frontend/dist` respectively.

## Docker Workflow
From the project root:
```bash
docker compose build
docker compose up
```
- Backend (Express): <http://localhost:4000>
- Frontend (Nginx-served SPA): <http://localhost:3000>

The compose file injects admin credentials/JWT secret and mounts a named `backend_data` volume for the SQLite database. The backend container seeds data automatically on startup. Adjust `docker-compose.yml` build args if you need the frontend to target a different API host.

## Project Structure
```
backend/
  src/...
  prisma/
frontend/
  src/
    pages/ (portfolio + admin views)
    components/
    api/
    contexts/
    styles/
docs/
  architecture.md
```

## Deploy Notes
- Swap SQLite for Postgres by updating `prisma/schema.prisma`, adjusting `DATABASE_URL`, and re-running migrations.
- The frontend Dockerfile consumes `VITE_API_BASE_URL` at build time—set it to a public API URL for production images.
- Recommended CI steps: `npm ci && npm run test` in `backend`, then `npm run build`; `npm ci && npm run build` in `frontend` before building/pushing Docker images.
- Consider wiring an email/webhook service to the contact endpoint for immediate notifications.
