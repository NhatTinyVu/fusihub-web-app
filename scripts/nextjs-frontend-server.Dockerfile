FROM node:22.14 AS base
WORKDIR /app
RUN npm install -g @moonrepo/cli

FROM base AS builder
COPY . .
WORKDIR /app
RUN moon run nextjs-frontend-server:build 

FROM gcr.io/distroless/nodejs22-debian12 AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/nextjs-frontend-server/.next/standalone/ ./
COPY --from=builder /app/apps/nextjs-frontend-server/public/ ./apps/nextjs-frontend-server/public/
COPY --from=builder /app/apps/nextjs-frontend-server/.next/static/ ./apps/nextjs-frontend-server/.next/static/
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["apps/nextjs-frontend-server/server.js"]