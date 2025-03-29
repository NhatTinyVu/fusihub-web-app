# /.cargo

## /.cargo/config.toml
- Development environments for crates only
- Deployment is used by docker, kubernetes env instead


# /crates

## /crates/services
- Web app services

### /crates/services/web-backend-server
- Rust web backend app
- Axum
- Can use library crates

## /crates/libs
- Libraries

### /crates/libs/lib-web
- Crates for web app services

### /crates/libs/lib-core
- Request context
- Event
- Model
+ Model manager
+ Store

### /crates/libs/lib-auth

### /crates/libs/lib-rpc-core
- Context
- RPC API

### /crates/libs/lib-utils
- Env

# Monorepo with moon

## /apps/
- Frontend server

### /apps/nextjs-frontend-server
Nextjs frontend app
