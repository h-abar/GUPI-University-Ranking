'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Globe, BarChart3, Table, Home, Shield, Swords, Languages, Mail } from 'lucide-react';
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
    { href: '/contact', label: t('nav_contact'), icon: Mail },
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
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-gupi-orange-100/80 text-gupi-orange-800 font-bold shadow-sm'
                      : 'text-gupi-ink-600 hover:bg-gupi-orange-50/70 hover:text-gupi-orange-700'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="h-5 w-px bg-gupi-ink-200 mx-1.5" />
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold text-gupi-ink-600 hover:bg-gupi-orange-50 hover:text-gupi-orange-700 transition-all border border-gupi-ink-200"
              title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'عربية'}</span>
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium text-gupi-ink-400 hover:text-gupi-orange-700 hover:bg-gupi-orange-50/50 transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t('nav_admin')}</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg hover:bg-gupi-orange-50 text-gupi-ink-600"
              title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <Languages className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gupi-orange-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1">
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
