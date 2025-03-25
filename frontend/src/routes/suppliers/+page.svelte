<script lang="ts">
  import { SeoHead, ListTable } from '$lib/components';
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
<ListTable
  data={data.suppliers}
  title="Suppliers"
  header={['Company', 'Contact', 'Title', 'City', 'Country']}
  {row}
/>
