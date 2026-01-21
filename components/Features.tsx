'use client';

import { motion } from 'framer-motion';
import { Heart, Leaf, Award } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: Heart,
    title: '%100 El Yapımı',
    description: 'Her parça özenle ve tutkuyla el emeğiyle örülür',
  },
  {
    icon: Leaf,
    title: 'Organik Yün',
    description: 'Sadece en kaliteli organik ve sürdürülebilir malzemeler kullanırız',
  },
  {
    icon: Award,
    title: 'Sınırlı Sayıda',
    description: 'Başka hiçbir yerde bulamayacağınız özel tasarımlar',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-6 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl lg:text-6xl font-bold text-center text-stone-900 mb-24 tracking-tight"
        >
          Neden Bizi Seçmelisiniz?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-700 text-white mb-6 shadow-md group-hover:shadow-lg group-hover:bg-stone-800 transition-all duration-300"
                >
                  <Icon className="w-8 h-8" />
                </motion.div>

                <h3 className="font-heading text-2xl font-semibold text-stone-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
