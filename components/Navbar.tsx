'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-lg px-8 py-4 border border-white/50">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <ShoppingBag className="w-6 h-6 text-[#8B7355] group-hover:scale-110 transition-transform" />
              <span className="font-heading text-2xl font-bold text-[#3C3126]">
                ÖRGÜHOME
              </span>
            </Link>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#home"
                className="text-[#3C3126] hover:text-[#8B7355] transition-colors font-medium"
              >
                Ana Sayfa
              </Link>
              <Link
                href="#shop"
                className="text-[#3C3126] hover:text-[#8B7355] transition-colors font-medium"
              >
                Mağaza
              </Link>
              <Link
                href="#about"
                className="text-[#3C3126] hover:text-[#8B7355] transition-colors font-medium"
              >
                Hakkımızda
              </Link>
              <Link
                href="#contact"
                className="text-[#3C3126] hover:text-[#8B7355] transition-colors font-medium"
              >
                İletişim
              </Link>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#8B7355] to-[#6D5A43] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Hemen Al
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
