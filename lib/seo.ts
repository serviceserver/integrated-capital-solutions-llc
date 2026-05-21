// lib/seo.ts
import type { Metadata } from 'next';

const SITE_URL = 'https://www.integratedcapitalsolutionsllc.vercel.app';
const SITE_NAME = 'Integrated Capital Solutions';
const DEFAULT_DESCRIPTION =
  "Integrated Capital Solutions LLC is a national, direct private lender specializing in fast, flexible financing for experienced residential real estate investors. Ground Up, Fix & Flip, DSCR, and Bridge loans available.";
const DEFAULT_OG_IMAGE = 'https://integratedcapitalsolutionsllc.vercel.app/integrated-capital.png';

export interface SEOProps {
  title: string;
  description: string;
  slug: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata({
  title,
  description,
  slug,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const url = `${SITE_URL}${slug}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'private lender',
      'real estate investment loans',
      'hard money lender',
      'bridge loan',
      'fix and flip loans',
      'ground up construction loans',
      'DSCR rental loans',
      'non-QM loans',
      ...keywords,
    ].join(', '),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      site: '@integratedCapitalSolutions',
    },
    other: {
      'application-name': SITE_NAME,
    },
  };
}

// Structured data (JSON-LD) generators
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    telephone: '+18449222724',
    email: 'info@integratedcapitalsolutionsllc.vercel.app',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '18400 Von Karman Ave., Suite 500',
      addressLocality: 'Irvine',
      addressRegion: 'CA',
      postalCode: '92612',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.linkedin.com/company/Integrated Capital Solutions-capital/',
      'https://www.instagram.com/integratedcapitalsolutionsllc/',
    ],
    areaServed: 'US',
    openingHours: 'Mo-Fr 08:30-17:00',
  };
}

export function loanProductSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      '@type': 'FinancialService',
      name: SITE_NAME,
      url: SITE_URL,
    },
    currency: 'USD',
    areaServed: 'US',
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function articleSchema({
  title,
  description,
  image,
  datePublished,
  author,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  author?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? `${SITE_URL}${image}` : undefined,
    datePublished,
    dateModified: datePublished,
    author: author
      ? { '@type': 'Person', name: author }
      : { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    url: `${SITE_URL}${url}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${url}` },
  } as Record<string, unknown>;
}