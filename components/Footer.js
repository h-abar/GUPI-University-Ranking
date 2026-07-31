'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const links = [
    { href: '/', label: t('nav_home') },
    { href: '/rankings', label: t('nav_rankings') },
    { href: '/dashboard', label: t('nav_dashboard') },
    { href: '/methodology', label: t('nav_methodology') },
    { href: '/compare', label: t('nav_compare') },
  ];

  return (
    <footer className="bg-gupi-ink-950 text-gupi-ink-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="GUPI" className="h-12 w-auto object-contain" />
              <div>
                <div className="font-display font-bold text-white text-lg">{t('footer_brand')}</div>
                <div className="text-xs text-gupi-ink-300">{t('footer_brand_sub')}</div>
              </div>
            </div>
            <p className="text-sm text-gupi-ink-300 leading-relaxed">
              {t('footer_desc')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">{t('footer_quick_links')}</h4>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-gupi-orange-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4">{t('footer_about')}</h4>
            <p className="text-sm text-gupi-ink-300 leading-relaxed">
              {t('footer_about_text')}
            </p>
          </div>
        </div>

        <div className="border-t border-gupi-ink-800 mt-8 pt-8 text-center text-sm text-gupi-ink-400">
          <p>{t('footer_copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
