'use client';

import { motion, useInView } from 'framer-motion';
import { Heart, Leaf, Award } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Heart,
    title: '%100 El Yapımı',
    description: 'Her parça özenle ve tutkuyla el emeğiyle örülür',
    color: 'from-rose-400 to-pink-500',
  },
  {
    icon: Leaf,
    title: 'Organik Yün',
    description: 'Sadece en kaliteli organik ve sürdürülebilir malzemeler',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Award,
    title: 'Sınırlı Sayıda',
    description: 'Özel ve eşsiz tasarımlar',
    color: 'from-amber-400 to-orange-500',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 overflow-hidden gradient-dark-to-light flex flex-col items-center">
      {/* Simple background */}
      <div className="absolute inset-0 gradient-mesh-warm opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Neden Bizi Seçmelisiniz?
          </h2>
          <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto font-light">
            Her ürünümüz sevgiyle ve özenle üretiliyor
          </p>
        </motion.div>

        {/* Simple centered grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full justify-center">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                } : { 
                  opacity: 0, 
                  y: 30,
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                }}
                className="text-center"
              >
                <div className="glass-card rounded-2xl p-8 hover:shadow-premium transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content - CENTERED */}
                  <h3 className="font-heading font-bold text-white mb-3 text-2xl">
                    {feature.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom text - CENTERED */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 italic text-lg">
            ✨ Her ürün özenle seçilmiş ve sevgiyle üretilmiştir
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
