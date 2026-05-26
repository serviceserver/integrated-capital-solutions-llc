import type { Metadata } from 'next';
import Link from 'next/link';
import CareersForm from '@/components/CareersForm';
import CTABanner from '@/components/CTABanner';
import Breadcrumb from '@/components/Breadcrumb';
import { buildMetadata } from '@/lib/seo';
import { MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = buildMetadata({
  title: 'Careers at Integrated Capital Solutions — Join Our Team',
  description: 'Explore career opportunities at Integrated Capital Solutions across loan operations, underwriting, closing, and sales. Based in Irvine, CA.',
  slug: '/careers',
  keywords: ['Integrated Capital Solutions careers', 'private lending jobs', 'mortgage jobs Irvine CA'],
});

const openRoles = [
  { title: 'Account Executive',      type: 'Full-time', location: 'Remote',                 linkedIn: 'https://www.linkedin.com/company/Integrated Capital Solutions-capital/jobs/' },
  { title: 'Loan Closing Associate', type: 'Full-time', location: 'In Office — Irvine, CA', linkedIn: 'https://www.linkedin.com/company/Integrated Capital Solutions-capital/jobs/' },
  { title: 'Loan Processor',         type: 'Full-time', location: 'In Office — Irvine, CA', linkedIn: 'https://www.linkedin.com/company/Integrated Capital Solutions-capital/jobs/' },
  { title: 'Loan Underwriter',       type: 'Full-time', location: 'In Office — Irvine, CA', linkedIn: 'https://www.linkedin.com/company/Integrated Capital Solutions-capital/jobs/' },
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

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'About', href: '/about' }, { name: 'Careers', href: '/careers' }]} />

          {/* Sub-nav */}
          <div className="flex flex-wrap gap-2 mt-5 mb-6">
            {([['About', '/about'], ['Team', '/team'], ['Careers', '/careers']] as [string, string][]).map(([l, h]) => (
              <Link key={h} href={h}
                className={`text-[0.8125rem] font-semibold px-4 py-1.5 rounded-full border transition-all ${
                  h === '/careers'
                    ? 'bg-[#c8922a] border-[#c8922a] text-white'
                    : 'border-white/30 text-white/65 hover:text-white hover:border-white/60'
                }`}
              >
                {l}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
            Careers at Integrated Capital Solutions
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">
            We&apos;re looking for ambitious, diligent, and passionate individuals. We hire for
            attitude and aptitude and care about growing your career.
          </p>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <span className="section-label">OPEN ROLES</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Current Opportunities</h2>

           <div className="flex flex-col gap-3 max-w-3xl">
             {openRoles.map((role, index) => (
               <article
                 key={role.title}
                 className="bg-white border border-[#e8eaef] rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
               >
                 <div>
                   <h3 className="font-bold text-[#0a1628] text-base mb-2">{role.title}</h3>
                   <div className="flex flex-wrap gap-4">
                     <span className="flex items-center gap-1.5 text-sm text-[#4a5568]">
                       <Briefcase size={12} className="text-[#c8922a]" /> {role.type}
                     </span>
                     <span className="flex items-center gap-1.5 text-sm text-[#4a5568]">
                       <MapPin size={12} className="text-[#c8922a]" /> {role.location}
                     </span>
                   </div>
                 </div>
                 <a
                   href={`/careers?position=${encodeURIComponent(role.title)}#apply-form`}
                   className="btn-primary text-sm py-2 px-5 flex-shrink-0 flex items-center gap-1.5"
                 >
                   Apply for {role.title} <ExternalLink size={12} />
                 </a>
               </article>
             ))}
           </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-light py-20">
        <div className="container-wide">
          <span className="section-label">BENEFITS</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">What We Offer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {benefits.map(b => (
              <div
                key={b}
                className="bg-white border border-[#e8eaef] rounded-xl p-4 text-sm font-medium text-[#0a1628] text-center leading-snug"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Application form */}
        <section id="apply-form" className="py-20 bg-white">
         <div className="container-wide max-w-2xl">
           <span className="section-label">APPLY</span>
           <h2 className="text-3xl font-bold text-[#0a1628] mb-2">Submit Your Application</h2>
           <p className="text-[#4a5568] mb-10 leading-relaxed">
             Don&apos;t see the right role listed? Send us your details and we&apos;ll keep you in
             mind for future openings that match your background.
           </p>
           <Suspense fallback={<div>Loading application form...</div>}>
             <CareersForm />
           </Suspense>
         </div>
       </section>

      <CTABanner
        title="Get to Know Our Team First"
        subtitle="Read about the people and culture behind Integrated Capital Solutions before you apply."
        primaryLabel="Meet the Team"
        primaryHref="/team"
        dark={false}
      />
    </>
  );
}