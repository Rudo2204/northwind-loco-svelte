import { EmployeeConsumer } from '$lib/server/httpConsumers';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.search;
  const response = await EmployeeConsumer.getEmployeeCollection(query);
  return new Response(JSON.stringify(response));
};
