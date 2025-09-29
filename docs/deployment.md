# Deployment Guide (Docker on Your Server)

This walkthrough shows how to run the entire portfolio stack—frontend, backend API, and PostgreSQL—on a single machine using Docker Compose. You can start on your own laptop or home server and later move the exact same Compose setup to an AWS EC2 instance or any Docker-capable host.

## 1. Prerequisites
- Docker Engine 24+ and Docker Compose plugin (`docker compose` v2).
- Git (to clone/pull updates from this repository).
- A hostname or IP that your visitors can reach (public or within your network).

## 2. Prepare environment variables
1. Copy the sample file and edit it with strong secrets:
   ```bash
   cp .env.example .env
   ```
2. Update the following keys in `.env`:
   - `ADMIN_EMAIL` – the address allowed to log into the admin panel.
   - `ADMIN_PASSWORD` – strong password for admin login.
   - `JWT_SECRET` – at least 32 random characters (use `openssl rand -hex 32`).
   - `DATABASE_URL` – keep the default unless you already have a different Postgres instance.

> These values are read by Docker Compose and the backend container automatically.

## 3. Build application images
From the project root run:
```bash
docker compose build
```
This produces two images:
- `backend` – Node.js API with Prisma client baked in.
- `frontend` – Nginx serving the built React app and reverse proxying `/api/*` to the backend container.

## 4. Run the stack
Start everything in the background:
```bash
docker compose up -d
```
Compose launches three services:
- `postgres` on port `5432` (data persisted under `data/postgres/` on the host)
- `backend` on port `4000`
- `frontend` on port `3000` (public entry point)

The first start automatically runs database migrations. Visit `http://<your-host>:3000` to see the portfolio, and API endpoints are available under `http://<your-host>:3000/api/v1`.

## 5. Seed initial portfolio data (optional)
If you want the sample profile/projects that ship with the repo, run the seed script once:
```bash
docker compose run --rm backend node dist/prisma/seed.js
```
> **Warning:** The seed script wipes existing portfolio/contact data before inserting defaults. Only run it on a new database or when you intentionally want to reset content.

## 6. Day-to-day operations
- **Check logs**: `docker compose logs -f backend` (or `frontend`/`postgres`).
- **Update to latest code**: `git pull`, then `docker compose build --pull` and `docker compose up -d`.
- **Stop services**: `docker compose down`.
- **Back up database**: `docker compose exec postgres pg_dump -U portfolio_user portfolio > backup.sql` or archive the `data/postgres/` directory when the stack is stopped.

## 7. Exposing the site publicly
- Forward TCP ports `3000` (frontend) and optionally `4000` (direct API) from your router/firewall to the Docker host.
- For HTTPS, place a reverse proxy such as Caddy or Traefik in front of the Compose stack to terminate TLS and forward traffic to `frontend:80`.
- When you later move to an EC2 or other cloud VM, copy the repository, recreate the `.env`, and repeat the same `docker compose build` + `docker compose up -d` steps.

## 8. Optional GitHub automation
The repository still contains GitHub Actions workflows for building the frontend and publishing backend container images. They are useful if you want CI builds or to distribute the backend image via GHCR, but they are **not required** for the self-hosted Docker deployment described above.

Following these steps keeps every component under your control while preserving an easy migration path to cloud infrastructure later.
