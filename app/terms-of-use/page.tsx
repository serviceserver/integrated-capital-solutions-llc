import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms of Use for Integrated Capital Solutions website and services.',
  slug: '/terms-of-use',
  noindex: true,
});

export default function TermsPage() {
  return (
    <>
      <section className="section-dark pt-28 pb-10">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'Terms of Use', href: '/terms-of-use' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-5">Terms of Use</h1>
          <p className="text-white/50 text-sm mt-2">Last updated: January 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide sm:max-w-3xl prose prose-sm max-w-none">
          <div className="flex flex-col gap-8 text-[#4a5568] text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-[#0a1628] mb-3">Acceptance of Terms</h2>
              <p>By accessing and using the Integrated Capital Solutions website (integratedcapitalsolutionsllc.vercel.app), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628] mb-3">Use of Website</h2>
              <p>This website is provided for informational purposes only. The information contained herein does not constitute an offer to lend. All loan applications are subject to underwriting approval. Loan product availability may vary by state.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628] mb-3">No Legal or Financial Advice</h2>
              <p>The content on this website is provided for general informational purposes only and does not constitute legal, financial, tax, or investment advice. You should consult with appropriate professionals before making any financial decisions.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628] mb-3">Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, images, and software, is the property of Integrated Capital Solutions or its content suppliers and is protected by applicable intellectual property laws.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628] mb-3">Limitation of Liability</h2>
              <p>Integrated Capital Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or its content.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628] mb-3">Contact</h2>
              <p>If you have questions about these terms, please contact us at 2175 Hunting Valley lane, Streetsboro, OH, 44241 or email info@integratedcapitalsolutionsllc.vercel.app.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}