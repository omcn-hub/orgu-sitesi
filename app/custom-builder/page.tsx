'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Shield, Lock, CreditCard, Package } from 'lucide-react';

import CustomProductBuilder from '@/components/CustomProductBuilder';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  CustomProduct,
  INITIAL_STATE,
  SIZE_SURCHARGE_THRESHOLD,
  SIZE_SURCHARGE_AMOUNT,
  INSCRIPTION_SURCHARGE,
} from '@/lib/customProductTypes';

// ─────────────────────────────────────────────────────────────
// Ürün tanımı — buradan baz fiyat ve görsel belirlenir
// ─────────────────────────────────────────────────────────────
const PRODUCT_CONFIG = {
  id: 'CUSTOM-CORAP-001',
  name: 'El Yapımı Özel Tasarım Örgü Çorap',
  basePrice: 500,
  image: '/images/kahverengi-patik.png', // Geçici olarak kahverengi patik resmi atandı
  description: 'Seçtiğin renk, numara ve kişisel dokunuşla senin için üretilir.',
};

// ─────────────────────────────────────────────────────────────
// PayTR Modal — mevcut PaymentModal yerine inline tutuldu
// ─────────────────────────────────────────────────────────────
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  isLoading: boolean;
  errorMsg: string;
  onRetry: () => void;
}

function PaymentModal({ isOpen, onClose, token, isLoading, errorMsg, onRetry }: PaymentModalProps) {
  // ESC ile kapat
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Scroll kilidi
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full sm:max-w-xl bg-[var(--bg-primary)] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '95dvh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[var(--accent-terracotta)]/10 rounded-lg">
                  <CreditCard className="w-4 h-4 text-[var(--accent-terracotta)]" />
                </div>
                <span className="font-semibold text-[var(--text-primary)]">Güvenli Ödeme</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-muted)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* İçerik */}
            <div className="flex-1 overflow-hidden">
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 rounded-full border-[3px] border-[var(--border-light)] border-t-[var(--accent-terracotta)] animate-spin" />
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Ödeme formu hazırlanıyor...</p>
                </div>
              )}
              {!isLoading && errorMsg && (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                    <X className="w-7 h-7 text-red-400" />
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{errorMsg}</p>
                  <button onClick={onRetry} className="btn-primary px-8 py-3 text-sm">Tekrar Dene</button>
                </div>
              )}
              {!isLoading && token && (
                <iframe
                  src={`https://www.paytr.com/odeme/guvenli/${token}`}
                  className="w-full border-none"
                  style={{ height: 520 }}
                  title="PayTR Güvenli Ödeme"
                  allow="payment"
                />
              )}
            </div>

            {/* Footer trust */}
            <div className="px-6 py-3 border-t border-[var(--border-light)] bg-[var(--bg-secondary)]/50">
              <div className="flex items-center justify-center gap-5 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" />256-bit SSL</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-medium)]" />
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />PayTR Güvencesi</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-medium)]" />
                <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" />3D Secure</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// Sipariş Özeti Paneli — Sağ sidebar
