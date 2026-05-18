import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import CTABanner from '@/components/CTABanner';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — Real Estate Investment Insights & Lending Tips',
  description:
    'Expert insights, market analysis, and practical guides for residential real estate investors. Stay informed on fix-and-flip strategies, DSCR lending, construction financing, and more.',
  slug: '/blog',
  keywords: [
    'real estate investing blog',
    'fix flip tips',
    'DSCR loan guide',
    'private lending insights',
    'real estate investor resources',
    'construction loan tips',
  ],
});

// Placeholder blog posts — replace with CMS/API data
const posts = [
  {
    slug: 'what-is-dscr-loan',
    title: 'What Is a DSCR Loan and Is It Right for Your Rental Portfolio?',
    excerpt:
      'Debt Service Coverage Ratio loans have become one of the most popular financing tools for buy-and-hold investors. Here\'s everything you need to know before applying.',
    category: 'DSCR Rental',
    date: '2026-04-10',
    readTime: '6 min read',
  },
  {
    slug: 'fix-flip-market-2026',
    title: 'Fix and Flip Market Outlook: What Investors Need to Know in 2026',
    excerpt:
      'Rising inventory and shifting buyer demand are creating new opportunities for renovation investors. Here\'s how to position your strategy for the current market.',
    category: 'Fix & Flip',
    date: '2026-03-28',
    readTime: '8 min read',
  },
  {
    slug: 'ground-up-construction-checklist',
    title: 'Ground-Up Construction Loan Checklist: What to Prepare Before You Apply',
    excerpt:
      'Get approved faster with the right documentation. Our construction lending team shares exactly what underwriters look for in a ground-up loan submission.',
    category: 'Ground Up',
    date: '2026-03-14',
    readTime: '5 min read',
  },
  {
    slug: 'bridge-loan-vs-hard-money',
    title: 'Bridge Loan vs. Hard Money: What\'s the Difference?',
    excerpt:
      'Many investors use these terms interchangeably, but they\'re not the same. Understanding the difference can save you time and thousands of dollars on your next deal.',
    category: 'Bridge Loan',
    date: '2026-02-20',
    readTime: '4 min read',
  },
  {
    slug: 'how-to-scale-rental-portfolio',
    title: 'How to Scale a Rental Portfolio Using DSCR Loans',
    excerpt:
      'No income verification. No limit on properties. Here\'s how experienced investors are using DSCR financing to build and scale portfolios faster than ever.',
    category: 'DSCR Rental',
    date: '2026-02-05',
    readTime: '7 min read',
  },
  {
    slug: 'construction-draw-process-explained',
    title: 'The Construction Draw Process Explained: A Step-by-Step Guide for Builders',
    excerpt:
      'Understanding how construction draws work — and how to submit them correctly — keeps your project funded and on schedule. Here\'s how it works at Archwest.',
    category: 'Ground Up',
    date: '2026-01-22',
    readTime: '6 min read',
  },
];

const categoryColors: Record<string, string> = {
  'DSCR Rental': 'bg-blue-50 text-blue-700 border-blue-200',
  'Fix & Flip': 'bg-orange-50 text-orange-700 border-orange-200',
  'Ground Up': 'bg-green-50 text-green-700 border-green-200',
  'Bridge Loan': 'bg-purple-50 text-purple-700 border-purple-200',
};

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Archwest Capital Blog',
  url: 'https://www.archwestcapital.com/blog',
  description:
    'Expert insights, market analysis, and practical guides for residential real estate investors.',
  publisher: {
    '@type': 'Organization',
    name: 'Archwest Capital',
    url: 'https://www.archwestcapital.com',
  },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    url: `https://www.archwestcapital.com/blog/${p.slug}`,
    datePublished: p.date,
    author: { '@type': 'Organization', name: 'Archwest Capital' },
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
      />

      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'Resources', href: '/resources' }, { name: 'Blog', href: '/blog' }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-4">
            Real Estate Investment Insights
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Expert perspectives, market analysis, and actionable guides to help you invest smarter and
            close more deals.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-[#e8eaef] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {/* Placeholder image */}
                <div className="bg-[#0f2040] aspect-[16/9] flex items-center justify-center">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 text-xs text-[#9aa3b2]">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-bold text-[#0a1628] text-base leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#4a5568] leading-relaxed flex-1">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#c8922a] hover:gap-2.5 transition-all mt-2"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Put Your Knowledge to Work?"
        subtitle="Get an estimate in minutes and our team will reach out with a tailored term sheet within 24 hours."
        primaryLabel="Get an Estimate"
        primaryHref="/app"
        dark={false}
      />
    </>
  );
}