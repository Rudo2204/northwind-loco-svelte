import { BaseConsumer } from '../baseConsumer';

import type { OrderCollectionResponse, DetailedOrderResponse } from '$lib/shared/responses';

export class OrderConsumer extends BaseConsumer {
  resource = 'orders';

  async getList(query?: string) {
    return this.baseGetList<OrderCollectionResponse>(query);
  }

  async getOne(orderid: string) {
    return this.baseGetOne<DetailedOrderResponse>(orderid);
  }
}
