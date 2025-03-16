import { NORTHWIND_API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

interface PagerMeta {
  page: number;
  page_size: number;
  total_pages: number;
  total_items: number;
}

interface Employee {
  employeeid: number;
  created_at: Date;
  updated_at: Date;
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
  notes: string | null;
  reportsto: number | null;
  photopath: string;
}

interface Employees {
  results: Employee[];
  pagination: PagerMeta;
}

export const load: PageServerLoad = async ({ fetch, url }) => {
  const page = url.searchParams.get('page') || '1';
  const res = await fetch(`${NORTHWIND_API_URL}/api/employees?page=${page}`);
  const employees: Employees = await res.json();

  return { employees };
};
