import Link from 'next/link';
import {
  Globe, BookOpen, Award, Monitor, Users, Handshake,
  ArrowLeft, BarChart3, Target, CheckCircle2, TrendingUp,
  Database, Shield, Layers, Calculator, Trophy
} from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative hero-gradient text-white overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gupi-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-gupi-300/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">Global University Presence Index • 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-black mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              مؤشر <span className="gold-text">GUPI</span>
            </h1>
            <p className="text-2xl md:text-3xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              الحضور العالمي للجامعات
            </p>
            <p className="text-lg md:text-xl text-gupi-100 mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              التميز يُقاس بالحضور العالمي
            </p>
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              يُعد مؤشر الحضور العالمي للجامعات (GUPI) مؤشر رائد ومبتكر يهدف إلى قياس المنظومة الأكاديمية بأساليب جيل الذكاء الاصطناعي. نحن لا نرصد الأرقام الجافة، بل نقرأ الأثر الحقيقي والظهور الدولي للمؤسسات التعليمية عبر معايير علمية متقدمة ومستقلة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Link
                href="/rankings"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gupi-900 font-bold text-lg hover:bg-gupi-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Trophy className="w-5 h-5" />
                استكشف ترتيب الجامعات
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gupi-600/30 border border-white/30 text-white font-bold text-lg hover:bg-gupi-600/50 transition-all backdrop-blur-sm"
              >
                <BarChart3 className="w-5 h-5" />
                لوحة البيانات التفاعلية
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
            {[
              { value: '70+', label: 'جامعة عربية نُخبة', icon: Database },
              { value: '7', label: 'تصنيفات عالمية', icon: Globe },
              { value: '3', label: 'تصنيفات رئيسية كبرى', icon: Trophy },
              { value: '10', label: 'درجات المؤشر الإجمالية', icon: Calculator },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="glass-dark rounded-2xl p-6 text-center animate-fade-in-up"
                  style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-gupi-300" />
                  <div className="text-3xl font-display font-black text-white">{stat.value}</div>
                  <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gupi-50 text-gupi-700 text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              الرؤية العامة والمنهجية
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gupi-950 mb-4">
              Strategic Vision
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              تهدف منصة نخبة الجامعات العربية GUPI إلى إنشاء مؤشر عالمي عربي متخصص في قياس وتقييم حضور الجامعات، معتمدة على منهجية حديثة فائقة التنسيق تدمج بين:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'البيانات الأكاديمية', icon: Database, desc: 'تحليل شامل للبيانات الأكاديمية الموثقة' },
              { title: 'التحليل الرقمي', icon: BarChart3, desc: 'أدوات تحليل رقمي متقدمة لقياس الأداء' },
              { title: 'الذكاء الاصطناعي', icon: Calculator, desc: 'توظيف تقنيات الذكاء الاصطناعي في التقييم' },
              { title: 'اللوحات التفاعلية', icon: Monitor, desc: 'لوحات بيانات تفاعلية لعرض النتائج' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card-hover bg-gradient-to-br from-slate-50 to-gupi-50/50 rounded-2xl p-6 border border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gupi-400 to-gupi-600 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gupi-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Index Pillars */}
      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gupi-100 text-gupi-700 text-sm font-medium mb-4">
              <Layers className="w-4 h-4" />
              Index Pillars
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gupi-950 mb-4">
              ركائز قياس الأداء الأكاديمي
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'الحضور الأكاديمي العالمي',
                icon: Globe,
                desc: 'رصد ومتابعة مدى انتشار الهوية التعليمية للجامعة وبرامجها المشتركة عبر القارات.',
                color: 'from-blue-500 to-blue-700',
              },
              {
                title: 'التأثير البحثي والنشر العلمي',
                icon: BookOpen,
                desc: 'قياس جودة المخرجات البحثية، الاقتباسات الحقيقية، ومعدلات النشر في المجلات المعتمدة.',
                color: 'from-emerald-500 to-emerald-700',
              },
              {
                title: 'الظهور في التصنيفات الدولية',
                icon: Award,
                desc: 'قراءة موحدة لتموضع الجامعة في قواعد البيانات العالمية (QS, THE, ARWU) بمرونة وعمق.',
                color: 'from-purple-500 to-purple-700',
              },
              {
                title: 'القوة الرقمية للجامعات',
                icon: Monitor,
                desc: 'تحليل جودة الحضور الرقمي، البنية السحابية للمواقع التعليمية، وقوة حضور الويب الأكاديمي.',
                color: 'from-orange-500 to-orange-700',
              },
              {
                title: 'السمعة الأكاديمية الدولية',
                icon: Users,
                desc: 'مؤشر استبياني وتحليلي دقيق يستطلع آراء الأكاديميين وجهات التوظيف العالمية حول الخريجين.',
                color: 'from-rose-500 to-rose-700',
              },
              {
                title: 'مؤشرات التعاون العلمي',
                icon: Handshake,
                desc: 'حساب حجم الشراكات الدولية المشتركة والمشاريع البحثية الممولة العابرة للحدود الجغرافية.',
                color: 'from-cyan-500 to-cyan-700',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gupi-900 mb-3">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GUPI Future CTA */}
      <section className="py-20 bg-gupi-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gupi-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gupi-700/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="gold-text">GUPI</span> — مستقبل قياس الحضور الدولي للجامعات يبدأ هنا
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            تم تصميم مؤشر GUPI ليكون الأداة التحليلية الأكثر مرونة وعمقاً بين أيدي الجامعات الطامحة للريادة وصناع القرار بقطاع التعليم العالي والبحث العلمي.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gupi-400 to-gupi-600 text-white font-bold text-lg hover:scale-105 transition-all shadow-xl"
          >
            <BarChart3 className="w-5 h-5" />
            استكشف لوحة البيانات التفاعلية
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Methodology Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gupi-50 text-gupi-700 text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              منهج المؤشر
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gupi-950 mb-4">
              منهجية مؤشر الحضور العالمي للجامعات
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              إطار كمي ومعياري مستقل — نموذج يقيس مستوى الحضور الدولي للجامعات العربية يجمع بين كثافة البحث العلمي والتصنيفات الدولية.
            </p>
          </div>

          {/* Score equation */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-gupi-50 to-gupi-100/50 rounded-3xl p-8 border-2 border-gupi-200">
              <div className="text-center">
                <p className="text-sm text-gupi-600 font-medium mb-4">المعادلة الإجمالية لدرجة مؤشر GUPI</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="bg-white rounded-xl px-6 py-3 shadow-md">
                    <span className="font-display font-bold text-xl text-gupi-900">GUPI Score</span>
                  </div>
                  <span className="text-3xl font-bold text-gupi-400">=</span>
                  <div className="bg-gupi-600 text-white rounded-xl px-6 py-3 shadow-md">
                    <span className="font-bold text-lg">الحضور الدولي (7)</span>
                  </div>
                  <span className="text-3xl font-bold text-gupi-400">+</span>
                  <div className="bg-gold-500 text-white rounded-xl px-6 py-3 shadow-md">
                    <span className="font-bold text-lg">التميز الأكاديمي (3)</span>
                  </div>
                  <span className="text-3xl font-bold text-gupi-400">=</span>
                  <div className="bg-gradient-to-br from-gupi-700 to-gupi-900 text-white rounded-xl px-6 py-3 shadow-lg">
                    <span className="font-display font-black text-2xl">10 درجات</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Dimension 1 */}
            <div className="bg-gradient-to-br from-gupi-50 to-white rounded-2xl p-8 border border-gupi-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gupi-600 text-white flex items-center justify-center font-display font-black text-xl">
                  7
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gupi-900">الظهور في التصنيفات العالمية</h3>
                  <p className="text-sm text-gupi-600">Global Ranking Presence</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                يتم قياس مدى ظهور الجامعة وثباتها في 7 تصنيفات دولية رئيسية، حيث يتم التحقق المباشر من المشاركة الرسمية لكل جامعة عبر المواقع الإلكترونية لكل تصنيف.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> مشاركة الجامعة: 1 درجة</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-red-400" /> عدم المشاركة: 0 درجة</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gupi-100">
                <p className="text-xs text-gupi-600 font-medium">الهدف: قياس الانتشار الدولي والاعتراف العالمي</p>
              </div>
            </div>

            {/* Dimension 2 */}
            <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-8 border border-gold-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500 text-white flex items-center justify-center font-display font-black text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gold-800">التميز في التصنيفات الكبرى</h3>
                  <p className="text-sm text-gold-600">Top Rankings Excellence</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                يُمنح للجامعات التي تحقق مراكز متقدمة على المستوى العربي في التصنيفات الثلاثة الكبرى (ARWU - QS - THE)، ويعكس هذا البعد جودة الأداء الفعلي وليس مجرد الظهور.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> تصنيف شنغهاي (ARWU): 1 درجة قصوى</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> تصنيف كيو إس (QS): 1 درجة قصوى</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> تصنيف التايمز (THE): 1 درجة قصوى</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gold-200">
                <p className="text-xs text-gold-700 font-medium">الهدف: قياس التميز والريادة الأكاديمية</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gupi-600 text-white font-bold hover:bg-gupi-700 transition-all"
            >
              عرض المنهجية الكاملة
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Algorithm Steps */}
      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gupi-100 text-gupi-700 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              الخوارزمية ومعادلة التقييم
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gupi-950 mb-4">
              خطوات احتساب المؤشر
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'الإنتاج العلمي', desc: 'اختيار الجامعات الأعلى في كثافة النشر العلمي (أعلى 70 جامعة عربية).', icon: Database },
              { step: 2, title: 'تحليل الظهور', desc: 'التحقق الرقمي من الظهور في 7 تصنيفات عالمية معتمدة.', icon: Globe },
              { step: 3, title: 'نقاط التميز', desc: 'احتساب الترتيب والريادة في تصنيفات QS وTHE وShanghai.', icon: Trophy },
              { step: 4, title: 'النتيجة النهائية', desc: 'استخراج درجة المؤشر المعتمدة وحفظها في قاعدة البيانات (GUPI Score).', icon: Calculator },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative">
                  <div className="card-hover bg-white rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gupi-500 to-gupi-700 text-white flex items-center justify-center font-display font-black">
                        {item.step}
                      </div>
                      <Icon className="w-6 h-6 text-gupi-500" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-gupi-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  {item.step < 4 && (
                    <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gupi-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gupi-50 text-gupi-700 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              إجراءات ضمان الجودة
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gupi-950 mb-4">
              مبررات تصميم المنهجية
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'الحيادية والتوازن',
                desc: 'استخدام 7 تصنيفات متنوعة للحد التام من التحيز لصالح أي فلسفة تصنيفية واحدة.',
                icon: Shield,
              },
              {
                title: 'الأداء البحثي الحقيقي',
                desc: 'اختيار وحصر الجامعات بناءً على كثافة الإنتاج العلمي والبحثي الفعلي.',
                icon: Database,
              },
              {
                title: 'مكافأة الجودة والتميز',
                desc: 'عدم الاكتفاء بالظهور الشكلي وإضافة نقاط تقديرية للتميز في التصنيفات الثلاثة الأكثر تأثيراً.',
                icon: Trophy,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card-hover bg-gradient-to-br from-slate-50 to-gupi-50/30 rounded-2xl p-6 border border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gupi-500 to-gupi-700 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gupi-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gupi-900 to-gupi-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            القائمة النهائية لمؤشر GUPI لأفضل 70 جامعة عربية
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            اكتشف أحدث ترتيب واستكشف مواقع المؤسسات التعليمية ضمن الإطار القياسي الشامل
          </p>
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gupi-900 font-bold text-lg hover:scale-105 transition-all shadow-xl"
          >
            <Trophy className="w-5 h-5" />
            اكتشف ترتيب الجامعات الآن
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
