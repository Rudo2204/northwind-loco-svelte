<script lang="ts">
  import { format } from 'date-fns';
  import { SeoHead, ListTable } from '$lib/components';
  import type { TransformedOrderResponse } from '$lib/shared/responses';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

{#snippet row(order: TransformedOrderResponse)}
  <td class="link link-primary">
    <a href="/orders/{order.orderid}">
      {order.orderid}
    </a>
  </td>
  <td>${order.totalprice}</td>
  <td>{order.totalproducts}</td>
  <td>{order.totalquantity}</td>
  <td>{order.shippeddate ? format(order.shippeddate, 'yyyy-MM-dd') : '-'}</td>
  <td>{order.shipname}</td>
  <td>{order.shipcity}</td>
  <td>{order.shipcountry}</td>
{/snippet}

<SeoHead componentData={data.seoData} />
<ListTable
  data={data.orders}
  title="Orders"
  header={['ID', 'Total Price', 'Products', 'Quantity', 'Shipped', 'Ship Name', 'City', 'Country']}
  {row}
/>
