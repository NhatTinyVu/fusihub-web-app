use crate::error::Error;

use axum::Json;
use axum::http::{Method, Uri};
use axum::response::{IntoResponse, Response};
use serde_json::{json, to_value};
use std::sync::Arc;
use tracing::{debug, info};

use crate::middlewares::middlewares_request_stamp::RequestStamp;

pub async fn map_response(
    uri: Uri,
    http_method: Method,
    request_stamp: RequestStamp,
    response: Response,
) -> Response {
    debug!("{:<12} - map_response", "MIDDLEWARE");

    // todo! remove
    info!("uri {uri}, http_method {http_method}, request_stamp {request_stamp}");

    let web_error = response.extensions().get::<Arc<Error>>().map(Arc::as_ref);
    let client_status_error = web_error.map(|se| se.client_status_and_error());

    let error_response = client_status_error
        .as_ref()
        .map(|(status_code, client_error)| {
            let client_error = to_value(client_error).ok();
            let message = client_error.as_ref().and_then(|v| v.get("message"));
            let detail = client_error.as_ref().and_then(|v| v.get("detail"));

            let client_error_body = json!({
                "error": {
                    "message": message,
                    "data": {
                        "detail": detail
                    },
                }
            });

            debug!("CLIENT ERROR BODY:\n{client_error_body}");

            (*status_code, Json(client_error_body)).into_response()
        });

    error_response.unwrap_or(response)
}
