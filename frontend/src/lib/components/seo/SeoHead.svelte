<script lang="ts">
  import website from '$lib/configs/website';
  import type { SeoHead } from './seoHead.type';

  const { siteLanguage, siteTitle, author } = website;
  export let componentData: SeoHead;

  const pageTitle = `${componentData?.metaTitle} | ${siteTitle}`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="lang" content={siteLanguage} />
  <meta name="author" content={author} />
  <meta name="description" content={componentData?.metaDescription} />
  <meta
    name="robots"
    content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
  />

  <meta name="og:image" content={componentData?.openGraphImage ?? ''} />
  <meta name="og:description" content={componentData?.metaDescription} />
  <meta name="og:title" content={pageTitle} />
  <meta name="og:url" content={componentData?.metaUrl} />
  <meta name="og:site_name" content={siteTitle} />
  {#if componentData?.useCanonical && componentData?.metaCanonicalUrl}
    <link rel="canonical" href={componentData?.metaCanonicalUrl} />
  {/if}
</svelte:head>
