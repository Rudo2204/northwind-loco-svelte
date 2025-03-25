import type { BaseCollectionResponse } from '../baseCollectionResponse';

export interface OrderResponse {
  orderid: number;
  customerid: string;
  employeeid: number;
  orderdate: Date;
  requireddate: Date;
  shippeddate: Date | null;
  shipvia: number;
  freight: number;
  shipname: string;
  shipaddress: string;
  shipcity: string;
  shipregion: string;
  shippostalcode: string | null;
  shipcountry: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderCollectionResponse extends BaseCollectionResponse<OrderResponse> {}
