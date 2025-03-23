import type { PageServerLoad } from './$types';
import { PaginationQueries } from '$lib/shared/queries';
import { SupplierConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url }) => {
  const { data: suppliers } = await PageHelper.getSuppliers(url.searchParams);
  const seoDataDto = new SeoDataDto('Northwind Traders Suppliers', url.href, url.href);
  return { suppliers, seoData: { ...seoDataDto } };
};

abstract class PageHelper {
  static async getSuppliers(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new SupplierConsumer().getList(query);
    return throwOrReturnResults(response);
  }
}
