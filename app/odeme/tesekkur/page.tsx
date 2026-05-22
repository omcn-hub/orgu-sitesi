'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight, Home, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-32 lg:py-40">
        <div className="max-w-xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--bg-secondary)] text-center relative overflow-hidden"
          >
            {/* Dekoratif Arka Plan Efekti */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent-terracotta)]/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />

            {/* Başarı İkonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-100"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </motion.div>

            {/* Başlık ve Açıklama */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> PayTR Güvenli Ödeme Başarılı
            </span>

            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
              Siparişiniz Başarıyla Alındı!
            </h1>
            
            <p className="text-[var(--text-secondary)] text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Özel tasarım siparişiniz ve ödemeniz güvenle alındı. Örme ustalarımız hemen hazırlıklara başlayacak. Sipariş ayrıntıları ve kargo takip kodunuz e-posta adresinize iletilecektir.
            </p>

            {/* Bilgilendirme Kutusu */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-5 mb-8 text-left border border-[var(--bg-primary)]">
              <h3 className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">
                Sıradaki Adımlar
              </h3>
              <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex-shrink-0 flex items-center justify-center font-bold">1</span>
                  <span>Siparişiniz atölyemizde kuyruğa alındı ve örme işlemi başlıyor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex-shrink-0 flex items-center justify-center font-bold">2</span>
                  <span>Ürününüz tamamlandığında son kalite kontrolleri yapılıp özenle paketlenir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex-shrink-0 flex items-center justify-center font-bold">3</span>
                  <span>Kargoya verildiğinde takip numarası içeren SMS/E-posta tarafınıza gönderilir.</span>
                </li>
              </ul>
            </div>

            {/* Yönlendirme Butonları */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="w-full sm:w-auto">
                <button className="w-full px-6 py-3 rounded-xl border border-[var(--text-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium text-sm transition-all flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" /> Ana Sayfa
                </button>
              </Link>
              <Link href="/custom-builder" className="w-full sm:w-auto">
                <button className="w-full px-6 py-3 rounded-xl bg-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta)]/90 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm shadow-[var(--accent-terracotta)]/10">
                  <ShoppingBag className="w-4 h-4" /> Yeni Tasarım Yap <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
