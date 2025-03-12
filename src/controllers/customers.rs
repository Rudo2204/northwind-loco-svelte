#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use loco_rs::prelude::*;
use tokio::time::{Duration, sleep};

#[debug_handler]
pub async fn index(State(_ctx): State<AppContext>) -> Result<impl IntoResponse> {
    do_stuff().await;
    explosion().await;
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
pub async fn explosion() {
    assert_eq!(1 + 1, 3);
}

pub fn routes() -> Routes {
    Routes::new().prefix("api/customers/").add("/", get(index))
}