// ─────────────────────────────────────────────────────────────
function OrderSummary({ product }: { product: CustomProduct }) {
  const hasColor = product.selectedColor !== null;
  const hasSize = product.selectedSize !== null;
  const sizeExtra = hasSize && product.selectedSize! >= SIZE_SURCHARGE_THRESHOLD ? SIZE_SURCHARGE_AMOUNT : 0;
  const inscExtra = product.extraDetails.hasInscription ? INSCRIPTION_SURCHARGE : 0;

  return (
    <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-3xl p-6 shadow-sm sticky top-28">
      {/* Ürün görseli */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-secondary)] mb-5">
        <Image
          src={PRODUCT_CONFIG.image}
          alt={PRODUCT_CONFIG.name}
          fill
          className="object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Renk overlay — seçilen rengi küçük bir rozet olarak göster */}
        {hasColor && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
            <div className="w-4 h-4 rounded-full border border-[var(--border-light)]" style={{ backgroundColor: product.selectedColor!.hex }} />
            <span className="text-xs font-medium text-[var(--text-primary)]">{product.selectedColor!.label}</span>
          </div>
        )}
      </div>

      <h3 className="font-heading font-bold text-base text-[var(--text-primary)] mb-1">{PRODUCT_CONFIG.name}</h3>
      <p className="text-xs text-[var(--text-muted)] mb-5">{PRODUCT_CONFIG.description}</p>

      {/* Fiyat dökümü */}
      <div className="space-y-2.5 border-t border-[var(--border-light)] pt-4">
        <div className="flex justify-between text-sm text-[var(--text-secondary)]">
          <span>Baz Fiyat</span>
          <span>{PRODUCT_CONFIG.basePrice.toLocaleString('tr-TR')}₺</span>
        </div>
        {sizeExtra > 0 && (
          <div className="flex justify-between text-sm text-[var(--text-secondary)]">
            <span>Büyük Numara Eki</span>
            <span className="text-[var(--accent-terracotta)]">+{sizeExtra}₺</span>
          </div>
        )}
        {inscExtra > 0 && (
          <div className="flex justify-between text-sm text-[var(--text-secondary)]">
            <span>Kişiselleştirme</span>
            <span className="text-[var(--accent-terracotta)]">+{inscExtra}₺</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-3 border-t border-[var(--border-light)]">
          <span className="font-bold text-[var(--text-primary)]">Toplam</span>
          <span className="text-2xl font-bold text-[var(--accent-terracotta)]">
            {product.totalPrice.toLocaleString('tr-TR')}₺
          </span>
        </div>
      </div>

      {/* Seçimler özeti */}
      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Seçimleriniz</p>
        <div className={`flex items-center gap-2 text-sm ${hasColor ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
          <Package className="w-3.5 h-3.5 flex-shrink-0" />
          {hasColor ? `Renk: ${product.selectedColor!.label}` : 'Renk seçilmedi'}
        </div>
        <div className={`flex items-center gap-2 text-sm ${hasSize ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
          <Package className="w-3.5 h-3.5 flex-shrink-0" />
          {hasSize ? `Numara: ${product.selectedSize}` : 'Numara seçilmedi'}
        </div>
        <div className={`flex items-center gap-2 text-sm ${product.extraDetails.hasInscription ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
          <Package className="w-3.5 h-3.5 flex-shrink-0" />
          {product.extraDetails.hasInscription
            ? `İşleme: "${product.extraDetails.text || '—'}"`
            : 'Kişiselleştirme yok'}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Ana Sayfa Bileşeni
// ─────────────────────────────────────────────────────────────
export default function CustomBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [product, setProduct] = useState<CustomProduct>({
    ...INITIAL_STATE,
    productId: PRODUCT_CONFIG.id,
    basePrice: PRODUCT_CONFIG.basePrice,
    totalPrice: PRODUCT_CONFIG.basePrice,
  });

  // ── Canlı Fiyat Hesaplama ──
  useEffect(() => {
    const sizeExtra =
      product.selectedSize && product.selectedSize >= SIZE_SURCHARGE_THRESHOLD
        ? SIZE_SURCHARGE_AMOUNT
        : 0;
    const inscExtra = product.extraDetails.hasInscription ? INSCRIPTION_SURCHARGE : 0;
    const total = product.basePrice + sizeExtra + inscExtra;

    // Sonsuz döngüyü önlemek için sadece değer değiştiyse güncelle
    if (total !== product.totalPrice) {
      setProduct((prev) => ({ ...prev, totalPrice: total }));
    }
  }, [
    product.selectedSize,
    product.extraDetails.hasInscription,
    product.basePrice,
    product.totalPrice,
  ]);

  // ── PayTR Modal State ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paytrToken, setPaytrToken] = useState<string | null>(null);
  const [paytrError, setPaytrError] = useState('');

  // ── PayTR token alma fonksiyonu ──
  const fetchPaytrToken = useCallback(async (prod: CustomProduct) => {
    setIsSubmitting(true);
    setPaytrError('');
    setPaytrToken(null);

    try {
      // PayTR user_basket formatına uygun ürün adı oluştur
      const productLabel = [
        prod.selectedColor ? prod.selectedColor.label : '',
        prod.selectedSize ? `No:${prod.selectedSize}` : '',
        prod.extraDetails.hasInscription ? `İşleme:"${prod.extraDetails.text}"` : '',
      ]
        .filter(Boolean)
        .join(', ');

      const basketName = `${PRODUCT_CONFIG.name} (${productLabel})`.substring(0, 100);

      const res = await fetch('/api/paytr/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: basketName,
          price: `${prod.totalPrice} TL`,
          productId: prod.productId,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.error || 'Token alınamadı.');
      setPaytrToken(data.token);
    } catch (err: unknown) {
      setPaytrError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // ── Siparişi Başlat ──
  const handleSubmit = () => {
    setIsModalOpen(true);
    fetchPaytrToken(product);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Sayfa başlığı */}
      <div className="text-center mb-12">
        <span className="section-label">✦ Atölyemizde Üretiliyor</span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3">
          Kendi Ürününü Tasarla
        </h1>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
          Rengini seç, numaranı belirle ve istersen üzerine ismini işlet.
          Her adım sonunda fiyat anlık güncellenir.
        </p>
      </div>

      {/* İki kolonlu layout: Wizard (sol) + Özet (sağ) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Wizard */}
        <div className="flex-1 w-full">
          <CustomProductBuilder
            product={product}
            onChange={setProduct}
            currentStep={currentStep}
            onNext={() => setCurrentStep((s) => Math.min(s + 1, 2))}
            onBack={() => setCurrentStep((s) => Math.max(s - 1, 0))}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Özet paneli */}
        <div className="w-full lg:w-[360px]">
          <OrderSummary product={product} />
        </div>
      </div>

      {/* PayTR Ödeme Modalı */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setPaytrToken(null); setPaytrError(''); }}
        token={paytrToken}
        isLoading={isSubmitting}
        errorMsg={paytrError}
        onRetry={() => fetchPaytrToken(product)}
      />
    </div>
    <Footer />
    </>
  );
}
