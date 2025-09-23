FROM node:20-slim AS base
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production

FROM base AS deps
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npm install --include=dev
RUN npm run prisma:generate

FROM deps AS build
COPY src ./src
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY prisma ./prisma
RUN npm prune --omit=dev
RUN mkdir -p /app/data
ENV DATABASE_URL=file:/app/data/dev.db
ENV PORT=4000
ENV ADMIN_EMAIL=admin@example.com
ENV ADMIN_PASSWORD=change-me
ENV JWT_SECRET=super-secret-jwt-key-change
ENV JWT_EXPIRES_IN=1h
EXPOSE 4000
CMD ["sh", "-c", "mkdir -p /app/data && node dist/prisma/seed.js && node dist/src/server.js"]
