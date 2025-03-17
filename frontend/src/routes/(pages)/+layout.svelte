<script lang="ts">
  import '../../app.css';
  import { Navbar, Sidebar } from '$lib/components';
  let { children } = $props();
</script>

<Navbar />
<Sidebar {children} />
