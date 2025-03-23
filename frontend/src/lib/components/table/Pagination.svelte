<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';
  import { SiteOptions } from '$lib/configs/siteOptions';

  let rowsPerPageOptions = [5, 10, 15, 25, 50, 100];

  let { paginationData } = $props();
  let goPage = $state(paginationData.page);
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

  // https://github.com/huntabyte/bits-ui/blob/main/packages/bits-ui/src/lib/bits/pagination/pagination.svelte.ts
  function getPageItems(page = 1, totalPages: number, siblingCount = 1) {
    let pageItems: number[] = [];
    const pagesToShow = new Set([1, totalPages]);
    const firstItemWithSiblings = 2 + siblingCount;
    const lastItemWithSiblings = totalPages - 1 - siblingCount;

    if (firstItemWithSiblings > lastItemWithSiblings) {
      for (let i = 2; i <= totalPages - 1; i++) {
        pagesToShow.add(i);
      }
    } else if (page < firstItemWithSiblings) {
      for (let i = 2; i <= Math.min(firstItemWithSiblings, totalPages); i++) {
        pagesToShow.add(i);
      }
    } else if (page > lastItemWithSiblings) {
      for (let i = totalPages - 1; i >= Math.max(lastItemWithSiblings, 2); i--) {
        pagesToShow.add(i);
      }
    } else {
      for (
        let i = Math.max(page - siblingCount, 2);
        i <= Math.min(page + siblingCount, totalPages);
        i++
      ) {
        pagesToShow.add(i);
      }
    }

    function addPage(value: number): void {
      pageItems.push(value);
    }

    function addEllipsis(): void {
      pageItems.push(0);
    }

    let lastNumber = 0;

    for (const p of Array.from(pagesToShow).sort((a, b) => a - b)) {
      if (p - lastNumber > 1) {
        addEllipsis();
      }
      addPage(p);
      lastNumber = p;
    }

    return pageItems;
  }

  function gotoHref(newPage: number = paginationData.page, newPageSize: number = currentPerPage) {
    let searchParams = page.url.searchParams;
    searchParams.set('page_size', String(newPageSize));
    searchParams.set('page', String(newPage));
    const href = `${page.url.pathname}?${searchParams.toString()}`;
    // this is a dumb way to force sveltekit to re-run `load` function of the page
    // without this sometimes it doesn't work because the underlying route does not change (only params change)
    goto(href, { invalidateAll: true });
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
          <button onclick={() => gotoHref(undefined, newPerPageOption)} class="btn btn-ghost">
            {newPerPageOption}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  {#if paginationData.total_pages > 1}
    <div data-sveltekit-reload class="join ml-3">
      <button
        class={`btn btn-ghost ${paginationData.page == 1 && 'btn-disabled'}`}
        onclick={() => gotoHref(paginationData.page - 1)}
      >
        <div class="size-3">
          <ChevronLeftIcon />
        </div>
      </button>
      {#each getPageItems(paginationData.page, paginationData.total_pages) as currentPage}
        {#if currentPage > 0}
          <button
            onclick={() => gotoHref(currentPage, currentPerPage)}
            class={`join-item btn ${currentPage == paginationData.page && 'btn-active'}`}
          >
            {currentPage}
          </button>
        {:else}
          <div class="dropdown dropdown-end animation-none">
            <div tabindex="0" role="button" class="btn animation-none">...</div>
            <ul
              class="dropdown-content menu bg-base-100 rounded-box animation-none z-1 w-48 p-2 shadow-sm"
            >
              <li>
                <div class="join animation-none h-15">
                  <div class="join-item flex-1">
                    <input
                      bind:value={goPage}
                      type="number"
                      class="input validator animation-none focus:outline-none"
                      required
                      placeholder="Page"
                      defaultValue={goPage}
                      min="1"
                      max={paginationData.total_pages}
                      title={`Must be between be 1 to ${paginationData.total_pages}`}
                    />
                  </div>
                  <button onclick={() => gotoHref(goPage)} class="btn btn-neutral join-item">
                    Go
                  </button>
                </div>
              </li>
            </ul>
          </div>
        {/if}
      {/each}

      <button
        onclick={() => gotoHref(paginationData.page + 1)}
        class={`btn btn-ghost ${paginationData.page == paginationData.total_pages && 'btn-disabled'}`}
      >
        <div class="size-3">
          <ChevronRightIcon />
        </div>
      </button>
    </div>
  {/if}
</div>
