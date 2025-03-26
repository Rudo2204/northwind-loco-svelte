<script lang="ts">
  import { UsersIcon } from '$lib/components/icons';
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const customer = $derived(data.customer);
</script>

<SeoHead componentData={data.seoData} />
<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    <h2 class="card-title">
      <UsersIcon />
      Customer Information
    </h2>
    <div class="divider m-0"></div>
    <div class="grid grid-cols-2 grid-rows-5 gap-3">
      <div><span class="font-bold">Company Name</span><br />{customer.companyname}</div>
      <div><span class="font-bold">Postal Code</span><br />{customer.postalcode || '-'}</div>

      <div><span class="font-bold">Contact Name</span><br />{customer.contactname}</div>
      <div><span class="font-bold">Region</span><br />{customer.region || '-'}</div>

      <div><span class="font-bold">Contact Title</span><br />{customer.contacttitle}</div>
      <div><span class="font-bold">Country</span><br />{customer.country}</div>

      <div><span class="font-bold">Address</span><br />{customer.address || '-'}</div>
      <div><span class="font-bold">Phone</span><br />{customer.phone || '-'}</div>

      <div><span class="font-bold">City</span><br />{customer.city || '-'}</div>
      <div><span class="font-bold">Fax</span><br />{customer.fax || '-'}</div>
    </div>
    <div class="divider m-0"></div>
    <div class="card-actions justify-start">
      <button class="btn btn-primary" onclick={() => window.history.back()}>Go back</button>
    </div>
  </div>
</div>
