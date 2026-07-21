import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gupi-ink-950 text-gupi-ink-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="GUPI" className="w-10 h-10 rounded-gupi-md" />
              <div>
                <div className="font-display font-bold text-white text-lg">GUPI</div>
                <div className="text-xs text-gupi-ink-300">Global University Presence Index</div>
              </div>
            </div>
            <p className="text-sm text-gupi-ink-300 leading-relaxed">
              مؤشر الحضور العالمي للجامعات - مؤشر رائد ومبتكر لقياس المنظومة الأكاديمية بأساليب جيل الذكاء الاصطناعي.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-gupi-orange-400 transition-colors">الرئيسية</Link></li>
              <li><Link href="/rankings" className="hover:text-gupi-orange-400 transition-colors">ترتيب الجامعات</Link></li>
              <li><Link href="/dashboard" className="hover:text-gupi-orange-400 transition-colors">لوحة البيانات</Link></li>
              <li><Link href="/methodology" className="hover:text-gupi-orange-400 transition-colors">منهجية المؤشر</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4">عن المؤشر</h4>
            <p className="text-sm text-gupi-ink-300 leading-relaxed">
              يمثل مؤشر GUPI نموذجًا مستقلًا ومبتكرًا لقياس الحضور العالمي للجامعات العربية، حيث يجمع بين النشاط البحثي والاعتراف الدولي والتميز الأكاديمي.
            </p>
          </div>
        </div>

        <div className="border-t border-gupi-ink-800 mt-8 pt-8 text-center text-sm text-gupi-ink-400">
          <p>© 2026 منصة نخبة الجامعات العربية | GUPI Index — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
