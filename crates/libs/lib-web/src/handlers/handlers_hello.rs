use crate::error::Result;
use axum::Json;
use axum::extract::State;
use lib_core::model::ModelManager;
use serde::Deserialize;
use serde_json::{Value, json};
use tower_cookies::Cookies;
use tracing::debug;

pub async fn handle_hello_api(
    State(_mm): State<ModelManager>,
    _cookies: Cookies,
    Json(_payload): Json<LoginPayload>,
) -> Result<Json<Value>> {
    debug!("{:<12} - api_hello_handler", "HANDLER");
    let body = Json(json!({
        "success": true
    }));

    Ok(body)
}

#[derive(Debug, Deserialize)]
pub struct LoginPayload {}
