import { ShipperConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { PaginationQueries } from '$lib/shared/queries';

export abstract class ShipperPageHelper {
  static async getShipper(shipperid: string) {
    const response = await new ShipperConsumer().getOne(shipperid);
    return throwOrReturnResults(response);
  }

  static async getShipperCollection(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new ShipperConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
