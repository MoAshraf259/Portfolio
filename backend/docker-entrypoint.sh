#!/bin/sh
set -e

echo "Waiting for database connection..."
until node -e 'const { PrismaClient } = require("@prisma/client"); const prisma = new PrismaClient(); prisma.$queryRaw`SELECT 1`.then(() => prisma.$disconnect()).catch(async (err) => { console.error(err.message || err); await prisma.$disconnect().catch(() => {}); process.exit(1); });'; do
  echo "Database not ready yet. Retrying in 2s..."
  sleep 2
done

echo "Database reachable. Applying migrations."
npx prisma migrate deploy

# Optionally seed when explicitly requested
if [ "${PRISMA_SEED_ON_START}" = "true" ]; then
  echo "Seeding database because PRISMA_SEED_ON_START=true"
  node dist/prisma/seed.js
fi

exec "$@"
