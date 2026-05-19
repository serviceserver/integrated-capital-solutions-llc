import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';
import Breadcrumb from '@/components/Breadcrumb';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = buildMetadata({
  title: 'Blog - Real Estate Investment Insights & Lending Tips',
  description:
    'Expert insights, market analysis, and practical guides for residential real estate investors. Fix-and-flip strategies, DSCR lending, construction financing, and more.',
  slug: '/blog',
  keywords: [
    'real estate investing blog',
    'fix flip tips',
    'DSCR loan guide',
    'private lending insights',
    'construction loan tips',
  ],
});

// Category pill colours - Tailwind-safe static strings only (no dynamic interpolation)
const CATEGORY_CLASSES: Record<string, { pill: string; dot: string }> = {
  'DSCR Rental': {
    pill: 'bg-blue-50 text-blue-700 border border-blue-200',
    dot:  'bg-blue-500',
  },
  'Fix & Flip': {
    pill: 'bg-orange-50 text-orange-700 border border-orange-200',
    dot:  'bg-orange-500',
  },
  'Ground Up': {
    pill: 'bg-green-50 text-green-700 border border-green-200',
    dot:  'bg-green-600',
  },
  'Bridge Loan': {
    pill: 'bg-purple-50 text-purple-700 border border-purple-200',
    dot:  'bg-purple-600',
  },
}

const DEFAULT_CLASSES = {
  pill: 'bg-gray-100 text-gray-700 border border-gray-200',
  dot:  'bg-gray-400',
}

function CategoryPill({ category }: { category: string }) {
  const cls = CATEGORY_CLASSES[category] ?? DEFAULT_CLASSES
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${cls.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cls.dot}`} />
      {category}
    </span>
  )
}

function DateMeta({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="flex items-center gap-1 text-xs text-[#9aa3b2]">
        <Calendar size={11} />
        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </span>
      <span className="flex items-center gap-1 text-xs text-[#9aa3b2]">
        <Clock size={11} />
        {readTime}
      </span>
    </div>
  )
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Blog', href: '/blog' },
            ]}
          />
          <h1 className="mt-5 mb-3 text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Real Estate Investment Insights
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">
            Expert perspectives, market analysis, and actionable guides to help
            you invest smarter and close more deals.
          </p>
        </div>
      </section>

      {/* ── Posts ─────────────────────────────────────────────── */}
      <section className="section-light py-18">
        <div className="container-wide py-16">

          {/* Featured card */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="block mb-10 group">
              <article className="bg-white rounded-2xl border border-[#e8eaef] overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-shadow duration-200 hover:shadow-2xl">

                {/* Thumbnail */}
                <div className="relative min-h-72 lg:min-h-full bg-gradient-to-br from-[#0a1628] to-[#1a3560] flex items-center justify-center p-10">
                  <span className="text-white/10 text-sm font-medium">Featured Post</span>
                  {/* Category pill - top-left */}
                  <div className="absolute top-5 left-5">
                    <CategoryPill category={featured.category} />
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#c8922a]/10 blur-3xl pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center gap-5">
                  <span className="section-label">Featured Article</span>
                  <DateMeta date={featured.date} readTime={featured.readTime} />
                  <h2 className="text-2xl font-extrabold text-[#0a1628] leading-snug tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="text-[#4a5568] text-[15px] leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#c8922a] font-bold text-sm group-hover:gap-3 transition-all duration-150">
                    Read Article <ArrowRight size={15} />
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Section divider */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#9aa3b2] whitespace-nowrap">
              All Articles
            </h2>
            <div className="flex-1 h-px bg-[#e8eaef]" />
            <span className="text-xs text-[#9aa3b2]">{rest.length} posts</span>
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-xl border border-[#e8eaef] overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1">

                  {/* Card thumbnail */}
                  <div className="relative h-40 bg-linear-to-br from-[#0a1628] to-[#0f2040] shrink-0 flex items-center justify-center">
                    <div className="absolute top-3.5 left-3.5">
                      <CategoryPill category={post.category} />
                    </div>
                     <Image src={post.ogImage} alt={post.title} width={400} height={240} className="object-cover w-full h-full" />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <DateMeta date={post.date} readTime={post.readTime} />

                    <h2 className="text-base font-bold text-[#0a1628] leading-snug group-hover:text-[#c8922a] transition-colors duration-150">
                      {post.title}
                    </h2>

                    <p className="text-[#4a5568] text-[13px] leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-[#c8922a] font-bold text-[13px] mt-1 group-hover:gap-2.5 transition-all duration-150">
                      Read More <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-dark py-16">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Ready to Put Your Knowledge to Work?
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-md mx-auto mb-8">
            Get a term sheet in 24 hours and let our team structure the right
            loan for your next project.
          </p>
          <Link href="/app" className="btn-primary">
            Get an Estimate <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}