'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Crown, Medal } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function TopPodium() {
  const [top, setTop] = useState(null);
  const { t } = useLang();

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('bad data');
        const sorted = [...data].sort((a, b) => a.rank - b.rank).slice(0, 3);
        setTop(sorted);
      })
      .catch(() => setTop([]));
  }, []);

  if (top === null) {
    return (
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-52 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
        ))}
      </div>
    );
  }

  if (top.length < 3) return null;

  const [first, second, third] = top;

  const cards = [
    { u: third, place: 3, badge: 'rank-3', label: t('podium_third'), order: 'order-3' },
    { u: first, place: 1, badge: 'rank-1', label: t('podium_first'), order: 'order-1', featured: true },
    { u: second, place: 2, badge: 'rank-2', label: t('podium_second'), order: 'order-2' },
  ];

  return (
    <div className="mt-14 max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6 text-gupi-amber-300">
        <Medal className="w-4 h-4" />
        <span className="text-xs font-semibold tracking-wide">{t('podium_title')}</span>
        <Medal className="w-4 h-4" />
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-5 items-stretch">
        {cards.map(({ u, place, badge, label, order, featured }) => (
          <Link
            key={u.id}
            href={`/universities/${u.id}`}
            className={`${order} md:order-none group relative rounded-2xl p-6 text-center border backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${
              featured
                ? 'bg-white/10 border-gupi-amber-400/40 glow-gold md:-translate-y-5 md:hover:-translate-y-7'
                : 'bg-white/5 border-white/10 hover:border-gupi-amber-400/30'
            }`}
          >
            {featured && (
              <Crown className="absolute -top-3.5 right-1/2 translate-x-1/2 w-7 h-7 text-gupi-amber-400 drop-shadow-[0_0_8px_rgba(242,192,99,0.8)]" />
            )}

            {/* الميدالية */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              {featured && <div className="absolute inset-0 rounded-full ring-conic" aria-hidden="true" />}
              <div
                className={`absolute ${featured ? 'inset-[4px]' : 'inset-0'} rounded-full ${badge} flex items-center justify-center font-display font-black text-2xl shadow-lg`}
              >
                {place}
              </div>
            </div>

            <div className={`text-[11px] font-semibold mb-1.5 ${featured ? 'text-gupi-amber-300' : 'text-gupi-ink-300'}`}>
              {label}
            </div>
            <h3 className="font-bold text-white text-sm md:text-base leading-snug mb-1.5 min-h-[2.5rem] flex items-center justify-center">
              {u.name}
            </h3>
            <p className="text-xs text-gupi-ink-300 flex items-center justify-center gap-1 mb-4">
              <MapPin className="w-3 h-3" />
              {u.country}
            </p>

            <div className="inline-flex items-baseline gap-1.5 px-4 py-1.5 rounded-full bg-black/25 border border-white/10 group-hover:border-gupi-amber-400/40 transition-colors">
              <span className="font-display font-black text-xl gold-text">{u.gupi.totalScore}</span>
              <span className="text-[11px] text-gupi-ink-300">/ {u.gupi.maxTotal ?? 100}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
