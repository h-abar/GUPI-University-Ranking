'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Swords, Search, X, Trophy, Award, Globe, MapPin, Calendar,
  BookOpen, TrendingUp, CheckCircle2, XCircle, Sparkles, Loader2,
  Crown, Target, Zap
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/home/Reveal';
import { useLang } from '@/lib/LanguageContext';

export default function ComparePage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uni1Id, setUni1Id] = useState('');
  const [uni2Id, setUni2Id] = useState('');
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [showList1, setShowList1] = useState(false);
  const [showList2, setShowList2] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiError, setAiError] = useState(null);
  const { t, lang } = useLang();

  useEffect(() => {
    fetch('/api/compare')
      .then((r) => r.json())
      .then((data) => {
        setUniversities(data);
        setLoading(false);
      });
  }, []);

  const filtered1 = useMemo(() => {
    if (!search1) return universities;
    return universities.filter((u) => u.name?.includes(search1));
  }, [universities, search1]);

  const filtered2 = useMemo(() => {
    if (!search2) return universities;
    return universities.filter((u) => u.name?.includes(search2));
  }, [universities, search2]);

  const uni1 = universities.find((u) => u.id === uni1Id);
  const uni2 = universities.find((u) => u.id === uni2Id);

  async function handleCompare() {
    if (!uni1Id || !uni2Id || uni1Id === uni2Id) return;
    setComparing(true);
    setAiAnalysis(null);
    setAiError(null);
    setComparison(null);

    let comparisonData = null;

    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ university1Id: uni1Id, university2Id: uni2Id }),
      });
      const data = await res.json();
      if (data.error) {
        setAiError(data.error);
        setComparing(false);
        return;
      }
      comparisonData = data;
      setComparison(data);
    } catch (err) {
      setAiError(t('compare_error_fetch'));
      setComparing(false);
      return;
    }
    setComparing(false);

    // Fetch AI analysis separately so comparison data shows immediately
    setAiLoading(true);
    try {
      const aiRes = await fetch('/api/compare', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ university1Id: uni1Id, university2Id: uni2Id }),
      });
      const aiData = await aiRes.json();
      if (aiData.aiAnalysis) {
        setAiAnalysis(aiData.aiAnalysis);
      } else if (aiData.aiError) {
        setAiError(aiData.aiError);
      }
    } catch (err) {
      setAiError(t('compare_error_ai'));
    }
    setAiLoading(false);
  }

  function resetComparison() {
    setComparison(null);
    setAiAnalysis(null);
    setAiError(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gupi-orange-200 border-t-gupi-orange-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gupi-ink-600">{t('compare_loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gupi-bg">
      <PageHero
        icon={Swords}
        eyebrow={t('compare_eyebrow')}
        title={lang === 'ar' ? <>تحدي <span className="gold-shimmer">الحضور الدولي</span></> : <>International Presence <span className="gold-shimmer">Challenge</span></>}
        subtitle={t('compare_subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Reveal>
        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8">
          {/* University 1 Selector */}
          <UniSelector
            label={t('compare_uni1')}
            color="orange"
            universities={filtered1}
            selectedId={uni1Id}
            onSelect={(id) => { setUni1Id(id); setShowList1(false); setSearch1(''); }}
            search={search1}
            setSearch={setSearch1}
            showList={showList1}
            setShowList={setShowList1}
            allUniversities={universities}
            excludeId={uni2Id}
            t={t}
          />

          {/* VS Badge */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 flex items-center justify-center shadow-lg animate-pulse-glow">
              <Swords className="w-8 h-8 text-white" />
            </div>
            <span className="mt-2 font-display font-black text-xl text-gupi-orange-700">VS</span>
          </div>

          {/* University 2 Selector */}
          <UniSelector
            label={t('compare_uni2')}
            color="amber"
            universities={filtered2}
            selectedId={uni2Id}
            onSelect={(id) => { setUni2Id(id); setShowList2(false); setSearch2(''); }}
            search={search2}
            setSearch={setSearch2}
            showList={showList2}
            setShowList={setShowList2}
            allUniversities={universities}
            excludeId={uni1Id}
            t={t}
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleCompare}
            disabled={!uni1Id || !uni2Id || uni1Id === uni2Id || comparing}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gupi-amber-400 to-gupi-orange-600 text-gupi-orange-950 font-bold hover:scale-105 transition-all shadow-xl glow-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
          >
            {comparing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('compare_comparing')}
              </>
            ) : (
              <>
                <Swords className="w-5 h-5" />
                {t('compare_start')}
              </>
            )}
          </button>
        </div>
        </Reveal>

        {/* Error */}
        {aiError && !comparison && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8">
            <p className="text-red-700 font-medium">{aiError}</p>
          </div>
        )}

        {/* Comparison Results */}
        {comparison && (
          <Reveal>
          <ComparisonResults
            comparison={comparison}
            aiAnalysis={aiAnalysis}
            aiError={aiError}
            aiLoading={aiLoading}
            onReset={resetComparison}
            t={t}
            lang={lang}
          />
          </Reveal>
        )}
      </div>

      <div className="h-12" />
    </div>
  );
}

