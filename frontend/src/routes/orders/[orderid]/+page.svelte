<script lang="ts">
  import { IdentificationIcon } from '$lib/components/icons';
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const order = $derived(data.order);
</script>

<SeoHead componentData={data.seoData} />
<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    <h2 class="card-title">
      <IdentificationIcon />
      Order Information
    </h2>
    <div class="divider m-0"></div>
    <div class="grid grid-cols-2 grid-rows-2 gap-3">
      <div><span class="font-bold">Customer</span><br />TODO {order.customerid}</div>
      <div><span class="font-bold">Order Date</span><br />{order.orderdate}</div>

      <div><span class="font-bold">Ship Name</span><br />{order.shipname}</div>
      <div><span class="font-bold">Required Date</span><br />{order.requireddate}</div>
    </div>
    <div class="divider m-0"></div>
    <div class="card-actions justify-start">
      <button class="btn btn-primary" onclick={() => window.history.back()}>Go back</button>
    </div>
  </div>
</div>
