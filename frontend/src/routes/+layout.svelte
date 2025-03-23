<script lang="ts">
  import '../app.css';
  import { Navbar, Sidebar } from '$lib/components';
  import { Toaster } from 'svelte-sonner';

  let { children } = $props();
</script>

<Navbar />
<Toaster richColors position="bottom-center" />
<Sidebar>{@render children()}</Sidebar>
