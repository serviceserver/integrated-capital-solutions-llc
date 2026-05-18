// components/Breadcrumb.tsx
import Link from 'next/link';
import SchemaScript from './SchemaScript';
import { breadcrumbSchema } from '@/lib/seo';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];

  return (
    <>
      <SchemaScript schema={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/50 flex-wrap z-20">
        {all.map((item, i) => (
          <span key={item.href} className="flex items-center gap-1.5">
            {i < all.length - 1 ? (
              <>
                <Link href={item.href} className="hover:text-white/80 transition-colors">
                  {item.name}
                </Link>
                <ChevronRight size={12} className="text-white/30" />
              </>
            ) : (
              <span className="text-white/75 font-medium">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}