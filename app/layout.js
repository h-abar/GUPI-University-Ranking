import './gupi-theme.css';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';

const SITE_URL = 'https://gupi.topauniversity.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GUPI | تصنيف الجامعات العربية والعالمية 2026',
    template: '%s | GUPI',
  },
  description: 'منصة GUPI (مؤشر الحضور الجامعي العالمي) — أول مؤشر عربي يقيس الحضور الدولي للجامعات العربية في التصنيفات العالمية مثل QS وTHE وشنغهاي وويبومتركس. قارن بين الجامعات واعرف ترتيب جامعتك عالمياً وعربياً.',
  keywords: [
    'تصنيف الجامعات العربية', 'تصنيف الجامعات العربية 2026', 'ترتيب الجامعات العربية',
    'أفضل الجامعات العربية', 'أفضل جامعة عربية', 'الجامعات العربية',
    'تصنيف الجامعات العالمية', 'ترتيب الجامعات العالمية', 'تصنيف الجامعات',
    'تصنيف الجامعات حسب الدولة', 'التصنيفات الجامعية العالمية', 'مؤشرات تصنيف الجامعات',
    'التصنيفات الدولية للجامعات', 'تصنيف التعليم العالي', 'تقييم الجامعات',
    'تصنيف QS العالمي', 'تصنيف QS 2026', 'تصنيف QS للجامعات العربية',
    'تصنيف التايمز', 'تصنيف THE', 'تصنيف Times Higher Education',
    'تصنيف شنغهاي', 'تصنيف ARWU', 'تصنيف ويبومتركس', 'Webometrics Ranking',
    'تصنيف US News', 'تصنيف CWUR', 'تصنيف Round University Ranking',
    'تصنيف GreenMetric', 'تصنيف الجامعات المستدامة',
    'السمعة الأكاديمية', 'جودة البحث العلمي', 'الإنتاج البحثي', 'الاستشهادات العلمية',
    'التعاون الدولي', 'الابتكار الجامعي', 'الاستدامة الجامعية',
    'مقارنة الجامعات العربية', 'مقارنة تصنيف الجامعات', 'مقارنة تصنيف QS وTHE',
    'أفضل جامعة في السعودية', 'أفضل جامعة في مصر', 'أفضل جامعة في الأردن',
    'أفضل جامعة في العراق', 'أفضل جامعة في الإمارات', 'أفضل جامعة في قطر',
    'أفضل جامعة في الكويت', 'أفضل جامعة في عمان', 'أفضل جامعة في المغرب',
    'كيف أعرف تصنيف الجامعة', 'هل الجامعة معترف بها', 'جامعة معترف بها عالمياً',
    'جامعات معتمدة', 'اعتماد الجامعات', 'الاعتراف بالجامعة',
    'ترتيب الجامعات العربية حسب QS', 'ترتيب الجامعات العربية حسب التايمز',
    'ترتيب الجامعات العربية حسب شنغهاي', 'معايير تصنيف QS', 'معايير تصنيف THE',
    'كيف يتم تصنيف الجامعات', 'ما هو أفضل تصنيف جامعي', 'الفرق بين QS وTHE',
    'تصنيف الجامعات السعودية 2026', 'تصنيف الجامعات المصرية 2026',
    'نتائج تصنيف QS 2026', 'نتائج تصنيف التايمز 2026',
    'تحسين تصنيف الجامعات', 'رفع تصنيف الجامعة', 'استشارات التصنيفات الدولية',
    'تحليل أداء الجامعات', 'مؤشرات الأداء الجامعي', 'قياس أداء الجامعات',
    'GUPI', 'Global University Presence Index', 'Arab university ranking',
    'best Arab universities', 'university ranking 2026', 'QS ranking Arab universities',
  ],
  authors: [{ name: 'GUPI' }],
  creator: 'GUPI',
  publisher: 'GUPI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ar': SITE_URL,
      'en': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'GUPI | تصنيف الجامعات العربية والعالمية',
    title: 'GUPI | تصنيف الجامعات العربية والعالمية 2026',
    description: 'منصة GUPI — أول مؤشر عربي يقيس الحضور الدولي للجامعات العربية في التصنيفات العالمية. قارن بين الجامعات واعرف ترتيب جامعتك.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'GUPI - Global University Presence Index',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUPI | تصنيف الجامعات العربية والعالمية 2026',
    description: 'منصة GUPI — أول مؤشر عربي يقيس الحضور الدولي للجامعات العربية في التصنيفات العالمية.',
    images: ['/logo.png'],
  },
  category: 'Education',
};

export const viewport = {
  themeColor: '#7c2d12',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'GUPI - Global University Presence Index',
    alternateName: 'مؤشر الحضور الجامعي العالمي',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'منصة GUPI — أول مؤشر عربي يقيس الحضور الدولي للجامعات العربية في التصنيفات العالمية مثل QS وTHE وشنغهاي وويبومتركس.',
    sameAs: [
      'https://twitter.com/gupi_ranking',
      'https://www.linkedin.com/company/gupi-ranking',
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gupi-bg text-gupi-ink-900 antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
