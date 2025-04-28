<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import type { BaseCollectionResponse } from '$lib/shared/responses';
  import type { FiltersConfig, SingleFilterConfig } from '$lib/components';
  import Table from './Table.svelte';
  import { FunnelIcon } from '$lib/components/icons';
  import { placeholderFilter } from '$lib/components/filters';
  import PlaceholderFilter from '../filters/PlaceholderFilter.svelte';

  let {
    data,
    title,
    header,
    row,
    filters
  }: {
    data: BaseCollectionResponse<T>;
    title: string;
    header: string[];
    row: Snippet<[T]>;
    filters?: FiltersConfig;
  } = $props();

  let displayedFilters: SingleFilterConfig[] = $state([]);
  let possibleFilters: string[] = $derived(
    filters ? Object.entries(filters).map(([key, _value]) => key) : []
  );

  function addPlaceholderFilter() {
    displayedFilters.push(placeholderFilter());
  }
</script>

<div class="card bg-base-100 w-full shadow-sm">
  <div class="card-body">
    <div class="flex">
      {#if title}
        <h2 class="card-title">{title}</h2>
      {/if}
      <div class="flex flex-1"></div>
      {#if filters}
        <div class="dropdown dropdown-bottom dropdown-end">
          <div tabindex="0" role="button" class="card-title btn btn-ghost flex justify-end">
            <FunnelIcon />
            Filters
          </div>

          <div class="dropdown-content menu bg-base-100 rounded-box z-1 w-100 shadow-sm">
            <ul>
              {#each displayedFilters as item}
                <li>
                  {#if item.filterType == 'placeholder'}
                    <PlaceholderFilter bind:displayedFilters {filters} {possibleFilters} />
                  {:else}
                    <div>foobar</div>
                  {/if}
                </li>
              {/each}
            </ul>

            <div class="flex pt-2">
              <button class="btn" onclick={() => addPlaceholderFilter()}> Add Filter </button>
              <div class="flex flex-1"></div>
              <div role="button" class="btn flex justify-end">Apply</div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <Table {data} {header} {row} />
</div>
