import type { PageServerLoad } from './$types';
import { CustomerPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: customer } = await CustomerPageHelper.getCustomer(params.id);
  const seoDataDto = new SeoDataDto('Northwind Traders Customer', url.href, url.href);
  return { customer, seoData: { ...seoDataDto } };
};
