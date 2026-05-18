'use client';

import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import PaymentModal from '@/components/PaymentModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!mounted) return null; // Avoid hydration mismatch

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 mt-20">
          <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-[var(--text-muted)]" />
          </div>
          <h2 className="text-2xl font-bold font-heading mb-4 text-[var(--text-primary)]">Sepetiniz Boş</h2>
          <p className="text-[var(--text-secondary)] mb-8 text-center max-w-md">
            Şu anda sepetinizde hiç ürün bulunmuyor. El yapımı özel tasarım örgü ürünlerimizi incelemek için mağazamıza göz atın.
          </p>
          <Link href="/#shop">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary px-8 py-3">
              Alışverişe Başla
            </motion.button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleCheckout = () => {
    setIsPaymentModalOpen(true);
  };

  const productNames = items.map(i => `${i.quantity}x ${i.name}`).join(', ');
  const productIds = items.map(i => i.id).join(',');

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mb-10">
        Sepetim <span className="text-[var(--text-muted)] text-xl font-normal">({items.length} Ürün)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="bg-[var(--bg-primary)] rounded-3xl p-6 shadow-sm border border-[var(--border-light)]">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 md:gap-6 py-6 border-b border-[var(--border-light)] last:border-0 last:pb-0 first:pt-0">
                <div className="relative w-24 h-32 md:w-32 md:h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--text-primary)] line-clamp-2 pr-4">
                      {item.name}
                    </h3>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-[var(--bg-secondary)] p-1.5 rounded-xl">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 bg-white rounded-lg shadow-sm hover:text-[var(--accent-terracotta)] transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 bg-white rounded-lg shadow-sm hover:text-[var(--accent-terracotta)] transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-[var(--accent-terracotta)]">
                        {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-[var(--text-muted)] mt-1">
                          Adet: {item.price.toLocaleString('tr-TR')} ₺
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="bg-[var(--bg-primary)] rounded-3xl p-6 md:p-8 shadow-sm border border-[var(--border-light)] sticky top-32">
            <h3 className="text-xl font-bold font-heading mb-6 pb-4 border-b border-[var(--border-light)] text-[var(--text-primary)]">
              Sipariş Özeti
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Ara Toplam</span>
                <span>{totalAmount.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Kargo</span>
                <span className="text-green-600 font-medium">Ücretsiz</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-6 border-t border-[var(--border-light)] mb-6">
              <span className="text-lg font-bold text-[var(--text-primary)]">Toplam</span>
              <span className="text-3xl font-bold text-[var(--accent-terracotta)]">
                {totalAmount.toLocaleString('tr-TR')} ₺
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2"
            >
              Ödemeye Geç <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        productName={productNames.length > 50 ? "Sepet Toplamı" : productNames}
        price={`${totalAmount} TL`}
        productId={`CART-${productIds.substring(0, 30)}`}
      />
    </div>
    <Footer />
    </>
  );
}
