import Link from 'next/link';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export default function CTABanner({ title, subtitle, primaryLabel = 'Get an Estimate', primaryHref = '/app', secondaryLabel, secondaryHref, dark = true }: CTABannerProps) {
  return (
    <section className={dark ? 'section-dark' : 'bg-[#f7f8fa]'}>
      <div className="container-wide py-16 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-[#0a1628]'}`}>{title}</h2>
        {subtitle && <p className={`mb-8 max-w-xl mx-auto text-base ${dark ? 'text-white/70' : 'text-[#4a5568]'}`}>{subtitle}</p>}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={primaryHref} className="btn-primary">{primaryLabel}</Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className={dark ? 'btn-secondary' : 'btn-outline-dark'}>{secondaryLabel}</Link>
          )}
        </div>
      </div>
    </section>
  );
}