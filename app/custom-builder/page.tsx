'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  X, Shield, Lock, CreditCard,
  ShoppingCart, Check, ChevronDown, ChevronUp,
  Star,
} from 'lucide-react';
import CustomProductBuilder, { STEPS } from '@/components/CustomProductBuilder';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  CustomProduct,
  INITIAL_STATE,
  SIZE_SURCHARGE_THRESHOLD,
  SIZE_SURCHARGE_AMOUNT,
  SOLE_OPTIONS,
  YARN_OPTIONS,
  ANKLE_OPTIONS,
  PATTERN_OPTIONS,
  ACCESSORY_OPTIONS,
  GIFT_BOX_SURCHARGE,
  INSCRIPTION_SURCHARGE,
  calculateTotalPrice,
} from '@/lib/customProductTypes';
import { useCartStore } from '@/store/useCartStore';

// ─────────────────────────────────────────────────────────────
// Ürün Konfigürasyonu
// ─────────────────────────────────────────────────────────────
const PRODUCT_CONFIG = {
  id: 'CUSTOM-CORAP-001',
  name: 'El Yapımı Özel Tasarım Örgü Patik',
  basePrice: 300,
  description: 'Seçtiğin renk, numara ve tüm özelleştirmelerle senin için üretilir.',
};

// Renk grubuna göre önizleme görseli eşleştirme
const COLOR_TO_IMAGE: Record<string, string> = {
  krem:        '/images/beyaz-patik-1.jpg',
  taba:        '/images/kahverengi-patik.png',
  terracotta:  '/images/kırmızı-patik.png',
  adacayi:     '/images/gri-patik-1.jpg',
  'koyu-yesil':'/images/gri-patik-2.jpg',
  mavi:        '/images/mavi-patik.png',
  lacivert:    '/images/mavi-patik2.png',
  'gul-kurusu':'/images/pembe-patik.jpg',
  bordo:       '/images/kırmızı-patik3.png',
  antrasit:    '/images/siyah-terlik.png',
};
const DEFAULT_IMAGE = '/images/beyaz-patik-3.jpg';

