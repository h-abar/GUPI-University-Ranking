'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Users, Globe, Award, TrendingUp, MapPin, Trophy } from 'lucide-react';

const COUNTRY_COLORS = [
  '#0c8ce7', '#eab308', '#10b981', '#f97316', '#8b5cf6',
  '#ec4899', '#06b6d4', '#ef4444', '#84cc16', '#f59e0b',
  '#6366f1', '#14b8a6', '#a855f7',
];

export default function DashboardPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data) => {
        setUniversities(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gupi-200 border-t-gupi-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600">جاري تحميل لوحة البيانات...</p>
      </div>
    );
  }

  // Top 10 universities
  const top10 = universities.slice(0, 10).map((u) => ({
    name: u.name.length > 20 ? u.name.substring(0, 20) + '...' : u.name,
    fullName: u.name,
    score: u.gupi.totalScore,
    presence: u.gupi.presenceScore,
    excellence: u.gupi.excellenceScore,
    rank: u.rank,
  }));

  // Country distribution
  const countryCounts = {};
  universities.forEach((u) => {
    if (u.country) {
      countryCounts[u.country] = (countryCounts[u.country] || 0) + 1;
    }
  });
  const countryData = Object.entries(countryCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Score distribution
  const scoreBuckets = { '0-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0 };
  universities.forEach((u) => {
    const s = u.gupi.totalScore;
    if (s <= 2) scoreBuckets['0-2']++;
    else if (s <= 4) scoreBuckets['3-4']++;
    else if (s <= 6) scoreBuckets['5-6']++;
    else if (s <= 8) scoreBuckets['7-8']++;
    else scoreBuckets['9-10']++;
  });
  const scoreData = Object.entries(scoreBuckets).map(([range, count]) => ({ range, count }));

  // Presence vs Excellence scatter
  const scatterData = universities.map((u) => ({
    x: u.gupi.presenceScore,
    y: u.gupi.excellenceScore,
    z: u.articles_2025 || 100,
    name: u.name,
    country: u.country,
    rank: u.rank,
  }));

  // Average scores by country
  const countryScores = {};
  universities.forEach((u) => {
    if (u.country) {
      if (!countryScores[u.country]) {
        countryScores[u.country] = { total: 0, count: 0, presence: 0, excellence: 0 };
      }
      countryScores[u.country].total += u.gupi.totalScore;
      countryScores[u.country].presence += u.gupi.presenceScore;
      countryScores[u.country].excellence += u.gupi.excellenceScore;
      countryScores[u.country].count++;
    }
  });
  const countryAvgData = Object.entries(countryScores)
    .map(([country, data]) => ({
      country,
      avgScore: +(data.total / data.count).toFixed(1),
      avgPresence: +(data.presence / data.count).toFixed(1),
      avgExcellence: +(data.excellence / data.count).toFixed(1),
      count: data.count,
    }))
    .sort((a, b) => b.avgScore - a.avgScore);

  // Ranking presence rates
  const presenceFields = [
    { field: 'shanghai_ranking', label: 'ARWU' },
    { field: 'the_ranking', label: 'THE' },
    { field: 'ad_scientific_index', label: 'AD Scientific' },
    { field: 'qs_ranking', label: 'QS' },
    { field: 'scimago', label: 'Scimago' },
    { field: 'cwts', label: 'CWTS' },
    { field: 'unirank_world', label: 'UniRank' },
  ];
  const presenceRates = presenceFields.map(({ field, label }) => {
    const count = universities.filter((u) => u[field] != null && String(u[field]).trim() !== '' && String(u[field]).trim() !== 'ـ').length;
    return { label, count, rate: +((count / universities.length) * 100).toFixed(0) };
  });

  const totalArticles = universities.reduce((sum, u) => sum + (u.articles_2025 || 0), 0);
  const avgScore = (universities.reduce((sum, u) => sum + u.gupi.totalScore, 0) / universities.length).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="hero-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-black mb-3">
            لوحة البيانات التفاعلية — <span className="gold-text">GUPI</span>
          </h1>
          <p className="text-slate-300 text-lg">
            تحليل بصري شامل لمؤشر الحضور العالمي للجامعات العربية
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'إجمالي الجامعات', value: universities.length, icon: Users, color: 'from-gupi-500 to-gupi-700' },
            { label: 'إجمالي الأبحاث', value: totalArticles.toLocaleString(), icon: TrendingUp, color: 'from-emerald-500 to-emerald-700' },
            { label: 'متوسط درجة GUPI', value: avgScore, icon: Award, color: 'from-gold-500 to-gold-700' },
            { label: 'الدول الممثلة', value: Object.keys(countryCounts).length, icon: Globe, color: 'from-purple-500 to-purple-700' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-display font-black text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Top 10 Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-display font-bold text-gupi-900 mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold-500" />
            أفضل 10 جامعات — درجات GUPI
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={top10} layout="vertical" margin={{ right: 20, left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={150} />
              <Tooltip
                contentStyle={{ direction: 'rtl', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                formatter={(value, name) => {
                  if (name === 'درجة GUPI') return [value, name];
                  return [value, name];
                }}
                labelFormatter={(label) => {
                  const item = top10.find((t) => t.name === label);
                  return item ? `#${item.rank} ${item.fullName}` : label;
                }}
              />
              <Legend />
              <Bar dataKey="presence" name="الحضور (7)" stackId="a" fill="#0c8ce7" radius={[0, 0, 0, 0]} />
              <Bar dataKey="excellence" name="التميز (3)" stackId="a" fill="#eab308" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Country distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-display font-bold text-gupi-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gupi-600" />
              توزيع الجامعات حسب الدولة
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {countryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[index % COUNTRY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Score distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-display font-bold text-gupi-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold-500" />
              توزيع الدرجات
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px' }} />
                <Bar dataKey="count" name="عدد الجامعات" fill="#0c8ce7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Presence rates */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-display font-bold text-gupi-900 mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gupi-600" />
            معدلات الحضور في التصنيفات العالمية
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={presenceRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
              <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px' }} formatter={(v, n) => n === 'rate' ? [`${v}%`, 'نسبة الحضور'] : [v, 'عدد الجامعات']} />
              <Bar dataKey="rate" name="rate" fill="#0c8ce7" radius={[8, 8, 0, 0]}>
                {presenceRates.map((_, i) => (
                  <Cell key={i} fill={COUNTRY_COLORS[i % COUNTRY_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Scatter: Presence vs Excellence */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-display font-bold text-gupi-900 mb-6">
              العلاقة بين الحضور والتميز
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="x" name="الحضور" domain={[0, 7]} tick={{ fontSize: 12 }} label={{ value: 'الحضور (0-7)', position: 'bottom', offset: 10 }} />
                <YAxis type="number" dataKey="y" name="التميز" domain={[0, 3]} tick={{ fontSize: 12 }} label={{ value: 'التميز (0-3)', angle: -90, position: 'insideLeft' }} />
                <ZAxis type="number" dataKey="z" range={[50, 400]} name="الأبحاث" />
                <Tooltip
                  contentStyle={{ direction: 'rtl', borderRadius: '12px' }}
                  formatter={(v, n) => {
                    if (n === 'الحضور') return [v, n];
                    if (n === 'التميز') return [v, n];
                    if (n === 'الأبحاث') return [v?.toLocaleString(), n];
                    return [v, n];
                  }}
                  labelFormatter={() => ''}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter data={scatterData} fill="#0c8ce7" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Country averages */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-display font-bold text-gupi-900 mb-6">
              متوسط الدرجات حسب الدولة
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={countryAvgData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="country" tick={{ fontSize: 11 }} width={100} />
                <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px' }} />
                <Bar dataKey="avgScore" name="متوسط GUPI" fill="#0c8ce7" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Country comparison radar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-display font-bold text-gupi-900 mb-6">
            مقارنة الحضور والتميز حسب الدولة
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={countryAvgData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="country" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px' }} />
              <Legend />
              <Bar dataKey="avgPresence" name="متوسط الحضور" fill="#0c8ce7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgExcellence" name="متوسط التميز" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
