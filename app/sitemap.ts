import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.integratedcapitalsolutionsllc.com';

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/team', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/resources', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/glossary', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/bridge-loan', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/fix-flip', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ground-up', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/dscr-rental', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/construction-draw', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/lending-locations', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/brokers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-use', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = [];

  return [...staticEntries, ...blogEntries];
}
