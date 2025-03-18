import type { PageServerLoad } from './$types';
import type { EmployeeCollectionResponse } from '$lib/shared/responses';
import { PaginationQueries } from '$lib/shared/queries';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const employees = await PageHelper.getEmployees(fetch, url.searchParams);
  return { employees };
};

abstract class PageHelper {
  static async getEmployees(fetch: any, search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await fetch('/api/v1/employees' + query);
    const parsedResponse: EmployeeCollectionResponse = await response.json();

    return parsedResponse;
  }
}
