FROM node:22.14 AS base
WORKDIR /app
RUN npm install -g @moonrepo/cli

FROM base AS skeleton
COPY . .
RUN moon docker scaffold nextjs-frontend

FROM base AS builder
COPY --from=skeleton /app/.moon/docker/workspace .
RUN moon docker setup
COPY --from=skeleton /app/.moon/docker/sources .
RUN moon run nextjs-frontend:build
RUN moon docker prune

FROM gcr.io/distroless/nodejs22-debian12 AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/nextjs-frontend/.next/standalone/ ./
COPY --from=builder /app/apps/nextjs-frontend/public/ ./apps/nextjs-frontend/public/
COPY --from=builder /app/apps/nextjs-frontend/.next/static/ ./apps/nextjs-frontend/.next/static/
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["apps/nextjs-frontend/server.js"]