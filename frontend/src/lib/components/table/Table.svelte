<script lang="ts">
  let { data, header, row } = $props();

  const capitalize = (string: string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';
  };
</script>

<div class="overflow-x-auto">
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
      {#each data as d}
        <tr class="hover:bg-primary/10">
          {@render row(d)}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
