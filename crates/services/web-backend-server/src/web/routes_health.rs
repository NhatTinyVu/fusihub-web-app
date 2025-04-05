use axum::{Router, routing::get};

async fn health_check() -> &'static str {
    "OK"
}

pub fn routes() -> Router {
    Router::new().route("/api/health", get(health_check))
}
