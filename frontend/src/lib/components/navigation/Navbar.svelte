<script lang="ts">
  import { ThemeSelect } from '$lib/components';
  import { MagnifyingGlassIcon, ArrowsRightLeftIcon } from '$lib/components/icons';
  import { toast } from 'svelte-sonner';

  let { isSidebarExpanded = $bindable() } = $props();
</script>

<div class="navbar bg-base-300 shadow-sm">
  <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
  <div class={`flex-1 ${isSidebarExpanded ? 'justify-end' : 'justify-center'}`}>
    <button
      class="btn btn-ghost btn-square"
      onclick={() => (isSidebarExpanded = !isSidebarExpanded)}
    >
      <ArrowsRightLeftIcon />
    </button>
  </div>

  <div class="join flex-auto">
    <div>
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered w-80 focus:outline-none"
      />
    </div>
    <button
      class="btn btn-neutral join-item"
      onclick={() => toast.error("This button doesn't work yet.")}
    >
      <MagnifyingGlassIcon />
    </button>
  </div>
  <div class="flex gap-2">
    <ThemeSelect />
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      <ul class="menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>About</a></li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
