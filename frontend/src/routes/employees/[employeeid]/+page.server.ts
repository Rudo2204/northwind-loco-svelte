import type { PageServerLoad } from './$types';
import { EmployeeConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: employee } = await PageHelper.getEmployee(params.employeeid);
  const seoDataDto = new SeoDataDto('Northwind Traders Employee', url.href, url.href);
  return { employee, seoData: { ...seoDataDto } };
};

abstract class PageHelper {
  static async getEmployee(employeeid: string) {
    const response = await new EmployeeConsumer().getOne(employeeid);
    return throwOrReturnResults(response);
  }
}
