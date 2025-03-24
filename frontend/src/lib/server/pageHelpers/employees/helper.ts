import { EmployeeConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { PaginationQueries } from '$lib/shared/queries';

export abstract class EmployeePageHelper {
  static async getEmployee(employeeid: string) {
    const response = await new EmployeeConsumer().getOne(employeeid);
    return throwOrReturnResults(response);
  }

  static async getEmployeeCollection(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new EmployeeConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
