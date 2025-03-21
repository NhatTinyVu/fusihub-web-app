# fusihub-web-app
An over-engineered personal web app

# Inspired by
[Rust Web App Production Blueprint](https://github.com/rust10x/rust-web-app)

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
