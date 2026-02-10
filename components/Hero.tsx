'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Warm dark gradient background */}
      <div className="absolute inset-0 z-0 hero-gradient" />

      {/* Background Image with warm overlay */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="w-full h-full bg-cover bg-center opacity-15"
          style={{
            backgroundImage: "url('/hero_knitting_background_1769259829839.png')",
            mixBlendMode: 'soft-light',
          }}
        />
      </div>

      {/* Warm ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent-terracotta)] opacity-[0.06] blur-[120px] z-[2]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-warm)] opacity-[0.05] blur-[100px] z-[2]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 text-white/70 text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-sage)] animate-pulse" />
            El Yapımı · Organik · Sevgiyle Örülmüş
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.1] tracking-tight mb-8"
        >
          Her İlmekte
          <br />
          <span className="text-[var(--accent-warm)]">
            Bir Hikâye
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl lg:text-2xl text-white/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto"
        >
          Sevgiyle el emeğiyle örülmüş, organik yünden <br className="hidden sm:block" />
          benzersiz örgü ürünleri
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="#shop">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[var(--accent-terracotta)] text-white px-10 py-4 rounded-full text-base font-semibold shadow-lg hover:shadow-xl hover:bg-[var(--accent-terracotta-dark)] transition-all duration-300"
            >
              Koleksiyonu Keşfet
            </motion.button>
          </Link>

          <Link href="#about">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline-light px-10 py-4 text-base"
            >
              Hikâyemiz
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 flex flex-wrap justify-center gap-12 lg:gap-20"
        >
          {[
            { value: '%100', label: 'El Yapımı' },
            { value: 'Organik', label: 'Doğal Yün' },
            { value: '300+', label: 'Mutlu Müşteri' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white font-heading mb-1">
                {stat.value}
              </div>
              <div className="text-xs lg:text-sm text-white/50 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Keşfet</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
