import type { BaseCollectionResponse } from '../baseCollectionResponse';

export interface SupplierResponse {
  supplierid: number;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string;
  city: string;
  region: string | null;
  postalcode: string;
  country: string;
  phone: string;
  fax: string | null;
  homepage: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SupplierCollectionResponse extends BaseCollectionResponse<SupplierResponse> {}
