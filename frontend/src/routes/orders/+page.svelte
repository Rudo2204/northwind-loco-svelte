<script lang="ts">
  import { SeoHead, ListTable } from '$lib/components';
  import type { OrderResponse } from '$lib/shared/responses';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  //header={['ID', 'Total Price', 'Products', 'Quantity', 'Shipped', 'Ship Name', 'City', 'Country']}
</script>

{#snippet row(order: OrderResponse)}
  <td class="link link-primary">
    <a href="/orders/{order.orderid}">
      {order.orderid}
    </a>
  </td>
  <td>{order.shippeddate || '-'}</td>
  <td>{order.shipname}</td>
  <td>{order.shipcity}</td>
  <td>{order.shipcountry}</td>
{/snippet}

<SeoHead componentData={data.seoData} />
<ListTable
  data={data.orders}
  title="Orders"
  header={['ID', 'Shipped', 'Ship Name', 'City', 'Country']}
  {row}
/>
