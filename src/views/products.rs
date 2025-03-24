use loco_rs::{
    controller::views::pagination::{Pager, PagerMeta},
    model::query::{PageResponse, PaginationQuery},
};
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::_entities::products;

#[derive(Debug, Deserialize, Serialize)]
pub struct ProductListResponse {
    productid: i64,
    productname: String,
    supplierid: i64,
    categoryid: i64,
    quantityperunit: String,
    unitprice: Decimal,
    unitsinstock: i64,
    unitsonorder: i64,
    reorderlevel: i64,
    discontinued: bool,
    created_at: DateTimeWithTimeZone,
    updated_at: DateTimeWithTimeZone,
}

impl From<products::Model> for ProductListResponse {
    fn from(model: products::Model) -> Self {
        // NOTE: unwraps here are safe because we manually checked that they are all not null
        Self {
            productid: model.productid,
            productname: model.productname.unwrap(),
            supplierid: model.supplierid.unwrap(),
            categoryid: model.categoryid.unwrap(),
            quantityperunit: model.quantityperunit.unwrap(),
            unitprice: model.unitprice.unwrap(),
            unitsinstock: model.unitsinstock.unwrap(),
            unitsonorder: model.unitsonorder.unwrap(),
            reorderlevel: model.reorderlevel.unwrap(),
            discontinued: match model.discontinued.unwrap().as_str() {
                "0" => false,
                "1" => true,
                _ => panic!("this never happens"),
            },
            created_at: model.created_at,
            updated_at: model.updated_at,
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ProductPaginationResponse {}

impl ProductPaginationResponse {
    #[must_use]
    pub fn response(
        data: PageResponse<products::Model>,
        pagination_query: &PaginationQuery,
    ) -> Pager<Vec<ProductListResponse>> {
        Pager {
            results: data
                .page
                .into_iter()
                .map(ProductListResponse::from)
                .collect::<Vec<ProductListResponse>>(),
            info: PagerMeta {
                page: pagination_query.page,
                page_size: pagination_query.page_size,
                total_pages: data.total_pages,
                total_items: data.total_items,
            },
        }
    }
}
