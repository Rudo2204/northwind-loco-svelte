use loco_rs::prelude::*;
use sea_orm::EntityTrait;

/// Find a model by their primary id key
pub async fn load_item<E: EntityTrait>(ctx: &AppContext, id: i32) -> Result<E::Model>
where
    <<E as sea_orm::EntityTrait>::PrimaryKey as sea_orm::PrimaryKeyTrait>::ValueType: From<i32>,
{
    let item = E::find_by_id(id).one(&ctx.db).await?;
    item.ok_or_else(|| Error::NotFound)
}
