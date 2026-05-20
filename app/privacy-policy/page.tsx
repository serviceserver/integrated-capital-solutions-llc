import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Notice',
  description: 'Integrated Capital Solutions Privacy Notice - how we collect, use, and protect your personal information.',
  slug: '/privacy-policy',
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <section className="section-dark pt-28 pb-10">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'Privacy Notice', href: '/privacy-policy' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-5">Privacy Notice</h1>
          <p className="text-white/50 text-sm mt-2">Last updated: January 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-3xl">
          <div className="flex flex-col gap-8 text-[#4a5568] text-sm leading-relaxed">
            {[
              {
                title: 'Information We Collect',
                content: 'We collect information you provide directly to us, such as when you fill out a loan inquiry form, contact us, or register as a broker partner. This may include your name, email address, phone number, company name, and details about your investment activity.',
              },
              {
                title: 'How We Use Your Information',
                content: 'We use the information we collect to process your loan inquiries, communicate with you about your application, send you relevant information about our products and services, improve our website and services, and comply with legal obligations.',
              },
              {
                title: 'Information Sharing',
                content: 'We do not sell, rent, or trade your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations.',
              },
              {
                title: 'Cookies and Tracking',
                content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
              },
              {
                title: 'Data Security',
                content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
              },
              {
                title: 'California Privacy Rights',
                content: 'California residents have specific rights regarding their personal information under the California Consumer Privacy Act (CCPA). For more information about how we handle California resident data, please contact us directly.',
              },
              {
                title: 'Contact Us',
                content: 'If you have any questions about this Privacy Notice or our data practices, please contact us at 2175 Hunting Valley lane, Streetsboro, OH, 44241 or email info@integratedcapitalsolutionsllc.vercel.app.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-bold text-[#0a1628] mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}