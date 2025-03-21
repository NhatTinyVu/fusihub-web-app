use axum::handler::HandlerWithoutStateExt;
use axum::http::StatusCode;
use axum::routing::{MethodRouter, any_service};
use tower_http::services::ServeDir;

// Note: Here we can just return a MethodRouter rather than a full Router
//       since ServeDir is a service.
pub fn serve_dir(static_files_path: &'static String) -> MethodRouter {
    async fn handle_404() -> (StatusCode, &'static str) {
        (StatusCode::NOT_FOUND, "Resource not found.")
    }

    any_service(ServeDir::new(static_files_path).not_found_service(handle_404.into_service()))
}
