'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentErrorPage() {
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
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--accent-terracotta)]/5 rounded-full blur-2xl" />

            {/* Hata İkonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-100"
            >
              <AlertCircle className="w-10 h-10 text-rose-600" />
            </motion.div>

            {/* Başlık ve Açıklama */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100 mb-4">
              Ödeme İşlemi Başarısız
            </span>

            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
              Ödeme Alınamadı
            </h1>
            
            <p className="text-[var(--text-secondary)] text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto">
              İşlem banka tarafından reddedilmiş veya limit yetersizliği gibi teknik bir nedenden ötürü yarıda kalmış olabilir. Lütfen kart bilgilerinizi kontrol ederek tekrar deneyin.
            </p>

            {/* Olası Nedenler Kutusu */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-5 mb-8 text-left border border-[var(--bg-primary)]">
              <h3 className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">
                Olası Çözümler
              </h3>
              <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span>Kartınızın internet alışverişlerine ve 3D Secure ödemeye açık olduğundan emin olun.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span>Kart bakiyenizin veya limitinizin yeterli olduğunu kontrol edin.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span>Bilgileri doğru girdiğinizden emin olup tekrar denemeyi deneyin.</span>
                </li>
              </ul>
            </div>

            {/* Yönlendirme Butonları */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/custom-builder" className="w-full sm:w-auto">
                <button className="w-full px-6 py-3 rounded-xl bg-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta)]/90 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm shadow-[var(--accent-terracotta)]/10">
                  <RefreshCw className="w-4 h-4 animate-spin-slow" /> Tekrar Dene
                </button>
              </Link>
              <a 
                href="https://wa.me/905000000000" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto"
              >
                <button className="w-full px-6 py-3 rounded-xl border border-emerald-600 hover:bg-emerald-50 text-emerald-700 font-medium text-sm transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Destek
                </button>
              </a>
            </div>

            <div className="mt-6">
              <Link href="/" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Ana Sayfaya Dön
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
