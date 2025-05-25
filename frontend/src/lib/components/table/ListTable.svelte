<script lang="ts" generics="T">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import type { Snippet } from 'svelte';
  import type { BaseCollectionResponse } from '$lib/shared/responses';
  import type { FiltersConfig, SingleFilterConfig } from '$lib/components';
  import { getPaginationUrlParams } from '$lib/shared/queries';
  import Table from './Table.svelte';
  import { FunnelIcon } from '$lib/components/icons';
  import {
    placeholderFilter,
    PlaceholderFilter,
    BooleanFilter,
    NumberFilter,
    StringFilter
  } from '$lib/components/filters';
  import remove from 'lodash/remove';
  import queryString from 'query-string';

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

  function removeFilter(id: string) {
    remove(displayedFilters, ['id', id]);
  }

  function applyFilter() {
    let searchParams = page.url.searchParams;
    const paginationParams = getPaginationUrlParams(searchParams);
    const qs = Object.create(null);

    for (const filt of $state.snapshot(displayedFilters)) {
      if (filt.filterType === 'placeholder') {
        continue;
      }

      if (filt.filterType === 'boolean') {
        qs[filt.source] = filt.value;
      } else {
        if (!filt.operator) {
          continue;
        }
        qs[`${filt.source}_${filt.operator}`] = String(filt.value);
      }
    }

    qs['page'] = String(paginationParams.page);
    qs['page_size'] = String(paginationParams.pageSize);
    const href = `${page.url.pathname}?${queryString.stringify(qs)}`;
    goto(href, { invalidateAll: true });
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
        <details class="dropdown dropdown-end">
          <summary class="btn btn-primary m-1">
            <FunnelIcon />
            Filters
          </summary>

          <ul class="dropdown-content menu bg-base-100 rounded-box z-1 w-96 p-2 shadow-sm">
            {#each displayedFilters as item}
              <li>
                {#if item.filterType == 'placeholder'}
                  <PlaceholderFilter
                    bind:displayedFilters
                    filterItem={item}
                    {filters}
                    {possibleFilters}
                  />
                {:else if item.filterType === 'boolean'}
                  <BooleanFilter bind:displayedFilters {removeFilter} filterItem={item} />
                {:else if item.filterType === 'string'}
                  <StringFilter bind:displayedFilters {removeFilter} filterItem={item} />
                {:else if item.filterType === 'number'}
                  <NumberFilter bind:displayedFilters {removeFilter} filterItem={item} />
                {:else}
                  <h3>Unconfigured filter</h3>
                {/if}
              </li>
            {/each}
            <div class="flex pt-2">
              <button class="btn" onclick={() => addPlaceholderFilter()}> Add Filter </button>
              <div class="flex flex-1"></div>
              <button class="btn flex justify-end" onclick={applyFilter}>Apply</button>
            </div>
          </ul>
        </details>
      {/if}
    </div>
  </div>

  <Table {data} {header} {row} />
</div>
