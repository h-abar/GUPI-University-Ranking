import './gupi-theme.css';
import './globals.css';

export const metadata = {
  title: 'GUPI | مؤشر الحضور العالمي للجامعات',
  description: 'مؤشر الحضور العالمي للجامعات (GUPI) - مؤشر رائد ومبتكر يهدف إلى قياس المنظومة الأكاديمية بأساليب جيل الذكاء الاصطناعي',
  keywords: 'GUPI, جامعات, تصنيف, مؤشر, حضور عالمي, جامعات عربية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="bg-gupi-bg text-gupi-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
