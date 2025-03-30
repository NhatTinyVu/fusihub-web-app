mod config;
mod error;
mod web;

pub use self::error::{Error, Result};
use config::web_config;

use lib_web::routes::routes_static;
use tracing_subscriber::EnvFilter;

use crate::web::routes_hello;

use axum::Router;
use lib_core::model::ModelManager;
use tokio::net::TcpListener;
use tower_cookies::CookieManagerLayer;
use tracing::info;

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt()
        .compact()
        .without_time() // For early local development.
        .with_target(false)
        .with_file(true)
        .with_line_number(true)
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let mm = ModelManager::new().await.unwrap();

    let routes_all = Router::new()
        .merge(routes_hello::routes(mm.clone()))
        .layer(CookieManagerLayer::new())
        .fallback_service(routes_static::serve_dir(&web_config().STATIC_FILES_PATH));

    let listener = TcpListener::bind("0.0.0.0:8888").await.unwrap();
    info!("{:<12} - {:?}\n", "LISTENING", listener.local_addr());
    axum::serve(listener, routes_all.into_make_service())
        .await
        .unwrap();

    Ok(())
}
