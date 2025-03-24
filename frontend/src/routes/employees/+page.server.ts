import type { PageServerLoad } from './$types';
import { EmployeePageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url }) => {
  const { data: employees } = await EmployeePageHelper.getEmployeeCollection(url.searchParams);
  const seoDataDto = new SeoDataDto('Northwind Traders Employees', url.href, url.href);
  return { employees, seoData: { ...seoDataDto } };
};
