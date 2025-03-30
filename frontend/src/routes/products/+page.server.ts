import type { PageServerLoad } from './$types';
import { ProductPageHelper } from '$lib/server/pageHelpers';
import { SeoDataDto } from '$lib/shared/dtos';

export const load: PageServerLoad = async ({ url }) => {
  const { data: products } = await ProductPageHelper.getProductCollection(url.searchParams);
  const seoDataDto = new SeoDataDto('Northwind Traders Products', url.href, url.href);
  return { products, seoData: { ...seoDataDto } };
};
