// app/careers/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import CTABanner from '@/components/CTABanner';
import { buildMetadata } from '@/lib/seo';
import { MapPin, Briefcase, ExternalLink } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Careers at Archwest Capital — Join Our Team',
  description:
    'Explore career opportunities at Archwest Capital. We hire for attitude and aptitude across loan operations, underwriting, closing, sales, and technology. Full benefits, Irvine CA.',
  slug: '/careers',
  keywords: ['Archwest Capital careers', 'private lending jobs', 'mortgage jobs Irvine CA', 'loan officer jobs', 'real estate finance careers'],
});

const openRoles = [
  { title: 'Account Executive', type: 'Full-time', location: 'Remote', linkedIn: '#' },
  { title: 'Loan Closing Associate', type: 'Full-time', location: 'In Office — Irvine, CA', linkedIn: '#' },
  { title: 'Loan Processor', type: 'Full-time', location: 'In Office — Irvine, CA', linkedIn: '#' },
  { title: 'Loan Underwriter', type: 'Full-time', location: 'In Office — Irvine, CA', linkedIn: '#' },
];

const benefits = [
  'Medical, Dental & Vision Insurance',
  'Health Savings Account (HSA)',
  'Short & Long-Term Disability',
  'Life Insurance',
  '401(k) with Employer Match',
  'Flexible Spending Account (FSA)',
  'Employee Referral Bonus',
  'Paid Time Off',
];

const jobPostingSchemas = openRoles.map((role) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: role.title,
  description: `Archwest Capital is hiring a ${role.title}. We hire for attitude and aptitude and care about growing your career in real estate finance.`,
  hiringOrganization: {
    '@type': 'Organization',
    name: 'Archwest Capital',
    sameAs: 'https://www.archwestcapital.com',
  },
  jobLocation: {
    '@type': 'Place',
    address: role.location === 'Remote'
      ? { '@type': 'PostalAddress', addressCountry: 'US' }
      : { '@type': 'PostalAddress', streetAddress: '18400 Von Karman Ave., Suite 500', addressLocality: 'Irvine', addressRegion: 'CA', postalCode: '92612', addressCountry: 'US' },
  },
  employmentType: 'FULL_TIME',
  workHours: role.location === 'Remote' ? 'Remote' : 'On-site',
  datePosted: '2026-01-01',
}));

export default function CareersPage() {
  return (
    <>
      <SchemaScript schema={jobPostingSchemas} />

      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'About', href: '/about' }, { name: 'Careers', href: '/careers' }]} />
          <div className="flex flex-wrap gap-2 mt-5 mb-6">
            {([['About', '/about'], ['Team', '/team'], ['Careers', '/careers']] as [string, string][]).map(([l, h]) => (
              <Link key={h} href={h}
                className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${h === '/careers' ? 'bg-[#c8922a] border-[#c8922a] text-white' : 'border-white/30 text-white/70 hover:text-white hover:border-white/60'}`}>
                {l}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Careers at Archwest Capital
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">
            We&apos;re looking for ambitious, diligent, and passionate individuals. We hire for attitude
            and aptitude and care about growing your career.
          </p>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16" aria-label="Open positions">
        <div className="container-wide">
          <span className="section-label">OPEN ROLES</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Current Opportunities</h2>
          <div className="flex flex-col gap-4 max-w-3xl">
            {openRoles.map((role) => (
              <article key={role.title} className="bg-white border border-[#e8eaef] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-[#0a1628] text-lg mb-2">{role.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-[#4a5568]">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} className="text-[#c8922a]" /> {role.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#c8922a]" /> {role.location}
                    </span>
                  </div>
                </div>
                <a href={role.linkedIn} target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-sm py-2 px-5 flex-shrink-0 flex items-center gap-1.5">
                  Apply on LinkedIn <ExternalLink size={13} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-light py-16" aria-label="Employee benefits">
        <div className="container-wide">
          <span className="section-label">BENEFITS</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">What We Offer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {benefits.map((b) => (
              <div key={b} className="bg-white rounded-xl p-4 border border-[#e8eaef] text-sm font-medium text-[#0a1628] text-center">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline application form */}
      <section className="py-16" aria-label="Application form">
        <div className="container-wide max-w-2xl">
          <span className="section-label">APPLY</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-3">Submit Your Application</h2>
          <p className="text-[#4a5568] mb-8">
            Don&apos;t see the right role listed? Send us your resume and we&apos;ll keep you in mind for future openings.
          </p>
          <form className="flex flex-col gap-4" aria-label="Job application form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className="text-sm font-semibold text-[#0a1628]">First Name *</label>
                <input id="firstName" type="text" required placeholder="John"
                  className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className="text-sm font-semibold text-[#0a1628]">Last Name *</label>
                <input id="lastName" type="text" required placeholder="Smith"
                  className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-[#0a1628]">Email *</label>
              <input id="email" type="email" required placeholder="john@example.com"
                className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-semibold text-[#0a1628]">Phone</label>
              <input id="phone" type="tel" placeholder="(555) 000-0000"
                className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="position" className="text-sm font-semibold text-[#0a1628]">Position Interested In</label>
              <select id="position"
                className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all bg-white">
                <option value="">Select a role</option>
                {openRoles.map((r) => <option key={r.title} value={r.title}>{r.title}</option>)}
                <option value="general">General Application</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="about" className="text-sm font-semibold text-[#0a1628]">Tell us about yourself</label>
              <textarea id="about" rows={4} placeholder="Briefly describe your experience and what you're looking for..."
                className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all resize-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="resume" className="text-sm font-semibold text-[#0a1628]">Resume (PDF or DOC, max 5MB)</label>
              <input id="resume" type="file" accept=".pdf,.doc,.docx"
                className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#0a1628] file:text-white file:text-xs file:font-semibold cursor-pointer" />
            </div>
            <button type="submit" className="btn-primary justify-center py-3 mt-2">Submit Application</button>
          </form>
        </div>
      </section>

      <CTABanner
        title="Get to Know Our Team First"
        subtitle="Read about the people and culture behind Archwest Capital before you apply."
        primaryLabel="Meet the Team"
        primaryHref="/team"
        dark={false}
      />
    </>
  );
}