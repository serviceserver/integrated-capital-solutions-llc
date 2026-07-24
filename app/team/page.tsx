// app/team/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import CTABanner from '@/components/CTABanner';
import { buildMetadata } from '@/lib/seo';
import Image from 'next/image';

export const metadata: Metadata = buildMetadata({
  title: 'Leadership Team - Meet the Experts Behind Integrated Capital Solutions',
  description:
    'Meet the Integrated Capital Solutions leadership team - experienced finance professionals with 25+ years of industry expertise and $10B+ in managed assets.',
  slug: '/team',
  keywords: ['Integrated Capital Solutions team', 'real estate lending executives', 'private lender leadership'],
});

const team = [
  {
    name: 'Chad Droeg',
    title: ' Direct Lender | CEO & Head of Operations, Integrated Capital Solutions LLC',
    image:'/chad-droeg.jpg',
    bio: [
      'Chad Droeg is the CEO and Head of Operations at Integrated Capital Solutions LLC, a direct lending firm specializing in business financing, including SBA, conventional, and pre-revenue loans.',
      'As a direct lender with NMLS ID 2291522, Chad is known for his creative structuring and his ability to fund deals that traditional banks often decline. He oversees all lending operations, from initial underwriting to final funding, ensuring a fast, transparent, and results-driven process for clients.',
      'With a strong focus on separating real deals from time wasters, his commitment-based model ensures that serious entrepreneurs receive dedicated resources and a clear path to capital.',
    ],
  },

];

const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Integrated Capital Solutions Leadership Team',
  itemListElement: team.map((member, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Person',
      name: member.name,
      jobTitle: member.title,
      worksFor: {
        '@type': 'Organization',
        name: 'Integrated Capital Solutions',
        url: 'https://www.integratedcapitalsolutionsllc.com',
      },
          image: member.image,
      description: member.bio.join(' '),
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
            Experienced finance professionals with a shared commitment to speed, transparency,
            and exceptional service for investors nationwide.
          </p>
        </div>
      </section>

      <section className="py-20" aria-label="Leadership team members">
        <div className="container-wide flex justify-center items-center">
          <div className="grid grid-cols-1 items-center max-w-2xl">
            {team.map((member) => (
              <article key={member.name} className="bg-white rounded-xl border border-[#e8eaef] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-[#0f2040] aspect-4/3 flex items-center justify-center">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} width={300} height={200} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#c8922a]/20 border-2 border-[#c8922a]/40 flex items-center justify-center">
                      <span className="text-[#c8922a] text-2xl font-black">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-[#0a1628] text-lg">{member.name}</h2>
                  <p className="text-[#c8922a] text-xs font-bold uppercase tracking-wider mt-0.5 mb-3">
                    {member.title}
                  </p>
                  <div className="text-sm text-[#4a5568] leading-relaxed space-y-3">
                    {member.bio.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Build Your Career with Integrated Capital Solutions"
        subtitle="We hire for attitude and aptitude. If you're ambitious, diligent, and passionate about finance, we want to meet you."
        primaryLabel="Explore Open Roles"
        primaryHref="/careers"
        dark={true}
      />
    </>
  );
}