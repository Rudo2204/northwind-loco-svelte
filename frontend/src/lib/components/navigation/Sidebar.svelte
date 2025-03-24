<script lang="ts">
  import {
    ArrowLongLeftIcon,
    Bar3Icon,
    HomeIcon,
    IdentificationIcon,
    InboxStackIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    UsersIcon
  } from '../icons';
  import { page } from '$app/state';

  function getActiveClass(pathname: string) {
    return page.url.pathname == pathname ? 'btn-active' : '';
  }

  let isSidebarExpanded = $state(true);
  let { children } = $props();
</script>

<div class="drawer drawer-open">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    {@render children()}
  </div>
  <div>
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class={`menu text-base-content p-4 ${isSidebarExpanded ? 'w-60' : ''}`}>
      <div class={`flex ${isSidebarExpanded ? 'justify-end' : 'justify-center'}`}>
        <button
          class="btn btn-ghost btn-square"
          onclick={() => (isSidebarExpanded = !isSidebarExpanded)}
        >
          {#if isSidebarExpanded}
            <ArrowLongLeftIcon />
          {:else}
            <Bar3Icon />
          {/if}
        </button>
      </div>
      <ul>
        <li>
          <a class={`btn btn-ghost justify-start font-medium ${getActiveClass('/')}`} href="/">
            <HomeIcon />
            {#if isSidebarExpanded}
              Home
            {/if}
          </a>
        </li>
        <div class="divider m-0"></div>
        <li>
          <a
            class={`btn btn-ghost justify-start font-medium ${getActiveClass('/suppliers')}`}
            href="/suppliers"
          >
            <InboxStackIcon />
            {#if isSidebarExpanded}
              Suppliers
            {/if}
          </a>
        </li>
        <li>
          <a
            class={`btn btn-ghost justify-start font-medium ${getActiveClass('/products')}`}
            href="/products"
          >
            <ShoppingCartIcon />
            {#if isSidebarExpanded}
              Products
            {/if}
          </a>
        </li>
        <li>
          <a
            class={`btn btn-ghost justify-start font-medium ${getActiveClass('/orders')}`}
            href="/orders"
          >
            <ShoppingBagIcon />
            {#if isSidebarExpanded}
              Orders
            {/if}
          </a>
        </li>
        <li>
          <a
            class={`btn btn-ghost justify-start font-medium ${getActiveClass('/employees')}`}
            href="/employees"
          >
            <IdentificationIcon />
            {#if isSidebarExpanded}
              Employees
            {/if}
          </a>
        </li>
        <li>
          <a
            class={`btn btn-ghost justify-start font-medium ${getActiveClass('/customers')}`}
            href="/customers"
          >
            <UsersIcon />
            {#if isSidebarExpanded}
              Customers
            {/if}
          </a>
        </li>
      </ul>
    </aside>
  </div>
</div>
