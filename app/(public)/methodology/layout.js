const SITE_URL = 'https://gupi.topauniversity.com';

export const metadata = {
  title: 'منهجية تصنيف GUPI',
  description: 'منهجية مؤشر الحضور الجامعي العالمي GUPI — كيف يتم تصنيف الجامعات العربية؟ تعرف على معايير تصنيف QS وTHE وشنغهاي وويبومتركس وكيفية احتساب مؤشرات الحضور والتميز.',
  keywords: [
    'كيف يتم تصنيف الجامعات', 'معايير تصنيف QS', 'معايير تصنيف THE',
    'معايير تصنيف شنغهاي', 'ما هو تصنيف QS', 'ما هو تصنيف التايمز',
    'ما هو تصنيف شنغهاي', 'ما هو ويبومتركس', 'ما هو أفضل تصنيف جامعي',
    'الفرق بين QS وTHE', 'الفرق بين QS وشنغهاي', 'كيف يتم احتساب تصنيف الجامعات',
    'مؤشرات تصنيف الجامعات', 'منهجية التصنيف الجامعي', 'معايير التصنيفات الدولية',
  ],
  alternates: {
    canonical: `${SITE_URL}/methodology`,
  },
  openGraph: {
    title: 'منهجية تصنيف GUPI | كيف يتم تصنيف الجامعات',
    description: 'تعرف على منهجية مؤشر GUPI ومعايير التصنيفات الدولية QS وTHE وشنغهاي وويبومتركس.',
    url: `${SITE_URL}/methodology`,
  },
};

export default function MethodologyLayout({ children }) {
  return children;
}
