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
    productId: 'gri-kristal-tasli-patik',
  },
  {
    name: 'Özel Tasarım İncili ve Tüylü Beyaz Gelin Patiği',
    price: '500 ₺',
    image: '/images/beyaz-patik-1.jpg',
    hoverImage: '/images/beyaz-patik-2.jpg',
    productId: 'beyaz-gelin-patigi',
  },
  {
    name: 'Konfor Serisi: Mavi El Örgüsü Kışlık Ev Botu',
    price: '500 ₺',
    image: '/images/mavi-patik3.png',
    hoverImage: '/images/mavi-patik2.png',
    productId: 'mavi-kislik-ev-botu',
  },
  {
    name: 'El Örgüsü Çiçek Detaylı Kadın Ev Patiği — Pudra Pembe',
    price: '500 ₺',
    image: '/images/pembe-patik2.png',
    hoverImage: '/images/pembe-patik3.jpg',
    productId: 'pembe-cicekli-patik',
  },
  {
    name: 'El Örgüsü Kadife Mary Jane Ev Ayakkabısı — Tarçın',
    price: '500 ₺',
    image: '/images/kahverengi-patik.png',
    hoverImage: '/images/kahverengi-patik2.png',
    productId: 'tarcin-mary-jane',
  },
  {
    name: 'Bulutların Üzerinde Yürümeye Hazır mısın? ☁️',
    price: '500 ₺',
    image: '/images/patik2.png',
    hoverImage: '/images/patik.png',
    productId: 'bulut-patik',
  },
  {
    name: 'Zarif Dokunuş: El Örgüsü İncili Çiçekli Kadın Patik - Nar Çiçeği Kırmızısı',
    price: '500 ₺',
    image: '/images/kırmızı-patik.png',
    hoverImage: '/images/kırmızı-patik3.png',
    productId: 'kirmizi-incili-patik',
  },
];

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
