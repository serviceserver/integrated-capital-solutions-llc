import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { num: '01', title: 'Loan Inquiry', desc: 'Start with a quick and easy loan inquiry. Provide basic details about your project to receive an instant quote, followed by a consultation with an Account Executive.', cta: true },
  { num: '02', title: 'Underwriting', desc: 'Experience our fast and efficient underwriting process. With dedicated lending experts guiding you at each step, we deliver unmatched speed and seamless execution.' },
  { num: '03', title: 'Closing', desc: 'Once approved, we move swiftly to closing. Your funds are disbursed quickly, allowing you to move forward without delay. Draws are made simple and hassle-free.' },
  { num: '04', title: 'Loan Funded', desc: 'With your loan funded, you can focus on executing your project with confidence. Our efficient disbursement process ensures timely access to capital.' },
];

export default function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step, i) => (
        <div key={step.num} className="relative">
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-[#e8eaef] z-0" style={{width:'calc(100% - 2.5rem)', left:'2.5rem'}} />
          )}
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#0a1628] text-white flex items-center justify-center font-bold text-sm mb-4">{step.num}</div>
            <h4 className="font-bold text-[#0a1628] mb-2">{step.title}</h4>
            <p className="text-sm text-[#4a5568] leading-relaxed mb-3">{step.desc}</p>
            {step.cta && (
              <Link href="/app" className="inline-flex items-center gap-1 text-[#c8922a] text-sm font-semibold hover:gap-2 transition-all">
                Get an Estimate <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}