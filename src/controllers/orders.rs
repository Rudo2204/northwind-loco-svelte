#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use axum::extract::{Path, Query};
use loco_rs::prelude::*;

use crate::controllers::load_item;
use crate::models::_entities::orders;
use crate::views::orders::{DetailedOrderPaginationResponse, DetailedOrderResponse};

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn list(
    query: Query<query::PaginationQuery>,
    State(ctx): State<AppContext>,
) -> Result<impl IntoResponse> {
    let res = query::fetch_page(&ctx.db, orders::Entity::find(), &query).await?;
    Ok(format::json(
        DetailedOrderPaginationResponse::response(&ctx.db, res, &query).await?,
    ))
}

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn get_one(
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<impl IntoResponse> {
    let item = load_item::<orders::Entity>(&ctx, id).await?;
    let resp = DetailedOrderResponse::new(&ctx.db, item).await?;
    format::json(resp)
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/orders")
        .add("/", get(list))
        .add("/{id}", get(get_one))
}
