// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/app/'],
      },
    ],
    // sitemap: 'https://www.integratedcapitalsolutionsllc.com/sitemap.xml',
    host: 'https://www.integratedcapitalsolutionsllc.com',
  };
}