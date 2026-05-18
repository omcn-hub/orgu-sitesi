'use client';

import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FavoritesPage() {
  const [mounted, setMounted] = useState(false);
  const { items, toggleFavorite } = useFavoriteStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 mt-20">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-red-300" />
          </div>
          <h2 className="text-2xl font-bold font-heading mb-4 text-[var(--text-primary)]">Favorileriniz Boş</h2>
          <p className="text-[var(--text-secondary)] mb-8 text-center max-w-md">
            Henüz hiç ürünü favorilerinize eklemediniz. Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
          </p>
          <Link href="/#shop">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary px-8 py-3">
              Ürünleri İncele
            </motion.button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = (item: any) => {
    addToCart({ ...item });
    router.push('/cart');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mb-10 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" /> Favorilerim <span className="text-[var(--text-muted)] text-xl font-normal">({items.length} Ürün)</span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[var(--bg-primary)] rounded-3xl p-4 shadow-sm border border-[var(--border-light)] group">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-[var(--bg-secondary)]">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <button 
                onClick={() => toggleFavorite(item)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform z-10"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
            
            <h3 className="font-heading font-bold text-base text-[var(--text-primary)] line-clamp-2 min-h-[3rem] mb-2">
              {item.name}
            </h3>
            
            <div className="text-lg font-bold text-[var(--accent-terracotta)] mb-4">
              {item.price.toLocaleString('tr-TR')} ₺
            </div>
            
            <button
              onClick={() => handleAddToCart(item)}
              className="w-full flex items-center justify-center gap-2 bg-[var(--bg-secondary)] hover:bg-[var(--accent-terracotta)] hover:text-white text-[var(--text-primary)] px-4 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
