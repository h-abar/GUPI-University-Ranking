'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Database, Upload, Plus, Edit2, Trash2, X, Search, Save,
  LogOut, AlertCircle, CheckCircle2, Download, Settings, Globe,
  Trophy, BarChart3, Table, Sliders, Eye, EyeOff, ChevronUp, ChevronDown,
  Award, Target, TrendingUp
} from 'lucide-react';

const ALL_FIELDS = [
  { key: 'shanghai_ranking', label: 'Shanghai (ARWU)' },
  { key: 'the_ranking', label: 'THE العالمي' },
  { key: 'ad_scientific_index', label: 'AD Scientific Index' },
  { key: 'qs_ranking', label: 'QS العالمي' },
  { key: 'arabic_ranking', label: 'Arabic Ranking' },
  { key: 'scimago', label: 'Scimago' },
  { key: 'cwts', label: 'CWTS' },
  { key: 'unirank_world', label: 'UniRank العالمي' },
  { key: 'qs_arab', label: 'QS العربي' },
  { key: 'the_arab', label: 'THE العربي' },
  { key: 'us_news', label: 'US News' },
  { key: 'unirank_arabic', label: 'UniRank العربي' },
  { key: 'the_impact', label: 'THE Impact' },
  { key: 'ui_greenmetric', label: 'UI GreenMetric' },
  { key: 'cwur', label: 'CWUR' },
  { key: 'scholar_gps', label: 'ScholarGPS' },
  { key: 'rur', label: 'RUR' },
  { key: 'guv', label: 'GUV' },
];

const EMPTY_UNI = {
  name: '', founded: '', country: '', articles_2025: '', description: '', short_code: '',
  ...Object.fromEntries(ALL_FIELDS.map((f) => [f.key, ''])),
};

const TABS = [
  { key: 'overview', label: 'نظرة عامة', icon: BarChart3 },
  { key: 'universities', label: 'إدارة الجامعات', icon: Table },
  { key: 'rankings', label: 'إعداد التصنيفات', icon: Sliders },
  { key: 'settings', label: 'إعدادات المؤشر', icon: Settings },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState('overview');
  const [universities, setUniversities] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const [uniRes, cfgRes, setRes] = await Promise.all([
      fetch('/api/universities'),
      fetch('/api/ranking-configs'),
      fetch('/api/settings'),
    ]);
    const uniData = await uniRes.json();
    const cfgData = await cfgRes.json();
    const setData = await setRes.json();
    setUniversities(uniData);
    setConfigs(cfgData);
    setSettings(setData);
    setLoading(false);
  }

  function handleLogout() {
    document.cookie = 'gupi_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/admin';
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin header */}
      <div className="bg-gupi-950 text-white py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gupi-400 to-gupi-600 flex items-center justify-center font-bold">G</div>
            <div>
              <div className="font-display font-bold">GUPI Admin</div>
              <div className="text-xs text-slate-400">لوحة التحكم الشاملة</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-slate-300 hover:text-white">عرض الموقع</a>
            <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300">
              <LogOut className="w-4 h-4" /> خروج
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    tab === t.key
                      ? 'border-gupi-600 text-gupi-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gupi-200 border-t-gupi-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {tab === 'overview' && <OverviewTab universities={universities} settings={settings} />}
            {tab === 'universities' && <UniversitiesTab universities={universities} configs={configs} onReload={loadAll} />}
            {tab === 'rankings' && <RankingsTab configs={configs} settings={settings} onReload={loadAll} />}
            {tab === 'settings' && <SettingsTab settings={settings} onReload={loadAll} />}
          </>
        )}
      </div>
    </div>
  );
}

