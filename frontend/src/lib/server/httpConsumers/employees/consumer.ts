import { BaseConsumer } from '../baseConsumer';

import type { EmployeeCollectionResponse, EmployeeResponse } from '$lib/shared/responses';

export class EmployeeConsumer extends BaseConsumer {
  listEndpoint = 'employees';

  async getEmployeeCollection(query?: string) {
    return this.getList<EmployeeCollectionResponse>(query);
  }

  async getEmployee(employeeid: number) {
    return this.getItem<EmployeeResponse>(employeeid);
  }
}
