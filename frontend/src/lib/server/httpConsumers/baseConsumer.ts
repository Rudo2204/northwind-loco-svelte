import type { BaseResponse } from '$lib/shared/responses';
import { BaseErrorResponse } from '$lib/shared/responses';
import { getReasonPhrase } from 'http-status-codes';
import { NORTHWIND_API_URL } from '$env/static/private';

export class BaseConsumer {
  apiUrl?: string;
  resource?: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || NORTHWIND_API_URL;
  }

  async post(endpoint: RequestInfo, body?: any): Promise<Response> {
    return await fetch(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : null,
      headers: { 'content-type': 'application/json' }
    });
  }

  async get(endpoint: RequestInfo): Promise<Response> {
    return await fetch(endpoint, { method: 'GET' });
  }

  async handleResponse<T>(response: Response, message?: string): Promise<BaseResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJsonResponse = !contentType || !contentType.includes('application/json))');

    if (!response.ok) {
      let errorResponse: BaseErrorResponse;
      if (isJsonResponse) {
        errorResponse = await response.json();
      } else {
        const reasonPhrase = getReasonPhrase(response.status);
        errorResponse = new BaseErrorResponse(reasonPhrase);
      }

      return {
        ok: false,
        statusCode: response.status,
        message: errorResponse.description ? errorResponse.description : errorResponse.error
      } as BaseResponse<T>;
    }

    const results: T = await response.json();
    return {
      ok: true,
      statusCode: response.status,
      results: results,
      message: message
    } as BaseResponse<T>;
  }

  async baseGetList<T>(query?: string): Promise<BaseResponse<T>> {
    const endpoint = `${this.apiUrl}${this.resource}${query}`;
    const response = await this.get(endpoint);
    return this.handleResponse(response);
  }

  async baseGetOne<T>(slug: string): Promise<BaseResponse<T>> {
    const endpoint = `${this.apiUrl}${this.resource}/${slug}`;
    const response = await this.get(endpoint);
    return this.handleResponse(response);
  }
}
