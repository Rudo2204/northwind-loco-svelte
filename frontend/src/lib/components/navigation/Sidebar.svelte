<script lang="ts">
  import {
    HomeIcon,
    IdentificationIcon,
    InboxStackIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    UsersIcon
  } from '../icons';
  import { page } from '$app/state';

  function getActiveClass(pathname: string) {
    return page.url.pathname.includes(pathname) ? 'btn-active' : '';
  }

  let { isSidebarExpanded, children } = $props();
</script>

<div class="drawer drawer-open">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    {@render children()}
  </div>
  <div class="drawer-side bg-base-200">
    <aside class={`menu text-base-content p-4 ${isSidebarExpanded ? 'w-60' : ''}`}>
      <ul>
        <li>
          {#if isSidebarExpanded}
            <div class="flex-auto justify-center">
              <div class="text-2xl">
                <a href="/">
                  <span class="font-black">Northwind</span> Traders
                </a>
              </div>
            </div>
          {:else}
            <a
              class={`btn btn-ghost justify-start font-medium ${page.url.pathname == '/' && 'btn-active'}`}
              href="/"
            >
              <HomeIcon />
            </a>
          {/if}
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
