import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buildMetadata, articleSchema } from '@/lib/seo';
import { getPostBySlug, getAllSlugs, getRelatedPosts, CATEGORY_STYLES, type BlogSection } from '@/lib/blog';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import { Calendar, Clock, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';

// ─── Static params (SSG) ───────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

// ─── Dynamic metadata ──────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title:       post.title,
    description: post.excerpt,
    slug:        `/blog/${post.slug}`,
    ogImage:     post.ogImage,
    type:        'article',
    publishedTime: post.date,
    keywords:    [post.category.toLowerCase(), 'real estate investing', 'private lending', 'Integrated Capital Solutions'],
  })
}

// ─── Section renderer ──────────────────────────────────────────
function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {

    case 'paragraph':
      return (
        <p className="text-gray-700 leading-[1.85] text-base mb-5.5">
          {section.text}
        </p>
      )

    case 'h2':
      return (
        <h2 className="text-[1.375rem] font-extrabold text-[#0a1628] mt-10 mb-4 leading-tight tracking-[-0.01em]">
          {section.text}
        </h2>
      )

    case 'h3':
      return (
        <h3 className="text-[1.125rem] font-bold text-[#0a1628] mt-8 mb-3 leading-[1.3]">
          {section.text}
        </h3>
      )

    case 'list':
      return (
        <ul className="mb-6 pl-0 list-none flex flex-col gap-2.5">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-base leading-[1.7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a] shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
      )

    case 'callout':
      return (
        <div className="bg-[rgba(200,146,42,0.07)] border border-[rgba(200,146,42,0.25)] border-l-4 border-l-[#c8922a] rounded-r-xl rounded-l-none p-[1.125rem_1.375rem] my-6">
          {section.label && (
            <p className="text-[0.6875rem] font-extrabold tracking-[0.15em] uppercase text-[#c8922a] mb-1.5">
              {section.label}
            </p>
          )}
          <p className="text-[0.9375rem] text-[#0a1628] font-medium leading-[1.65] m-0">
            {section.text}
          </p>
        </div>
      )

    case 'table':
      return (
        <div className="overflow-x-auto mb-7 rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-[0.9rem]">
            {section.headers && (
              <thead>
                <tr className="bg-[#0a1628]">
                  {section.headers.map((h, i) => (
                    <th 
                      key={i} 
                      className="px-4 py-3 text-left text-white font-bold text-[0.8rem] tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, ri) => (
                <tr 
                  key={ri} 
                  className={`${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}
                >
                  {row.map((cell, ci) => (
                    <td 
                      key={ci} 
                      className={`px-4 py-3 ${ci === 0 ? 'text-[#0a1628] font-semibold' : 'text-gray-700'} leading-relaxed align-top`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    default:
      return null
  }
}

// ─── Page ──────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)
  const cat = CATEGORY_STYLES[post.category] ?? { bg: '#f3f4f6', color: '#374151', border: '#e5e7eb' }

  const articleData = articleSchema({
    title:       post.title,
    description: post.excerpt,
    image:       post.ogImage,
    datePublished: post.date,
    author:      post.author,
    url:         `/blog/${post.slug}`,
  })

  return (
    <>
      <SchemaScript schema={articleData} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative section-dark pt-28 pb-14" style={{backgroundImage: `url('${post.ogImage}')`, width: '100%', height: "500px", backgroundSize: 'cover', backgroundPosition: "top"}}>
        <div className="absolute inset-0 bg-linear-to-b from-[#0a1628]/80 to-[#0a1628]/75 h-125" />
        <div className="relative container-wide max-w-215">
          <Breadcrumb items={[{ name: 'Resources', href: '/resources' }, { name: 'Blog', href: '/blog' }, { name: post.title, href: `/blog/${post.slug}` }]} />

          <div className="flex items-center gap-3 mt-6 mb-5 flex-wrap">
            <span 
              className="text-[0.6875rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Calendar size={13} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-[clamp(1.875rem,4vw,2.75rem)] font-black text-white leading-[1.15] mb-5 tracking-[-0.02em]">
            {post.title}
          </h1>

          <p className="text-white/65 text-[1.0625rem] leading-[1.7] max-w-170">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 mt-7 pt-7 border-t border-white/10">
            <div className="w-9 h-9 rounded-full bg-[#c8922a] flex items-center justify-center shrink-0">
              <span className="text-white font-extrabold text-sm">A</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm m-0">{post.author}</p>
              <p className="text-white/45 text-xs m-0">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-wide max-w-215">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16 items-start">

            {/* Article content */}
            <article>
              {post.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}

              {/* Back link */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-medium">
                  <ArrowLeft size={14} /> Back to Blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="sticky top-24 flex flex-col gap-6">

              {/* CTA card */}
              <div className="bg-[#0a1628] rounded-2xl p-6">
                <p className="text-white/45 text-[0.6875rem] font-bold tracking-[0.15em] uppercase mb-3">GET STARTED</p>
                <h3 className="text-white text-base font-bold leading-tight mb-3.5">
                  Ready to fund your next investment property?
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  Get a term sheet within 24 hours. No obligation.
                </p>
                <Link href="/app" className="btn-primary w-full justify-center text-sm">
                  Get an Estimate
                </Link>
                <a href="mailto:info@integratedcapitalsolutionsllc.com" className="block text-center text-white/45 text-xs mt-3.5 hover:text-white/70">
                  or email info@integratedcapitalsolutionsllc.com
                </a>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-[#f7f8fa] border border-gray-200 rounded-2xl p-5">
                  <p className="text-[0.6875rem] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">RELATED ARTICLES</p>
                  <div className="flex flex-col gap-5">
                    {related.map(r => {
                      const rCat = CATEGORY_STYLES[r.category] ?? { bg: '#f3f4f6', color: '#374151', border: '#e5e7eb' }
                      return (
                        <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                          <span 
                            className="text-[0.625rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full inline-block mb-2"
                            style={{ background: rCat.bg, color: rCat.color }}
                          >
                            {r.category}
                          </span>
                          <p className="font-semibold text-[#0a1628] leading-tight mb-1 group-hover:text-[#c8922a] transition-colors">
                            {r.title}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[#c8922a] text-xs font-semibold">
                            Read <ArrowRight size={11} />
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Products quick links */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-[0.6875rem] font-bold tracking-[0.15em] uppercase text-gray-400 mb-4">LOAN PRODUCTS</p>
                <div className="flex flex-col gap-1">
                  {[
                    ['Ground Up Construction', '/ground-up'],
                    ['Fix & Flip', '/fix-flip'],
                    ['DSCR Rental', '/dscr-rental'],
                    ['Bridge Loan', '/bridge-loan'],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[#0a1628] text-sm font-medium hover:bg-gray-50 transition-colors group"
                    >
                      {label}
                      <ChevronRight size={13} className="text-gray-400 group-hover:text-gray-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── More posts ────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-18 bg-[#f7f8fa]">
          <div className="container-wide">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[1.375rem] font-extrabold text-[#0a1628]">Continue Reading</h2>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-[#c8922a] font-bold text-sm hover:underline">
                View All Posts <ArrowRight size={14} />
              </Link>
            </div>

            <div className={`grid gap-6 ${related.length === 1 ? 'grid-cols-1' : related.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
              {related.map(r => {
                const rCat = CATEGORY_STYLES[r.category] ?? { bg: '#f3f4f6', color: '#374151', border: '#e5e7eb' }
                return (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                    <article className="bg-white border border-gray-200 rounded-3xl overflow-hidden h-full transition-all hover:-translate-y-1 hover:shadow-xl">
                      <div className="h-35 bg-linear-to-br from-[#0a1628] to-[#0f2040] relative flex items-center justify-center">
                        <div 
                          className="absolute top-3.5 left-3.5 text-[0.625rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{ background: rCat.bg, color: rCat.color }}
                        >
                          {r.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex gap-3 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} /> {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {r.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#0a1628] leading-tight mb-3 line-clamp-3 group-hover:text-[#c8922a] transition-colors">
                          {r.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {r.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[#c8922a] font-bold text-sm">
                          Read More <ArrowRight size={13} />
                        </span>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="section-dark py-16">
        <div className="container-wide text-center">
          <h2 className="text-white text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3">
            Proven Team. Trusted Lending Partner.
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            Get a personalized term sheet within 24 hours. Our team is ready to structure the right loan for your next deal.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/app" className="btn-primary flex items-center gap-2">
              Get an Estimate <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="btn-secondary">Talk to an Expert</Link>
          </div>
        </div>
      </section>
    </>
  )
}