'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Star, Phone, Building2, TrendingUp, Users } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import CTABanner from '@/components/CTABanner';
import Image from 'next/image';

const products = [
  {
    label: 'Ground Up', href: '/ground-up', image: '/construction-site.JPG',
    desc: 'New construction financing for experienced builders',
    specs: [['Term', '12–30 Months'], ['Loan Amount', '$250K–$5M+'], ['LTC', 'Up to 90%'], ['LTV', 'Up to 75%']],
  },
  {
    label: 'Fix & Flip', href: '/fix-flip', image: '/fix-flip.JPG',
    desc: 'Acquisition and renovation financing at scale',
    specs: [['Term', '6–30 Months'], ['Loan Amount', '$150K–$5M+'], ['LTC', 'Up to 95%'], ['Purchase', 'Up to 92.5%']],
  },
  {
    label: 'DSCR Rental', href: '/dscr-rental', image: '/rent.JPG',
    desc: 'Long-term rental financing based on cash flow',
    specs: [['Term', '30 Years'], ['Loan Amount', '$75K–$2.5M'], ['LTV', 'Up to 80%'], ['Min DSCR', 'As Low as .75']],
  },
  {
    label: 'Bridge Loan', href: '/bridge-loan', image: '/family.jpg',
    desc: 'Flexible short-term capital for any investment scenario',
    specs: [['Term', '6–15 Months'], ['Loan Amount', '$150K–$5M+'], ['LTV', 'Up to 80%'], ['Cashout', 'Up to 75%']],
  },
];

const testimonials = [
  { quote: "I've worked with Integrated Capital Solutions on both a bridge loan and a full construction loan, and their team consistently goes above and beyond. Danny once took my call on a Saturday and had everything I needed in my inbox by Monday. Their dedication and flexibility have made a lasting impression.", name: 'Kevin H.', role: 'Developer' },
  { quote: "If getting a loan was an Olympic sport, Justin would take home the gold. He's the kind of lender who actually picks up the phone, responds faster than our morning coffee kicks in, and somehow makes the whole process enjoyable. If you need a lender who makes financing feel effortless, call Justin.", name: 'Matt S.', role: 'Investor' },
  { quote: "I've had the pleasure of working with Jennifer Lightbody & Jennifer Tran on numerous transactions and the experience was nothing short of exceptional. They are always ahead of the game during the funding process and always make sure the loan gets funded as smoothly as possible.", name: 'Natalie N.', role: 'Real Estate Investor' },
  { quote: "I used Integrated Capital Solutions to help fund a large transaction involving multiple new construction homes. It was not a typical project, but we were able to close on time. I'd highly recommend collaborating with Integrated Capital Solutions on any real estate projects.", name: 'Jonathan C.', role: 'Real Estate Investor' },
  { quote: "Integrated Capital Solutions has the most efficient lending team I have ever worked with. They work quickly and clearly to make sure their customers are fully satisfied, all while being friendly and approachable. They make what seems like the impossible, possible.", name: 'Emilienne F.', role: 'Developer' },
];

