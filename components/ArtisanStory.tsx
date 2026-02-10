'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Heart, Leaf, Award } from 'lucide-react';
import Link from 'next/link';

const ArtisanStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const highlights = [
    { icon: Heart, text: 'Her ilmek sevgiyle örülür', color: 'var(--accent-terracotta)' },
    { icon: Leaf, text: '%100 organik ve sürdürülebilir', color: 'var(--accent-sage)' },
    { icon: Award, text: 'Benzersiz, sınırlı sayıda tasarımlar', color: 'var(--accent-warm)' },
  ];

  return (
    <section 
      ref={ref}
      id="about" 
      className="relative py-24 lg:py-32 px-6 section-cream overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--accent-terracotta)] opacity-[0.03] blur-[80px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[400px] lg:h-[520px] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80"
                alt="El örgüsü yapan zanaatkâr"
                fill
                className="object-cover"
              />
              
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-4 lg:right-8 bg-white rounded-2xl p-5 shadow-lg border border-[var(--border-light)]"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--accent-terracotta)] font-heading">10+</div>
                <div className="text-xs text-[var(--text-secondary)] font-medium">Yıllık Deneyim</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="section-label">Hikâyemiz</div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Tutkuyla ve{' '}
              <span className="gradient-text">Sevgiyle Üretildi</span>
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed text-base lg:text-[17px] mb-8">
              <p>
                Her ilmek bir hikâye anlatır. Örgülerimiz sadece giysi değil — her parçaya 
                yüreğini koyan usta eller tarafından özenle örülmüş bir sevgi emeğidir.
              </p>

              <p>
                Yavaş modanın güzelliğine inanıyoruz. Her patik, bere ve atkı, en yüksek 
                kalite ve detaylara gösterilen özeni garanti altına almak için saatlerce emek ister.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 group"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${highlight.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: highlight.color }} />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium text-[15px]">{highlight.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="#shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary px-8 py-3.5 text-[15px]"
                >
                  Koleksiyonu Keşfet →
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStory;
