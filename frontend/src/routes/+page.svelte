<script lang="ts">
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

<SeoHead componentData={data.seoData} />
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<button class="btn">Neutral</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-link">Link</button>
<h1 class="text-3xl font-bold italic underline">Hello world!</h1>
