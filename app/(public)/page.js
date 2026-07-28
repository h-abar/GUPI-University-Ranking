import Link from 'next/link';
import {
  Globe, BookOpen, Award, Monitor, Users, Handshake,
  ArrowLeft, BarChart3, Target, CheckCircle2, TrendingUp,
  Database, Shield, Layers, Calculator, Trophy, Sparkles, Medal
} from 'lucide-react';
import Reveal from '@/components/home/Reveal';
import CountUp from '@/components/home/CountUp';
import SectionHeader from '@/components/home/SectionHeader';
import TopPodium from '@/components/home/TopPodium';

const RANKINGS_TICKER = [
  'QS', 'THE', 'ARWU', 'AD Scientific', 'Scimago', 'CWTS', 'UniRank',
  'US News', 'CWUR', 'ScholarGPS', 'RUR', 'GUV', 'Arabic Ranking',
  'QS Arab', 'THE Arab', 'UniRank Arabic', 'THE Impact', 'GreenMetric',
];

export default function HomePage() {
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
              <span className="text-xs font-semibold tracking-wide">Global University Presence Index • 2027</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-black mb-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              مؤشر <span className="gold-shimmer">GUPI</span> للحضور العالمي للجامعات
            </h1>
            <p className="text-base md:text-lg text-gupi-amber-200 font-semibold mb-3 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              التميز يُقاس بالحضور العالمي
            </p>
            <p className="text-sm md:text-base text-gupi-ink-200 max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              مؤشر رائد يقيس الأثر الحقيقي والظهور الدولي للجامعات العربية عبر 18 تصنيفاً عالمياً، بمنهجية علمية مستقلة وتقنيات الذكاء الاصطناعي.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              <Link
                href="/rankings"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-gupi-orange-900 font-bold hover:bg-gupi-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03]"
              >
                <Trophy className="w-5 h-5 text-gupi-orange-600 group-hover:rotate-12 transition-transform" />
                استكشف ترتيب الجامعات
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/25 text-white font-bold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <BarChart3 className="w-5 h-5" />
                لوحة البيانات التفاعلية
              </Link>
            </div>
          </div>

          {/* منصة التتويج — أعلى 3 جامعات */}
          <TopPodium />

          {/* شريط الإحصاءات — عدّادات متحركة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto">
            {[
              { value: 70, label: 'جامعة عربية نُخبة', icon: Database },
              { value: 18, label: 'تصنيفاً عالمياً', icon: Globe },
              { value: 5, label: 'تصنيفات كبرى للتميز', icon: Trophy },
              { value: 23, label: 'الدرجة الكلية للمؤشر', icon: Calculator },
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
              eyebrow="الرؤية العامة والمنهجية"
              title="منصة نخبة الجامعات العربية"
              subtitle="مؤشر عالمي عربي متخصص في قياس وتقييم حضور الجامعات، بمنهجية حديثة تدمج بين أربعة محاور متكاملة"
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { title: 'البيانات الأكاديمية', icon: Database, desc: 'تحليل شامل للبيانات الأكاديمية الموثقة' },
              { title: 'التحليل الرقمي', icon: BarChart3, desc: 'أدوات تحليل رقمي متقدمة لقياس الأداء' },
              { title: 'الذكاء الاصطناعي', icon: Sparkles, desc: 'توظيف تقنيات الذكاء الاصطناعي في التقييم' },
              { title: 'اللوحات التفاعلية', icon: Monitor, desc: 'لوحات بيانات تفاعلية لعرض النتائج' },
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

      {/* ================= ركائز المؤشر ================= */}
      <section className="py-16 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              icon={Layers}
              eyebrow="Index Pillars"
              title="ركائز قياس الأداء الأكاديمي"
              subtitle="ستة محاور متكاملة ترسم صورة الحضور الدولي لكل جامعة"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'الحضور الأكاديمي العالمي',
                icon: Globe,
                desc: 'رصد ومتابعة مدى انتشار الهوية التعليمية للجامعة وبرامجها المشتركة عبر القارات.',
                color: 'from-gupi-orange-500 to-gupi-orange-700',
              },
              {
                title: 'التأثير البحثي والنشر العلمي',
                icon: BookOpen,
                desc: 'قياس جودة المخرجات البحثية، الاقتباسات الحقيقية، ومعدلات النشر في المجلات المعتمدة.',
                color: 'from-gupi-sage-500 to-gupi-sage-700',
              },
              {
                title: 'الظهور في التصنيفات الدولية',
                icon: Award,
                desc: 'قراءة موحدة لتموضع الجامعة في قواعد البيانات العالمية (QS, THE, ARWU, AD, التصنيف العربي).',
                color: 'from-gupi-amber-500 to-gupi-amber-700',
              },
              {
                title: 'القوة الرقمية للجامعات',
                icon: Monitor,
                desc: 'تحليل جودة الحضور الرقمي، البنية السحابية للمواقع التعليمية، وقوة حضور الويب الأكاديمي.',
                color: 'from-gupi-orange-400 to-gupi-orange-600',
              },
              {
                title: 'السمعة الأكاديمية الدولية',
                icon: Users,
                desc: 'مؤشر استبياني وتحليلي دقيق يستطلع آراء الأكاديميين وجهات التوظيف العالمية حول الخريجين.',
                color: 'from-gupi-sage-400 to-gupi-sage-600',
              },
              {
                title: 'مؤشرات التعاون العلمي',
                icon: Handshake,
                desc: 'حساب حجم الشراكات الدولية المشتركة والمشاريع البحثية الممولة العابرة للحدود الجغرافية.',
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
              eyebrow="منهج المؤشر"
              title="معادلة مؤشر الحضور العالمي"
              subtitle="إطار كمي معياري مستقل — حضور دولي عبر 18 تصنيفاً، وتميز أكاديمي عبر 5 تصنيفات كبرى"
            />
          </Reveal>

          {/* المعادلة */}
          <Reveal>
            <div className="max-w-3xl mx-auto mb-10">
              <div className="bg-gradient-to-br from-gupi-orange-50 to-gupi-amber-100/60 rounded-3xl p-6 md:p-8 border border-gupi-orange-200">
                <p className="text-xs text-gupi-orange-600 font-semibold mb-5 text-center">المعادلة الإجمالية لدرجة مؤشر GUPI</p>
                <div className="flex items-center justify-center gap-2.5 flex-wrap">
                  <div className="bg-white rounded-xl px-5 py-2.5 shadow-md border border-gupi-orange-100">
                    <span className="font-display font-bold text-base text-gupi-orange-900">GUPI Score</span>
                  </div>
                  <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                  <div className="bg-gupi-orange-600 text-white rounded-xl px-5 py-2.5 shadow-md">
                    <span className="font-bold text-sm">الحضور الدولي (18)</span>
                  </div>
                  <span className="text-2xl font-bold text-gupi-orange-400">+</span>
                  <div className="bg-gupi-amber-500 text-white rounded-xl px-5 py-2.5 shadow-md">
                    <span className="font-bold text-sm">التميز الأكاديمي (5)</span>
                  </div>
                  <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                  <div className="bg-gradient-to-br from-gupi-orange-700 to-gupi-orange-900 text-white rounded-xl px-5 py-2.5 shadow-lg">
                    <span className="font-display font-black text-lg gold-shimmer">23 درجة</span>
                  </div>
                </div>

                {/* شريط الأوزان المتحرك */}
                <div className="mt-6">
                  <div className="flex h-3 rounded-full overflow-hidden bg-white shadow-inner">
                    <div className="bar-fill bg-gradient-to-l from-gupi-orange-500 to-gupi-orange-700" style={{ width: '78%' }} />
                    <div className="bar-fill bg-gradient-to-l from-gupi-amber-400 to-gupi-amber-600" style={{ width: '22%', animationDelay: '0.7s' }} />
                  </div>
                  <div className="flex justify-between mt-2 text-[11px] font-semibold">
                    <span className="text-gupi-orange-700">الحضور في التصنيفات — 18 درجة</span>
                    <span className="text-gupi-amber-700">نقاط التميز — 5 درجات</span>
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
                    <h3 className="font-display font-bold text-base text-gupi-orange-900">الظهور في التصنيفات العالمية</h3>
                    <p className="text-xs text-gupi-orange-600">Global Ranking Presence</p>
                  </div>
                </div>
                <p className="text-gupi-ink-600 text-xs leading-relaxed mb-3">
                  يُقاس مدى ظهور الجامعة وثباتها في التصنيفات الدولية المعتمدة، مع التحقق المباشر من المشاركة الرسمية لكل جامعة عبر المواقع الإلكترونية لكل تصنيف. كل مشاركة تمنح الجامعة درجة حضور.
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> مشاركة الجامعة: 1 درجة</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-ink-300" /> عدم المشاركة: 0 درجة</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gupi-orange-100">
                  <p className="text-[11px] text-gupi-orange-600 font-semibold">الهدف: قياس الانتشار الدولي والاعتراف العالمي</p>
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
                    <h3 className="font-display font-bold text-base text-gupi-amber-800">التميز في التصنيفات الكبرى</h3>
                    <p className="text-xs text-gupi-amber-600">Top Rankings Excellence</p>
                  </div>
                </div>
                <p className="text-gupi-ink-600 text-xs leading-relaxed mb-3">
                  تُمنح للجامعات التي تحقق مراكز متقدمة في التصنيفات الكبرى (ARWU - QS - THE - AD - التصنيف العربي)، وتعكس جودة الأداء الفعلي وليس مجرد الظهور: المركز الأول = 1.0، الثاني = 0.9، ... العاشر = 0.1.
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> المركز 1: 1.0 نقطة</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> المركز 2: 0.9 نقطة</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gupi-success" /> ... حتى المركز 10: 0.1 نقطة</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gupi-amber-200">
                  <p className="text-[11px] text-gupi-amber-700 font-semibold">الهدف: قياس التميز والريادة الأكاديمية</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="text-center mt-10">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gupi-orange-600 text-white text-sm font-bold hover:bg-gupi-orange-700 hover:scale-[1.03] transition-all shadow-gupi-primary"
            >
              عرض المنهجية الكاملة
              <ArrowLeft className="w-4 h-4" />
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
              eyebrow="الخوارزمية ومعادلة التقييم"
              title="خطوات احتساب المؤشر"
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { step: 1, title: 'الإنتاج العلمي', desc: 'اختيار الجامعات الأعلى في كثافة النشر العلمي (أعلى 70 جامعة عربية).', icon: Database },
              { step: 2, title: 'تحليل الظهور', desc: 'التحقق الرقمي من الظهور في 18 تصنيفاً عالمياً معتمداً.', icon: Globe },
              { step: 3, title: 'نقاط التميز', desc: 'احتساب الترتيب والريادة في تصنيفات QS وTHE وشنغهاي وAD والتصنيف العربي.', icon: Trophy },
              { step: 4, title: 'النتيجة النهائية', desc: 'استخراج درجة المؤشر المعتمدة وحفظها في قاعدة البيانات (GUPI Score).', icon: Calculator },
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
              eyebrow="إجراءات ضمان الجودة"
              title="مبررات تصميم المنهجية"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'الحيادية والتوازن',
                desc: 'استخدام 18 تصنيفاً متنوعاً للحد التام من التحيز لصالح أي فلسفة تصنيفية واحدة.',
                icon: Shield,
              },
              {
                title: 'الأداء البحثي الحقيقي',
                desc: 'اختيار وحصر الجامعات بناءً على كثافة الإنتاج العلمي والبحثي الفعلي.',
                icon: Database,
              },
              {
                title: 'مكافأة الجودة والتميز',
                desc: 'عدم الاكتفاء بالظهور الشكلي وإضافة نقاط تقديرية للتميز في التصنيفات الخمسة الأكثر تأثيراً.',
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
              eyebrow="GUPI 2027"
              title={<>القائمة النهائية لمؤشر <span className="gold-shimmer">GUPI</span> لأفضل 70 جامعة عربية</>}
              subtitle="اكتشف أحدث ترتيب واستكشف مواقع المؤسسات التعليمية ضمن الإطار القياسي الشامل"
            />
            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gupi-amber-400 to-gupi-orange-600 text-gupi-orange-950 font-bold hover:scale-105 transition-all shadow-xl glow-gold"
            >
              <Trophy className="w-5 h-5" />
              اكتشف ترتيب الجامعات الآن
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
