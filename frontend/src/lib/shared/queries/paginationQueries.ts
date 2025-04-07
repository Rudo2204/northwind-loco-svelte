import { SiteOptions } from '$lib/configs/siteOptions';
import type { PaginationRequest } from '$lib/shared/requests';
import queryString from 'query-string';

export function getPaginationUrlParams(search?: URLSearchParams): PaginationRequest {
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
  return params;
}

export abstract class PaginationQueries {
  static getPaginationQuery(search: URLSearchParams): string {
    const parsed = queryString.parse(search.toString(), {
      parseNumbers: true,
      parseBooleans: true
    });

    const { page, pageSize } = getPaginationUrlParams(search);
    parsed.page = page;
    parsed.pageSize = pageSize;

    const query = '?' + queryString.stringify(parsed);
    return query;
  }
}
