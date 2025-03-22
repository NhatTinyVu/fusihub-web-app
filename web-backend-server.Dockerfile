FROM lukemathwalker/cargo-chef:latest as chef
WORKDIR /app

FROM chef AS planner
COPY ./Cargo.toml ./Cargo.lock ./
COPY ./crates ./crates
RUN cargo chef prepare

FROM chef AS builder
COPY --from=planner /app/recipe.json .
RUN cargo chef cook --release
COPY . .
RUN cargo build -p web-backend-server --release
RUN mv ./target/release/web-backend-server ./web-backend-server

FROM debian:bookworm-slim AS runtime
COPY --from=builder /app/web-backend-server /usr/local/bin/
CMD ["/usr/local/bin/web-backend-server"]