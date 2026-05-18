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
    sitemap: 'https://www.archwestcapital.com/sitemap.xml',
    host: 'https://www.archwestcapital.com',
  };
}