import type { BaseCollectionResponse } from '../baseCollectionResponse';

export interface EmployeeResponse {
  employeeid: number;
  lastname: string;
  firstname: string;
  title: string;
  titleofcourtesy: string;
  birthdate: Date;
  hiredate: Date;
  address: string;
  city: string;
  region: string;
  postalcode: string;
  country: string;
  homephone: string;
  extension: string;
  photo: Uint8Array;
  notes: string;
  reportsto: number | null;
  photopath: string;
  created_at: Date;
  updated_at: Date;
}

export interface EmployeeCollectionResponse extends BaseCollectionResponse<EmployeeResponse> {}
