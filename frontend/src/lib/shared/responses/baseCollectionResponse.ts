import type { PaginationMetaResponse } from './paginationMetaResponse';

export interface BaseCollectionResponse<TResult> {
  results: TResult[];
  pagination: PaginationMetaResponse;
}
