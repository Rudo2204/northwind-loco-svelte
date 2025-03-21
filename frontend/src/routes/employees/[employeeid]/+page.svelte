<script lang="ts">
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const employee = $derived(data.employee!);
  const reportsToEmployee = $derived(data.reportsToEmployee);
</script>

<SeoHead componentData={data.seoData} />
<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    <h2 class="card-title">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        ><g><rect fill="none" height="24" width="24" /></g><g
          ><path
            d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z"
          /></g
        >
      </svg>
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
          <a class="visiteda" href="/employees/{reportsToEmployee.employeeid}">
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
