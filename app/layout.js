import './gupi-theme.css';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';

export const metadata = {
  title: 'GUPI | Global University Presence Index',
  description: 'Global University Presence Index (GUPI) — a pioneering index measuring the international presence of Arab universities',
  keywords: 'GUPI, universities, ranking, index, global presence, Arab universities',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="bg-gupi-bg text-gupi-ink-900 antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
