'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  shopierLink?: string;
}

const ProductCard = ({ name, price, image, hoverImage, shopierLink = '#' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
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

        {/* Quick Buy Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <Link href={shopierLink} target="_blank" rel="noopener noreferrer" className="block">
            <button className="w-full flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-[var(--text-primary)] px-5 py-3 rounded-xl font-semibold text-sm hover:bg-white transition-colors shadow-lg">
              <ShoppingBag className="w-4 h-4" />
              Hızlı Satın Al
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-2 line-clamp-2 min-h-[3rem] leading-snug">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-[var(--accent-terracotta)]">{price}</span>
          
          <Link href={shopierLink} target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-5 py-2 text-sm"
            >
              Satın Al
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
