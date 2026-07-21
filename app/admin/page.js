'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Shield, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'خطأ في تسجيل الدخول');
      }
    } catch {
      setError('حدث خطأ. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gupi-orange-500 to-gupi-orange-900 flex items-center justify-center text-white mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gupi-orange-900">لوحة الإدارة</h1>
            <p className="text-sm text-gupi-ink-500 mt-1">منصة GUPI — مؤشر الحضور العالمي للجامعات</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gupi-ink-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gupi-ink-400" />
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all"
                  placeholder="abulayeth@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gupi-ink-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gupi-ink-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gupi-ink-200 focus:border-gupi-orange-500 focus:ring-2 focus:ring-gupi-orange-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gupi-orange-600 to-gupi-orange-800 text-white font-bold hover:from-gupi-orange-700 hover:to-gupi-orange-900 transition-all disabled:opacity-50"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gupi-ink-400">
            <p>منصة GUPI — للإدارة فقط</p>
          </div>
        </div>
      </div>
    </div>
  );
}
