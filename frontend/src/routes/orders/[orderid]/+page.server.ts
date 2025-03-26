import type { PageServerLoad } from './$types';
import { OrderPageHelper, ShipperPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: order } = await OrderPageHelper.getOrder(params.orderid);
  const { data: shipper } = await ShipperPageHelper.getShipper(String(order.shipvia));
  const seoDataDto = new SeoDataDto('Northwind Traders Order', url.href, url.href);
  return { order, shipper, seoData: { ...seoDataDto } };
};
