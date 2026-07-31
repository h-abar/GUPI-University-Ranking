'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  Users, Globe, Award, TrendingUp, MapPin, Trophy, BarChart3,
  Crown, Medal, Sparkles, Database
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/home/Reveal';
import CountUp from '@/components/home/CountUp';
import { useLang } from '@/lib/LanguageContext';

/* لوحة ألوان الرسوم — مشتقة حصرياً من هوية GUPI */
const GUPI_CHART = [
  '#D5791F', '#F2C063', '#75805F', '#A16626', '#CEA250',
  '#939C82', '#7B4E1D', '#F5CE85', '#505840', '#EDAD67',
  '#3D4331', '#F2C492', '#553614',
];

const TOOLTIP_STYLE = {
  direction: 'rtl',
  borderRadius: '12px',
  border: '1px solid #F2C492',
  backgroundColor: '#FFFDF9',
  fontSize: 13,
};

export default function DashboardPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLang();

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data) => {
        setUniversities(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gupi-bg">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-gupi-orange-200 border-t-gupi-orange-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gupi-ink-600 text-sm">{t('dash_loading')}</p>
        </div>
      </div>
    );
  }

  const total = universities.length || 1;

  /* ===== أفضل 10 ===== */
  const top10 = universities.slice(0, 10).map((u) => ({
    name: u.name.length > 22 ? u.name.substring(0, 22) + '…' : u.name,
    fullName: u.name,
    presence: u.gupi.presenceComponent || 0,
    excellence: u.gupi.excellenceComponent || 0,
    rank: u.rank,
  }));

  /* ===== توزيع الدول ===== */
  const countryCounts = {};
  universities.forEach((u) => {
    if (u.country) countryCounts[u.country] = (countryCounts[u.country] || 0) + 1;
  });
  const countryData = Object.entries(countryCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  /* ===== توزيع الدرجات (من 100) ===== */
  const scoreBuckets = { '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 };
  universities.forEach((u) => {
    const s = u.gupi.totalScore;
    if (s <= 20) scoreBuckets['0-20']++;
    else if (s <= 40) scoreBuckets['21-40']++;
    else if (s <= 60) scoreBuckets['41-60']++;
    else if (s <= 80) scoreBuckets['61-80']++;
    else scoreBuckets['81-100']++;
  });
  const scoreData = Object.entries(scoreBuckets).map(([range, count]) => ({ range, count }));

  /* ===== معدلات الحضور في التصنيفات السبعة ===== */
  const presenceFields = [
    { field: 'qs_ranking', label: 'QS' },
    { field: 'the_ranking', label: 'THE' },
    { field: 'shanghai_ranking', label: 'ARWU' },
    { field: 'ad_scientific_index', label: 'AD Scientific' },
    { field: 'scimago', label: 'Scimago' },
    { field: 'cwts', label: 'CWTS' },
    { field: 'unirank_world', label: 'UniRank' },
  ];
  const presenceRates = presenceFields.map(({ field, label }) => {
    const count = universities.filter((u) => {
      const v = u[field];
      return v != null && String(v).trim() !== '' && String(v).trim() !== 'ـ' && String(v).trim() !== '-';
    }).length;
    return { label, count, rate: +((count / total) * 100).toFixed(0) };
  }).sort((a, b) => b.rate - a.rate);

  /* ===== مبعثر الحضور × التميز (مكوّنات مرجحة) ===== */
  const scatterData = universities.map((u) => ({
    x: u.gupi.presenceComponent || 0,
    y: u.gupi.excellenceComponent || 0,
    z: u.articles_2025 || 100,
    name: u.name,
    rank: u.rank,
  }));

  /* ===== متوسطات الدول ===== */
  const countryScores = {};
  universities.forEach((u) => {
    if (!u.country) return;
    if (!countryScores[u.country]) countryScores[u.country] = { total: 0, count: 0, presence: 0, excellence: 0 };
    countryScores[u.country].total += u.gupi.totalScore;
    countryScores[u.country].presence += (u.gupi.presenceComponent || 0);
    countryScores[u.country].excellence += (u.gupi.excellenceComponent || 0);
    countryScores[u.country].count++;
  });
  const countryAvgData = Object.entries(countryScores)
    .map(([country, d]) => ({
      country,
      avgScore: +(d.total / d.count).toFixed(1),
      avgPresence: +(d.presence / d.count).toFixed(1),
      avgExcellence: +(d.excellence / d.count).toFixed(1),
    }))
    .sort((a, b) => b.avgScore - a.avgScore);

  /* ===== مؤشرات عامة ===== */
  const totalArticles = universities.reduce((s, u) => s + (u.articles_2025 || 0), 0);
  const avgScore = (universities.reduce((s, u) => s + u.gupi.totalScore, 0) / total).toFixed(1);
  const avgPresence = (universities.reduce((s, u) => s + u.gupi.presenceScore, 0) / total).toFixed(1);
  const leader = universities[0];
  const bestExcellence = [...universities].sort((a, b) => b.gupi.excellenceScore - a.gupi.excellenceScore)[0];

  const kpis = [
    { label: t('dash_kpi_universities'), value: universities.length, icon: Users, color: 'from-gupi-orange-500 to-gupi-orange-700' },
    { label: t('dash_kpi_countries'), value: Object.keys(countryCounts).length, icon: Globe, color: 'from-gupi-sage-500 to-gupi-sage-700' },
    { label: t('dash_kpi_articles'), value: totalArticles, icon: Database, color: 'from-gupi-amber-500 to-gupi-amber-700', locale: true },
    { label: t('dash_kpi_avg'), value: avgScore, icon: Award, color: 'from-gupi-orange-400 to-gupi-orange-600', static: true },
  ];

  const insights = [
    { icon: Crown, label: t('dash_ins_leader'), value: leader?.name || '—', sub: leader ? `${leader.gupi.totalScore} / 100 ${lang === 'ar' ? 'درجة' : 'pts'}` : '', gold: true },
    { icon: MapPin, label: t('dash_ins_countries'), value: countryData[0]?.name || '—', sub: countryData[0] ? `${countryData[0].value} ${lang === 'ar' ? 'جامعة' : 'universities'}` : '' },
    { icon: Globe, label: t('dash_ins_presence'), value: avgPresence, sub: t('dash_ins_presence_sub') },
    { icon: Medal, label: t('dash_ins_excellence'), value: bestExcellence?.name || '—', sub: bestExcellence ? `${bestExcellence.gupi.excellenceScore} / 5 ${lang === 'ar' ? 'درجات' : 'pts'}` : '' },
  ];

  return (
    <div className="min-h-screen bg-gupi-bg">
      <PageHero
        icon={BarChart3}
        eyebrow={t('dash_eyebrow')}
        title={lang === 'ar' ? <>مرصد <span className="gold-shimmer">الحضور العالمي</span></> : <>Global Presence <span className="gold-shimmer">Observatory</span></>}
        subtitle={t('dash_subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16 relative z-10">
        {/* ===== مؤشرات الأداء ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <Reveal key={i} delay={i * 90}>
                <div className="shine-card card-hover bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-display font-black text-gupi-ink-900">
                    {kpi.static ? kpi.value : <CountUp end={kpi.value} />}
                  </div>
                  <div className="text-xs text-gupi-ink-500 mt-1">{kpi.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ===== رؤى سريعة ===== */}
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {insights.map((ins, i) => {
              const Icon = ins.icon;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-4 border flex items-center gap-3 ${
                    ins.gold
                      ? 'bg-gupi-orange-950 border-gupi-amber-400/30 text-white glow-gold'
                      : 'bg-white border-gupi-ink-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    ins.gold ? 'bg-gupi-amber-400/20' : 'bg-gupi-orange-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${ins.gold ? 'text-gupi-amber-400' : 'text-gupi-orange-600'}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-[11px] font-semibold ${ins.gold ? 'text-gupi-amber-300' : 'text-gupi-ink-400'}`}>{ins.label}</div>
                    <div className={`font-bold text-sm truncate ${ins.gold ? 'text-white' : 'text-gupi-orange-900'}`}>{ins.value}</div>
                    {ins.sub && <div className={`text-[11px] ${ins.gold ? 'text-gupi-ink-300' : 'text-gupi-ink-400'}`}>{ins.sub}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ===== أفضل 10 جامعات ===== */}
        <Reveal>
          <ChartCard icon={Trophy} title={t('dash_top10_title')} subtitle={t('dash_top10_sub')}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={top10} layout="vertical" margin={{ right: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#656461' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#3A3835' }} width={170} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelFormatter={(label) => {
                    const item = top10.find((t) => t.name === label);
                    return item ? `#${item.rank} ${item.fullName}` : label;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="presence" name={t('dash_presence_label')} stackId="a" fill="#D5791F" />
                <Bar dataKey="excellence" name={t('dash_excellence_label')} stackId="a" fill="#F2C063" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* ===== توزيع الدول ===== */}
          <Reveal>
            <ChartCard icon={MapPin} title={t('dash_countries_title')} subtitle={t('dash_countries_sub')}>
              <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={110}
                    paddingAngle={2}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    dataKey="value"
                  >
                    {countryData.map((_, index) => (
                      <Cell key={index} fill={GUPI_CHART[index % GUPI_CHART.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          {/* ===== توزيع الدرجات ===== */}
          <Reveal delay={100}>
            <ChartCard icon={Award} title={t('dash_score_title')} subtitle={t('dash_score_sub')}>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                  <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#656461' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#656461' }} allowDecimals={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [v, t('dash_uni_count')]} />
                  <Bar dataKey="count" name={t('dash_uni_count')} radius={[8, 8, 0, 0]}>
                    {scoreData.map((_, i) => (
                      <Cell key={i} fill={GUPI_CHART[i % GUPI_CHART.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>

        {/* ===== معدلات الحضور في التصنيفات ===== */}
        <Reveal className="mt-6">
          <ChartCard icon={Globe} title={t('dash_presence_rates_title')} subtitle={t('dash_presence_rates_sub')}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={presenceRates} layout="vertical" margin={{ right: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#656461' }} unit="%" />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 12, fill: '#3A3835' }} width={100} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v, n) => n === 'rate' ? [`${v}%`, t('dash_presence_rate')] : [v, t('dash_uni_count')]} />
                <Bar dataKey="rate" name="rate" radius={[8, 8, 8, 8]} barSize={22}>
                  {presenceRates.map((_, i) => (
                    <Cell key={i} fill={GUPI_CHART[i % GUPI_CHART.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* ===== الحضور × التميز ===== */}
          <Reveal>
            <ChartCard icon={Sparkles} title={t('dash_scatter_title')} subtitle={t('dash_scatter_sub')}>
              <ResponsiveContainer width="100%" height={340}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                  <XAxis type="number" dataKey="x" name={t('dash_presence_label')} domain={[0, 70]} tick={{ fontSize: 11, fill: '#656461' }} label={{ value: lang === 'ar' ? 'الحضور (0-70)' : 'Presence (0-70)', position: 'bottom', offset: 5, fontSize: 11 }} />
                  <YAxis type="number" dataKey="y" name={t('dash_excellence_label')} domain={[0, 30]} tick={{ fontSize: 11, fill: '#656461' }} label={{ value: lang === 'ar' ? 'التميز (0-30)' : 'Excellence (0-30)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                  <ZAxis type="number" dataKey="z" range={[40, 320]} name={t('dash_articles_label')} />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v, n) => (n === t('dash_articles_label') ? [v?.toLocaleString(), n] : [v, n])}
                    labelFormatter={() => ''}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Scatter data={scatterData} fill="#D5791F" fillOpacity={0.55} />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>

          {/* ===== متوسط الدول ===== */}
          <Reveal delay={100}>
            <ChartCard icon={TrendingUp} title={t('dash_country_avg_title')} subtitle={t('dash_country_avg_sub')}>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={countryAvgData} layout="vertical" margin={{ right: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#656461' }} />
                  <YAxis type="category" dataKey="country" tick={{ fontSize: 11, fill: '#3A3835' }} width={90} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [v, t('dash_avg_gupi')]} />
                  <Bar dataKey="avgScore" name={t('dash_avg_gupi')} fill="#D5791F" radius={[8, 8, 8, 8]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Reveal>
        </div>

        {/* ===== الحضور × التميز حسب الدولة ===== */}
        <Reveal className="mt-6">
          <ChartCard icon={BarChart3} title={t('dash_compare_title')} subtitle={t('dash_compare_sub')}>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={countryAvgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
                <XAxis dataKey="country" tick={{ fontSize: 10, fill: '#656461' }} angle={-20} textAnchor="end" height={70} interval={0} />
                <YAxis tick={{ fontSize: 11, fill: '#656461' }} domain={[0, 70]} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="avgPresence" name={t('dash_avg_presence')} fill="#D5791F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgExcellence" name={t('dash_avg_excellence')} fill="#F2C063" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>
      </div>
    </div>
  );
}

/* ===== بطاقة رسم بياني موحّدة ===== */
function ChartCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-5 h-full">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-base text-gupi-orange-900">{title}</h2>
          {subtitle && <p className="text-xs text-gupi-ink-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
