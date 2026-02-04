'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Heart, Leaf, Award, ArrowRight } from 'lucide-react';

const ArtisanStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    { icon: Heart, text: 'Her ilmek sevgiyle örülür' },
    { icon: Leaf, text: '%100 organik ve sürdürülebilir' },
    { icon: Award, text: 'Benzersiz tasarımlar' },
  ];

  return (
    <section 
      ref={ref}
      id="about" 
      className="relative pt-24 lg:pt-32 pb-32 lg:pb-48 px-6 overflow-hidden bg-dark-bg"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden shadow-premium rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80"
                alt="El örgüsü yapan zanaatkâr"
                fill
                className="object-cover"
              />
              
              {/* Simple overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>

          {/* Content Side - CENTERED */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Tutkuyla{' '}
              <span className="text-luxury-gold">Üretildi</span>
            </h2>

            <div className="space-y-4 text-white/70 leading-relaxed text-base lg:text-lg mb-8">
              <p>
                Her ilmek bir hikaye anlatır. Örgülerimiz sadece giysi değil—her parçaya 
                yüreğini koyan usta eller tarafından özenle örülmüş bir sevgi emeğidir.
              </p>

              <p>
                Yavaş modanın güzelliğine inanıyoruz. Her kazak, bere ve atkı, en yüksek 
                kalite ve detaylara gösterilen özeni garanti altına almak için saatlerce emek ister.
              </p>

              <p className="font-medium text-white/90">
                Sadece organik, sürdürülebilir kaynaklardan elde edilen yün kullanarak, hem sıcak 
                ve rahat hem de gezegene nazik parçalar yaratıyoruz. 
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-warm-gold rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-white/90 font-medium">{highlight.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStory;