/* ============ OVERVIEW TAB ============ */
function OverviewTab({ universities, settings }) {
  const countries = new Set(universities.map((u) => u.country).filter(Boolean));
  const avgScore = universities.length > 0
    ? (universities.reduce((s, u) => s + u.gupi.totalScore, 0) / universities.length).toFixed(1)
    : 0;
  const topScore = universities.length > 0 ? Math.max(...universities.map((u) => u.gupi.totalScore)) : 0;
  const lowScore = universities.length > 0 ? Math.min(...universities.map((u) => u.gupi.totalScore)) : 0;
  const totalArticles = universities.reduce((s, u) => s + (u.articles_2025 || 0), 0);

  const scoreBuckets = { '0-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0 };
  universities.forEach((u) => {
    const s = u.gupi.totalScore;
    if (s <= 2) scoreBuckets['0-2']++;
    else if (s <= 4) scoreBuckets['3-4']++;
    else if (s <= 6) scoreBuckets['5-6']++;
    else if (s <= 8) scoreBuckets['7-8']++;
    else scoreBuckets['9-10']++;
  });

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الجامعات', value: universities.length, icon: Database, color: 'from-gupi-500 to-gupi-700' },
          { label: 'الدول الممثلة', value: countries.size, icon: Globe, color: 'from-emerald-500 to-emerald-700' },
          { label: 'متوسط GUPI', value: avgScore, icon: Award, color: 'from-gold-500 to-gold-700' },
          { label: 'إجمالي الأبحاث', value: totalArticles.toLocaleString(), icon: TrendingUp, color: 'from-purple-500 to-purple-700' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl shadow p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-black text-slate-800">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Score range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="text-sm text-slate-500 mb-1">أعلى درجة</div>
          <div className="text-3xl font-black text-green-600">{topScore}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="text-sm text-slate-500 mb-1">أدنى درجة</div>
          <div className="text-3xl font-black text-red-500">{lowScore}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="text-sm text-slate-500 mb-1">الحد الأقصى للمؤشر</div>
          <div className="text-3xl font-black text-gupi-700">{settings.max_total_score || '10'}</div>
        </div>
      </div>

      {/* Score distribution */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-display font-bold text-lg text-gupi-900 mb-4">توزيع الدرجات</h3>
        <div className="space-y-3">
          {Object.entries(scoreBuckets).map(([range, count]) => (
            <div key={range} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-slate-600">{range}</div>
              <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gupi-400 to-gupi-600 rounded-full flex items-center justify-end px-3"
                  style={{ width: `${universities.length > 0 ? (count / universities.length) * 100 : 0}%` }}
                >
                  <span className="text-white text-xs font-bold">{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 preview */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-gupi-900">أفضل 10 جامعات</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-4 py-3 text-right">الترتيب</th>
                <th className="px-4 py-3 text-right">الجامعة</th>
                <th className="px-4 py-3 text-center">الدولة</th>
                <th className="px-4 py-3 text-center">GUPI</th>
                <th className="px-4 py-3 text-center">حضور</th>
                <th className="px-4 py-3 text-center">تميز</th>
              </tr>
            </thead>
            <tbody>
              {universities.slice(0, 10).map((u) => (
                <tr key={u.id} className="border-b border-slate-50">
                  <td className="px-4 py-3">
                    <div className={`rank-badge w-8 h-8 text-sm ${
                      u.rank === 1 ? 'rank-1' : u.rank === 2 ? 'rank-2' : u.rank === 3 ? 'rank-3' : 'rank-other'
                    }`}>{u.rank}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gupi-900">{u.name}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{u.country}</td>
                  <td className="px-4 py-3 text-center font-bold text-gupi-700">{u.gupi.totalScore}</td>
                  <td className="px-4 py-3 text-center text-gupi-600">{u.gupi.presenceScore}/{u.gupi.maxPresence}</td>
                  <td className="px-4 py-3 text-center text-gold-600">{u.gupi.excellenceScore}/{u.gupi.maxExcellence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============ UNIVERSITIES TAB ============ */
function UniversitiesTab({ universities, configs, onReload }) {
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_UNI);
  const [importStatus, setImportStatus] = useState(null);
  const fileRef = useRef(null);

  const countries = Array.from(new Set(universities.map((u) => u.country).filter(Boolean))).sort();

  const filtered = universities.filter((u) => {
    const ms = !search || u.name?.includes(search);
    const mc = countryFilter === 'all' || u.country === countryFilter;
    return ms && mc;
  });

  function handleEdit(uni) {
    setEditingId(uni.id);
    setFormData({
      name: uni.name || '', founded: uni.founded || '', country: uni.country || '',
      articles_2025: uni.articles_2025 || '', description: uni.description || '', short_code: uni.short_code || '',
      ...Object.fromEntries(ALL_FIELDS.map((f) => [f.key, uni[f.key] || ''])),
    });
    setShowForm(true);
  }

  function handleAdd() {
    setEditingId(null);
    setFormData(EMPTY_UNI);
    setShowForm(true);
  }

  async function handleSave() {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/universities/${editingId}` : '/api/universities';
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setShowForm(false);
      await onReload();
    }
  }

  async function handleDelete(id) {
    if (!confirm('هل أنت متأكد من حذف هذه الجامعة؟')) return;
    await fetch(`/api/universities/${id}`, { method: 'DELETE' });
    await onReload();
  }

  async function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImportStatus({ type: 'loading', msg: 'جاري الاستيراد...' });
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/import', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setImportStatus({ type: 'success', msg: `تم استيراد ${data.count} جامعة بنجاح` });
        await onReload();
      } else {
        setImportStatus({ type: 'error', msg: data.error || 'خطأ' });
      }
    } catch {
      setImportStatus({ type: 'error', msg: 'خطأ في الاستيراد' });
    }
    if (fileRef.current) fileRef.current.value = '';
  }

  function handleExport() {
    window.open('/api/export', '_blank');
  }

  // Live score preview
  const liveScore = (() => {
    if (!showForm) return null;
    const presenceFields = configs.filter((c) => c.is_presence === 1).map((c) => c.field_key);
    const excellenceFields = configs.filter((c) => c.is_excellence === 1).map((c) => c.field_key);
    let p = 0, e = 0;
    for (const f of presenceFields) {
      const v = formData[f];
      if (v && String(v).trim() !== '' && String(v).trim() !== 'ـ') p++;
    }
    for (const f of excellenceFields) {
      const v = formData[f];
      if (v && String(v).trim() !== '' && String(v).trim() !== 'ـ') e++;
    }
    return { p, e, total: p + e };
  })();

  return (
    <div className="space-y-6">
      {/* Import/Export bar */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gupi-600 text-white font-medium cursor-pointer hover:bg-gupi-700 text-sm">
            <Upload className="w-4 h-4" /> استيراد Excel
            <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 text-sm">
            <Download className="w-4 h-4" /> تصدير Excel
          </button>
          {importStatus && (
            <div className={`flex items-center gap-2 text-sm ${
              importStatus.type === 'success' ? 'text-green-600' :
              importStatus.type === 'error' ? 'text-red-600' : 'text-gupi-600'
            }`}>
              {importStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {importStatus.msg}
            </div>
          )}
        </div>
      </div>

      {/* Universities table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="font-display font-bold text-lg text-gupi-900">إدارة الجامعات ({filtered.length})</h2>
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="بحث..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="pr-9 pl-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-gupi-500 outline-none w-40" />
              </div>
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-gupi-500 outline-none bg-white">
                <option value="all">كل الدول</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={handleAdd} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gupi-600 text-white text-sm font-medium hover:bg-gupi-700">
                <Plus className="w-4 h-4" /> إضافة
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-4 py-3 text-right">#</th>
                <th className="px-4 py-3 text-right">الجامعة</th>
                <th className="px-4 py-3 text-center">الدولة</th>
                <th className="px-4 py-3 text-center">GUPI</th>
                <th className="px-4 py-3 text-center">حضور</th>
                <th className="px-4 py-3 text-center">تميز</th>
                <th className="px-4 py-3 text-center">أبحاث</th>
                <th className="px-4 py-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-slate-400">{u.rank}</td>
                  <td className="px-4 py-3 font-medium text-gupi-900">{u.name}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{u.country}</td>
                  <td className="px-4 py-3 text-center font-bold text-gupi-700">{u.gupi.totalScore}</td>
                  <td className="px-4 py-3 text-center text-gupi-600">{u.gupi.presenceScore}/{u.gupi.maxPresence}</td>
                  <td className="px-4 py-3 text-center text-gold-600">{u.gupi.excellenceScore}/{u.gupi.maxExcellence}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{u.articles_2025?.toLocaleString() || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(u)} className="p-2 rounded-lg text-gupi-600 hover:bg-gupi-50"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(u.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <h2 className="font-display font-bold text-xl text-gupi-900">{editingId ? 'تعديل جامعة' : 'إضافة جامعة جديدة'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>

            {/* Live score preview */}
            {liveScore && (
              <div className="bg-gradient-to-l from-gupi-50 to-gold-50 p-4 border-b border-slate-100">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-center">
                    <div className="text-xs text-slate-500">معاينة الدرجة</div>
                    <div className="text-3xl font-black text-gupi-700">{liveScore.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500">حضور</div>
                    <div className="text-xl font-bold text-gupi-600">{liveScore.p}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500">تميز</div>
                    <div className="text-xl font-bold text-gold-600">{liveScore.e}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">اسم الجامعة *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الدولة</label>
                  <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">سنة التأسيس</label>
                  <input type="number" value={formData.founded} onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">عدد الأبحاث 2025</label>
                  <input type="number" value={formData.articles_2025} onChange={(e) => setFormData({ ...formData, articles_2025: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
                </div>
              </div>

              {/* Description & short code */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">الرمز المختصر</label>
                  <input type="text" value={formData.short_code} onChange={(e) => setFormData({ ...formData, short_code: e.target.value })}
                    placeholder="مثال: KSU" className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-1">وصف الجامعة (يظهر في بطاقة الجامعة)</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3} placeholder="وصف مختصر عن الجامعة..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none resize-none" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-700 mb-3">التصنيفات</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {ALL_FIELDS.map((field) => {
                    const cfg = configs.find((c) => c.field_key === field.key);
                    return (
                      <div key={field.key}>
                        <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                          {field.label}
                          {cfg?.is_presence && <span className="text-[9px] bg-gupi-100 text-gupi-700 px-1 rounded">حضور</span>}
                          {cfg?.is_excellence && <span className="text-[9px] bg-gold-100 text-gold-700 px-1 rounded">تميز</span>}
                        </label>
                        <input type="text" value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          placeholder="—" className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none text-sm" />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gupi-600 text-white font-medium hover:bg-gupi-700">
                  <Save className="w-4 h-4" /> حفظ
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ RANKINGS CONFIG TAB ============ */
function RankingsTab({ configs, settings, onReload }) {
  const [localConfigs, setLocalConfigs] = useState(configs);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newConfig, setNewConfig] = useState({ field_key: '', label_ar: '', label_en: '', category: 'world', is_presence: 0, is_excellence: 0, presence_weight: 1, excellence_weight: 1, sort_order: 0 });

  useEffect(() => { setLocalConfigs(configs); }, [configs]);

  function updateConfig(id, field, value) {
    setLocalConfigs(localConfigs.map((c) => c.id === id ? { ...c, [field]: value } : c));
    setSaved(false);
  }

  function moveConfig(id, dir) {
    const sorted = [...localConfigs].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((c) => c.id === id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const tmp = sorted[idx].sort_order;
    sorted[idx].sort_order = sorted[swapIdx].sort_order;
    sorted[swapIdx].sort_order = tmp;
    setLocalConfigs(sorted);
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await fetch('/api/ranking-configs', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localConfigs),
    });
    setSaving(false);
    setSaved(true);
    await onReload();
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleAdd() {
    if (!newConfig.field_key || !newConfig.label_ar) return;
    const res = await fetch('/api/ranking-configs', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newConfig, is_presence: !!newConfig.is_presence, is_excellence: !!newConfig.is_excellence }),
    });
    if (res.ok) {
      setShowAdd(false);
      setNewConfig({ field_key: '', label_ar: '', label_en: '', category: 'world', is_presence: 0, is_excellence: 0, presence_weight: 1, excellence_weight: 1, sort_order: 0 });
      await onReload();
    }
  }

  async function handleDelete(id) {
    if (!confirm('حذف هذا التصنيف؟')) return;
    // Soft delete - set active = false
    const updated = localConfigs.map((c) => c.id === id ? { ...c, active: false } : c);
    await fetch('/api/ranking-configs', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    await onReload();
  }

  const sorted = [...localConfigs].sort((a, b) => a.sort_order - b.sort_order);
  const presenceCount = localConfigs.filter((c) => c.is_presence).length;
  const excellenceCount = localConfigs.filter((c) => c.is_excellence).length;

  return (
    <div className="space-y-6">
      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-gupi-50 to-white rounded-2xl p-6 border border-gupi-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gupi-600 text-white flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gupi-700">{presenceCount}</div>
              <div className="text-sm text-slate-600">تصنيفات الحضور</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-6 border border-gold-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold-500 text-white flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gold-700">{excellenceCount}</div>
              <div className="text-sm text-slate-600">تصنيفات التميز</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-600 text-white flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-700">{localConfigs.length}</div>
              <div className="text-sm text-slate-600">إجمالي التصنيفات</div>
            </div>
          </div>
        </div>
      </div>

      {/* Save bar */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gupi-600 text-white font-medium hover:bg-gupi-700 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
        {saved && <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle2 className="w-4 h-4" /> تم الحفظ بنجاح</span>}
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 mr-auto">
          <Plus className="w-4 h-4" /> إضافة تصنيف جديد
        </button>
      </div>

      {/* Rankings config table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gupi-950 text-white">
                <th className="px-3 py-3 text-center w-16">ترتيب</th>
                <th className="px-3 py-3 text-right">التصنيف</th>
                <th className="px-3 py-3 text-center">الحقل</th>
                <th className="px-3 py-3 text-center">الفئة</th>
                <th className="px-3 py-3 text-center">
                  <div className="flex flex-col items-center">
                    <Globe className="w-4 h-4 mb-1" />
                    <span className="text-xs">حضور</span>
                  </div>
                </th>
                <th className="px-3 py-3 text-center">وزن الحضور</th>
                <th className="px-3 py-3 text-center">
                  <div className="flex flex-col items-center">
                    <Trophy className="w-4 h-4 mb-1" />
                    <span className="text-xs">تميز</span>
                  </div>
                </th>
                <th className="px-3 py-3 text-center">وزن التميز</th>
                <th className="px-3 py-3 text-center">ظاهر</th>
                <th className="px-3 py-3 text-center">حذف</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((cfg) => (
                <tr key={cfg.id} className={`border-b border-slate-50 ${!cfg.active ? 'opacity-40' : ''}`}>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => moveConfig(cfg.id, -1)} className="p-1 rounded hover:bg-slate-100"><ChevronUp className="w-3 h-3" /></button>
                      <button onClick={() => moveConfig(cfg.id, 1)} className="p-1 rounded hover:bg-slate-100"><ChevronDown className="w-3 h-3" /></button>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <input type="text" value={cfg.label_ar} onChange={(e) => updateConfig(cfg.id, 'label_ar', e.target.value)}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-sm focus:border-gupi-500 outline-none" />
                  </td>
                  <td className="px-3 py-2">
                    <code className="text-xs text-slate-500">{cfg.field_key}</code>
                  </td>
                  <td className="px-3 py-2">
                    <select value={cfg.category} onChange={(e) => updateConfig(cfg.id, 'category', e.target.value)}
                      className="px-2 py-1 rounded border border-slate-200 text-xs focus:border-gupi-500 outline-none bg-white">
                      <option value="world">عالمي</option>
                      <option value="arab">عربي</option>
                      <option value="impact">تأثير</option>
                      <option value="special">خاص</option>
                      <option value="other">أخرى</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input type="checkbox" checked={!!cfg.is_presence} onChange={(e) => updateConfig(cfg.id, 'is_presence', e.target.checked ? 1 : 0)}
                      className="w-5 h-5 accent-gupi-600 cursor-pointer" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input type="number" step="0.1" min="0" value={cfg.presence_weight} onChange={(e) => updateConfig(cfg.id, 'presence_weight', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded border border-slate-200 text-sm text-center focus:border-gupi-500 outline-none" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input type="checkbox" checked={!!cfg.is_excellence} onChange={(e) => updateConfig(cfg.id, 'is_excellence', e.target.checked ? 1 : 0)}
                      className="w-5 h-5 accent-gold-500 cursor-pointer" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input type="number" step="0.1" min="0" value={cfg.excellence_weight} onChange={(e) => updateConfig(cfg.id, 'excellence_weight', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded border border-slate-200 text-sm text-center focus:border-gold-500 outline-none" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => updateConfig(cfg.id, 'active', cfg.active ? 0 : 1)}
                      className="p-1.5 rounded-lg hover:bg-slate-100">
                      {cfg.active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                    </button>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => handleDelete(cfg.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add new ranking modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-gupi-900">إضافة تصنيف جديد</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">مفتاح الحقل (بالإنجليزية)</label>
                <input type="text" value={newConfig.field_key} onChange={(e) => setNewConfig({ ...newConfig, field_key: e.target.value })}
                  placeholder="مثال: times_higher" className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الاسم بالعربية</label>
                  <input type="text" value={newConfig.label_ar} onChange={(e) => setNewConfig({ ...newConfig, label_ar: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الاسم بالإنجليزية</label>
                  <input type="text" value={newConfig.label_en} onChange={(e) => setNewConfig({ ...newConfig, label_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الفئة</label>
                <select value={newConfig.category} onChange={(e) => setNewConfig({ ...newConfig, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-gupi-500 outline-none bg-white">
                  <option value="world">عالمي</option>
                  <option value="arab">عربي</option>
                  <option value="impact">تأثير</option>
                  <option value="special">خاص</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!newConfig.is_presence} onChange={(e) => setNewConfig({ ...newConfig, is_presence: e.target.checked ? 1 : 0 })}
                    className="w-5 h-5 accent-gupi-600" /> يُحسب في الحضور
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!newConfig.is_excellence} onChange={(e) => setNewConfig({ ...newConfig, is_excellence: e.target.checked ? 1 : 0 })}
                    className="w-5 h-5 accent-gold-500" /> يُحسب في التميز
                </label>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button onClick={handleAdd} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gupi-600 text-white font-medium hover:bg-gupi-700">
                  <Plus className="w-4 h-4" /> إضافة
                </button>
                <button onClick={() => setShowAdd(false)} className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50">إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ SETTINGS TAB ============ */
function SettingsTab({ settings, onReload }) {
  const [local, setLocal] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setLocal(settings); }, [settings]);

  function update(key, value) {
    setLocal({ ...local, [key]: value });
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(local),
    });
    setSaving(false);
    setSaved(true);
    await onReload();
    setTimeout(() => setSaved(false), 3000);
  }

  const fields = [
    { key: 'index_title', label: 'اسم المؤشر', type: 'text', icon: Target },
    { key: 'index_short', label: 'الاختصار', type: 'text', icon: Award },
    { key: 'index_year', label: 'سنة الإصدار', type: 'text', icon: TrendingUp },
    { key: 'max_presence_score', label: 'الحد الأقصى لدرجة الحضور', type: 'number', icon: Globe },
    { key: 'max_excellence_score', label: 'الحد الأقصى لدرجة التميز', type: 'number', icon: Trophy },
    { key: 'max_total_score', label: 'الدرجة الإجمالية للمؤشر', type: 'number', icon: Award },
    { key: 'sample_size', label: 'حجم العينة (عدد الجامعات)', type: 'number', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gupi-600 text-white font-medium hover:bg-gupi-700 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </button>
        {saved && <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle2 className="w-4 h-4" /> تم الحفظ</span>}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-display font-bold text-lg text-gupi-900 mb-6">إعدادات المؤشر العامة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gupi-500" />
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={local[f.key] || ''}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-gupi-500 focus:ring-2 focus:ring-gupi-200 outline-none transition-all"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Score formula preview */}
      <div className="bg-gradient-to-br from-gupi-900 to-gupi-950 rounded-2xl p-8 text-white">
        <h3 className="font-display font-bold text-lg mb-6 text-center">معادلة المؤشر الحالية</h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="bg-white/10 rounded-xl px-6 py-3">
            <span className="font-bold">GUPI</span>
          </div>
          <span className="text-2xl font-bold text-gupi-400">=</span>
          <div className="bg-gupi-600 rounded-xl px-6 py-3">
            <span className="font-bold">الحضور ({local.max_presence_score || '7'})</span>
          </div>
          <span className="text-2xl font-bold text-gupi-400">+</span>
          <div className="bg-gold-500 rounded-xl px-6 py-3">
            <span className="font-bold">التميز ({local.max_excellence_score || '3'})</span>
          </div>
          <span className="text-2xl font-bold text-gupi-400">=</span>
          <div className="bg-white text-gupi-900 rounded-xl px-6 py-3">
            <span className="font-black text-xl">{local.max_total_score || '10'} درجات</span>
          </div>
        </div>
      </div>
    </div>
  );
}
