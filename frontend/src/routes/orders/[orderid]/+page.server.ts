import type { PageServerLoad } from './$types';
import { OrderPageHelper, ShipperPageHelper, ProductPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: order } = await OrderPageHelper.getOrder(params.orderid);
  const { data: shipper } = await ShipperPageHelper.getShipper(String(order.shipvia));
  let productIndex: { [key: number]: string } = {};
  for (const item of order.details) {
    const { data: product } = await ProductPageHelper.getProduct(String(item.productid));
    productIndex[product.productid] = product.productname;
  }
  // order.details.forEach(async (item) => {
  //   const { data: product } = await ProductPageHelper.getProduct(String(item.productid));
  //   productIndex[String(product.productid)] = product.productname;
  // });
  // console.log(productIndex);
  const seoDataDto = new SeoDataDto('Northwind Traders Order', url.href, url.href);
  return { order, shipper, productIndex, seoData: { ...seoDataDto } };
};
