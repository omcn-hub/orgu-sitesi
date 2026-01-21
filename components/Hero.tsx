'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 z-0 gradient-mesh-hero">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/70 to-stone-900/80" />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="w-full h-full bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1920&q=80')",
          }}
        />
      </div>

      {/* Content - CENTERED */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Sparkles className="w-12 h-12 text-warm-gold" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          Her İlmekte
          <br />
          <span className="gradient-text">
            Sıcaklık
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl sm:text-2xl lg:text-3xl text-white/95 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
        >
          Sevgiyle el emeğiyle örülmüş, organik yünden örgüler
        </motion.p>

        {/* CTA Buttons - PROMINENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-stone-900 px-12 py-5 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-shadow"
          >
            Koleksiyonu Keşfet →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 border-2 border-white/50 px-12 py-5 rounded-xl text-lg font-bold text-white hover:bg-white/20 transition-colors"
          >
            Hakkımızda
          </motion.button>
        </motion.div>

        {/* Stats - CENTERED */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 lg:gap-16"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white font-heading mb-1">
              1000+
            </div>
            <div className="text-sm lg:text-base text-white/70">
              Mutlu Müşteri
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white font-heading mb-1">
              %100
            </div>
            <div className="text-sm lg:text-base text-white/70">
              El Yapımı
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white font-heading mb-1">
              5★
            </div>
            <div className="text-sm lg:text-base text-white/70">
              Organik Ürün
            </div>
          </div>
        </motion.div>
      </div>

      {/* Simple scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center"
      >
        <span className="text-white/60 text-sm font-medium block mb-2">Keşfet</span>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1 mx-auto">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
