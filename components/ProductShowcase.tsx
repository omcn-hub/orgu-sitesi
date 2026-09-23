'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProductCard from './ProductCard';
import { CATALOG_PRODUCTS } from '@/lib/catalog';

const products = CATALOG_PRODUCTS.map((p) => ({ ...p, price: `${p.price} ₺` }));

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="shop" ref={ref} className="relative py-24 lg:py-32 px-6 section-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto relative w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Mağaza</div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            Koleksiyonumuz
          </h2>
          <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Özenle seçilmiş el yapımı örgü ürünlerimizi keşfedin
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
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
