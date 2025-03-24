<script lang="ts">
  import { IdentificationIcon } from '$lib/components/icons';
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const employee = $derived(data.employee!);
  const reportsToEmployee = $derived(data.reportsToEmployee);
</script>

<SeoHead componentData={data.seoData} />
<div class="card bg-base-100 border-base-300 w-full border-t shadow-sm">
  <div class="card-body">
    <h2 class="card-title">
      <IdentificationIcon />
      Employee Information
    </h2>
    <div class="divider m-0"></div>
    <div>
      <img
        src={`data:image/png;base64, ${btoa(String.fromCharCode(...employee.photo))}`}
        alt={`${employee.firstname} ${employee.lastname}`}
      />
    </div>
    <div class="grid grid-cols-2 grid-rows-7 gap-3">
      <div><span class="font-bold">Name</span><br />{employee.firstname} {employee.lastname}</div>
      <div><span class="font-bold">City</span><br />{employee.city}</div>

      <div><span class="font-bold">Title</span><br />{employee.title}</div>
      <div><span class="font-bold">Country</span><br />{employee.country}</div>

      <div><span class="font-bold">Title Of Courtesy</span><br />{employee.titleofcourtesy}</div>
      <div><span class="font-bold">Home Phone</span><br />{employee.homephone}</div>

      <div><span class="font-bold">Birth Date</span><br />{employee.birthdate}</div>
      <div><span class="font-bold">Address</span><br />{employee.address}</div>

      <div><span class="font-bold">Hire Date</span><br />{employee.hiredate}</div>

      <div><span class="font-bold">Extension</span><br />{employee.extension}</div>
      <div>
        <span class="font-bold">Reports To</span><br />
        {#if reportsToEmployee}
          <a class="link link-primary" href="/employees/{reportsToEmployee.employeeid}">
            {reportsToEmployee.firstname}
            {reportsToEmployee.lastname}
          </a>
        {:else}
          -
        {/if}
      </div>

      <div><span class="font-bold">Postal Code</span><br />{employee.postalcode}</div>
    </div>
    <div class="w-5/8"><span class="font-bold">Notes</span><br />{employee.notes}</div>
    <div class="divider m-0"></div>
    <div class="card-actions justify-start">
      <button class="btn btn-primary" onclick={() => window.history.back()}>Go back</button>
    </div>
  </div>
</div>
