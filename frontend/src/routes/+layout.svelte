<script lang="ts">
  import '../app.css';
  import { Navbar, Sidebar } from '$lib/components';
  import { Toaster } from 'svelte-sonner';

  let { children } = $props();
</script>

<Navbar />
<Toaster richColors position="bottom-center" />
<Sidebar>
  <div class="border-base-300 border-l-1">
    <div class="m-12">
      {@render children()}
    </div>
  </div>
</Sidebar>
