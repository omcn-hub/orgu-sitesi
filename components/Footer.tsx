'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Hakkımızda', href: '#about' },
    { label: 'Mağaza', href: '#shop' },
    { label: 'Koleksiyonlarımız', href: '#shop' },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '#contact' },
  ];

  const categories = [
    { label: 'Patikler', href: '#shop' },
    { label: 'Ev Botları', href: '#shop' },
    { label: 'Gelin Patikleri', href: '#shop' },
    { label: 'Terlikler', href: '#shop' },
    { label: 'Özel Tasarım', href: '#shop' },
  ];

  return (
    <footer id="contact" className="relative bg-[var(--bg-dark)] pt-20 pb-10 px-6">
      {/* Top wave/divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-warm)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl font-bold mb-4 text-[var(--text-light)]">
              ÖRGÜHOME
            </h3>
            <p className="text-[var(--text-light-muted)] leading-relaxed text-sm mb-6">
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
                className="w-10 h-10 bg-white/10 hover:bg-[var(--accent-terracotta)] rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-bold mb-6 text-[var(--text-light)]">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-light-muted)] hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-base font-bold mb-6 text-[var(--text-light)]">
              Kategoriler
            </h4>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-light-muted)] hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-heading text-base font-bold mb-6 text-[var(--text-light)]">
              İletişim
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-[var(--text-light-muted)] text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--accent-terracotta)]" />
                <span>Gaziantep, Türkiye</span>
              </div>
              <a
                href="tel:+905510774112"
                className="flex items-center gap-3 text-[var(--text-light-muted)] hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-[var(--accent-terracotta)]" />
                <span>+90 551 077 41 12</span>
              </a>
              <a
                href="mailto:omeratalamiscan321@gmail.com"
                className="flex items-center gap-3 text-[var(--text-light-muted)] hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-[var(--accent-terracotta)]" />
                <span>omeratalamiscan321@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} ÖRGÜHOME. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-white/40 hover:text-white/70 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="text-white/40 hover:text-white/70 transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
