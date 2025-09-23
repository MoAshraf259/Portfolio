ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
ARG VITE_API_BASE_URL=http://localhost:4000/api/v1
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY postcss.config.cjs ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
