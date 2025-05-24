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
  <select class="select w-20 focus:outline-none" onchange={(event) => handleOperatorChange(event)}>
    <option disabled selected>Op</option>
    {#each filterItem.validOperators as option}
      <option value={option.operatorLabel}>{option.operatorLabel}</option>
    {/each}
  </select>
  <input type="text" placeholder="Value" class="input" />
  <div class="flex flex-1"></div>
  <button class="btn btn-circle btn-ghost" onclick={() => removeFilter(filterItem.id)}>
    <TrashIcon />
  </button>
</div>
