'use client';

import { useState } from 'react';
import {
  Mail, Send, MessageSquare, Building2,
  Newspaper, Wrench, GraduationCap, Handshake, Loader2,
  CheckCircle2, AlertCircle, Clock, FileText, MapPin,
  Briefcase, ClipboardCheck, FileUp, Globe
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
    { value: 'data_correction', color: 'green', icon: ClipboardCheck, ar: 'طلب مراجعة/تحديث بيانات جامعة', en: 'University Data Review/Update' },
    { value: 'methodology', color: 'blue', icon: FileText, ar: 'استفسار حول معايير ومنهجية التقييم', en: 'Methodology & Criteria Inquiry' },
    { value: 'partnership', color: 'amber', icon: Handshake, ar: 'طلب شراكة أفقية / استشارية', en: 'Partnership / Consulting Request' },
    { value: 'reports', color: 'purple', icon: GraduationCap, ar: 'طلب تقارير تحليلية مخصصة', en: 'Custom Analytical Reports' },
    { value: 'media', color: 'orange', icon: Newspaper, ar: 'استفسار إعلامي / صحفي', en: 'Media / Press Inquiry' },
    { value: 'technical', color: 'gray', icon: Wrench, ar: 'الدعم الفني أو بلاغ عن مشكلة', en: 'Technical Support / Bug Report' },
    { value: 'general', color: 'slate', icon: MessageSquare, ar: 'اقتراحات واستفسارات عامة', en: 'General Suggestions & Inquiries' },
  ];

  const colorMap = {
    green: 'bg-green-500', blue: 'bg-blue-500', amber: 'bg-amber-500',
    purple: 'bg-purple-500', orange: 'bg-orange-500', gray: 'bg-gray-400', slate: 'bg-slate-500',
  };

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

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all text-gupi-ink-900 text-sm";
  const labelClass = "block text-sm font-semibold text-gupi-ink-700 mb-1.5";

  return (
    <>
      <PageHero
        icon={Mail}
        eyebrow={ar ? 'GUPI • تواصل معنا' : 'GUPI • Contact Us'}
        title={ar ? 'تواصل مع فريق مؤشر التواجد العالمي للجامعات' : 'Contact the GUPI Team'}
        subtitle={ar
          ? 'نرحب باستفساراتكم، اقتراحاتكم، وطلبات التعاون مع إدارة المؤشر. يرجى تعبئة النموذج أدناه، وسيقوم الفريق المختص بالتواصل معكم في أقرب وقت ممكن.'
          : 'We welcome your inquiries, suggestions, and collaboration requests. Please fill out the form below and our team will get back to you as soon as possible.'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Reveal>
            <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-gupi-orange-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-gupi-orange-700" />
              </div>
              <h3 className="font-bold text-gupi-ink-900 mb-1">{ar ? 'البريد الإلكتروني' : 'Email'}</h3>
              <a href="mailto:gupi@topauniversity.com" className="text-gupi-orange-600 hover:text-gupi-orange-700 transition-colors text-sm font-medium">
                gupi@topauniversity.com
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-gupi-amber-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-gupi-amber-700" />
              </div>
              <h3 className="font-bold text-gupi-ink-900 mb-1">{ar ? 'ساعات العمل' : 'Working Hours'}</h3>
              <p className="text-sm text-gupi-ink-500">{ar ? 'الأحد - الخميس' : 'Sunday - Thursday'}</p>
              <p className="text-sm text-gupi-ink-500">{ar ? '9:00 ص - 5:00 م' : '9:00 AM - 5:00 PM'}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="font-bold text-gupi-ink-900 mb-1">{ar ? 'المقر' : 'Headquarters'}</h3>
              <p className="text-sm text-gupi-ink-500">{ar ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</p>
            </div>
          </Reveal>
        </div>

        {status === 'success' ? (
          <Reveal>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-8 md:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-display font-bold text-xl text-gupi-ink-900 mb-3">
                {ar ? 'شكراً لتواصلكم مع مؤشر التواجد العالمي للجامعات (GUPI)' : 'Thank you for contacting GUPI'}
              </h3>
              <p className="text-gupi-ink-500 leading-relaxed mb-2">
                {ar ? 'تم استقبال رسالتكم بنجاح، وتحويلها إلى القسم المختص.' : 'Your message has been received and forwarded to the relevant department.'}
              </p>
              <p className="text-gupi-ink-500 leading-relaxed mb-6">
                {ar ? 'سنقوم بالرد على استفساركم عبر البريد الإلكتروني المرفق خلال 2 إلى 4 أيام عمل.' : 'We will reply to your inquiry via email within 2 to 4 business days.'}
              </p>
              <button
                onClick={() => { setStatus('idle'); setForm({ name: '', jobTitle: '', email: '', phone: '', university: '', country: '', website: '', category: 'data_correction', subject: '', message: '', consent: false, newsletter: false }); }}
                className="px-6 py-2.5 rounded-xl bg-gupi-orange-600 text-white font-medium hover:bg-gupi-orange-700 transition-colors"
              >
                {ar ? 'إرسال طلب آخر' : 'Send another request'}
              </button>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">

            {/* Section A: Personal Information */}
            <Reveal>
              <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gupi-orange-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-gupi-orange-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gupi-orange-900">
                      {ar ? 'البيانات الشخصية ومُرسِل الطلب' : 'Personal Information'}
                    </h3>
                    <p className="text-xs text-gupi-ink-400">{ar ? 'معلومات المُرسل' : 'Sender details'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>{ar ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder={ar ? 'أدخل اسمك الكامل' : 'Enter your full name'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} className={inputClass} placeholder={ar ? 'مثال: عميد جودة، مدير تصنيفات، باحث، صحفي...' : 'e.g. Quality Dean, Rankings Manager, Researcher...'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'البريد الإلكتروني الرسمي' : 'Official Email'} <span className="text-red-500">*</span></label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder={ar ? 'يُفضّل البريد المؤسسي/الجامعي' : 'Institutional email preferred'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'رقم الهاتف/الواتساب' : 'Phone / WhatsApp'} <span className="text-gupi-ink-300 text-xs">({ar ? 'اختياري' : 'optional'})</span></label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+966 5X XXX XXXX" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Section B: Organization Details */}
            <Reveal>
              <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gupi-amber-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gupi-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gupi-orange-900">
                      {ar ? 'بيانات المؤسسة / الجامعة' : 'Organization / University Details'}
                    </h3>
                    <p className="text-xs text-gupi-ink-400">{ar ? 'معلومات المؤسسة' : 'Institution info'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>{ar ? 'اسم الجامعة / المؤسسة' : 'University / Institution Name'} <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} className={inputClass} placeholder={ar ? 'اسم الجامعة' : 'University name'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'الدولة / المنطقة' : 'Country / Region'} <span className="text-red-500">*</span></label>
                    <select required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass}>
                      <option value="">{ar ? 'اختر الدولة' : 'Select country'}</option>
                      {(ar ? ARAB_COUNTRIES : ARAB_COUNTRIES_EN).map((c, i) => (
                        <option key={i} value={ARAB_COUNTRIES[i]}>{ar ? c : ARAB_COUNTRIES_EN[i]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>{ar ? 'الموقع الإلكتروني للجامعة' : 'University Website'} <span className="text-gupi-ink-300 text-xs">({ar ? 'اختياري' : 'optional'})</span></label>
                    <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="https://www.university.edu" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Section C: Inquiry Category */}
            <Reveal>
              <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gupi-orange-900">
                      {ar ? 'تصنيف الاستفسار' : 'Inquiry Category'}
                    </h3>
                    <p className="text-xs text-gupi-ink-400">{ar ? 'حدد غرض التواصل' : 'Select your inquiry type'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const active = form.category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setForm({ ...form, category: cat.value })}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-start transition-all ${
                          active ? 'border-gupi-orange-500 bg-gupi-orange-50' : 'border-gupi-ink-100 hover:border-gupi-orange-200'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${colorMap[cat.color]}`} />
                        <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-gupi-orange-600' : 'text-gupi-ink-400'}`} />
                        <span className={`text-sm font-medium ${active ? 'text-gupi-orange-800' : 'text-gupi-ink-600'}`}>
                          {ar ? cat.ar : cat.en}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Section D: Message Details */}
            <Reveal>
              <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gupi-orange-900">
                      {ar ? 'تفاصيل الرسالة' : 'Message Details'}
                    </h3>
                    <p className="text-xs text-gupi-ink-400">{ar ? 'اكتب تفاصيل طلبك' : 'Write your request details'}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>{ar ? 'عنوان الرسالة (الموضوع)' : 'Subject'} <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} placeholder={ar ? 'موضوع الرسالة' : 'Message subject'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'نص الرسالة' : 'Message'} <span className="text-red-500">*</span></label>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} placeholder={ar ? 'يرجى كتابة التفاصيل بوضوح مع ذكر اسم الجامعة وكود المرجع (إن وجد) لتسريع معالجة الطلب...' : 'Please provide clear details including university name and reference code (if any)...'} />
                  </div>
                  <div>
                    <label className={labelClass}>{ar ? 'إرفاق ملفات مدعمة' : 'Supporting Documents'} <span className="text-gupi-ink-300 text-xs">({ar ? 'اختياري' : 'optional'})</span></label>
                    <div className="border-2 border-dashed border-gupi-ink-200 rounded-xl p-6 text-center hover:border-gupi-orange-300 transition-colors cursor-pointer">
                      <FileUp className="w-8 h-8 text-gupi-ink-300 mx-auto mb-2" />
                      <p className="text-sm text-gupi-ink-400">
                        {ar ? 'PDF, DOCX, XLSX — الحد الأقصى 10 ميجابايت' : 'PDF, DOCX, XLSX — Max 10MB'}
                      </p>
                      <input type="file" className="hidden" accept=".pdf,.docx,.xlsx" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Section E: Consent & Security */}
            <Reveal>
              <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded border-gupi-ink-300 text-gupi-orange-600 focus:ring-gupi-orange-500"
                    />
                    <span className="text-sm text-gupi-ink-700 leading-relaxed">
                      {ar
                        ? 'أوافق على شروط الاستخدام وسياسة الخصوصية الخاصة بمؤشر التواجد العالمي للجامعات.'
                        : 'I agree to the Terms of Use and Privacy Policy of the Global University Presence Index.'}
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
                    <span className="text-sm text-gupi-ink-700 leading-relaxed">
                      {ar
                        ? 'أرغب في الاشتراك في النشرة البريدية لإحصائيات وتقارير المؤشر السنوية.'
                        : 'I would like to subscribe to the newsletter for annual statistics and reports.'}
                    </span>
                  </label>
                </div>
              </div>
            </Reveal>

            {/* Error */}
            {status === 'error' && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error || (ar ? 'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.' : 'An error occurred. Please try again.')}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-center pb-8">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-gradient-to-r from-gupi-orange-600 to-gupi-orange-800 text-white font-bold text-lg hover:from-gupi-orange-700 hover:to-gupi-orange-900 transition-all disabled:opacity-60 shadow-lg shadow-gupi-orange-600/20"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {ar ? 'جاري الإرسال...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {ar ? 'إرسال الطلب' : 'Submit Request'}
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
