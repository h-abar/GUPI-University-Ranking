'use client';

import { useState } from 'react';
import {
  Mail, Send, MessageSquare, Building2,
  Newspaper, Wrench, GraduationCap, Handshake, Loader2,
  CheckCircle2, AlertCircle, FileText,
  Briefcase, ClipboardCheck, FileUp, Sparkles, ShieldCheck
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/home/Reveal';
import { useLang } from '@/lib/LanguageContext';

const ARAB_COUNTRIES = [
  'السعودية', 'مصر', 'الإمارات', 'الأردن', 'العراق', 'قطر', 'الكويت',
  'عمان', 'البحرين', 'المغرب', 'الجزائر', 'تونس', 'ليبيا', 'السودان',
  'لبنان', 'سوريا', 'فلسطين', 'اليمن', 'موريتانيا', 'الصومال', 'جزر القمر',
  'جيبوتي', 'أخرى',
];

const ARAB_COUNTRIES_EN = [
  'Saudi Arabia', 'Egypt', 'UAE', 'Jordan', 'Iraq', 'Qatar', 'Kuwait',
  'Oman', 'Bahrain', 'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Sudan',
  'Lebanon', 'Syria', 'Palestine', 'Yemen', 'Mauritania', 'Somalia', 'Comoros',
  'Djibouti', 'Other',
];

export default function ContactPage() {
  const { lang } = useLang();
  const ar = lang === 'ar';
  const [form, setForm] = useState({
    name: '', jobTitle: '', email: '', phone: '',
    university: '', country: '', website: '',
    category: 'data_correction', subject: '', message: '',
    consent: false, newsletter: false,
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const categories = [
    { value: 'data_correction', icon: ClipboardCheck, ar: 'طلب مراجعة/تحديث بيانات جامعة', en: 'University Data Review/Update' },
    { value: 'methodology', icon: FileText, ar: 'استفسار حول معايير ومنهجية التقييم', en: 'Methodology & Criteria Inquiry' },
    { value: 'partnership', icon: Handshake, ar: 'طلب شراكة أفقية / استشارية', en: 'Partnership / Consulting Request' },
    { value: 'reports', icon: GraduationCap, ar: 'طلب تقارير تحليلية مخصصة', en: 'Custom Analytical Reports' },
    { value: 'media', icon: Newspaper, ar: 'استفسار إعلامي / صحفي', en: 'Media / Press Inquiry' },
    { value: 'technical', icon: Wrench, ar: 'الدعم الفني أو بلاغ عن مشكلة', en: 'Technical Support / Bug Report' },
    { value: 'general', icon: MessageSquare, ar: 'اقتراحات واستفسارات عامة', en: 'General Suggestions & Inquiries' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      setError(ar ? 'يجب الموافقة على شروط الاستخدام وسياسة الخصوصية' : 'You must agree to the terms and privacy policy');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-600 focus:ring-4 focus:ring-gupi-orange-100 outline-none transition-all text-gupi-ink-900 text-sm bg-white";
  const labelClass = "block text-sm font-bold text-gupi-ink-800 mb-1.5";

  return (
    <>
      <PageHero
        icon={Mail}
        eyebrow={ar ? 'GUPI • تواصل معنا' : 'GUPI • Contact Us'}
        title={ar ? 'تواصل مع فريق مؤشر التواجد العالمي للجامعات (GUPI)' : 'Contact the GUPI Team'}
        subtitle={ar
          ? 'نرحب باستفساراتكم، اقتراحاتكم، وطلبات التعاون مع إدارة المؤشر. يرجى تعبئة النموذج أدناه، وسيقوم الفريق المختص بالتواصل معكم في أقرب وقت ممكن.'
          : 'We welcome your inquiries, suggestions, and collaboration requests. Please fill out the form below and our team will get back to you as soon as possible.'}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Direct Email Header Card */}
        <Reveal>
          <div className="bg-gradient-to-r from-gupi-orange-900 via-gupi-orange-950 to-gupi-ink-950 rounded-2xl p-6 md:p-8 text-white mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-gupi-orange-800/40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-gupi-orange-300" />
              </div>
              <div>
                <div className="text-xs text-gupi-orange-200 uppercase tracking-wider font-semibold mb-1">
                  {ar ? 'البريد الإلكتروني المباشر' : 'Direct Email Contact'}
                </div>
                <a href="mailto:gupi@topauniversity.com" className="font-mono text-lg md:text-xl font-bold hover:text-gupi-amber-300 transition-colors">
                  gupi@topauniversity.com
                </a>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-xs font-medium text-gupi-amber-200">
              <Sparkles className="w-4 h-4 text-gupi-amber-300" />
              <span>{ar ? 'استجابة سريعة للطلبات الرسمية' : 'Rapid Response for Official Requests'}</span>
            </div>
          </div>
        </Reveal>

        {status === 'success' ? (
          <Reveal>
            <div className="bg-white rounded-3xl border border-gupi-ink-100 shadow-xl p-8 md:p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-green-100 border-4 border-green-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-display font-bold text-2xl text-gupi-ink-900 mb-3">
                {ar ? 'شكراً لتواصلكم مع مؤشر التواجد العالمي للجامعات (GUPI)' : 'Thank you for contacting GUPI'}
              </h3>
              <p className="text-gupi-ink-600 leading-relaxed mb-2">
                {ar
                  ? 'تم استقبال رسالتكم بنجاح، وتحويلها إلى القسم المختص.'
                  : 'Your message has been received and forwarded to the relevant department.'}
              </p>
              <p className="text-sm text-gupi-ink-400 leading-relaxed mb-8">
                {ar
                  ? 'سنقوم بالرد على استفساركم عبر البريد الإلكتروني المرفق خلال 2 إلى 4 أيام عمل.'
                  : 'We will reply to your inquiry via email within 2 to 4 business days.'}
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setForm({
                    name: '', jobTitle: '', email: '', phone: '',
                    university: '', country: '', website: '',
                    category: 'data_correction', subject: '', message: '',
                    consent: false, newsletter: false,
                  });
                }}
                className="px-8 py-3 rounded-xl bg-gupi-orange-700 text-white font-bold hover:bg-gupi-orange-800 transition-colors shadow-lg shadow-gupi-orange-700/20"
              >
                {ar ? 'إرسال طلب آخر' : 'Send another request'}
              </button>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Form Section 1: Sender & Organization */}
            <Reveal>
              <div className="bg-white rounded-3xl border border-gupi-ink-100 shadow-sm p-6 md:p-10 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gupi-orange-100 flex items-center justify-center text-gupi-orange-800 font-bold text-sm">1</div>
                    <h3 className="font-display font-bold text-xl text-gupi-ink-900">
                      {ar ? 'البيانات الشخصية والمؤسسية' : 'Personal & Institutional Details'}
                    </h3>
                  </div>
                  <p className="text-xs text-gupi-ink-400 mr-11">
                    {ar ? 'معلومات المُرسل والمؤسسة الأكاديمية' : 'Sender and academic institution information'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>
                      {ar ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder={ar ? 'أدخل اسمك الكامل' : 'Enter full name'}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {ar ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.jobTitle}
                      onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                      className={inputClass}
                      placeholder={ar ? 'مثال: عميد جودة، مدير تصنيفات، باحث...' : 'e.g. Quality Dean, Rankings Manager...'}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {ar ? 'البريد الإلكتروني الرسمي' : 'Official Email'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder={ar ? 'يُفضّل البريد المؤسسي/الجامعي' : 'Institutional email preferred'}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {ar ? 'رقم الهاتف/الواتساب' : 'Phone / WhatsApp'} <span className="text-gupi-ink-300 text-xs font-normal">({ar ? 'اختياري' : 'optional'})</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {ar ? 'اسم الجامعة / المؤسسة' : 'University / Institution'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.university}
                      onChange={(e) => setForm({ ...form, university: e.target.value })}
                      className={inputClass}
                      placeholder={ar ? 'أدخل اسم الجامعة أو المؤسسة' : 'University name'}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      {ar ? 'الدولة / المنطقة' : 'Country / Region'} <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">{ar ? 'اختر الدولة' : 'Select country'}</option>
                      {(ar ? ARAB_COUNTRIES : ARAB_COUNTRIES_EN).map((c, i) => (
                        <option key={i} value={ARAB_COUNTRIES[i]}>{ar ? c : ARAB_COUNTRIES_EN[i]}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      {ar ? 'الموقع الإلكتروني للجامعة' : 'University Website'} <span className="text-gupi-ink-300 text-xs font-normal">({ar ? 'اختياري' : 'optional'})</span>
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      className={inputClass}
                      placeholder="https://www.university.edu"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form Section 2: Category & Request */}
            <Reveal>
              <div className="bg-white rounded-3xl border border-gupi-ink-100 shadow-sm p-6 md:p-10 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gupi-orange-100 flex items-center justify-center text-gupi-orange-800 font-bold text-sm">2</div>
                    <h3 className="font-display font-bold text-xl text-gupi-ink-900">
                      {ar ? 'نوع الاستفسار وتفاصيل الرسالة' : 'Inquiry Category & Message Details'}
                    </h3>
                  </div>
                  <p className="text-xs text-gupi-ink-400 mr-11">
                    {ar ? 'حدد الموضوع واكتب تفاصيل الطلب مع إرفاق الوثائق إن وجدت' : 'Select category and provide full message details'}
                  </p>
                </div>

                {/* Category Selection Grid */}
                <div>
                  <label className={labelClass}>{ar ? 'غرض التواصل / نوع الاستفسار' : 'Inquiry Category'} <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const active = form.category === cat.value;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setForm({ ...form, category: cat.value })}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-start transition-all ${
                            active
                              ? 'border-gupi-orange-600 bg-gupi-orange-50/80 shadow-sm ring-1 ring-gupi-orange-600/20'
                              : 'border-gupi-ink-100 hover:border-gupi-orange-200 hover:bg-gupi-ink-50/50'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            active ? 'bg-gupi-orange-600 text-white' : 'bg-gupi-ink-100 text-gupi-ink-500'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`text-xs md:text-sm font-bold ${active ? 'text-gupi-orange-950' : 'text-gupi-ink-700'}`}>
                            {ar ? cat.ar : cat.en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Details */}
                <div className="space-y-5 pt-4 border-t border-gupi-ink-100">
                  <div>
                    <label className={labelClass}>{ar ? 'عنوان الرسالة (الموضوع)' : 'Subject'} <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} placeholder={ar ? 'موضوع الرسالة' : 'Message subject'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'نص الرسالة' : 'Message'} <span className="text-red-500">*</span></label>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none leading-relaxed`} placeholder={ar ? 'يرجى كتابة التفاصيل بوضوح مع ذكر اسم الجامعة وكود المرجع (إن وجد) لتسريع معالجة الطلب...' : 'Please provide clear details including university name and reference code (if any)...'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'إرفاق ملفات مدعمة (MOU / الوثائق الرسمية / بيانات إضافية)' : 'Attach Supporting Documents'} <span className="text-gupi-ink-300 text-xs font-normal">({ar ? 'اختياري' : 'optional'})</span></label>
                    <div className="border-2 border-dashed border-gupi-ink-200 rounded-2xl p-6 text-center hover:border-gupi-orange-400 transition-colors bg-gupi-ink-50/30 cursor-pointer">
                      <FileUp className="w-8 h-8 text-gupi-ink-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gupi-ink-700">
                        {ar ? 'PDF, DOCX, XLSX' : 'PDF, DOCX, XLSX'}
                      </p>
                      <p className="text-xs text-gupi-ink-400 mt-1">
                        {ar ? 'الحد الأقصى: 10 ميجابايت' : 'Maximum file size: 10MB'}
                      </p>
                      <input type="file" className="hidden" accept=".pdf,.docx,.xlsx" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form Section 3: Consent */}
            <Reveal>
              <div className="bg-white rounded-3xl border border-gupi-ink-100 shadow-sm p-6 md:p-8 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-gupi-ink-300 text-gupi-orange-600 focus:ring-gupi-orange-500"
                  />
                  <span className="text-sm text-gupi-ink-800 leading-relaxed font-medium">
                    {ar
                      ? 'أوافق على شروط الاستخدام وسياسة الخصوصية الخاصة بمؤشر التواجد العالمي للجامعات (GUPI).'
                      : 'I agree to the Terms of Use and Privacy Policy of the Global University Presence Index (GUPI).'}
                    <span className="text-red-500"> *</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.newsletter}
                    onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-gupi-ink-300 text-gupi-orange-600 focus:ring-gupi-orange-500"
                  />
                  <span className="text-sm text-gupi-ink-600 leading-relaxed">
                    {ar
                      ? 'أرغب في الاشتراك في النشرة البريدية لإحصائيات وتقارير المؤشر السنوية (اختياري).'
                      : 'I would like to subscribe to the newsletter for annual statistics and reports (optional).'}
                  </span>
                </label>
              </div>
            </Reveal>

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>{error || (ar ? 'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.' : 'An error occurred. Please try again.')}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-2 pb-12">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-r from-gupi-orange-800 to-gupi-orange-950 text-white font-bold text-lg hover:from-gupi-orange-700 hover:to-gupi-orange-900 transition-all disabled:opacity-60 shadow-xl shadow-gupi-orange-950/20"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>{ar ? 'جاري إرسال الطلب...' : 'Sending Request...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{ar ? 'إرسال الطلب' : 'Submit Request'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
