import type { BaseCollectionResponse } from '../baseCollectionResponse';

export interface OrderDetailsResponse {
  productid: number;
  unitprice: string;
  quantity: number;
  discount: number;
  id: number;
  created_at: Date;
  updated_at: Date;
}

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

export interface DetailedOrderResponse extends OrderResponse {
  details: OrderDetailsResponse[];
}

export interface TransformedOrderResponse extends DetailedOrderResponse {
  totalprice: string;
  totalproducts: number;
  totalquantity: number;
}

export interface OrderCollectionResponse extends BaseCollectionResponse<DetailedOrderResponse> {}
export interface TransformedOrderCollectionResponse
  extends BaseCollectionResponse<TransformedOrderResponse> {}
