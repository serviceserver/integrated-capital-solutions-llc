import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Site Map',
  description: 'A complete map of all pages on the Archwest Capital website.',
  slug: '/site-map',
  noindex: true,
});

const sitemap = [
  {
    heading: 'Main',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
      { label: 'Get an Estimate', href: '/app' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Ground Up Construction', href: '/ground-up' },
      { label: 'Fix & Flip', href: '/fix-flip' },
      { label: 'DSCR Rental', href: '/dscr-rental' },
      { label: 'Bridge Loan', href: '/bridge-loan' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Leadership Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Brokers',
    links: [
      { label: 'Broker Program', href: '/brokers' },
      { label: 'Broker Registration', href: '/broker-form' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Resources Hub', href: '/resources' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Lending Locations', href: '/lending-locations' },
      { label: 'Construction Draw', href: '/construction-draw' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Use', href: '/terms-of-use' },
      { label: 'Privacy Notice', href: '/privacy-policy' },
    ],
  },
];

export default function SiteMapPage() {
  const header = React.createElement(
    'section',
    { className: 'section-dark pt-28 pb-14' },
    React.createElement(
      'div',
      { className: 'container-wide' },
      React.createElement('h1', { className: 'text-3xl md:text-4xl font-bold text-white mb-3' }, 'Site Map'),
      React.createElement('p', { className: 'text-white/55 text-base' }, 'A complete directory of all pages on archwestcapital.com.')
    )
  );

  const grid = React.createElement(
    'section',
    { className: 'py-16' },
    React.createElement(
      'div',
      { className: 'container-wide' },
      React.createElement(
        'div',
        { className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8' },
        ...sitemap.map((sec) =>
          React.createElement(
            'div',
            { key: sec.heading },
            React.createElement(
              'h2',
              { className: 'text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-4' },
              sec.heading
            ),
            React.createElement(
              'ul',
              { className: 'flex flex-col gap-2' },
              ...sec.links.map((link) =>
                React.createElement(
                  'li',
                  { key: link.href },
                  React.createElement(
                    Link,
                    { href: link.href, className: 'text-sm text-[#4a5568] hover:text-[#c8922a] transition-colors' },
                    link.label
                  )
                )
              )
            )
          )
        )
      )
    )
  );

  return React.createElement(React.Fragment, null, header, grid);
}