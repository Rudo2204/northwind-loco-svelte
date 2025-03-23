import type { PageServerLoad } from './$types';
import { SeoDataDto } from '$lib/shared/dtos';
export const load: PageServerLoad = async ({ url }) => {
  const seoDataDto = new SeoDataDto('Northwind Traders Home', url.href, url.href);
  return { seoData: { ...seoDataDto } };
};
