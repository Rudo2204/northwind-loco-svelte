<script lang="ts">
  import type { SingleFilterConfig } from '$lib/components';
  import { TrashIcon } from '$lib/components/icons';

  let {
    displayedFilters = $bindable(),
    removeFilter,
    filterItem
  }: {
    displayedFilters: SingleFilterConfig[];
    removeFilter: (id: string) => void;
    filterItem: SingleFilterConfig;
  } = $props();
  $inspect(displayedFilters);

  function handleOperatorChange(event: Event) {
    const filterLabel: string = (event.target as HTMLInputElement).value;
  }
</script>

<div class="flex pr-0 pl-0">
  <input type="text" placeholder={filterItem.source} class="input" disabled />
  <select class="select focus:outline-none" onchange={(event) => handleOperatorChange(event)}>
    <option disabled selected>Operators</option>
    {#each filterItem.operators as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  <div class="flex flex-1"></div>
  <button class="btn btn-circle btn-ghost" onclick={() => removeFilter(filterItem.id)}>
    <TrashIcon />
  </button>
</div>
