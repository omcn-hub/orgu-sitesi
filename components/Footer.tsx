'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, Heart, MapPin, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Hızlı Bağlantılar',
      links: [
        { label: 'Ana Sayfa', href: '#home' },
        { label: 'Mağaza', href: '#shop' },
        { label: 'Hakkımızda', href: '#about' },
        { label: 'İletişim', href: '#contact' },
      ],
    },
    {
      title: 'Kategoriler',
      links: [
        { label: 'Kazaklar', href: '#shop' },
        { label: 'Hırkalar', href: '#shop' },
        { label: 'Bereler', href: '#shop' },
        { label: 'Atkılar', href: '#shop' },
      ],
    },
    {
      title: 'Müşteri Hizmetleri',
      links: [
        { label: 'İade & Değişim', href: '#' },
        { label: 'Kargo Bilgileri', href: '#' },
        { label: 'SSS', href: '#' },
        { label: 'Gizlilik Politikası', href: '#' },
      ],
    },
  ];

  return (
    <footer id="contact" className="relative bg-stone-900 py-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Newsletter Section - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-10 border-t border-white/10"
        >
          <div className="text-center mb-8">
            <h3 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-3">
              Yeni Koleksiyonlardan Haberdar Olun
            </h3>
            <p className="text-white/60 text-lg font-light">
              Özel fırsatlar ve yenilikler için abone olun
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto items-stretch">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-0 py-3 bg-transparent border-b border-white/30 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors rounded-none text-center sm:text-left"
              suppressHydrationWarning
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-cream transition-colors"
            >
              <span className="hidden sm:inline">Abone Ol</span>
              <ArrowRight className="w-5 h-5 sm:hidden" />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center lg:text-left">
          {/* Brand Column */}
          <div>
            <h3 className="font-heading text-3xl font-bold mb-4 text-white">
              ÖRGÜHOME
            </h3>
            <p className="text-white/70 leading-relaxed text-sm mb-6">
              Sevgiyle ve organik yünle el emeğiyle örülmüş örgüler.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+905510774112" className="flex items-center justify-center lg:justify-start gap-3 text-white/70 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>+90 551 077 41 12</span>
              </a>
              <a href="mailto:omeratalamiscan321@gmail.com" className="flex items-center justify-center lg:justify-start gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span>omeratalamiscan321@gmail.com</span>
              </a>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                <MapPin className="w-5 h-5" />
                <span>Gaziantep, Türkiye</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 justify-center lg:justify-start">
              <motion.a
                href="https://www.instagram.com/orguhome2026?utm_source=qr&igsh=YjlzNjB4cGd6YjRk"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gradient-to-br from-warm-gold to-terracotta rounded-xl flex items-center justify-center text-white"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:info@orguhome.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gradient-to-br from-warm-gold to-terracotta rounded-xl flex items-center justify-center text-white"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-heading text-lg font-bold mb-6 text-white">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 flex items-center justify-center gap-2 text-sm mb-4">
            © {currentYear} ÖRGÜHOME. Zanaatkârlar tarafından{' '}
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" /> ile yapılmıştır.
          </p>
          <div className="flex gap-6 justify-center text-sm">
            <Link href="#" className="text-white/60 hover:text-white transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
