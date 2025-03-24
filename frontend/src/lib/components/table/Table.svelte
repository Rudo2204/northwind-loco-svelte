<script lang="ts">
  import Pagination from './Pagination.svelte';
  let { data, title, header, row } = $props();

  const capitalize = (string: string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';
  };
</script>

<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    {#if title}
      <h2 class="card-title">{title}</h2>
    {/if}

    <div class="border-base-300 overflow-x-auto border-b-1">
      <table class="table">
        {#if header}
          <thead class="bg-base-300">
            <tr>
              {#each header as h}
                <th>{capitalize(h)}</th>
              {/each}
            </tr>
          </thead>
        {/if}

        <tbody>
          {#each data.results as d}
            <tr class="hover:bg-primary/10">
              {@render row(d)}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="flex justify-end">
      <Pagination paginationData={data.pagination} />
    </div>
  </div>
</div>
