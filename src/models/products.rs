pub use super::_entities::products::{self, ActiveModel, Entity, Model};
use loco_rs::model::query::PaginationQuery;
use loco_rs::prelude::*;
use query::PageResponse;
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
pub type Products = Entity;

#[derive(Debug, Deserialize, Serialize)]
pub struct ProductQueryParams {
    unitprice_gte: Option<Decimal>,
    unitprice_lte: Option<Decimal>,
    is_discontinued: Option<bool>,

    #[serde(flatten)]
    pub pagination: PaginationQuery,
}

#[async_trait::async_trait]
impl ActiveModelBehavior for ActiveModel {
    async fn before_save<C>(self, _db: &C, insert: bool) -> std::result::Result<Self, DbErr>
    where
        C: ConnectionTrait,
    {
        if !insert && self.updated_at.is_unchanged() {
            let mut this = self;
            this.updated_at = sea_orm::ActiveValue::Set(chrono::Utc::now().into());
            Ok(this)
        } else {
            Ok(self)
        }
    }
}

// implement your read-oriented logic here
impl Model {}

// implement your write-oriented logic here
impl ActiveModel {}

// implement your custom finders, selectors oriented logic here
impl Entity {
    fn get_query_selector(params: &ProductQueryParams) -> Select<Products> {
        let mut query = Products::find();
        if let Some(unitprice_gte) = params.unitprice_gte {
            query = query.filter(products::Column::Unitprice.gte(unitprice_gte))
        }
        if let Some(unitprice_lte) = params.unitprice_lte {
            query = query.filter(products::Column::Unitprice.lte(unitprice_lte))
        }
        if let Some(is_discontinued) = params.is_discontinued {
            query = match is_discontinued {
                true => query.filter(products::Column::Discontinued.eq("1")),
                false => query.filter(products::Column::Discontinued.eq("0")),
            }
        }
        query
    }

    pub async fn query(
        db: &DatabaseConnection,
        params: &ProductQueryParams,
    ) -> Result<PageResponse<Model>> {
        let selector = Entity::get_query_selector(&params);
        query::fetch_page(db, selector, &params.pagination).await
    }
}
