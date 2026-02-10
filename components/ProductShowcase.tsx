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
    name: 'Konfor Serisi: Mavi El Örgüsü Kışlık Ev Botu',
    price: '500 ₺',
    image: '/images/mavi-patik3.png',
    hoverImage: '/images/mavi-patik2.png',
    shopierLink: 'https://www.shopier.com/orguhome27/43578410',
  },
  {
    name: 'El Örgüsü Çiçek Detaylı Kadın Ev Patiği — Pudra Pembe',
    price: '500 ₺',
    image: '/images/pembe-patik2.png',
    hoverImage: '/images/pembe-patik3.jpg',
    shopierLink: 'https://www.shopier.com/orguhome27/43617534',
  },
  {
    name: 'El Örgüsü Kadife Mary Jane Ev Ayakkabısı — Tarçın',
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
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="shop" ref={ref} className="relative py-24 lg:py-32 px-6 section-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
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

        {/* Products Grid — 3 columns for larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <motion.div
              key={index}
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

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <motion.a
            href="https://www.shopier.com/orguhome27"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block btn-primary px-12 py-4 text-base"
          >
            Tüm Koleksiyonu Görüntüle →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
