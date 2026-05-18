import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const DropdownMenu = ({ items, label, id, setOpenDropdown, openDropdown  }: { items: {label:string,href:string}[], label: string, id: string, setOpenDropdown: (id: string | null) => void, openDropdown: string | null }) => {

  

  return (
    <div
      className="relative group bg-white"
      onMouseEnter={() => setOpenDropdown(id)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button className="flex items-center gap-1 text-sm font-semibold text-gray/90 hover:text-[#0a1628] transition-colors py-2 px-1">
        {label}
        <ChevronDown size={14} className={`transition-transform ${openDropdown === id ? 'rotate-180' : ''}`} />
      </button>
      {openDropdown === id && (
        <div className="absolute top-full left-0 mt-1 bg-gray rounded-lg shadow-2xl py-2 min-w-[180px] z-50 border border-[#0a1628] bg-white">
          {items.map(item => (
            <Link key={item.href} href={item.href}
              className="block px-4 py-2.5 text-sm font-500 text-gray-700 hover:bg-gray-50 hover:text-[#0a1628] transition-colors"
              onClick={() => setOpenDropdown(null)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
