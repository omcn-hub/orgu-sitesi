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
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-[#E8DCC4]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-2xl font-semibold text-[#3C3126] mb-2">
          {name}
        </h3>

        <p className="text-[#8B7355] text-xl font-bold mb-4">{price}</p>

        <motion.a
          href={shopierLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-[#8B7355] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6D5A43] transition-colors w-full justify-center"
        >
          View on Shopier
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