/* ============ University Selector Component ============ */
function UniSelector({ label, color, universities, selectedId, onSelect, search, setSearch, showList, setShowList, allUniversities, excludeId, t }) {
  const selected = allUniversities.find((u) => u.id === selectedId);
  const colorClasses = color === 'orange'
    ? { bg: 'from-gupi-orange-500 to-gupi-orange-700', text: 'text-gupi-orange-700', border: 'border-gupi-orange-300', light: 'bg-gupi-orange-50' }
    : { bg: 'from-gupi-amber-500 to-gupi-amber-700', text: 'text-gupi-amber-700', border: 'border-gupi-amber-300', light: 'bg-gupi-amber-50' };

  return (
    <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-5 relative">
      <label className={`block text-sm font-bold mb-3 ${colorClasses.text}`}>{label}</label>

      {selected ? (
        <div className={`rounded-xl p-4 ${colorClasses.light} border-2 ${colorClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-bold text-lg text-gupi-ink-900">{selected.name}</div>
              <div className="flex items-center gap-2 text-sm text-gupi-ink-500 mt-1">
                <MapPin className="w-3 h-3" />
                {selected.country}
              </div>
            </div>
            <button
              onClick={() => { onSelect(''); }}
              className="p-2 rounded-lg hover:bg-white/60"
            >
              <X className="w-4 h-4 text-gupi-ink-400" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gupi-ink-400" />
            <input
              type="text"
              placeholder={t('compare_search')}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowList(true); }}
              onFocus={() => setShowList(true)}
              className="w-full pe-10 ps-4 py-3 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all"
            />
          </div>

          {showList && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowList(false)} />
              <div className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-xl border border-gupi-ink-100 max-h-64 overflow-y-auto">
                {universities.length === 0 ? (
                  <div className="p-4 text-center text-gupi-ink-400 text-sm">{t('compare_no_results')}</div>
                ) : (
                  universities.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => onSelect(u.id)}
                      disabled={u.id === excludeId}
                      className={`w-full text-start px-4 py-3 hover:bg-gupi-orange-50 transition-colors border-b border-gupi-ink-50 last:border-0 flex items-center justify-between ${
                        u.id === excludeId ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                    >
                      <div>
                        <div className="font-medium text-gupi-ink-800 text-sm">{u.name}</div>
                        <div className="text-xs text-gupi-ink-400">{u.country}</div>
                      </div>
                      {u.id === excludeId && <span className="text-xs text-gupi-ink-300">{t('compare_selected')}</span>}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ Comparison Results Component ============ */
function ComparisonResults({ comparison, aiAnalysis, aiError, aiLoading, onReset, t, lang }) {
  const { uni1, uni2, allRankings, settings } = comparison;
  const maxTotal = parseFloat(settings.maxTotal) || 100;
  const maxPresence = parseFloat(settings.maxPresence) || 18;
  const maxExcellence = parseFloat(settings.maxExcellence) || 5;

  const winner = uni1.gupi.totalScore > uni2.gupi.totalScore ? 1 : uni2.gupi.totalScore > uni1.gupi.totalScore ? 2 : 0;

  // Radar chart data
  const radarData = [
    { metric: t('rankings_col_presence'), uni1: uni1.gupi.presenceScore, uni2: uni2.gupi.presenceScore, max: maxPresence },
    { metric: t('rankings_col_excellence'), uni1: uni1.gupi.excellenceScore, uni2: uni2.gupi.excellenceScore, max: maxExcellence },
    { metric: 'GUPI', uni1: uni1.gupi.totalScore, uni2: uni2.gupi.totalScore, max: maxTotal },
    { metric: t('rankings_col_articles'), uni1: normalizeArticles(uni1.articles_2025), uni2: normalizeArticles(uni2.articles_2025), max: 100 },
  ];

  // Bar chart data
  const barData = [
    { name: t('rankings_col_presence'), uni1: uni1.gupi.presenceScore, uni2: uni2.gupi.presenceScore },
    { name: t('rankings_col_excellence'), uni1: uni1.gupi.excellenceScore, uni2: uni2.gupi.excellenceScore },
    { name: 'GUPI', uni1: uni1.gupi.totalScore, uni2: uni2.gupi.totalScore },
  ];

  return (
    <div className="space-y-6">
      {/* Winner Banner */}
      <div className={`rounded-2xl p-6 text-center shadow-lg relative overflow-hidden ${winner === 0 ? 'bg-gradient-to-r from-gupi-ink-600 to-gupi-ink-800' : winner === 1 ? 'bg-gradient-to-r from-gupi-orange-600 to-gupi-orange-800' : 'bg-gradient-to-r from-gupi-amber-500 to-gupi-amber-700'} text-white`}>
        <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <div className="relative">
        {winner === 0 ? (
          <>
            <Trophy className="w-9 h-9 mx-auto mb-2" />
            <h2 className="text-xl font-display font-black">{t('compare_tie')}</h2>
            <p className="text-white/80 text-sm">{t('compare_tie_desc')}</p>
          </>
        ) : (
          <>
            <Crown className="w-9 h-9 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(242,192,99,0.9)]" />
            <h2 className="text-xl font-display font-black">{t('compare_winner')}: {winner === 1 ? uni1.name : uni2.name}</h2>
            <p className="text-white/80 text-sm">{t('compare_winner_score')}: {winner === 1 ? uni1.gupi.totalScore : uni2.gupi.totalScore} / {maxTotal}</p>
          </>
        )}
        <button onClick={onReset} className="mt-4 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors">
          {t('compare_new')}
        </button>
        </div>
      </div>

      {/* Score Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreCard uni={uni1} color="orange" maxTotal={maxTotal} maxPresence={maxPresence} maxExcellence={maxExcellence} isWinner={winner === 1} t={t} />
        <ScoreCard uni={uni2} color="amber" maxTotal={maxTotal} maxPresence={maxPresence} maxExcellence={maxExcellence} isWinner={winner === 2} t={t} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-display font-bold text-lg text-gupi-orange-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-gupi-orange-600" />
            {t('compare_radar_title')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#EFEFEF" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#656461', fontSize: 13 }} />
              <PolarRadiusAxis tick={{ fill: '#91908E', fontSize: 10 }} />
              <Radar name={uni1.name} dataKey="uni1" stroke="#D5791F" fill="#D5791F" fillOpacity={0.3} />
              <Radar name={uni2.name} dataKey="uni2" stroke="#F2C063" fill="#F2C063" fillOpacity={0.3} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-display font-bold text-lg text-gupi-orange-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gupi-orange-600" />
            {t('compare_bar_title')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEF" />
              <XAxis dataKey="name" tick={{ fill: '#656461', fontSize: 13 }} />
              <YAxis tick={{ fill: '#91908E', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #DBDBDB', fontSize: 13 }}
                formatter={(value) => [value, '']}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="uni1" name={uni1.name} fill="#D5791F" radius={[8, 8, 0, 0]} />
              <Bar dataKey="uni2" name={uni2.name} fill="#F2C063" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Rankings Comparison Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gupi-orange-950 text-white px-6 py-4">
          <h3 className="font-display font-bold text-lg flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t('compare_table_title')}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gupi-ink-50 border-b border-gupi-ink-100">
                <th className="px-4 py-3 text-start font-bold text-gupi-ink-700">{t('compare_col_ranking')}</th>
                <th className="px-4 py-3 text-center font-bold text-gupi-orange-700">{uni1.name}</th>
                <th className="px-4 py-3 text-center font-bold text-gupi-amber-700">{uni2.name}</th>
                <th className="px-4 py-3 text-center font-bold text-gupi-ink-600">{t('compare_col_best')}</th>
              </tr>
            </thead>
            <tbody>
              {allRankings.map((r, idx) => {
                const better = getBetterRanking(r);
                return (
                  <tr key={r.field_key} className={`border-b border-gupi-ink-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gupi-ink-50/30'}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gupi-ink-800">{lang === 'ar' ? r.label_ar : r.label_en}</div>
                      <div className="text-xs text-gupi-ink-400">{lang === 'ar' ? r.label_en : r.label_ar}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <RankValue value={r.uni1_value} present={r.uni1_present} color="orange" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <RankValue value={r.uni2_value} present={r.uni2_present} color="amber" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {better === 1 && <span className="text-gupi-orange-600 font-bold text-xs">◄</span>}
                      {better === 2 && <span className="text-gupi-amber-600 font-bold text-xs">►</span>}
                      {better === 0 && <span className="text-gupi-ink-300 text-xs">=</span>}
                      {better === null && <span className="text-gupi-ink-300 text-xs">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Presence Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PresenceDetailsCard uni={uni1} color="orange" t={t} />
        <PresenceDetailsCard uni={uni2} color="amber" t={t} />
      </div>

      {/* AI Analysis Section */}
      <div className="bg-gradient-to-br from-gupi-ink-900 to-gupi-ink-950 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">{t('compare_ai_title')}</h3>
            <p className="text-sm text-gupi-ink-300">{t('compare_ai_sub')}</p>
          </div>
        </div>

        {aiLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-gupi-orange-400 animate-spin mb-4" />
            <p className="text-gupi-ink-300 text-sm">{t('compare_ai_loading')}</p>
            <p className="text-gupi-ink-400 text-xs mt-1">{t('compare_ai_loading_sub')}</p>
          </div>
        ) : aiAnalysis ? (
          <AIAnalysisContent content={aiAnalysis} />
        ) : aiError ? (
          <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-6">
            <p className="text-red-300">{aiError}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ============ Score Card ============ */
function ScoreCard({ uni, color, maxTotal, maxPresence, maxExcellence, isWinner, t }) {
  const colorClasses = color === 'orange'
    ? { gradient: 'from-gupi-orange-500 to-gupi-orange-700', text: 'text-gupi-orange-700', bg: 'bg-gupi-orange-50', border: 'border-gupi-orange-200' }
    : { gradient: 'from-gupi-amber-500 to-gupi-amber-700', text: 'text-gupi-amber-700', bg: 'bg-gupi-amber-50', border: 'border-gupi-amber-200' };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${isWinner ? colorClasses.border : 'border-transparent'} relative`}>
      {isWinner && (
        <div className={`absolute -top-3 end-6 px-3 py-1 rounded-full bg-gradient-to-r ${colorClasses.gradient} text-white text-xs font-bold flex items-center gap-1`}>
          <Crown className="w-3 h-3" /> {t('compare_winner')}
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-gupi-ink-900">{uni.name}</h3>
          <div className="flex items-center gap-3 text-sm text-gupi-ink-500 mt-1">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {uni.country}</span>
            {uni.founded && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {uni.founded}</span>}
          </div>
        </div>
        <div className={`rank-badge ${uni.rank === 1 ? 'rank-1' : uni.rank === 2 ? 'rank-2' : uni.rank === 3 ? 'rank-3' : 'rank-other'}`}>
          {uni.rank}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <ScoreBox label="GUPI" value={uni.gupi.totalScore} max={maxTotal} color={color} />
        <ScoreBox label={t('rankings_col_presence')} value={uni.gupi.presenceScore} max={maxPresence} color={color} />
        <ScoreBox label={t('rankings_col_excellence')} value={uni.gupi.excellenceScore} max={maxExcellence} color={color} />
      </div>

      {uni.articles_2025 != null && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gupi-ink-500">
          <BookOpen className="w-4 h-4" />
          {t('compare_articles_2025')}: <span className="font-bold text-gupi-ink-700">{uni.articles_2025.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

function ScoreBox({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color === 'orange' ? 'bg-gupi-orange-500' : 'bg-gupi-amber-500';
  return (
    <div className="text-center">
      <div className="text-2xl font-display font-black text-gupi-ink-900">{value}</div>
      <div className="text-xs text-gupi-ink-400">/ {max}</div>
      <div className="text-xs text-gupi-ink-500 mt-1">{label}</div>
      <div className="mt-2 h-1.5 rounded-full bg-gupi-ink-100 overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ============ Rank Value Cell ============ */
function RankValue({ value, present, color }) {
  if (!present) {
    return <span className="text-gupi-ink-300">—</span>;
  }
  const colorClass = color === 'orange' ? 'text-gupi-orange-700 bg-gupi-orange-50' : 'text-gupi-amber-700 bg-gupi-amber-50';
  return (
    <span className={`inline-block px-2 py-1 rounded-lg text-sm font-bold ${colorClass}`}>
      {value}
    </span>
  );
}

/* ============ Presence Details Card ============ */
function PresenceDetailsCard({ uni, color, t }) {
  const colorClasses = color === 'orange'
    ? { text: 'text-gupi-orange-700', bg: 'bg-gupi-orange-50', border: 'border-gupi-orange-100', headerBg: 'bg-gupi-orange-950' }
    : { text: 'text-gupi-amber-700', bg: 'bg-gupi-amber-50', border: 'border-gupi-amber-100', headerBg: 'bg-gupi-amber-800' };

  const presenceCount = uni.gupi.presenceDetails.filter((d) => d.present).length;
  const totalCount = uni.gupi.presenceDetails.length;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className={`${colorClasses.headerBg} text-white px-6 py-4`}>
        <h3 className="font-display font-bold flex items-center gap-2">
          <Globe className="w-5 h-5" />
          {t('compare_presence_title')} — {uni.name}
        </h3>
        <p className="text-sm text-white/70 mt-1">{presenceCount} {t('compare_presence_of')} {totalCount} {t('compare_presence_rankings')}</p>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2">
        {uni.gupi.presenceDetails.map((d, i) => (
          <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${d.present ? colorClasses.bg : 'bg-gupi-ink-50'}`}>
            <span className={d.present ? 'text-gupi-ink-700' : 'text-gupi-ink-400'}>{d.label}</span>
            {d.present ? (
              <CheckCircle2 className={`w-4 h-4 ${colorClasses.text}`} />
            ) : (
              <XCircle className="w-4 h-4 text-gupi-ink-300" />
            )}
          </div>
        ))}
      </div>

      {/* Excellence details */}
      <div className="px-4 pb-4">
        <div className="text-xs font-bold text-gupi-ink-500 mb-2 flex items-center gap-1">
          <Award className="w-3 h-3" /> {t('compare_excellence_pts')}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {uni.gupi.excellenceDetails.map((d, i) => (
            <div key={i} className={`flex flex-col items-center px-2 py-2 rounded-lg text-xs ${d.present ? 'bg-gupi-amber-50 text-gupi-amber-700' : 'bg-gupi-ink-50 text-gupi-ink-400'}`}>
              <span className="mb-1 text-center">{d.label}</span>
              <span className="font-bold">{d.present ? `${d.excellencePoints}` : '0'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ AI Analysis Content ============ */
function AIAnalysisContent({ content }) {
  const sections = parseAIContent(content);

  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
          {section.title && (
            <h4 className="font-display font-bold text-gupi-orange-300 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {section.title}
            </h4>
          )}
          <div className="text-gupi-ink-200 text-sm leading-relaxed whitespace-pre-wrap">
            {section.body}
          </div>
        </div>
      ))}
    </div>
  );
}

function parseAIContent(content) {
  const lines = content.split('\n');
  const sections = [];
  let current = { title: null, body: '' };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      if (current.body || current.title) {
        sections.push(current);
      }
      current = { title: trimmed.replace(/^##\s+/, ''), body: '' };
    } else if (trimmed.startsWith('# ')) {
      if (current.body || current.title) {
        sections.push(current);
      }
      current = { title: trimmed.replace(/^#\s+/, ''), body: '' };
    } else {
      current.body += line + '\n';
    }
  }
  if (current.body || current.title) {
    sections.push(current);
  }

  return sections;
}

/* ============ Helper Functions ============ */
function normalizeArticles(articles) {
  if (!articles || articles === 0) return 0;
  // Normalize to 0-100 scale (cap at 10000 articles)
  return Math.min((articles / 10000) * 100, 100);
}

function getBetterRanking(r) {
  const v1 = r.uni1_present ? extractNum(r.uni1_value) : null;
  const v2 = r.uni2_present ? extractNum(r.uni2_value) : null;

  if (!r.uni1_present && !r.uni2_present) return null;
  if (r.uni1_present && !r.uni2_present) return 1;
  if (!r.uni1_present && r.uni2_present) return 2;

  // Both present — lower rank number is better
  if (v1 !== null && v2 !== null) {
    if (v1 < v2) return 1;
    if (v2 < v1) return 2;
    return 0;
  }

  // Both present but no numeric values — tie
  return 0;
}

function extractNum(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).replace(/[^\d]/g, '');
  if (s === '') return null;
  const num = parseInt(s, 10);
  return isNaN(num) ? null : num;
}
