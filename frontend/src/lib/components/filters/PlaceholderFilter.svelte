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

  function replacePlaceholderFilter(event: MouseEvent, option: string) {
    event.preventDefault();
    displayedFilters.pop();
    displayedFilters.push(filters[option]);
  }
</script>

<div class="flex p-0">
  <select onselect={(event) => event.preventDefault()} class="select focus:outline-none">
    <option disabled selected>Source</option>
    {#each possibleFilters as option}
      <option
        onselect={(event) => event.preventDefault()}
        onclick={(event) => replacePlaceholderFilter(event, option)}>{option}</option
      >
    {/each}
  </select>
  <input type="text" placeholder="Operator" class="input" disabled />
  <input type="text" placeholder="Value" class="input" disabled />
</div>
