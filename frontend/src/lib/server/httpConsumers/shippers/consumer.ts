import { BaseConsumer } from '../baseConsumer';

import type { ShipperCollectionResponse, ShipperResponse } from '$lib/shared/responses';

export class ShipperConsumer extends BaseConsumer {
  resource = 'shippers';

  async getList(query?: string) {
    return this.baseGetList<ShipperCollectionResponse>(query);
  }

  async getOne(shipperid: string) {
    return this.baseGetOne<ShipperResponse>(shipperid);
  }
}
