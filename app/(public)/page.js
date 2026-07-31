'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Globe, BookOpen, Award, Monitor, Users, Handshake,
  ArrowLeft, ArrowRight, BarChart3, Target, CheckCircle2, TrendingUp,
  Database, Shield, Layers, Calculator, Trophy, Sparkles, Medal
} from 'lucide-react';
import Reveal from '@/components/home/Reveal';
import CountUp from '@/components/home/CountUp';
import SectionHeader from '@/components/home/SectionHeader';
import TopPodium from '@/components/home/TopPodium';
import { useLang } from '@/lib/LanguageContext';

const RANKINGS_TICKER = [
  'QS', 'THE', 'ARWU', 'AD Scientific', 'Scimago', 'CWTS', 'UniRank',
  'US News', 'CWUR', 'ScholarGPS', 'RUR', 'GUV', 'Arabic Ranking',
  'QS Arab', 'THE Arab', 'UniRank Arabic', 'THE Impact', 'GreenMetric',
];

const DEFAULT_CONTENT = {
  hero_badge: 'Global University Presence Index • 2027',
  hero_title: 'مؤشر الحضور العالمي للجامعات (GUPI)',
  hero_subtitle: 'التميز يُقاس بالحضور العالمي',
  hero_description: 'مؤشر رائد عربي متخصص في قياس وتقييم الظهور الدولي للجامعات، معتمدة على منهجية حديثة فائقة التنسيق عبر 18 تصنيفاً عالمياً تدمج بين منهجية علمية مستقلة وتقنيات الذكاء الاصطناعي.',
  hero_cta1: 'استكشف ترتيب الجامعات',
  hero_cta2: 'لوحة البيانات التفاعلية',
  stat_universities: '70',
  stat_universities_label: 'جامعة عربية نُخبة',
  stat_rankings: '18',
  stat_rankings_label: 'تصنيفاً عالمياً',
  stat_excellence: '5',
  stat_excellence_label: 'تصنيفات كبرى للتميز',
  stat_total: '100',
  stat_total_label: 'الدرجة الكلية للمؤشر',
  vision_eyebrow: 'الرؤية العامة والمنهجية',
  vision_title: 'منصة نخبة الجامعات العربية',
  vision_subtitle: '«نخبة الجامعات العربية – TOP A University» منصة رقمية مستقلة تركز على الجامعات العربية في فضاء التصنيفات العالمية، وتقدّم محتوى تحليلياً مبسطاً يساعد الطالب وصانع القرار والمهتم بالتعليم العالي على قراءة الأرقام والتقارير بلغة واضحة وعصرية. نحن نؤمن أن الوصول إلى معلومة تصنيفية موثوقة ومنسقة هو الخطوة الأولى نحو قرار أكاديمي أفضل.',
  vision_mission: 'تهدف منصة نخبة الجامعات العربية عبر GUPI إلى إنشاء مؤشر عالمي عربي متخصص في قياس وتقييم حضور الجامعات، معتمدة على منهجية حديثة فائقة التنسيق تدمج بين:',
  pillar1_title: 'البيانات الأكاديمية',
  pillar1_desc: 'تحليل شامل للبيانات الأكاديمية الموثقة',
  pillar2_title: 'التحليل الرقمي',
  pillar2_desc: 'أدوات تحليل رقمي متقدمة لقياس الأداء',
  pillar3_title: 'الذكاء الاصطناعي',
  pillar3_desc: 'توظيف تقنيات الذكاء الاصطناعي في التقييم',
  pillar4_title: 'اللوحات التفاعلية',
  pillar4_desc: 'لوحات بيانات تفاعلية لعرض النتائج',
  independence_title: 'استقلالية وحياد تام',
  independence_text: 'نحن مستقلون تمامًا عن الجامعات العربية وعن الجهات المالكة للتصنيفات العالمية. لا نمثّل أي تصنيف دولي، ولا نعمل لصالح جامعة بعينها، ولا نقدم خدمات ترويج مدفوعة تتعارض مع الحياد.',
  formula_eyebrow: 'منهج المؤشر',
  formula_title: 'معادلة مؤشر الحضور العالمي',
  formula_subtitle: 'إطار كمي معياري مستقل — حضور دولي عبر 18 تصنيفاً، وتميز أكاديمي عبر 5 تصنيفات كبرى',
  cta_eyebrow: 'GUPI 2027',
  cta_title: 'لأفضل 70 جامعة عربية',
  cta_subtitle: 'اكتشف أحدث ترتيب واستكشف مواقع المؤسسات التعليمية ضمن الإطار القياسي الشامل',
  cta_button: 'اكتشف ترتيب الجامعات الآن',
};

