<script lang="ts">
  import type { FiltersConfig, SingleFilterConfig } from '$lib/components';
  import { v4 as uuidv4 } from 'uuid';
  import findIndex from 'lodash/findIndex';

  let {
    displayedFilters = $bindable(),
    filterItem,
    possibleFilters,
    filters
  }: {
    displayedFilters: SingleFilterConfig[];
    filterItem: SingleFilterConfig;
    possibleFilters: string[];
    filters: FiltersConfig;
  } = $props();

  function replacePlaceholderFilter(event: Event) {
    const filterLabel: string = (event.target as HTMLInputElement).value;
    let newFilter = filters[filterLabel];
    const index = findIndex(displayedFilters, ['id', filterItem.id]);
    newFilter.id = uuidv4();
    displayedFilters[index] = newFilter;
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
