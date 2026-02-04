'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Hakkımızda', href: '#about' },
    { label: 'Mağaza', href: '#shop' },
    { label: 'Koleksiyonlarımız', href: '#shop' },
    { label: 'SSS', href: '#' },
    { label: 'İletişim', href: '#contact' },
  ];

  const categories = [
    { label: 'Kazaklar', href: '#shop' },
    { label: 'Hırkalar', href: '#shop' },
    { label: 'Bereler', href: '#shop' },
    { label: 'Atkılar', href: '#shop' },
    { label: 'Özel Tasarım', href: '#shop' },
  ];

  const customerService = [
    { label: 'İade & Değişim', href: '#' },
    { label: 'Kargo Bilgileri', href: '#' },
    { label: 'Ödeme Seçenekleri', href: '#' },
    { label: 'Gizlilik Politikası', href: '#' },
    { label: 'Kullanım Koşulları', href: '#' },
  ];

  return (
    <footer id="contact" className="relative bg-black mt-32 pt-72 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4 text-white">
              ÖRGÜHOME
            </h3>
            <p className="text-white/70 leading-relaxed text-sm mb-6">
              Sevgiyle ve organik yünle el emeğiyle örülmüş örgüler. Her ürün, zanaat ve özenle üretilmiştir.
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              <motion.a
                href="https://www.instagram.com/orgu.home27"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white/10 hover:bg-warm-gold rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-white">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
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

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-white">
              Kategoriler
            </h4>
            <ul className="space-y-3">
              {categories.map((link) => (
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

          {/* Contact Us */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-white">
              İletişim
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Gaziantep, Türkiye</span>
              </div>
              <a
                href="tel:+905510774112"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+90 551 077 41 12</span>
              </a>
              <a
                href="mailto:omeratalamiscan321@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>omeratalamiscan321@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} ÖRGÜHOME. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm">
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
