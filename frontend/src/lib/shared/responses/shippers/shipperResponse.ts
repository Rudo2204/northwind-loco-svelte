import type { BaseCollectionResponse } from '../baseCollectionResponse';

export interface ShipperResponse {
  shipperid: number;
  companyname: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export interface ShipperCollectionResponse extends BaseCollectionResponse<ShipperResponse> {}
