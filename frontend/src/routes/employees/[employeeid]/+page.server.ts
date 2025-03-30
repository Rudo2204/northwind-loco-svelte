import type { PageServerLoad } from './$types';
import { EmployeePageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: employee } = await EmployeePageHelper.getEmployee(params.employeeid);
  const seoDataDto = new SeoDataDto('Northwind Traders Employee', url.href, url.href);
  let reportsToEmployee;
  if (employee!.reportsto) {
    const { data } = await EmployeePageHelper.getEmployee(String(employee!.reportsto));
    reportsToEmployee = data;
  }
  return { employee, reportsToEmployee, seoData: { ...seoDataDto } };
};
