import { ProductConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { PaginationQueries } from '$lib/shared/queries';

export abstract class ProductPageHelper {
  static async getProduct(productid: string) {
    const response = await new ProductConsumer().getOne(productid);
    return throwOrReturnResults(response);
  }

  static async getProductCollection(search: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new ProductConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
