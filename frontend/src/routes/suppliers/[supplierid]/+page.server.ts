import type { PageServerLoad } from './$types';
import { SupplierConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: supplier } = await PageHelper.getSupplier(params.supplierid);
  const seoDataDto = new SeoDataDto('Northwind Traders Supplier', url.href, url.href);
  return { supplier, seoData: { ...seoDataDto } };
};

abstract class PageHelper {
  static async getSupplier(supplierid: string) {
    const response = await new SupplierConsumer().getOne(supplierid);
    return throwOrReturnResults(response);
  }
}
