mod config;
mod error;

pub use self::error::{Error, Result};
use config::web_config;

use lib_web::routes::routes_static;

use axum::Router;
use tokio::net::TcpListener;
use tracing::info;

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt()
        .without_time() // For early local development.
        .with_target(false)
        .init();

    let routes_all =
        Router::new().fallback_service(routes_static::serve_dir(&web_config().STATIC_FILES_PATH));

    // region:    --- Start Server
    // Note: For this block, ok to unwrap.
    let listener = TcpListener::bind("0.0.0.0:8080").await.unwrap();
    info!("{:<12} - {:?}\n", "LISTENING", listener.local_addr());
    axum::serve(listener, routes_all.into_make_service())
        .await
        .unwrap();
    // endregion: --- Start Server

    Ok(())
}
