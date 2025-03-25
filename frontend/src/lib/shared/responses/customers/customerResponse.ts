import type { BaseCollectionResponse } from '../baseCollectionResponse';

export interface CustomerResponse {
  id: number; // primary key
  customerid: number;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string | null;
  city: string | null;
  region: string | null;
  postalcode: string | null;
  country: string | null;
  phone: string | null;
  fax: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerCollectionResponse extends BaseCollectionResponse<CustomerResponse> {}
