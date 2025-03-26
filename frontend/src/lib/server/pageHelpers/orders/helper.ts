import { OrderConsumer, throwOrReturnResults } from '$lib/server/httpConsumers';
import { PaginationQueries } from '$lib/shared/queries';
import type {
  OrderDetailsResponse,
  TransformedOrderResponse,
  TransformedOrderCollectionResponse
} from '$lib/shared/responses';

function calculateDetails(details: OrderDetailsResponse[]) {
  let totalquantity = 0;
  let totalprice = 0;
  let totaldiscount = 0;
  details.forEach((item) => {
    const itemPrice = Number.parseFloat(item.unitprice) * item.quantity;
    totalprice += itemPrice;
    totalquantity += item.quantity;
    totaldiscount += itemPrice * item.discount;
  });
  const totalproducts = details.length;
  return {
    totalprice: totalprice.toFixed(2),
    totalproducts,
    totalquantity,
    totaldiscount
  };
}

export abstract class OrderPageHelper {
  static async getOrder(orderid: string) {
    const response = await new OrderConsumer().getOne(orderid);
    const { data, message } = throwOrReturnResults(response);
    const transformedResponse = {
      ...data,
      ...calculateDetails(data.details)
    } as TransformedOrderResponse;
    return { data: transformedResponse, message };
  }

  static async getOrderCollection(search?: URLSearchParams) {
    const query = PaginationQueries.getPaginationQuery(search);
    const response = await new OrderConsumer().getList(query);
    const { data, message } = throwOrReturnResults(response);

    let transformed: TransformedOrderResponse[] = [];
    data.results.forEach((item) => {
      const calculatedDetails = calculateDetails(item.details);
      transformed.push({
        ...item,
        ...calculatedDetails
      } as TransformedOrderResponse);
    });
    const transformedResponse = {
      results: transformed,
      pagination: data.pagination
    } as TransformedOrderCollectionResponse;

    return { data: transformedResponse, message };
  }
}
