<script lang="ts">
  import { SeoHead, ListTable } from '$lib/components';
  import type { CustomerResponse } from '$lib/shared/responses';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

{#snippet row(customer: CustomerResponse)}
  <td class="link link-primary">
    <a href="/customers/{customer.customerid}">
      {customer.companyname}
    </a>
  </td>
  <td>{customer.contactname}</td>
  <td>{customer.contacttitle}</td>
  <td>{customer.city || '-'}</td>
  <td>{customer.country || '-'}</td>
{/snippet}

<SeoHead componentData={data.seoData} />
<ListTable
  data={data.customers}
  title="Customers"
  header={['Company', 'Contact', 'Title', 'City', 'Country']}
  {row}
/>
