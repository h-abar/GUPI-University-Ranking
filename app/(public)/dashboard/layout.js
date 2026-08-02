const SITE_URL = 'https://gupi.topauniversity.com';

export const metadata = {
  title: 'لوحة بيانات تصنيف الجامعات',
  description: 'لوحة بيانات تحليلية شاملة لتصنيف الجامعات العربية — إحصائيات وتوزيع الدول ومتوسطات الأداء ومؤشرات الحضور الدولي والتميز الأكاديمي.',
  keywords: [
    'تحليل أداء الجامعات', 'مؤشرات الأداء الجامعي', 'قياس أداء الجامعات',
    'إحصائيات الجامعات العربية', 'توزيع الجامعات العربية', 'تصنيف الجامعات العربية',
    'مؤشرات تصنيف الجامعات', 'التصنيفات الدولية للجامعات', 'تحليل التصنيفات العالمية',
  ],
  alternates: {
    canonical: `${SITE_URL}/dashboard`,
  },
  openGraph: {
    title: 'لوحة بيانات تصنيف الجامعات | GUPI',
    description: 'لوحة بيانات تحليلية شاملة لتصنيف الجامعات العربية — إحصائيات ومؤشرات الأداء.',
    url: `${SITE_URL}/dashboard`,
  },
};

export default function DashboardLayout({ children }) {
  return children;
}
