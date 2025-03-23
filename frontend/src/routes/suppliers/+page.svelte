<script lang="ts">
  import { SeoHead, Table } from '$lib/components';
  import type { SupplierResponse } from '$lib/shared/responses';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

{#snippet row(supplier: SupplierResponse)}
  <td class="link link-primary">
    <a href="/suppliers/{supplier.supplierid}">
      {supplier.companyname}
    </a>
  </td>
  <td>{supplier.contactname}</td>
  <td>{supplier.contacttitle}</td>
  <td>{supplier.city}</td>
  <td>{supplier.country}</td>{/snippet}

<SeoHead componentData={data.seoData} />
<Table data={data.suppliers} header={['company', 'contact', 'title', 'city', 'country']} {row} />
