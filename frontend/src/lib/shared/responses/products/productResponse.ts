import type { BaseCollectionResponse } from '../baseCollectionResponse';

export interface ProductResponse {
  productid: number;
  productname: string;
  supplierid: string;
  categoryid: string;
  quantityperunit: string;
  unitprice: number;
  unitsinstock: number;
  unitsonorder: number;
  reorderlevel: number;
  discontinued: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ProductCollectionResponse extends BaseCollectionResponse<ProductResponse> {}
