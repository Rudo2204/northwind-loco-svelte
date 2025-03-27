<script lang="ts">
  import Pagination from './Pagination.svelte';
  let { data, header, row } = $props();
</script>

<div>
  <div class="border-base-300 overflow-x-auto border-b-1">
    <table class="table">
      {#if header}
        <thead class="bg-base-300">
          <tr>
            {#each header as head}
              <th>{head}</th>
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

  <div class="mr-3 flex justify-end">
    <Pagination paginationData={data.pagination} />
  </div>
</div>
