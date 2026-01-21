'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-stone-100 py-24 px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-stone-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-4 text-stone-900">
              ÖRGÜHOME
            </h3>
            <p className="text-stone-700 leading-relaxed text-base">
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
            <h4 className="font-heading text-xl font-semibold mb-6 text-stone-900">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {['Ana Sayfa', 'Mağaza', 'Hakkımızda', 'İletişim'].map((item, index) => (
                <li key={item}>
                  <Link
                    href={`#${item === 'Ana Sayfa' ? 'home' : item === 'Mağaza' ? 'shop' : item === 'Hakkımızda' ? 'about' : 'contact'}`}
                    className="text-stone-600 hover:text-stone-900 transition-all duration-300 hover:translate-x-1 inline-block font-medium"
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
            <h4 className="font-heading text-xl font-semibold mb-6 text-stone-900">Bizi Takip Edin</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://www.instagram.com/orguhome2026?utm_source=qr&igsh=YjlzNjB4cGd6YjRk"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-stone-800 rounded-lg flex items-center justify-center text-white hover:bg-stone-900 hover:shadow-lg transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:info@cozyknit.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-stone-800 rounded-lg flex items-center justify-center text-white hover:bg-stone-900 hover:shadow-lg transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-300 pt-8 text-center">
          <p className="text-stone-600 flex items-center justify-center gap-2 font-medium">
            © 2024 ÖRGÜHOME. Zanaatkârlar tarafından <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> ile yapılmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
