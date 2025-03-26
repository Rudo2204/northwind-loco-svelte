<script lang="ts">
  import { ShoppingBagIcon } from '$lib/components/icons';
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const order = $derived(data.order);
</script>

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
      <div><span class="font-bold">Order Date</span><br />{order.orderdate}</div>

      <div><span class="font-bold">Ship Name</span><br />{order.shipname}</div>
      <div><span class="font-bold">Required Date</span><br />{order.requireddate}</div>

      <div><span class="font-bold">Total Products</span><br />{order.totalproducts}</div>
      <div><span class="font-bold">Shipped Date</span><br />{order.shippeddate || '-'}</div>

      <div><span class="font-bold">Total Quantity</span><br />{order.totalquantity}</div>
      <div><span class="font-bold">Ship City</span><br />{order.shipcity}</div>

      <div><span class="font-bold">Total Price</span><br />${order.totalprice}</div>
      <div><span class="font-bold">Ship Region</span><br />{order.shipregion}</div>

      <div>
        <span class="font-bold">Total Discount</span><br />${order.totaldiscount.toFixed(2)}
      </div>
      <div><span class="font-bold">Ship Postal Code</span><br />{order.shippostalcode || '-'}</div>

      <div><span class="font-bold">Ship Via</span><br />TODO {order.shipvia}</div>
      <div><span class="font-bold">Ship Country</span><br />{order.shipcountry}</div>

      <div><span class="font-bold">Freight</span><br />${order.freight}</div>
    </div>
    <div class="divider m-0"></div>
    <div class="card-actions justify-start">
      <button class="btn btn-primary" onclick={() => window.history.back()}>Go back</button>
    </div>
  </div>
</div>
