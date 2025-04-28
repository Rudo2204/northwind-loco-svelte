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
        <button
          onclick={() => eval('listtable_filter_modal.showModal()')}
          class="card-title btn btn-primary flex justify-end"
        >
          <FunnelIcon />
          Filters
        </button>

        <dialog id="listtable_filter_modal" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
            </form>

            <h3 class="text-lg font-bold">Filters</h3>
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
              <button
                class="btn flex justify-end"
                onclick={() => eval('listtable_filter_modal.close()')}>Apply</button
              >
            </div>
          </div>
        </dialog>
      {/if}
    </div>
  </div>

  <Table {data} {header} {row} />
</div>
