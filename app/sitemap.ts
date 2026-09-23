import type { MetadataRoute } from 'next';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog';

const SITE_URL = 'https://www.orguhome.com.tr';

const LEGAL_PAGES = [
  'gizlilik-politikasi',
  'iptal-iade-kosullari',
  'kullanim-kosullari',
  'mesafeli-satis-sozlesmesi',
  'teslimat-ve-kargo',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await Promise.all(getAllBlogSlugs().map(getBlogPost));

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/custom-builder`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    ...posts
      .filter((post) => post !== null)
      .map((post) => {
        const date = new Date(post.date);
        return {
          url: `${SITE_URL}/blog/${post.slug}`,
          lastModified: isNaN(date.getTime()) ? undefined : date,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      }),
    ...LEGAL_PAGES.map((page) => ({
      url: `${SITE_URL}/${page}`,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
  ];
}
