import { BaseConsumer } from '../baseConsumer';

import type { CustomerCollectionResponse, CustomerResponse } from '$lib/shared/responses';

export class CustomerConsumer extends BaseConsumer {
  resource = 'customers';

  async getList(query?: string) {
    return this.baseGetList<CustomerCollectionResponse>(query);
  }

  async getOne(customerid: string) {
    return this.baseGetOne<CustomerResponse>(customerid);
  }
}
