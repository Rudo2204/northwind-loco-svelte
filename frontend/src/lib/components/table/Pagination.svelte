<script lang="ts">
  import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';
  import { SiteOptions } from '$lib/configs/siteOptions';

  // TODO: don't render all of the pages but only something like 1 2 3 ... 4 5 6
  //const maxPaginationPages = 7;
  //const maxPaginationPagesPerSide = 3;
  let rowsPerPageOptions = [5, 10, 15, 25, 50, 100];

  let { paginationData } = $props();
  let currentPerPage = $derived(paginationData.page_size || SiteOptions.pageSize);
  let from = $derived(paginationData.page);
  const currentPageLastItem = paginationData.page + paginationData.page_size;
  let to = $derived(
    currentPageLastItem > paginationData.total_items
      ? paginationData.total_items
      : currentPageLastItem - 1
  );

  function changePageSize(pageSizeOption: number) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page_size', String(pageSizeOption));
    window.location.assign(`${window.location.pathname}?${searchParams.toString()}`);
  }

  function changePage(page: number) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', String(page));
    window.location.assign(`${window.location.pathname}?${searchParams.toString()}`);
  }
</script>

<div class="mt-3">
  Rows per page:

  <div class="dropdown dropdown-start">
    <div tabindex="0" role="button" class="btn m-1">
      {currentPerPage}
      <div class="size-3"><ChevronDownIcon /></div>
    </div>

    <span class="ml-5">
      {from}-{to} of {paginationData.total_items}
    </span>

    <ul class="dropdown-content menu bg-base-100 rounded-box z-1 w-10 p-2 shadow-sm">
      {#each rowsPerPageOptions as option}
        <li>
          <button class="btn btn-ghost" onclick={() => changePageSize(option)}>{option}</button>
        </li>
      {/each}
    </ul>
  </div>

  {#if paginationData.total_pages > 1}
    <div class="join ml-3">
      <button
        disabled={paginationData.page == 1}
        class="btn btn-ghost"
        onclick={() => changePage(paginationData.page - 1)}
      >
        <div class="size-3">
          <ChevronLeftIcon />
        </div>
      </button>
      {#each Array.from({ length: paginationData.total_pages }, (_, i) => i + 1) as page}
        <button
          class={`join-item btn ${page == paginationData.page && 'btn-active'}`}
          onclick={() => changePage(page)}>{page}</button
        >
      {/each}
      <button
        disabled={paginationData.page == paginationData.total_pages}
        class="btn btn-ghost"
        onclick={() => changePage(paginationData.page + 1)}
      >
        <div class="size-3">
          <ChevronRightIcon />
        </div>
      </button>
    </div>
  {/if}
</div>
