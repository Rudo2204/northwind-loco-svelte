<script lang="ts">
  import { SeoHead, Table } from '$lib/components';
  import type { EmployeeResponse } from '$lib/shared/responses';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

{#snippet row(employee: EmployeeResponse)}
  <td>
    <div class="flex items-center gap-3">
      <div class="avatar">
        <div class="mask mask-squircle h-12 w-12">
          <img
            src={`data:image/png;base64, ${btoa(String.fromCharCode(...employee.photo))}`}
            alt={`${employee.firstname} ${employee.lastname}`}
          />
        </div>
      </div>
      <a href="/employees/{employee.employeeid}">
        <div>
          <div class="font-bold">{employee.firstname} {employee.lastname}</div>
          <div class="text-sm opacity-50">{employee.city}, {employee.country}</div>
        </div>
      </a>
    </div>
  </td>
  <td>{employee.title}</td>
  <td>{employee.region}</td>
  <td>{employee.homephone}</td>
{/snippet}

<SeoHead componentData={data.seoData} />
<Table
  title="Employees"
  data={data.employees}
  header={['name', 'title', 'region', 'phone']}
  {row}
/>
