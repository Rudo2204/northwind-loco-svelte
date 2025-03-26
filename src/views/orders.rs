use loco_rs::{
    Result,
    controller::views::pagination::{Pager, PagerMeta},
    model::query::{PageResponse, PaginationQuery},
};
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::_entities::order_details;
use crate::models::_entities::orders;

#[derive(Debug, Deserialize, Serialize)]
pub struct OrderDetailsResponse {
    productid: i64,
    unitprice: Option<Decimal>,
    quantity: Option<i64>,
    discount: Option<f32>,
    id: i32,
    created_at: DateTimeWithTimeZone,
    updated_at: DateTimeWithTimeZone,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OrderResponse {
    orderid: i64,
    customerid: Option<String>,
    employeeid: Option<i64>,
    orderdate: Option<DateTimeWithTimeZone>,
    requireddate: Option<DateTimeWithTimeZone>,
    shippeddate: Option<DateTimeWithTimeZone>,
    shipvia: Option<i64>,
    freight: Option<Decimal>,
    shipname: Option<String>,
    shipaddress: Option<String>,
    shipcity: Option<String>,
    shipregion: Option<String>,
    shippostalcode: Option<String>,
    shipcountry: Option<String>,
    created_at: DateTimeWithTimeZone,
    updated_at: DateTimeWithTimeZone,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DetailedOrderResponse {
    #[serde(flatten)]
    order: OrderResponse,
    details: Vec<OrderDetailsResponse>,
}

impl From<order_details::Model> for OrderDetailsResponse {
    fn from(details: order_details::Model) -> Self {
        Self {
            productid: details.productid,
            unitprice: details.unitprice,
            quantity: details.quantity,
            discount: details.discount,
            id: details.id,
            created_at: details.created_at,
            updated_at: details.updated_at,
        }
    }
}

impl From<orders::Model> for OrderResponse {
    fn from(order: orders::Model) -> Self {
        Self {
            orderid: order.orderid,
            customerid: order.customerid,
            employeeid: order.employeeid,
            orderdate: order.orderdate,
            requireddate: order.requireddate,
            shippeddate: order.shippeddate,
            shipvia: order.shipvia,
            freight: order.freight,
            shipname: order.shipname,
            shipaddress: order.shipaddress,
            shipcity: order.shipcity,
            shipregion: order.shipregion,
            shippostalcode: order.shippostalcode,
            shipcountry: order.shipcountry,
            created_at: order.created_at,
            updated_at: order.updated_at,
        }
    }
}

impl DetailedOrderResponse {
    pub async fn new<C>(db: &C, order: orders::Model) -> Result<Self>
    where
        C: ConnectionTrait + Sync,
    {
        let details_models = order.find_related(order_details::Entity).all(db).await?;
        let details: Vec<OrderDetailsResponse> = details_models
            .into_iter()
            .map(OrderDetailsResponse::from)
            .collect();
        Ok(Self {
            order: OrderResponse::from(order),
            details,
        })
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DetailedOrderPaginationResponse {}

impl DetailedOrderPaginationResponse {
    #[must_use]
    pub async fn response<C>(
        db: &C,
        data: PageResponse<orders::Model>,
        pagination_query: &PaginationQuery,
    ) -> Result<Pager<Vec<DetailedOrderResponse>>>
    where
        C: ConnectionTrait + Sync,
    {
        let vec_orders = data.page;
        let vec_order_details = vec_orders.load_many(order_details::Entity, db).await?;
        let mut results = Vec::with_capacity(vec_orders.len());
        for (ord, ord_details) in vec_orders.into_iter().zip(vec_order_details) {
            let details: Vec<OrderDetailsResponse> = ord_details
                .into_iter()
                .map(OrderDetailsResponse::from)
                .collect();
            let order_response = OrderResponse::from(ord);
            results.push(DetailedOrderResponse {
                order: order_response,
                details,
            });
        }

        Ok(Pager {
            results,
            info: PagerMeta {
                page: pagination_query.page,
                page_size: pagination_query.page_size,
                total_pages: data.total_pages,
                total_items: data.total_items,
            },
        })
    }
}
