'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative glass-product-card rounded-2xl overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-dark-700">
        {/* Main Image */}
        <motion.div className="relative w-full h-full">
          <Image
            src={isHovered && hoverImage ? hoverImage : image}
            alt={name}
            fill
            className="object-cover transition-all duration-500"
            style={{
              filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
            }}
          />
        </motion.div>
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-luxury-gold">{price}</span>
          
          <Link href={shopierLink} target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-luxury-gold text-black px-6 py-2.5 rounded-lg font-bold text-sm  text-white hover:bg-black transition-all duration-300"
            >
              Satın Al →
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Premium Border Glow on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl border-2 border-luxury-gold/30 pointer-events-none"
        style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)' }}
      />
    </motion.div>
  );
};

export default ProductCard;
