'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const ArtisanStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-24 px-6 bg-[#E8DCC4]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80"
              alt="El örgüsü yapan zanaatkâr"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#3C3126] mb-6">
              Tutkuyla Üretildi
            </h2>

            <div className="space-y-4 text-[#4A3F35] leading-relaxed text-lg">
              <p>
                Her ilmek bir hikaye anlatır. Örgülerimiz sadece giysi değil—her parçaya 
                yüreğini koyan usta eller tarafından özenle örülmüş bir sevgi emeğidir.
              </p>

              <p>
                Yavaş modanın güzelliğine inanıyoruz. Her kazak, bere ve atkı, en yüksek 
                kalite ve detaylara gösterilen özeni garanti altına almak için saatlerce emek ister.
              </p>

              <p>
                Sadece organik, sürdürülebilir kaynaklardan elde edilen yün kullanarak, hem sıcak 
                ve rahat hem de gezegene nazik parçalar yaratıyoruz. Etik uygulamalara bağlılığımız, 
                her satın alımınızda kendinizi iyi hissetmenizi sağlar.
              </p>

              <p className="font-semibold text-[#8B7355]">
                Örgülerimizi giydiğinizde, bir sanat eserini giyiyorsunuz—eşsiz, zamansız 
                ve sevgiyle örülmüş.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-[#8B7355] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#6D5A43] transition-colors"
            >
              Hakkımızda Daha Fazla Bilgi
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStory;
