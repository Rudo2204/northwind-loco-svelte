<script lang="ts">
  import Table from './Table.svelte';
  let { data, title, header, row } = $props();
</script>

<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    {#if title}
      <h2 class="card-title">{title}</h2>
    {/if}
  </div>

  <Table {data} {header} {row} />
</div>
