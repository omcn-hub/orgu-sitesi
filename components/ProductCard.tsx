'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  shopierLink?: string;
}

const ProductCard = ({ name, price, image, hoverImage, shopierLink = '#' }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {/* Main Image */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Image */}
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={name}
            fill
            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Simple overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content - CENTERED */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-stone-900 mb-2 text-center">
          {name}
        </h3>

        {/* PROMINENT Price */}
        <p className="text-2xl font-bold text-stone-700 mb-4 text-center">
          {price}
        </p>

        {/* PROMINENT CTA Button */}
        <motion.a
          href={shopierLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 w-full bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors"
        >
          Mağazada Gör
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
