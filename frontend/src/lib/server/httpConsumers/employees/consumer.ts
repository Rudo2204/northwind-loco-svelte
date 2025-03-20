import { BaseConsumer } from '../baseConsumer';

import type { EmployeeCollectionResponse, EmployeeResponse } from '$lib/shared/responses';

export class EmployeeConsumer extends BaseConsumer {
  listEndpoint = 'employees';
  itemEndpoint = 'employees';

  async getList(query?: string) {
    return this.baseGetList<EmployeeCollectionResponse>(query);
  }

  async getOne(employeeid: string) {
    return this.baseGetOne<EmployeeResponse>(employeeid);
  }
}
