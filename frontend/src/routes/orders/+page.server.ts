import type { PageServerLoad } from './$types';
import { OrderPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url }) => {
  const { data: orders } = await OrderPageHelper.getOrderCollection(url.searchParams);
  const seoDataDto = new SeoDataDto('Northwind Traders Orders', url.href, url.href);
  return { orders, seoData: { ...seoDataDto } };
};
