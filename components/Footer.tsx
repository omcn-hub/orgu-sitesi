'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-gradient-to-br from-[#F5F1E8] via-[#E8DCC4] to-[#D4C4A8] py-20 px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#8B7355]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#8B7355]/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-4 bg-gradient-to-r from-[#8B7355] to-[#4A3F35] bg-clip-text text-transparent">
              ÖRGÜHOME
            </h3>
            <p className="text-[#4A3F35] leading-relaxed text-base">
              Sevgiyle ve organik yünle el emeğiyle örülmüş örgüler. Her parça eşsiz
              ve kendi hikayesini anlatır.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-xl font-semibold mb-6 text-[#4A3F35]">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {['Ana Sayfa', 'Mağaza', 'Hakkımızda', 'İletişim'].map((item, index) => (
                <li key={item}>
                  <Link
                    href={`#${item === 'Ana Sayfa' ? 'home' : item === 'Mağaza' ? 'shop' : item === 'Hakkımızda' ? 'about' : 'contact'}`}
                    className="text-[#6D5A43] hover:text-[#8B7355] transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading text-xl font-semibold mb-6 text-[#4A3F35]">Bizi Takip Edin</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-br from-[#8B7355] to-[#6D5A43] rounded-2xl flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:info@cozyknit.com"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-br from-[#8B7355] to-[#6D5A43] rounded-2xl flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#8B7355]/20 pt-8 text-center">
          <p className="text-[#6D5A43] flex items-center justify-center gap-2 font-medium">
            © 2024 ÖRGÜHOME. Zanaatkârlar tarafından <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> ile yapılmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
