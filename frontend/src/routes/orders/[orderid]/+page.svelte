<script lang="ts">
  import { format } from 'date-fns';
  import { ShoppingBagIcon } from '$lib/components/icons';
  import { SeoHead } from '$lib/components';
  import type { OrderDetailsResponse } from '$lib/shared/responses';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const order = $derived(data.order);
  const shipper = $derived(data.shipper);
  const productIndex = $derived(data.productIndex);
  const header = ['Product', 'Quantity', 'Order Price', 'Total Price', 'Discount'];
</script>

{#snippet row(details: OrderDetailsResponse)}
  <td class="link link-primary">
    <a href="/products/{details.productid}">
      {productIndex[details.productid]}
    </a>
  </td>
  <td>{details.quantity}</td>
  <td>${details.unitprice}</td>
  <td>${(Number.parseFloat(details.unitprice) * details.quantity).toFixed(2)}</td>
  <td>{details.discount * 100}%</td>
{/snippet}

<SeoHead componentData={data.seoData} />
<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    <h2 class="card-title">
      <ShoppingBagIcon />
      Order Information
    </h2>
    <div class="divider m-0"></div>
    <div class="grid grid-cols-2 grid-rows-8 gap-3">
      <div>
        <span class="font-bold">Customer</span><br />
        <a class="link link-primary" href="/customers/{order.customerid}">
          {order.customerid}
        </a>
      </div>
      <div>
        <span class="font-bold">Order Date</span><br />{format(order.orderdate, 'yyyy-MM-dd')}
      </div>

      <div><span class="font-bold">Ship Name</span><br />{order.shipname}</div>
      <div>
        <span class="font-bold">Required Date</span><br />{format(order.requireddate, 'yyyy-MM-dd')}
      </div>

      <div><span class="font-bold">Total Products</span><br />{order.totalproducts}</div>
      <div>
        <span class="font-bold">Shipped Date</span><br />{order.shippeddate
          ? format(order.shippeddate, 'yyyy-MM-dd')
          : '-'}
      </div>

      <div><span class="font-bold">Total Quantity</span><br />{order.totalquantity}</div>
      <div><span class="font-bold">Ship City</span><br />{order.shipcity}</div>

      <div><span class="font-bold">Total Price</span><br />${order.totalprice}</div>
      <div><span class="font-bold">Ship Region</span><br />{order.shipregion}</div>

      <div>
        <span class="font-bold">Total Discount</span><br />${order.totaldiscount.toFixed(2)}
      </div>
      <div><span class="font-bold">Ship Postal Code</span><br />{order.shippostalcode || '-'}</div>

      <div><span class="font-bold">Ship Via</span><br />{shipper.companyname}</div>
      <div><span class="font-bold">Ship Country</span><br />{order.shipcountry}</div>

      <div><span class="font-bold">Freight</span><br />${order.freight}</div>
    </div>
    <div class="divider m-0"></div>

    <h2 class="card-title">Products In Order</h2>
    <div class="overflow-x-auto">
      <table class="table">
        {#if header}
          <thead class="bg-base-300">
            <tr>
              {#each header as head}
                <th>{head}</th>
              {/each}
            </tr>
          </thead>
        {/if}

        <tbody>
          {#each data.order.details as d}
            <tr class="hover:bg-primary/10">
              {@render row(d)}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="divider m-0"></div>
    <div class="card-actions justify-start">
      <button class="btn btn-primary" onclick={() => window.history.back()}>Go back</button>
    </div>
  </div>
</div>
