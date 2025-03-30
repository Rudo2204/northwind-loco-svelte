import { SiteOptions } from '$lib/configs/siteOptions';
import type { PaginationRequest } from '$lib/shared/requests';

export abstract class PaginationQueries {
  static getPaginationQuery(search?: URLSearchParams): string {
    let params: PaginationRequest;

    if (search) {
      params = {
        page: search.get('page') ? Number(search.get('page')) : SiteOptions.page,
        pageSize: search.get('page_size') ? Number(search.get('page_size')) : SiteOptions.pageSize
      };
    } else {
      params = {
        page: SiteOptions.page,
        pageSize: SiteOptions.pageSize
      };
    }

    const { page, pageSize } = params;
    let urlSearchParams = new URLSearchParams();

    if (page !== undefined) {
      urlSearchParams.append('page', page.toString());
    }
    if (pageSize !== undefined) {
      urlSearchParams.append('page_size', pageSize.toString());
    }

    let query = '?' + urlSearchParams.toString();

    return query;
  }
}
