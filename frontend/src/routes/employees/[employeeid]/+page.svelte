<script lang="ts">
  import { SeoHead } from '$lib/components';
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  console.log(data);
</script>

<SeoHead componentData={data.seoData} />
