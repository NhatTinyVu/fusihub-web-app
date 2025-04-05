use axum::{Router, routing::post};
use lib_core::model::ModelManager;
use lib_web::handlers::handlers_login;

pub fn routes(mm: ModelManager) -> Router {
    Router::new()
        .route("/api/login", post(handlers_login::handle_login))
        .route("/api/logout", post(handlers_login::handle_logoff))
        .with_state(mm)
}
