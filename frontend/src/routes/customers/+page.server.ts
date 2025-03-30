import type { PageServerLoad } from './$types';
import { CustomerPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url }) => {
  const { data: customers } = await CustomerPageHelper.getCustomerCollection(url.searchParams);
  const seoDataDto = new SeoDataDto('Northwind Traders Customers', url.href, url.href);
  return { customers, seoData: { ...seoDataDto } };
};
