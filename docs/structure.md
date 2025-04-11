# .cargo

## config.toml
- Development environments for crates only
- Deployment is used by docker, kubernetes env instead


# crates

## services
- Web app services

### web-backend-server
- Rust web backend app
- Axum
- Can use library crates

## libs
- Libraries

### lib-web
- Crates for web app services

### lib-core
- Request context
- Event
- Model
+ Model manager
+ Store

### lib-auth

### lib-rpc-core
- Context
- RPC API

### lib-utils
- Env

# Monorepo with moon

## apps
- Frontend server

### nextjs-frontend
Nextjs frontend app
