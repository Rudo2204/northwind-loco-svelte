import { CustomerConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { PaginationQueries } from '$lib/shared/queries';

export abstract class CustomerPageHelper {
  static async getCustomer(customerid: string) {
    const response = await new CustomerConsumer().getOne(customerid);
    return throwOrReturnResults(response);
  }

  static async getCustomerCollection(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new CustomerConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
