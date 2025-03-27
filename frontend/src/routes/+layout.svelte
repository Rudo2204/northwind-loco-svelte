<script lang="ts">
  import '../app.css';
  import { Navbar, Sidebar } from '$lib/components';
  import { Toaster } from 'svelte-sonner';

  let { children } = $props();
  let isSidebarExpanded = $state(true);
</script>

<Toaster richColors position="bottom-center" />
<Sidebar {isSidebarExpanded}>
  <Navbar bind:isSidebarExpanded />
  <div class="m-12">
    {@render children()}
  </div>
</Sidebar>
