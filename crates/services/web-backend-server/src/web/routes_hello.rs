use axum::{Router, routing::post};
use lib_core::model::ModelManager;
use lib_web::handlers::handlers_hello;

pub fn routes(mm: ModelManager) -> Router {
    Router::new()
        .route("/api/hello", post(handlers_hello::handle_hello_api))
        .with_state(mm)
}
