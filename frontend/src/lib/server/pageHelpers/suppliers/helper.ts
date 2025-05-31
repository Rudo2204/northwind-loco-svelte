import { SupplierConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { PaginationQueries } from '$lib/shared/queries';

export abstract class SupplierPageHelper {
  static async getSupplier(supplierid: string) {
    const response = await new SupplierConsumer().getOne(supplierid);
    return throwOrReturnResults(response);
  }

  static async getSupplierCollection(search: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new SupplierConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
