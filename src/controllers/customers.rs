#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use axum::extract::{Path, Query};
use loco_rs::prelude::*;

use crate::models::_entities::customers;
use crate::views::PaginationResponse;

async fn load_item(ctx: &AppContext, customerid: &str) -> Result<customers::Model> {
    let item = customers::Model::find_by_customerid(&ctx.db, customerid).await?;
    Ok(item)
}

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn list(
    query: Query<query::PaginationQuery>,
    State(ctx): State<AppContext>,
) -> Result<impl IntoResponse> {
    let res = query::fetch_page(&ctx.db, customers::Entity::find(), &query).await?;
    Ok(format::json(PaginationResponse::response(res, &query)))
}

#[debug_handler]
#[tracing::instrument(skip(ctx))]
pub async fn get_one(
    Path(customerid): Path<String>,
    State(ctx): State<AppContext>,
) -> Result<impl IntoResponse> {
    let item = load_item(&ctx, customerid.as_str()).await?;
    format::json(item)
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/customers")
        .add("/", get(list))
        .add("/{customerid}", get(get_one))
}
