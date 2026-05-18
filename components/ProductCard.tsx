'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Heart } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { useCartStore } from '@/store/useCartStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  productId: string;
}

const ProductCard = ({ name, price, image, hoverImage, productId }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const numericPrice = parseFloat(price.replace(/[^0-9,.-]+/g, '').replace(',', '.'));
    addToCart({
      id: productId,
      name,
      price: isNaN(numericPrice) ? 0 : numericPrice,
      image,
    });
    router.push('/cart');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const numericPrice = parseFloat(price.replace(/[^0-9,.-]+/g, '').replace(',', '.'));
    toggleFavorite({
      id: productId,
      name,
      price: isNaN(numericPrice) ? 0 : numericPrice,
      image,
    });
  };

  const isFav = mounted ? isFavorite(productId) : false;

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group product-card"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[var(--bg-secondary)]">
          {/* Main Image */}
          <Image
            src={isHovered && hoverImage ? hoverImage : image}
            alt={name}
            fill
            className="object-cover transition-all duration-700 ease-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Subtle overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
          />

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Quick Buy Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-[var(--text-primary)] px-5 py-3 rounded-xl font-semibold text-sm hover:bg-white transition-colors shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              Sepete Ekle
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-2 line-clamp-2 min-h-[3rem] leading-snug">
            {name}
          </h3>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold text-[var(--accent-terracotta)]">{price}</span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="btn-primary px-5 py-2 text-sm"
            >
              Sepete Ekle
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* PayTR Ödeme Modalı */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={name}
        price={price}
        productId={productId}
      />
    </>
  );
};

export default ProductCard;
