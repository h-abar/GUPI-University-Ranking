'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Globe, BarChart3, Table, Home, Shield } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/rankings', label: 'ترتيب الجامعات', icon: Table },
    { href: '/dashboard', label: 'لوحة البيانات', icon: BarChart3 },
    { href: '/methodology', label: 'منهجية المؤشر', icon: Globe },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gupi-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="GUPI" className="w-10 h-10 rounded-gupi-md group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-gupi-orange-900 leading-none">GUPI</span>
              <span className="text-[10px] text-gupi-ink-400 leading-none mt-1">الحضور العالمي للجامعات</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-gupi-orange-100 text-gupi-orange-700'
                      : 'text-gupi-ink-600 hover:bg-gupi-orange-50 hover:text-gupi-orange-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gupi-ink-300 hover:text-gupi-orange-600 transition-all mr-2"
            >
              <Shield className="w-4 h-4" />
              الإدارة
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gupi-orange-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                    active ? 'bg-gupi-orange-100 text-gupi-orange-700' : 'text-gupi-ink-600 hover:bg-gupi-orange-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gupi-ink-300"
            >
              <Shield className="w-4 h-4" />
              الإدارة
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
