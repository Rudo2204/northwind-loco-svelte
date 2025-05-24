<script lang="ts">
  import type { SingleFilterConfig } from '$lib/components';
  import { TrashIcon } from '$lib/components/icons';
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

  function toggleBoolean(event: Event) {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    const index = findIndex(displayedFilters, ['id', filterItem.id]);
    displayedFilters[index] = { ...filterItem, value: checked };
  }
</script>

<div class="flex pr-0 pl-0">
  <input type="text" placeholder={filterItem.source} class="input" disabled />
  <input type="checkbox" class="toggle" onchange={(event) => toggleBoolean(event)} />
  <div class="flex flex-1"></div>
  <button class="btn btn-circle btn-ghost" onclick={() => removeFilter(filterItem.id)}>
    <TrashIcon />
  </button>
</div>
