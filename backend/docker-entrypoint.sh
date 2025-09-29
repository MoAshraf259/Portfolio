#!/bin/sh
set -e

# Ensure the database schema is up to date
npx prisma migrate deploy

# Optionally seed when explicitly requested
if [ "${PRISMA_SEED_ON_START}" = "true" ]; then
  echo "Seeding database because PRISMA_SEED_ON_START=true"
  node dist/prisma/seed.js
fi

exec "$@"
