import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import CTABanner from '@/components/CTABanner';
import { Download, ExternalLink, Mail, HardHat } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Construction Draw - Loan Management & Resources',
  description:
    'Access Integrated Capital Solutions construction loan management tools, download lien waiver forms, budget spreadsheets, and contact our dedicated construction draw team at draws@integratedcapitalsolutionsllc.com.',
  slug: '/construction-draw',
  keywords: [
    'construction draw request',
    'lien waiver form',
    'construction loan management',
    'construction loan portal',
    'Integrated Capital Solutionsconstruction draw',
    'builder draw form download',
  ],
});

const forms = [
  {
    title: 'Conditional Waiver Upon Progress Payment',
    href: 'https://app.box.com/s/zt0hvzq1vy7rio408nubdnibwofcqsjm',
  },
  {
    title: 'Unconditional Waiver Upon Progress Payment',
    href: 'https://app.box.com/s/skd20tjj373pivc4dl4cw7s7rdwoil20',
  },
  {
    title: 'Wire Request Set Up Form',
    href: 'https://app.box.com/s/dykhaktegfaqy80v2of2zy7bkokbwbpn',
  },
  {
    title: 'Borrower Letter of Completion',
    href: 'https://app.box.com/s/0qcqisuh1nr3z5mgk91n5knyocif3f3z',
  },
  {
    title: 'Conditional Waiver Upon Final Payment',
    href: 'https://app.box.com/s/1f16garnrniy92lyxkyb737g4e9u6h18',
  },
  {
    title: 'Unconditional Waiver Upon Final Payment',
    href: 'https://app.box.com/s/2ba21z6vedzzk9ymmlhnp6a37zk7s6dl',
  },
  {
    title: 'Blank Budget Spreadsheet (Excel)',
    href: 'https://app.box.com/s/6gj44h2bgq23yk1e8aml92q7xjk4dtip',
  },
];

export default function ConstructionDrawPage() {
  return (
    <>
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Construction Draw', href: '/construction-draw' },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-4">
            Dedicated Support for Your Construction Loan Needs
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Access essential resources, forms, and expert assistance to streamline your construction
            financing journey - all in one place.
          </p>
        </div>
      </section>

      {/* Loan Portal Access */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">MANAGE YOUR LOAN</span>
              <h2 className="text-3xl font-bold text-[#0a1628] mb-4">
                Quick Access to Your Construction Loan
              </h2>
              <div className="divider" />
              <p className="text-[#4a5568] leading-relaxed mb-3">
                Log in to manage your loan, check your progress, and stay on top of payments and
                disbursements with ease.
              </p>
              <p className="text-sm text-[#9aa3b2] mb-8">
                You will be directed to our secure portal partnered with Trustpoint to create your
                draw submissions.
              </p>
              
                <a href="https://partner.trustpoint.ai/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Access Construction Loan Portal <ExternalLink size={14} />
              </a>
            </div>
            <div className="bg-[#0f2040] rounded-2xl p-8 flex flex-col gap-4 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[#c8922a]/15 flex items-center justify-center">
                <HardHat size={22} className="text-[#c8922a]" />
              </div>
              <h3 className="text-white font-bold text-lg">Trustpoint Portal Features</h3>
              <ul className="flex flex-col gap-2">
                {[
                  'Submit draw requests online',
                  'Upload inspection reports',
                  'Track disbursement status',
                  'View loan balance and history',
                  'Manage construction milestones',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8922a] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Download Forms */}
      <section className="section-light py-16" aria-label="Construction loan forms">
        <div className="container-wide">
          <span className="section-label">ESSENTIAL RESOURCES</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-3">
            Download Construction Loan Forms
          </h2>
          <p className="text-[#4a5568] mb-10 max-w-xl">
            We&apos;ve compiled all the documents and publications you need in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mb-8">
            {forms.map((form) => (
              
               <a key={form.title}
                href={form.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#e8eaef] rounded-xl px-5 py-4 flex items-center justify-between gap-4 hover:border-[#c8922a] hover:shadow-md transition-all group"
              >
                <span className="text-sm font-semibold text-[#0a1628] group-hover:text-[#c8922a] transition-colors">
                  {form.title}
                </span>
                <Download size={16} className="text-[#9aa3b2] group-hover:text-[#c8922a] flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>

          
            <a href="https://app.box.com/s/oykkjz1uhbg3iu8e0kjxy9jdynvcxqgr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download size={16} /> Download All Forms
          </a>
        </div>
      </section>

      {/* Talk to Expert */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="section-label">TALK TO AN EXPERT</span>
            <h2 className="text-3xl font-bold text-[#0a1628] mb-4">
              Get Help from Our Construction Team
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-8">
              For all questions and general inquiries, our dedicated construction loan specialists are
              here to answer your questions and provide personalized support. Reach out directly via email
              and expect a response within one business day.
            </p>
            <a
              href="mailto:draws@integratedcapitalsolutionsllc.com"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail size={16} /> draws@integratedcapitalsolutionsllc.com
            </a>
          </div>
        </div>
      </section>

      <CTABanner
        title="Proven Team. Trusted Lending Partner."
        subtitle="With extensive industry expertise and an unwavering commitment to service, our team has successfully partnered with thousands of real estate investors on projects nationwide."
        primaryLabel="Get an Estimate"
        primaryHref="/app"
      />
    </>
  );
}