// ─────────────────────────────────────────────────────────────
// PayTR Modal
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
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

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
// Sepete Eklendi Toast
// ─────────────────────────────────────────────────────────────
function CartSuccessToast({ onClose, onGoCart }: { onClose: () => void; onGoCart: () => void }) {
  return (
    <div className="flex items-center gap-4 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-2xl shadow-xl px-5 py-4 min-w-[280px]">
      <div className="w-10 h-10 rounded-full bg-[var(--accent-sage)]/15 flex items-center justify-center flex-shrink-0">
        <Check className="w-5 h-5 text-[var(--accent-sage)]" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm text-[var(--text-primary)]">Sepete Eklendi!</p>
        <p className="text-xs text-[var(--text-muted)]">Ürününüz sepetinize başarıyla eklendi.</p>
      </div>
      <button
        onClick={onGoCart}
        className="text-xs font-bold text-[var(--accent-terracotta)] hover:underline whitespace-nowrap"
      >
        Sepete Git →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sipariş Özeti — Gelişmiş Panel
// ─────────────────────────────────────────────────────────────
function OrderSummary({ product, onPay, isPayLoading }: {
  product: CustomProduct;
  onPay: () => void;
  isPayLoading: boolean;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const sizeExtra = product.selectedSize && product.selectedSize >= SIZE_SURCHARGE_THRESHOLD ? SIZE_SURCHARGE_AMOUNT : 0;
  const soleExtra = product.selectedSole?.surcharge ?? 0;
  const yarnExtra = product.selectedYarn?.surcharge ?? 0;
  const ankleExtra = product.selectedAnkle?.surcharge ?? 0;
  const patternExtra = product.selectedPattern?.surcharge ?? 0;
  const accessoryExtra = product.selectedAccessories.reduce((sum, id) => {
    const acc = ACCESSORY_OPTIONS.find((a) => a.id === id);
    return sum + (acc?.surcharge ?? 0);
  }, 0);
  const giftExtra = product.hasGiftBox ? GIFT_BOX_SURCHARGE : 0;
  const inscExtra = product.extraDetails.hasInscription ? INSCRIPTION_SURCHARGE : 0;

  const previewImage = product.selectedColor
    ? (COLOR_TO_IMAGE[product.selectedColor.id] || DEFAULT_IMAGE)
    : DEFAULT_IMAGE;

  // Bilek boyu etiketi
  const ankleLabel = product.selectedAnkle?.id === 'bot' ? '👢 Bot Tarzı'
    : product.selectedAnkle?.id === 'bilekte' ? '🧦 Bilekte'
    : '🩴 Babet';

  // Desen etiketi
  const patternLabel = product.selectedPattern?.id === 'sac' ? '♾ Saç Örgüsü'
    : product.selectedPattern?.id === 'selanik' ? '◈ Selanik'
    : '▬ Düz';

  const lineItems = [
    { label: 'Baz Fiyat', value: product.basePrice, show: true },
    { label: `Büyük Numara (${product.selectedSize})`, value: sizeExtra, show: sizeExtra > 0 },
    { label: product.selectedSole?.label || '', value: soleExtra, show: soleExtra > 0 },
    { label: product.selectedYarn?.label || '', value: yarnExtra, show: yarnExtra > 0 },
    { label: product.selectedAnkle?.label || '', value: ankleExtra, show: ankleExtra > 0 },
    { label: product.selectedPattern?.label || '', value: patternExtra, show: patternExtra > 0 },
    ...product.selectedAccessories.map((id) => {
      const acc = ACCESSORY_OPTIONS.find((a) => a.id === id);
      return { label: acc?.label || '', value: acc?.surcharge || 0, show: true };
    }),
    { label: 'Hediye Kutusu + Not', value: giftExtra, show: giftExtra > 0 },
    { label: 'Kişiselleştirme', value: inscExtra, show: inscExtra > 0 },
  ].filter((i) => i.show);

  return (
    <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-3xl shadow-sm sticky top-28 overflow-hidden">
      {/* ── Ürün Görseli (Canlı Önizleme) ── */}
      <div className="relative w-full aspect-[4/3] bg-[var(--bg-secondary)] overflow-hidden">
        <motion.div
          key={previewImage}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={previewImage}
            alt={PRODUCT_CONFIG.name}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </motion.div>

        {/* Overlay Etiketleri */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.selectedColor && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm"
            >
              <div
                className="w-4 h-4 rounded-full border border-[var(--border-light)] flex-shrink-0"
                style={{ backgroundColor: product.selectedColor.hex }}
              />
              <span className="text-xs font-medium text-[var(--text-primary)]">{product.selectedColor.label}</span>
            </motion.div>
          )}
        </div>

        {/* Bilek & Desen Etiketleri */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 items-end">
          {product.selectedAnkle && (
            <motion.div
              key={product.selectedAnkle.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1"
            >
              <span className="text-[10px] font-medium text-white">{ankleLabel}</span>
            </motion.div>
          )}
          {product.selectedPattern && product.selectedPattern.id !== 'duz' && (
            <motion.div
              key={product.selectedPattern.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--accent-terracotta)]/80 backdrop-blur-sm rounded-full px-2.5 py-1"
            >
              <span className="text-[10px] font-medium text-white">{patternLabel}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading font-bold text-base text-[var(--text-primary)] mb-1">{PRODUCT_CONFIG.name}</h3>
        <p className="text-xs text-[var(--text-muted)] mb-5">{PRODUCT_CONFIG.description}</p>

        {/* ── Fiyat Özeti ── */}
        <div className="border-t border-[var(--border-light)] pt-4">
          {/* Toplam — her zaman görünür */}
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-[var(--text-primary)]">Toplam</span>
            <motion.span
              key={product.totalPrice}
              initial={{ scale: 1.15, color: 'var(--accent-terracotta)' }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold text-[var(--accent-terracotta)]"
            >
              {product.totalPrice.toLocaleString('tr-TR')}₺
            </motion.span>
          </div>

          {/* Detay aç/kapat */}
          {lineItems.length > 1 && (
            <>
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mb-2"
              >
                {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {showDetails ? 'Fiyat detayını gizle' : 'Fiyat detayını göster'}
              </button>
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 mb-3 pb-3 border-b border-[var(--border-light)]">
                      {lineItems.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm text-[var(--text-secondary)]">
                          <span className="text-xs">{item.label}</span>
                          <span className={`text-xs font-medium ${item.value > 0 ? 'text-[var(--accent-terracotta)]' : ''}`}>
                            {item.value > 0 ? `+${item.value}₺` : `${item.value}₺`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* ── Seçimler Özeti ── */}
        <div className="mt-4 space-y-1.5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Seçimleriniz</p>
          <SummaryRow icon="🎨" label="Renk" value={product.selectedColor?.label} />
          <SummaryRow icon="👟" label="Numara" value={product.selectedSize ? `${product.selectedSize}` : undefined} />
          <SummaryRow icon="🛡️" label="Taban" value={product.selectedSole?.label} />
          <SummaryRow icon="🌸" label="İp" value={product.selectedYarn?.label} />
          <SummaryRow icon="📏" label="Bilek Boyu" value={product.selectedAnkle?.label} />
          <SummaryRow icon="◈" label="Desen" value={product.selectedPattern?.label} />
          {product.selectedAccessories.length > 0 && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-base leading-none mt-0.5">✨</span>
              <div>
                <span className="text-xs text-[var(--text-muted)]">Aksesuar: </span>
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {product.selectedAccessories.map((id) => {
                    const acc = ACCESSORY_OPTIONS.find((a) => a.id === id);
                    return acc?.label;
                  }).join(', ')}
                </span>
              </div>
            </div>
          )}
          {product.hasGiftBox && <SummaryRow icon="🎁" label="Hediye Kutusu" value="Eklendi" />}
          {product.extraDetails.hasInscription && (
            <SummaryRow icon="✍️" label="İşleme" value={`"${product.extraDetails.text || '—'}"`} />
          )}
        </div>

        {/* ── Ödeme Butonu (sepete eklendikten sonra) ── */}
        <div className="mt-6 space-y-3">
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPay}
            disabled={isPayLoading || !product.selectedColor || !product.selectedSize}
            className="w-full btn-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPayLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Ödemeye Yönlendiriliyor...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Şimdi Öde — {product.totalPrice.toLocaleString('tr-TR')}₺
              </>
            )}
          </motion.button>

          {/* Güven Rozeti */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" />SSL</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" />PayTR</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3" />3D Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value?: string | null }) {
  if (!value) return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
      <span>{icon}</span>
      <span>{label}: Seçilmedi</span>
    </div>
  );
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
      <span>{icon}</span>
      <span className="text-[var(--text-muted)]">{label}:</span>
      <span className="font-medium">{value}</span>
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

  const addToCart = useCartStore((s) => s.addToCart);

  // ── Canlı Fiyat Hesaplama ──
  useEffect(() => {
    const total = calculateTotalPrice(product);
    if (total !== product.totalPrice) {
      setProduct((prev) => ({ ...prev, totalPrice: total }));
    }
  }, [
    product.selectedSize,
    product.selectedSole,
    product.selectedYarn,
    product.selectedAnkle,
    product.selectedPattern,
    product.selectedAccessories,
    product.hasGiftBox,
    product.extraDetails.hasInscription,
    product.basePrice,
    // NOT: product.totalPrice intentionally omitted to avoid loop
  ]);

  // ── PayTR Modal State ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayLoading, setIsPayLoading] = useState(false);
  const [paytrToken, setPaytrToken] = useState<string | null>(null);
  const [paytrError, setPaytrError] = useState('');

  // ── Sepete Ekle Durumu ──
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  // ── Sipariş Kaydet (Supabase) ──
  const saveOrder = useCallback(async (prod: CustomProduct, paytrOrderId?: string) => {
    try {
      await fetch('/api/orders/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: prod, paytrOrderId }),
      });
    } catch (err) {
      console.error('[Order Save]', err);
    }
  }, []);

  // ── Sepete Ekle ──
  const handleAddToCart = useCallback(async () => {
    if (!product.selectedColor || !product.selectedSize) return;
    setIsAddingToCart(true);

    try {
      // Backend fiyat doğrulama + Supabase kayıt
      const res = await fetch('/api/orders/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });
      const data = await res.json();

      // Güvenli fiyatı kullan
      const verifiedPrice = data.verifiedPrice ?? product.totalPrice;

      // Sepete ekle
      addToCart({
        id: `${PRODUCT_CONFIG.id}-${Date.now()}`,
        name: PRODUCT_CONFIG.name,
        price: verifiedPrice,
        image: product.selectedColor
          ? (COLOR_TO_IMAGE[product.selectedColor.id] || DEFAULT_IMAGE)
          : DEFAULT_IMAGE,
        customization: {
          color: product.selectedColor?.label,
          colorHex: product.selectedColor?.hex,
          size: product.selectedSize ?? undefined,
          soleType: product.selectedSole?.label,
          yarnType: product.selectedYarn?.label,
          ankleHeight: product.selectedAnkle?.label,
          knitPattern: product.selectedPattern?.label,
          accessories: product.selectedAccessories.map((id) => {
            const acc = ACCESSORY_OPTIONS.find((a) => a.id === id);
            return acc?.label || id;
          }),
          giftBox: product.hasGiftBox,
          inscription: product.extraDetails.hasInscription ? product.extraDetails.text : '',
        },
      });

      setCartAdded(true);
    } catch (err) {
      console.error('[Add to Cart]', err);
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, addToCart]);

  // ── PayTR Token Al ──
  const fetchPaytrToken = useCallback(async (prod: CustomProduct) => {
    setIsPayLoading(true);
    setPaytrError('');
    setPaytrToken(null);

    try {
      const selections = [
        prod.selectedColor?.label,
        prod.selectedSize ? `No:${prod.selectedSize}` : '',
        prod.selectedSole?.label,
        prod.selectedYarn?.label,
        prod.selectedAnkle?.label,
        prod.selectedPattern?.label,
        ...prod.selectedAccessories,
        prod.hasGiftBox ? 'Hediye Kutusu' : '',
        prod.extraDetails.hasInscription ? `İşleme:"${prod.extraDetails.text}"` : '',
      ].filter(Boolean).join(', ');

      const basketName = `${PRODUCT_CONFIG.name} (${selections})`.substring(0, 100);

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

      // Supabase'e kaydet
      await saveOrder(prod, data.orderId);
      setPaytrToken(data.token);
    } catch (err: unknown) {
      setPaytrError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setIsPayLoading(false);
    }
  }, [saveOrder]);

  // ── Direkt Ödeme (Özet panelindeki buton) ──
  const handlePay = () => {
    if (!product.selectedColor || !product.selectedSize) return;
    setIsModalOpen(true);
    fetchPaytrToken(product);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* ── Sayfa Başlığı ── */}
        <div className="text-center mb-12">
          <span className="section-label">✦ Atölyemizde Üretiliyor</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3">
            Kendi Patiğini Tasarla
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Rengini, tabanını, desenini ve tüm detayları belirle.
            Her seçimde fiyat <span className="text-[var(--accent-terracotta)] font-medium">anlık güncellenir</span>.
          </p>
        </div>

        {/* ── İki Kolonlu Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Wizard (sol) */}
          <div className="flex-1 w-full">
            {/* Sepete Ekle Başarı Mesajı */}
            <AnimatePresence>
              {cartAdded && (
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="mb-6 flex items-center justify-between gap-4 bg-[var(--accent-sage)]/10 border border-[var(--accent-sage)]/30 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-sage)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">Sepete Eklendi!</p>
                      <p className="text-xs text-[var(--text-muted)]">Ürününüz sepetinizde hazır.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/cart"
                      className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Sepete Git
                    </Link>
                    <button
                      onClick={() => setCartAdded(false)}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <CustomProductBuilder
              product={product}
              onChange={setProduct}
              currentStep={currentStep}
              onNext={() => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))}
              onBack={() => setCurrentStep((s) => Math.max(s - 1, 0))}
              onAddToCart={handleAddToCart}
              isSubmitting={isAddingToCart}
            />
          </div>

          {/* Özet paneli (sağ) */}
          <div className="w-full lg:w-[380px]">
            <OrderSummary
              product={product}
              onPay={handlePay}
              isPayLoading={isPayLoading}
            />
          </div>
        </div>

        {/* ── PayTR Ödeme Modalı ── */}
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setPaytrToken(null); setPaytrError(''); }}
          token={paytrToken}
          isLoading={isPayLoading}
          errorMsg={paytrError}
          onRetry={() => fetchPaytrToken(product)}
        />
      </div>
      <Footer />
    </>
  );
}
