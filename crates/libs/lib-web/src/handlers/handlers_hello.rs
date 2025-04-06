use crate::error::Result;
use axum::Json;
use axum::extract::State;
use lib_core::model::ModelManager;
use serde_json::{Value, json};
use tracing::debug;

pub async fn handle_get_hello(State(_mm): State<ModelManager>) -> Result<Json<Value>> {
    debug!("{:<12} - api_hello_handler", "HANDLER");
    let body = Json(json!({
        "message": "A personal self-hosted microservice  website powered by Axum (Rust) and Next.js.",
    }));

    Ok(body)
}
