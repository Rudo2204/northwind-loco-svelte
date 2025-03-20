import type { PageServerLoad } from './$types';
import { PaginationQueries } from '$lib/shared/queries';
import { EmployeeConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';

export const load: PageServerLoad = async ({ url }) => {
  const { data: employees } = await PageHelper.getEmployees(url.searchParams);
  return { employees };
};

abstract class PageHelper {
  static async getEmployees(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new EmployeeConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
