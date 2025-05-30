use crate::error::{Error, Result};
use axum::Json;
use axum::extract::State;
use lib_core::model::ModelManager;
use serde::Deserialize;
use serde_json::{Value, json};
use tower_cookies::Cookies;
use tracing::debug;

pub async fn handle_login(
    State(_mm): State<ModelManager>,
    _cookies: Cookies,
) -> Result<Json<Value>> {
    debug!("{:<12} - handle_login", "HANDLER");
    // let body = Json(json!({
    //     "message": "Hello, this is the message from the rust backend server",
    // }));

    Err(Error::LoginFail)
}

pub async fn handle_logoff(
    State(_mm): State<ModelManager>,
    _cookies: Cookies,
    _payload: Json<Option<HelloPayload>>,
) -> Result<Json<Value>> {
    debug!("{:<12} - handle_logoff", "HANDLER");
    let body = Json(json!({
        "message": "Hello, this is the message from the rust backend server",
    }));

    Ok(body)
}
#[derive(Debug, Deserialize)]
pub struct HelloPayload {}
