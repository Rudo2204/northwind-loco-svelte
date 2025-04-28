<script lang="ts">
  import { SeoHead, ListTable, numberFilter, booleanFilter } from '$lib/components';
  import type { FiltersConfig } from '$lib/components';
  import type { ProductResponse } from '$lib/shared/responses';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const filters: FiltersConfig = {
    unitprice: numberFilter(),
    is_discontinued: booleanFilter()
  };
</script>

{#snippet row(product: ProductResponse)}
  <td class="link link-primary">
    <a href="/products/{product.productid}">
      {product.productname}
    </a>
  </td>
  <td>{product.quantityperunit}</td>
  <td>{product.unitprice}</td>
  <td>{product.unitsinstock}</td>
  <td>{product.unitsonorder}</td>{/snippet}

<SeoHead componentData={data.seoData} />
<ListTable
  data={data.products}
  title="Products"
  header={['Name', 'Qt per unit', 'Price', 'Stock', 'Orders']}
  {row}
  {filters}
/>
