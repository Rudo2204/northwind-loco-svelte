import type { PageServerLoad } from './$types';
import { SupplierPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url }) => {
  const { data: suppliers } = await SupplierPageHelper.getSupplierCollection(url.searchParams);
  const seoDataDto = new SeoDataDto('Northwind Traders Suppliers', url.href, url.href);
  return { suppliers, seoData: { ...seoDataDto } };
};
