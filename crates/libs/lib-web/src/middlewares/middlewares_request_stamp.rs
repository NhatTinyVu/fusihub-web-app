use crate::error::{Error, Result};
use axum::body::Body;
use axum::extract::FromRequestParts;
use axum::http::Request;
use axum::http::request::Parts;
use axum::middleware::Next;
use axum::response::Response;
use lib_utils::time::now_utc;
use time::OffsetDateTime;
use tracing::debug;
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct RequestStamp {
    pub uuid: Uuid,
    pub time_in: OffsetDateTime,
}

// todo! remove
impl core::fmt::Display for RequestStamp {
    fn fmt(&self, fmt: &mut core::fmt::Formatter) -> core::result::Result<(), core::fmt::Error> {
        write!(fmt, "{self:?}")
    }
}

pub async fn resolve_request_stamp(mut request: Request<Body>, next: Next) -> Result<Response> {
    debug!("{:<12} - resolve_request_stamp", "MIDDLEWARE");

    let time_in = now_utc();
    let uuid = Uuid::new_v4();

    request
        .extensions_mut()
        .insert(RequestStamp { uuid, time_in });

    Ok(next.run(request).await)
}

impl<S: Send + Sync> FromRequestParts<S> for RequestStamp {
    type Rejection = Error;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self> {
        debug!("{:<12} - RequestStamp", "EXTRACTOR");

        parts
            .extensions
            .get::<RequestStamp>()
            .cloned()
            .ok_or(Error::ReqStampNotInReqExt)
    }
}
