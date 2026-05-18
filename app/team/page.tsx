// app/team/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import CTABanner from '@/components/CTABanner';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Leadership Team — Meet the Experts Behind Archwest Capital',
  description:
    'Meet the Archwest Capital leadership team — experienced real estate finance professionals with 25+ years of industry expertise and $10B+ in managed assets.',
  slug: '/team',
  keywords: ['Archwest Capital team', 'real estate lending executives', 'private lender leadership'],
});

const team = [
  {
    name: 'Shawn Miller',
    title: 'Chief Executive Officer',
    bio: 'Formerly a Managing Director at Redwood Trust and founder of 5 Arch Funding Corp., Shawn brings decades of residential real estate finance experience. Under his leadership, 5 Arch grew to fund billions in business purpose loans before its acquisition by Pretium Partners.',
  },
  {
    name: 'Kieran Brady',
    title: 'Chief Financial Officer',
    bio: 'Kieran has served as CFO at X1, Newport Group, and Earnest, and as a Managing Director at Barclays Capital. He brings deep institutional finance expertise and a track record of scaling high-growth financial services companies.',
  },
  {
    name: 'Gene Clark',
    title: 'Chief Legal Officer',
    bio: 'Co-founder of 5 Arch Funding and former Chief Legal Officer at Redwood Trust, Gene has extensive experience structuring and managing complex real estate finance transactions at both the institutional and private market levels.',
  },
  {
    name: 'Timothy Gannaway',
    title: 'Chief Technology Officer',
    bio: 'A former SVP at Redwood Trust and Chief Analytics Officer at 5 Arch, Timothy leads Archwest\'s technology and data strategy, building the infrastructure that enables fast, accurate, and scalable loan decisioning.',
  },
  {
    name: 'Tricia Mitchell',
    title: 'Chief Operating Officer',
    bio: 'Tricia previously served as VP of Legal at 5 Arch and has been with the Archwest founding team since 2012. She oversees operations, compliance, and the day-to-day execution that keeps Archwest running at the highest standard.',
  },
  {
    name: 'Tuan Pham',
    title: 'Chief Marketing Officer',
    bio: 'With 23 years of experience across marketing and brand strategy, Tuan previously served as CMO at Dunmor and CoreVest, and as a Managing Director at Redwood Trust. He leads Archwest\'s go-to-market strategy and brand growth.',
  },
  {
    name: 'Henry Frome',
    title: 'EVP, Corporate Development & Capital Markets',
    bio: 'Henry brings deep capital markets expertise from his time at Eastdil Secured, where he advised on some of the largest real estate transactions in the country. He leads Archwest\'s capital markets and strategic growth initiatives.',
  },
  {
    name: 'Kimberly DiFrancesco Correa',
    title: 'SVP, Construction',
    bio: 'Previously at Genesis Capital, Kimberly leads Archwest\'s construction lending division, overseeing the draw management, underwriting, and relationship management that supports ground-up builders across the country.',
  },
  {
    name: 'Kathy Perez',
    title: 'SVP, Closing',
    bio: 'With over 6 years in business purpose lending and 10 years at First American and ServiceLink, Kathy leads Archwest\'s closing operations — ensuring every transaction closes efficiently, accurately, and on time.',
  },
];

const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Archwest Capital Leadership Team',
  itemListElement: team.map((member, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Person',
      name: member.name,
      jobTitle: member.title,
      worksFor: {
        '@type': 'Organization',
        name: 'Archwest Capital',
        url: 'https://www.integratedcapitalsolutionsllc.com',
      },
      description: member.bio,
    },
  })),
};

export default function TeamPage() {
  return (
    <>
      <SchemaScript schema={teamSchema} />

      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'About', href: '/about' }, { name: 'Team', href: '/team' }]} />
          <div className="flex flex-wrap gap-2 mt-5 mb-6">
            {([['About', '/about'], ['Team', '/team'], ['Careers', '/careers']] as [string, string][]).map(([l, h]) => (
              <Link key={h} href={h}
                className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${h === '/team' ? 'bg-[#c8922a] border-[#c8922a] text-white' : 'border-white/30 text-white/70 hover:text-white hover:border-white/60'}`}>
                {l}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Leadership Team</h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Experienced real estate finance professionals with a shared commitment to speed, transparency,
            and exceptional service for investors nationwide.
          </p>
        </div>
      </section>

      <section className="py-20" aria-label="Leadership team members">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <article key={member.name} className="bg-white rounded-xl border border-[#e8eaef] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-[#0f2040] aspect-[4/3] flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#c8922a]/20 border-2 border-[#c8922a]/40 flex items-center justify-center">
                    <span className="text-[#c8922a] text-2xl font-black">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-[#0a1628] text-lg">{member.name}</h2>
                  <p className="text-[#c8922a] text-xs font-bold uppercase tracking-wider mt-0.5 mb-3">
                    {member.title}
                  </p>
                  <p className="text-sm text-[#4a5568] leading-relaxed">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Build Your Career with Archwest"
        subtitle="We hire for attitude and aptitude. If you're ambitious, diligent, and passionate about real estate finance, we want to meet you."
        primaryLabel="Explore Open Roles"
        primaryHref="/careers"
        dark={true}
      />
    </>
  );
}