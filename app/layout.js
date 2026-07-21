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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
