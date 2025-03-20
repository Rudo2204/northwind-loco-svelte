import { BaseConsumer } from '../baseConsumer';

import type { EmployeeCollectionResponse, EmployeeResponse } from '$lib/shared/responses';

export class EmployeeConsumer extends BaseConsumer {
  listEndpoint = 'employees';

  async getList(query?: string) {
    return this.baseGetList<EmployeeCollectionResponse>(query);
  }

  async getOne(employeeid: number) {
    return this.baseGetOne<EmployeeResponse>(employeeid);
  }
}
