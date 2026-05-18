'use client';

import { Suspense } from 'react';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';

// Statik prerender'ı devre dışı bırak (useSearchParams için zorunlu)
export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-terracotta)]" />
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Bir hata oluştu.');
        setPassword('');
        return;
      }

      router.replace(from);
    } catch {
      setError('Sunucuya bağlanılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4">
      {/* Arka plan dokusu */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/hero_knitting_background_1769259829839.png')",
          backgroundSize: 'cover',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Kart */}
        <div className="bg-white rounded-3xl shadow-lg border border-[var(--border-light)] overflow-hidden">
          {/* Üst bant */}
          <div className="h-2 w-full bg-[var(--accent-terracotta)]" />

          <div className="px-8 py-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md mb-4">
                <Image
                  src="/images/logo.png"
                  alt="ÖRGÜHOME"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                ÖRGÜHOME
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">Sipariş Yönetim Paneli</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                  Yönetici Şifresi
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-4 h-4 text-[var(--text-muted)]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="Şifrenizi girin"
                    autoComplete="current-password"
                    autoFocus
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-base focus:outline-none focus:border-[var(--accent-terracotta)] focus:bg-white transition-all placeholder:text-[var(--text-muted)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Hata mesajı */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  <span>⚠️</span>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Giriş butonu */}
              <motion.button
                type="submit"
                disabled={loading || !password.trim()}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--accent-terracotta)' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Giriş Yap
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Alt not */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-4">
          Bu panel yalnızca yetkili kullanıcılara açıktır.
        </p>
      </motion.div>
    </div>
  );
}
