import type { PageServerLoad } from './$types';
import { json } from '@sveltejs/kit';
import { PaginationQueries } from '$lib/shared/queries';
import { EmployeeConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url }) => {
  const { data: employees } = await PageHelper.getEmployees(url.searchParams);
  const seoDataDto = new SeoDataDto('Northwind Traders Employees', url.href, url.href);
  return { employees, seoData: { ...seoDataDto } };
};

abstract class PageHelper {
  static async getEmployees(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new EmployeeConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
