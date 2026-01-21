'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  shopierLink?: string;
}

const ProductCard = ({ name, price, image, shopierLink = '#' }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white/95 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-stone-200"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="font-heading text-2xl lg:text-3xl font-bold text-stone-900 mb-2 tracking-tight">
          {name}
        </h3>

        <p className="text-stone-600 text-lg font-medium mb-6">{price}</p>

        <motion.a
          href={shopierLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 border-2 border-stone-800 text-stone-800 bg-transparent px-6 py-3 rounded-md font-medium hover:bg-stone-800 hover:text-white transition-all duration-300 w-full justify-center"
        >
          Mağazada Gör
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
