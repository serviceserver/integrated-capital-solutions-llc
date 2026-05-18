import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  specs: { label: string; value: string }[];
  highlights?: string[];
}

export default function ProductCard({ title, description, href, specs, highlights }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e8eaef] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="bg-[#0a1628] px-6 py-5">
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-white/65 text-sm">{description}</p>
      </div>
      <div className="px-6 py-5">
        {specs.map(s => (
          <div key={s.label} className="spec-row">
            <span className="spec-label">{s.label}</span>
            <span className="spec-value">{s.value}</span>
          </div>
        ))}
        {highlights && highlights.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            {highlights.map(h => (
              <div key={h} className="flex items-center gap-2 text-sm text-[#2d3748]">
                <Check size={14} className="text-[#c8922a] flex-shrink-0" />
                {h}
              </div>
            ))}
          </div>
        )}
        <div className="mt-5 flex gap-3">
          <Link href="/app" className="btn-primary text-sm py-2 px-4 flex-1 justify-center">Get an Estimate</Link>
          <Link href={href} className="btn-outline-dark text-sm py-2 px-4">Learn More</Link>
        </div>
      </div>
    </div>
  );
}