import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gupi-950 text-slate-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gupi-400 to-gupi-600 flex items-center justify-center text-white font-bold text-lg">
                G
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg">GUPI</div>
                <div className="text-xs text-slate-400">Global University Presence Index</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              مؤشر الحضور العالمي للجامعات - مؤشر رائد ومبتكر لقياس المنظومة الأكاديمية بأساليب جيل الذكاء الاصطناعي.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-gupi-400 transition-colors">الرئيسية</Link></li>
              <li><Link href="/rankings" className="hover:text-gupi-400 transition-colors">ترتيب الجامعات</Link></li>
              <li><Link href="/dashboard" className="hover:text-gupi-400 transition-colors">لوحة البيانات</Link></li>
              <li><Link href="/methodology" className="hover:text-gupi-400 transition-colors">منهجية المؤشر</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4">عن المؤشر</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              يمثل مؤشر GUPI نموذجًا مستقلًا ومبتكرًا لقياس الحضور العالمي للجامعات العربية، حيث يجمع بين النشاط البحثي والاعتراف الدولي والتميز الأكاديمي.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>© 2026 منصة نخبة الجامعات العربية | GUPI Index — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
