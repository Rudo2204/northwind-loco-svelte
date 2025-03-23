<script lang="ts">
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

<SeoHead componentData={data.seoData} />
<div class="overflow-x-auto">
  <table class="table">
    <thead class="bg-base-300">
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Region</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {#each data.employees!.results as employee}
        <tr class="hover:bg-primary/10">
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
        </tr>
      {/each}
    </tbody>
  </table>
</div>
