# fusihub-web-app
An over-engineered personal web app
- Docker microservices
- Multiple frontend server with nextjs/astro
- API with Rust, Axum
- Database with postgres

# Inspired by
[Rust Web App Production Blueprint](https://github.com/rust10x/rust-web-app)

[Frontend monorepo with moon](https://github.com/moonrepo/examples/tree/master)

# Dev

## Init env
```sh
cp .env.example .env
```

## Watch frontend

```sh
# Terminal 1 - To run the frontend server.
moon run nextjs-frontend-server:dev
```

## Watch backend

> NOTE: Install cargo watch with `cargo install cargo-watch`.

```sh
# Terminal 1 - To run the server.
cargo watch -q -c -w crates/services/web-backend-server/src/ -w crates/libs/ -w .cargo/ -x "run -p web-backend-server"

# Terminal 2 - To run the quick_dev.
cargo watch -q -c -w crates/services/web-backend-server/examples/ -x "run -p web-backend-server --example quick_dev"
```

# Release

## Nextjs frontend server
```sh
moon run nextjs-frontend-server:build

moon run nextjs-frontend-server:start
```

## Rust backend server
```sh
cargo build -p web-backend-server --release
```

## Docker

### Build

#### Nextjs frontend server

```sh
docker build -t nextjs-frontend-server . -f ./docker/nextjs-frontend-server.Dockerfile
```
#### Rust backend server

```sh
docker build -t web-backend-server . -f ./docker/web-backend-server.Dockerfile
```

#### Docker compose
- Place CLOUDFLARE_TUNNEL_TOKEN into .env before run docker-compose

```sh
docker-compose up -d --rm

./target/release/web-backend-server
```

### Run

#### Nextjs frontend server

```sh

docker run -d \
  -it --rm \
  -p 127.0.0.1:3000:3000 \
  nextjs-frontend-server:latest
```
#### Rust backend server

```sh
docker run -d \
  -it --rm \
  -p 127.0.0.1:8080:8080 \
  web-backend-server:latest
```


# Add new lib & service
```sh
 cargo new crates/libs/lib-core --lib
 cargo new crates/services/web-backend-server --bin
 ```