export default function HomePage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const { t, lang } = useLang();

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setContent({ ...DEFAULT_CONTENT, ...data });
        }
      })
      .catch(() => {});
  }, []);

  const c = content;
  const ct = (key) => lang === 'ar' ? (c[key] ?? t(key)) : t(key);
  return (
    <main>
      {/* ================= Hero — الصدارة ================= */}
      <section className="relative hero-gradient text-white overflow-hidden">
        {/* سحب متوهجة + شبكة نقاط */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-gupi-orange-500/25 rounded-full blur-3xl animate-drift" />
          <div className="absolute top-1/3 -left-32 w-[26rem] h-[26rem] bg-gupi-amber-400/15 rounded-full blur-3xl animate-drift-slow" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gupi-sage-400/15 rounded-full blur-3xl animate-drift" style={{ animationDelay: '-6s' }} />
          <div className="absolute inset-0 dot-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5 animate-fade-in-up">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-gupi-amber-400 animate-ping-soft" />
                <span className="relative rounded-full w-2 h-2 bg-gupi-amber-400" />
              </span>
              <span className="text-xs font-semibold tracking-wide">{ct('home_hero_badge')}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-black mb-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {ct('home_hero_title')}
            </h1>
            <p className="text-base md:text-lg text-gupi-amber-200 font-semibold mb-3 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              {ct('home_hero_subtitle')}
            </p>
            <p className="text-sm md:text-base text-gupi-ink-200 max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              {ct('home_hero_desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              <Link
                href="/rankings"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-gupi-orange-900 font-bold hover:bg-gupi-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03]"
              >
                <Trophy className="w-5 h-5 text-gupi-orange-600 group-hover:rotate-12 transition-transform" />
                {ct('home_hero_cta1')}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/25 text-white font-bold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <BarChart3 className="w-5 h-5" />
                {ct('home_hero_cta2')}
              </Link>
            </div>
          </div>

          {/* منصة التتويج — أعلى 3 جامعات */}
          <TopPodium />

          {/* شريط الإحصاءات — عدّادات متحركة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto">
            {[
              { value: parseInt(c.stat_universities) || 70, label: ct('home_stat_universities_label'), icon: Database },
              { value: parseInt(c.stat_rankings) || 18, label: ct('home_stat_rankings_label'), icon: Globe },
              { value: parseInt(c.stat_excellence) || 5, label: ct('home_stat_excellence_label'), icon: Trophy },
              { value: parseInt(c.stat_total) || 100, label: ct('home_stat_total_label'), icon: Calculator },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="glass-dark rounded-2xl p-5 text-center border border-white/10 hover:border-gupi-amber-400/30 transition-colors">
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gupi-amber-300" />
                    <div className="text-2xl md:text-3xl font-display font-black text-white">
                      <CountUp end={stat.value} />
                    </div>
                    <div className="text-xs text-gupi-ink-300 mt-1">{stat.label}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= شريط التصنيفات المتحرك ================= */}
      <section className="bg-gupi-orange-950 border-b border-gupi-amber-400/20 py-3.5 marquee" dir="ltr" aria-label="التصنيفات العالمية المعتمدة">
        <div className="marquee-track">
          {[...RANKINGS_TICKER, ...RANKINGS_TICKER].map((name, i) => (
            <span key={i} className="flex items-center gap-2 mx-5 text-xs font-semibold tracking-wider text-gupi-amber-200/80 whitespace-nowrap">
              <Medal className="w-3.5 h-3.5 text-gupi-amber-400/70" />
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ================= الرؤية العامة ================= */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 dot-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              icon={Target}
              eyebrow={ct('home_vision_eyebrow')}
              title={ct('home_vision_title')}
              subtitle={ct('home_vision_subtitle')}
            />
          </Reveal>

          <Reveal delay={100}>
            <p className="text-sm md:text-base text-gupi-ink-600 leading-relaxed text-center max-w-3xl mx-auto mb-8">
              {ct('home_vision_mission')}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { title: ct('home_pillar1_title'), icon: Database, desc: ct('home_pillar1_desc') },
              { title: ct('home_pillar2_title'), icon: BarChart3, desc: ct('home_pillar2_desc') },
              { title: ct('home_pillar3_title'), icon: Sparkles, desc: ct('home_pillar3_desc') },
              { title: ct('home_pillar4_title'), icon: Monitor, desc: ct('home_pillar4_desc') },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 90}>
                  <div className="shine-card card-hover group h-full bg-gradient-to-br from-gupi-ink-50 to-gupi-orange-50/60 rounded-2xl p-5 border border-gupi-ink-100 hover:border-gupi-orange-300">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gupi-orange-400 to-gupi-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-base text-gupi-orange-900 mb-1.5">{item.title}</h3>
                    <p className="text-xs text-gupi-ink-600 leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= استقلالية وحياد تام ================= */}
      <section className="py-14 bg-gupi-orange-950 text-white relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gupi-orange-500/15 rounded-full blur-3xl animate-drift" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gupi-amber-600/15 rounded-full blur-3xl animate-drift-slow" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5">
              <Shield className="w-4 h-4 text-gupi-amber-300" />
              <span className="text-xs font-semibold tracking-wide">{ct('home_independence_title')}</span>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-gupi-ink-200 max-w-3xl mx-auto">
              {ct('home_independence_text')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= ركائز المؤشر ================= */}
      <section className="py-16 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              icon={Layers}
              eyebrow={t('pillars_eyebrow')}
              title={t('pillars_title')}
              subtitle={t('pillars_subtitle')}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: t('pillar_global_presence_title'),
                icon: Globe,
                desc: t('pillar_global_presence_desc'),
                color: 'from-gupi-orange-500 to-gupi-orange-700',
              },
              {
                title: t('pillar_research_impact_title'),
                icon: BookOpen,
                desc: t('pillar_research_impact_desc'),
                color: 'from-gupi-sage-500 to-gupi-sage-700',
              },
              {
                title: t('pillar_ranking_visibility_title'),
                icon: Award,
                desc: t('pillar_ranking_visibility_desc'),
                color: 'from-gupi-amber-500 to-gupi-amber-700',
              },
              {
                title: t('pillar_digital_power_title'),
                icon: Monitor,
                desc: t('pillar_digital_power_desc'),
                color: 'from-gupi-orange-400 to-gupi-orange-600',
              },
              {
                title: t('pillar_academic_reputation_title'),
                icon: Users,
                desc: t('pillar_academic_reputation_desc'),
                color: 'from-gupi-sage-400 to-gupi-sage-600',
              },
              {
                title: t('pillar_scientific_cooperation_title'),
                icon: Handshake,
                desc: t('pillar_scientific_cooperation_desc'),
                color: 'from-gupi-amber-400 to-gupi-amber-600',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={(i % 3) * 90}>
                  <div className="shine-card card-hover group h-full bg-white rounded-2xl p-5 border border-gupi-ink-100 hover:border-gupi-orange-300 shadow-sm">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-base text-gupi-orange-900 mb-2">{pillar.title}</h3>
                    <p className="text-xs text-gupi-ink-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= منهجية المؤشر ================= */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 dot-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              icon={Calculator}
              eyebrow={lang === 'ar' ? c.formula_eyebrow : t('formula_eyebrow')}
              title={lang === 'ar' ? c.formula_title : t('formula_title')}
              subtitle={lang === 'ar' ? c.formula_subtitle : t('formula_subtitle')}
            />
          </Reveal>

          {/* المعادلة */}
          <Reveal>
            <div className="max-w-3xl mx-auto mb-10">
              <div className="bg-gradient-to-br from-gupi-orange-50 to-gupi-amber-100/60 rounded-3xl p-6 md:p-8 border border-gupi-orange-200">
                <p className="text-xs text-gupi-orange-600 font-semibold mb-5 text-center">{t('formula_equation_label')}</p>
                <div className="flex items-center justify-center gap-2.5 flex-wrap">
                  <div className="bg-white rounded-xl px-5 py-2.5 shadow-md border border-gupi-orange-100">
                    <span className="font-display font-bold text-base text-gupi-orange-900">GUPI Score</span>
                  </div>
                  <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                  <div className="bg-gupi-orange-600 text-white rounded-xl px-5 py-2.5 shadow-md">
                    <span className="font-bold text-sm">{t('formula_presence_label')}</span>
                  </div>
                  <span className="text-2xl font-bold text-gupi-orange-400">+</span>
                  <div className="bg-gupi-amber-500 text-white rounded-xl px-5 py-2.5 shadow-md">
                    <span className="font-bold text-sm">{t('formula_excellence_label')}</span>
                  </div>
                  <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                  <div className="bg-gradient-to-br from-gupi-orange-700 to-gupi-orange-900 text-white rounded-xl px-5 py-2.5 shadow-lg">
                    <span className="font-display font-black text-lg gold-shimmer">{t('formula_total_label')}</span>
                  </div>
                </div>

                {/* شريط الأوزان المتحرك */}
                <div className="mt-6">
                  <div className="flex h-3 rounded-full overflow-hidden bg-white shadow-inner">
                    <div className="bar-fill bg-gradient-to-r from-gupi-orange-500 to-gupi-orange-700" style={{ width: '70%' }} />
                    <div className="bar-fill bg-gradient-to-r from-gupi-amber-400 to-gupi-amber-600" style={{ width: '30%', animationDelay: '0.7s' }} />
                  </div>
                  <div className="flex justify-between mt-2 text-[11px] font-semibold">
                    <span className="text-gupi-orange-700">{t('formula_presence_bar')}</span>
                    <span className="text-gupi-amber-700">{t('formula_excellence_bar')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* البعدان */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Reveal>
              <div className="shine-card h-full bg-gradient-to-br from-gupi-orange-50 to-white rounded-2xl p-6 border border-gupi-orange-100 hover:border-gupi-orange-300 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gupi-orange-600 text-white flex items-center justify-center font-display font-black text-lg shadow-gupi-primary">
                    18
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gupi-orange-900">{t('formula_presence_card_title')}</h3>
                    <p className="text-xs text-gupi-orange-600">{t('formula_presence_card_sub')}</p>
                  </div>
                </div>
                <p className="text-gupi-ink-600 text-xs leading-relaxed mb-3">
                  {t('formula_presence_card_desc')}
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> {t('formula_presence_card_item1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-ink-300" /> {t('formula_presence_card_item2')}</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gupi-orange-100">
                  <p className="text-[11px] text-gupi-orange-600 font-semibold">{t('formula_presence_card_goal')}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="shine-card h-full bg-gradient-to-br from-gupi-amber-50 to-white rounded-2xl p-6 border border-gupi-amber-200 hover:border-gupi-amber-400 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gupi-amber-500 text-white flex items-center justify-center font-display font-black text-lg shadow-md">
                    5
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gupi-amber-800">{t('formula_excellence_card_title')}</h3>
                    <p className="text-xs text-gupi-amber-600">{t('formula_excellence_card_sub')}</p>
                  </div>
                </div>
                <p className="text-gupi-ink-600 text-xs leading-relaxed mb-3">
                  {t('formula_excellence_card_desc')}
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> {t('formula_excellence_card_item1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> {t('formula_excellence_card_item2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> {t('formula_excellence_card_item3')}</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gupi-amber-200">
                  <p className="text-[11px] text-gupi-amber-700 font-semibold">{t('formula_excellence_card_goal')}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="text-center mt-10">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gupi-orange-600 text-white text-sm font-bold hover:bg-gupi-orange-700 hover:scale-[1.03] transition-all shadow-gupi-primary"
            >
              {t('formula_view_methodology')}
              {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= خطوات الاحتساب ================= */}
      <section className="py-16 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              icon={TrendingUp}
              eyebrow={t('steps_eyebrow')}
              title={t('steps_title')}
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { step: 1, title: t('step1_title'), desc: t('step1_desc'), icon: Database },
              { step: 2, title: t('step2_title'), desc: t('step2_desc'), icon: Globe },
              { step: 3, title: t('step3_title'), desc: t('step3_desc'), icon: Trophy },
              { step: 4, title: t('step4_title'), desc: t('step4_desc'), icon: Calculator },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.step} delay={i * 100}>
                  <div className="relative h-full">
                    <div className="shine-card card-hover h-full bg-white rounded-2xl p-5 border border-gupi-ink-100 hover:border-gupi-orange-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 text-white flex items-center justify-center font-display font-black text-sm shadow-gupi-primary">
                          {item.step}
                        </div>
                        <Icon className="w-5 h-5 text-gupi-orange-500" />
                      </div>
                      <h3 className="font-display font-bold text-base text-gupi-orange-900 mb-1.5">{item.title}</h3>
                      <p className="text-xs text-gupi-ink-600 leading-relaxed">{item.desc}</p>
                    </div>
                    {item.step < 4 && (
                      <div className="hidden md:block absolute top-1/2 -left-4 w-5 border-t-2 border-dashed border-gupi-orange-300" aria-hidden="true" />
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ضمان الجودة ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              icon={Shield}
              eyebrow={t('qa_eyebrow')}
              title={t('qa_title')}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: t('qa1_title'),
                desc: t('qa1_desc'),
                icon: Shield,
              },
              {
                title: t('qa2_title'),
                desc: t('qa2_desc'),
                icon: Database,
              },
              {
                title: t('qa3_title'),
                desc: t('qa3_desc'),
                icon: Trophy,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="shine-card card-hover group h-full bg-gradient-to-br from-gupi-ink-50 to-gupi-orange-50/40 rounded-2xl p-5 border border-gupi-ink-100 hover:border-gupi-orange-300">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-base text-gupi-orange-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-gupi-ink-600 leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= الدعوة الختامية ================= */}
      <section className="relative py-16 bg-gupi-orange-950 text-white overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gupi-orange-500/20 rounded-full blur-3xl animate-drift" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gupi-amber-600/20 rounded-full blur-3xl animate-drift-slow" />
          <div className="absolute inset-0 dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <SectionHeader
              dark
              icon={Trophy}
              eyebrow={ct('home_cta_eyebrow')}
              title={lang === 'ar' ? <>القائمة النهائية لمؤشر <span className="gold-shimmer">GUPI</span></> : <>Final <span className="gold-shimmer">GUPI</span> Index List</>}
              subtitle={ct('home_cta_subtitle')}
            />
            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gupi-amber-400 to-gupi-orange-600 text-gupi-orange-950 font-bold hover:scale-105 transition-all shadow-xl glow-gold"
            >
              <Trophy className="w-5 h-5" />
              {ct('home_cta_button')}
              {lang === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
