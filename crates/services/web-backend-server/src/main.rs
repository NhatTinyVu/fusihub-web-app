mod config;
mod error;

pub use self::error::{Error, Result};
use config::web_config;

use lib_web::routes::routes_static;

use axum::Router;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> Result<()> {
    let routes_all =
        Router::new().fallback_service(routes_static::serve_dir(&web_config().WEB_FOLDER));

    // region:    --- Start Server
    // Note: For this block, ok to unwrap.
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
    axum::serve(listener, routes_all.into_make_service())
        .await
        .unwrap();
    // endregion: --- Start Server

    Ok(())
}
