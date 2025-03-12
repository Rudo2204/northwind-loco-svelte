#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use loco_rs::prelude::*;
use tokio::time::{Duration, sleep};

#[debug_handler]
pub async fn index(State(_ctx): State<AppContext>) -> Result<impl IntoResponse> {
    tracing::debug!("this is a debug message to test configured yaml setup");
    do_stuff().await;
    explosion().await?;
    Ok("OK")
}

#[tracing::instrument]
pub async fn do_stuff() {
    tracing::warn!("doing stuff inside customers api handler");
    sleep(Duration::from_millis(100)).await;
    tracing::info!("operation was a success!");
    sleep(Duration::from_millis(100)).await;
    tracing::info!("now exiting!");
}

#[tracing::instrument]
pub async fn explosion() -> Result<String, Error> {
    let foobar = match std::env::var("FOOBAR") {
        Ok(var) => {
            tracing::info!(foobar = var, "happy path got FOOBAR var");
            var
        }
        Err(err) => {
            tracing::error!(
                error.source = std::error::Error::source(&err),
                error.msg = err.to_string(),
                "did not find my FOOBAR var"
            );
            return Err(Error::msg(err));
        }
    };

    Ok(foobar)
}

pub fn routes() -> Routes {
    Routes::new().prefix("api/customers/").add("/", get(index))
}
