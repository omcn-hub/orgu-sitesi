'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    name: 'Kalın Örgü Kazak',
    price: '₺4.200',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
  },
  {
    name: 'Yün Hırka',
    price: '₺3.600',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
  },
  {
    name: 'Sıcak Bere',
    price: '₺1.260',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80',
  },
  {
    name: 'Merino Atkı',
    price: '₺1.820',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
  },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="shop" ref={ref} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#3C3126] mb-4">
            Koleksiyonumuz
          </h2>
          <p className="text-[#6D5A43] text-lg max-w-2xl mx-auto">
            Özenle seçilmiş el yapımı örgü ürünlerimizi keşfedin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
