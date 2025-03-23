FROM node:22.14-bookworm-slim AS base
WORKDIR /app
RUN npm install -g @moonrepo/cli

FROM base AS builder
WORKDIR /app
COPY . .
RUN moon run nextjs-frontend-app:build 

FROM gcr.io/distroless/nodejs22-debian12 AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/nextjs-frontend-app/.next/standalone/ ./
COPY --from=builder /app/apps/nextjs-frontend-app/public/ ./apps/nextjs-frontend-app/public/
COPY --from=builder /app/apps/nextjs-frontend-app/.next/static/ ./apps/nextjs-frontend-app/.next/static/
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["apps/nextjs-frontend-app/server.js"]