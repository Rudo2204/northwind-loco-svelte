use loco_rs::{
    controller::views::pagination::{Pager, PagerMeta},
    model::query::{PageResponse, PaginationQuery},
};
use sea_orm::ModelTrait;
use serde::{Deserialize, Serialize};

/// Default PaginationResponse
#[derive(Debug, Deserialize, Serialize)]
pub struct PaginationResponse {}

impl PaginationResponse {
    #[must_use]
    pub fn response<T: ModelTrait>(
        data: PageResponse<T>,
        pagination_query: &PaginationQuery,
    ) -> Pager<Vec<T>> {
        Pager {
            results: data.page,
            info: PagerMeta {
                page: pagination_query.page,
                page_size: pagination_query.page_size,
                total_pages: data.total_pages,
                total_items: data.total_items,
            },
        }
    }
}
