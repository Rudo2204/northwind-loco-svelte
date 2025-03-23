<script lang="ts">
  import { page } from '$app/state';
  import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';
  import { SiteOptions } from '$lib/configs/siteOptions';

  // TODO: don't render all of the pages but only something like 1 2 3 ... 4 5 6
  //const maxPaginationPages = 7;
  //const maxPaginationPagesPerSide = 3;
  let rowsPerPageOptions = [5, 10, 15, 25, 50, 100];

  let { paginationData } = $props();
  let currentPerPage = $derived(paginationData.page_size || SiteOptions.pageSize);
  let from = $derived(
    paginationData.page == 1
      ? paginationData.page
      : 1 + paginationData.page_size * (paginationData.page - 1)
  );
  let to = $derived(
    paginationData.page_size * paginationData.page + 1 > paginationData.total_items
      ? paginationData.total_items
      : paginationData.page_size * paginationData.page
  );

  function getHref(
    newPage: number = paginationData.page,
    newPageSize: number = currentPerPage
  ): string {
    let searchParams = page.url.searchParams;
    searchParams.set('page_size', String(newPageSize));
    searchParams.set('page', String(newPage));
    return `${page.url.pathname}?${searchParams.toString()}`;
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
      {#each rowsPerPageOptions as newPerPageOption}
        <li>
          <a href={getHref(undefined, newPerPageOption)} class="btn btn-ghost">
            {newPerPageOption}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  {#if paginationData.total_pages > 1}
    <div class="join ml-3">
      <a
        class={`btn btn-ghost ${paginationData.page == 1 && 'btn-disabled'}`}
        href={getHref(paginationData.page - 1)}
      >
        <div class="size-3">
          <ChevronLeftIcon />
        </div>
      </a>
      {#each Array.from({ length: paginationData.total_pages }, (_, i) => i + 1) as currentPage}
        <a
          href={getHref(currentPage, currentPerPage)}
          class={`join-item btn ${currentPage == paginationData.page && 'btn-active'}`}
        >
          {currentPage}
        </a>
      {/each}

      <a
        href={getHref(paginationData.page + 1)}
        class={`btn btn-ghost ${paginationData.page == paginationData.total_pages && 'btn-disabled'}`}
      >
        <div class="size-3">
          <ChevronRightIcon />
        </div>
      </a>
    </div>
  {/if}
</div>
