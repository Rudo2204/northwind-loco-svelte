import type { PageServerLoad } from './$types';
import { OrderPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: order } = await OrderPageHelper.getOrder(params.orderid);
  const seoDataDto = new SeoDataDto('Northwind Traders Order', url.href, url.href);
  return { order, seoData: { ...seoDataDto } };
};
