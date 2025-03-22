# fusihub-web-app
An over-engineered personal web app

# Inspired by
[Rust Web App Production Blueprint](https://github.com/rust10x/rust-web-app)
[Frontend monorepo with moon](https://github.com/moonrepo/examples/tree/master)

# Dev

## Watch frontend

```sh
# Terminal 1 - To run the frontend server.
moon run nextjs-frontend-app:dev
```

## Watch backend

> NOTE: Install cargo watch with `cargo install cargo-watch`.

```sh
# Terminal 1 - To run the server.
cargo watch -q -c -w crates/services/web-backend-server/src/ -w crates/libs/ -w .cargo/ -x "run -p web-backend-server"

# Terminal 2 - To run the quick_dev.
cargo watch -q -c -w crates/services/web-backend-server/examples/ -x "run -p web-backend-server --example quick_dev"
```

## Release

### Rust backend server
```sh
cargo build -p web-backend-server --release
```

### Docker 

#### Build
```sh
docker build -t web-backend-server . -f web-backend-server.Dockerfile
```

#### Run
```sh
docker run -d \
  -it --rm \
  -v ./static:/usr/local/bin/static:Z \
  --env STATIC_FILES_PATH=/usr/local/bin/static \
  -p 80:8080 \
  web-backend-server-prod:latest
```