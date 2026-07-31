'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Globe, BarChart3, Table, Home, Shield, Swords, Languages } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang, toggleLang } = useLang();

  const links = [
    { href: '/', label: t('nav_home'), icon: Home },
    { href: '/rankings', label: t('nav_rankings'), icon: Table },
    { href: '/dashboard', label: t('nav_dashboard'), icon: BarChart3 },
    { href: '/methodology', label: t('nav_methodology'), icon: Globe },
    { href: '/compare', label: t('nav_compare'), icon: Swords },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gupi-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="GUPI" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
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
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gupi-ink-600 hover:bg-gupi-orange-50 hover:text-gupi-orange-600 transition-all mx-1"
              title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <Languages className="w-4 h-4" />
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gupi-ink-300 hover:text-gupi-orange-600 transition-all mr-2"
            >
              <Shield className="w-4 h-4" />
              {t('nav_admin')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg hover:bg-gupi-orange-50 text-gupi-ink-600"
              title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <Languages className="w-5 h-5" />
              <span className="text-xs font-medium ml-1">{lang === 'ar' ? 'EN' : 'ع'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gupi-orange-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
              {t('nav_admin')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
