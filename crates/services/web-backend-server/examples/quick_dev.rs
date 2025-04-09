#![allow(unused)]

use serde_json::{Value, json};
use std::collections::HashMap;
use tracing::info;

pub type Result<T> = core::result::Result<T, Error>;
pub type Error = Box<dyn std::error::Error>; // For examples.

#[tokio::main]
async fn main() -> Result<()> {
    let hc = lib_test::new_client("http://localhost:8888")?;

    hc.do_get("/api/health").await?.print().await?;
    hc.do_post("/api/login", json!({"any": "message"}))
        .await?
        .print()
        .await?;

    // static files
    // hc.do_get("/api/index.html").await?.print().await?;

    // hello world api
    // hc.do_get("/api/hello").await?.print().await?;
    // hc.do_post("/api/hello", json!({"any": "message"}))
    //     .await?
    //     .print()
    //     .await?;

    Ok(())
}
