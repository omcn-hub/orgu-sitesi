'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayşe K.',
    location: 'İstanbul',
    rating: 5,
    text: 'Patikler gerçekten çok yumuşak ve kaliteli. Annem için aldım, çok beğendi! Paketlemesi bile ayrı güzeldi.',
    product: 'Gri Kristal Taşlı Patik',
  },
  {
    name: 'Fatma D.',
    location: 'Ankara',
    rating: 5,
    text: 'Gelin bohçası için sipariş verdim, hayal ettiğimden de güzel oldu. El emeği gerçekten belli oluyor.',
    product: 'Beyaz Gelin Patiği',
  },
  {
    name: 'Zeynep M.',
    location: 'İzmir',
    rating: 5,
    text: 'Kışın evde en sevdiğim şey bu patikler oldu! Hem sıcak hem şık. Herkese tavsiye ederim.',
    product: 'Mavi Kışlık Ev Botu',
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 section-white overflow-hidden">
      {/* Subtle decoration */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--accent-sage)] opacity-[0.03] blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Müşteri Yorumları</div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            Mutlu{' '}
            <span className="gradient-text">Müşterilerimiz</span>
          </h2>
          <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Ürünlerimizi kullanan müşterilerimizin değerli görüşleri
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="warm-card p-7 h-full flex flex-col">
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-[var(--accent-terracotta)] opacity-30" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--accent-warm)] text-[var(--accent-warm)]"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-[var(--border-light)] pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {testimonial.location}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[var(--accent-terracotta)] bg-[var(--accent-terracotta)]/5 px-3 py-1 rounded-full">
                      {testimonial.product}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
