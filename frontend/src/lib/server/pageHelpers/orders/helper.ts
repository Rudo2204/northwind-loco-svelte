import { OrderConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { PaginationQueries } from '$lib/shared/queries';

export abstract class OrderPageHelper {
  static async getOrder(orderid: string) {
    const response = await new OrderConsumer().getOne(orderid);
    return throwOrReturnResults(response);
  }

  static async getOrderCollection(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new OrderConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
