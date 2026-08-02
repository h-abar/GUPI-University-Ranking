'use client';

import { useState } from 'react';
import {
  Mail, Phone, MapPin, Send, MessageSquare, Building2,
  Newspaper, Wrench, GraduationCap, Handshake, Loader2,
  CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/home/Reveal';
import { useLang } from '@/lib/LanguageContext';

export default function ContactPage() {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', subject: '', category: 'general', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const categories = [
    { value: 'general', icon: MessageSquare, ar: 'استفسار عام', en: 'General Inquiry', arDesc: 'أسئلة عامة حول المنصة والتصنيف', enDesc: 'General questions about the platform' },
    { value: 'data_correction', icon: Building2, ar: 'تصحيح بيانات جامعة', en: 'University Data Correction', arDesc: 'الإبلاغ عن خطأ أو تحديث بيانات جامعة', enDesc: 'Report errors or update university data' },
    { value: 'partnership', icon: Handshake, ar: 'شراكة وتعاون', en: 'Partnership & Collaboration', arDesc: 'فرص التعاون الأكاديمي والمؤسسي', enDesc: 'Academic and institutional collaboration' },
    { value: 'media', icon: Newspaper, ar: 'استفسار إعلامي', en: 'Media Inquiry', arDesc: 'طلبات الصحافة والإعلام', enDesc: 'Press and media requests' },
    { value: 'consulting', icon: GraduationCap, ar: 'استشارات تصنيف', en: 'Ranking Consulting', arDesc: 'استشارات لتحسين تصنيف الجامعات', enDesc: 'Consulting to improve university rankings' },
    { value: 'technical', icon: Wrench, ar: 'دعم فني', en: 'Technical Support', arDesc: 'مشاكل تقنية في المنصة', enDesc: 'Technical issues with the platform' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setForm({ name: '', email: '', subject: '', category: 'general', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const ar = lang === 'ar';

  return (
    <>
      <PageHero
        icon={Mail}
        eyebrow={ar ? 'GUPI • تواصل معنا' : 'GUPI • Contact Us'}
        title={ar ? 'اتصل بنا' : 'Contact Us'}
        subtitle={ar
          ? 'نحن هنا للإجابة على استفساراتكم وتلقي مقترحاتكم — تواصل مع فريق منصة GUPI لتصنيف الجامعات العربية'
          : 'We are here to answer your questions and receive your suggestions — reach out to the GUPI team'}
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
              <p className="text-sm text-gupi-ink-500">
                {ar ? 'الأحد - الخميس' : 'Sunday - Thursday'}
              </p>
              <p className="text-sm text-gupi-ink-500">
                {ar ? '9:00 ص - 5:00 م' : '9:00 AM - 5:00 PM'}
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="font-bold text-gupi-ink-900 mb-1">{ar ? 'المقر' : 'Headquarters'}</h3>
              <p className="text-sm text-gupi-ink-500">
                {ar ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <Reveal>
              <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 sticky top-24">
                <h3 className="font-display font-bold text-lg text-gupi-orange-900 mb-4">
                  {ar ? 'مواضيع التواصل' : 'Contact Topics'}
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const active = form.category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setForm({ ...form, category: cat.value })}
                        className={`w-full text-start p-3 rounded-xl border transition-all ${
                          active
                            ? 'border-gupi-orange-500 bg-gupi-orange-50'
                            : 'border-gupi-ink-100 hover:border-gupi-orange-200 hover:bg-gupi-orange-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            active ? 'bg-gupi-orange-600 text-white' : 'bg-gupi-ink-100 text-gupi-ink-500'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-gupi-ink-900">
                              {ar ? cat.ar : cat.en}
                            </div>
                            <div className="text-xs text-gupi-ink-400 mt-0.5">
                              {ar ? cat.arDesc : cat.enDesc}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="bg-white rounded-2xl border border-gupi-ink-100 shadow-sm p-6 md:p-8">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-gupi-ink-900 mb-2">
                      {ar ? 'تم إرسال رسالتك بنجاح' : 'Your message was sent successfully'}
                    </h3>
                    <p className="text-gupi-ink-500 mb-6">
                      {ar
                        ? 'سنقوم بالرد على بريدك الإلكتروني في أقرب وقت ممكن'
                        : 'We will reply to your email as soon as possible'}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded-xl bg-gupi-orange-600 text-white font-medium hover:bg-gupi-orange-700 transition-colors"
                    >
                      {ar ? 'إرسال رسالة أخرى' : 'Send another message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gupi-ink-700 mb-1.5">
                          {ar ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all text-gupi-ink-900"
                          placeholder={ar ? 'أدخل اسمك' : 'Enter your name'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gupi-ink-700 mb-1.5">
                          {ar ? 'البريد الإلكتروني' : 'Email'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all text-gupi-ink-900"
                          placeholder={ar ? 'example@email.com' : 'example@email.com'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gupi-ink-700 mb-1.5">
                        {ar ? 'الموضوع' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all text-gupi-ink-900"
                        placeholder={ar ? 'موضوع الرسالة' : 'Message subject'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gupi-ink-700 mb-1.5">
                        {ar ? 'نوع التواصل' : 'Contact Type'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => {
                          const Icon = cat.icon;
                          const active = form.category === cat.value;
                          return (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => setForm({ ...form, category: cat.value })}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                active
                                  ? 'border-gupi-orange-500 bg-gupi-orange-50 text-gupi-orange-700'
                                  : 'border-gupi-ink-200 text-gupi-ink-500 hover:border-gupi-orange-300'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {ar ? cat.ar : cat.en}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gupi-ink-700 mb-1.5">
                        {ar ? 'الرسالة' : 'Message'} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all text-gupi-ink-900 resize-none"
                        placeholder={ar ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {ar ? 'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.' : 'An error occurred while sending. Please try again.'}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gupi-orange-600 to-gupi-orange-800 text-white font-bold hover:from-gupi-orange-700 hover:to-gupi-orange-900 transition-all disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {ar ? 'جاري الإرسال...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {ar ? 'إرسال الرسالة' : 'Send Message'}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
