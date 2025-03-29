use axum::{Router, routing::get};
use lib_core::model::ModelManager;
use lib_web::handlers::handlers_hello;

pub fn routes(mm: ModelManager) -> Router {
    Router::new()
        .route(
            "/api/hello",
            get(handlers_hello::handle_get_hello).post(handlers_hello::handle_post_hello),
        )
        .with_state(mm)
}
