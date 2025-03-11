#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use loco_rs::prelude::*;
use opentelemetry::trace::Tracer;

#[debug_handler]
pub async fn index(State(_ctx): State<AppContext>) -> Result<impl IntoResponse> {
    let tracer = opentelemetry::global::tracer("customers-index");
    tracer.in_span("customers-foobar-handler", |_cx| {
        tracing::warn!("doing stuff inside customers api handler");
    });
    Ok("OK")
}

pub fn routes() -> Routes {
    Routes::new().prefix("api/customers/").add("/", get(index))
}
