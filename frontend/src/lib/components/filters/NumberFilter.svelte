<script lang="ts">
  import type { SingleFilterConfig } from '$lib/components';
  import type { NumberOperator } from '$lib/components/filters';
  import { TrashIcon } from '$lib/components/icons';
  import { labelMap } from './config';
  import findIndex from 'lodash/findIndex';

  let {
    displayedFilters = $bindable(),
    removeFilter,
    filterItem
  }: {
    displayedFilters: SingleFilterConfig[];
    removeFilter: (id: string) => void;
    filterItem: SingleFilterConfig;
  } = $props();
  const index = findIndex(displayedFilters, ['id', filterItem.id]);

  function handleOperatorChange(event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    const key = (Object.keys(labelMap) as Array<string>).find((key) => labelMap[key] === value);
    displayedFilters[index] = { ...filterItem, operator: key as NumberOperator };
  }

  function handleValueChange(event: Event) {
    const newValue: string = (event.target as HTMLInputElement).value;
    displayedFilters[index] = { ...filterItem, value: newValue };
  }
</script>

<div class="flex pr-0 pl-0">
  <input type="text" placeholder={filterItem.source} class="input" disabled />
  <select class="select w-20 focus:outline-none" onchange={handleOperatorChange}>
    <option disabled selected>Op</option>
    {#each filterItem.validOperators as option}
      <option value={option.operatorLabel}>{option.operatorLabel}</option>
    {/each}
  </select>
  <input type="text" placeholder="Value" class="input" onchange={handleValueChange} />
  <div class="flex flex-1"></div>
  <button class="btn btn-circle btn-ghost" onclick={() => removeFilter(filterItem.id)}>
    <TrashIcon />
  </button>
</div>
