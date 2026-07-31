'use client';

import Link from 'next/link';
import {
  Globe, BookOpen, Award, Database, Shield, Calculator,
  CheckCircle2, XCircle, Layers, TrendingUp, ArrowLeft,
  Trophy, ScrollText
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/home/Reveal';
import { useLang } from '@/lib/LanguageContext';

export default function MethodologyPage() {
  const { t, lang } = useLang();

  const dim2Items = t('meth_dim2_items').split('|');
  const features = t('meth_features').split('|');
  const futureItems = t('meth_future').split('|');
  const qaRow1Desc = t('meth_qa_row1_desc').split('|');
  const qaRow2Desc = t('meth_qa_row2_desc').split('|');

  const modelRows = lang === 'ar'
    ? [
        ['الإنتاج البحثي', 'حساب كثافة وعدد الأبحاث العلمية المنشورة وفق قواعد البيانات', 'أعلى 70 جامعة'],
        ['الظهور في التصنيفات', 'المشاركة الفعلية والرسمية في التصنيفات الدولية الرئيسية', '70% (18 درجة)'],
        ['نقاط التميز', 'تحقيق مراكز متقدمة (1-10) في التصنيفات الكبرى', '30% (5 درجات)'],
      ]
    : [
        ['Research Output', 'Calculating density and count of published scientific articles per databases', 'Top 70 universities'],
        ['Ranking Presence', 'Actual and official participation in major international rankings', '70% (18 points)'],
        ['Excellence Points', 'Achieving advanced positions (1-10) in major rankings', '30% (5 points)'],
      ];

  const calcSteps = [
    { step: 1, title: t('step1_title'), desc: t('step1_desc') },
    { step: 2, title: t('step2_title'), desc: t('step2_desc') },
    { step: 3, title: t('step3_title'), desc: lang === 'ar' ? 'احتساب الترتيب والريادة في التصنيفات الكبرى (المركز 1-10).' : 'Calculating ranking and leadership in major rankings (positions 1-10).' },
    { step: 4, title: t('step4_title'), desc: t('step4_desc') },
  ];

  return (
    <div className="min-h-screen bg-gupi-bg">
      <PageHero
        icon={ScrollText}
        eyebrow={t('meth_eyebrow')}
        title={lang === 'ar' ? <>منهجية <span className="gold-shimmer">مؤشر الحضور العالمي</span> للجامعات</> : <>Global University Presence <span className="gold-shimmer">Index Methodology</span></>}
        subtitle={t('meth_subtitle')}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* ما هو المؤشر */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={Award} title={t('meth_what_title')} />
            <p className="text-gupi-ink-700 leading-relaxed text-sm md:text-base">
              {t('meth_what_desc')}
            </p>
          </section>
        </Reveal>

        {/* أبعاد المؤشر */}
        <Reveal>
          <section>
            <SectionTitle icon={Layers} title={t('meth_dimensions_title')} className="mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* البعد الأول */}
              <div className="shine-card bg-gradient-to-br from-gupi-orange-50 to-white rounded-2xl p-6 border border-gupi-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gupi-orange-600 text-white flex items-center justify-center font-display font-black text-lg shadow-gupi-primary">
                    18
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gupi-orange-900">{t('meth_dim1_title')}</h3>
                    <p className="text-xs text-gupi-orange-600">{t('meth_dim1_sub')}</p>
                  </div>
                </div>
                <p className="text-gupi-ink-700 text-sm leading-relaxed mb-3">
                  {t('meth_dim1_desc')}
                </p>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs bg-gupi-success-soft text-gupi-success-dark px-3 py-2 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t('meth_dim1_item1')}
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-gupi-error-soft text-gupi-error-dark px-3 py-2 rounded-lg">
                    <XCircle className="w-3.5 h-3.5" /> {t('meth_dim1_item2')}
                  </div>
                </div>
                <p className="text-xs text-gupi-orange-600 font-semibold">{t('meth_dim1_goal')}</p>
              </div>

              {/* البعد الثاني */}
              <div className="shine-card bg-gradient-to-br from-gupi-amber-50 to-white rounded-2xl p-6 border border-gupi-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gupi-amber-500 text-white flex items-center justify-center font-display font-black text-lg shadow-md">
                    5
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gupi-amber-800">{t('meth_dim2_title')}</h3>
                    <p className="text-xs text-gupi-amber-600">{t('meth_dim2_sub')}</p>
                  </div>
                </div>
                <p className="text-gupi-ink-700 text-sm leading-relaxed mb-3">
                  {t('meth_dim2_desc')}
                </p>
                <div className="space-y-2 mb-3">
                  {dim2Items.map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs bg-gupi-amber-100/60 text-gupi-amber-800 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {text}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs bg-gupi-error-soft text-gupi-error-dark px-3 py-2 rounded-lg">
                    <XCircle className="w-3.5 h-3.5" /> {t('meth_dim2_item_neg')}
                  </div>
                </div>
                <p className="text-xs text-gupi-amber-700 font-semibold">{t('meth_dim2_goal')}</p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* المعادلة */}
        <Reveal>
          <section className="relative bg-gupi-orange-950 rounded-2xl p-6 md:p-8 text-white overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-lg font-display font-bold mb-5 text-center">
                {lang === 'ar' ? <>المعادلة الإجمالية لدرجة مؤشر <span className="gold-shimmer">GUPI</span></> : <>Overall <span className="gold-shimmer">GUPI</span> Score Equation</>}
              </h2>
              <div className="flex items-center justify-center gap-2.5 flex-wrap">
                <div className="bg-white/10 rounded-xl px-5 py-2.5 border border-white/15">
                  <span className="font-display font-bold text-base">GUPI Score</span>
                </div>
                <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                <div className="bg-gupi-orange-600 rounded-xl px-5 py-2.5">
                  <span className="font-bold text-sm">{t('meth_eq_presence')}</span>
                </div>
                <span className="text-2xl font-bold text-gupi-orange-400">+</span>
                <div className="bg-gupi-amber-500 rounded-xl px-5 py-2.5">
                  <span className="font-bold text-sm">{t('meth_eq_excellence')}</span>
                </div>
                <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                <div className="bg-white text-gupi-orange-900 rounded-xl px-5 py-2.5">
                  <span className="font-display font-black text-lg">{t('meth_eq_total')}</span>
                </div>
              </div>

              {/* شريط الأوزان المتحرك */}
              <div className="max-w-2xl mx-auto mt-6">
                <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                  <div className="bar-fill bg-gradient-to-l from-gupi-orange-500 to-gupi-orange-400" style={{ width: '70%' }} />
                  <div className="bar-fill bg-gradient-to-l from-gupi-amber-400 to-gupi-amber-300" style={{ width: '30%', animationDelay: '0.7s' }} />
                </div>
                <div className="flex justify-between mt-2 text-[11px] font-semibold">
                  <span className="text-gupi-orange-300">{t('meth_eq_bar_presence')}</span>
                  <span className="text-gupi-amber-300">{t('meth_eq_bar_excellence')}</span>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* اختيار العينة */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={Database} title={t('meth_sample_title')} />
            <p className="text-gupi-ink-700 text-sm leading-relaxed mb-5">
              {t('meth_sample_desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: t('meth_sample1_title'), desc: t('meth_sample1_desc'), icon: Database },
                { title: t('meth_sample2_title'), desc: t('meth_sample2_desc'), icon: Shield },
                { title: t('meth_sample3_title'), desc: t('meth_sample3_desc'), icon: TrendingUp },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="shine-card card-hover bg-gupi-ink-50 rounded-xl p-4 border border-gupi-ink-100">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-sm text-gupi-orange-900 mb-1.5">{item.title}</h3>
                    <p className="text-xs text-gupi-ink-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* الأسس والمعايير */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={BookOpen} title={t('meth_criteria_title')} />
            <div className="space-y-3">
              {[
                { title: t('meth_crit1_title'), desc: t('meth_crit1_desc'), icon: BookOpen },
                { title: t('meth_crit2_title'), desc: t('meth_crit2_desc'), icon: Globe },
                { title: t('meth_crit3_title'), desc: t('meth_crit3_desc'), icon: Trophy },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-3 bg-gradient-to-l from-gupi-orange-50 to-transparent rounded-xl p-4 border border-gupi-orange-100/60">
                    <div className="w-10 h-10 rounded-xl bg-gupi-orange-600 text-white flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gupi-orange-900 mb-0.5">{item.title}</h3>
                      <p className="text-xs text-gupi-ink-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* آلية الاحتساب */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={Calculator} title={t('meth_calc_title')} />
            <div className="space-y-3">
              {calcSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 text-white flex items-center justify-center font-display font-black text-sm flex-shrink-0 shadow-gupi-primary">
                    {item.step}
                  </div>
                  <div className="flex-1 pb-3 border-b border-gupi-ink-100">
                    <h3 className="font-bold text-sm text-gupi-orange-900">{item.title}</h3>
                    <p className="text-xs text-gupi-ink-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* نموذج الحساب */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 pb-4">
              <SectionTitle icon={Layers} title={t('meth_model_title')} className="mb-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gupi-orange-950 text-white">
                    <th className="px-4 py-3 text-right">{t('meth_model_col1')}</th>
                    <th className="px-4 py-3 text-right">{t('meth_model_col2')}</th>
                    <th className="px-4 py-3 text-center">{t('meth_model_col3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {modelRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gupi-ink-50/50'}>
                      <td className="px-4 py-3 font-bold text-gupi-orange-900">{row[0]}</td>
                      <td className="px-4 py-3 text-xs text-gupi-ink-600">{row[1]}</td>
                      <td className="px-4 py-3 text-center text-xs font-bold text-gupi-orange-700">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* آلية الترتيب */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={Trophy} title={t('meth_ranking_title')} />
            <p className="text-gupi-ink-700 text-sm leading-relaxed mb-5">
              {t('meth_ranking_desc')}
            </p>
            <div className="space-y-3">
              {[
                { title: t('meth_tiebreak1_title'), desc: t('meth_tiebreak1_desc') },
                { title: t('meth_tiebreak2_title'), desc: t('meth_tiebreak2_desc') },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-gupi-orange-50 rounded-xl p-4 border border-gupi-orange-100">
                  <div className="w-8 h-8 rounded-full bg-gupi-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gupi-orange-900">{item.title}</h3>
                    <p className="text-xs text-gupi-ink-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* خصائص المؤشر */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={CheckCircle2} title={t('meth_features_title')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-gupi-success-soft rounded-xl p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-gupi-success-dark flex-shrink-0" />
                  <span className="text-xs font-semibold text-gupi-ink-700">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* التطوير المستقبلي */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={TrendingUp} title={t('meth_future_title')} />
            <div className="space-y-2.5">
              {futureItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gupi-ink-700">
                  <div className="w-1.5 h-1.5 rotate-45 bg-gupi-orange-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ضمان الجودة */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 pb-4">
              <SectionTitle icon={Shield} title={t('meth_qa_title')} className="mb-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gupi-orange-950 text-white">
                    <th className="px-4 py-3 text-right">{t('meth_qa_col1')}</th>
                    <th className="px-4 py-3 text-right">{t('meth_qa_col2')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-bold text-gupi-orange-900 align-top">{t('meth_qa_row1_title')}</td>
                    <td className="px-4 py-3 text-xs text-gupi-ink-600">
                      <ul className="space-y-1">
                        {qaRow1Desc.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-gupi-ink-50/50">
                    <td className="px-4 py-3 font-bold text-gupi-orange-900 align-top">{t('meth_qa_row2_title')}</td>
                    <td className="px-4 py-3 text-xs text-gupi-ink-600">
                      <ul className="space-y-1">
                        {qaRow2Desc.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* حول المؤشر */}
        <Reveal>
          <section className="shine-card bg-gradient-to-br from-gupi-orange-50 to-white rounded-2xl p-6 md:p-8 border border-gupi-orange-100">
            <SectionTitle icon={Award} title={t('meth_about_title')} />
            <p className="text-gupi-ink-700 text-sm leading-relaxed">
              {t('meth_about_desc')}
            </p>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal className="text-center">
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gupi-amber-400 to-gupi-orange-600 text-gupi-orange-950 font-bold hover:scale-105 transition-all shadow-xl glow-gold"
          >
            <Trophy className="w-5 h-5" />
            {t('meth_cta')}
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

/* عنوان قسم موحّد — مدمج مع أيقونة */
function SectionTitle({ icon: Icon, title, className = 'mb-4' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-700 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h2 className="text-lg font-display font-bold text-gupi-orange-900">{title}</h2>
    </div>
  );
}
