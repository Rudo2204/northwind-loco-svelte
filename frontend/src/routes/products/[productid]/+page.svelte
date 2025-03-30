<script lang="ts">
  import { ShoppingCartIcon } from '$lib/components/icons';
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  import type { SupplierResponse } from '$lib/shared/responses';
  const { data }: { data: PageData } = $props();
  const product = $derived(data.product);
  const supplier: SupplierResponse = $derived(data.supplier);
</script>

<SeoHead componentData={data.seoData} />
<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    <h2 class="card-title">
      <ShoppingCartIcon />
      Product Information
    </h2>
    <div class="divider m-0"></div>
    <div class="grid grid-cols-2 grid-rows-4 gap-3">
      <div><span class="font-bold">Product Name</span><br />{product.productname}</div>
      <div><span class="font-bold">Units In Stock</span><br />{product.unitsinstock}</div>

      <div>
        <span class="font-bold">Supplier</span><br />
        <a class="link link-primary" href="/suppliers/{product.supplierid}">
          {supplier.companyname}
        </a>
      </div>
      <div><span class="font-bold">Units In Order</span><br />{product.unitsonorder}</div>

      <div><span class="font-bold">Quantity Per Unit</span><br />{product.quantityperunit}</div>
      <div><span class="font-bold">Reorder Level</span><br />{product.reorderlevel}</div>

      <div><span class="font-bold">Unit Price</span><br />${product.unitprice}</div>
      <div>
        <span class="font-bold">Discontinued</span><br />{product.discontinued ? 'Yes' : 'No'}
      </div>
    </div>
    <div class="divider m-0"></div>
    <div class="card-actions justify-start">
      <button class="btn btn-primary" onclick={() => window.history.back()}>Go back</button>
    </div>
  </div>
</div>
