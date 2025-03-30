use loco_rs::{
    controller::views::pagination::{Pager, PagerMeta},
    model::query::{PageResponse, PaginationQuery},
};
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::_entities::products;

#[derive(Debug, Deserialize, Serialize)]
pub struct ProductResponse {
    productid: i64,
    productname: Option<String>,
    supplierid: Option<i64>,
    categoryid: Option<i64>,
    quantityperunit: Option<String>,
    unitprice: Option<Decimal>,
    unitsinstock: Option<i64>,
    unitsonorder: Option<i64>,
    reorderlevel: Option<i64>,
    discontinued: bool,
    created_at: DateTimeWithTimeZone,
    updated_at: DateTimeWithTimeZone,
}

impl From<products::Model> for ProductResponse {
    fn from(model: products::Model) -> Self {
        Self {
            productid: model.productid,
            productname: model.productname,
            supplierid: model.supplierid,
            categoryid: model.categoryid,
            quantityperunit: model.quantityperunit,
            unitprice: model.unitprice,
            unitsinstock: model.unitsinstock,
            unitsonorder: model.unitsonorder,
            reorderlevel: model.reorderlevel,
            // NOTE: unwraps here are safe because we manually checked that they are all not null
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
    ) -> Pager<Vec<ProductResponse>> {
        Pager {
            results: data
                .page
                .into_iter()
                .map(ProductResponse::from)
                .collect::<Vec<ProductResponse>>(),
            info: PagerMeta {
                page: pagination_query.page,
                page_size: pagination_query.page_size,
                total_pages: data.total_pages,
                total_items: data.total_items,
            },
        }
    }
}
