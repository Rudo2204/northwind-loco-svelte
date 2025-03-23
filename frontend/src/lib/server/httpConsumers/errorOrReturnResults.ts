import type { BaseResponse } from '$lib/shared/responses';
import { error } from '@sveltejs/kit';

export function throwOrReturnResults<T>(response: BaseResponse<T>) {
  if (!response.ok) {
    error(response.statusCode, response.message);
  }
  return { data: response.results, message: response.message };
}
