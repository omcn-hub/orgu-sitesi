'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    name: 'Gri Kristal Taşlı & Peluş Ponponlu Patik',
    price: '500 ₺',
    image: '/images/gri-patik-3.jpg',
    hoverImage: '/images/gri-patik-4.jpg',
    shopierLink: 'https://www.shopier.com/orguhome27/43436372',
  },
  {
    name: 'Özel Tasarım İncili ve Tüylü Beyaz Gelin Patiği',
    price: '500 ₺',
    image: '/images/beyaz-patik-1.jpg',
    hoverImage: '/images/beyaz-patik-2.jpg',
    shopierLink: 'https://www.shopier.com/orguhome27/43440875',
  },
  {
    name: 'Konfor Serisi: mavi El Örgüsü Kışlık Ev Botu / Patik',
    price: '500₺',
    image: '/images/mavi-patik3.png',
    hoverImage: '/images/mavi-patik2.png',
    shopierLink: 'https://www.shopier.com/orguhome27/43578410',
  },
  {
    name: 'El Örgüsü Çiçek Detaylı Kadın Ev Patiği - Pudra Pembe',
    price: '500 ₺',
    image: '/images/pembe-patik2.png',
    hoverImage: '/images/pembe-patik3.jpg',
    shopierLink: 'https://www.shopier.com/orguhome27/43617534',
  },
  {
    name: 'El Örgüsü Kadife Mary Jane Ev Ayakkabısı - Tarçın',
    price: '500 ₺',
    image: '/images/kahverengi-patik.png',
    hoverImage: '/images/kahverengi-patik2.png',
    shopierLink: 'https://www.shopier.com/orguhome27/43927481',
  },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="shop" ref={ref} className="relative py-20 lg:py-32 px-6 bg-white overflow-hidden flex flex-col items-center">
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-4 tracking-tight">
            Koleksiyonumuz
          </h2>
          
          <p className="text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto">
            Özenle seçilmiş el yapımı örgü ürünlerimizi keşfedin
          </p>
        </motion.div>

        {/* Products Grid - CENTERED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full justify-center">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
              }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {/* View More Button - CENTERED */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-stone-900 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          >
            Tüm Koleksiyonu Görüntüle →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
