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
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN npm prune --omit=dev
RUN chmod +x ./docker-entrypoint.sh
ENV PORT=4000
ENV DATABASE_URL=postgresql://postgres:postgres@postgres:5432/portfolio?schema=public
ENV ADMIN_EMAIL=mohamed.ashraf13998@gmail.com
ENV ADMIN_PASSWORD=Cross98@
ENV JWT_SECRET=60cbd0f9e9e45eb6cf106b03b01c8bbf83fdba104270b918b26a0950f9c3f7079ce461ec474fc5d6337e0104be60290b
ENV JWT_EXPIRES_IN=1h
EXPOSE 4000
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/src/server.js"]
