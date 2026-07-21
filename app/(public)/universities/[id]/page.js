'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight, Globe, Award, Trophy, TrendingUp, Building2,
  Calendar, MapPin, FileText, CheckCircle2, XCircle, ChevronLeft,
  ChevronRight, Search, Star, Target, BookOpen, ExternalLink
} from 'lucide-react';

const COUNTRY_FLAGS = {
  'السعودية': '🇸🇦', 'الأردن': '🇯🇴', 'قطر': '🇶🇦', 'مصر': '🇪🇬',
  'لبنان': '🇱🇧', 'المغرب': '🇲🇦', 'تونس': '🇹🇳', 'الإمارات': '🇦🇪',
  'العراق': '🇮🇶', 'الجزائر': '🇩🇿', 'الكويت': '🇰🇼', 'عمان': '🇴🇲',
  'البحرين': '🇧🇭', 'ليبيا': '🇱🇾', 'السودان': '🇸🇩', 'فلسطين': '🇵🇸',
  'سوريا': '🇸🇾', 'اليمن': '🇾🇪', 'موريتانيا': '🇲🇷', 'الصومال': '🇸🇴',
};

export default function UniversityCardPage() {
  const params = useParams();
  const [uni, setUni] = useState(null);
  const [allUnis, setAllUnis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/universities').then((r) => r.json()),
      fetch(`/api/universities/${params.id}`).then((r) => r.json()),
    ]).then(([all, single]) => {
      setAllUnis(all);
      setUni(single);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gupi-orange-200 border-t-gupi-orange-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!uni || uni.error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gupi-ink-600 mb-4">لم يتم العثور على الجامعة</p>
          <Link href="/rankings" className="text-gupi-orange-600 hover:underline">العودة للترتيب</Link>
        </div>
      </div>
    );
  }

  const flag = COUNTRY_FLAGS[uni.country] || '🌍';
  const currentIndex = allUnis.findIndex((u) => u.id === uni.id);
  const prevUni = currentIndex > 0 ? allUnis[currentIndex - 1] : null;
  const nextUni = currentIndex < allUnis.length - 1 ? allUnis[currentIndex + 1] : null;

  const filteredSearch = allUnis.filter((u) =>
    !search || u.name?.includes(search)
  ).slice(0, 8);

  // Group rankings by category
  const rankingFields = [
    { key: 'shanghai_ranking', label: 'Shanghai (ARWU)', category: 'world', icon: '🏆' },
    { key: 'the_ranking', label: 'THE العالمي', category: 'world', icon: '📊' },
    { key: 'qs_ranking', label: 'QS العالمي', category: 'world', icon: '⭐' },
    { key: 'ad_scientific_index', label: 'AD Scientific Index', category: 'world', icon: '🔬' },
    { key: 'scimago', label: 'Scimago', category: 'world', icon: '📈' },
    { key: 'cwts', label: 'CWTS Leiden', category: 'world', icon: '🎯' },
    { key: 'unirank_world', label: 'UniRank العالمي', category: 'world', icon: '🌐' },
    { key: 'us_news', label: 'US News', category: 'world', icon: '📰' },
    { key: 'cwur', label: 'CWUR', category: 'world', icon: '📋' },
    { key: 'scholar_gps', label: 'ScholarGPS', category: 'world', icon: '📡' },
    { key: 'rur', label: 'RUR', category: 'world', icon: '🔄' },
    { key: 'guv', label: 'GUV', category: 'world', icon: '👁' },
    { key: 'qs_arab', label: 'QS العربي', category: 'arab', icon: '⭐' },
    { key: 'the_arab', label: 'THE العربي', category: 'arab', icon: '📊' },
    { key: 'arabic_ranking', label: 'Arabic Ranking', category: 'arab', icon: '🏅' },
    { key: 'unirank_arabic', label: 'UniRank العربي', category: 'arab', icon: '🌐' },
    { key: 'the_impact', label: 'THE Impact', category: 'impact', icon: '💫' },
    { key: 'ui_greenmetric', label: 'UI GreenMetric', category: 'special', icon: '🌱' },
  ];

  const worldRankings = rankingFields.filter((f) => f.category === 'world');
  const arabRankings = rankingFields.filter((f) => f.category === 'arab');
  const otherRankings = rankingFields.filter((f) => f.category === 'impact' || f.category === 'special');

  function isPresent(value) {
    if (!value) return false;
    const s = String(value).trim();
    return s !== '' && s !== 'ـ' && s !== '-' && s !== 'None';
  }

  function renderRankingCard(field) {
    const value = uni[field.key];
    const present = isPresent(value);
    return (
      <div key={field.key} className={`relative rounded-2xl p-4 border-2 transition-all ${
        present ? 'border-gupi-orange-200 bg-gradient-to-br from-white to-gupi-orange-50/50 shadow-sm' : 'border-gupi-ink-100 bg-gupi-ink-50/50'
      }`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{field.icon}</span>
            <span className="text-sm font-bold text-gupi-ink-700">{field.label}</span>
          </div>
          {present ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-gupi-ink-300 flex-shrink-0" />
          )}
        </div>
        <div className={`text-lg font-black ${present ? 'text-gupi-orange-700' : 'text-gupi-ink-300'}`}>
          {present ? value : 'غير متوفر'}
        </div>
        {present && (
          <div className="mt-1 text-xs text-green-600 font-medium">✓ حاضر في التصنيف</div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gupi-ink-50">
      {/* Hero card section */}
      <div className="relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gupi-amber-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/rankings" className="flex items-center gap-1 text-white/80 hover:text-white text-sm">
              <ArrowRight className="w-4 h-4" /> العودة للترتيب
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
                EXCLUSIVE 2026
              </span>
            </div>
          </div>

          {/* University card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Logo circle */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gupi-orange-400 to-gupi-orange-700 flex items-center justify-center text-white font-black text-2xl flex-shrink-0 shadow-xl">
                {uni.short_code || uni.name?.slice(0, 2) || 'U'}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{flag}</span>
                  <h1 className="text-2xl md:text-3xl font-display font-black text-white">{uni.name}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  {uni.country && (
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {uni.country}</span>
                  )}
                  {uni.founded && (
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> تأسست {uni.founded}</span>
                  )}
                  {uni.articles_2025 && (
                    <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {uni.articles_2025.toLocaleString()} بحث</span>
                  )}
                </div>
              </div>

              {/* GUPI Score badge */}
              <div className="bg-white rounded-2xl p-4 text-center shadow-xl min-w-[140px]">
                <div className="text-xs text-gupi-ink-500 font-medium mb-1">درجة GUPI</div>
                <div className="text-4xl font-black text-gupi-orange-700">{uni.gupi.totalScore}</div>
                <div className="text-xs text-gupi-ink-400">من {uni.gupi.maxTotal}</div>
                <div className="mt-2 flex items-center justify-center gap-1">
                  {uni.rank <= 3 && <Trophy className="w-4 h-4 text-gupi-amber-500" />}
                  <span className="text-sm font-bold text-gupi-ink-700">الترتيب #{uni.rank}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {uni.description && (
              <p className="mt-6 text-white/90 text-base leading-relaxed border-t border-white/20 pt-6">
                {uni.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Presence score */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gupi-orange-400 to-gupi-orange-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gupi-ink-800">درجة الحضور</div>
                <div className="text-xs text-gupi-ink-500">Presence Score</div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-gupi-orange-700">{uni.gupi.presenceScore}</span>
              <span className="text-lg text-gupi-ink-400">/ {uni.gupi.maxPresence}</span>
            </div>
            <div className="mt-3 bg-gupi-ink-100 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gupi-orange-400 to-gupi-orange-600 rounded-full" style={{ width: `${(uni.gupi.presenceScore / uni.gupi.maxPresence) * 100}%` }} />
            </div>
            <div className="mt-2 text-xs text-gupi-ink-500">
              {uni.gupi.presenceDetails?.filter((d) => d.present).length || 0} من {uni.gupi.presenceDetails?.length || 0} تصنيفات
            </div>
          </div>

          {/* Excellence score */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gupi-amber-400 to-gupi-amber-600 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gupi-ink-800">درجة التميز</div>
                <div className="text-xs text-gupi-ink-500">Excellence Score</div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-gupi-amber-600">{uni.gupi.excellenceScore}</span>
              <span className="text-lg text-gupi-ink-400">/ {uni.gupi.maxExcellence}</span>
            </div>
            <div className="mt-3 bg-gupi-ink-100 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gupi-amber-400 to-gupi-amber-600 rounded-full" style={{ width: `${(uni.gupi.excellenceScore / uni.gupi.maxExcellence) * 100}%` }} />
            </div>
            <div className="mt-2 text-xs text-gupi-ink-500">
              {uni.gupi.excellenceDetails?.filter((d) => d.present).length || 0} من {uni.gupi.excellenceDetails?.length || 0} تصنيفات تميز
            </div>
          </div>

          {/* Total score */}
          <div className="bg-gradient-to-br from-gupi-orange-700 to-gupi-orange-950 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">الدرجة الإجمالية</div>
                <div className="text-xs text-white/60">Total GUPI Score</div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black">{uni.gupi.totalScore}</span>
              <span className="text-lg text-white/60">/ {uni.gupi.maxTotal}</span>
            </div>
            <div className="mt-3 bg-white/20 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${(uni.gupi.totalScore / uni.gupi.maxTotal) * 100}%` }} />
            </div>
            <div className="mt-2 text-xs text-white/70">
              الترتيب العام: #{uni.rank} من {allUnis.length}
            </div>
          </div>
        </div>
      </div>

      {/* Rankings details */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* World rankings */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gupi-orange-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-gupi-orange-600" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-gupi-orange-900">التصنيفات العالمية</h2>
              <p className="text-sm text-gupi-ink-500">International Rankings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {worldRankings.map(renderRankingCard)}
          </div>
        </div>

        {/* Arab rankings */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gupi-amber-100 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-gupi-amber-600" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-gupi-orange-900">التصنيفات العربية</h2>
              <p className="text-sm text-gupi-ink-500">Arab Rankings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {arabRankings.map(renderRankingCard)}
          </div>
        </div>

        {/* Other rankings */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-gupi-orange-900">تصنيفات التأثير والاستدامة</h2>
              <p className="text-sm text-gupi-ink-500">Impact & Sustainability Rankings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {otherRankings.map(renderRankingCard)}
          </div>
        </div>

        {/* Presence details table */}
        {uni.gupi.presenceDetails && uni.gupi.presenceDetails.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gupi-ink-100">
              <h2 className="font-display font-bold text-xl text-gupi-orange-900">تفاصيل حساب الحضور</h2>
              <p className="text-sm text-gupi-ink-500 mt-1">كيف تم حساب درجة الحضور لهذه الجامعة</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gupi-ink-50 text-gupi-ink-600">
                    <th className="px-4 py-3 text-right">التصنيف</th>
                    <th className="px-4 py-3 text-center">الحضور</th>
                    <th className="px-4 py-3 text-center">الوزن</th>
                    <th className="px-4 py-3 text-center">الدرجة المكتسبة</th>
                  </tr>
                </thead>
                <tbody>
                  {uni.gupi.presenceDetails.map((d, i) => (
                    <tr key={i} className="border-b border-gupi-ink-50">
                      <td className="px-4 py-3 font-medium text-gupi-ink-700">{d.label}</td>
                      <td className="px-4 py-3 text-center">
                        {d.present ? <CheckCircle2 className="w-5 h-5 text-green-500 inline" /> : <XCircle className="w-5 h-5 text-gupi-ink-300 inline" />}
                      </td>
                      <td className="px-4 py-3 text-center text-gupi-ink-600">{d.weight}</td>
                      <td className="px-4 py-3 text-center font-bold text-gupi-orange-700">{d.present ? d.weight : 0}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gupi-orange-50 font-bold">
                    <td className="px-4 py-3 text-gupi-orange-900" colSpan={3}>إجمالي درجة الحضور</td>
                    <td className="px-4 py-3 text-center text-gupi-orange-700 text-lg">{uni.gupi.presenceScore} / {uni.gupi.maxPresence}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Navigation between universities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {prevUni && (
            <Link href={`/universities/${prevUni.id}`} className="bg-white rounded-2xl shadow p-5 flex items-center gap-3 hover:shadow-md transition-shadow group">
              <ChevronRight className="w-5 h-5 text-gupi-orange-400 group-hover:text-gupi-orange-600" />
              <div className="flex-1 text-right">
                <div className="text-xs text-gupi-ink-400">السابق</div>
                <div className="font-bold text-gupi-orange-900 text-sm">{prevUni.name}</div>
              </div>
              <div className="text-xs font-bold text-gupi-ink-400">#{prevUni.rank}</div>
            </Link>
          )}
          {nextUni && (
            <Link href={`/universities/${nextUni.id}`} className="bg-white rounded-2xl shadow p-5 flex items-center gap-3 hover:shadow-md transition-shadow group">
              <div className="text-xs font-bold text-gupi-ink-400">#{nextUni.rank}</div>
              <div className="flex-1">
                <div className="text-xs text-gupi-ink-400">التالي</div>
                <div className="font-bold text-gupi-orange-900 text-sm">{nextUni.name}</div>
              </div>
              <ChevronLeft className="w-5 h-5 text-gupi-orange-400 group-hover:text-gupi-orange-600" />
            </Link>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-gupi-orange-700 to-gupi-orange-950 rounded-3xl p-8 text-center text-white">
          <h3 className="font-display font-bold text-xl mb-2">اكتشف بطاقات جامعات أخرى</h3>
          <p className="text-white/70 text-sm mb-6">تصفح أكثر من 70 بطاقة جامعة عربية مع تحليل شامل للتصنيفات الدولية</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/rankings" className="px-6 py-3 rounded-xl bg-white text-gupi-orange-800 font-bold hover:bg-gupi-orange-50 transition-colors">
              استعرض جميع البطاقات
            </Link>
            <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30 transition-colors backdrop-blur-sm">
              لوحة التحليلات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
