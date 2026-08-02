const SITE_URL = 'https://gupi.topauniversity.com';

export const metadata = {
  title: 'بطاقة الجامعة',
  description: 'بطاقة تفصيلية للجامعة — تصنيفات دولية، حضور أكاديمي، تميز بحثي، ومؤشرات أداء شاملة للجامعات العربية في التصنيفات العالمية.',
  keywords: [
    'تصنيف الجامعات', 'ترتيب الجامعات العربية', 'بطاقة جامعة',
    'تصنيف QS', 'تصنيف THE', 'تصنيف شنغهاي', 'تصنيف ويبومتركس',
    'أفضل الجامعات العربية', 'تقييم الجامعات', 'التصنيفات الدولية للجامعات',
  ],
  alternates: {
    canonical: `${SITE_URL}/universities`,
  },
  openGraph: {
    title: 'بطاقة الجامعة | GUPI',
    description: 'بطاقة تفصيلية للجامعة — تصنيفات دولية ومؤشرات أداء شاملة.',
    url: `${SITE_URL}/universities`,
  },
};

export default function UniversityLayout({ children }) {
  return children;
}
