#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use axum::extract::Path;
use loco_rs::prelude::*;

use crate::controllers::load_item;
use crate::models::_entities::products;
use crate::views::PaginationResponse;

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn list(State(ctx): State<AppContext>) -> Result<impl IntoResponse> {
    let res = query::fetch_page(
        &ctx.db,
        products::Entity::find(),
        &query::PaginationQuery::page(1),
    )
    .await?;
    Ok(format::json(PaginationResponse::response(
        res,
        &query::PaginationQuery::page(1),
    )))
}

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn get_one(
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<impl IntoResponse> {
    let item = load_item::<products::Entity>(&ctx, id).await?;
    format::json(item)
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/products")
        .add("/", get(list))
        .add("/{id}", get(get_one))
}
