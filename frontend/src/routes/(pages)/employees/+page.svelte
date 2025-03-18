<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Region</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {#each data.employees.results as employee}
        <tr>
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
              <a href="/employee/{employee.employeeid}">
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
