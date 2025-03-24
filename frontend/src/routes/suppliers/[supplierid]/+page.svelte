<script lang="ts">
  import { InboxStackIcon } from '$lib/components/icons';
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const supplier = $derived(data.supplier!);
</script>

<SeoHead componentData={data.seoData} />
<div class="card bg-base-100 border-base-300 w-full border-t shadow-sm">
  <div class="card-body">
    <h2 class="card-title">
      <InboxStackIcon />
      Supplier Information
    </h2>
    <div class="divider m-0"></div>
    <div class="grid grid-cols-2 grid-rows-5 gap-3">
      <div><span class="font-bold">Company Name</span><br />{supplier.companyname}</div>
      <div><span class="font-bold">Postal Code</span><br />{supplier.postalcode}</div>

      <div><span class="font-bold">Contact Name</span><br />{supplier.contactname}</div>
      <div><span class="font-bold">Region</span><br />{supplier.region || '-'}</div>

      <div><span class="font-bold">Contact Title</span><br />{supplier.contacttitle}</div>
      <div><span class="font-bold">Country</span><br />{supplier.country}</div>

      <div><span class="font-bold">Address</span><br />{supplier.address}</div>
      <div><span class="font-bold">Phone</span><br />{supplier.phone}</div>

      <div><span class="font-bold">City</span><br />{supplier.city}</div>
      <div><span class="font-bold">Fax</span><br />{supplier.fax || '-'}</div>
    </div>
    <div class="w-5/8"><span class="font-bold">Homepage</span><br />{supplier.homepage || '-'}</div>
    <div class="divider m-0"></div>
    <div class="card-actions justify-start">
      <button class="btn btn-primary" onclick={() => window.history.back()}>Go back</button>
    </div>
  </div>
</div>
