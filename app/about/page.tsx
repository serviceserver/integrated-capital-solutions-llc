import type { Metadata } from 'next';
import Link from 'next/link';
import ProcessSteps from '@/components/ProcessSteps';
import CTABanner from '@/components/CTABanner';
import { ShieldCheck, Zap, Handshake } from 'lucide-react';

export const metadata: Metadata = { title: 'About Integrated Capital Solutions' };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 mb-6">
            {[['About','/about'],['Team','/team'],['Careers','/careers']].map(([l,h]) => (
              <Link key={h} href={h} className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${h === '/about' ? 'bg-[#c8922a] border-[#c8922a] text-white' : 'border-white/30 text-white/70 hover:text-white hover:border-white/60'}`}>{l}</Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Making Lending Simple with Innovation and Dedication</h1>
          <p className="text-white/65 text-lg max-w-2xl">Driven by technology, transparency, and a commitment to exceptional service, we help real estate investors access capital quicker and with greater confidence.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">OUR MISSION</span>
              <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Close More Loans, Open More Doors</h2>
              <div className="divider" />
              <p className="text-[#4a5568] leading-relaxed mb-4">
                Our mission is to empower investors to secure more loans and create greater opportunities - not just for themselves, but for a market in need of quality housing.
              </p>
              <p className="text-[#4a5568] leading-relaxed">
                In today&apos;'s changing landscape, investors need a trusted lending partner that offers innovative products along with speed and certainty of execution. As one of the fastest-growing companies in private lending, Integrated Capital Solutions is committed to supporting borrowers and broker partners in achieving this shared vision.
              </p>
            </div>
            <div className="bg-[#0f2040] rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                {[{n:'25+',l:'Years in Real Estate Finance'},{n:'$10B+',l:'In Managed Assets'},{n:'$8B+',l:'In Loans Financed'}].map(s => (
                  <div key={s.l}>
                    <div className="text-3xl font-black text-[#c8922a] mb-2">{s.n}</div>
                    <p className="text-white/55 text-xs leading-snug">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-light py-16">
        <div className="container-wide">
          <span className="section-label">OUR VALUES</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Built on a Foundation of Trust and Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={22} />, title: 'Transparency', desc: 'Clear terms, no hidden surprises. We believe in open communication at every step of the process.' },
              { icon: <Zap size={22} />, title: 'Responsiveness', desc: 'Quick answers to keep your deals on track. Our team is always accessible and ready to move.' },
              { icon: <Handshake size={22} />, title: 'Ongoing Partnership', desc: 'Focused on your long-term success. We invest in relationships, not just transactions.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-xl p-6 border border-[#e8eaef]">
                <div className="w-11 h-11 rounded-xl bg-[#0a1628] flex items-center justify-center text-[#c8922a] mb-4">{v.icon}</div>
                <h3 className="font-bold text-[#0a1628] mb-2">{v.title}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container-wide">
          <span className="section-label">OUR PROCESS</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Speed and Efficiency from Start to Funding</h2>
          <ProcessSteps />
        </div>
      </section>

      {/* Team teaser */}
      <section className="section-dark py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label">OUR TEAM</span>
              <h2 className="text-3xl font-bold text-white mb-4">Specialists Who Understand Your Needs</h2>
              <p className="text-white/65 leading-relaxed mb-6">Our experienced team offers investors more than just capital - we provide innovative, customized financing solutions, expert guidance, and dedicated support. With every transaction, we prioritize efficiency, expediency, and a commitment to excellence.</p>
              <div className="flex gap-3">
                <Link href="/team" className="btn-primary">Meet Our Team</Link>
                <Link href="/careers" className="btn-secondary">Explore Open Roles</Link>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
              <span className="text-white/20 text-sm">Team Photo</span>
            </div>
          </div>
        </div>
      </section>

      <CTABanner title="Proven Team. Trusted Lending Partner." subtitle="With extensive industry expertise and an unwavering commitment to service, our team has successfully partnered with thousands of real estate investors on projects nationwide." />
    </>
  );
}