const homeFAQs = [
  { question: 'What is Integrated Capital Solutions and who is your audience?', answer: 'Integrated Capital Solution is a national, direct, private lender (non-bank) specializing in financing solutions for investors. With a proven track record and deep industry expertise, we are the go-to partner for experienced investors seeking fast, flexible, and reliable funding.' },
  { question: 'What kind of loan products do you offer?', answer: 'We provide short-term bridge loans for fix-and-flip projects and new ground-up construction, as well as long-term financing solutions for rental properties. Our flexible loan options are designed to support investors at every stage of their investment journey.' },
  { question: 'How do I start my loan application process?', answer: <span>You can begin instantly and obtain a quick quote at <Link href="/app" className="text-[#c8922a] font-semibold">integratedcapitalsolutionsllc.com/app</Link>. Once complete, a member of our team will connect with you to gather more information and prepare a term sheet.</span> },
  { question: 'How quickly can I get approved and funded?', answer: <div><p className="mb-2 font-semibold">Fast, Reliable Closing Times - speed is our strength.</p><ul className="space-y-1 text-sm"><li><strong>Fix & Flip:</strong> 5–10 days. Record: 1 day.</li><li><strong>Ground-Up:</strong> 7–14 days. Record: 2 days.</li><li><strong>DSCR:</strong> 10–20 days. Record: 3 days.</li></ul></div> },
  { question: 'Do you work with first time investors?', answer: 'We typically work with experienced investors who have completed at least one prior investment. Fix & Flip requires at least one completed project in the past 36 months; Ground-Up requires three.' },
  { question: 'Do you work with brokers?', answer: <span>Yes, we work extensively with brokers and are always looking for new partnerships. <Link href="/brokers" className="text-[#c8922a] font-semibold">Visit our Broker page →</Link></span> },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #c8922a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1a3560 0%, transparent 50%)'}} 

  return (
    <>
      {/* HERO */}
      <section className="relative section-dark pt-28 pb-20 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/house-isolated-field.jpg')", width: '100%', height: "100%", backgroundSize: 'cover', backgroundPosition: "center" }} />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#c8922a]/15 border border-[#c8922a]/30 text-[#c8922a] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 animate-fadeUp">
              National Private Lender
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fadeUp delay-100">
              Best Lender to<br />
              <span className="text-[#c8922a]">Experienced</span> Real<br />
              Estate Investors
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl animate-fadeUp delay-200">
              Providing fast and efficient loans to investors in residential real estate, from ground-up construction to fix-and-flip and long-term rental hold.
            </p>
            <div className="flex flex-wrap gap-3 animate-fadeUp delay-300">
              <Link href="/app" className="btn-primary">Get an Estimate <ArrowRight size={16} /></Link>
              <Link href="/brokers" className="btn-secondary">Broker Program</Link>
            </div>
          </div>

          {/* Product icon pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14 animate-fadeUp delay-400">
            {products.map(p => (
              <Link key={p.href} href={p.href}
                className="flex items-center gap-2.5 bg-white/8 hover:bg-white/14 border border-white/15 hover:border-[#c8922a]/50 rounded-lg px-4 py-3 transition-all group">
                <div className="w-8 h-8 rounded bg-[#c8922a]/20 flex items-center justify-center shrink-0">
                  <Building2 size={14} className="text-[#c8922a]" />
                </div>
                <span className="text-white/85 text-sm font-semibold group-hover:text-white transition-colors">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS STATS */}
      <section className="py-16 bg-[#0f2040]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">INTEGRATED CAPITAL SOLUTIONS FOUNDERS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">Time-Tested Industry Expertise</h2>
              <div className="divider" />
              <p className="text-white/65 leading-relaxed">
                Partnering with the nation&apos;s top housing developers and financial institutions, our founders have successfully navigated multiple economic challenges and market cycles.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '25+', label: 'Years in Real Estate Finance' },
                { num: '$10B+', label: 'In Managed Assets' },
                { num: '$8B+', label: 'In Loans Financed' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="stat-number mb-2">{s.num}</div>
                  <p className="text-white/55 text-xs leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOAN PRODUCTS */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="section-label">LENDING SOLUTIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628]">Investment Property Loans</h2>
            <p className="text-[#4a5568] mt-3 max-w-xl mx-auto">Our loan products are built to meet the needs of investors across different business strategies and throughout the life cycle of an investment property.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.href} className="bg-white rounded-xl border border-[#e8eaef] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <Image src={p.image} alt={p.label} width={400} height={400} className="w-full h-42 object-cover" />
                <div className="bg-[#0a1628] px-5 py-4">
                  <h3 className="text-white font-bold">{p.label}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{p.desc}</p>
                </div>
                <div className="px-5 py-4">
                  {p.specs.map(([l, v]) => (
                    <div key={l} className="spec-row">
                      <span className="spec-label">{l}</span>
                      <span className="spec-value">{v}</span>
                    </div>
                  ))}
                  <div className="mt-4 flex gap-2">
                    <Link href="/app" className="btn-primary text-xs py-1.5 px-3 flex-1 justify-center">Estimate</Link>
                    <Link href={p.href} className="btn-outline-dark text-xs py-1.5 px-3">Learn More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READY FOR FINANCING CTA */}
      <section className="bg-[#c8922a] py-10">
        <div className="container-wide flex flex-col md:flex-row items-center justify-center gap-x-20">
          <div className="flex items-center gap-3">
            <Image src="/financing.jpg" alt="Financing" width={350} height={350} className="w-full" />
          </div>
          <div className="flex flex-col items-start gap-y-4">
            <h3 className="text-white text-2xl font-bold">Ready for Financing?</h3>
            <Link href="/app" className="bg-white text-[#c8922a] font-bold px-6 py-2.5 rounded-md hover:bg-[#f7f8fa] transition-colors text-sm">
              Get an Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* WHY Integrated Capital Solution */}
      <section className="py-20 section-light">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="section-label">WHY INTEGRATED CAPITAL SOLUTIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628]">We Make Lending Simple</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp size={24} />, title: 'Built for Speed', desc: 'We streamline our documentation and approval process so you could close quickly and securely.' },
              { icon: <Users size={24} />, title: 'Focused on Needs', desc: 'Our flexible loan products are customized to meet the changing needs of investors and the market.' },
              { icon: <Check size={24} />, title: 'Delivering on Service', desc: 'Our experienced team of experts will deliver the highest level of care, from application to funding.' },
            ].map(item => (
              <div key={item.title} className="text-center px-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0a1628] flex items-center justify-center mx-auto mb-5 text-[#c8922a]">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#0a1628] text-lg mb-2">{item.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 section-dark">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="section-label">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">See What Clients are Saying</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#c8922a] fill-[#c8922a]" />)}
              </div>
              <blockquote className="text-white/90 text-lg leading-relaxed mb-8">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">{testimonials[activeTestimonial].name}</p>
                  <p className="text-[#c8922a] text-sm">{testimonials[activeTestimonial].role}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                    className="w-9 h-9 rounded-full border border-white/20 hover:border-[#c8922a] hover:bg-[#c8922a]/10 flex items-center justify-center text-white transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                    className="w-9 h-9 rounded-full border border-white/20 hover:border-[#c8922a] hover:bg-[#c8922a]/10 flex items-center justify-center text-white transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-[#c8922a] w-6' : 'bg-white/30'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-wide max-w-3xl">
          <span className="section-label">FAQs</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-8">Frequently Asked Questions</h2>
          <FAQAccordion items={homeFAQs} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline-dark">See All FAQs</Link>
          </div>
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="section-light py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-[#0a1628] text-center mb-10">Your Go-To Lending Partner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-[#0a1628] rounded-xl p-8 flex flex-col gap-4">
              <span className="text-[#c8922a] text-xs font-bold uppercase tracking-widest">For Investors</span>
              <h3 className="text-white text-xl font-bold">Access funds easily and quickly with our streamlined process</h3>
              <Link href="/app" className="btn-primary mt-2">Get an Estimate</Link>
            </div>
            <div className="bg-white border border-[#e8eaef] rounded-xl p-8 flex flex-col gap-4">
              <span className="text-[#c8922a] text-xs font-bold uppercase tracking-widest">For Brokers</span>
              <h3 className="text-[#0a1628] text-xl font-bold">Partner with us to secure loans for your clients smoothly and safely</h3>
              <Link href="/brokers" className="btn-outline-dark mt-2">Explore Broker Program</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}