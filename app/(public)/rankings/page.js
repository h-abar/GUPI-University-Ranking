'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, ArrowUpDown, Trophy, MapPin, Award, TrendingUp, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function RankingsPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rank');
  const [sortDir, setSortDir] = useState('asc');
  const [selectedUni, setSelectedUni] = useState(null);

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data) => {
        setUniversities(data);
        setLoading(false);
      });
  }, []);

  const countries = useMemo(() => {
    const set = new Set(universities.map((u) => u.country).filter(Boolean));
    return Array.from(set).sort();
  }, [universities]);

  const filtered = useMemo(() => {
    let result = universities.filter((u) => {
      const matchesSearch = !search || u.name?.includes(search);
      const matchesCountry = countryFilter === 'all' || u.country === countryFilter;
      return matchesSearch && matchesCountry;
    });

    if (sortBy === 'rank') {
      result.sort((a, b) => sortDir === 'asc' ? a.rank - b.rank : b.rank - a.rank);
    } else if (sortBy === 'score') {
      result.sort((a, b) => sortDir === 'asc' ? a.gupi.totalScore - b.gupi.totalScore : b.gupi.totalScore - a.gupi.totalScore);
    } else if (sortBy === 'articles') {
      result.sort((a, b) => sortDir === 'asc' ? (a.articles_2025 || 0) - (b.articles_2025 || 0) : (b.articles_2025 || 0) - (a.articles_2025 || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => sortDir === 'asc' ? (a.name || '').localeCompare(b.name || '') : (b.name || '').localeCompare(a.name || ''));
    }

    return result;
  }, [universities, search, countryFilter, sortBy, sortDir]);

  function toggleSort(field) {
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gupi-orange-200 border-t-gupi-orange-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gupi-ink-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gupi-ink-50">
      {/* Header */}
      <div className="hero-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-black mb-3">
            ترتيب الجامعات العربية — <span className="gold-text">GUPI 2027</span>
          </h1>
          <p className="text-gupi-ink-300 text-lg">
            القائمة النهائية لمؤشر الحضور العالمي للجامعات — أفضل 70 جامعة عربية
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gupi-ink-400" />
              <input
                type="text"
                placeholder="ابحث عن جامعة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all"
              />
            </div>
            {/* Country filter */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all bg-white"
            >
              <option value="all">جميع الدول</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 flex items-center justify-between text-sm text-gupi-ink-500">
            <span>عرض {filtered.length} من {universities.length} جامعة</span>
            {(search || countryFilter !== 'all') && (
              <button
                onClick={() => { setSearch(''); setCountryFilter('all'); }}
                className="flex items-center gap-1 text-gupi-orange-600 hover:text-gupi-orange-700"
              >
                <X className="w-4 h-4" />
                مسح الفلاتر
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gupi-orange-950 text-white">
                  <th className="px-4 py-4 text-right cursor-pointer hover:bg-gupi-orange-900 transition-colors" onClick={() => toggleSort('rank')}>
                    <div className="flex items-center gap-1">
                      <span>الترتيب</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-4 py-4 text-right cursor-pointer hover:bg-gupi-orange-900 transition-colors" onClick={() => toggleSort('name')}>
                    <div className="flex items-center gap-1">
                      <span>الجامعة</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center hidden md:table-cell">الدولة</th>
                  <th className="px-4 py-4 text-center cursor-pointer hover:bg-gupi-orange-900 transition-colors" onClick={() => toggleSort('score')}>
                    <div className="flex items-center gap-1 justify-center">
                      <span>درجة GUPI</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center hidden lg:table-cell">الحضور (7)</th>
                  <th className="px-4 py-4 text-center hidden lg:table-cell">التميز (3)</th>
                  <th className="px-4 py-4 text-center cursor-pointer hover:bg-gupi-orange-900 transition-colors hidden md:table-cell" onClick={() => toggleSort('articles')}>
                    <div className="flex items-center gap-1 justify-center">
                      <span>الأبحاث</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center hidden md:table-cell">تفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((uni, idx) => (
                  <tr
                    key={uni.id}
                    className={`border-b border-gupi-ink-100 hover:bg-gupi-orange-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gupi-ink-50/30'}`}
                  >
                    <td className="px-4 py-3">
                      <div className={`rank-badge ${
                        uni.rank === 1 ? 'rank-1' :
                        uni.rank === 2 ? 'rank-2' :
                        uni.rank === 3 ? 'rank-3' : 'rank-other'
                      }`}>
                        {uni.rank}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-gupi-orange-900">{uni.name}</div>
                      <div className="text-xs text-gupi-ink-500 md:hidden">{uni.country}</div>
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 text-sm text-gupi-ink-600">
                        <MapPin className="w-3 h-3" />
                        {uni.country}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-display font-black text-2xl text-gupi-orange-700">{uni.gupi.totalScore}</span>
                        <span className="text-xs text-gupi-ink-400">/ 10</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className="font-bold text-gupi-orange-600">{uni.gupi.presenceScore}</span>
                      <span className="text-gupi-ink-400 text-sm">/ 7</span>
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className="font-bold text-gupi-amber-600">{uni.gupi.excellenceScore}</span>
                      <span className="text-gupi-ink-400 text-sm">/ 3</span>
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      {uni.articles_2025 ? (
                        <span className="text-sm font-medium text-gupi-ink-700">{uni.articles_2025.toLocaleString()}</span>
                      ) : (
                        <span className="text-gupi-ink-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedUni(uni)}
                          className="px-3 py-1.5 rounded-lg bg-gupi-orange-100 text-gupi-orange-700 text-sm font-medium hover:bg-gupi-orange-200 transition-colors"
                        >
                          عرض
                        </button>
                        <Link
                          href={`/universities/${uni.id}`}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-gupi-orange-600 to-gupi-orange-800 text-white text-sm font-medium hover:from-gupi-orange-700 hover:to-gupi-orange-900 transition-colors"
                        >
                          بطاقة
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedUni(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="hero-gradient text-white p-6 rounded-t-2xl relative">
              <button onClick={() => setSelectedUni(null)} className="absolute top-4 left-4 p-2 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className={`rank-badge w-16 h-16 text-2xl ${
                  selectedUni.rank === 1 ? 'rank-1' :
                  selectedUni.rank === 2 ? 'rank-2' :
                  selectedUni.rank === 3 ? 'rank-3' : 'rank-other'
                }`}>
                  {selectedUni.rank}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">{selectedUni.name}</h3>
                  <p className="text-sm text-gupi-ink-300">{selectedUni.country} • تأسست {selectedUni.founded}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-6">
                <div>
                  <div className="text-3xl font-black">{selectedUni.gupi.totalScore}</div>
                  <div className="text-xs text-gupi-ink-300">درجة GUPI / 10</div>
                </div>
                <div>
                  <div className="text-3xl font-black">{selectedUni.gupi.presenceScore}</div>
                  <div className="text-xs text-gupi-ink-300">الحضور / 7</div>
                </div>
                <div>
                  <div className="text-3xl font-black">{selectedUni.gupi.excellenceScore}</div>
                  <div className="text-xs text-gupi-ink-300">التميز / 3</div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Presence details */}
              <div>
                <h4 className="font-bold text-gupi-orange-900 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gupi-orange-600" />
                  الحضور في التصنيفات العالمية (7 درجات)
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedUni.gupi.presenceDetails.map((d, i) => (
                    <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                      d.present ? 'bg-green-50 text-green-700' : 'bg-gupi-ink-50 text-gupi-ink-400'
                    }`}>
                      <span>{d.label}</span>
                      <span className="font-bold">{d.present ? '✓ 1' : '✗ 0'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excellence details */}
              <div>
                <h4 className="font-bold text-gupi-amber-800 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-gupi-amber-600" />
                  التميز في التصنيفات الكبرى (3 درجات)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {selectedUni.gupi.excellenceDetails.map((d, i) => (
                    <div key={i} className={`flex flex-col items-center px-3 py-3 rounded-lg text-sm ${
                      d.present ? 'bg-gupi-amber-50 text-gupi-amber-700' : 'bg-gupi-ink-50 text-gupi-ink-400'
                    }`}>
                      <span className="mb-1">{d.label}</span>
                      <span className="font-bold">{d.present ? '✓ 1' : '✗ 0'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link to full card */}
              <div className="pt-2">
                <Link href={`/universities/${selectedUni.id}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-gupi-orange-600 to-gupi-orange-800 text-white font-bold hover:from-gupi-orange-700 hover:to-gupi-orange-900 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  عرض بطاقة الجامعة الكاملة
                </Link>
              </div>

              {/* All rankings */}
              <div>
                <h4 className="font-bold text-gupi-ink-700 mb-3">جميع التصنيفات</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ['Shanghai (ARWU)', selectedUni.shanghai_ranking],
                    ['THE العالمي', selectedUni.the_ranking],
                    ['AD Scientific', selectedUni.ad_scientific_index],
                    ['QS العالمي', selectedUni.qs_ranking],
                    ['Scimago', selectedUni.scimago],
                    ['CWTS', selectedUni.cwts],
                    ['UniRank العالمي', selectedUni.unirank_world],
                    ['QS العربي', selectedUni.qs_arab],
                    ['THE العربي', selectedUni.the_arab],
                    ['US News', selectedUni.us_news],
                    ['UniRank العربي', selectedUni.unirank_arabic],
                    ['THE Impact', selectedUni.the_impact],
                    ['UI GreenMetric', selectedUni.ui_greenmetric],
                    ['CWUR', selectedUni.cwur],
                    ['ScholarGPS', selectedUni.scholar_gps],
                    ['RUR', selectedUni.rur],
                    ['GUV', selectedUni.guv],
                    ['Arabic Ranking', selectedUni.arabic_ranking],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between px-3 py-1.5 rounded bg-gupi-ink-50">
                      <span className="text-gupi-ink-600">{label}</span>
                      <span className={`font-medium ${val ? 'text-gupi-orange-700' : 'text-gupi-ink-300'}`}>
                        {val || '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
