import type { PageServerLoad } from './$types';
import { ProductPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';
import { SupplierPageHelper } from '$lib/server/pageHelpers';

export const load: PageServerLoad = async ({ url, params }) => {
  const { data: product } = await ProductPageHelper.getProduct(params.productid);
  const { data: supplier } = await SupplierPageHelper.getSupplier(product.supplierid);
  const seoDataDto = new SeoDataDto('Northwind Traders Product', url.href, url.href);
  return { product, supplier, seoData: { ...seoDataDto } };
};
