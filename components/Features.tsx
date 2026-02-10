'use client';

import { motion, useInView } from 'framer-motion';
import { Heart, Leaf, Award, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Heart,
    title: 'Sevgiyle Örülür',
    description: 'Her parça, usta ellerde saatler süren özenli çalışmayla hayat bulur. El emeği, göz nuru.',
    accent: 'var(--accent-terracotta)',
    bgAccent: 'rgba(196, 112, 75, 0.08)',
  },
  {
    icon: Leaf,
    title: 'Organik Yün',
    description: 'Sadece en kaliteli organik ve sürdürülebilir malzemeler. Doğaya saygılı, cildinize nazik.',
    accent: 'var(--accent-sage)',
    bgAccent: 'rgba(143, 166, 122, 0.08)',
  },
  {
    icon: Award,
    title: 'Benzersiz Tasarım',
    description: 'Her ürün sınırlı sayıda üretilir. Eşsiz desenleri ile sizi özel hissettirir.',
    accent: 'var(--accent-warm)',
    bgAccent: 'rgba(212, 165, 116, 0.08)',
  },
  {
    icon: Sparkles,
    title: 'Özenli Paketleme',
    description: 'Hediye paketi kalitesinde, özel kraft kağıt ambalajla kapınıza kadar sıcaklık taşırız.',
    accent: 'var(--accent-rose)',
    bgAccent: 'rgba(212, 165, 165, 0.08)',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 section-cream">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Farkımız</div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            Neden{' '}
            <span className="gradient-text">Bizi Seçmelisiniz?</span>
          </h2>
          <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Her ürünümüz sevgiyle, özenle ve en kaliteli malzemelerle üretiliyor
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="warm-card p-7 h-full text-center group">
                  {/* Icon */}
                  <div 
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: feature.bgAccent }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: feature.accent }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-bold text-lg mb-2.5">
                    {feature.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
