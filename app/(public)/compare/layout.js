const SITE_URL = 'https://gupi.topauniversity.com';

export const metadata = {
  title: 'مقارنة الجامعات العربية',
  description: 'قارن بين الجامعات العربية في التصنيفات الدولية QS وTHE وشنغهاي وويبومتركس. مقارنة شاملة للحضور الدولي والتميز الأكاديمي والبحث العلمي بين الجامعات.',
  keywords: [
    'مقارنة الجامعات العربية', 'مقارنة الجامعات السعودية', 'مقارنة الجامعات المصرية',
    'مقارنة تصنيف الجامعات', 'مقارنة تصنيف QS وTHE', 'الفرق بين QS وTHE',
    'الفرق بين QS وشنغهاي', 'مقارنة أداء الجامعات', 'أفضل جامعة عربية',
    'تصنيف الجامعات العربية', 'ترتيب الجامعات العربية',
  ],
  alternates: {
    canonical: `${SITE_URL}/compare`,
  },
  openGraph: {
    title: 'مقارنة الجامعات العربية | GUPI',
    description: 'قارن بين الجامعات العربية في التصنيفات الدولية QS وTHE وشنغهاي وويبومتركس.',
    url: `${SITE_URL}/compare`,
  },
};

export default function CompareLayout({ children }) {
  return children;
}
