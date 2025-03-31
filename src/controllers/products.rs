#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use axum::extract::{Path, Query};
use loco_rs::prelude::*;

use crate::controllers::load_item;
use crate::models::_entities::products;
use crate::models::products::ProductQueryParams;
use crate::views::products::{ProductPaginationResponse, ProductResponse};

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn list(
    params: Query<ProductQueryParams>,
    State(ctx): State<AppContext>,
) -> Result<impl IntoResponse> {
    let res = products::Entity::query(&ctx.db, &params).await?;
    Ok(format::json(ProductPaginationResponse::response(
        res,
        &params.pagination,
    )))
}

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn get_one(
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<impl IntoResponse> {
    let item = load_item::<products::Entity>(&ctx, id).await?;
    format::json(ProductResponse::from(item))
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/products")
        .add("/", get(list))
        .add("/{id}", get(get_one))
}
