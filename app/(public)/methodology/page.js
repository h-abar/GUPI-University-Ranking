import Link from 'next/link';
import {
  Globe, BookOpen, Award, Database, Shield, Calculator,
  CheckCircle2, XCircle, Layers, TrendingUp, ArrowLeft,
  Trophy, ScrollText
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/home/Reveal';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-gupi-bg">
      <PageHero
        icon={ScrollText}
        eyebrow="GUPI Methodology"
        title={<>منهجية <span className="gold-shimmer">مؤشر الحضور العالمي</span> للجامعات</>}
        subtitle="تصنيف الجامعات العربية وفق الحضور العالمي — إطار كمي ومعياري مستقل"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* ما هو المؤشر */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={Award} title="ما هو مؤشر GUPI؟" />
            <p className="text-gupi-ink-700 leading-relaxed text-sm md:text-base">
              يُعد مؤشر الحضور العالمي للجامعات (GUPI) إطاراً كمياً مبتكراً لقياس مستوى الحضور الدولي للجامعات العربية، من خلال الجمع بين الإنتاج البحثي، والظهور المباشر في التصنيفات العالمية، والتميز في الأداء التصنيفي، بهدف تقديم تقييم موضوعي وشامل يعكس الموقع الحقيقي للجامعة ضمن منظومة التعليم العالي العالمية.
            </p>
          </section>
        </Reveal>

        {/* أبعاد المؤشر */}
        <Reveal>
          <section>
            <SectionTitle icon={Layers} title="أبعاد المؤشر (Index Dimensions)" className="mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* البعد الأول */}
              <div className="shine-card bg-gradient-to-br from-gupi-orange-50 to-white rounded-2xl p-6 border border-gupi-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gupi-orange-600 text-white flex items-center justify-center font-display font-black text-lg shadow-gupi-primary">
                    18
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gupi-orange-900">الظهور في التصنيفات العالمية</h3>
                    <p className="text-xs text-gupi-orange-600">Global Ranking Presence</p>
                  </div>
                </div>
                <p className="text-gupi-ink-700 text-sm leading-relaxed mb-3">
                  يتم قياس مدى ظهور الجامعة وثباتها في التصنيفات الدولية الرئيسية، حيث يتم التحقق المباشر من المشاركة الرسمية لكل جامعة عبر المواقع الإلكترونية لكل تصنيف. كل مشاركة تمنح الجامعة درجة حضور.
                </p>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs bg-gupi-success-soft text-gupi-success-dark px-3 py-2 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" /> مشاركة الجامعة: 1 درجة
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-gupi-error-soft text-gupi-error-dark px-3 py-2 rounded-lg">
                    <XCircle className="w-3.5 h-3.5" /> عدم المشاركة: 0 درجة
                  </div>
                </div>
                <p className="text-xs text-gupi-orange-600 font-semibold">الهدف: قياس الانتشار الدولي والاعتراف العالمي.</p>
              </div>

              {/* البعد الثاني */}
              <div className="shine-card bg-gradient-to-br from-gupi-amber-50 to-white rounded-2xl p-6 border border-gupi-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gupi-amber-500 text-white flex items-center justify-center font-display font-black text-lg shadow-md">
                    5
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gupi-amber-800">التميز في التصنيفات الكبرى</h3>
                    <p className="text-xs text-gupi-amber-600">Top Rankings Excellence</p>
                  </div>
                </div>
                <p className="text-gupi-ink-700 text-sm leading-relaxed mb-3">
                  يُمنح للجامعات التي تحقق مراكز متقدمة في التصنيفات الكبرى (ARWU - QS - THE - AD - التصنيف العربي)، ويعكس هذا البعد جودة الأداء الفعلي وليس مجرد الظهور. يتم احتساب نقاط التميز وفق ترتيب الجامعة:
                </p>
                <div className="space-y-2 mb-3">
                  {['المركز الأول: 1.0 نقطة', 'المركز الثاني: 0.9 نقطة', 'المركز الثالث: 0.8 نقطة', '... وهكذا حتى المركز العاشر: 0.1 نقطة'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs bg-gupi-amber-100/60 text-gupi-amber-800 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs bg-gupi-error-soft text-gupi-error-dark px-3 py-2 rounded-lg">
                    <XCircle className="w-3.5 h-3.5" /> بعد المركز العاشر: 0 نقطة
                  </div>
                </div>
                <p className="text-xs text-gupi-amber-700 font-semibold">الهدف: قياس التميز والريادة الأكاديمية.</p>
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
                المعادلة الإجمالية لدرجة مؤشر <span className="gold-shimmer">GUPI</span>
              </h2>
              <div className="flex items-center justify-center gap-2.5 flex-wrap">
                <div className="bg-white/10 rounded-xl px-5 py-2.5 border border-white/15">
                  <span className="font-display font-bold text-base">GUPI Score</span>
                </div>
                <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                <div className="bg-gupi-orange-600 rounded-xl px-5 py-2.5">
                  <span className="font-bold text-sm">الحضور الدولي (18)</span>
                </div>
                <span className="text-2xl font-bold text-gupi-orange-400">+</span>
                <div className="bg-gupi-amber-500 rounded-xl px-5 py-2.5">
                  <span className="font-bold text-sm">التميز الأكاديمي (5)</span>
                </div>
                <span className="text-2xl font-bold text-gupi-orange-400">=</span>
                <div className="bg-white text-gupi-orange-900 rounded-xl px-5 py-2.5">
                  <span className="font-display font-black text-lg">23 درجة</span>
                </div>
              </div>

              {/* شريط الأوزان المتحرك */}
              <div className="max-w-2xl mx-auto mt-6">
                <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                  <div className="bar-fill bg-gradient-to-l from-gupi-orange-500 to-gupi-orange-400" style={{ width: '78%' }} />
                  <div className="bar-fill bg-gradient-to-l from-gupi-amber-400 to-gupi-amber-300" style={{ width: '22%', animationDelay: '0.7s' }} />
                </div>
                <div className="flex justify-between mt-2 text-[11px] font-semibold">
                  <span className="text-gupi-orange-300">الحضور العالمي — 18 درجة (78%)</span>
                  <span className="text-gupi-amber-300">التميز النوعي — 5 درجات (22%)</span>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* اختيار العينة */}
        <Reveal>
          <section className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
            <SectionTitle icon={Database} title="منهجية اختيار العينة والتغطية" />
            <p className="text-gupi-ink-700 text-sm leading-relaxed mb-5">
              يعتمد المؤشر على عينة انتقائية مكونة من أفضل 70 جامعة عربية من حيث كثافة الإنتاج البحثي. يتم اختيار هذه الجامعات بناءً على بيانات موثوقة مستخرجة من منصة Research Integrity Risk Index (RI²) والتي تقيس نشاط النشر العلمي وجودته على مستوى المؤسسات التعليمية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'الاعتماد على البيانات الضخمة', desc: 'مسح وتحليل كميات هائلة من مخرجات النشر العلمي العالمي لضمان دقة الشمول والأرقام.', icon: Database },
                { title: 'إبراز مخاطر النزاهة البحثية', desc: 'رصد وتحليل مؤشرات جودة النشر والحوكمة البحثية للحد من آثار التضخيم أو الممارسات غير المعيارية.', icon: Shield },
                { title: 'الموازنة بين الكم والجودة', desc: 'تفضيل الجامعات ذات الإنتاج البحثي التراكمي الكثيف مع مراعاة السلامة والأمانة الأكاديمية.', icon: TrendingUp },
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
            <SectionTitle icon={BookOpen} title="الأسس والمعايير الرئيسية" />
            <div className="space-y-3">
              {[
                { title: 'الإنتاج البحثي', desc: 'يعتمد المؤشر على رصد وحساب كثافة عدد الأبحاث العلمية المنشورة بدقة عبر قواعد البيانات العالمية المعتمدة: Scopus و SciVal', icon: BookOpen },
                { title: 'الظهور العالمي', desc: 'قياس حضور وتواجد الجامعات في التصنيفات العالمية الرئيسية لضمان الشمول والتوازن الكامل وعدم التحيز لمنظومة واحدة.', icon: Globe },
                { title: 'نقاط التميز', desc: 'منح درجات متدرجة للجامعات التي تحقق مراكز متقدمة (1-10) في التصنيفات الكبرى، حيث يحصل المركز الأول على 1.0 نقطة والعاشر على 0.1 نقطة.', icon: Trophy },
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
            <SectionTitle icon={Calculator} title="آلية احتساب المؤشر" />
            <div className="space-y-3">
              {[
                { step: 1, title: 'الإنتاج العلمي', desc: 'اختيار الجامعات الأعلى في كثافة النشر العلمي (أعلى 70 جامعة عربية).' },
                { step: 2, title: 'تحليل الظهور', desc: 'التحقق الرقمي من الظهور في التصنيفات العالمية المعتمدة.' },
                { step: 3, title: 'نقاط التميز', desc: 'احتساب الترتيب والريادة في التصنيفات الكبرى (المركز 1-10).' },
                { step: 4, title: 'النتيجة النهائية', desc: 'استخراج درجة المؤشر المعتمدة وحفظها في قاعدة البيانات (GUPI Score).' },
              ].map((item) => (
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
              <SectionTitle icon={Layers} title="نموذج حساب المؤشر المعتمد" className="mb-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gupi-orange-950 text-white">
                    <th className="px-4 py-3 text-right">المعيار</th>
                    <th className="px-4 py-3 text-right">الوصف المنهجي</th>
                    <th className="px-4 py-3 text-center">الوزن / النطاق</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['الإنتاج البحثي', 'حساب كثافة وعدد الأبحاث العلمية المنشورة وفق قواعد البيانات', 'أعلى 70 جامعة'],
                    ['الظهور في التصنيفات', 'المشاركة الفعلية والرسمية في التصنيفات الدولية الرئيسية', '78% (18 درجة)'],
                    ['نقاط التميز', 'تحقيق مراكز متقدمة (1-10) في التصنيفات الكبرى', '22% (5 درجات)'],
                  ].map((row, i) => (
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
            <SectionTitle icon={Trophy} title="آلية ترتيب الجامعات (Ranking Mechanism)" />
            <p className="text-gupi-ink-700 text-sm leading-relaxed mb-5">
              يتم ترتيب الجامعات تنازليًا حسب الدرجة النهائية (من 23 درجة). وفي حال تساوي درجات أكثر من جامعة، يتم اللجوء إلى معايير ترجيحية دقيقة حسمًا للترتيب:
            </p>
            <div className="space-y-3">
              {[
                { title: 'عامل الترجيح الأول', desc: 'إجمالي عدد المشاركات والظهور المباشر في التصنيفات المعتمدة.' },
                { title: 'عامل الترجيح الثاني', desc: 'الترتيب المتقدم للجامعة ضمن التصنيفات الكبرى.' },
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
            <SectionTitle icon={CheckCircle2} title="خصائص المؤشر (Key Features)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'مؤشر بسيط وواضح (Simple & Transparent)',
                'قابل للتكرار والتحقق (Reproducible)',
                'يعتمد على بيانات رسمية وموثوقة حصراً',
                'يجمع بمرونة بين الكم (عدد المشاركات) والكيف (جودة الترتيب)',
              ].map((feature, i) => (
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
            <SectionTitle icon={TrendingUp} title="فرص التطوير المستقبلي" />
            <div className="space-y-2.5">
              {[
                'إدخال أوزان متدرجة للتصنيفات حسب قوتها التأثيرية',
                'إضافة نسبة الأبحاث الأكثر استشهادًا (Top 10% Highly Cited)',
                'تضمين مؤشرات الشراكات الدولية وتوظيف الخريجين',
                'تطوير نموذج وزني متعدد المعايير (MCDM) مطابق للمؤشرات العالمية',
              ].map((item, i) => (
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
              <SectionTitle icon={Shield} title="إجراءات ضمان الجودة وحدود المنهجية" className="mb-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gupi-orange-950 text-white">
                    <th className="px-4 py-3 text-right">المحور</th>
                    <th className="px-4 py-3 text-right">التفاصيل والضوابط المعتمدة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-bold text-gupi-orange-900 align-top">إجراءات ضمان الجودة</td>
                    <td className="px-4 py-3 text-xs text-gupi-ink-600">
                      <ul className="space-y-1">
                        <li>• توثيق مصادر البيانات: حفظ روابط التصنيفات الرسمية، نسخ الجداول، وتاريخ الاستخراج الحصري.</li>
                        <li>• المراجعة اليدوية للمؤسسات: تدقيق الاسم المؤسسي لكل جامعة عبر المنصات تلافياً لفقدان البيانات بسبب اختلاف الصياغات الترجمة.</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-gupi-ink-50/50">
                    <td className="px-4 py-3 font-bold text-gupi-orange-900 align-top">حدود المنهجية والمؤشر</td>
                    <td className="px-4 py-3 text-xs text-gupi-ink-600">
                      <ul className="space-y-1">
                        <li>• نطاق القياس: لا يقيس جودة التعليم، تجربة الطالب، أو خدمة المجتمع والابتكار إلا بشكل غير مباشر عبر التصنيفات المعتمدة.</li>
                        <li>• الاعتمادية الزمنية: يعتمد كلياً على توافر بيانات النشر والتصنيفات في الفترة المرجعية، وأي نقص أولي في المصدر ينعكس على النتيجة.</li>
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
            <SectionTitle icon={Award} title="حول مؤشر الحضور العالمي للجامعات (GUPI)" />
            <p className="text-gupi-ink-700 text-sm leading-relaxed">
              يمثل مؤشر GUPI نموذجًا مستقلًا ومبتكرًا لقياس الحضور العالمي للجامعات العربية، حيث يجمع بين النشاط البحثي والاعتراف الدولي والتميز الأكاديمي ضمن إطار بسيط (23 درجة)، مما يجعله أداة فعالة لصناع القرار والجامعات لتقييم موقعهم عالميًا وتحديد فجوات التحسين. تعتمد التصنيفات في هذا الموقع على بيانات متاحة للعموم، ومؤشرات شفافة، ومنهجيات مطورة بشكل مستقل.
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
            استكشف ترتيب الجامعات
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
