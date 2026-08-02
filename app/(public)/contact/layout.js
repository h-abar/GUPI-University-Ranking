const SITE_URL = 'https://gupi.topauniversity.com';

export const metadata = {
  title: 'اتصل بنا',
  description: 'تواصل مع منصة GUPI لتصنيف الجامعات العربية — استفسارات عامة، تصحيح بيانات الجامعات، شراكات وتعاون، استشارات تصنيف، استفسارات إعلامية، ودعم فني.',
  keywords: [
    'اتصل بنا', 'تواصل مع GUPI', 'استفسار تصنيف الجامعات',
    'تصحيح بيانات جامعة', 'شراكة جامعية', 'استشارات تصنيف',
    'تحسين تصنيف الجامعات', 'استفسار إعلامي', 'دعم فني',
    'contact GUPI', 'university ranking contact', 'ranking consulting',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'اتصل بنا | GUPI',
    description: 'تواصل مع منصة GUPI لتصنيف الجامعات العربية — استفسارات، شراكات، استشارات، ودعم فني.',
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({ children }) {
  return children;
}
