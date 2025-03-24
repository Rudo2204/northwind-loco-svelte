import { BaseConsumer } from '../baseConsumer';

import type { ProductCollectionResponse, ProductResponse } from '$lib/shared/responses';

export class ProductConsumer extends BaseConsumer {
  resource = 'products';

  async getList(query?: string) {
    return this.baseGetList<ProductCollectionResponse>(query);
  }

  async getOne(productid: string) {
    return this.baseGetOne<ProductResponse>(productid);
  }
}
