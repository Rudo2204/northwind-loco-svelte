import { PUBLIC_OG_IMAGE, PUBLIC_OG_TITLE } from '$env/static/public';

export class SeoDataDto {
  metaTitle?: string | undefined | null;
  metaDescription?: string | undefined | null;
  metaUrl?: string | undefined | null;
  metaCanonicalUrl?: string | undefined | null;
  openGraphImage?: string | undefined | null;
  article: boolean = false;
  useCanonical: boolean = true;
  constructor(
    metaDescription?: string | undefined | null,
    metaUrl?: string | undefined | null,
    metaCanonicalUrl?: string | undefined | null,
    metaTitle?: string | undefined | null,
    openGraphImage?: string | undefined | null,
    article?: boolean | undefined | null,
    useCanonical?: boolean | undefined | null
  ) {
    this.metaDescription = metaDescription;
    this.metaUrl = metaUrl;
    this.metaCanonicalUrl = metaCanonicalUrl;
    this.metaTitle = metaTitle ?? PUBLIC_OG_TITLE;
    this.openGraphImage = openGraphImage ?? PUBLIC_OG_IMAGE;
    this.article = article ?? false;
    this.useCanonical = useCanonical ?? true;
  }
}
