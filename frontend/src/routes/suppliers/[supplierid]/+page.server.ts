import type { PageServerLoad } from './$types';
import { SupplierPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: supplier } = await SupplierPageHelper.getSupplier(params.supplierid);
  const seoDataDto = new SeoDataDto('Northwind Traders Supplier', url.href, url.href);
  return { supplier, seoData: { ...seoDataDto } };
};
