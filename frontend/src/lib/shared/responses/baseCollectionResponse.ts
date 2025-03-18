import type { PaginationMetaResponse } from './paginationMetaResponse';

export class BaseCollectionResponse<TResult> {
  results?: TResult[] | null;
  pagination?: PaginationMetaResponse;
}
