import { BaseConsumer } from '../baseConsumer';

import type { SupplierCollectionResponse, SupplierResponse } from '$lib/shared/responses';

export class SupplierConsumer extends BaseConsumer {
  resource = 'suppliers';

  async getList(query?: string) {
    return this.baseGetList<SupplierCollectionResponse>(query);
  }

  async getOne(supplierid: string) {
    return this.baseGetOne<SupplierResponse>(supplierid);
  }
}
