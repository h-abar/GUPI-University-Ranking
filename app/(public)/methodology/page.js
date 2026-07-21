import Link from 'next/link';
import {
  Globe, BookOpen, Award, Database, Shield, Calculator,
  CheckCircle2, XCircle, Target, Layers, TrendingUp, ArrowLeft,
  Trophy, Users, Handshake, Monitor
} from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-black mb-4">
            منهجية مؤشر الحضور العالمي للجامعات
          </h1>
          <p className="text-slate-300 text-lg">
            تصنيف الجامعات العربية وفق الحضور العالمي — إطار كمي ومعياري مستقل
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* What is GUPI */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-4">
            ما هو مؤشر GUPI؟
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            يُعد مؤشر الحضور العالمي للجامعات (GUPI) إطاراً كمياً مبتكراً لقياس مستوى الحضور الدولي للجامعات العربية، من خلال الجمع بين الإنتاج البحثي، والظهور المباشر في التصنيفات العالمية، والتميز في الأداء التصنيفي، بهدف تقديم تقييم موضوعي وشامل يعكس الموقع الحقيقي للجامعة ضمن منظومة التعليم العالي العالمية.
          </p>
        </section>

        {/* Dimensions */}
        <section>
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">أبعاد المؤشر (Index Dimensions)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dimension 1 */}
            <div className="bg-gradient-to-br from-gupi-50 to-white rounded-2xl p-8 border-2 border-gupi-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gupi-600 text-white flex items-center justify-center font-display font-black text-2xl">
                  7
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gupi-900">الظهور في التصنيفات العالمية</h3>
                  <p className="text-sm text-gupi-600">Global Ranking Presence</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                يتم قياس مدى ظهور الجامعة وثباتها في 7 تصنيفات دولية رئيسية، حيث يتم التحقق المباشر من المشاركة الرسمية لكل جامعة عبر المواقع الإلكترونية لكل تصنيف.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" /> مشاركة الجامعة: 1 درجة
                </div>
                <div className="flex items-center gap-2 text-sm bg-red-50 text-red-600 px-3 py-2 rounded-lg">
                  <XCircle className="w-4 h-4" /> عدم المشاركة: 0 درجة
                </div>
              </div>
              <p className="text-sm text-gupi-600 font-medium">الهدف: قياس الانتشار الدولي والاعتراف العالمي.</p>
            </div>

            {/* Dimension 2 */}
            <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-8 border-2 border-gold-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gold-500 text-white flex items-center justify-center font-display font-black text-2xl">
                  3
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gold-800">التميز في التصنيفات الكبرى</h3>
                  <p className="text-sm text-gold-600">Top Rankings Excellence</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                يُمنح للجامعات التي تحقق مراكز متقدمة على المستوى العربي في التصنيفات الثلاثة الكبرى (ARWU - QS - THE)، ويعكس هذا البعد جودة الأداء الفعلي وليس مجرد الظهور.
              </p>
              <div className="space-y-2 mb-4">
                {['تصنيف شنغهاي (ARWU)', 'تصنيف كيو إس (QS)', 'تصنيف التايمز (THE)'].map((label) => (
                  <div key={label} className="flex items-center gap-2 text-sm bg-gold-50 text-gold-700 px-3 py-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> {label}: 1 درجة قصوى
                  </div>
                ))}
              </div>
              <p className="text-sm text-gold-700 font-medium">الهدف: قياس التميز والريادة الأكاديمية.</p>
            </div>
          </div>
        </section>

        {/* Score formula */}
        <section className="bg-gradient-to-br from-gupi-900 to-gupi-950 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">المعادلة الإجمالية لدرجة مؤشر GUPI</h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <span className="font-display font-bold text-xl">GUPI Score</span>
            </div>
            <span className="text-3xl font-bold text-gupi-400">=</span>
            <div className="bg-gupi-600 rounded-xl px-6 py-3">
              <span className="font-bold">الحضور الدولي (7)</span>
            </div>
            <span className="text-3xl font-bold text-gupi-400">+</span>
            <div className="bg-gold-500 rounded-xl px-6 py-3">
              <span className="font-bold">التميز الأكاديمي (3)</span>
            </div>
            <span className="text-3xl font-bold text-gupi-400">=</span>
            <div className="bg-white text-gupi-900 rounded-xl px-6 py-3">
              <span className="font-display font-black text-2xl">10 درجات</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-gupi-400">70%</div>
              <div className="text-sm text-slate-300 mt-1">الحضور العالمي (7 درجات)</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-gold-400">30%</div>
              <div className="text-sm text-slate-300 mt-1">التميز النوعي (3 درجات)</div>
            </div>
          </div>
        </section>

        {/* Sample selection */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">منهجية اختيار العينة والتغطية</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            يعتمد المؤشر على عينة انتقائية مكونة من أفضل 70 جامعة عربية من حيث كثافة الإنتاج البحثي. يتم اختيار هذه الجامعات بناءً على بيانات موثوقة مستخرجة من منصة Research Integrity Risk Index (RI²) والتي تقيس نشاط النشر العلمي وجودته على مستوى المؤسسات التعليمية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'الاعتماد على البيانات الضخمة', desc: 'يعتمد على مسح وتحليل كميات هائلة من مخرجات النشر العلمي العالمي لضمان دقة الشمول والأرقام.', icon: Database },
              { title: 'إبراز مخاطر النزاهة البحثية', desc: 'يرصد ويحلل مؤشرات جودة النشر والحوكمة البحثية للحد من آثار التضخيم أو الممارسات غير المعيارية.', icon: Shield },
              { title: 'الموازنة بين الكم والجودة', desc: 'يسمح بتفضيل الجامعات ذات الإنتاج البحثي التراكمي الكثيف مع مراعاة السلامة والأمانة الأكاديمية.', icon: TrendingUp },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-slate-50 rounded-xl p-5">
                  <Icon className="w-8 h-8 text-gupi-600 mb-3" />
                  <h3 className="font-bold text-gupi-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main pillars */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">الأسس والمعايير الرئيسية</h2>
          <div className="space-y-4">
            {[
              { title: 'الإنتاج البحثي', desc: 'يعتمد المؤشر على رصد وحساب كثافة عدد الأبحاث العلمية المنشورة بدقة عبر قواعد البيانات العالمية المعتمدة: Scopus و SciVal', icon: BookOpen },
              { title: 'الظهور العالمي', desc: 'قياس حضور وتواجد الجامعات في 7 تصنيفات عالمية رئيسية لضمان الشمول والتوازن الكامل وعدم التحيز لمنظومة واحدة.', icon: Globe },
              { title: 'نقاط التميز', desc: 'منح درجات إضافية للجامعات التي تحقق مراكز متقدمة على الساحة العربية ضمن القمة الثلاثية للتصنيفات الكبرى: QS و THE و Shanghai (ARWU).', icon: Trophy },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 bg-gradient-to-l from-gupi-50 to-transparent rounded-xl p-5">
                  <div className="w-12 h-12 rounded-xl bg-gupi-600 text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gupi-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Algorithm steps */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">آلية احتساب المؤشر</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'الإنتاج العلمي', desc: 'اختيار الجامعات الأعلى في كثافة النشر العلمي (أعلى 70 جامعة عربية).' },
              { step: 2, title: 'تحليل الظهور', desc: 'التحقق الرقمي من الظهور في 7 تصنيفات عالمية معتمدة.' },
              { step: 3, title: 'نقاط التميز', desc: 'احتساب الترتيب والريادة في تصنيفات QS وTHE وShanghai.' },
              { step: 4, title: 'النتيجة النهائية', desc: 'استخراج درجة المؤشر المعتمدة وحفظها في قاعدة البيانات (GUPI Score).' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gupi-500 to-gupi-700 text-white flex items-center justify-center font-display font-black flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 pb-4 border-b border-slate-100">
                  <h3 className="font-bold text-gupi-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluation model table */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">نموذج حساب المؤشر المعتمد</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gupi-950 text-white">
                  <th className="px-4 py-3 text-right">المعيار</th>
                  <th className="px-4 py-3 text-right">الوصف المنهجي</th>
                  <th className="px-4 py-3 text-center">الوزن / النطاق</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['الإنتاج البحثي', 'حساب كثافة وعدد الأبحاث العلمية المنشورة وفق قواعد البيانات', 'أعلى 70 جامعة'],
                  ['الظهور في التصنيفات', 'المشاركة الفعلية والرسمية في 7 تصنيفات دولية رئيسية', '70% (7 درجات)'],
                  ['نقاط التميز', 'تحقيق مراكز متقدمة في القمة الثلاثية (QS • THE • Shanghai)', '30% (3 درجات)'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-bold text-gupi-900">{row[0]}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row[1]}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gupi-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ranking mechanism */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">آلية ترتيب الجامعات (Ranking Mechanism)</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            يتم ترتيب الجامعات تنازليًا حسب الدرجة النهائية (من 10 درجات). وفي حال تساوي درجات أكثر من جامعة، يتم اللجوء إلى معايير ترجيحية دقيقة حسمًا للترتيب:
          </p>
          <div className="space-y-4">
            {[
              { title: 'عامل الترجيح الأول', desc: 'إجمالي عدد المشاركات والظهور المباشر في التصنيفات السبعة.' },
              { title: 'عامل الترجيح الثاني', desc: 'الترتيب المتقدم للجامعة ضمن القمة الثلاثية للتصنيفات الكبرى.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-gupi-50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-gupi-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gupi-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key features */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">خصائص المؤشر (Key Features)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'مؤشر بسيط وواضح (Simple & Transparent)',
              'قابل للتكرار والتحقق (Reproducible)',
              'يعتمد على بيانات رسمية وموثوقة حصراً',
              'يجمع بمرونة بين الكم (عدد المشاركات) و الكيف (جودة الترتيب)',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Future development */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">فرص التطوير المستقبلي</h2>
          <div className="space-y-3">
            {[
              'إدخال أوزان متدرجة للتصنيفات حسب قوتها التأثيرية',
              'إضافة نسبة الأبحاث الأكثر استشهادًا (Top 10% Highly Cited)',
              'تضمين مؤشرات الشراكات الدولية وتوظيف الخريجين',
              'تطوير نموذج وزني متعدد المعايير (MCDM) مطابق للمؤشرات العالمية',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-2 h-2 rounded-full bg-gupi-500" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Quality assurance */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-6">إجراءات ضمان الجودة وحدود المنهجية</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gupi-950 text-white">
                  <th className="px-4 py-3 text-right">المحور</th>
                  <th className="px-4 py-3 text-right">التفاصيل والضوابط المعتمدة</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-bold text-gupi-900 align-top">إجراءات ضمان الجودة</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <ul className="space-y-1">
                      <li>• توثيق مصادر البيانات: حفظ روابط التصنيفات الرسمية، نسخ الجداول، وتاريخ الاستخراج الحصري.</li>
                      <li>• المراجعة اليدوية للمؤسسات: تدقيق الاسم المؤسسي لكل جامعة عبر المنصات تلافياً لفقدان البيانات بسبب اختلاف الصياغات الترجمة.</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-bold text-gupi-900 align-top">حدود المنهجية والمؤشر</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
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

        {/* About */}
        <section className="bg-gradient-to-br from-gupi-50 to-white rounded-2xl p-8 border border-gupi-100">
          <h2 className="text-2xl font-display font-bold text-gupi-900 mb-4">حول مؤشر الحضور العالمي للجامعات (GUPI)</h2>
          <p className="text-slate-700 leading-relaxed">
            يمثل مؤشر GUPI نموذجًا مستقلًا ومبتكرًا لقياس الحضور العالمي للجامعات العربية، حيث يجمع بين النشاط البحثي والاعتراف الدولي والتميز الأكاديمي ضمن إطار بسيط (10 درجات)، مما يجعله أداة فعالة لصناع القرار والجامعات لتقييم موقعهم عالميًا وتحديد فجوات التحسين. تعتمد التصنيفات في هذا الموقع على بيانات متاحة للعموم، ومؤشرات شفافة، ومنهجيات مطورة بشكل مستقل.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gupi-600 text-white font-bold text-lg hover:bg-gupi-700 transition-all shadow-xl"
          >
            <Trophy className="w-5 h-5" />
            استكشف ترتيب الجامعات
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
