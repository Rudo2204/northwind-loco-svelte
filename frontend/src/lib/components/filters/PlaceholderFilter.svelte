<script lang="ts">
  import type { FiltersConfig, SingleFilterConfig } from '$lib/components';
  let {
    displayedFilters = $bindable(),
    possibleFilters,
    filters
  }: {
    displayedFilters: SingleFilterConfig[];
    possibleFilters: string[];
    filters: FiltersConfig;
  } = $props();

  function replacePlaceholderFilter(event: Event) {
    const filterLabel: string = (event.target as HTMLInputElement).value;
    displayedFilters.pop();
    displayedFilters.push(filters[filterLabel]);
  }
</script>

<div class="flex p-0">
  <select class="select focus:outline-none" onchange={(event) => replacePlaceholderFilter(event)}>
    <option disabled selected>Source</option>
    {#each possibleFilters as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  <input type="text" placeholder="Operator" class="input" disabled />
  <input type="text" placeholder="Value" class="input" disabled />
</div>
