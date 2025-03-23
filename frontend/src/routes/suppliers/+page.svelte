<script lang="ts">
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

<SeoHead componentData={data.seoData} />
<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Title</th>
        <th>City</th>
        <th>Country</th>
      </tr>
    </thead>
    <tbody>
      {#each data.suppliers!.results as supplier}
        <tr>
          <td class="hrefa">
            <a href="/suppliers/{supplier.supplierid}">
              {supplier.companyname}
            </a>
          </td>
          <td>{supplier.contactname}</td>
          <td>{supplier.contacttitle}</td>
          <td>{supplier.city}</td>
          <td>{supplier.country}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
