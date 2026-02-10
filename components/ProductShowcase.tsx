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
  {
    name: 'Bulutların Üzerinde Yürümeye Hazır mısın? ☁️',
    price: '500 ₺',
    image: '/images/patik2.png',
    hoverImage: '/images/patik.png',
    shopierLink: 'https://www.shopier.com/orguhome27/44120815',
  },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="shop" ref={ref} className="relative py-24 lg:py-32 px-6 gradient-luxury-dark overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Koleksiyonumuz
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto font-light">
            Özenle seçilmiş el yapımı örgü ürünlerimizi keşfedin
          </p>
        </motion.div>

        {/* Products Grid - CENTERED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 w-full justify-center">
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-luxury-gold text-black px-14 py-5 rounded-xl text-lg font-bold shadow-xl hover:bg-white transition-all duration-300"
          >
            Tüm Koleksiyonu Görüntüle →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
